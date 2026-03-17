export const panelData = {
  genes: [
    { name: "HBB", description: "Hemoglobin Beta", chromosome: "chr11", length: 430, gc_content: 56.3 },
    { name: "TP53", description: "Tumor Suppressor", chromosome: "chr17", length: 549, gc_content: 57.4 },
    { name: "BRCA1", description: "DNA Repair", chromosome: "chr17", length: 523, gc_content: 50.1 },
    { name: "CYP2D6", description: "Drug Metabolism", chromosome: "chr22", length: 505, gc_content: 52.7 },
    { name: "INS", description: "Insulin", chromosome: "chr11", length: 333, gc_content: 58.3 },
  ],
  total_bases: 2340,
};

export const kmerData = {
  similarities: [
    { gene_a: "HBB", gene_b: "TP53", similarity: 0.4856 },
    { gene_a: "HBB", gene_b: "BRCA1", similarity: 0.4685 },
    { gene_a: "TP53", gene_b: "BRCA1", similarity: 0.4883 },
    { gene_a: "HBB", gene_b: "CYP2D6", similarity: 0.4595 },
    { gene_a: "HBB", gene_b: "INS", similarity: 0.4088 },
    { gene_a: "TP53", gene_b: "CYP2D6", similarity: 0.5097 },
  ],
};

export const alignmentData = {
  query_start: 100,
  query_end: 150,
  query_len: 50,
  score: 100,
  mapped_position: 100,
  mapping_quality: 60,
  cigar_ops: 1,
};

export const variantData = {
  positions_analyzed: 200,
  total_variants: 1,
  variants: [
    { position: 20, ref_allele: "G", alt_allele: "T", depth: 38, quality: 104.08, is_sickle_cell: true },
  ],
};

export const proteinData = {
  length: 139,
  first_20_aa: "MVHLTPEEKSAVTALWGKVN",
  expected: "MVHLTPEEKSAVTALWGKVN",
  contact_edges: 665,
  top_contacts: [
    { residue1: 0, residue2: 4, score: 1.0 },
    { residue1: 1, residue2: 5, score: 1.0 },
    { residue1: 2, residue2: 6, score: 1.0 },
    { residue1: 3, residue2: 7, score: 1.0 },
    { residue1: 4, residue2: 8, score: 1.0 },
    { residue1: 5, residue2: 9, score: 1.0 },
    { residue1: 6, residue2: 10, score: 1.0 },
    { residue1: 7, residue2: 11, score: 1.0 },
    { residue1: 8, residue2: 12, score: 0.95 },
    { residue1: 9, residue2: 13, score: 0.92 },
    { residue1: 10, residue2: 14, score: 0.88 },
    { residue1: 11, residue2: 15, score: 0.85 },
    { residue1: 0, residue2: 3, score: 0.82 },
    { residue1: 1, residue2: 4, score: 0.78 },
    { residue1: 2, residue2: 5, score: 0.75 },
    { residue1: 15, residue2: 20, score: 0.72 },
    { residue1: 20, residue2: 25, score: 0.68 },
    { residue1: 30, residue2: 35, score: 0.65 },
    { residue1: 50, residue2: 55, score: 0.60 },
    { residue1: 100, residue2: 105, score: 0.55 },
  ],
};

export const epigeneticsData = {
  cpg_sites: 500,
  mean_methylation: 0.497,
  predicted_age: 27.9,
};

export const pharmaData = {
  sequence_length: 505,
  allele1: { name: "Star4", activity: 0.0 },
  allele2: { name: "Star10", activity: 0.5 },
  phenotype: "Intermediate",
  recommendations: [
    { drug: "Codeine", recommendation: "Use lower dose or alternative analgesic.", dose_factor: 0.5 },
    { drug: "Tamoxifen", recommendation: "Consider higher dose or alternative therapy.", dose_factor: 0.8 },
    { drug: "Semaglutide (GLP-1 RA)", recommendation: "CYP2D6 intermediate metabolizer: monitor for altered GLP-1 receptor agonist clearance. Consider standard dosing with enhanced glycemic monitoring.", dose_factor: 1.0 },
    { drug: "Liraglutide (GLP-1 RA)", recommendation: "No significant CYP2D6 interaction expected. GLP-1 analogues primarily cleared via DPP-4 and renal elimination. Standard dose appropriate.", dose_factor: 1.0 },
  ],
};

