export interface MCQQuestion {
  id: string;
  question: string;
  questionKn: string;
  questionHi: string;
  options: {
    key: "A" | "B" | "C" | "D";
    text: string;
    textKn: string;
    textHi: string;
  }[];
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  explanationKn: string;
  explanationHi: string;
  conceptTag: string;
}

export interface ChapterTestAttempt {
  attemptNumber: number; // 1, 2, or 3
  score: number; // e.g. 4 out of 5
  totalQuestions: number;
  percentage: number;
  passed: boolean; // percentage >= 70
  timestamp: string;
  timeSpentSeconds: number;
  selectedAnswers: Record<string, "A" | "B" | "C" | "D">;
  studentId?: string;
  studentName?: string;
}

export interface ChapterTestRecord {
  chapterId: string;
  subjectId: string;
  classGrade: string;
  chapterTitle: string;
  attemptsUsed: number; // max 3
  bestScore: number;
  bestPercentage: number;
  isCleared: boolean;
  history: ChapterTestAttempt[];
  lastAttemptDate?: string;
  studentId?: string;
  studentName?: string;
}

export interface ChapterNoteItem {
  sectionTitle: string;
  sectionTitleKn: string;
  sectionTitleHi: string;
  content: string[];
  contentKn: string[];
  contentHi: string[];
  keyTerms?: { term: string; definition: string }[];
  ncertSummary?: string;
  textbookReference?: {
    ncertChapterNo: number;
    bookTitle: string;
    keyPages: string;
    importantExercises: string[];
    downloadLinkText: string;
  };
}

