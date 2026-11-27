/**
 * Mock medicine information data.
 * Will be replaced with real backend + RAG pipeline in Phase 9.
 *
 * Safety rules enforced throughout:
 *   - Never recommend doses or changes to prescribed treatment.
 *   - Always display critical warnings.
 *   - Always show reliable sources.
 *   - Flag uncertain prescription handwriting for professional verification.
 */

export const MEDICINE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'pain-relief', label: 'Pain relief' },
  { id: 'antibiotic', label: 'Antibiotic' },
  { id: 'antidiabetic', label: 'Antidiabetic' },
  { id: 'gastro', label: 'Gastrointestinal' },
  { id: 'statin', label: 'Statin' },
  { id: 'antihistamine', label: 'Antihistamine' },
];

export const MOCK_MEDICINES = [
  {
    id: 'paracetamol',
    genericName: 'Paracetamol',
    brandNames: ['Tylenol', 'Calpol', 'Crocin'],
    category: 'pain-relief',
    categoryLabel: 'Pain relief',
    shortDescription: 'Common pain reliever and fever reducer.',
    prescriptionRequired: false,
    criticalWarning:
      'Do not exceed the recommended dose. Taking more than 4,000 mg per day can cause serious liver damage. Avoid combining with other paracetamol-containing products.',
    uses: [
      'Reducing fever',
      'Relieving mild to moderate pain (headache, muscle aches, toothache)',
      'Managing pain from colds and flu',
    ],
    sideEffects: [
      'Usually well tolerated at recommended doses',
      'Rare: skin rash or itching',
      'Rare: nausea',
      'Very rare: serious skin reactions (seek medical help if this occurs)',
    ],
    precautions: [
      'Do not take more than the recommended dose — overdose can cause liver damage',
      'Avoid alcohol while taking paracetamol',
      'Talk to a doctor before use if you have liver disease',
      'Consult a doctor before use during pregnancy or breastfeeding',
    ],
    interactions: [
      'Warfarin (may increase bleeding risk with long-term use)',
      'Other paracetamol-containing products (risk of overdose)',
      'Alcohol (increases liver damage risk)',
    ],
    sources: [
      {
        title: 'Paracetamol — Drug Information',
        url: 'https://medlineplus.gov/druginfo/meds/a681004.html',
        publisher: 'MedlinePlus (NIH)',
      },
      {
        title: 'WHO Model List of Essential Medicines',
        url: 'https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists',
        publisher: 'World Health Organization',
      },
    ],
  },

  {
    id: 'ibuprofen',
    genericName: 'Ibuprofen',
    brandNames: ['Advil', 'Brufen', 'Nurofen'],
    category: 'pain-relief',
    categoryLabel: 'Pain relief',
    shortDescription: 'Nonsteroidal anti-inflammatory drug (NSAID).',
    prescriptionRequired: false,
    criticalWarning:
      'May increase risk of heart attack or stroke, especially with long-term use. Take with food to reduce stomach upset. Do not use if you have active stomach ulcers or severe kidney disease.',
    uses: [
      'Relieving pain and inflammation',
      'Reducing fever',
      'Managing arthritis pain',
      'Relieving menstrual cramps',
    ],
    sideEffects: [
      'Stomach upset or heartburn',
      'Nausea',
      'Dizziness',
      'Headache',
      'Rare: stomach bleeding (seek medical help if severe)',
    ],
    precautions: [
      'Take with food or milk to reduce stomach upset',
      'Do not use if you have stomach ulcers or bleeding disorders',
      'Avoid during the third trimester of pregnancy',
      'Do not combine with other NSAIDs',
    ],
    interactions: [
      'Aspirin (reduces its heart-protective effect)',
      'Blood thinners (increased bleeding risk)',
      'Some blood pressure medicines',
      'Lithium',
    ],
    sources: [
      {
        title: 'Ibuprofen — Drug Information',
        url: 'https://medlineplus.gov/druginfo/meds/a682159.html',
        publisher: 'MedlinePlus (NIH)',
      },
      {
        title: 'NSAIDs — FDA Information',
        url: 'https://www.fda.gov/drugs/postmarket-drug-safety-information-patients-and-providers',
        publisher: 'U.S. FDA',
      },
    ],
  },

  {
    id: 'amoxicillin',
    genericName: 'Amoxicillin',
    brandNames: ['Amoxil', 'Mox', 'Novamox'],
    category: 'antibiotic',
    categoryLabel: 'Antibiotic',
    shortDescription: 'Penicillin-type antibiotic for bacterial infections.',
    prescriptionRequired: true,
    criticalWarning:
      'Only use when prescribed by a doctor. Do not share or save leftover antibiotics. Complete the full prescribed course even if you feel better — stopping early can cause resistant infections.',
    uses: [
      'Ear, nose, and throat infections',
      'Chest infections (pneumonia, bronchitis)',
      'Urinary tract infections',
      'Skin infections',
      'Dental infections',
    ],
    sideEffects: [
      'Nausea or vomiting',
      'Diarrhea',
      'Rash',
      'Rare: severe allergic reaction (anaphylaxis) — seek immediate help',
      'Rare: severe diarrhea (C. difficile)',
    ],
    precautions: [
      'Tell your doctor if you are allergic to penicillin',
      'Complete the full prescribed course',
      'May reduce effectiveness of oral contraceptives',
      'Inform your pharmacist of all other medications you take',
    ],
    interactions: [
      'Oral contraceptives (reduced effectiveness — use backup method)',
      'Methotrexate',
      'Allopurinol (increased rash risk)',
      'Warfarin',
    ],
    sources: [
      {
        title: 'Amoxicillin — Drug Information',
        url: 'https://medlineplus.gov/druginfo/meds/a685001.html',
        publisher: 'MedlinePlus (NIH)',
      },
      {
        title: 'Antibiotic Resistance — WHO',
        url: 'https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance',
        publisher: 'World Health Organization',
      },
    ],
  },

  {
    id: 'omeprazole',
    genericName: 'Omeprazole',
    brandNames: ['Prilosec', 'Omez', 'Losec'],
    category: 'gastro',
    categoryLabel: 'Gastrointestinal',
    shortDescription: 'Proton pump inhibitor (PPI) — reduces stomach acid.',
    prescriptionRequired: true,
    criticalWarning:
      'Long-term use may increase risk of bone fractures and certain infections. Do not use for more than 14 days without medical advice. Do not stop suddenly if you have been on it long-term — taper as directed by your doctor.',
    uses: [
      'Gastroesophageal reflux disease (GERD)',
      'Stomach and duodenal ulcers',
      'Heartburn',
      'Prevention of ulcers from NSAIDs',
    ],
    sideEffects: [
      'Headache',
      'Stomach pain',
      'Nausea or diarrhea',
      'Gas or bloating',
      'Long-term: vitamin B12 deficiency, increased fracture risk',
    ],
    precautions: [
      'Take at least 30 minutes before a meal',
      'Do not use for more than 14 days without medical advice',
      'Do not stop suddenly after long-term use',
      'Talk to a doctor if symptoms do not improve within 2 weeks',
    ],
    interactions: [
      'Clopidogrel (reduced effectiveness)',
      'Methotrexate (increased blood levels)',
      'Certain antifungals (reduced absorption)',
      'Warfarin',
    ],
    sources: [
      {
        title: 'Omeprazole — Drug Information',
        url: 'https://medlineplus.gov/druginfo/meds/a693050.html',
        publisher: 'MedlinePlus (NIH)',
      },
    ],
  },

  {
    id: 'metformin',
    genericName: 'Metformin',
    brandNames: ['Glucophage', 'Glycomet', 'Fortamet'],
    category: 'antidiabetic',
    categoryLabel: 'Antidiabetic',
    shortDescription: 'First-line medication for Type 2 diabetes.',
    prescriptionRequired: true,
    criticalWarning:
      'Rare but serious: lactic acidosis can occur, especially with kidney problems or alcohol use. Seek immediate medical help if you experience muscle pain, difficulty breathing, or unusual tiredness. Do not change or stop your dose without your doctor.',
    uses: [
      'Managing Type 2 diabetes',
      'Improving insulin sensitivity',
      'Sometimes used for prediabetes (with medical guidance)',
    ],
    sideEffects: [
      'Nausea, diarrhea, or stomach upset (especially at first)',
      'Metallic taste',
      'Vitamin B12 deficiency with long-term use',
      'Rare: lactic acidosis (seek immediate help if severe symptoms)',
    ],
    precautions: [
      'Take with meals to reduce stomach upset',
      'Regular kidney function tests recommended',
      'Avoid excessive alcohol use',
      'Inform your doctor before any scan using contrast dye',
    ],
    interactions: [
      'Alcohol (increased risk of lactic acidosis)',
      'Contrast dyes (temporary stopping recommended)',
      'Certain diuretics',
      'Some blood pressure medicines',
    ],
    sources: [
      {
        title: 'Metformin — Drug Information',
        url: 'https://medlineplus.gov/druginfo/meds/a696005.html',
        publisher: 'MedlinePlus (NIH)',
      },
      {
        title: 'WHO Essential Medicines List',
        url: 'https://www.who.int/groups/expert-committee-on-selection-and-use-of-essential-medicines/essential-medicines-lists',
        publisher: 'World Health Organization',
      },
    ],
  },

  {
    id: 'atorvastatin',
    genericName: 'Atorvastatin',
    brandNames: ['Lipitor', 'Atorva', 'Storvas'],
    category: 'statin',
    categoryLabel: 'Statin',
    shortDescription: 'Statin medication — lowers cholesterol.',
    prescriptionRequired: true,
    criticalWarning:
      'Rare but serious: muscle damage (rhabdomyolysis) or liver problems can occur. Seek immediate medical help if you experience unexplained muscle pain, weakness, or dark urine. Do not stop or change your dose without your doctor.',
    uses: [
      'Lowering LDL ("bad") cholesterol',
      'Reducing risk of heart attack and stroke',
      'Managing familial high cholesterol',
    ],
    sideEffects: [
      'Muscle aches',
      'Headache',
      'Digestive issues (constipation, diarrhea)',
      'Rare: muscle damage, liver problems',
    ],
    precautions: [
      'Take at the same time each day',
      'Avoid grapefruit juice (can increase blood levels)',
      'Regular liver function tests recommended',
      'Inform your doctor of any muscle pain',
    ],
    interactions: [
      'Grapefruit juice (increases blood levels)',
      'Certain antibiotics (clarithromycin)',
      'Some antifungals',
      'Warfarin (blood-thinning effect can change)',
    ],
    sources: [
      {
        title: 'Atorvastatin — Drug Information',
        url: 'https://medlineplus.gov/druginfo/meds/a600045.html',
        publisher: 'MedlinePlus (NIH)',
      },
    ],
  },

  {
    id: 'cetirizine',
    genericName: 'Cetirizine',
    brandNames: ['Zyrtec', 'Alerid', 'Cetzine'],
    category: 'antihistamine',
    categoryLabel: 'Antihistamine',
    shortDescription: 'Antihistamine for allergies and hay fever.',
    prescriptionRequired: false,
    criticalWarning:
      'May cause drowsiness. Avoid driving or operating machinery until you know how this medicine affects you. Avoid alcohol while taking cetirizine.',
    uses: [
      'Allergic rhinitis (hay fever)',
      'Hives (urticaria)',
      'Itchy, watery eyes from allergies',
      'Mild allergic reactions',
    ],
    sideEffects: [
      'Drowsiness (less than older antihistamines)',
      'Dry mouth',
      'Headache',
      'Fatigue',
    ],
    precautions: [
      'May cause drowsiness — avoid driving until you know your response',
      'Avoid alcohol',
      'Talk to a doctor if pregnant or breastfeeding',
      'Dose reduction may be needed for kidney problems',
    ],
    interactions: [
      'Alcohol (increased drowsiness)',
      'Other sedating medications',
      'Some anxiety medicines',
    ],
    sources: [
      {
        title: 'Cetirizine — Drug Information',
        url: 'https://medlineplus.gov/druginfo/meds/a698026.html',
        publisher: 'MedlinePlus (NIH)',
      },
    ],
  },

  {
    id: 'aspirin',
    genericName: 'Aspirin',
    brandNames: ['Disprin', 'Bayer', 'Ecosprin'],
    category: 'pain-relief',
    categoryLabel: 'Pain relief',
    shortDescription: 'NSAID — pain relief, fever, and blood-thinning.',
    prescriptionRequired: false,
    criticalWarning:
      'Do not give aspirin to children or teenagers under 18 due to Reye\u2019s syndrome risk. May increase risk of stomach bleeding. If you take it for heart protection, do not stop without medical advice.',
    uses: [
      'Relieving mild pain and fever',
      'Blood-thinning (low-dose, for cardiovascular protection)',
      'Preventing second heart attacks or strokes (with medical guidance)',
    ],
    sideEffects: [
      'Stomach irritation or upset',
      'Heartburn',
      'Increased bleeding tendency',
      'Rare: severe stomach bleeding',
    ],
    precautions: [
      'Do not give to children or teenagers under 18',
      'Avoid if you have stomach ulcers or bleeding disorders',
      'Do not stop prescribed low-dose aspirin without medical advice',
      'Inform your doctor before surgery or dental work',
    ],
    interactions: [
      'Blood thinners (increased bleeding risk)',
      'Ibuprofen (reduces aspirin\u2019s heart benefits)',
      'Some antidepressants',
      'Alcohol',
    ],
    sources: [
      {
        title: 'Aspirin — Drug Information',
        url: 'https://medlineplus.gov/druginfo/meds/a682878.html',
        publisher: 'MedlinePlus (NIH)',
      },
      {
        title: 'FDA Warning — Reye\u2019s Syndrome',
        url: 'https://www.fda.gov/drugs/information-drug-class',
        publisher: 'U.S. FDA',
      },
    ],
  },
];

/**
 * Get a medicine by its ID.
 */
export function getMedicineById(id) {
  return MOCK_MEDICINES.find((m) => m.id === id) || null;
}

/**
 * Search medicines by name, brand, or use.
 */
export function searchMedicines(query) {
  if (!query || !query.trim()) return MOCK_MEDICINES;
  const q = query.toLowerCase().trim();
  return MOCK_MEDICINES.filter((m) => {
    const matchesGeneric = m.genericName.toLowerCase().includes(q);
    const matchesBrand = m.brandNames.some((b) => b.toLowerCase().includes(q));
    const matchesUse = m.uses.some((u) => u.toLowerCase().includes(q));
    const matchesCategory = m.categoryLabel.toLowerCase().includes(q);
    return matchesGeneric || matchesBrand || matchesUse || matchesCategory;
  });
}

/**
 * Filter medicines by category.
 */
export function filterByCategory(medicines, categoryId) {
  if (!categoryId || categoryId === 'all') return medicines;
  return medicines.filter((m) => m.category === categoryId);
}