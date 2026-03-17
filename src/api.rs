//! Axum HTTP API server exposing genomic analysis endpoints as JSON.

use axum::{routing::get, Json, Router};
use rand::Rng;
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

use rvdna::prelude::*;
use rvdna::{
    alignment::{AlignmentConfig, SmithWaterman},
    epigenomics::{HorvathClock, MethylationProfile},
    pharma,
    protein::translate_dna,
    real_data,
    rvdna::RvdnaReader,
    variant::{PileupColumn, VariantCaller, VariantCallerConfig},
};

use crate::{char_to_residue, gc_content, GenePanel, KmerResults};

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

#[derive(Serialize)]
struct GeneInfo {
    name: String,
    description: String,
    length_bp: usize,
    gc_content: f64,
}

#[derive(Serialize)]
struct PanelResponse {
    genes: Vec<GeneInfo>,
    total_bases: usize,
}

#[derive(Serialize)]
struct KmerPair {
    gene_a: String,
    gene_b: String,
    similarity: f32,
}

#[derive(Serialize)]
struct AlignmentResponse {
    query_start: usize,
    query_end: usize,
    query_len: usize,
    score: i32,
    mapped_position: u64,
    mapping_quality: u8,
    cigar_ops: usize,
}

#[derive(Serialize)]
struct VariantInfo {
    position: usize,
    ref_allele: char,
    alt_allele: char,
    depth: usize,
    quality: f64,
    is_sickle_cell: bool,
}

#[derive(Serialize)]
struct VariantsResponse {
    positions_analyzed: usize,
    total_variants: usize,
    variants: Vec<VariantInfo>,
}

#[derive(Serialize)]
struct ContactInfo {
    residue1: usize,
    residue2: usize,
    score: f32,
}

#[derive(Serialize)]
struct ProteinResponse {
    length: usize,
    first_20_aa: String,
    expected: String,
    contact_edges: usize,
    top_contacts: Vec<ContactInfo>,
}

#[derive(Serialize)]
struct EpigeneticsResponse {
    cpg_sites: usize,
    mean_methylation: f64,
    predicted_age: f64,
}

#[derive(Serialize)]
struct AlleleInfo {
    name: String,
    activity: f64,
}

#[derive(Serialize)]
struct DrugRec {
    drug: String,
    recommendation: String,
    dose_factor: f64,
}

#[derive(Serialize)]
struct PharmaResponse {
    sequence_length: usize,
    allele1: AlleleInfo,
    allele2: AlleleInfo,
    phenotype: String,
    recommendations: Vec<DrugRec>,
}