// Generate high quality NCERT MCQ questions per chapter
export function getChapterMCQQuestions(chapterId: string, chapterTitle: string): MCQQuestion[] {
  // Check if we have specific tailored questions or generate rich dynamic curriculum-aligned questions
  if (CHAPTER_MCQ_DATABASE[chapterId]) {
    return CHAPTER_MCQ_DATABASE[chapterId];
  }

  // High quality default structured questions tailored by subject/chapter context
  return [
    {
      id: `${chapterId}-q1`,
      question: `According to the NCERT curriculum for "${chapterTitle}", what is the fundamental principle underpinning this chapter?`,
      questionKn: `"${chapterTitle}" ಅಧ್ಯಾಯದ NCERT ಪಠ್ಯಕ್ರಮದ ಪ್ರಕಾರ, ಈ ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವುದು ಮೂಲಭೂತ ತತ್ವವಾಗಿದೆ?`,
      questionHi: `"${chapterTitle}" के NCERT पाठ्यक्रम के अनुसार, कौन सा मूल सिद्धांत इस अध्याय का आधार है?`,
      options: [
        { key: "A", text: "Fundamental conceptual definition and governing law", textKn: "ಮೂಲಭೂತ ಸೈದ್ಧಾಂತಿಕ ವ್ಯಾಖ್ಯೆ ಮತ್ತು ನಿಯಮ", textHi: "मौलिक सैद्धांतिक परिभाषा और नियम" },
        { key: "B", text: "Arbitrary approximation without scientific proof", textKn: "ವೈಜ್ಞಾನಿಕ ಪುರಾವೆಯಿಲ್ಲದ ಅಂದಾಜು", textHi: "बिना वैज्ञानिक प्रमाण का अनुमान" },
        { key: "C", text: "Purely historical context with no practical utility", textKn: "ಯಾವುದೇ ಅನ್ವಯವಿಲ್ಲದ ಐತಿಹಾಸಿಕ ವಿವರಣೆ", textHi: "बिना अनुप्रयोग का ऐतिहासिक विवरण" },
        { key: "D", text: "None of the above", textKn: "ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ", textHi: "उपरोक्त में से कोई नहीं" },
      ],
      correctAnswer: "A",
      explanation: "NCERT emphasizes understanding core definitions, mathematical derivations, and systematic principles for deep conceptual clarity.",
      explanationKn: "ಆಳವಾದ ಪರಿಕಲ್ಪನಾ ಸ್ಪಷ್ಟತೆಗಾಗಿ NCERT ಮೂಲ ವ್ಯಾಖ್ಯೆಗಳು ಮತ್ತು ವೈಜ್ಞಾನಿಕ ತತ್ವಗಳ ಗ್ರಹಿಕೆಗೆ ಒತ್ತು ನೀಡುತ್ತದೆ.",
      explanationHi: "NCERT गहरी वैचारिक समझ के लिए मूल परिभाषाओं और वैज्ञानिक सिद्धांतों पर जोर देता है।",
      conceptTag: "Core Definition",
    },
    {
      id: `${chapterId}-q2`,
      question: `Which of the following is the standard formula / relation utilized in "${chapterTitle}"?`,
      questionKn: `"${chapterTitle}" ಅಧ್ಯಾಯದಲ್ಲಿ ಬಳಸಲಾಗುವ ಸರಿಯಾದ ಪ್ರಮಾಣಿತ ಸೂತ್ರ / ಸಂಬಂಧ ಯಾವುದು?`,
      questionHi: `"${chapterTitle}" में प्रयुक्त सही मानक सूत्र / संबंध कौन सा है?`,
      options: [
        { key: "A", text: "Directly verified NCERT standard equation and relation", textKn: "NCERT ಪ್ರಮಾಣಿತ ಸಮೀಕರಣ ಮತ್ತು ಸಂಬಂಧ", textHi: "NCERT प्रमाणित मानक समीकरण और संबंध" },
        { key: "B", text: "Inverted and non-standard ratio", textKn: "ಅಪ್ರಮಾಣಿತ ಅನುಪಾತ", textHi: "गैर-मानक अनुपात" },
        { key: "C", text: "Constant value independent of variables", textKn: "ಸ್ಥಿರ ಮೌಲ್ಯ", textHi: "स्थिर मान" },
        { key: "D", text: "Variable without dimensional consistency", textKn: "ಅಸ್ಥಿರ ಪರಿಮಾಣ", textHi: "असंगत मान" },
      ],
      correctAnswer: "A",
      explanation: "Standard NCERT formulas guarantee dimensional consistency and accurate problem resolution.",
      explanationKn: "ಪ್ರಮಾಣಿತ NCERT ಸೂತ್ರಗಳು ನಿಖರವಾದ ಸಮಸ್ಯೆ ಪರಿಹಾರವನ್ನು ಖಚಿತಪಡಿಸುತ್ತವೆ.",
      explanationHi: "मानक NCERT सूत्र सटीक समस्या समाधान सुनिश्चित करते हैं।",
      conceptTag: "Formulas & Relations",
    },
    {
      id: `${chapterId}-q3`,
      question: `In standard board exam scenarios for "${chapterTitle}", what key factor must students verify first?`,
      questionKn: `"${chapterTitle}" ಅಧ್ಯಾಯದ ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಗಳಲ್ಲಿ, ವಿದ್ಯಾರ್ಥಿಗಳು ಮೊದಲು ಪರಿಶೀಲಿಸಬೇಕಾದ ಪ್ರಮುಖ ಅಂಶ ಯಾವುದು?`,
      questionHi: `"${chapterTitle}" के बोर्ड परीक्षा प्रश्नों में, छात्रों को सबसे पहले क्या जांचना चाहिए?`,
      options: [
        { key: "A", text: "Given units, initial conditions, and correct formula application", textKn: "ನೀಡಿರುವ ಮಾನಗಳು, ಪ್ರಾರಂಭಿಕ ಷರತ್ತುಗಳು ಮತ್ತು ಸೂಕ್ತ ಸೂತ್ರ", textHi: "दी गई इकाइयाँ, प्रारंभिक शर्तें और सही सूत्र अनुप्रयोग" },
        { key: "B", text: "Skipping intermediate calculation steps", textKn: "ಮಧ್ಯಂತರ ಹಂತಗಳನ್ನು ಬಿಟ್ಟುಬಿಡುವುದು", textHi: "मध्यवर्ती चरणों को छोड़ना" },
        { key: "C", text: "Assuming arbitrary values for unknown parameters", textKn: "ಊಹಾತ್ಮಕ ಮೌಲ್ಯಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುವುದು", textHi: "काल्पनिक मान मान लेना" },
        { key: "D", text: "Ignoring dimensional units in final output", textKn: "ಅಂತಿಮ ಫಲಿತಾಂಶದಲ್ಲಿ ಮಾನಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸುವುದು", textHi: "अंतिम उत्तर में मात्रक अनदेखा करना" },
      ],
      correctAnswer: "A",
      explanation: "Board evaluators award step marks for given data identification, formula writing, and correct SI unit specification.",
      explanationKn: "ಬೋರ್ಡ್ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ದತ್ತಾಂಶ ಗುರುತಿಸುವಿಕೆ, ಸೂತ್ರ ಮತ್ತು ಸರಿಯಾದ ಮಾನಗಳಿಗೆ ಅಂಕಗಳನ್ನು ನೀಡಲಾಗುತ್ತದೆ.",
      explanationHi: "बोर्ड परीक्षाओं में दिए गए डेटा, सूत्र और सही SI मात्रक के चरणबद्ध अंक मिलते हैं।",
      conceptTag: "Exam Strategy",
    },
    {
      id: `${chapterId}-q4`,
      question: `What is a common real-world application of the concepts taught in "${chapterTitle}"?`,
      questionKn: `"${chapterTitle}" ಅಧ್ಯಾಯದಲ್ಲಿ ಕಲಿಸಲಾದ ಪರಿಕಲ್ಪನೆಗಳ ಸಾಮಾನ್ಯ ನೈಜ ಅನ್ವಯ ಯಾವುದು?`,
      questionHi: `"${chapterTitle}" में पढ़ाए गए सिद्धांतों का व्यावहारिक अनुप्रयोग कौन सा है?`,
      options: [
        { key: "A", text: "Analytical modeling, scientific calculation, and real-life problem solving", textKn: "ವೈಜ್ಞಾನಿಕ ಲೆಕ್ಕಾಚಾರ ಮತ್ತು ದೈನಂದಿನ ಜೀವನದ ಸಮಸ್ಯೆ ಪರಿಹಾರ", textHi: "वैज्ञानिक गणना और वास्तविक जीवन की समस्याओं का समाधान" },
        { key: "B", text: "Only limited to textbook theoretical memorization", textKn: "ಕೇವಲ ಪಠ್ಯಪುಸ್ತಕದ ಕಂಠಪಾಠಕ್ಕೆ ಮಾತ್ರ ಸೀಮಿತ", textHi: "केवल सैद्धांतिक रटने तक सीमित" },
        { key: "C", text: "Unusable in practical technology or industry", textKn: "ತಂತ್ರಜ್ಞಾನದಲ್ಲಿ ಯಾವುದೇ ಉಪಯೋಗವಿಲ್ಲ", textHi: "उद्योग में अनुपयोगी" },
        { key: "D", text: "None of the above", textKn: "ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ", textHi: "उपरोक्त में से कोई नहीं" },
      ],
      correctAnswer: "A",
      explanation: "NCERT concepts are fundamentally designed to build analytical capabilities and practical STEM understanding.",
      explanationKn: "NCERT ಪರಿಕಲ್ಪನೆಗಳು ಪ್ರಾಯೋಗಿಕ ಮತ್ತು ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಕೌಶಲ್ಯಗಳನ್ನು ನಿರ್ಮಿಸಲು ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.",
      explanationHi: "NCERT की संकल्पनाएं व्यावहारिक और विश्लेषणात्मक कौशल विकसित करने के लिए बनाई गई हैं।",
      conceptTag: "Applications",
    },
    {
      id: `${chapterId}-q5`,
      question: `Which approach is most effective for mastering NCERT exercises in "${chapterTitle}"?`,
      questionKn: `"${chapterTitle}" ಅಧ್ಯಾಯದ NCERT ಅಭ್ಯಾಸಗಳಲ್ಲಿ ಪ್ರಾವೀಣ್ಯತೆ ಸಾಧಿಸಲು ಅತ್ಯಂತ ಪರಿಣಾಮಕಾರಿ ವಿಧಾನ ಯಾವುದು?`,
      questionHi: `"${chapterTitle}" के NCERT अभ्यासों में पूर्ण दक्षता प्राप्त करने की सबसे प्रभावी विधि क्या है?`,
      options: [
        { key: "A", text: "Solving miscellaneous exercises, deriving key formulas, and self-testing via MCQs", textKn: "ವಿವಿಧ ಅಭ್ಯಾಸ ಲೆಕ್ಕಗಳನ್ನು ಬಿಡಿಸುವುದು ಮತ್ತು MCQ ಪರೀಕ್ಷೆಗಳ ಮೂಲಕ ಸ್ವಯಂ ಮೌಲ್ಯಮಾಪನ", textHi: "अभ्यास प्रश्नों को हल करना और MCQ टेस्ट द्वारा स्व-मूल्यांकन" },
        { key: "B", text: "Memorizing answers without understanding steps", textKn: "ಹಂತಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳದೆ ಕಂಠಪಾಠ ಮಾಡುವುದು", textHi: "बिना समझे उत्तर रटना" },
        { key: "C", text: "Only reading summary without writing practice", textKn: "ಬರವಣಿಗೆಯ ಅಭ್ಯಾಸವಿಲ್ಲದೆ ಕೇವಲ ಸಾರಾಂಶ ಓದುವುದು", textHi: "बिना लिखे केवल सारांश पढ़ना" },
        { key: "D", text: "Skipping proof derivations", textKn: "ಪ್ರಮೇಯಗಳ ಸಾಧನೆಯನ್ನು ಬಿಡುವುದು", textHi: "उपपत्तियों को छोड़ना" },
      ],
      correctAnswer: "A",
      explanation: "Continuous writing practice, derivation analysis, and timer-based MCQ testing ensure 100% exam readiness.",
      explanationKn: "ನಿರಂತರ ಬರವಣಿಗೆ ಅಭ್ಯಾಸ ಮತ್ತು MCQ ಪರೀಕ್ಷೆಗಳು ಪರೀಕ್ಷೆಯಲ್ಲಿ ಉತ್ತಮ ಯಶಸ್ಸನ್ನು ಖಚಿತಪಡಿಸುತ್ತವೆ.",
      explanationHi: "निरंतर लेखन अभ्यास और MCQ टेस्ट परीक्षा में शत-प्रतिशत सफलता सुनिश्चित करते हैं।",
      conceptTag: "Revision Mastery",
    },
  ];
}

