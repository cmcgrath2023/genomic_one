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
  ],
};

export const rvdnaData = {
  total_size: 6341,
  bits_per_base: 3.2,
  sections: 3,
  kmer_blocks: 1,
  vector_dims: 512,
};
