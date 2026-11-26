/**
 * Mock AI responses for the Health Assistant.
 * Will be replaced with real backend calls in Phase 9.
 *
 * Each response shape:
 * {
 *   text: string,
 *   sources: [{ title, url, publisher, verified }],
 *   showSafetyBanner: boolean,
 *   safetyVariant: 'default' | 'emergency',
 *   suggestions: string[],
 * }
 */

// ---------- Response templates ----------

const RESPONSES = {
  report: {
    text: "I can help you understand your medical report. For any value, you should see three things: the observed value, the reference range, and the unit. Values outside the reference range don't automatically mean disease — many factors (time of day, hydration, recent meals, stress) can shift readings.\n\nIf you share the test name and value, I can explain what it typically measures and why doctors track it. But please review the original report with the clinician who ordered it before acting on any value.",
    sources: [
      {
        title: 'How to Read Your Lab Results',
        url: 'https://medlineplus.gov/lab-tests/how-to-understand-your-lab-results/',
        publisher: 'MedlinePlus (NIH)',
        verified: true,
      },
      {
        title: 'Reference Ranges and What They Mean',
        url: 'https://www.who.int/',
        publisher: 'World Health Organization',
        verified: true,
      },
    ],
    showSafetyBanner: true,
    safetyVariant: 'default',
    suggestions: [
      'What does a high hemoglobin mean?',
      'How is cholesterol measured?',
      'Should I fast before a blood test?',
    ],
  },

  general: {
    text: "Happy to help with general health questions. To give you a useful answer, I'll usually need to know a little context — what you're experiencing, how long it's been going on, and any relevant background.\n\nI don't diagnose conditions or recommend specific treatments. What I can do is explain how the body works, what common symptoms often mean, and when it's worth seeing a doctor. What would you like to explore?",
    sources: [
      {
        title: 'Symptom Checker — When to See a Doctor',
        url: 'https://medlineplus.gov/symptoms.html',
        publisher: 'MedlinePlus (NIH)',
        verified: true,
      },
    ],
    showSafetyBanner: true,
    safetyVariant: 'default',
    suggestions: [
      'How much water should I drink daily?',
      'What are signs of dehydration?',
      'How can I improve my sleep?',
    ],
  },

  symptom: {
    text: "Thanks for sharing that. To help me understand better, I'd like to know:\n\n1. How long have you been experiencing this?\n2. Is it constant or does it come and go?\n3. On a scale of 1–10, how severe is it?\n4. Are there other symptoms alongside it?\n\nBased on your answers, I can suggest general information and whether it might be worth seeing a doctor. For urgent symptoms — chest pain, difficulty breathing, severe bleeding, sudden weakness — call 112 immediately.",
    sources: [
      {
        title: 'Symptom Assessment Guidance',
        url: 'https://www.nhs.uk/symptoms/',
        publisher: 'NHS (UK)',
        verified: true,
      },
      {
        title: 'When to Seek Emergency Care',
        url: 'https://www.cdc.gov/',
        publisher: 'CDC',
        verified: true,
      },
    ],
    showSafetyBanner: true,
    safetyVariant: 'default',
    suggestions: [
      'I have a headache that won\u2019t go away',
      'I feel dizzy when standing up',
      'I have a mild fever',
    ],
  },

  medicine: {
    text: "I can share general information about medicines — what they're typically used for, common side effects, and precautions. What I cannot do is recommend a dose, change your prescription, or suggest stopping a medicine your doctor prescribed.\n\nWhich medicine would you like to learn about? Or, if you have a prescription with unclear handwriting, I can help you interpret it and flag anything for your pharmacist to verify.",
    sources: [
      {
        title: 'Drugs & Supplements Information',
        url: 'https://medlineplus.gov/druginformation.html',
        publisher: 'MedlinePlus (NIH)',
        verified: true,
      },
      {
        title: 'Medicines — Safety and Side Effects',
        url: 'https://www.fda.gov/drugs',
        publisher: 'U.S. FDA',
        verified: true,
      },
    ],
    showSafetyBanner: true,
    safetyVariant: 'default',
    suggestions: [
      'What is paracetamol used for?',
      'Common side effects of ibuprofen?',
      'Can I take antibiotics with food?',
    ],
  },

  find: {
    text: "I can help you think through what type of care you need and what to search for in your area. I don't have live availability or booking data yet, so I can't confirm appointments — but I can point you in the right direction.\n\nWhat kind of care are you looking for? For example:\n• A general physician for a routine check-up\n• A specialist (cardiologist, dermatologist, etc.)\n• A diagnostic lab for blood tests\n• An emergency department (for urgent, life-threatening symptoms)\n\nTell me the city or area you're in and I'll help you form a search plan.",
    sources: [
      {
        title: 'Finding Healthcare Providers',
        url: 'https://www.nhs.uk/service-search/',
        publisher: 'NHS (UK)',
        verified: true,
      },
      {
        title: 'Choosing a Doctor — Guidance',
        url: 'https://www.icmr.gov.in/',
        publisher: 'ICMR (India)',
        verified: true,
      },
    ],
    showSafetyBanner: true,
    safetyVariant: 'default',
    suggestions: [
      'Find a cardiologist near me',
      'Where can I get a blood test done?',
      'How do I choose a primary care doctor?',
    ],
  },

  emergency: {
    text: "That sounds like it could be a medical emergency. Please stop using this app and call 112 (India emergency services) immediately, or go to the nearest emergency department.\n\nSigns that need urgent medical attention include:\n• Chest pain or pressure\n• Difficulty breathing or shortness of breath\n• Sudden weakness or numbness on one side\n• Severe, sudden headache\n• Heavy bleeding that won't stop\n• Loss of consciousness\n\nPlease do not wait for an AI response — get to a doctor or call emergency services now.",
    sources: [
      {
        title: 'Emergency Warning Signs',
        url: 'https://www.nhs.uk/conditions/',
        publisher: 'NHS (UK)',
        verified: true,
      },
    ],
    showSafetyBanner: true,
    safetyVariant: 'emergency',
    suggestions: [],
  },

  fallback: {
    text: "I'm here to help with general health information — understanding medical reports, exploring symptom guidance, learning about medicines, or finding healthcare services.\n\nI don't diagnose conditions or replace professional medical advice. Could you tell me a bit more about what you'd like to explore? For example, you could share a test result you'd like explained, or describe a symptom you've been noticing.",
    sources: [
      {
        title: 'Health Information — Overview',
        url: 'https://medlineplus.gov/',
        publisher: 'MedlinePlus (NIH)',
        verified: true,
      },
    ],
    showSafetyBanner: true,
    safetyVariant: 'default',
    suggestions: [
      'Understand my medical report',
      'Ask a general health question',
      'Explore symptom guidance',
    ],
  },
};