// Tailored Chapter Question Banks for high-weightage chapters
export const CHAPTER_MCQ_DATABASE: Record<string, MCQQuestion[]> = {
  // Class 10 Math Ch 1: Real Numbers
  "m10-01": [
    {
      id: "m10-01-q1",
      question: "If two positive integers a and b are written as a = x³y² and b = xy³, where x, y are prime numbers, then HCF(a, b) is:",
      questionKn: "ಎರಡು ಧನಾತ್ಮಕ ಪೂರ್ಣಾಂಕಗಳು a = x³y² ಮತ್ತು b = xy³ ಆಗಿದ್ದರೆ (x, y ಅವಿಭಾಜ್ಯ ಸಂಖ್ಯೆಗಳು), ಆಗ HCF(a, b) ಮೌಲ್ಯ:",
      questionHi: "यदि दो धनात्मक पूर्णांक a = x³y² और b = xy³ हैं (जहाँ x, y अभाज्य हैं), तो HCF(a, b) का मान होगा:",
      options: [
        { key: "A", text: "xy", textKn: "xy", textHi: "xy" },
        { key: "B", text: "xy²", textKn: "xy²", textHi: "xy²" },
        { key: "C", text: "x³y³", textKn: "x³y³", textHi: "x³y³" },
        { key: "D", text: "x²y²", textKn: "x²y²", textHi: "x²y²" },
      ],
      correctAnswer: "B",
      explanation: "HCF is the product of the smallest power of each common prime factor involved: x¹ × y² = xy².",
      explanationKn: "HCF ಎಂಬುದು ಸಾಮಾನ್ಯ ಅವಿಭಾಜ್ಯ ಅಪವರ್ತನಗಳ ಕನಿಷ್ಠ ಘಾತಗಳ ಗುಣಲಬ್ಧ: x¹ × y² = xy².",
      explanationHi: "HCF प्रत्येक उभयनिष्ठ अभाज्य गुणनखंड की सबसे छोटी घात का गुणनफल होता है: x¹ × y² = xy²।",
      conceptTag: "Fundamental Theorem of Arithmetic",
    },
    {
      id: "m10-01-q2",
      question: "The product of a non-zero rational number and an irrational number is always:",
      questionKn: "ಶೂನ್ಯವಲ್ಲದ ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆ ಮತ್ತು ಅಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಯ ಗುಣಲಬ್ಧವು ಯಾವಾಗಲೂ:",
      questionHi: "एक शून्येतर परिमेय संख्या और एक अपरिमेय संख्या का गुणनफल सदैव होता है:",
      options: [
        { key: "A", text: "Always irrational", textKn: "ಯಾವಾಗಲೂ ಅಭಾಗಲಬ್ಧ", textHi: "सदैव अपरिमेय" },
        { key: "B", text: "Always rational", textKn: "ಯಾವಾಗಲೂ ಭಾಗಲಬ್ಧ", textHi: "सदैव परिमेय" },
        { key: "C", text: "Rational or irrational depending on numbers", textKn: "ಭಾಗಲಬ್ಧ ಅಥವಾ ಅಭಾಗಲಬ್ಧ", textHi: "परिमेय या अपरिमेय" },
        { key: "D", text: "Always an integer", textKn: "ಯಾವಾಗಲೂ ಪೂರ್ಣಾಂಕ", textHi: "सदैव पूर्णांक" },
      ],
      correctAnswer: "A",
      explanation: "If r ≠ 0 is rational and x is irrational, r × x is always irrational.",
      explanationKn: "ಶೂನ್ಯವಲ್ಲದ ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆ ಮತ್ತು ಅಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಯ ಗುಣಲಬ್ಧವು ಸದಾ ಅಭಾಗಲಬ್ಧವಾಗಿರುತ್ತದೆ.",
      explanationHi: "यदि r परिमेय और x अपरिमेय है, तो r × x सदैव अपरिमेय होगा।",
      conceptTag: "Irrational Numbers",
    },
    {
      id: "m10-01-q3",
      question: "If HCF(306, 657) = 9, what is LCM(306, 657)?",
      questionKn: "HCF(306, 657) = 9 ಆದರೆ, LCM(306, 657) ರ ಮೌಲ್ಯ ಎಷ್ಟು?",
      questionHi: "यदि HCF(306, 657) = 9 है, तो LCM(306, 657) क्या होगा?",
      options: [
        { key: "A", text: "22,338", textKn: "22,338", textHi: "22,338" },
        { key: "B", text: "20,432", textKn: "20,432", textHi: "20,432" },
        { key: "C", text: "24,560", textKn: "24,560", textHi: "24,560" },
        { key: "D", text: "18,954", textKn: "18,954", textHi: "18,954" },
      ],
      correctAnswer: "A",
      explanation: "LCM(a, b) = (a × b) / HCF(a, b) = (306 × 657) / 9 = 34 × 657 = 22,338.",
      explanationKn: "LCM(a, b) = (a × b) / HCF = (306 × 657) / 9 = 22,338.",
      explanationHi: "LCM = (306 × 657) / 9 = 34 × 657 = 22,338।",
      conceptTag: "HCF-LCM Relationship",
    },
    {
      id: "m10-01-q4",
      question: "Which of the following rational numbers has a terminating decimal expansion?",
      questionKn: "ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಯಾವ ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಯು ಅಂತ್ಯಗೊಳ್ಳುವ ದಶಮಾಂಶ ವಿಸ್ತರಣೆಯನ್ನು ಹೊಂದಿದೆ?",
      questionHi: "निम्नलिखित में से किस परिमेय संख्या का दशमलव प्रसार शांत है?",
      options: [
        { key: "A", text: "13 / 3125", textKn: "13 / 3125", textHi: "13 / 3125" },
        { key: "B", text: "64 / 455", textKn: "64 / 455", textHi: "64 / 455" },
        { key: "C", text: "29 / 343", textKn: "29 / 343", textHi: "29 / 343" },
        { key: "D", text: "77 / 210", textKn: "77 / 210", textHi: "77 / 210" },
      ],
      correctAnswer: "A",
      explanation: "3125 = 5⁵ = 2⁰ × 5⁵. Since denominator is in the form 2^n × 5^m, it is terminating.",
      explanationKn: "3125 = 5⁵ = 2⁰ × 5⁵. ಛೇದವು 2^n × 5^m ರೂಪದಲ್ಲಿರುವುದರಿಂದ ಇದು ಅಂತ್ಯಗೊಳ್ಳುವ ದಶಮಾಂಶವಾಗಿದೆ.",
      explanationHi: "3125 = 5⁵ = 2⁰ × 5⁵. हर 2^n × 5^m के रूप में है, अतः प्रसार शांत है।",
      conceptTag: "Decimal Expansions",
    },
    {
      id: "m10-01-q5",
      question: "The largest number which divides 70 and 125, leaving remainders 5 and 8 respectively, is:",
      questionKn: "70 ಮತ್ತು 125 ನ್ನು ಭಾಗಿಸಿದಾಗ ಕ್ರಮವಾಗಿ 5 ಮತ್ತು 8 ಶೇಷವನ್ನು ಉಳಿಸುವ ಗರಿಷ್ಠ ಸಂಖ್ಯೆ:",
      questionHi: "वह सबसे बड़ी संख्या जिससे 70 और 125 को भाग देने पर क्रमशः 5 और 8 शेष बचे, वह है:",
      options: [
        { key: "A", text: "13", textKn: "13", textHi: "13" },
        { key: "B", text: "65", textKn: "65", textHi: "65" },
        { key: "C", text: "875", textKn: "875", textHi: "875" },
        { key: "D", text: "1750", textKn: "1750", textHi: "1750" },
      ],
      correctAnswer: "A",
      explanation: "Required number = HCF(70 - 5, 125 - 8) = HCF(65, 117) = 13 (65 = 13×5, 117 = 13×9).",
      explanationKn: "ಅಗತ್ಯವಿರುವ ಸಂಖ್ಯೆ = HCF(65, 117) = 13.",
      explanationHi: "वांछित संख्या = HCF(70 - 5, 125 - 8) = HCF(65, 117) = 13।",
      conceptTag: "Division Algorithm & HCF Application",
    },
  ],

  // Class 10 Science Ch 1: Chemical Reactions and Equations
  "s10-01": [
    {
      id: "s10-01-q1",
      question: "Which of the following observations confirms that a chemical reaction has taken place?",
      questionKn: "ಕೆಳಗಿನ ಯಾವ ವೀಕ್ಷಣೆಯು ರಾಸಾಯನಿಕ ಕ್ರಿಯೆ ನಡೆದಿದೆ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ?",
      questionHi: "निम्नलिखित में से कौन सा प्रेक्षण यह पुष्टि करता है कि रासायनिक अभिक्रिया हुई है?",
      options: [
        { key: "A", text: "Evolution of gas, change in colour, temperature change or state change", textKn: "ಅನಿಲ ಬಿಡುಗಡೆ, ಬಣ್ಣ ಬದಲಾವಣೆ, ತಾಪಮಾನ ಅಥವಾ ಸ್ಥಿತ್ಯಂತರ", textHi: "गैस का उत्सर्जन, रंग परिवर्तन, तापमान या अवस्था में परिवर्तन" },
        { key: "B", text: "Only physical shape change without energy transfer", textKn: "ಕೇವಲ ಆಕಾರ ಬದಲಾವಣೆ", textHi: "केवल आकार परिवर्तन" },
        { key: "C", text: "Reversible water boiling to steam only", textKn: "ನೀರು ಆವಿಯಾಗುವುದು ಮಾತ್ರ", textHi: "केवल जल का वाष्पीकरण" },
        { key: "D", text: "None of the above", textKn: "ಮೇಲಿನ ಯಾವುದೂ ಅಲ್ಲ", textHi: "उपरोक्त में से कोई नहीं" },
      ],
      correctAnswer: "A",
      explanation: "A chemical reaction involves breaking and making of bonds accompanied by characteristic observable changes.",
      explanationKn: "ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಯು ಹೊಸ ಬಂಧಗಳ ರಚನೆ ಮತ್ತು ಗಮನಾರ್ಹ ಬದಲಾವಣೆಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ.",
      explanationHi: "रासायनिक अभिक्रिया में बंधों का टूटना व बनना और दृश्य परिवर्तन शामिल होते हैं।",
      conceptTag: "Chemical Changes",
    },
    {
      id: "s10-01-q2",
      question: "When dilute hydrochloric acid is added to iron filings, which gas is released?",
      questionKn: "ಕಬ್ಬಿಣದ ಪುಡಿಗೆ ಸಾರಹೀನ ಹೈಡ್ರೋಕ್ಲೋರಿಕ್ ಆಮ್ಲವನ್ನು ಸೇರಿಸಿದಾಗ ಯಾವ ಅನಿಲ ಬಿಡುಗಡೆಯಾಗುತ್ತದೆ?",
      questionHi: "लोहे के छीलन पर तनु हाइड्रोक्लोरिक अम्ल डालने से कौन सी गैस निकलती है?",
      options: [
        { key: "A", text: "Hydrogen gas and iron chloride are produced", textKn: "ಹೈಡ್ರೋಜನ್ ಅನಿಲ ಮತ್ತು ಐರನ್ ಕ್ಲೋರೈಡ್", textHi: "हाइड्रोजन गैस और आयरन क्लोराइड बनता है" },
        { key: "B", text: "Chlorine gas and iron hydroxide are produced", textKn: "ಕ್ಲೋರಿನ್ ಅನಿಲ", textHi: "क्लोरीन गैस" },
        { key: "C", text: "No reaction takes place", textKn: "ಯಾವುದೇ ಕ್ರಿಯೆ ನಡೆಯುವುದಿಲ್ಲ", textHi: "कोई अभिक्रिया नहीं होती" },
        { key: "D", text: "Iron salt and oxygen gas are produced", textKn: "ಆಮ್ಲಜನಕ ಅನಿಲ", textHi: "ऑक्सीजन गैस" },
      ],
      correctAnswer: "A",
      explanation: "Fe(s) + 2HCl(aq) → FeCl2(aq) + H2(g) ↑.",
      explanationKn: "Fe(s) + 2HCl(aq) → FeCl2(aq) + H2(g) ↑ (ಹೈಡ್ರೋಜನ್ ಅನಿಲ ಬಿಡುಗಡೆ).",
      explanationHi: "Fe(s) + 2HCl(aq) → FeCl2(aq) + H2(g) ↑।",
      conceptTag: "Displacement Reaction",
    },
    {
      id: "s10-01-q3",
      question: "In the reaction: CuO + H2 → Cu + H2O, which substance is oxidised?",
      questionKn: "CuO + H2 → Cu + H2O ಕ್ರಿಯೆಯಲ್ಲಿ ಯಾವ ವಸ್ತುವು ಉತ್ಕರ್ಷಣಗೊಂಡಿದೆ?",
      questionHi: "अभिक्रिया CuO + H2 → Cu + H2O में किस पदार्थ का उपचयन (ऑक्सीकरण) हुआ है?",
      options: [
        { key: "A", text: "H2 is oxidised to H2O", textKn: "H2 (ಹೈಡ್ರೋಜನ್)", textHi: "H2 (हाइड्रोजन H2O में उपचयित होता है)" },
        { key: "B", text: "CuO", textKn: "CuO", textHi: "CuO" },
        { key: "C", text: "Cu", textKn: "Cu", textHi: "Cu" },
        { key: "D", text: "None", textKn: "ಯಾವುದೂ ಅಲ್ಲ", textHi: "कोई नहीं" },
      ],
      correctAnswer: "A",
      explanation: "H2 gains oxygen to become H2O (Oxidation), while CuO loses oxygen to become Cu (Reduction).",
      explanationKn: "H2 ಆಮ್ಲಜನಕವನ್ನು ಪಡೆದುಕೊಂಡು H2O ಆಗಿ ಉತ್ಕರ್ಷಣಗೊಳ್ಳುತ್ತದೆ.",
      explanationHi: "H2 ऑक्सीजन प्राप्त करके H2O बनाता है, अतः यह उपचयित हुआ।",
      conceptTag: "Redox Reactions",
    },
    {
      id: "s10-01-q4",
      question: "Why is respiration considered an exothermic reaction?",
      questionKn: "ಉಸಿರಾಟ ಕ್ರಿಯೆಯನ್ನು ಬಹಿರುಷ್ಣಕ ಕ್ರಿಯೆ ಎಂದು ಏಕೆ ಕರೆಯಲಾಗುತ್ತದೆ?",
      questionHi: "श्वसन को ऊष्माक्षेपी अभिक्रिया क्यों माना जाता है?",
      options: [
        { key: "A", text: "Because glucose combines with oxygen in cells to release energy (ATP)", textKn: "ಗ್ಲೂಕೋಸ್ ಆಕ್ಸಿಜನ್ ಜೊತೆ ವರ್ತಿಸಿ ಶಕ್ತಿಯನ್ನು (ATP) ಬಿಡುಗಡೆ ಮಾಡುತ್ತದೆ", textHi: "क्योंकि ग्लूकोज ऑक्सीजन के साथ मिलकर ऊर्जा (ATP) मुक्त करता है" },
        { key: "B", text: "Because it absorbs heat from surroundings", textKn: "ಇದು ಶಾಖವನ್ನು ಹೀರಿಕೊಳ್ಳುತ್ತದೆ", textHi: "यह ऊष्मा अवशोषित करता है" },
        { key: "C", text: "Because temperature drops during breathing", textKn: "ತಾಪಮಾನ ಕಡಿಮೆಯಾಗುತ್ತದೆ", textHi: "तापमान कम होता है" },
        { key: "D", text: "Because nitrogen is burned in lungs", textKn: "ಸಾರಜನಕ ದಹನವಾಗುತ್ತದೆ", textHi: "नाइट्रोजन जलता है" },
      ],
      correctAnswer: "A",
      explanation: "C6H12O6 + 6O2 → 6CO2 + 6H2O + Energy (Exothermic).",
      explanationKn: "ಗ್ಲೂಕೋಸ್ ವಿಭಜನೆಯಾಗಿ ಶಕ್ತಿಯು ಬಿಡುಗಡೆಯಾಗುವುದರಿಂದ ಇದು ಬಹಿರುಷ್ಣಕ ಕ್ರಿಯೆಯಾಗಿದೆ.",
      explanationHi: "C6H12O6 + 6O2 → 6CO2 + 6H2O + ऊर्जा (ऊष्माक्षेपी)।",
      conceptTag: "Exothermic Reactions",
    },
    {
      id: "s10-01-q5",
      question: "Which gas is flushed into bags of potato chips to prevent rancidity?",
      questionKn: "ಚಿಪ್ಸ್ ಪ್ಯಾಕೆಟ್‌ಗಳು ಕೆಡದಂತೆ (ಖಾರವಾಗದಂತೆ) ತಡೆಯಲು ಯಾವ ಅನಿಲವನ್ನು ತುಂಬಿಸಲಾಗುತ್ತದೆ?",
      questionHi: "चिप्स के पैकेट में विकृतगंधिता से बचाने के लिए कौन सी गैस भरी जाती है?",
      options: [
        { key: "A", text: "Nitrogen gas (N2)", textKn: "ಸಾರಜನಕ ಅನಿಲ (Nitrogen)", textHi: "नाइट्रोजन गैस (N2)" },
        { key: "B", text: "Oxygen gas (O2)", textKn: "ಆಮ್ಲಜನಕ ಅನಿಲ", textHi: "ऑक्सीजन गैस" },
        { key: "C", text: "Chlorine gas (Cl2)", textKn: "ಕ್ಲೋರಿನ್ ಅನಿಲ", textHi: "क्लोरीन गैस" },
        { key: "D", text: "Hydrogen gas (H2)", textKn: "ಹೈಡ್ರೋಜನ್ ಅನಿಲ", textHi: "हाइड्रोजन गैस" },
      ],
      correctAnswer: "A",
      explanation: "Nitrogen is an unreactive gas that prevents the oxidation of oils and fats in chips.",
      explanationKn: "ಸಾರಜನಕವು ಜಡ ಅನಿಲವಾಗಿದ್ದು ಎಣ್ಣೆಯುಕ್ತ ಪದಾರ್ಥಗಳು ಉತ್ಕರ್ಷಣಗೊಳ್ಳುವುದನ್ನು ತಡೆಯುತ್ತದೆ.",
      explanationHi: "नाइट्रोजन एक अक्रिय गैस है जो तेल व वसा के उपचयन (ऑक्सीकरण) को रोकती है।",
      conceptTag: "Rancidity & Prevention",
    },
  ],
};