#[derive(Serialize)]
struct RvdnaResponse {
    total_size: u64,
    bits_per_base: f64,
    sections: usize,
    kmer_blocks: usize,
    vector_dims: usize,
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------

async fn panel_handler() -> Json<PanelResponse> {
    let panel = GenePanel::load().expect("load panel");
    let genes = vec![
        GeneInfo {
            name: "HBB".into(),
            description: "Hemoglobin beta".into(),
            length_bp: panel.hbb.len(),
            gc_content: gc_content(&panel.hbb),
        },
        GeneInfo {
            name: "TP53".into(),
            description: "Tumor suppressor".into(),
            length_bp: panel.tp53.len(),
            gc_content: gc_content(&panel.tp53),
        },
        GeneInfo {
            name: "BRCA1".into(),
            description: "DNA repair".into(),
            length_bp: panel.brca1.len(),
            gc_content: gc_content(&panel.brca1),
        },
        GeneInfo {
            name: "CYP2D6".into(),
            description: "Drug metabolism".into(),
            length_bp: panel.cyp2d6.len(),
            gc_content: gc_content(&panel.cyp2d6),
        },
        GeneInfo {
            name: "INS".into(),
            description: "Insulin".into(),
            length_bp: panel.insulin.len(),
            gc_content: gc_content(&panel.insulin),
        },
    ];
    let total_bases = panel.total_bases();
    Json(PanelResponse { genes, total_bases })
}

async fn kmer_handler() -> Json<Vec<KmerPair>> {
    let panel = GenePanel::load().expect("load panel");
    let kmers = KmerResults::compute(&panel, 11, 512).expect("kmer compute");
    let matrix = kmers.similarity_matrix();
    let pairs: Vec<KmerPair> = matrix
        .into_iter()
        .map(|(a, b, sim)| KmerPair {
            gene_a: a.to_string(),
            gene_b: b.to_string(),
            similarity: sim,
        })
        .collect();
    Json(pairs)
}

async fn alignment_handler() -> Json<AlignmentResponse> {
    let panel = GenePanel::load().expect("load panel");
    let hbb_str = panel.hbb.to_string();
    let frag_start = 100;
    let frag_end = (frag_start + 50).min(hbb_str.len());
    let query = DnaSequence::from_str(&hbb_str[frag_start..frag_end]).expect("parse query");

    let aligner = SmithWaterman::new(AlignmentConfig::default());
    let aln = aligner.align(&query, &panel.hbb).expect("align");

    Json(AlignmentResponse {
        query_start: frag_start,
        query_end: frag_end,
        query_len: query.len(),
        score: aln.score,
        mapped_position: aln.mapped_position.position,
        mapping_quality: aln.mapping_quality.value(),
        cigar_ops: aln.cigar.len(),
    })
}

async fn variants_handler() -> Json<VariantsResponse> {
    let panel = GenePanel::load().expect("load panel");
    let hbb_str = panel.hbb.to_string();
    let hbb_bytes = hbb_str.as_bytes();
    let caller = VariantCaller::new(VariantCallerConfig::default());
    let mut rng = rand::thread_rng();
    let sickle_pos = real_data::hbb_variants::SICKLE_CELL_POS;
    let mut variants = Vec::new();

    let limit = hbb_bytes.len().min(200);
    for i in 0..limit {
        let depth = rng.gen_range(20..51);
        let bases: Vec<u8> = (0..depth)
            .map(|_| {
                if i == sickle_pos && rng.gen::<f32>() < 0.5 {
                    b'T'
                } else if rng.gen::<f32>() < 0.98 {
                    hbb_bytes[i]
                } else {
                    [b'A', b'C', b'G', b'T'][rng.gen_range(0..4)]
                }
            })
            .collect();
        let qualities: Vec<u8> = (0..depth).map(|_| rng.gen_range(25..41)).collect();

        let pileup = PileupColumn {
            bases,
            qualities,
            position: i as u64,
            chromosome: 11,
        };

        if let Some(call) = caller.call_snp(&pileup, hbb_bytes[i]) {
            variants.push(VariantInfo {
                position: i,
                ref_allele: call.ref_allele as char,
                alt_allele: call.alt_allele as char,
                depth: call.depth,
                quality: call.quality,
                is_sickle_cell: i == sickle_pos,
            });
        }
    }

    Json(VariantsResponse {
        positions_analyzed: limit,
        total_variants: variants.len(),
        variants,
    })
}

async fn protein_handler() -> Json<ProteinResponse> {
    let panel = GenePanel::load().expect("load panel");
    let hbb_str = panel.hbb.to_string();
    let hbb_bytes = hbb_str.as_bytes();
    let amino_acids = translate_dna(hbb_bytes);
    let protein_str: String = amino_acids.iter().map(|aa| aa.to_char()).collect();

    let first_20 = protein_str[..protein_str.len().min(20)].to_string();

    let mut contact_edges = 0;
    let mut top_contacts = Vec::new();

    if amino_acids.len() >= 10 {
        let residues: Vec<ProteinResidue> = amino_acids
            .iter()
            .map(|aa| char_to_residue(aa.to_char()))
            .collect();
        let protein_seq = ProteinSequence::new(residues);
        let graph = protein_seq.build_contact_graph(8.0).expect("contact graph");
        let contacts = protein_seq.predict_contacts(&graph).expect("predict contacts");

        contact_edges = graph.edges.len();
        top_contacts = contacts
            .iter()
            .take(3)
            .map(|(r1, r2, score)| ContactInfo {
                residue1: *r1,
                residue2: *r2,
                score: *score,
            })
            .collect();
    }

    Json(ProteinResponse {
        length: amino_acids.len(),
        first_20_aa: first_20,
        expected: "MVHLTPEEKSAVTALWGKVN".into(),
        contact_edges,
        top_contacts,
    })
}

async fn epigenetics_handler() -> Json<EpigeneticsResponse> {
    let mut rng = rand::thread_rng();
    let positions: Vec<(u8, u64)> = (0..500).map(|i| (1, i * 1000)).collect();
    let betas: Vec<f32> = (0..500).map(|_| rng.gen_range(0.1..0.9)).collect();

    let profile = MethylationProfile::from_beta_values(positions, betas);
    let clock = HorvathClock::default_clock();
    let predicted_age = clock.predict_age(&profile);

    Json(EpigeneticsResponse {
        cpg_sites: profile.sites.len(),
        mean_methylation: profile.mean_methylation() as f64,
        predicted_age,
    })
}

async fn pharma_handler() -> Json<PharmaResponse> {
    let panel = GenePanel::load().expect("load panel");

    let cyp2d6_variants = vec![(42130692, b'G', b'A')];
    let allele1 = pharma::call_star_allele(&cyp2d6_variants);
    let allele2 = pharma::StarAllele::Star10;
    let phenotype = pharma::predict_phenotype(&allele1, &allele2);
    let recs = pharma::get_recommendations("CYP2D6", &phenotype);

    Json(PharmaResponse {
        sequence_length: panel.cyp2d6.len(),
        allele1: AlleleInfo {
            name: format!("{:?}", allele1),
            activity: allele1.activity_score(),
        },
        allele2: AlleleInfo {
            name: format!("{:?}", allele2),
            activity: allele2.activity_score(),
        },
        phenotype: format!("{:?}", phenotype),
        recommendations: recs
            .iter()
            .map(|r| DrugRec {
                drug: r.drug.clone(),
                recommendation: r.recommendation.clone(),
                dose_factor: r.dose_factor,
            })
            .collect(),
    })
}

async fn rvdna_handler() -> Json<RvdnaResponse> {
    let rvdna_bytes =
        rvdna::rvdna::fasta_to_rvdna(real_data::HBB_CODING_SEQUENCE, 11, 512, 500)
            .expect("fasta_to_rvdna");
    let reader = RvdnaReader::from_bytes(rvdna_bytes).expect("reader");
    let kmer_blocks = reader.read_kmer_vectors().expect("kmer vectors");
    let stats = reader.stats();

    let sections = stats.section_sizes.iter().filter(|&&s| s > 0).count();

    Json(RvdnaResponse {
        total_size: stats.total_size,
        bits_per_base: stats.bits_per_base,
        sections,
        kmer_blocks: kmer_blocks.len(),
        vector_dims: 512,
    })
}

// ---------------------------------------------------------------------------
// Server entry point
// ---------------------------------------------------------------------------

pub async fn serve() -> anyhow::Result<()> {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/panel", get(panel_handler))
        .route("/api/kmer", get(kmer_handler))
        .route("/api/alignment", get(alignment_handler))
        .route("/api/variants", get(variants_handler))
        .route("/api/protein", get(protein_handler))
        .route("/api/epigenetics", get(epigenetics_handler))
        .route("/api/pharma", get(pharma_handler))
        .route("/api/rvdna", get(rvdna_handler))
        .layer(cors);

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    tracing::info!("Listening on http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}