// ---------- Intent detection ----------

function detectIntent(text) {
  const lower = text.toLowerCase();

  // Emergency keywords — highest priority
  const emergencyKeywords = [
    'chest pain',
    'can\u2019t breathe',
    "can't breathe",
    'difficulty breathing',
    'shortness of breath',
    'heart attack',
    'stroke',
    'severe bleeding',
    'unconscious',
    'suicide',
    'overdose',
    'emergency',
  ];
  if (emergencyKeywords.some((k) => lower.includes(k))) return 'emergency';

  // Report-related
  if (
    /\b(report|lab|test result|hemoglobin|cholesterol|sugar|hba1c|blood work|scan|x-ray|mri|ct scan|urine|creatinine|thyroid)/i.test(
      lower
    )
  )
    return 'report';

  // Medicine-related
  if (
    /\b(medicine|medication|drug|tablet|pill|dose|dosage|side effect|prescription|paracetamol|ibuprofen|antibiotic|aspirin)/i.test(
      lower
    )
  )
    return 'medicine';

  // Finding doctors
  if (/\b(find|doctor|hospital|clinic|specialist|near me|appointment|book)/i.test(lower))
    return 'find';

  // Symptom-related
  if (
    /\b(symptom|pain|ache|hurt|fever|cough|cold|headache|dizzy|nausea|vomit|tired|fatigue|sore|rash|itch)/i.test(
      lower
    )
  )
    return 'symptom';

  // General health question
  if (/\b(health|healthy|diet|exercise|sleep|water|nutrition|vitamin|stress|anxiety)/i.test(lower))
    return 'general';

  return 'fallback';
}

// ---------- Public API ----------

/**
 * Given a user message, returns the appropriate mock AI response.
 * Simulates a network delay handled by the caller (AssistantPage).
 */
export function getMockResponse(userText) {
  const intent = detectIntent(userText);
  const response = RESPONSES[intent] || RESPONSES.fallback;

  return {
    id: `ai-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    role: 'ai',
    text: response.text,
    sources: response.sources,
    showSafetyBanner: response.showSafetyBanner,
    safetyVariant: response.safetyVariant,
    suggestions: response.suggestions,
    timestamp: formatTime(new Date()),
  };
}

/**
 * Formats a Date to "10:42 AM" style.
 */
export function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Returns the suggested action prompt strings used by WelcomeScreen.
 * Handy if you ever want to share them between components.
 */
export const SUGGESTED_PROMPTS = {
  report: 'I have a medical report and I want help understanding the values.',
  general: 'I have a general health question I would like to understand better.',
  symptom: 'I would like to explore symptom guidance for something I am experiencing.',
  medicine: 'I want to learn about a specific medicine — its uses and precautions.',
  find: 'I am looking for a doctor or hospital for a specific need.',
};