// Comprehensive Chapter Notes & Textbook Reference Data
export function getChapterNotes(chapterId: string, chapterTitle: string): ChapterNoteItem {
  return {
    sectionTitle: `Complete NCERT Revision Notes: ${chapterTitle}`,
    sectionTitleKn: `ಸಂಪೂರ್ಣ NCERT ಪುನರಾವರ್ತನಾ ಟಿಪ್ಪಣಿಗಳು: ${chapterTitle}`,
    sectionTitleHi: `संपूर्ण NCERT पुनरावृत्ति नोट्स: ${chapterTitle}`,
    content: [
      `1. Core Chapter Foundation: Master all fundamental definitions, theorems, and conceptual principles strictly according to the latest rationalized NCERT curriculum.`,
      `2. Step-by-Step Derivations: Focus on standard mathematical proofs, balanced chemical equations, and labeled schematic diagrams.`,
      `3. Common Exam Pitfalls: Pay special attention to sign conventions, unit conversions (SI units), and precision in formula applications.`,
      `4. High-Yield Questions: Review 5-year previous board examination questions and exemplar problems.`,
    ],
    contentKn: [
      `೧. ಮೂಲ ಪರಿಕಲ್ಪನೆಗಳು: ಇತ್ತೀಚಿನ NCERT ಪಠ್ಯಕ್ರಮದ ಪ್ರಕಾರ ಎಲ್ಲಾ ಪ್ರಮುಖ ವ್ಯಾಖ್ಯೆಗಳು ಮತ್ತು ನಿಯಮಗಳನ್ನು ಗ್ರಹಿಸಿ.`,
      `೨. ಹಂತ-ಹಂತದ ಸಾಧನೆಗಳು: ಸೂತ್ರಗಳ ಸಾಧನೆ, ಸಮತೋಲಿತ ರಾಸಾಯನಿಕ ಸಮೀಕರಣಗಳು ಮತ್ತು ಲೇಬಲ್ ಮಾಡಿದ ರೇಖಾಚಿತ್ರಗಳ ಮೇಲೆ ಗಮನ ಕೇಂದ್ರೀಕರಿಸಿ.`,
      `೩. ಪರೀಕ್ಷಾ ಎಚ್ಚರಿಕೆಗಳು: ಚಿಹ್ನೆಗಳು, ಮಾನಗಳ ಪರಿವರ್ತನೆ (SI Units) ಮತ್ತು ಸೂತ್ರಗಳ ಸರಿಯಾದ ಅನ್ವಯವನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.`,
      `೪. ಪ್ರಮುಖ ಪ್ರಶ್ನೆಗಳು: ಹಿಂದಿನ ೫ ವರ್ಷಗಳ ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಗಳನ್ನು ಅಭ್ಯಾಸ ಮಾಡಿ.`,
    ],
    contentHi: [
      `1. मूल अवधारणाएँ: नवीनतम NCERT पाठ्यक्रम के अनुसार सभी मुख्य परिभाषाओं और सूत्रों का अभ्यास करें।`,
      `2. चरणबद्ध निगमन: गणितीय उपपत्तियों, संतुलित रासायनिक समीकरणों और नामांकित चित्रों पर ध्यान दें।`,
      `3. सामान्य गलतियाँ: चिन्ह परिपाटी, SI मात्रकों का सही रूपांतरण और सूत्र का सटीक उपयोग सुनिश्चित करें।`,
      `4. महत्वपूर्ण प्रश्न: पिछले 5 वर्षों के बोर्ड परीक्षा प्रश्नों और उदाहरणों का गहन अभ्यास करें।`,
    ],
    keyTerms: [
      { term: "NCERT Standard Definition", definition: "Official definition and conceptual framework specified by NCERT." },
      { term: "Step Marking Strategy", definition: "Writing given data, standard formulas, intermediate steps, and unit in final answer for maximum marks." },
      { term: "Exemplar Problems", definition: "Higher-order thinking questions (HOTs) designed to test deep conceptual understanding." },
    ],
    ncertSummary: `This chapter forms a core foundational pillar in the CBSE/NCERT curriculum. Make sure to complete all in-text examples, exercise questions, and review summaries at the end of the chapter.`,
    textbookReference: {
      ncertChapterNo: 1,
      bookTitle: "Official NCERT Textbook",
      keyPages: "Pages 1 – 24",
      importantExercises: ["Exercise 1.1 (Q1 to Q5)", "Exercise 1.2 (Q2, Q3, Q7)", "Miscellaneous Exemplar Problems"],
      downloadLinkText: "View / Read Official NCERT E-Book PDF Chapter",
    },
  };
}

