/**
 * Mock medical reports data for the Reports module.
 * Will be replaced with real uploads + OCR extraction in Phase 9.
 */

export const MOCK_REPORTS = [
  {
    id: 'report-1',
    title: 'Blood Test — Lipid Profile',
    fileName: 'lipid-profile-2026-11-23.pdf',
    type: 'lipid-profile',
    typeLabel: 'Lipid Profile',
    uploadedAt: '2026-11-23T10:30:00Z',
    overview:
      'A lipid profile measures cholesterol and triglycerides in your blood. It helps assess heart health. Some values in this report are outside the reference range — this does not automatically mean disease. Discuss with your doctor.',
    values: [
      {
        id: 'v-1-1',
        testName: 'Total Cholesterol',
        value: 220,
        unit: 'mg/dL',
        referenceRange: '< 200',
        status: 'high',
        explanation:
          'Total cholesterol is the sum of all cholesterol in your blood. Values above 200 mg/dL are considered elevated and worth discussing with a doctor — especially if other lipid values are also high.',
        uncertain: false,
      },
      {
        id: 'v-1-2',
        testName: 'LDL Cholesterol',
        value: 140,
        unit: 'mg/dL',
        referenceRange: '< 100',
        status: 'high',
        explanation:
          'LDL is often called "bad" cholesterol because high levels are linked to heart disease risk. Values below 100 mg/dL are ideal for most adults.',
        uncertain: false,
      },
      {
        id: 'v-1-3',
        testName: 'HDL Cholesterol',
        value: 55,
        unit: 'mg/dL',
        referenceRange: '> 40',
        status: 'normal',
        explanation:
          'HDL is often called "good" cholesterol. Higher levels are generally protective. Values above 40 mg/dL for men or 50 mg/dL for women are considered healthy.',
        uncertain: false,
      },
      {
        id: 'v-1-4',
        testName: 'Triglycerides',
        value: 185,
        unit: 'mg/dL',
        referenceRange: '< 150',
        status: 'high',
        explanation:
          'Triglycerides are a type of fat in your blood. Elevated levels can be related to diet, activity, and other factors. Discuss with your doctor.',
        uncertain: false,
      },
      {
        id: 'v-1-5',
        testName: 'VLDL Cholesterol',
        value: 37,
        unit: 'mg/dL',
        referenceRange: '5 – 40',
        status: 'normal',
        explanation:
          'VLDL carries triglycerides in the blood. Levels are usually calculated from triglycerides.',
        uncertain: false,
      },
      {
        id: 'v-1-6',
        testName: 'Total Cholesterol / HDL Ratio',
        value: 4.0,
        unit: 'ratio',
        referenceRange: '< 5.0',
        status: 'normal',
        explanation:
          'This ratio compares total cholesterol to HDL. A lower ratio is generally better for heart health.',
        uncertain: false,
      },
    ],
  },

  {
    id: 'report-2',
    title: 'Complete Blood Count (CBC)',
    fileName: 'cbc-report-2026-11-20.pdf',
    type: 'cbc',
    typeLabel: 'Complete Blood Count',
    uploadedAt: '2026-11-20T14:15:00Z',
    overview:
      'A complete blood count (CBC) measures the different types of cells in your blood. It is one of the most common tests and helps assess overall health.',
    values: [
      {
        id: 'v-2-1',
        testName: 'Hemoglobin',
        value: 14.2,
        unit: 'g/dL',
        referenceRange: '13.5 – 17.5',
        status: 'normal',
        explanation:
          'Hemoglobin carries oxygen in red blood cells. Levels vary by age and sex. Your value is in the normal range.',
        uncertain: false,
      },
      {
        id: 'v-2-2',
        testName: 'Red Blood Cell Count',
        value: 5.1,
        unit: 'million/µL',
        referenceRange: '4.5 – 5.9',
        status: 'normal',
        explanation:
          'The number of red blood cells in your blood. This value is within the normal range.',
        uncertain: false,
      },
      {
        id: 'v-2-3',
        testName: 'Hematocrit',
        value: 42,
        unit: '%',
        referenceRange: '38.8 – 50.0',
        status: 'normal',
        explanation: 'The percentage of your blood made up of red blood cells.',
        uncertain: false,
      },
      {
        id: 'v-2-4',
        testName: 'White Blood Cell Count',
        value: 7.2,
        unit: 'thousand/µL',
        referenceRange: '4.5 – 11.0',
        status: 'normal',
        explanation:
          'White blood cells help fight infection. Your count is in the normal range.',
        uncertain: false,
      },
      {
        id: 'v-2-5',
        testName: 'Platelet Count',
        value: 240,
        unit: 'thousand/µL',
        referenceRange: '150 – 450',
        status: 'normal',
        explanation:
          'Platelets help your blood clot. Your count is within normal range.',
        uncertain: false,
      },
      {
        id: 'v-2-6',
        testName: 'MCV',
        value: 88,
        unit: 'fL',
        referenceRange: '80 – 100',
        status: 'normal',
        explanation:
          'Mean corpuscular volume — average size of your red blood cells.',
        uncertain: false,
      },
    ],
  },

  {
    id: 'report-3',
    title: 'Thyroid Panel',
    fileName: 'thyroid-test-2026-11-15.pdf',
    type: 'thyroid',
    typeLabel: 'Thyroid Panel',
    uploadedAt: '2026-11-15T09:00:00Z',
    overview:
      'A thyroid panel measures hormones produced by your thyroid gland. These hormones influence many body functions, including energy and metabolism.',
    values: [
      {
        id: 'v-3-1',
        testName: 'TSH (Thyroid Stimulating Hormone)',
        value: 3.2,
        unit: 'mIU/L',
        referenceRange: '0.4 – 4.0',
        status: 'normal',
        explanation:
          'TSH signals the thyroid to produce hormones. Your value is within the reference range.',
        uncertain: false,
      },
      {
        id: 'v-3-2',
        testName: 'T3 (Triiodothyronine)',
        value: 2.5,
        unit: 'nmol/L',
        referenceRange: '1.2 – 3.1',
        status: 'normal',
        explanation: 'A thyroid hormone that affects energy and metabolism.',
        uncertain: false,
      },
      {
        id: 'v-3-3',
        testName: 'T4 (Thyroxine)',
        value: 105,
        unit: 'nmol/L',
        referenceRange: '66 – 181',
        status: 'normal',
        explanation:
          'A hormone made by the thyroid. Your value is within range.',
        uncertain: false,
      },
      {
        id: 'v-3-4',
        testName: 'Free T4',
        value: 15,
        unit: 'pmol/L',
        referenceRange: '12 – 22',
        status: 'normal',
        explanation:
          'The unbound portion of T4, which is the active form your body uses.',
        uncertain: false,
      },
    ],
  },

  {
    id: 'report-4',
    title: 'Blood Sugar Test (Fasting)',
    fileName: 'blood-sugar-2026-11-10.pdf',
    type: 'blood-test',
    typeLabel: 'Blood Test',
    uploadedAt: '2026-11-10T07:45:00Z',
    overview:
      'A fasting blood sugar test measures glucose (sugar) in your blood after not eating for at least 8 hours. It is used to screen for diabetes and pre-diabetes.',
    values: [
      {
        id: 'v-4-1',
        testName: 'Fasting Glucose',
        value: 118,
        unit: 'mg/dL',
        referenceRange: '< 100',
        status: 'high',
        explanation:
          'A fasting glucose between 100–125 mg/dL is often called "prediabetes" — though only a doctor can diagnose. Changes in diet, exercise, and regular monitoring can help.',
        uncertain: false,
      },
      {
        id: 'v-4-2',
        testName: 'HbA1c',
        value: 5.8,
        unit: '%',
        referenceRange: '< 5.7',
        status: 'high',
        explanation:
          'HbA1c reflects your average blood sugar over the last 2–3 months. Values of 5.7–6.4% are considered pre-diabetes.',
        uncertain: false,
      },
      {
        id: 'v-4-3',
        testName: 'Random Glucose',
        value: 132,
        unit: 'mg/dL',
        referenceRange: '< 140',
        status: 'normal',
        explanation:
          'Random glucose is measured without fasting. Your value is within the normal range.',
        uncertain: true,
      },
    ],
  },

  {
    id: 'report-5',
    title: 'Kidney Function Test',
    fileName: 'kidney-function-2026-11-05.pdf',
    type: 'blood-test',
    typeLabel: 'Blood Test',
    uploadedAt: '2026-11-05T16:20:00Z',
    overview:
      'A kidney function test measures how well your kidneys are filtering waste. It includes creatinine, urea, and other markers.',
    values: [
      {
        id: 'v-5-1',
        testName: 'Creatinine',
        value: 0.95,
        unit: 'mg/dL',
        referenceRange: '0.6 – 1.3',
        status: 'normal',
        explanation:
          'Creatinine is a waste product filtered by your kidneys. Your value is within the normal range.',
        uncertain: false,
      },
      {
        id: 'v-5-2',
        testName: 'Blood Urea Nitrogen (BUN)',
        value: 15,
        unit: 'mg/dL',
        referenceRange: '7 – 20',
        status: 'normal',
        explanation:
          'Urea nitrogen is another waste product filtered by your kidneys.',
        uncertain: false,
      },
      {
        id: 'v-5-3',
        testName: 'eGFR',
        value: 95,
        unit: 'mL/min/1.73m²',
        referenceRange: '> 60',
        status: 'normal',
        explanation:
          'Estimated glomerular filtration rate — a measure of kidney filtering efficiency.',
        uncertain: false,
      },
      {
        id: 'v-5-4',
        testName: 'Uric Acid',
        value: 7.8,
        unit: 'mg/dL',
        referenceRange: '3.5 – 7.2',
        status: 'high',
        explanation:
          'Uric acid is a waste product. Slightly elevated values can be related to diet and hydration. Discuss with your doctor if this persists.',
        uncertain: true,
      },
    ],
  },
];

/**
 * Helper: total count of values across all reports.
 */
export function getTotalValueCount() {
  return MOCK_REPORTS.reduce((sum, r) => sum + r.values.length, 0);
}

/**
 * Helper: count of values marked "high" or "low" in a report.
 */
export function getFlaggedCount(report) {
  if (!report || !report.values) return 0;
  return report.values.filter(
    (v) => v.status === 'high' || v.status === 'low'
  ).length;
}

/**
 * Helper: count of uncertain values in a report.
 */
export function getUncertainCount(report) {
  if (!report || !report.values) return 0;
  return report.values.filter((v) => v.uncertain).length;
}

/**
 * Helper: get a report by ID.
 */
export function getReportById(id) {
  return MOCK_REPORTS.find((r) => r.id === id) || null;
}