export const rvdnaData = {
  total_size: 6341,
  bits_per_base: 3.2,
  sections: 3,
  kmer_blocks: 1,
  vector_dims: 512,
};

export const memoriesData = {
  total_memories: 5,
  memories: [
    {
      id: 1,
      gene_name: "HBB",
      timestamp: "2026-03-17T08:12:34Z",
      vector_dimensions: 512,
      similarity_cluster: 0,
      nearest_neighbors: [
        { gene_name: "TP53", similarity: 0.4856 },
        { gene_name: "BRCA1", similarity: 0.4685 },
        { gene_name: "CYP2D6", similarity: 0.4595 },
        { gene_name: "INS", similarity: 0.4088 },
      ],
    },
    {
      id: 2,
      gene_name: "TP53",
      timestamp: "2026-03-17T08:12:35Z",
      vector_dimensions: 512,
      similarity_cluster: 1,
      nearest_neighbors: [
        { gene_name: "CYP2D6", similarity: 0.5097 },
        { gene_name: "BRCA1", similarity: 0.4883 },
        { gene_name: "HBB", similarity: 0.4856 },
        { gene_name: "INS", similarity: 0.4200 },
      ],
    },
    {
      id: 3,
      gene_name: "BRCA1",
      timestamp: "2026-03-17T08:12:36Z",
      vector_dimensions: 512,
      similarity_cluster: 1,
      nearest_neighbors: [
        { gene_name: "TP53", similarity: 0.4883 },
        { gene_name: "HBB", similarity: 0.4685 },
        { gene_name: "CYP2D6", similarity: 0.4500 },
        { gene_name: "INS", similarity: 0.3900 },
      ],
    },
    {
      id: 4,
      gene_name: "CYP2D6",
      timestamp: "2026-03-17T08:12:37Z",
      vector_dimensions: 512,
      similarity_cluster: 2,
      nearest_neighbors: [
        { gene_name: "TP53", similarity: 0.5097 },
        { gene_name: "HBB", similarity: 0.4595 },
        { gene_name: "BRCA1", similarity: 0.4500 },
        { gene_name: "INS", similarity: 0.4100 },
      ],
    },
    {
      id: 5,
      gene_name: "INS",
      timestamp: "2026-03-17T08:12:38Z",
      vector_dimensions: 512,
      similarity_cluster: 0,
      nearest_neighbors: [
        { gene_name: "TP53", similarity: 0.4200 },
        { gene_name: "CYP2D6", similarity: 0.4100 },
        { gene_name: "HBB", similarity: 0.4088 },
        { gene_name: "BRCA1", similarity: 0.3900 },
      ],
    },
  ],
};