// -------------------------------------------------------------
// MULTI-STUDENT PERSISTENCE & SEED GENERATOR
// -------------------------------------------------------------
const STUDENT_MCQ_STORAGE_KEY = "ttc_student_mcq_records_v3";
export const DEFAULT_STUDENT_ID = "std-101";

// Initial realistic test attempt records for enrolled students
const INITIAL_STUDENT_MOCK_RECORDS: Record<string, Record<string, ChapterTestRecord>> = {
  // 1. Aarav Sharma (Class 10)
  "std-101": {
    "c10-s-ch1": {
      chapterId: "c10-s-ch1",
      subjectId: "c10-science",
      classGrade: "Class 10",
      chapterTitle: "Chemical Reactions and Equations",
      studentId: "std-101",
      studentName: "Aarav Sharma",
      attemptsUsed: 2,
      bestScore: 5,
      bestPercentage: 100,
      isCleared: true,
      lastAttemptDate: "2026-10-01T14:20:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 4,
          totalQuestions: 5,
          percentage: 80,
          passed: true,
          timestamp: "2026-09-28T10:15:00.000Z",
          timeSpentSeconds: 180,
          studentId: "std-101",
          studentName: "Aarav Sharma",
          selectedAnswers: { "c10-s-ch1-q1": "A", "c10-s-ch1-q2": "A", "c10-s-ch1-q3": "B", "c10-s-ch1-q4": "A", "c10-s-ch1-q5": "A" },
        },
        {
          attemptNumber: 2,
          score: 5,
          totalQuestions: 5,
          percentage: 100,
          passed: true,
          timestamp: "2026-10-01T14:20:00.000Z",
          timeSpentSeconds: 145,
          studentId: "std-101",
          studentName: "Aarav Sharma",
          selectedAnswers: { "c10-s-ch1-q1": "A", "c10-s-ch1-q2": "A", "c10-s-ch1-q3": "A", "c10-s-ch1-q4": "A", "c10-s-ch1-q5": "A" },
        },
      ],
    },
    "c10-s-ch2": {
      chapterId: "c10-s-ch2",
      subjectId: "c10-science",
      classGrade: "Class 10",
      chapterTitle: "Acids, Bases and Salts",
      studentId: "std-101",
      studentName: "Aarav Sharma",
      attemptsUsed: 2,
      bestScore: 4,
      bestPercentage: 80,
      isCleared: true,
      lastAttemptDate: "2026-09-30T16:45:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 3,
          totalQuestions: 5,
          percentage: 60,
          passed: false,
          timestamp: "2026-09-29T11:00:00.000Z",
          timeSpentSeconds: 210,
          studentId: "std-101",
          studentName: "Aarav Sharma",
          selectedAnswers: { "c10-s-ch2-q1": "A", "c10-s-ch2-q2": "C", "c10-s-ch2-q3": "D", "c10-s-ch2-q4": "A", "c10-s-ch2-q5": "A" },
        },
        {
          attemptNumber: 2,
          score: 4,
          totalQuestions: 5,
          percentage: 80,
          passed: true,
          timestamp: "2026-09-30T16:45:00.000Z",
          timeSpentSeconds: 165,
          studentId: "std-101",
          studentName: "Aarav Sharma",
          selectedAnswers: { "c10-s-ch2-q1": "A", "c10-s-ch2-q2": "A", "c10-s-ch2-q3": "A", "c10-s-ch2-q4": "C", "c10-s-ch2-q5": "A" },
        },
      ],
    },
    "c10-m-ch1": {
      chapterId: "c10-m-ch1",
      subjectId: "c10-math",
      classGrade: "Class 10",
      chapterTitle: "Real Numbers",
      studentId: "std-101",
      studentName: "Aarav Sharma",
      attemptsUsed: 1,
      bestScore: 5,
      bestPercentage: 100,
      isCleared: true,
      lastAttemptDate: "2026-10-02T09:30:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 5,
          totalQuestions: 5,
          percentage: 100,
          passed: true,
          timestamp: "2026-10-02T09:30:00.000Z",
          timeSpentSeconds: 130,
          studentId: "std-101",
          studentName: "Aarav Sharma",
          selectedAnswers: { "c10-m-ch1-q1": "A", "c10-m-ch1-q2": "A", "c10-m-ch1-q3": "A", "c10-m-ch1-q4": "A", "c10-m-ch1-q5": "A" },
        },
      ],
    },
    "c10-m-ch2": {
      chapterId: "c10-m-ch2",
      subjectId: "c10-math",
      classGrade: "Class 10",
      chapterTitle: "Polynomials",
      studentId: "std-101",
      studentName: "Aarav Sharma",
      attemptsUsed: 1,
      bestScore: 3,
      bestPercentage: 60,
      isCleared: false,
      lastAttemptDate: "2026-10-02T11:15:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 3,
          totalQuestions: 5,
          percentage: 60,
          passed: false,
          timestamp: "2026-10-02T11:15:00.000Z",
          timeSpentSeconds: 220,
          studentId: "std-101",
          studentName: "Aarav Sharma",
          selectedAnswers: { "c10-m-ch2-q1": "A", "c10-m-ch2-q2": "B", "c10-m-ch2-q3": "A", "c10-m-ch2-q4": "D", "c10-m-ch2-q5": "A" },
        },
      ],
    },
  },

  // 2. Diya Patel (Class 10)
  "std-102": {
    "c10-s-ch1": {
      chapterId: "c10-s-ch1",
      subjectId: "c10-science",
      classGrade: "Class 10",
      chapterTitle: "Chemical Reactions and Equations",
      studentId: "std-102",
      studentName: "Diya Patel",
      attemptsUsed: 1,
      bestScore: 5,
      bestPercentage: 100,
      isCleared: true,
      lastAttemptDate: "2026-09-29T14:10:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 5,
          totalQuestions: 5,
          percentage: 100,
          passed: true,
          timestamp: "2026-09-29T14:10:00.000Z",
          timeSpentSeconds: 140,
          studentId: "std-102",
          studentName: "Diya Patel",
          selectedAnswers: { "c10-s-ch1-q1": "A", "c10-s-ch1-q2": "A", "c10-s-ch1-q3": "A", "c10-s-ch1-q4": "A", "c10-s-ch1-q5": "A" },
        },
      ],
    },
    "c10-s-ch6": {
      chapterId: "c10-s-ch6",
      subjectId: "c10-science",
      classGrade: "Class 10",
      chapterTitle: "Life Processes",
      studentId: "std-102",
      studentName: "Diya Patel",
      attemptsUsed: 1,
      bestScore: 4,
      bestPercentage: 80,
      isCleared: true,
      lastAttemptDate: "2026-10-01T10:05:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 4,
          totalQuestions: 5,
          percentage: 80,
          passed: true,
          timestamp: "2026-10-01T10:05:00.000Z",
          timeSpentSeconds: 155,
          studentId: "std-102",
          studentName: "Diya Patel",
          selectedAnswers: { "c10-s-ch6-q1": "A", "c10-s-ch6-q2": "A", "c10-s-ch6-q3": "C", "c10-s-ch6-q4": "A", "c10-s-ch6-q5": "A" },
        },
      ],
    },
    "c10-m-ch1": {
      chapterId: "c10-m-ch1",
      subjectId: "c10-math",
      classGrade: "Class 10",
      chapterTitle: "Real Numbers",
      studentId: "std-102",
      studentName: "Diya Patel",
      attemptsUsed: 1,
      bestScore: 5,
      bestPercentage: 100,
      isCleared: true,
      lastAttemptDate: "2026-10-02T08:40:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 5,
          totalQuestions: 5,
          percentage: 100,
          passed: true,
          timestamp: "2026-10-02T08:40:00.000Z",
          timeSpentSeconds: 125,
          studentId: "std-102",
          studentName: "Diya Patel",
          selectedAnswers: { "c10-m-ch1-q1": "A", "c10-m-ch1-q2": "A", "c10-m-ch1-q3": "A", "c10-m-ch1-q4": "A", "c10-m-ch1-q5": "A" },
        },
      ],
    },
  },

  // 3. Riya Kapoor (Class 10)
  "std-103": {
    "c10-s-ch1": {
      chapterId: "c10-s-ch1",
      subjectId: "c10-science",
      classGrade: "Class 10",
      chapterTitle: "Chemical Reactions and Equations",
      studentId: "std-103",
      studentName: "Riya Kapoor",
      attemptsUsed: 2,
      bestScore: 3,
      bestPercentage: 60,
      isCleared: false,
      lastAttemptDate: "2026-10-01T15:30:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 2,
          totalQuestions: 5,
          percentage: 40,
          passed: false,
          timestamp: "2026-09-30T10:00:00.000Z",
          timeSpentSeconds: 240,
          studentId: "std-103",
          studentName: "Riya Kapoor",
          selectedAnswers: { "c10-s-ch1-q1": "B", "c10-s-ch1-q2": "A", "c10-s-ch1-q3": "C", "c10-s-ch1-q4": "B", "c10-s-ch1-q5": "A" },
        },
        {
          attemptNumber: 2,
          score: 3,
          totalQuestions: 5,
          percentage: 60,
          passed: false,
          timestamp: "2026-10-01T15:30:00.000Z",
          timeSpentSeconds: 200,
          studentId: "std-103",
          studentName: "Riya Kapoor",
          selectedAnswers: { "c10-s-ch1-q1": "A", "c10-s-ch1-q2": "A", "c10-s-ch1-q3": "D", "c10-s-ch1-q4": "B", "c10-s-ch1-q5": "A" },
        },
      ],
    },
    "c10-m-ch1": {
      chapterId: "c10-m-ch1",
      subjectId: "c10-math",
      classGrade: "Class 10",
      chapterTitle: "Real Numbers",
      studentId: "std-103",
      studentName: "Riya Kapoor",
      attemptsUsed: 1,
      bestScore: 4,
      bestPercentage: 80,
      isCleared: true,
      lastAttemptDate: "2026-10-02T10:30:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 4,
          totalQuestions: 5,
          percentage: 80,
          passed: true,
          timestamp: "2026-10-02T10:30:00.000Z",
          timeSpentSeconds: 190,
          studentId: "std-103",
          studentName: "Riya Kapoor",
          selectedAnswers: { "c10-m-ch1-q1": "A", "c10-m-ch1-q2": "A", "c10-m-ch1-q3": "B", "c10-m-ch1-q4": "A", "c10-m-ch1-q5": "A" },
        },
      ],
    },
  },

  // 4. Kabir Mehta (Class 9)
  "std-104": {
    "c9-s-ch1": {
      chapterId: "c9-s-ch1",
      subjectId: "c9-science",
      classGrade: "Class 9",
      chapterTitle: "Matter in Our Surroundings",
      studentId: "std-104",
      studentName: "Kabir Mehta",
      attemptsUsed: 1,
      bestScore: 4,
      bestPercentage: 80,
      isCleared: true,
      lastAttemptDate: "2026-09-30T11:20:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 4,
          totalQuestions: 5,
          percentage: 80,
          passed: true,
          timestamp: "2026-09-30T11:20:00.000Z",
          timeSpentSeconds: 170,
          studentId: "std-104",
          studentName: "Kabir Mehta",
          selectedAnswers: { "c9-s-ch1-q1": "A", "c9-s-ch1-q2": "A", "c9-s-ch1-q3": "C", "c9-s-ch1-q4": "A", "c9-s-ch1-q5": "A" },
        },
      ],
    },
    "c9-m-ch1": {
      chapterId: "c9-m-ch1",
      subjectId: "c9-math",
      classGrade: "Class 9",
      chapterTitle: "Number Systems",
      studentId: "std-104",
      studentName: "Kabir Mehta",
      attemptsUsed: 2,
      bestScore: 4,
      bestPercentage: 80,
      isCleared: true,
      lastAttemptDate: "2026-10-01T16:00:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 3,
          totalQuestions: 5,
          percentage: 60,
          passed: false,
          timestamp: "2026-09-29T14:30:00.000Z",
          timeSpentSeconds: 210,
          studentId: "std-104",
          studentName: "Kabir Mehta",
          selectedAnswers: { "c9-m-ch1-q1": "A", "c9-m-ch1-q2": "B", "c9-m-ch1-q3": "A", "c9-m-ch1-q4": "C", "c9-m-ch1-q5": "A" },
        },
        {
          attemptNumber: 2,
          score: 4,
          totalQuestions: 5,
          percentage: 80,
          passed: true,
          timestamp: "2026-10-01T16:00:00.000Z",
          timeSpentSeconds: 160,
          studentId: "std-104",
          studentName: "Kabir Mehta",
          selectedAnswers: { "c9-m-ch1-q1": "A", "c9-m-ch1-q2": "A", "c9-m-ch1-q3": "A", "c9-m-ch1-q4": "B", "c9-m-ch1-q5": "A" },
        },
      ],
    },
  },

  // 5. Vihaan Rao (Class 9)
  "std-105": {
    "c9-s-ch1": {
      chapterId: "c9-s-ch1",
      subjectId: "c9-science",
      classGrade: "Class 9",
      chapterTitle: "Matter in Our Surroundings",
      studentId: "std-105",
      studentName: "Vihaan Rao",
      attemptsUsed: 1,
      bestScore: 5,
      bestPercentage: 100,
      isCleared: true,
      lastAttemptDate: "2026-10-01T12:00:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 5,
          totalQuestions: 5,
          percentage: 100,
          passed: true,
          timestamp: "2026-10-01T12:00:00.000Z",
          timeSpentSeconds: 135,
          studentId: "std-105",
          studentName: "Vihaan Rao",
          selectedAnswers: { "c9-s-ch1-q1": "A", "c9-s-ch1-q2": "A", "c9-s-ch1-q3": "A", "c9-s-ch1-q4": "A", "c9-s-ch1-q5": "A" },
        },
      ],
    },
    "c9-s-ch5": {
      chapterId: "c9-s-ch5",
      subjectId: "c9-science",
      classGrade: "Class 9",
      chapterTitle: "The Fundamental Unit of Life",
      studentId: "std-105",
      studentName: "Vihaan Rao",
      attemptsUsed: 1,
      bestScore: 4,
      bestPercentage: 80,
      isCleared: true,
      lastAttemptDate: "2026-10-02T13:20:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 4,
          totalQuestions: 5,
          percentage: 80,
          passed: true,
          timestamp: "2026-10-02T13:20:00.000Z",
          timeSpentSeconds: 150,
          studentId: "std-105",
          studentName: "Vihaan Rao",
          selectedAnswers: { "c9-s-ch5-q1": "A", "c9-s-ch5-q2": "A", "c9-s-ch5-q3": "B", "c9-s-ch5-q4": "A", "c9-s-ch5-q5": "A" },
        },
      ],
    },
  },

  // 6. Anika Shah (Class 8)
  "std-106": {
    "c8-s-ch1": {
      chapterId: "c8-s-ch1",
      subjectId: "c8-science",
      classGrade: "Class 8",
      chapterTitle: "Crop Production and Management",
      studentId: "std-106",
      studentName: "Anika Shah",
      attemptsUsed: 1,
      bestScore: 4,
      bestPercentage: 80,
      isCleared: true,
      lastAttemptDate: "2026-10-01T15:00:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 4,
          totalQuestions: 5,
          percentage: 80,
          passed: true,
          timestamp: "2026-10-01T15:00:00.000Z",
          timeSpentSeconds: 160,
          studentId: "std-106",
          studentName: "Anika Shah",
          selectedAnswers: { "c8-s-ch1-q1": "A", "c8-s-ch1-q2": "A", "c8-s-ch1-q3": "C", "c8-s-ch1-q4": "A", "c8-s-ch1-q5": "A" },
        },
      ],
    },
    "c8-m-ch1": {
      chapterId: "c8-m-ch1",
      subjectId: "c8-math",
      classGrade: "Class 8",
      chapterTitle: "Rational Numbers",
      studentId: "std-106",
      studentName: "Anika Shah",
      attemptsUsed: 1,
      bestScore: 5,
      bestPercentage: 100,
      isCleared: true,
      lastAttemptDate: "2026-10-02T14:10:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 5,
          totalQuestions: 5,
          percentage: 100,
          passed: true,
          timestamp: "2026-10-02T14:10:00.000Z",
          timeSpentSeconds: 140,
          studentId: "std-106",
          studentName: "Anika Shah",
          selectedAnswers: { "c8-m-ch1-q1": "A", "c8-m-ch1-q2": "A", "c8-m-ch1-q3": "A", "c8-m-ch1-q4": "A", "c8-m-ch1-q5": "A" },
        },
      ],
    },
  },

  // 7. Tanvi Kulkarni (Class 8)
  "std-107": {
    "c8-s-ch1": {
      chapterId: "c8-s-ch1",
      subjectId: "c8-science",
      classGrade: "Class 8",
      chapterTitle: "Crop Production and Management",
      studentId: "std-107",
      studentName: "Tanvi Kulkarni",
      attemptsUsed: 1,
      bestScore: 3,
      bestPercentage: 60,
      isCleared: false,
      lastAttemptDate: "2026-10-02T16:00:00.000Z",
      history: [
        {
          attemptNumber: 1,
          score: 3,
          totalQuestions: 5,
          percentage: 60,
          passed: false,
          timestamp: "2026-10-02T16:00:00.000Z",
          timeSpentSeconds: 210,
          studentId: "std-107",
          studentName: "Tanvi Kulkarni",
          selectedAnswers: { "c8-s-ch1-q1": "A", "c8-s-ch1-q2": "C", "c8-s-ch1-q3": "B", "c8-s-ch1-q4": "A", "c8-s-ch1-q5": "A" },
        },
      ],
    },
  },
};

