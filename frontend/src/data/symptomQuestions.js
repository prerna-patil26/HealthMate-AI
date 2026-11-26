/**
 * Symptom Guidance question definitions.
 * Drives the 5-step questionnaire + summary.
 *
 * Red-flag logic:
 *   - If ANY red flag = true → emergency response (call 112)
 *   - Otherwise → general guidance based on severity + duration
 */

// ---------- Step 1 — Primary symptom categories ----------

export const PRIMARY_SYMPTOMS = [
  {
    id: 'fever',
    label: 'Fever',
    icon: 'Thermometer',
    description: 'Body temperature higher than normal',
  },
  {
    id: 'headache',
    label: 'Headache',
    icon: 'Brain',
    description: 'Pain or pressure in the head',
  },
  {
    id: 'cough',
    label: 'Cough',
    icon: 'Wind',
    description: 'Dry or productive cough',
  },
  {
    id: 'sore-throat',
    label: 'Sore throat',
    icon: 'Mic',
    description: 'Pain or scratchiness in the throat',
  },
  {
    id: 'stomach',
    label: 'Stomach pain',
    icon: 'UtensilsCrossed',
    description: 'Pain or discomfort in the abdomen',
  },
  {
    id: 'fatigue',
    label: 'Fatigue',
    icon: 'BatteryLow',
    description: 'Persistent tiredness or low energy',
  },
  {
    id: 'shortness-breath',
    label: 'Shortness of breath',
    icon: 'Wind',
    description: 'Difficulty breathing or catching breath',
  },
  {
    id: 'body-ache',
    label: 'Body ache',
    icon: 'Activity',
    description: 'Muscle or joint pain',
  },
  {
    id: 'other',
    label: 'Something else',
    icon: 'HelpCircle',
    description: 'A symptom not listed here',
  },
];

// ---------- Step 2 — Duration ----------

export const DURATION_OPTIONS = [
  { id: 'less-than-24h', label: 'Less than 24 hours' },
  { id: '1-3-days', label: '1 to 3 days' },
  { id: '4-7-days', label: '4 to 7 days' },
  { id: '1-2-weeks', label: '1 to 2 weeks' },
  { id: 'more-than-2-weeks', label: 'More than 2 weeks' },
];

// ---------- Step 3 — Severity ----------

export const SEVERITY_LEVELS = [
  { value: 1, label: 'Very mild', color: '#198754' },
  { value: 2, label: 'Mild', color: '#198754' },
  { value: 3, label: 'Mild', color: '#5BAE6C' },
  { value: 4, label: 'Moderate', color: '#D99A24' },
  { value: 5, label: 'Moderate', color: '#D99A24' },
  { value: 6, label: 'Moderate', color: '#D99A24' },
  { value: 7, label: 'Severe', color: '#DC8345' },
  { value: 8, label: 'Severe', color: '#DC3545' },
  { value: 9, label: 'Very severe', color: '#DC3545' },
  { value: 10, label: 'Unbearable', color: '#B02A38' },
];

export const SEVERITY_HELPER = {
  title: 'How severe does it feel right now?',
  hint: '1 = barely noticeable · 10 = worst you can imagine',
};

// ---------- Step 4 — Related symptoms ----------

export const RELATED_SYMPTOMS = [
  { id: 'nausea', label: 'Nausea' },
  { id: 'vomiting', label: 'Vomiting' },
  { id: 'diarrhea', label: 'Diarrhea' },
  { id: 'dizziness', label: 'Dizziness' },
  { id: 'chills', label: 'Chills' },
  { id: 'sweating', label: 'Sweating' },
  { id: 'chest-tightness', label: 'Chest tightness' },
  { id: 'runny-nose', label: 'Runny nose' },
  { id: 'sneezing', label: 'Sneezing' },
  { id: 'loss-appetite', label: 'Loss of appetite' },
  { id: 'sleep-problems', label: 'Sleep problems' },
  { id: 'rash', label: 'Skin rash' },
];

// ---------- Step 5 — Red-flag screening ----------