export const learningData = {
  bayesian_priors: [
    { trait_name: "variant_pathogenicity", distribution_type: "Beta", mean: 0.35, variance: 0.08, update_count: 42, confidence: 0.78 },
    { trait_name: "drug_response", distribution_type: "Normal", mean: 0.62, variance: 0.12, update_count: 28, confidence: 0.65 },
    { trait_name: "epigenetic_drift", distribution_type: "Normal", mean: 0.15, variance: 0.04, update_count: 15, confidence: 0.52 },
    { trait_name: "sequence_conservation", distribution_type: "Beta", mean: 0.88, variance: 0.03, update_count: 67, confidence: 0.91 },
    { trait_name: "protein_stability", distribution_type: "Normal", mean: 0.72, variance: 0.06, update_count: 33, confidence: 0.74 },
  ],
  patterns: [
    { name: "HBB sickle-cell variant signature", confidence: 0.95, evidence_count: 38, last_updated: "2026-03-17T08:15:00Z", description: "Consistent A>T transversion at codon 6 of HBB correlates with sickle cell trait in heterozygous carriers" },
    { name: "CYP2D6 poor-metabolizer haplotype", confidence: 0.82, evidence_count: 22, last_updated: "2026-03-16T14:30:00Z", description: "Star4/Star10 diplotype predicts intermediate metabolism phenotype with reduced codeine efficacy" },
    { name: "TP53-BRCA1 co-occurrence in DNA repair", confidence: 0.71, evidence_count: 14, last_updated: "2026-03-15T10:45:00Z", description: "High k-mer similarity between TP53 and BRCA1 reflects shared involvement in DNA damage response pathways" },
    { name: "Epigenetic age acceleration signal", confidence: 0.58, evidence_count: 9, last_updated: "2026-03-14T16:20:00Z", description: "CpG methylation patterns at INS locus show age-dependent drift correlated with insulin sensitivity changes" },
  ],
  neural_models: [
    { name: "VariantClassifier-v1", architecture: "3-layer FANN [512, 128, 5]", accuracy: 0.89, loss: 0.23, last_trained: "2026-03-17T07:00:00Z", task: "Classify variants as benign/pathogenic/VUS" },
    { name: "DrugResponsePredictor", architecture: "4-layer FANN [512, 256, 64, 3]", accuracy: 0.76, loss: 0.41, last_trained: "2026-03-16T22:00:00Z", task: "Predict metabolizer phenotype from k-mer vectors" },
    { name: "GeneClusterEmbedding", architecture: "Autoencoder [512, 128, 32, 128, 512]", accuracy: 0.93, loss: 0.11, last_trained: "2026-03-17T06:30:00Z", task: "Compress gene vectors for similarity clustering" },
  ],
};

export const pathwaysData = {
  nodes: [
    { id: 0, gene_name: "TP53", node_type: "suppressor" },
    { id: 1, gene_name: "BRCA1", node_type: "suppressor" },
    { id: 2, gene_name: "HBB", node_type: "structural" },
    { id: 3, gene_name: "CYP2D6", node_type: "metabolic" },
    { id: 4, gene_name: "INS", node_type: "metabolic" },
    { id: 5, gene_name: "EGFR", node_type: "oncogene" },
    { id: 6, gene_name: "KRAS", node_type: "oncogene" },
    { id: 7, gene_name: "MDM2", node_type: "oncogene" },
  ],
  edges: [
    { source: 0, target: 1, weight: 0.92, interaction_type: "DNA_repair_complex" },
    { source: 0, target: 7, weight: 0.88, interaction_type: "ubiquitin_regulation" },
    { source: 1, target: 5, weight: 0.65, interaction_type: "signal_transduction" },
    { source: 5, target: 6, weight: 0.85, interaction_type: "MAPK_cascade" },
    { source: 6, target: 0, weight: 0.45, interaction_type: "apoptosis_regulation" },
    { source: 3, target: 4, weight: 0.38, interaction_type: "metabolic_coupling" },
    { source: 2, target: 4, weight: 0.30, interaction_type: "oxygen_transport" },
    { source: 7, target: 0, weight: 0.95, interaction_type: "p53_degradation" },
    { source: 5, target: 0, weight: 0.55, interaction_type: "growth_suppression" },
  ],
  mincut: {
    cut_value: 1.10,
    cut_edges: [
      { source: "BRCA1", target: "EGFR" },
      { source: "KRAS", target: "TP53" },
    ],
    partitions: [
      ["TP53", "BRCA1", "MDM2"],
      ["EGFR", "KRAS", "CYP2D6", "INS", "HBB"],
    ],
  },
};