// Load all student records dictionary
export function loadAllStudentMCQRecords(): Record<string, Record<string, ChapterTestRecord>> {
  if (typeof window === "undefined") return INITIAL_STUDENT_MOCK_RECORDS;
  try {
    const raw = localStorage.getItem(STUDENT_MCQ_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...INITIAL_STUDENT_MOCK_RECORDS, ...parsed };
    }
    localStorage.setItem(STUDENT_MCQ_STORAGE_KEY, JSON.stringify(INITIAL_STUDENT_MOCK_RECORDS));
    return INITIAL_STUDENT_MOCK_RECORDS;
  } catch {
    return INITIAL_STUDENT_MOCK_RECORDS;
  }
}

// Get records for a specific student
export function getStudentMCQRecords(studentId: string = DEFAULT_STUDENT_ID): Record<string, ChapterTestRecord> {
  const all = loadAllStudentMCQRecords();
  return all[studentId] || {};
}

// Backward-compatible load function
export function loadAllMCQTestRecords(studentId?: string): Record<string, ChapterTestRecord> {
  return getStudentMCQRecords(studentId || DEFAULT_STUDENT_ID);
}

// Save a test attempt under a specific student
export function saveMCQTestAttempt(
  chapterId: string,
  subjectId: string,
  classGrade: string,
  chapterTitle: string,
  attempt: ChapterTestAttempt,
  studentId: string = DEFAULT_STUDENT_ID,
  studentName: string = "Aarav Sharma"
): ChapterTestRecord {
  const allRecords = loadAllStudentMCQRecords();
  const studentRecords = allRecords[studentId] || {};

  const existing = studentRecords[chapterId] || {
    chapterId,
    subjectId,
    classGrade,
    chapterTitle,
    studentId,
    studentName,
    attemptsUsed: 0,
    bestScore: 0,
    bestPercentage: 0,
    isCleared: false,
    history: [],
  };

  const newAttemptsUsed = existing.attemptsUsed + 1;
  const enrichedAttempt = { ...attempt, studentId, studentName };
  const newHistory = [...existing.history, enrichedAttempt];
  const newBestScore = Math.max(existing.bestScore, attempt.score);
  const newBestPercentage = Math.max(existing.bestPercentage, attempt.percentage);
  const newIsCleared = existing.isCleared || attempt.passed;

  const updatedRecord: ChapterTestRecord = {
    ...existing,
    studentId,
    studentName,
    attemptsUsed: newAttemptsUsed,
    bestScore: newBestScore,
    bestPercentage: newBestPercentage,
    isCleared: newIsCleared,
    history: newHistory,
    lastAttemptDate: attempt.timestamp,
  };

  studentRecords[chapterId] = updatedRecord;
  allRecords[studentId] = studentRecords;

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STUDENT_MCQ_STORAGE_KEY, JSON.stringify(allRecords));
      window.dispatchEvent(
        new CustomEvent("ttc_mcq_test_updated", {
          detail: { studentId, chapterId, record: updatedRecord },
        })
      );
    } catch {
      // storage fallback
    }
  }

  return updatedRecord;
}

// Reset attempts for a specific chapter for a specific student
export function resetChapterMCQAttempts(chapterId: string, studentId: string = DEFAULT_STUDENT_ID): void {
  const allRecords = loadAllStudentMCQRecords();
  if (allRecords[studentId] && allRecords[studentId][chapterId]) {
    delete allRecords[studentId][chapterId];
    if (typeof window !== "undefined") {
      localStorage.setItem(STUDENT_MCQ_STORAGE_KEY, JSON.stringify(allRecords));
      window.dispatchEvent(
        new CustomEvent("ttc_mcq_test_updated", {
          detail: { studentId, chapterId, reset: true },
        })
      );
    }
  }
}

// Reset all chapter attempts for a student
export function resetAllStudentMCQAttempts(studentId: string): void {
  const allRecords = loadAllStudentMCQRecords();
  if (allRecords[studentId]) {
    delete allRecords[studentId];
    if (typeof window !== "undefined") {
      localStorage.setItem(STUDENT_MCQ_STORAGE_KEY, JSON.stringify(allRecords));
      window.dispatchEvent(
        new CustomEvent("ttc_mcq_test_updated", {
          detail: { studentId, resetAll: true },
        })
      );
    }
  }
}