/**
 * These are critical emergency checks.
 * If ANY of these are TRUE → show emergency banner + call 112.
 * These align with standard medical red-flag criteria.
 */
export const RED_FLAGS = [
  {
    id: 'chest-pain',
    label: 'Chest pain or pressure',
    description:
      'Pain, tightness, or pressure in the chest, especially spreading to the arm, jaw, or back',
  },
  {
    id: 'breathing',
    label: 'Severe difficulty breathing',
    description:
      'Cannot catch your breath at rest, or lips turning blue',
  },
  {
    id: 'consciousness',
    label: 'Fainting or loss of consciousness',
    description: 'Briefly blacked out, or hard to stay awake',
  },
  {
    id: 'sudden-weakness',
    label: 'Sudden weakness or numbness',
    description:
      'Weakness or numbness on one side of the face, arm, or leg',
  },
  {
    id: 'severe-bleeding',
    label: 'Severe bleeding',
    description: 'Heavy bleeding that will not stop with pressure',
  },
  {
    id: 'severe-headache',
    label: 'Sudden, severe headache',
    description:
      'The worst headache of your life, or one that came on very suddenly',
  },
  {
    id: 'confusion',
    label: 'Confusion or difficulty speaking',
    description:
      'Sudden confusion, trouble finding words, or slurred speech',
  },
];

// ---------- Care navigation logic ----------

/**
 * Given the completed form, returns the appropriate guidance.
 * Returns either an emergency response OR a general response.
 *
 * @param {object} form - { primarySymptom, duration, severity, relatedSymptoms, redFlags }
 * @returns {object} { type, title, description, steps, emergency }
 */
export function getGuidance(form) {
  const hasRedFlag = Object.values(form.redFlags || {}).some((v) => v === true);

  if (hasRedFlag) {
    return {
      type: 'emergency',
      title: 'Please seek urgent medical care',
      description:
        'Based on your answers, you have one or more symptoms that require immediate medical attention. Do not wait for further guidance.',
      steps: [
        'Call 112 (India emergency services) immediately.',
        'If possible, have someone stay with you.',
        'Do not drive yourself to the hospital.',
        'Bring any relevant medication or medical information if you can.',
      ],
      emergency: true,
    };
  }

  // General guidance — severity and duration aware
  const severity = form.severity || 0;
  const duration = form.duration || '';

  if (severity >= 8) {
    return {
      type: 'urgent',
      title: 'Consider seeing a doctor soon',
      description:
        'Your symptoms are severe. It is worth speaking to a healthcare provider within 24–48 hours, especially if they worsen.',
      steps: [
        'Book a same-day or next-day appointment with a doctor.',
        'Rest and stay hydrated.',
        'Monitor your symptoms — if they worsen, seek urgent care.',
        'Avoid self-medicating without professional advice.',
      ],
      emergency: false,
    };
  }

  if (duration === 'more-than-2-weeks') {
    return {
      type: 'follow-up',
      title: 'Recommended: schedule a check-up',
      description:
        'Symptoms lasting more than 2 weeks deserve professional attention, even when mild. A doctor can help rule out underlying causes.',
      steps: [
        'Book a routine appointment with a general physician.',
        'Keep a symptom diary — dates, severity, and triggers.',
        'Note any changes in appetite, sleep, or weight.',
        'Bring a list of any medications you are taking.',
      ],
      emergency: false,
    };
  }

  return {
    type: 'self-care',
    title: 'Self-care is likely appropriate',
    description:
      'Based on your answers, these symptoms may be manageable at home. Monitor them and seek professional advice if they worsen or persist.',
    steps: [
      'Rest and stay well hydrated.',
      'Monitor your symptoms — note any worsening.',
      'Over-the-counter remedies may help (follow label instructions).',
      'If symptoms do not improve within 3–5 days, see a doctor.',
    ],
    emergency: false,
  };
}

// ---------- Metadata ----------

export const TOTAL_STEPS = 5;

export const STEP_TITLES = [
  'What brings you here?',
  'How long have you had this?',
  'How severe is it?',
  'Any related symptoms?',
  'Emergency check',
];