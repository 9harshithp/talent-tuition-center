export type ConceptType =
  | "Core Concept"
  | "Theorem & Proof"
  | "Formula & Derivation"
  | "Experiment & Practical"
  | "Board Exam Important"
  | "NCERT Exercise Drill";

export interface SubtopicNode {
  id: string;
  title: string;
  titleKn: string;
  titleHi: string;
  type: ConceptType;
  estimatedMinutes: number;
  isCompleted?: boolean;
}

export interface ChapterNode {
  id: string;
  chapterNumber: number;
  title: string;
  titleKn: string;
  titleHi: string;
  unit: string;
  unitKn: string;
  unitHi: string;
  description: string;
  descriptionKn: string;
  descriptionHi: string;
  status: "Completed" | "In Progress" | "Upcoming";
  completionPercent: number;
  totalPeriods: number;
  assignedTeacher: string;
  keyFormulas?: string[];
  subtopics: SubtopicNode[];
}

export interface SubjectWorkflow {
  id: string;
  name: string;
  nameKn: string;
  nameHi: string;
  classGrade: "Class 10" | "Class 9" | "Class 8";
  icon: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  chapters: ChapterNode[];
}

export const CURRICULUM_DATA_VERSION = "2.1-ncert-complete";

export const INITIAL_CURRICULUM_DATA: SubjectWorkflow[] = [
  {
    "id": "c10-math",
    "name": "Mathematics",
    "nameKn": "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)",
    "nameHi": "गणित (Mathematics)",
    "classGrade": "Class 10",
    "icon": "Calculator",
    "color": "#1d4ed8",
    "badgeBg": "bg-blue-50 text-blue-800 border-blue-200",
    "borderColor": "border-blue-500",
    "chapters": [
      {
        "id": "m10-01",
        "chapterNumber": 1,
        "title": "Real Numbers",
        "titleKn": "ನೈಜ ಸಂಖ್ಯೆಗಳು (Real Numbers)",
        "titleHi": "वास्तविक संख्याएं (Real Numbers)",
        "unit": "Unit I: Number Systems",
        "unitKn": "ಘಟಕ ೧: ಸಂಖ್ಯಾ ಪದ್ಧತಿಗಳು",
        "unitHi": "इकाई १: संख्या पद्धतियाँ",
        "description": "Fundamental Theorem of Arithmetic, Revisiting Irrational Numbers & Decimal Expansions.",
        "descriptionKn": "ಅಂಕಗಣಿತದ ಮೂಲಭೂತ ಪ್ರಮೇಯ, ಅಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳು ಮತ್ತು ದಶಮಾಂಶ ವಿಸ್ತರಣೆಗಳು.",
        "descriptionHi": "अंकगणित की आधारभूत प्रमेय, अपरिमेय संख्याओं का पुनर्भ्रमण और दशमलव प्रसार।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "HCF(a, b) × LCM(a, b) = a × b",
          "p is prime, p divides a² ⇒ p divides a",
          "Terminating decimal ⇔ q = 2^n × 5^m"
        ],
        "subtopics": [
          {
            "id": "m10-01-01",
            "title": "Fundamental Theorem of Arithmetic & Prime Factorization",
            "titleKn": "ಅಂಕಗಣಿತದ ಮೂಲಭೂತ ಪ್ರಮೇಯ & ಅವಿಭಾಜ್ಯ ಅಪವರ್ತನ",
            "titleHi": "अंकगणित की आधारभूत प्रमेय और अभाज्य गुणनखंड",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m10-01-02",
            "title": "Calculating HCF & LCM using Prime Factors",
            "titleKn": "ಮ.ಸಾ.ಅ ಮತ್ತು ಲ.ಸಾ.ಅ ಲೆಕ್ಕಾಚಾರ",
            "titleHi": "अभाज्य गुणनखंड विधि से HCF और LCM",
            "type": "Formula & Derivation",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m10-01-03",
            "title": "Proving √2, √3, √5 are Irrational Numbers",
            "titleKn": "√2, √3, √5 ಅಭಾಗಲಬ್ಧ ಎಂದು ಸಾಬೀತುಪಡಿಸುವುದು",
            "titleHi": "√2, √3, √5 को अपरिमेय सिद्ध करना",
            "type": "Theorem & Proof",
            "estimatedMinutes": 60,
            "isCompleted": true
          },
          {
            "id": "m10-01-04",
            "title": "NCERT Exercise 1.1 & 1.2 Drill",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ಅಭ್ಯಾಸ ೧.೧ & ೧.೨",
            "titleHi": "NCERT अभ्यास 1.1 और 1.2",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m10-02",
        "chapterNumber": 2,
        "title": "Polynomials",
        "titleKn": "ಬಹುಪದೋಕ್ತಿಗಳು (Polynomials)",
        "titleHi": "बहुपद (Polynomials)",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई ۲: बीजगणित",
        "description": "Geometrical Meaning of Zeroes, Relationship between Zeroes and Coefficients of a Quadratic Polynomial.",
        "descriptionKn": "ಶೂನ್ಯತೆಗಳ ಜ್ಯಾಮಿತೀಯ ಅರ್ಥ, ಗುಣಕಗಳು ಮತ್ತು ಶೂನ್ಯತೆಗಳ ನಡುವಿನ ಸಂಬಂಧ.",
        "descriptionHi": "शून्यकों का ज्यामितीय अर्थ, द्विघात बहुपद के शून्यकों और गुणांकों के बीच संबंध।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Sum of zeroes (α + β) = -b/a",
          "Product of zeroes (αβ) = c/a",
          "Quadratic polynomial = k[x² - (α+β)x + αβ]"
        ],
        "subtopics": [
          {
            "id": "m10-02-01",
            "title": "Geometrical Representation & Number of Zeroes (Graphs)",
            "titleKn": "ರೇಖಾಚಿತ್ರದಲ್ಲಿ ಶೂನ್ಯತೆಗಳ ಗುರುತಿಸುವಿಕೆ",
            "titleHi": "ग्राफ और शून्यकों की संख्या का ज्यामितीय अर्थ",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m10-02-02",
            "title": "Relationship between Zeroes and Coefficients of Quadratic Polynomial",
            "titleKn": "ಶೂನ್ಯತೆಗಳು & ಗುಣಕಗಳ ಸಂಬಂಧ ಸೂತ್ರಗಳು",
            "titleHi": "शून्यकों और गुणांकों में संबंध",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m10-02-03",
            "title": "Forming Quadratic Polynomials from Given Zeroes",
            "titleKn": "ಶೂನ್ಯತೆಗಳಿಂದ ವರ್ಗ ಸಮೀಕರಣ ರಚನೆ",
            "titleHi": "दिए गए शून्यकों से द्विघात बहुपद बनाना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m10-03",
        "chapterNumber": 3,
        "title": "Pair of Linear Equations in Two Variables",
        "titleKn": "ಎರಡು ಚರಾಕ್ಷರಗಳಿರುವ ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳ ಜೋಡಿ",
        "titleHi": "दो चर वाले रैखिक समीकरण युग्म",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई २: बीजगणित",
        "description": "Graphical Method of Solution, Consistency Conditions, Substitution & Elimination Methods.",
        "descriptionKn": "ನಕ್ಷಾ ವಿಧಾನ, ಸ್ಥಿರತೆ ನಿಯಮಗಳು, ಆದೇಶ ಮತ್ತು ಅಪನಯನ ವಿಧಾನಗಳು.",
        "descriptionHi": "ग्राफ़ी विधि, संगतता की शर्तें, प्रतिस्थापन और विलोपन विधियाँ।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 10,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Unique: a1/a2 ≠ b1/b2 (Intersecting)",
          "Infinitely Many: a1/a2 = b1/b2 = c1/c2 (Coincident)",
          "No Solution: a1/a2 = b1/b2 ≠ c1/c2 (Parallel)"
        ],
        "subtopics": [
          {
            "id": "m10-03-01",
            "title": "Graphical Representation & Intersecting/Parallel/Coincident Lines",
            "titleKn": "ನಕ್ಷಾ ವಿಧಾನ & ರೇಖೆಗಳ ವಿಧಗಳು",
            "titleHi": "रैखिक समीकरणों का आलेखीय निरूपण",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m10-03-02",
            "title": "Algebraic Method 1: Substitution Method",
            "titleKn": "ಆದೇಶ ವಿಧಾನ (Substitution Method)",
            "titleHi": "प्रतिस्थापन विधि से समीकरण हल करना",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m10-03-03",
            "title": "Algebraic Method 2: Elimination Method",
            "titleKn": "ಅಪನಯನ ವಿಧಾನ (Elimination Method)",
            "titleHi": "विलोपन विधि से हल",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m10-03-04",
            "title": "Real-world Word Problems (Age, Speed, Fraction, Upstream/Downstream)",
            "titleKn": "ದೈನಂದಿನ ಜೀವನದ ಸಮಸ್ಯೆಗಳು",
            "titleHi": "व्यावहारिक अनुप्रयोग एवं शब्द समस्याएं",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m10-04",
        "chapterNumber": 4,
        "title": "Quadratic Equations",
        "titleKn": "ವರ್ಗ ಸಮೀಕರಣಗಳು (Quadratic Equations)",
        "titleHi": "द्विघात समीकरण (Quadratic Equations)",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई २: बीजगणित",
        "description": "Standard Form ax² + bx + c = 0, Factorisation, Quadratic Formula, Nature of Roots & Discriminant.",
        "descriptionKn": "ವರ್ಗ ಸಮೀಕರಣಗಳ ಪ್ರಮಾಣಿತ ರೂಪ, ಅಪವರ್ತನ ವಿಧಾನ, ಸೂತ್ರದ ವಿಧಾನ ಮತ್ತು ಮೂಲಗಳ ಸ್ವಭಾವ.",
        "descriptionHi": "मानक रूप, गुणनखंड विधि, द्विघाती सूत्र (श्रीधराचार्य सूत्र), मूलों की प्रकृति (विविक्तकर)।",
        "status": "In Progress",
        "completionPercent": 75,
        "totalPeriods": 10,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Standard form: ax² + bx + c = 0 (a ≠ 0)",
          "Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)",
          "Discriminant D = b² - 4ac (D>0 real distinct, D=0 equal, D<0 no real roots)"
        ],
        "subtopics": [
          {
            "id": "m10-04-01",
            "title": "Introduction & Standard Form Verification",
            "titleKn": "ವರ್ಗ ಸಮೀಕರಣ ಪರಿಚಯ & ಪ್ರಮಾಣಿತ ರೂಪ",
            "titleHi": "द्विघात समीकरण की पहचान और मानक रूप",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "m10-04-02",
            "title": "Solution by Factorisation (Middle Term Splitting)",
            "titleKn": "ಮಧ್ಯಪದ ವಿಭಜಿಸಿ ಅಪವರ್ತಿಸುವ ವಿಧಾನ",
            "titleHi": "मध्य पद विभक्त करके गुणनखंड द्वारा हल",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m10-04-03",
            "title": "Quadratic Formula & Discriminant Analysis",
            "titleKn": "ವರ್ಗ ಸೂತ್ರ ಮತ್ತು ಶೋಧಕದ ವಿಶ್ಲೇಷಣೆ",
            "titleHi": "द्विघाती सूत्र और विविक्तकर की प्रकृति",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "m10-04-04",
            "title": "Application & Speed-Distance Word Problems",
            "titleKn": "ವೇಗ-ದೂರ ಅನ್ವಯಿಕ ಸಮಸ್ಯೆಗಳು",
            "titleHi": "समय, चाल एवं ज्यामितीय व्यावहारिक समस्याएं",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-05",
        "chapterNumber": 5,
        "title": "Arithmetic Progressions (AP)",
        "titleKn": "ಸಮಾಂತರ ಶ್ರೇಢಿಗಳು (Arithmetic Progressions)",
        "titleHi": "समांतर श्रेढियाँ (Arithmetic Progressions)",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई ۲: बीजगणित",
        "description": "General Term of an AP (an), Common Difference (d), Sum of First n Terms (Sn) & Practical Applications.",
        "descriptionKn": "ಸಮಾಂತರ ಶ್ರೇಢಿಯ n ನೇ ಪದ, ಸಾಮಾನ್ಯ ವ್ಯತ್ಯಾಸ, ಮೊದಲ n ಪದಗಳ ಮೊತ್ತ ಮತ್ತು ಅನ್ವಯಗಳು.",
        "descriptionHi": "समांतर श्रेढ़ी का n-वां पद (an), सार्व अंतर (d), प्रथम n पदों का योग (Sn) और अनुप्रयोग।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "nth term: an = a + (n - 1)d",
          "Sum: Sn = n/2 [2a + (n - 1)d] = n/2 [a + l]",
          "Common difference: d = an - a(n-1)"
        ],
        "subtopics": [
          {
            "id": "m10-05-01",
            "title": "Concept of AP, First Term 'a' & Common Difference 'd'",
            "titleKn": "ಶ್ರೇಢಿಯ ಪರಿಕಲ್ಪನೆ & ಸಾಮಾನ್ಯ ವ್ಯತ್ಯಾಸ",
            "titleHi": "AP की अवधारणा, प्रथम पद और सार्व अंतर",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m10-05-02",
            "title": "Derivation & Practice of nth Term Formula (an)",
            "titleKn": "n ನೇ ಪದದ ಸೂತ್ರ ಮತ್ತು ಲೆಕ್ಕಾಚಾರ",
            "titleHi": "n-वें पद के सूत्र का निगमन और अभ्यास",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m10-05-03",
            "title": "Sum of First n Terms Formula (Sn)",
            "titleKn": "ಮೊದಲ n ಪದಗಳ ಮೊತ್ತದ ಸೂತ್ರ (Sn)",
            "titleHi": "प्रथम n पदों के योगफल का सूत्र",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m10-05-04",
            "title": "NCERT Advanced Drills & Word Applications",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ಕಠಿಣ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರ",
            "titleHi": "दैनिक जीवन की समस्याओं में AP का उपयोग",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-06",
        "chapterNumber": 6,
        "title": "Triangles",
        "titleKn": "ತ್ರಿಭುಜಗಳು (Triangles)",
        "titleHi": "त्रिभुज (Triangles)",
        "unit": "Unit IV: Geometry",
        "unitKn": "ಘಟಕ ೪: ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ४: ज्यामिति",
        "description": "Similarity of Triangles, Basic Proportionality Theorem (Thales Theorem), AAA, SSS, SAS Criteria.",
        "descriptionKn": "ತ್ರಿಭುಜಗಳ ಸಮರೂಪತೆ, ಥೇಲ್ಸ್ ಪ್ರಮೇಯ (ಮೂಲ ಸಮಾನುಪಾತತೆಯ ಪ್ರಮೇಯ) ಮತ್ತು ಸಮರೂಪತೆಯ ಸಿದ್ಧಾಂತಗಳು.",
        "descriptionHi": "त्रिभुजों की समरूपता, आधारभूत आनुपातिकता प्रमेय (थेल्स प्रमेय), AAA, SSS, SAS समरूपता कसौटियाँ।",
        "status": "In Progress",
        "completionPercent": 40,
        "totalPeriods": 12,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "BPT (Thales Theorem): AD/DB = AE/EC if DE ∥ BC",
          "Converse of BPT",
          "Criteria: AAA / AA, SSS, SAS for similar triangles"
        ],
        "subtopics": [
          {
            "id": "m10-06-01",
            "title": "Similar Figures vs Congruent Figures",
            "titleKn": "ಸಮರೂಪ ಮತ್ತು ಸರ್ವಸಮ ಆಕೃತಿಗಳು",
            "titleHi": "समरूप आकृतियों की परिभाषा और सर्वांगसमता से अंतर",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "m10-06-02",
            "title": "Basic Proportionality Theorem (BPT / Thales) Proof",
            "titleKn": "ಥೇಲ್ಸ್ ಪ್ರಮೇಯದ ವಿವರವಾದ ಸಾಧನೆ",
            "titleHi": "आधारभूत आनुपातिकता प्रमेय (थेल्स प्रमेय) की उपपत्ति",
            "type": "Theorem & Proof",
            "estimatedMinutes": 60,
            "isCompleted": true
          },
          {
            "id": "m10-06-03",
            "title": "Converse of Basic Proportionality Theorem",
            "titleKn": "ಥೇಲ್ಸ್ ಪ್ರಮೇಯದ ವಿಲೋಮ ಪ್ರಮೇಯ",
            "titleHi": "थेल्स प्रमेय का विलोम",
            "type": "Theorem & Proof",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m10-06-04",
            "title": "Criteria for Similarity of Triangles (AAA, SSS, SAS)",
            "titleKn": "ತ್ರಿಭುಜಗಳ ಸಮರೂಪತೆಯ ಮಾನದಂಡಗಳು",
            "titleHi": "त्रिभुजों की समरूपता की कसौटियाँ",
            "type": "Core Concept",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "m10-06-05",
            "title": "Board Exam High-Weightage Geometry Proofs",
            "titleKn": "ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪ್ರಮುಖ ಸಾಧನೆಗಳು",
            "titleHi": "बोर्ड परीक्षा के लिए महत्वपूर्ण ज्यामितीय प्रश्न",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-07",
        "chapterNumber": 7,
        "title": "Coordinate Geometry",
        "titleKn": "ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ (Coordinate Geometry)",
        "titleHi": "निर्देशांक ज्यामिति (Coordinate Geometry)",
        "unit": "Unit III: Coordinate Geometry",
        "unitKn": "ಘಟಕ ೩: ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ३: निर्देशांक ज्यामिति",
        "description": "Distance Formula, Section Formula (Internal Division), Midpoint Formula & Collinearity.",
        "descriptionKn": "ದೂರದ ಸೂತ್ರ, ಭಾಗಪ್ರಮಾಣ ಸೂತ್ರ (ಅಂತರ್ವಿಭಜನೆ) ಮತ್ತು ಮಧ್ಯಬಿಂದು ಸೂತ್ರ.",
        "descriptionHi": "दूरी सूत्र, विभाजन सूत्र (आंतरिक विभाजन) एवं मध्य-बिंदु सूत्र।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Distance Formula: d = √[(x2 - x1)² + (y2 - y1)²]",
          "Section Formula: P(x, y) = ((m1x2 + m2x1)/(m1 + m2), (m1y2 + m2y1)/(m1 + m2))",
          "Midpoint: ((x1 + x2)/2, (y1 + y2)/2)"
        ],
        "subtopics": [
          {
            "id": "m10-07-01",
            "title": "Distance Formula Derivation & Cartesian Distance Problems",
            "titleKn": "ದೂರದ ಸೂತ್ರದ ಸಾಧನೆ & ಲೆಕ್ಕಗಳು",
            "titleHi": "दूरी सूत्र का निगमन और बिंदु युग्मों के बीच दूरी",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m10-07-02",
            "title": "Proving Geometrical Shapes (Square, Rhombus, Parallelogram)",
            "titleKn": "ಜ್ಯಾಮಿತೀಯ ಆಕೃತಿಗಳನ್ನು ಸಾಬೀತುಪಡಿಸುವುದು",
            "titleHi": "निर्देशांकों से चतुर्भुज/त्रिभुज के प्रकार की जांच",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m10-07-03",
            "title": "Section Formula & Ratio Finding",
            "titleKn": "ಭಾಗಪ್ರಮಾಣ ಸೂತ್ರ ಮತ್ತು ಅನುಪಾತ ಕಂಡುಹಿಡಿಯುವುದು",
            "titleHi": "विभाजन सूत्र और अनुपात ज्ञात करने की विधि",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "m10-07-04",
            "title": "Midpoint Formula & Centroid Applications",
            "titleKn": "ಮಧ್ಯಬಿಂದು ಮತ್ತು ಕೇಂದ್ರಬಿಂದು ಲೆಕ್ಕಗಳು",
            "titleHi": "मध्य-बिंदु सूत्र के अनुप्रयोग",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 40,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-08",
        "chapterNumber": 8,
        "title": "Introduction to Trigonometry",
        "titleKn": "ತ್ರಿಕೋನಮಿತಿಯ ಪ್ರಸ್ತಾವನೆ (Trigonometry)",
        "titleHi": "त्रिकोणमिति का परिचय (Introduction to Trigonometry)",
        "unit": "Unit V: Trigonometry",
        "unitKn": "ಘಟಕ ೫: ತ್ರಿಕೋನಮಿತಿ",
        "unitHi": "इकाई ۵: त्रिकोणमिति",
        "description": "Trigonometric Ratios (sin, cos, tan, cosec, sec, cot), Specific Angles (0°, 30°, 45°, 60°, 90°), Pythagorean Identities.",
        "descriptionKn": "ತ್ರಿಕೋನಮಿತಿಯ ಅನುಪಾತಗಳು, ನಿರ್ದಿಷ್ಟ ಕೋನಗಳ ಮೌಲ್ಯಗಳು ಮತ್ತು ತ್ರಿಕೋನಮಿತಿಯ ನಿತ್ಯಸಮೀಕರಣಗಳು.",
        "descriptionHi": "त्रिकोणमितीय अनुपात, विशिष्ट कोणों (0°, 30°, 45°, 60°, 90°) के मान एवं सर्वसमिकाएँ।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 11,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "sin θ = Opp/Hyp, cos θ = Adj/Hyp, tan θ = Opp/Adj",
          "sin²θ + cos²θ = 1",
          "1 + tan²θ = sec²θ",
          "1 + cot²θ = cosec²θ"
        ],
        "subtopics": [
          {
            "id": "m10-08-01",
            "title": "Six Trigonometric Ratios of Right Angled Triangle",
            "titleKn": "ಲಂಬಕೋನ ತ್ರಿಭುಜದಲ್ಲಿ 6 ತ್ರಿಕೋನಮಿತಿ ಅನುಪಾತಗಳು",
            "titleHi": "समकोण त्रिभुज के 6 त्रिकोणमितीय अनुपात",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m10-08-02",
            "title": "Trigonometric Table for Standard Angles (0°, 30°, 45°, 60°, 90°)",
            "titleKn": "ನಿರ್ದಿಷ್ಟ ಕೋನಗಳ ತ್ರಿಕೋನಮಿತಿ ಕೋಷ್ಟಕ",
            "titleHi": "विशिष्ट कोणों की त्रिकोणमितीय सारणी याद करने की ट्रिक",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m10-08-03",
            "title": "Pythagorean Trigonometric Identities Proofs",
            "titleKn": "ತ್ರಿಕೋನಮಿತಿಯ ನಿತ್ಯಸಮೀಕರಣಗಳ ಸಾಧನೆಗಳು",
            "titleHi": "त्रिकोणमितीय सर्वसमिकाओं की उपपत्ति",
            "type": "Theorem & Proof",
            "estimatedMinutes": 60,
            "isCompleted": false
          },
          {
            "id": "m10-08-04",
            "title": "Proving Complex Trigonometric Identity Equations",
            "titleKn": "ಕ್ಲಿಷ್ಟಕರ ನಿತ್ಯಸಮೀಕರಣಗಳ ಸಾಬೀತುಪಡಿಸುವಿಕೆ",
            "titleHi": "सर्वसमिकाओं पर आधारित बोर्ड प्रश्न एवं अभ्यास",
            "type": "Board Exam Important",
            "estimatedMinutes": 65,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-09",
        "chapterNumber": 9,
        "title": "Some Applications of Trigonometry",
        "titleKn": "ತ್ರಿಕೋನಮಿತಿಯ ಕೆಲವು ಅನ್ವಯಗಳು (Heights & Distances)",
        "titleHi": "त्रिकोणमिति के कुछ अनुप्रयोग (ऊंचाई और दूरी)",
        "unit": "Unit V: Trigonometry",
        "unitKn": "ಘಟಕ ೫: ತ್ರಿಕೋನಮಿತಿ",
        "unitHi": "इकाई ۵: त्रिकोणमिति",
        "description": "Angle of Elevation, Angle of Depression, Heights and Distances Problems with 30°, 45°, 60°.",
        "descriptionKn": "ಉನ್ನತ ಕೋನ, ಅವನತ ಕೋನ, ಎತ್ತರ ಮತ್ತು ದೂರಗಳ ನೈಜ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರ.",
        "descriptionHi": "उन्नयन कोण, अवनमन कोण, मीनार और इमारतों की ऊँचाई व दूरी से संबंधित समस्याएं।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "tan θ = Height / Distance (Opposite / Adjacent)",
          "Angle of Elevation = Angle of Depression (Alternate angles)"
        ],
        "subtopics": [
          {
            "id": "m10-09-01",
            "title": "Line of Sight, Angle of Elevation & Depression Concepts",
            "titleKn": "ದೃಷ್ಟಿರೇಖೆ, ಉನ್ನತ ಕೋನ & ಅವನತ ಕೋನ",
            "titleHi": "दृष्टि रेखा, उन्नयन कोण और अवनमन कोण की संकल्पना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "m10-09-02",
            "title": "Single Right Triangle Height & Distance Problems",
            "titleKn": "ಏಕ ತ್ರಿಭುಜ ಎತ್ತರ ಮತ್ತು ದೂರದ ಲೆಕ್ಕಗಳು",
            "titleHi": "एक समकोण त्रिभुज वाली ऊँचाई और दूरी की समस्याएं",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m10-09-03",
            "title": "Double Triangle Word Problems (Poles, Ships, Clouds)",
            "titleKn": "ಎರಡು ತ್ರಿಭುಜಗಳ ಕ್ಲಿಷ್ಟಕರ ಅನ್ವಯಿಕ ಲೆಕ್ಕಗಳು",
            "titleHi": "दो समकोण त्रिभुजों पर आधारित बहुमंजिला व जहाज वाले प्रश्न",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-10",
        "chapterNumber": 10,
        "title": "Circles",
        "titleKn": "ವೃತ್ತಗಳು (Circles)",
        "titleHi": "वृत्त (Circles)",
        "unit": "Unit IV: Geometry",
        "unitKn": "ಘಟಕ ೪: ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ४: ज्यामिति",
        "description": "Tangent to a Circle, Point of Contact, Tangent Perpendicular to Radius, Tangents from an External Point.",
        "descriptionKn": "ವೃತ್ತಕ್ಕೆ ಸ್ಪರ್ಶಕ, ಸ್ಪರ್ಶ ಬಿಂದು, ತ್ರಿಜ್ಯಕ್ಕೆ ಲಂಬವಾಗಿರುವ ಸ್ಪರ್ಶಕ ಮತ್ತು ಬಾಹ್ಯ ಬಿಂದುವಿನಿಂದ ಸ್ಪರ್ಶಕಗಳು.",
        "descriptionHi": "वृत्त की स्पर्श रेखा, स्पर्श बिंदु, स्पर्श रेखा त्रिज्या पर लंब होती है, बाह्य बिंदु से स्पर्श रेखाओं की समानता।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Theorem 10.1: Tangent ⊥ Radius at point of contact",
          "Theorem 10.2: Tangents from external point are equal (PA = PB)"
        ],
        "subtopics": [
          {
            "id": "m10-10-01",
            "title": "Secant, Tangent & Point of Contact Definition",
            "titleKn": "ಛೇದಕ ರೇಖೆ, ಸ್ಪರ್ಶಕ ಮತ್ತು ಸ್ಪರ್ಶ ಬಿಂದು",
            "titleHi": "छेदक रेखा, स्पर्श रेखा और स्पर्श बिंदु",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": false
          },
          {
            "id": "m10-10-02",
            "title": "Theorem 10.1: Tangent Perpendicular to Radius Proof",
            "titleKn": "ಪ್ರಮೇಯ ೧೦.೧: ತ್ರಿಜ್ಯಕ್ಕೆ ಸ್ಪರ್ಶಕ ಲಂಬ ಸಾಧನೆ",
            "titleHi": "प्रमेय 10.1: स्पर्श रेखा स्पर्श बिंदु से जाने वाली त्रिज्या पर लंब होती है",
            "type": "Theorem & Proof",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m10-10-03",
            "title": "Theorem 10.2: Length of Tangents from External Point",
            "titleKn": "ಪ್ರಮೇಯ ೧೦.೨: ಬಾಹ್ಯ ಬಿಂದುವಿನಿಂದ ಎಳೆದ ಸ್ಪರ್ಶಕಗಳ ಉದ್ದ ಸಮ",
            "titleHi": "प्रमेय 10.2: बाह्य बिंदु से खींची गई स्पर्श रेखाओं की लंबाई बराबर होती है",
            "type": "Theorem & Proof",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "m10-10-04",
            "title": "NCERT Exercise 10.2 Geometry Proof Drills",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ಅಭ್ಯಾಸ ೧೦.೨ ಸಾಧನೆಗಳು",
            "titleHi": "NCERT 10.2 के महत्वपूर्ण प्रश्नों का हल",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-11",
        "chapterNumber": 11,
        "title": "Areas Related to Circles",
        "titleKn": "ವೃತ್ತಗಳಿಗೆ ಸಂಬಂಧಿಸಿದ ವಿಸ್ತೀರ್ಣಗಳು",
        "titleHi": "वृत्तों से संबंधित क्षेत्रफल",
        "unit": "Unit VI: Mensuration",
        "unitKn": "ಘಟಕ ೬: ಕ್ಷೇತ್ರಗಣಿತ",
        "unitHi": "इकाई ६: क्षेत्रमिति",
        "description": "Area of Sector and Segment of a Circle, Length of Arc of a Sector of Angle θ.",
        "descriptionKn": "ತ್ರಿಜ್ಯಾಂತರ ಖಂಡ ಮತ್ತು ವೃತ್ತಖಂಡದ ವಿಸ್ತೀರ್ಣ, ಕಂಸದ ಉದ್ದದ ಲೆಕ್ಕಾಚಾರ.",
        "descriptionHi": "त्रिज्यखंड और वृत्तखंड का क्षेत्रफल, कोण θ वाले त्रिज्यखंड के चाप की लंबाई।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Length of Arc: L = (θ/360°) × 2πr",
          "Area of Sector: A = (θ/360°) × πr²",
          "Area of Segment = Area of Sector - Area of Triangle"
        ],
        "subtopics": [
          {
            "id": "m10-11-01",
            "title": "Perimeter & Area of Circle Review",
            "titleKn": "ವೃತ್ತದ ಸುತ್ತಳತೆ ಮತ್ತು ವಿಸ್ತೀರ್ಣ ಪುನರಾವರ್ತನೆ",
            "titleHi": "वृत्त का परिमाप और क्षेत्रफल",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": false
          },
          {
            "id": "m10-11-02",
            "title": "Area of Minor & Major Sector of a Circle",
            "titleKn": "ಲಘು ಮತ್ತು ಗುರು ತ್ರಿಜ್ಯಾಂತರ ಖಂಡದ ವಿಸ್ತೀರ್ಣ",
            "titleHi": "लघु और दीर्घ त्रिज्यखंड का क्षेत्रफल",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m10-11-03",
            "title": "Area of Minor & Major Segment of a Circle",
            "titleKn": "ಲಘು ಮತ್ತು ಗುರು ವೃತ್ತಖಂಡದ ವಿಸ್ತೀರ್ಣ",
            "titleHi": "लघु और दीर्घ वृत्तखंड का क्षेत्रफल",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m10-11-04",
            "title": "Clock Hands, Brooch & Wiper Word Problems",
            "titleKn": "ಗಡಿಯಾರದ ಮುಳ್ಳುಗಳು & ದೈನಂದಿನ ಅನ್ವಯಗಳು",
            "titleHi": "घड़ी की सुई, वाइपर व छतरी वाले व्यावहारिक प्रश्न",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-12",
        "chapterNumber": 12,
        "title": "Surface Areas and Volumes",
        "titleKn": "ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣಗಳು ಮತ್ತು ಘನಫಲಗಳು",
        "titleHi": "पृष्ठीय क्षेत्रफल और आयतन",
        "unit": "Unit VI: Mensuration",
        "unitKn": "ಘಟಕ ೬: ಕ್ಷೇತ್ರಗಣಿತ",
        "unitHi": "इकाई ६: क्षेत्रमिति",
        "description": "Surface Areas and Volumes of Combinations of Solids (Cube, Cuboid, Sphere, Hemisphere, Cylinder, Cone).",
        "descriptionKn": "ಸಂಯೋಜಿತ ಘನಾಕೃತಿಗಳ (ಘನ, ಆಯತಘನ, ಸಿಲಿಂಡರ್, ಶಂಕು, ಗೋಳ) ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಘನಫಲ.",
        "descriptionHi": "ठोसों के संयोजन (घन, घनाभ, बेलन, शंकु, गोला, अर्धगोला) का पृष्ठीय क्षेत्रफल और आयतन।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Cylinder: CSA = 2πrh, Volume = πr²h",
          "Cone: CSA = πrl (l = √(r²+h²)), Vol = 1/3 πr²h",
          "Sphere: SA = 4πr², Vol = 4/3 πr³",
          "Hemisphere: CSA = 2πr², TSA = 3πr², Vol = 2/3 πr³"
        ],
        "subtopics": [
          {
            "id": "m10-12-01",
            "title": "Surface Area of Combined Solids (Capsule, Toy, Tent)",
            "titleKn": "ಸಂಯೋಜಿತ ಘನಾಕೃತಿಗಳ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ",
            "titleHi": "संयोजित ठोसों का पृष्ठीय क्षेत्रफल (खिलौना, कैप्सूल)",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m10-12-02",
            "title": "Volume of Combined Solids (Gulab Jamun, Test Tube)",
            "titleKn": "ಸಂಯೋಜಿತ ಘನಾಕೃತಿಗಳ ಘನಫಲ ಲೆಕ್ಕಗಳು",
            "titleHi": "संयोजित ठोसों का आयतन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m10-12-03",
            "title": "NCERT 12.1 & 12.2 Comprehensive Drill",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ೧೨.೧ & ೧೨.೨ ಅಭ್ಯಾಸ",
            "titleHi": "NCERT 12.1 व 12.2 के प्रश्नों का गहन अभ्यास",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-13",
        "chapterNumber": 13,
        "title": "Statistics",
        "titleKn": "ಸಂಖ್ಯಾಶಾಸ್ತ್ರ (Statistics)",
        "titleHi": "सांख्यिकी (Statistics)",
        "unit": "Unit VII: Statistics & Probability",
        "unitKn": "ಘಟಕ ೭: ಸಂಖ್ಯಾಶಾಸ್ತ್ರ & ಸಂಭವನೀಯತೆ",
        "unitHi": "इकाई ۷: सांख्यिकी और प्रायिकता",
        "description": "Mean of Grouped Data (Direct & Assumed Mean Methods), Mode of Grouped Data, Median of Grouped Data.",
        "descriptionKn": "ವರ್ಗೀಕೃತ ದತ್ತಾಂಶಗಳ ಸರಾಸರಿ (ನೇರ & ಊಹಿಸಿದ ಸರಾಸರಿ ವಿಧಾನ), ಬಹುಲಕ ಮತ್ತು ಮಧ್ಯಾಂಕ.",
        "descriptionHi": "वर्गीकृत आंकड़ों का माध्य (प्रत्यक्ष और कल्पित माध्य विधि), बहुलक एवं माध्यक।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Mean (Direct): x̄ = Σfi*xi / Σfi",
          "Mean (Assumed): x̄ = a + Σfi*di / Σfi",
          "Mode: l + [(f1 - f0)/(2f1 - f0 - f2)] × h",
          "Median: l + [(N/2 - cf)/f] × h",
          "Empirical Relation: 3 Median = Mode + 2 Mean"
        ],
        "subtopics": [
          {
            "id": "m10-13-01",
            "title": "Mean of Grouped Data (Direct Method & Assumed Mean)",
            "titleKn": "ವರ್ಗೀಕೃತ ದತ್ತಾಂಶಗಳ ಸರಾಸರಿ ಲೆಕ್ಕಾಚಾರ",
            "titleHi": "माध्य निकालने की प्रत्यक्ष और कल्पित माध्य विधि",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m10-13-02",
            "title": "Mode of Grouped Data & Modal Class",
            "titleKn": "ವರ್ಗೀಕೃತ ದತ್ತಾಂಶಗಳ ಬಹುಲಕ",
            "titleHi": "बहुलक वर्ग और बहुलक सूत्र का अनुप्रयोग",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m10-13-03",
            "title": "Median of Grouped Data & Cumulative Frequency (cf)",
            "titleKn": "ಮಧ್ಯಾಂಕ ಮತ್ತು ಸಂಚಿತ ಆವರ್ತಿ",
            "titleHi": "संचयी बारंबारता और माध्यक की गणना",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "m10-13-04",
            "title": "Missing Frequency 'x' and 'y' Problems & Empirical Formula",
            "titleKn": "ಕಾಣೆಯಾದ ಆವರ್ತಿ ಕಂಡುಹಿಡಿಯುವುದು",
            "titleHi": "अज्ञात बारंबारता वाले प्रश्न एवं आनुभविक संबंध",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m10-14",
        "chapterNumber": 14,
        "title": "Probability",
        "titleKn": "ಸಂಭವನೀಯತೆ (Probability)",
        "titleHi": "प्रायिकता (Probability)",
        "unit": "Unit VII: Statistics & Probability",
        "unitKn": "ಘಟಕ ೭: ಸಂಖ್ಯಾಶಾಸ್ತ್ರ & ಸಂಭವನೀಯತೆ",
        "unitHi": "इकाई ۷: सांख्यिकी और प्रायिकता",
        "description": "Classical Definition of Probability, Simple Problems on Single Events (Dice, Cards, Coins, Marbles).",
        "descriptionKn": "ಸಂಭವನೀಯತೆಯ ಪರಿಕಲ್ಪನೆ, ನಾಣ್ಯ, ದಾಳ, ಇಸ್ಪೀಟ್ ಎಲೆಗಳು ಮತ್ತು ಸರಳ ಘಟನೆಗಳ ಸಮಸ್ಯೆಗಳು.",
        "descriptionHi": "प्रायिकता की सैद्धांतिक परिभाषा, सिक्के, पासा, ताश की गड्डी व गेंदों पर आधारित समस्याएं।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 6,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "P(E) = Number of favorable outcomes / Total possible outcomes",
          "0 ≤ P(E) ≤ 1",
          "P(E) + P(not E) = 1",
          "Sure event = 1, Impossible event = 0"
        ],
        "subtopics": [
          {
            "id": "m10-14-01",
            "title": "Theoretical Probability & Elementary Events",
            "titleKn": "ಸೈದ್ಧಾಂತಿಕ ಸಂಭವನೀಯತೆಯ ಮೂಲ ತತ್ವಗಳು",
            "titleHi": "प्रायिकता की परिभाषा और मूल घटनाएं",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": false
          },
          {
            "id": "m10-14-02",
            "title": "Coin Toss & Single/Double Dice Rolling Outcomes",
            "titleKn": "ನಾಣ್ಯ ಮತ್ತು ದಾಳಗಳ ಸಂಭವನೀಯತೆ",
            "titleHi": "सिक्के और पासे के परिणामों का विश्लेषण",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "m10-14-03",
            "title": "52 Playing Cards Standard Deck Breakdown",
            "titleKn": "೫೨ ಇಸ್ಪೀಟ್ ಎಲೆಗಳ ವಿಶ್ಲೇಷಣೆ",
            "titleHi": "ताश के 52 पत्तों का वर्गीकरण और प्रायिकता",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m10-14-04",
            "title": "NCERT Chapter 14 Complete Board Practice",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ೧೪ ನೇ ಅಧ್ಯಾಯದ ಅಭ್ಯಾಸ",
            "titleHi": "NCERT 14 के सभी महत्वपूर्ण प्रश्न",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c10-sci",
    "name": "Science & Physics",
    "nameKn": "ವಿಜ್ಞಾನ (Science)",
    "nameHi": "विज्ञान (Science)",
    "classGrade": "Class 10",
    "icon": "Atom",
    "color": "#059669",
    "badgeBg": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "borderColor": "border-emerald-500",
    "chapters": [
      {
        "id": "s10-01",
        "chapterNumber": 1,
        "title": "Chemical Reactions and Equations",
        "titleKn": "ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು ಮತ್ತು ಸಮೀಕರಣಗಳು",
        "titleHi": "रासायनिक अभिक्रियाएं एवं समीकरण",
        "unit": "Unit I: Chemical Substances - Nature & Behaviour",
        "unitKn": "ಘಟಕ ೧: ರಾಸಾಯನಿಕ ವಸ್ತುಗಳು",
        "unitHi": "इकाई १: रासायनिक पदार्थ - प्रकृति एवं व्यवहार",
        "description": "Chemical Equations, Balanced Equations, Types of Reactions (Combination, Decomposition, Displacement, Double Displacement, Redox), Rancidity & Corrosion.",
        "descriptionKn": "ರಾಸಾಯನಿಕ ಸಮೀಕರಣಗಳು, ಸರಿದೂಗಿಸುವಿಕೆ, ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳ ವಿಧಗಳು, ಉತ್ಕರ್ಷಣ-ಅಪಕರ್ಷಣ, ತುಕ್ಕು ಹಿಡಿಯುವುದು.",
        "descriptionHi": "रासायनिक समीकरण का संतुलन, अभिक्रियाओं के प्रकार (संयोजन, वियोजन, विस्थापन, द्विविस्थापन, रेडॉक्स), संक्षारण और विकृतगंधिता।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Law of Conservation of Mass: Mass of reactants = Mass of products",
          "Oxidation = Gain of O2 / Loss of H2",
          "Reduction = Gain of H2 / Loss of O2"
        ],
        "subtopics": [
          {
            "id": "s10-01-01",
            "title": "Writing & Balancing Chemical Equations with State Symbols",
            "titleKn": "ರಾಸಾಯನಿಕ ಸಮೀಕರಣ ಸರಿದೂಗಿಸುವುದು",
            "titleHi": "रासायनिक समीकरण को संतुलित करना",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s10-01-02",
            "title": "Combination & Decomposition Reactions (Thermal, Electrolytic, Photolytic)",
            "titleKn": "ಸಂಯೋಗ & ವಿಭಜನೆ ಕ್ರಿಯೆಗಳು",
            "titleHi": "संयोजन और अपघटन (ऊष्मीय, विद्युत, प्रकाशीय) अभिक्रियाएं",
            "type": "Experiment & Practical",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "s10-01-03",
            "title": "Displacement & Double Displacement (Precipitation Reactions)",
            "titleKn": "ಸ್ಥಾನಪಲ್ಲಟ & ದ್ವಿಸ್ಥಾನಪಲ್ಲಟ ಕ್ರಿಯೆಗಳು",
            "titleHi": "विस्थापन और द्विविस्थापन (अवक्षेपण) अभिक्रियाएं",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s10-01-04",
            "title": "Redox Reactions, Corrosion Prevention & Rancidity",
            "titleKn": "ಉತ್ಕರ್ಷಣ, ಅಪಕರ್ಷಣ ಮತ್ತು ತುಕ್ಕು ಹಿಡಿಯುವುದು",
            "titleHi": "उपचयन-अपचयन, संक्षारण और विकृतगंधिता",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s10-02",
        "chapterNumber": 2,
        "title": "Acids, Bases and Salts",
        "titleKn": "ಆಮ್ಲಗಳು, ಪ್ರತ್ಯಾಮ್ಲಗಳು ಮತ್ತು ಲವಣಗಳು",
        "titleHi": "अम्ल, क्षारक एवं लवण",
        "unit": "Unit I: Chemical Substances - Nature & Behaviour",
        "unitKn": "ಘಟಕ ೧: ರಾಸಾಯನಿಕ ವಸ್ತುಗಳು",
        "unitHi": "इकाई १: रासायनिक पदार्थ - प्रकृति एवं व्यवहार",
        "description": "Definitions (H+ and OH- ions), Chemical Properties, pH Scale, Importance of pH in Everyday Life, Preparation & Uses of Salts (Bleaching Powder, Baking Soda, Washing Soda, Plaster of Paris).",
        "descriptionKn": "ಆಮ್ಲ-ಪ್ರತ್ಯಾಮ್ಲಗಳ ರಾಸಾಯನಿಕ ಗುಣಗಳು, pH ಮಾಪಕ, ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ pH ನ ಮಹತ್ವ, ಪ್ರಮುಖ ಲವಣಗಳ ತಯಾರಿಕೆ ಮತ್ತು ಉಪಯೋಗಗಳು.",
        "descriptionHi": "अम्ल-क्षारक के रासायनिक गुण, pH पैमाना, दैनिक जीवन में pH का महत्व, महत्वपूर्ण लवण (ब्लीचिंग पाउडर, बेकिंग सोडा, धावन सोडा, प्लास्टर ऑफ पेरिस)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 10,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "pH = -log[H+], pH < 7 Acidic, pH = 7 Neutral, pH > 7 Basic",
          "Acid + Base → Salt + Water (Neutralisation)",
          "Acid + Metal → Salt + H2 ↑",
          "Plaster of Paris: CaSO4 · 1/2 H2O"
        ],
        "subtopics": [
          {
            "id": "s10-02-01",
            "title": "Indicators (Litmus, Turmeric, Methyl Orange, Phenolphthalein, Olfactory)",
            "titleKn": "ಸೂಚಕಗಳು ಮತ್ತು ಆಮ್ಲ-ಪ್ರತ್ಯಾಮ್ಲ ಪರೀಕ್ಷೆ",
            "titleHi": "प्राकृतिक और संश्लेषित सूचक",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s10-02-02",
            "title": "Reactions with Metals, Carbonates & Neutralisation",
            "titleKn": "ಲೋಹಗಳು ಮತ್ತು ಕಾರ್ಬೊನೇಟ್‌ಗಳೊಂದಿಗೆ ಕ್ರಿಯೆಗಳು",
            "titleHi": "धातुओं, कार्बोनेट के साथ अभिक्रिया और उदासीनीकरण",
            "type": "Experiment & Practical",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s10-02-03",
            "title": "pH Scale, Universal Indicator & Real Life Significance",
            "titleKn": "pH ಮಾಪಕ ಮತ್ತು ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ pH",
            "titleHi": "pH पैमाना और दैनिक जीवन में pH का महत्व",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s10-02-04",
            "title": "Salts: Bleaching Powder, Baking Soda, Washing Soda, POP",
            "titleKn": "ಪ್ರಮುಖ ಲವಣಗಳ ತಯಾರಿಕೆ ಮತ್ತು ಉಪಯೋಗಗಳು",
            "titleHi": "ब्लीचिंग पाउडर, बेकिंग सोडा, धावन सोडा और POP",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s10-03",
        "chapterNumber": 3,
        "title": "Metals and Non-metals",
        "titleKn": "ಲೋಹಗಳು ಮತ್ತು ಅಲೋಹಗಳು",
        "titleHi": "धातु एवं अधातु",
        "unit": "Unit I: Chemical Substances - Nature & Behaviour",
        "unitKn": "ಘಟಕ ೧: ರಾಸಾಯನಿಕ ವಸ್ತುಗಳು",
        "unitHi": "इकाई १: रासायनिक पदार्थ - प्रकृति एवं व्यवहार",
        "description": "Physical and Chemical Properties of Metals & Non-metals, Reactivity Series, Formation of Ionic Compounds, Metallurgy (Extraction of Metals), Corrosion & Alloys.",
        "descriptionKn": "ಭೌತ ಮತ್ತು ರಾಸಾಯನಿಕ ಗುಣಗಳು, ಕ್ರಿಯಾಶೀಲತೆಯ ಸರಣಿ, ಅಯಾನಿಕ್ ಸಂಯುಕ್ತಗಳ ರಚನೆ, ಲೋಹಶಾಸ್ತ್ರ ಮತ್ತು ಮಿಶ್ರಲೋಹಗಳು.",
        "descriptionHi": "धातु व अधातु के भौतिक और रासायनिक गुण, सक्रियता श्रेणी, आयनिक यौगिकों का निर्माण, धातुकर्म (निष्कर्षण) और मिश्रधातु।",
        "status": "In Progress",
        "completionPercent": 80,
        "totalPeriods": 10,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Reactivity Series: K > Na > Ca > Mg > Al > Zn > Fe > Pb > H > Cu > Hg > Ag > Au",
          "Ionic Bond: Electrostatic force between cation and anion",
          "Rusting: 4Fe + 3O2 + xH2O → 2Fe2O3·xH2O"
        ],
        "subtopics": [
          {
            "id": "s10-03-01",
            "title": "Physical & Chemical Properties of Metals and Non-Metals",
            "titleKn": "ಲೋಹ-ಅಲೋಹಗಳ ಭೌತ ಮತ್ತು ರಾಸಾಯನಿಕ ಗುಣಗಳು",
            "titleHi": "धातु और अधातु के भौतिक व रासायनिक गुणधर्म",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s10-03-02",
            "title": "Reactivity Series & Displacement of Hydrogen",
            "titleKn": "ಲೋಹಗಳ ಕ್ರಿಯಾಶೀಲತೆ ಸರಣಿ",
            "titleHi": "सक्रियता श्रेणी और धातुओं की क्रियाशीलता",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s10-03-03",
            "title": "Ionic Bonds & Properties of Ionic Compounds",
            "titleKn": "ಅಯಾನಿಕ್ ಬಂಧ ಮತ್ತು ಗುಣಲಕ್ಷಣಗಳು",
            "titleHi": "आयनिक यौगिकों का निर्माण और उनके गुणधर्म",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s10-03-04",
            "title": "Metallurgy: Roasting, Calcination & Refining of Metals",
            "titleKn": "ಲೋಹೋದ್ಧರಣ: ಹುರಿಯುವಿಕೆ, ಭಸ್ಮೀಕರಣ ಮತ್ತು ಶುದ್ಧೀಕರಣ",
            "titleHi": "अयस्कों का सांद्रण, भर्जन, निस्तापन और विद्युत अपघटनी परिष्करण",
            "type": "Experiment & Practical",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s10-03-05",
            "title": "Corrosion Prevention, Galvanisation & Alloys",
            "titleKn": "ತುಕ್ಕು ತಡೆಗಟ್ಟುವಿಕೆ ಮತ್ತು ಮಿಶ್ರಲೋಹಗಳು",
            "titleHi": "संक्षारण से सुरक्षा, यशदलेपन और मिश्रधातुएं",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-04",
        "chapterNumber": 4,
        "title": "Carbon and its Compounds",
        "titleKn": "ಕಾರ್ಬನ್ ಮತ್ತು ಅದರ ಸಂಯುಕ್ತಗಳು",
        "titleHi": "कार्बन एवं उसके यौगिक",
        "unit": "Unit I: Chemical Substances - Nature & Behaviour",
        "unitKn": "ಘಟಕ ೧: ರಾಸಾಯನಿಕ ವಸ್ತುಗಳು",
        "unitHi": "इकाई १: रासायनिक पदार्थ - प्रकृति एवं व्यवहार",
        "description": "Covalent Bonding in Carbon, Versatile Nature of Carbon (Catenation, Tetravalency), Homologous Series, IUPAC Nomenclature, Functional Groups, Ethanol & Ethanoic Acid, Soaps and Detergents.",
        "descriptionKn": "ಕೋವೇಲೆಂಟ್ ಬಂಧ, ಕಾರ್ಬನ್‌ನ ವಿಶಿಷ್ಟ ಗುಣಗಳು, ಸಜಾತೀಯ ಶ್ರೇಣಿ, IUPAC ನಾಮಕರಣ, ಎಥನಾಲ್ ಮತ್ತು ಎಥನಾಯಿಕ್ ಆಮ್ಲ, ಸಾಬೂನು ಮತ್ತು ಡಿಟರ್ಜೆಂಟ್‌ಗಳು.",
        "descriptionHi": "सहसंयोजी आबंधन, कार्बन की सर्वतोमुखी प्रकृति, समजातीय श्रेणी, IUPAC नामकरण, एथेनॉल और एथेनॉइक अम्ल, साबुन और अपमार्जक (मिसेल)।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 11,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Alkanes: CnH2n+2",
          "Alkenes: CnH2n",
          "Alkynes: CnH2n-2",
          "Esterification: Alcohol + Carboxylic Acid → Ester + Water",
          "Saponification: Ester + NaOH → Soap + Alcohol"
        ],
        "subtopics": [
          {
            "id": "s10-04-01",
            "title": "Covalent Bonding in Methane, Water, Oxygen & Nitrogen",
            "titleKn": "ಕೋವೇಲೆಂಟ್ ಬಂಧದ ಎಲೆಕ್ಟ್ರಾನ್ ಚುಕ್ಕಿ ರಚನೆ",
            "titleHi": "सहसंयोजी बंध और इलेक्ट्रॉन बिंदु संरचना",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s10-04-02",
            "title": "Versatile Nature: Catenation & Tetravalency",
            "titleKn": "ಕ್ಯಾಟಿನೇಷನ್ ಮತ್ತು ಚತುರ್ವೇಲೆನ್ಸಿ",
            "titleHi": "श्रृंखलन और चतुःसंयोजकता",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s10-04-03",
            "title": "Homologous Series, Functional Groups & IUPAC Naming",
            "titleKn": "ಸಜಾತೀಯ ಶ್ರೇಣಿ ಮತ್ತು IUPAC ನಾಮಕರಣ",
            "titleHi": "समजातीय श्रेणी, प्रकार्यात्मक समूह और IUPAC नामकरण",
            "type": "Formula & Derivation",
            "estimatedMinutes": 60,
            "isCompleted": true
          },
          {
            "id": "s10-04-04",
            "title": "Chemical Properties of Carbon (Combustion, Oxidation, Addition, Substitution)",
            "titleKn": "ಕಾರ್ಬನ್ ಸಂಯುಕ್ತಗಳ ರಾಸಾಯನಿಕ ಕ್ರಿಯೆಗಳು",
            "titleHi": "दहन, ऑक्सीकरण, संकलन और प्रतिस्थापन अभिक्रियाएं",
            "type": "Experiment & Practical",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s10-04-05",
            "title": "Ethanol & Ethanoic Acid Properties & Reactions",
            "titleKn": "ಎಥನಾಲ್ ಮತ್ತು ಎಥನಾಯಿಕ್ ಆಮ್ಲದ ಕ್ರಿಯೆಗಳು",
            "titleHi": "एथेनॉल और एथेनॉइक अम्ल के गुणधर्म",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s10-04-06",
            "title": "Cleansing Action of Soaps, Micelle Formation & Detergents",
            "titleKn": "ಸಾಬೂನಿನ ಸ್ವಚ್ಛಗೊಳಿಸುವ ಕ್ರಿಯೆ & ಮಿಸೆಲ್ ರಚನೆ",
            "titleHi": "साबुन की सफाई प्रक्रिया, मिसेल निर्माण और अपमार्जक",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-05",
        "chapterNumber": 5,
        "title": "Life Processes",
        "titleKn": "ಜೀವ ಕ್ರಿಯೆಗಳು (Life Processes)",
        "titleHi": "जैव प्रक्रम (Life Processes)",
        "unit": "Unit II: World of Living",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚ",
        "unitHi": "इकाई २: सजीव जगत",
        "description": "Nutrition (Autotrophic & Heterotrophic, Photosynthesis, Human Digestive System), Respiration (Aerobic & Anaerobic, Human Respiratory System), Transportation (Human Heart, Blood, Lymph, Plant Xylem & Phloem), Excretion (Human Nephron, Urine Formation, Plant Excretion).",
        "descriptionKn": "ಪೋಷಣೆ (ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ, ಮಾನವ ಜೀರ್ಣಾಂಗ), ಉಸಿರಾಟ, ರಕ್ತಪರಿಚಲನೆ (ಮಾನವ ಹೃದಯ), ವಿಸರ್ಜನೆ (ಮೂತ್ರಪಿಂಡ & ನೆಫ್ರಾನ್).",
        "descriptionHi": "पोषण (प्रकाश संश्लेषण, मानव पाचन तंत्र), श्वसन (वायवीय व अवायवीय, मानव श्वसन तंत्र), वहन (मानव हृदय, रक्त, पौधों में जाइलम व फ्लोएम), उत्सर्जन (नेफ्रॉन)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 12,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Photosynthesis: 6CO2 + 6H2O → C6H12O6 + 6O2",
          "Aerobic: Glucose → Pyruvate → 6CO2 + 6H2O + 38 ATP",
          "Anaerobic (Yeast): Glucose → Pyruvate → Ethanol + CO2 + 2 ATP",
          "Blood Pressure: Systolic 120 mmHg / Diastolic 80 mmHg"
        ],
        "subtopics": [
          {
            "id": "s10-05-01",
            "title": "Autotrophic Nutrition & Stomata Mechanism (Photosynthesis)",
            "titleKn": "ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಮತ್ತು ಪತ್ರರಂಧ್ರಗಳ ಕ್ರಿಯೆ",
            "titleHi": "प्रकाश संश्लेषण के चरण और रंध्रों का खुलना-बंद होना",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s10-05-02",
            "title": "Human Alimentary Canal & Digestive Enzymes",
            "titleKn": "ಮಾನವನ ಜೀರ್ಣಾಂಗ ವ್ಯೂಹ ಮತ್ತು ಕಿಣ್ವಗಳು",
            "titleHi": "मानव पाचन तंत्र और विभिन्न एंजाइमों के कार्य",
            "type": "Core Concept",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "s10-05-03",
            "title": "Aerobic vs Anaerobic Respiration & Human Lungs/Alveoli",
            "titleKn": "ವಾಯವಿಕ-ಅವಾಯವಿಕ ಉಸಿರಾಟ & ಶ್ವಾಸಕೋಶ",
            "titleHi": "वायवीय और अवायवीय श्वसन तथा मानव श्वसन तंत्र",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s10-05-04",
            "title": "Human Heart Double Circulation & Blood Vessels",
            "titleKn": "ಮಾನವ ಹೃದಯ ಮತ್ತು ಇಮ್ಮಡಿ ರಕ್ತ ಪರಿಚಲನೆ",
            "titleHi": "मानव हृदय की संरचना और दोहरा परिसंचरण तंत्र",
            "type": "Core Concept",
            "estimatedMinutes": 60,
            "isCompleted": true
          },
          {
            "id": "s10-05-05",
            "title": "Transportation in Plants: Xylem (Transpiration) & Phloem (Translocation)",
            "titleKn": "ಸಸ್ಯಗಳಲ್ಲಿ ನೀರು ಮತ್ತು ಆಹಾರ ಸಾಗಾಣಿಕೆ",
            "titleHi": "पौधों में परिवहन: जाइलम (वाष्पोत्सर्जन) और फ्लोएम (स्थानांतरण)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s10-05-06",
            "title": "Human Excretory System, Nephron Structure & Urine Formation",
            "titleKn": "ಮಾನವ ವಿಸರ್ಜನಾಂಗ ವ್ಯೂಹ & ನೆಫ್ರಾನ್",
            "titleHi": "मानव उत्सर्जन तंत्र, नेफ्रॉन की संरचना और मूत्र निर्माण",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s10-06",
        "chapterNumber": 6,
        "title": "Control and Coordination",
        "titleKn": "ನಿಯಂತ್ರಣ ಮತ್ತು ಸಹಭಾಗಿತ್ವ",
        "titleHi": "नियंत्रण एवं समन्वय",
        "unit": "Unit II: World of Living",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚ",
        "unitHi": "इकाई २: सजीव जगत",
        "description": "Nervous System, Structure of Neuron, Synapse, Reflex Arc, Human Brain (Forebrain, Midbrain, Hindbrain), Plant Hormones (Auxin, Gibberellin, Cytokinin, Abscisic Acid), Plant Tropic Movements, Animal Endocrine System (Hormones & Glands).",
        "descriptionKn": "ನರಮಂಡಲ, ನ್ಯೂರಾನ್ ರಚನೆ, ಪ್ರತಿವರ್ತಿತ ಚಾಪ, ಮಾನವ ಮೆದುಳು, ಸಸ್ಯ ಹಾರ್ಮೋನ್‌ಗಳು, ಅಂತಃಸ್ರಾವಕ ಗ್ರಂಥಿಗಳು.",
        "descriptionHi": "तंत्रिका तंत्र, न्यूरॉन की संरचना, प्रतिवर्ती चाप, मानव मस्तिष्क, पादप हार्मोन (ऑक्सिन, जिबरेलिन आदि), जंतुओं में अंतःस्रावी ग्रंथियां और हार्मोन।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Neuron Parts: Dendrite → Cyton (Cell Body) → Axon → Nerve Ending",
          "Plant Hormones: Auxin (Growth/Phototropism), Gibberellin (Stem elongation), Cytokinin (Cell division), ABA (Growth inhibitor/Wilting)",
          "Insulin (Pancreas - Blood Sugar), Thyroxine (Thyroid - Metabolism), Adrenaline (Adrenal - Emergency)"
        ],
        "subtopics": [
          {
            "id": "s10-06-01",
            "title": "Neuron Structure, Synapse Transmission & Reflex Arc",
            "titleKn": "ನ್ಯೂರಾನ್ ರಚನೆ ಮತ್ತು ಪ್ರತಿವರ್ತಿತ ಚಾಪ",
            "titleHi": "न्यूरॉन की संरचना, सिनैप्स और प्रतिवर्ती चाप",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s10-06-02",
            "title": "Human Brain Anatomy: Cerebrum, Cerebellum, Medulla, Pons",
            "titleKn": "ಮಾನವ ಮೆದುಳಿನ ರಚನೆ ಮತ್ತು ಕಾರ್ಯಗಳು",
            "titleHi": "मानव मस्तिष्क के भाग और उनके कार्य",
            "type": "Core Concept",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "s10-06-03",
            "title": "Plant Hormones & Tropic Movements (Phototropism, Geotropism, Hydrotropism)",
            "titleKn": "ಸಸ್ಯ ಹಾರ್ಮೋನ್‌ಗಳು ಮತ್ತು ಚಲನೆಗಳು",
            "titleHi": "पादप हार्मोन और अनुवर्तन गतियां",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s10-06-04",
            "title": "Human Endocrine Glands, Hormones & Feedback Mechanism",
            "titleKn": "ಅಂತಃಸ್ರಾವಕ ಗ್ರಂಥಿಗಳು & ಪ್ರತಿಕ್ರಿಯೆ ಕಾರ್ಯವಿಧಾನ",
            "titleHi": "अंतःस्रावी ग्रंथियां, हार्मोन और पुनर्भरण क्रियाविधि",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-07",
        "chapterNumber": 7,
        "title": "How do Organisms Reproduce?",
        "titleKn": "ಜೀವಿಗಳು ಹೇಗೆ ಸಂತಾನೋತ್ಪತ್ತಿ ನಡೆಸುತ್ತವೆ?",
        "titleHi": "जीव जनन कैसे करते हैं?",
        "unit": "Unit II: World of Living",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚ",
        "unitHi": "इकाई २: सजीव जगत",
        "description": "Asexual Reproduction (Fission, Budding, Spore Formation, Regeneration, Fragmentation, Vegetative Propagation), Sexual Reproduction in Flowering Plants (Pollination, Fertilisation), Human Male & Female Reproductive Systems, Menstrual Cycle, Contraception & Reproductive Health.",
        "descriptionKn": "ಅಲೈಂಗಿಕ ಸಂತಾನೋತ್ಪತ್ತಿ ವಿಧಗಳು, ಸಸ್ಯಗಳಲ್ಲಿ ಲೈಂಗಿಕ ಸಂತಾನೋತ್ಪತ್ತಿ (ಪರಾಗಸ್ಪರ್ಶ, ನಿಷೇಚನ), ಮಾನವ ಸಂತಾನೋತ್ಪತ್ತಿ ಅಂಗವ್ಯೂಹಗಳು, ಸಂತಾನೋತ್ಪತ್ತಿ ಆರೋಗ್ಯ ಮತ್ತು ಗರ್ಭನಿರೋಧಕ ವಿಧಾನಗಳು.",
        "descriptionHi": "अलैंगिक जनन की विधियाँ (विखंडन, मुकुलन आदि), पुष्पी पौधों में लैंगिक जनन (परागण, निषेचन), मानव जनन तंत्र, ऋतुस्राव चक्र, गर्भनिरोधन विधियाँ व जनन स्वास्थ्य।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 10,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Pollen tube carries male gamete to ovule in ovary",
          "Zygote → Embryo → Seed; Ovary → Fruit",
          "Contraception: Barrier (Condom), Chemical (Oral pills), IUCD (Copper-T), Surgical (Vasectomy, Tubectomy)"
        ],
        "subtopics": [
          {
            "id": "s10-07-01",
            "title": "Asexual Modes: Binary/Multiple Fission, Budding, Spores, Vegetative Propagation",
            "titleKn": "ಅಲೈಂಗಿಕ ಸಂತಾನೋತ್ಪತ್ತಿಯ ವಿಧಾನಗಳು",
            "titleHi": "अलैंगिक जनन: विखंडन, मुकुलन, बीजाणु समासंघ, कायिक प्रवर्धन",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s10-07-02",
            "title": "Flower Structure, Pollination (Self & Cross) & Fertilisation in Plants",
            "titleKn": "ಹೂವಿನ ರಚನೆ, ಪರಾಗಸ್ಪರ್ಶ ಮತ್ತು ನಿಷೇಚನ",
            "titleHi": "पुष्प की संरचना, परागण और दोहरा निषेचन",
            "type": "Core Concept",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s10-07-03",
            "title": "Male & Female Human Reproductive Systems",
            "titleKn": "ಮಾನವ ಗಂಡು ಮತ್ತು ಹೆಣ್ಣು ಸಂತಾನೋತ್ಪತ್ತಿ ಅಂಗಗಳು",
            "titleHi": "मानव नर और मादा जनन तंत्र का नामांकित चित्र",
            "type": "Core Concept",
            "estimatedMinutes": 60,
            "isCompleted": false
          },
          {
            "id": "s10-07-04",
            "title": "Menstrual Cycle, Embryo Implantation & Placenta Role",
            "titleKn": "ಋತುಚಕ್ರ ಮತ್ತು ಪ್ಲಾಸೆಂಟಾದ ಕಾರ್ಯ",
            "titleHi": "ऋतुस्राव चक्र, भ्रूण विकास और प्लेसेंटा का कार्य",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s10-07-05",
            "title": "Reproductive Health, STDs & Contraceptive Methods",
            "titleKn": "ಸಂತಾನೋತ್ಪತ್ತಿ ಆರೋಗ್ಯ ಮತ್ತು ಗರ್ಭನಿರೋಧಕ ವಿಧಾನಗಳು",
            "titleHi": "जनन स्वास्थ्य, यौन संचारित रोग और गर्भनिरोधन के उपाय",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-08",
        "chapterNumber": 8,
        "title": "Heredity",
        "titleKn": "ಅನುವಂಶೀಯತೆ (Heredity)",
        "titleHi": "आनुवंशिकता (Heredity)",
        "unit": "Unit II: World of Living",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚ",
        "unitHi": "इकाई २: सजीव जगत",
        "description": "Mendel's Laws of Inheritance, Monohybrid Cross (3:1 Phenotype, 1:2:1 Genotype), Dihybrid Cross (9:3:3:1), Sex Determination in Humans (XX and XY Chromosomes).",
        "descriptionKn": "ಮೆಂಡಲ್‌ನ ಅನುವಂಶೀಯತೆಯ ನಿಯಮಗಳು, ಏಕತಳೀಕರಣ, ದ್ವಿತಳೀಕರಣ ಮತ್ತು ಮಾನವನಲ್ಲಿ ಲಿಂಗ ನಿರ್ಧಾರಣೆ.",
        "descriptionHi": "मेंडल के वंशागति नियम, एकसंकर संकरण (3:1, 1:2:1), द्विसंकर संकरण (9:3:3:1), मानव में लिंग निर्धारण (XX/XY)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Monohybrid Cross F2: Phenotypic ratio 3:1, Genotypic ratio 1:2:1",
          "Dihybrid Cross F2: 9:3:3:1",
          "Sex Determination: Father's sperm (X or Y) decides child's sex"
        ],
        "subtopics": [
          {
            "id": "s10-08-01",
            "title": "Accumulation of Variations & Heredity Basics",
            "titleKn": "ವ್ಯತ್ಯಾಸಗಳ ಸಂಗ್ರಹ ಮತ್ತು ಅನುವಂಶೀಯತೆ ಪರಿಚಯ",
            "titleHi": "विभिन्नताओं का संचयन और आनुवंशिकी की मूल बातें",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s10-08-02",
            "title": "Mendel's Experiments with Garden Pea (Pisum sativum) - Monohybrid Cross",
            "titleKn": "ಮೆಂಡಲನ ಏಕತಳೀಕರಣ ಪ್ರಯೋಗ",
            "titleHi": "मेंडल का एकसंकर संकरण और प्रभाविता का नियम",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s10-08-03",
            "title": "Dihybrid Cross & Law of Independent Assortment (9:3:3:1)",
            "titleKn": "ದ್ವಿತಳೀಕರಣ ಪ್ರಯೋಗ ಮತ್ತು ಫಲಿತಾಂಶಗಳು",
            "titleHi": "द्विसंकर संकरण और स्वतंत्र अपव्यूहन का नियम",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s10-08-04",
            "title": "Sex Determination Mechanism in Humans (XX & XY Chromosomes)",
            "titleKn": "ಮಾನವನಲ್ಲಿ ಲಿಂಗ ನಿರ್ಧಾರಣೆ ಪ್ರಕ್ರಿಯೆ",
            "titleHi": "मानव में लिंग निर्धारण की क्रियाविधि",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-09",
        "chapterNumber": 9,
        "title": "Light – Reflection and Refraction",
        "titleKn": "ಬೆಳಕು – ಪ್ರತಿಫಲನ ಮತ್ತು ವಕ್ರೀಭವನ",
        "titleHi": "प्रकाश – परावर्तन तथा अपवर्तन",
        "unit": "Unit III: Natural Phenomena",
        "unitKn": "ಘಟಕ ೩: ನೈಸರ್ಗಿಕ ವಿದ್ಯಮಾನಗಳು",
        "unitHi": "इकाई ३: प्राकृतिक घटनाएं (भौतिक विज्ञान)",
        "description": "Reflection at Spherical Surfaces, Concave & Convex Mirrors, Mirror Formula & Magnification, Refraction of Light, Refractive Index, Snell's Law, Lenses (Convex & Concave), Lens Formula & Power of a Lens.",
        "descriptionKn": "ಗೋಳೀಯ ದರ್ಪಣಗಳಲ್ಲಿ ಪ್ರತಿಫಲನ, ದರ್ಪಣ ಸೂತ್ರ, ಬೆಳಕಿನ ವಕ್ರೀಭವನ, ಸ್ನೆಲ್‌ನ ನಿಯಮ, ಮಸೂರ ಸೂತ್ರ ಮತ್ತು ಮಸೂರದ ಸಾಮರ್ಥ್ಯ.",
        "descriptionHi": "गोलीय दर्पणों द्वारा परावर्तन, दर्पण सूत्र और आवर्धन, प्रकाश का अपवर्तन, स्नेल का नियम, लेंस सूत्र और लेंस की क्षमता।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 12,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Mirror Formula: 1/f = 1/v + 1/u",
          "Magnification (Mirror): m = -v/u = h'/h",
          "Snell's Law: n = sin(i) / sin(r)",
          "Lens Formula: 1/f = 1/v - 1/u",
          "Power of Lens: P = 1/f (in meters), Unit = Dioptre (D)"
        ],
        "subtopics": [
          {
            "id": "s10-09-01",
            "title": "Laws of Reflection & Spherical Mirrors (Concave & Convex)",
            "titleKn": "ಪ್ರತಿಫಲನದ ನಿಯಮಗಳು ಮತ್ತು ಗೋಳೀಯ ದರ್ಪಣಗಳು",
            "titleHi": "परावर्तन के नियम और गोलीय दर्पण (अवतल व उत्तल)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s10-09-02",
            "title": "Ray Diagrams for Concave & Convex Mirrors",
            "titleKn": "ದರ್ಪಣಗಳ ಕಿರಣ ನಕ್ಷೆಗಳು",
            "titleHi": "दर्पणों द्वारा प्रतिबिम्ब बनने के किरण आरेख",
            "type": "Experiment & Practical",
            "estimatedMinutes": 60,
            "isCompleted": false
          },
          {
            "id": "s10-09-03",
            "title": "Sign Convention & Mirror Formula Numerical Problems",
            "titleKn": "ದರ್ಪಣ ಸೂತ್ರ ಮತ್ತು ಸಂಖ್ಯಾತ್ಮಕ ಲೆಕ್ಕಗಳು",
            "titleHi": "चिन्ह परिपाटी और दर्पण सूत्र पर आधारित आंकिक प्रश्न",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s10-09-04",
            "title": "Refraction of Light, Snell's Law & Refractive Index (Absolute/Relative)",
            "titleKn": "ವಕ್ರೀಭವನ, ಸ್ನೆಲ್‌ನ ನಿಯಮ ಮತ್ತು ವಕ್ರೀಭವನಾಂಕ",
            "titleHi": "प्रकाश का अपवर्तन, स्नेल का नियम और अपवर्तनांक",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s10-09-05",
            "title": "Ray Diagrams for Convex & Concave Lenses",
            "titleKn": "ಮಸೂರಗಳ ಕಿರಣ ನಕ್ಷೆಗಳು",
            "titleHi": "उत्तल और अवतल लेंस द्वारा प्रतिबिम्ब निर्माण",
            "type": "Experiment & Practical",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s10-09-06",
            "title": "Lens Formula, Magnification & Power of Lens (Dioptre)",
            "titleKn": "ಮಸೂರ ಸೂತ್ರ ಮತ್ತು ಮಸೂರದ ಸಾಮರ್ಥ್ಯ (ಡಯಾಪ್ಟರ್)",
            "titleHi": "लेंस सूत्र, आवर्धन और लेंस की क्षमता (डायोप्टर)",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-10",
        "chapterNumber": 10,
        "title": "The Human Eye and the Colourful World",
        "titleKn": "ಮಾನವನ ಕಣ್ಣು ಮತ್ತು ವರ್ಣಮಯ ಜಗತ್ತು",
        "titleHi": "मानव नेत्र तथा रंगबिरंगा संसार",
        "unit": "Unit III: Natural Phenomena",
        "unitKn": "ಘಟಕ ೩: ನೈಸರ್ಗಿಕ ವಿದ್ಯಮಾನಗಳು",
        "unitHi": "इकाई ३: प्राकृतिक घटनाएं (भौतिक विज्ञान)",
        "description": "Structure of Human Eye, Accommodation of Eye, Defects of Vision & Correction (Myopia, Hypermetropia, Presbyopia), Refraction through a Triangular Prism, Dispersion of White Light, Atmospheric Refraction (Twinkling of Stars, Advanced Sunrise & Delayed Sunset), Scattering of Light (Tyndall Effect, Blue Sky, Red Sunset).",
        "descriptionKn": "ಮಾನವ ಕಣ್ಣಿನ ರಚನೆ, ದೃಷ್ಟಿದೋಷಗಳು ಮತ್ತು ಪರಿಹಾರಗಳು (ಸಮೀಪದೃಷ್ಟಿ, ದೂರದೃಷ್ಟಿ), ಪ್ರಿಸಂನಲ್ಲಿ ಬೆಳಕಿನ ವಕ್ರೀಭವನ, ವರ್ಣವಿಭಜನೆ, ವಾತಾವರಣದ ವಕ್ರೀಭವನ ಮತ್ತು ಬೆಳಕಿನ ಚದುರುವಿಕೆ.",
        "descriptionHi": "मानव नेत्र की संरचना, समंजन क्षमता, दृष्टि दोष एवं उनका संशोधन (निकट दृष्टि, दूर दृष्टि, जरा दृष्टि), प्रिज्म द्वारा अपवर्तन, वर्ण विक्षेपण, वायुमंडलीय अपवर्तन, प्रकाश का प्रकीर्णन (टिंडल प्रभाव)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Near point of normal eye = 25 cm, Far point = Infinity",
          "Myopia: Corrected using Concave lens of suitable power",
          "Hypermetropia: Corrected using Convex lens",
          "Power of accommodating lens: P = 1/f"
        ],
        "subtopics": [
          {
            "id": "s10-10-01",
            "title": "Structure of Human Eye & Power of Accommodation",
            "titleKn": "ಮಾನವ ಕಣ್ಣಿನ ರಚನೆ ಮತ್ತು ಸಮಂಜನ ಸಾಮರ್ಥ್ಯ",
            "titleHi": "मानव नेत्र की संरचना और समंजन क्षमता",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s10-10-02",
            "title": "Defects of Vision (Myopia, Hypermetropia, Presbyopia) & Ray Diagram Corrections",
            "titleKn": "ದೃಷ್ಟಿ ದೋಷಗಳು ಮತ್ತು ಕಿರಣ ನಕ್ಷೆಯ ಪರಿಹಾರಗಳು",
            "titleHi": "दृष्टि दोष (निकट, दूर, जरा) और लेंस द्वारा उनका निवारण",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": false
          },
          {
            "id": "s10-10-03",
            "title": "Refraction of Light through Triangular Glass Prism & Dispersion (VIBGYOR, Rainbow)",
            "titleKn": "ಪ್ರಿಸಂನಲ್ಲಿ ಬೆಳಕಿನ ವರ್ಣವಿಭಜನೆ ಮತ್ತು ಕಾಮನಬಿಲ್ಲು",
            "titleHi": "प्रिज्म द्वारा श्वेत प्रकाश का विक्षेपण (VIBGYOR) और इंद्रधनुष",
            "type": "Experiment & Practical",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s10-10-04",
            "title": "Atmospheric Refraction (Twinkling Stars, Early Sunrise) & Scattering (Blue Sky)",
            "titleKn": "ವಾತಾವರಣದ ವಕ್ರೀಭವನ ಮತ್ತು ಬೆಳಕಿನ ಚದುರುವಿಕೆ",
            "titleHi": "वायुमंडलीय अपवर्तन (तारों का टिमटिमाना) और प्रकीर्णन (आकाश का नीला रंग)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-11",
        "chapterNumber": 11,
        "title": "Electricity",
        "titleKn": "ವಿದ್ಯುಚ್ಛಕ್ತಿ (Electricity)",
        "titleHi": "विद्युत (Electricity)",
        "unit": "Unit IV: Effects of Current",
        "unitKn": "ಘಟಕ ೪: ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ಪರಿಣಾಮಗಳು",
        "unitHi": "इकाई ४: विद्युत धारा के प्रभाव",
        "description": "Electric Current, Electric Potential and Potential Difference, Ohm's Law, Resistance, Factors on which Resistance Depends (Resistivity), Resistors in Series and Parallel, Heating Effect of Electric Current (Joule's Law), Electric Power & Commercial Unit of Electrical Energy (kWh).",
        "descriptionKn": "ವಿದ್ಯುತ್ ಪ್ರವಾಹ, ವಿಭವಾಂತರ, ಓಮ್‌ನ ನಿಯಮ, ರೋಧಶೀಲತೆ, ಸರಣಿ ಮತ್ತು ಸಮಾಂತರ ಜೋಡಣೆ, ಜೌಲ್‌ನ ನಿಯಮ ಮತ್ತು ವಿದ್ಯುತ್ ಸಾಮರ್ಥ್ಯ.",
        "descriptionHi": "विद्युत धारा, विभव व विभवांतर, ओम का नियम, प्रतिरोध व प्रतिरोधकता, श्रेणीक्रम व पार्श्वक्रम संयोजन, जूल का तापन नियम, विद्युत शक्ति व 1 kWh यूनिट।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 12,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Current: I = Q / t",
          "Ohm's Law: V = I × R",
          "Resistance: R = ρ × (l / A)",
          "Series: Rs = R1 + R2 + R3",
          "Parallel: 1/Rp = 1/R1 + 1/R2 + 1/R3",
          "Joule's Heating: H = I²Rt = VIt = (V²/R)t",
          "Power: P = VI = I²R = V²/R",
          "1 kWh = 3.6 × 10^6 Joules"
        ],
        "subtopics": [
          {
            "id": "s10-11-01",
            "title": "Electric Current, Ammeter, Electric Potential Difference & Voltmeter",
            "titleKn": "ವಿದ್ಯುತ್ ಪ್ರವಾಹ ಮತ್ತು ವಿಭವಾಂತರ",
            "titleHi": "विद्युत धारा, विभव, विभवांतर, एमीटर व वोल्टमीटर",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s10-11-02",
            "title": "Ohm's Law Verification & V-I Graph",
            "titleKn": "ಓಮ್‌ನ ನಿಯಮದ ಸಾಧನೆ & V-I ನಕ್ಷೆ",
            "titleHi": "ओम के नियम का प्रायोगिक सत्यापन और V-I ग्राफ",
            "type": "Experiment & Practical",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s10-11-03",
            "title": "Resistance, Factors Affecting Resistance & Resistivity (ρ)",
            "titleKn": "ರೋಧ ಮತ್ತು ರೋಧಶೀಲತೆಯ ಸೂತ್ರಗಳು",
            "titleHi": "प्रतिरोध को प्रभावित करने वाले कारक और प्रतिरोधकता",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s10-11-04",
            "title": "Resistors in Series & Parallel Combination Numericals",
            "titleKn": "ಸರಣಿ ಮತ್ತು ಸಮಾಂತರ ಜೋಡಣೆಯ ಸಂಖ್ಯಾತ್ಮಕ ಲೆಕ್ಕಗಳು",
            "titleHi": "प्रतिरोधकों का श्रेणीक्रम और पार्श्वक्रम संयोजन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 60,
            "isCompleted": false
          },
          {
            "id": "s10-11-05",
            "title": "Heating Effect of Electric Current (Joule's Law) & Electric Fuse",
            "titleKn": "ಜೌಲ್‌ನ ತಾಪನ ನಿಯಮ ಮತ್ತು ಫ್ಯೂಸ್",
            "titleHi": "विद्युत धारा का तापीय प्रभाव (जूल का नियम) और फ्यूज",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s10-11-06",
            "title": "Electric Power, Rating of Appliances & Commercial Unit (kWh) Cost Problems",
            "titleKn": "ವಿದ್ಯುತ್ ಸಾಮರ್ಥ್ಯ ಮತ್ತು ವಾಣಿಜ್ಯ ಯುನಿಟ್ ಲೆಕ್ಕಗಳು",
            "titleHi": "विद्युत शक्ति और बिजली बिल (kWh) की गणना",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-12",
        "chapterNumber": 12,
        "title": "Magnetic Effects of Electric Current",
        "titleKn": "ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ಕಾಂತೀಯ ಪರಿಣಾಮಗಳು",
        "titleHi": "विद्युत धारा के चुंबकीय प्रभाव",
        "unit": "Unit IV: Effects of Current",
        "unitKn": "ಘಟಕ ೪: ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ಪರಿಣಾಮಗಳು",
        "unitHi": "इकाई ४: विद्युत धारा के प्रभाव",
        "description": "Magnetic Field & Field Lines, Field due to a Current Carrying Conductor (Straight Wire, Circular Loop, Solenoid), Right Hand Thumb Rule, Force on a Current Carrying Conductor in Magnetic Field, Fleming's Left-Hand Rule, Domestic Electric Circuits (Live, Neutral, Earth wires, Short circuit, Overloading).",
        "descriptionKn": "ಕಾಂತಕ್ಷೇತ್ರದ ರೇಖೆಗಳು, ಸೋಲೆನಾಯ್ಡ್, ಬಲಗೈ ಹೆಬ್ಬೆರಳ ನಿಯಮ, ಫ್ಲೆಮಿಂಗ್‌ನ ಎಡಗೈ ನಿಯಮ ಮತ್ತು ಗೃಹ ವಿದ್ಯುತ್ ಮಂಡಲಗಳು.",
        "descriptionHi": "चुंबकीय क्षेत्र और क्षेत्र रेखाएं, सीधे चालक, वृत्ताकार पाश और परिनालिका का चुंबकीय क्षेत्र, फ्लेमिंग का वाम-हस्त नियम, घरेलू विद्युत परिपथ और भूसंपर्क।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Right-Hand Thumb Rule: Thumb = Current direction, Fingers = Magnetic field lines",
          "Fleming's Left-Hand Rule: Thumb = Force/Motion, Forefinger = Field, Middle = Current",
          "Domestic standard: 220V, 50Hz AC in India"
        ],
        "subtopics": [
          {
            "id": "s10-12-01",
            "title": "Magnetic Field & Properties of Magnetic Field Lines",
            "titleKn": "ಕಾಂತಕ್ಷೇತ್ರ ಮತ್ತು ಕಾಂತರೇಖೆಗಳ ಗುಣಲಕ್ಷಣಗಳು",
            "titleHi": "चुंबकीय क्षेत्र रेखाओं के गुणधर्म",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s10-12-02",
            "title": "Right-Hand Thumb Rule & Field due to Solenoid",
            "titleKn": "ಬಲಗೈ ಹೆಬ್ಬೆರಳ ನಿಯಮ & ಸೋಲೆನಾಯ್ಡ್ ಕಾಂತಕ್ಷೇತ್ರ",
            "titleHi": "दाहिने हाथ के अंगूठे का नियम और परिनालिका",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s10-12-03",
            "title": "Force on Current Conductor & Fleming's Left-Hand Rule",
            "titleKn": "ಫ್ಲೆಮಿಂಗ್‌ನ ಎಡಗೈ ನಿಯಮ ಮತ್ತು ಬಲ",
            "titleHi": "चुंबकीय क्षेत्र में धारावाही चालक पर बल और फ्लेमिंग का वामहस्त नियम",
            "type": "Core Concept",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s10-12-04",
            "title": "Domestic Electric Circuits: Earth Wire, Overloading, Short-Circuit & Safety",
            "titleKn": "ಗೃಹ ವಿದ್ಯುತ್ ಮಂಡಲ ಮತ್ತು ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು",
            "titleHi": "घरेलू विद्युत परिपथ, भूसंपर्क तार, लघुपथन और अतिभारण",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s10-13",
        "chapterNumber": 13,
        "title": "Our Environment",
        "titleKn": "ನಮ್ಮ ಪರಿಸರ (Our Environment)",
        "titleHi": "हमारा पर्यावरण (Our Environment)",
        "unit": "Unit V: Natural Resources",
        "unitKn": "ಘಟಕ ೫: ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು",
        "unitHi": "इकाई ۵: प्राकृतिक संसाधन (पर्यावरण)",
        "description": "Ecosystem Components (Biotic & Abiotic), Food Chains and Food Webs, Trophic Levels, 10% Energy Transfer Law, Biological Magnification, Ozone Layer Depletion & Waste Management (Biodegradable & Non-biodegradable).",
        "descriptionKn": "ಪರಿಸರ ವ್ಯವಸ್ಥೆ, ಆಹಾರ ಸರಪಳಿ, ಪೋಷಣಾ ಸ್ತರಗಳು, ೧೦% ಶಕ್ತಿ ವರ್ಗಾವಣೆ ನಿಯಮ, ಜೈವಿಕ ವರ್ಧನೆ, ಓಜೋನ್ ಸವಕಳಿ ಮತ್ತು ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ.",
        "descriptionHi": "पारितंत्र के घटक, खाद्य श्रृंखला और खाद्य जाल, 10% ऊर्जा का नियम, जैव आवर्धन, ओजोन परत का क्षय और कचरा प्रबंधन।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 6,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Lindeman's 10% Law: Only 10% of energy is transferred to the next trophic level",
          "Ozone Reaction: O2 + UV → O + O; O + O2 → O3",
          "CFCs cause ozone depletion"
        ],
        "subtopics": [
          {
            "id": "s10-13-01",
            "title": "Ecosystem Components (Biotic & Abiotic) & Trophic Levels",
            "titleKn": "ಪರಿಸರ ವ್ಯವಸ್ಥೆಯ ಘಟಕಗಳು ಮತ್ತು ಪೋಷಣಾ ಸ್ತರಗಳು",
            "titleHi": "पारितंत्र के जैविक और अजैविक घटक तथा पोषी स्तर",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s10-13-02",
            "title": "Food Chains, Food Webs & 10% Energy Flow Law",
            "titleKn": "ಆಹಾರ ಸರಪಳಿ ಮತ್ತು ೧೦% ಶಕ್ತಿ ನಿಯಮ",
            "titleHi": "खाद्य श्रृंखला, खाद्य जाल और 10% ऊर्जा स्थानांतरण नियम",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s10-13-03",
            "title": "Biological Magnification of Toxic Chemicals (Pesticides)",
            "titleKn": "ಜೈವಿಕ ವರ್ಧನೆ ಪರಿಕಲ್ಪನೆ",
            "titleHi": "जैव आवर्धन (कीटनाशकों का संचयन)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s10-13-04",
            "title": "Ozone Layer Formation, CFC Depletion & Solid Waste Disposal",
            "titleKn": "ಓಜೋನ್ ಪದರದ ಸವಕಳಿ & ತ್ಯಾಜ್ಯ ನಿರ್ವಹಣೆ",
            "titleHi": "ओजोन परत का क्षरण (CFCs) और ठोस कचरा प्रबंधन",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c10-sst",
    "name": "Social Studies",
    "nameKn": "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Science)",
    "nameHi": "सामाजिक विज्ञान (Social Science)",
    "classGrade": "Class 10",
    "icon": "Globe",
    "color": "#d97706",
    "badgeBg": "bg-amber-50 text-amber-800 border-amber-200",
    "borderColor": "border-amber-500",
    "chapters": [
      {
        "id": "sst10-01",
        "chapterNumber": 1,
        "title": "The Rise of Nationalism in Europe",
        "titleKn": "ಯುರೋಪ್‌ನಲ್ಲಿ ರಾಷ್ಟ್ರೀಯತೆಯ ಉದಯ (History)",
        "titleHi": "यूरोप में राष्ट्रवाद का उदय (History)",
        "unit": "Unit I: India & Contemporary World - II (History)",
        "unitKn": "ಘಟಕ ೧: ಭಾರತ ಮತ್ತು ಸಮಕಾಲೀನ ಜಗತ್ತು - ೨ (ಇತಿಹಾಸ)",
        "unitHi": "इकाई १: भारत और समकालीन विश्व - २ (इतिहास)",
        "description": "Frederic Sorrieu's Vision, The French Revolution and the Idea of the Nation, The Making of Nationalism in Europe, The Age of Revolutions: 1830-1848, Unification of Germany & Italy, Visualising the Nation.",
        "descriptionKn": "ಫ್ರೆಡ್ರಿಕ್ ಸೋರಿಯೊ ಚಿತ್ರಣ, ಫ್ರೆಂಚ್ ಕ್ರಾಂತಿ, ಜರ್ಮನಿ ಮತ್ತು ಇಟಲಿಯ ಏಕೀಕರಣ, ರಾಷ್ಟ್ರದ ದೃಶ್ಯೀಕರಣ.",
        "descriptionHi": "फ्रेडरिक सॉरयू की कल्पना, फ्रांसीसी क्रांति और राष्ट्र का विचार, जर्मनी और इटली का एकीकरण, राष्ट्र की दृश्य-कल्पना।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Key Treaties: Treaty of Vienna (1815), Treaty of Constantinople (1832 - Greek Independence)",
          "Key Leaders: Giuseppe Mazzini, Count Cavour, Giuseppe Garibaldi, Otto von Bismarck"
        ],
        "subtopics": [
          {
            "id": "sst10-01-01",
            "title": "The French Revolution & Civil Code of 1804 (Napoleonic Code)",
            "titleKn": "ಫ್ರೆಂಚ್ ಕ್ರಾಂತಿ ಮತ್ತು ನೆಪೋಲಿಯನ್ ಸಂಹಿತೆ ೧೮೦೪",
            "titleHi": "फ्रांसीसी क्रांति और 1804 की नागरिक संहिता (नेपोलियन संहिता)",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst10-01-02",
            "title": "Liberal Nationalism, Zollverein Customs Union & 1815 Conservatism",
            "titleKn": "ಉದಾರವಾದಿ ರಾಷ್ಟ್ರೀಯತೆ ಮತ್ತು ಜೊಲ್ವೆರಿನ್",
            "titleHi": "उदारवादी राष्ट्रवाद, ज़ोल्वेराइन और 1815 की विएना संधि",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst10-01-03",
            "title": "Unification of Germany (Bismarck) & Unification of Italy (Cavour, Garibaldi)",
            "titleKn": "ಜರ್ಮನಿ ಮತ್ತು ಇಟಲಿಯ ಏಕೀಕರಣ ಪ್ರಕ್ರಿಯೆ",
            "titleHi": "जर्मनी और इटली का एकीकरण",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "sst10-01-04",
            "title": "Visualising the Nation: Allegories (Marianne & Germania) and Balkans Crisis",
            "titleKn": "ರಾಷ್ಟ್ರದ ದೃಶ್ಯೀಕರಣ & ಬಾಲ್ಕನ್ಸ್ ಬಿಕ್ಕಟ್ಟು",
            "titleHi": "राष्ट्र का रूपक (मारियान व जर्मेनिया) और बाल्कन संकट",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst10-02",
        "chapterNumber": 2,
        "title": "Nationalism in India",
        "titleKn": "ಭಾರತದಲ್ಲಿ ರಾಷ್ಟ್ರೀಯತೆ (History)",
        "titleHi": "भारत में राष्ट्रवाद (History)",
        "unit": "Unit I: India & Contemporary World - II (History)",
        "unitKn": "ಘಟಕ ೧: ಭಾರತ ಮತ್ತು ಸಮಕಾಲೀನ ಜಗತ್ತು - ೨ (ಇತಿಹಾಸ)",
        "unitHi": "इकाई १: भारत और समकालीन विश्व - २ (इतिहास)",
        "description": "First World War, Khilafat and Non-Cooperation Movement, Differing Strands within the Movement (Towns, Countryside, Tribal Rebellion, Plantations), Towards Civil Disobedience (Salt March, Round Table Conferences), The Sense of Collective Belonging.",
        "descriptionKn": "ಮೊದಲ ಮಹಾಯುದ್ಧ, ಖಿಲಾಫತ್ ಮತ್ತು ಅಸಹಕಾರ ಚಳವಳಿ, ಉಪ್ಪಿನ ಸತ್ಯಾಗ್ರಹ, ಕಾನೂನು ಭಂಗ ಚಳವಳಿ, ಸಾಮೂಹಿಕ ಬಾಂಧವ್ಯದ ಭಾವನೆ.",
        "descriptionHi": "प्रथम विश्व युद्ध, खिलाफत और असहयोग आंदोलन, सविनय अवज्ञा आंदोलन (दांडी मार्च), गोलमेज सम्मेलन, सामूहिक अपनेपन का भाव।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 9,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Key Dates: Champaran Satyagraha (1917), Rowlatt Act & Jallianwala Bagh (1919), Chauri Chaura (1922), Dandi Salt March (1930), Gandhi-Irwin Pact (1931), Poona Pact (1932)"
        ],
        "subtopics": [
          {
            "id": "sst10-02-01",
            "title": "Gandhian Satyagraha (Champaran, Kheda, Ahmedabad) & Rowlatt Act 1919",
            "titleKn": "ಗಾಂಧಿ ಸತ್ಯಾಗ್ರಹಗಳು & ರೌಲತ್ ಕಾಯ್ದೆ",
            "titleHi": "सत्याग्रह का विचार, रौलट एक्ट और जलियांवाला बाग हत्याकांड",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst10-02-02",
            "title": "Non-Cooperation-Khilafat Movement & Strands in Towns, Countryside, Assam",
            "titleKn": "ಅಸಹಕಾರ ಚಳವಳಿ ಮತ್ತು ವಿವಿಧ ಹಂತಗಳು",
            "titleHi": "असहयोग आंदोलन का प्रसार (शहर, गांव, आदिवासी और बागान)",
            "type": "Core Concept",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "sst10-02-03",
            "title": "Salt March (Dandi March) & Civil Disobedience Movement",
            "titleKn": "ಉಪ್ಪಿನ ಸತ್ಯಾಗ್ರಹ ಮತ್ತು ದಂಡಿ ಯಾತ್ರೆ",
            "titleHi": "नमक यात्रा (दांडी मार्च) और सविनय अवज्ञा आंदोलन",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": true
          },
          {
            "id": "sst10-02-04",
            "title": "Limits of Civil Disobedience, Poona Pact & Collective Belonging (Bharat Mata)",
            "titleKn": "ಪೂನಾ ಒಪ್ಪಂದ ಮತ್ತು ಭಾರತ ಮಾತೆ ಚಿತ್ರಣ",
            "titleHi": "दलित भागीदारी, पूना पैक्ट और सामूहिक अपनेपन का भाव",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst10-03",
        "chapterNumber": 3,
        "title": "The Making of a Global World",
        "titleKn": "ಜಾಗತಿಕ ಜಗತ್ತಿನ ನಿರ್ಮಾಣ (History)",
        "titleHi": "भूमंडलीकृत विश्व का बनना (History)",
        "unit": "Unit I: India & Contemporary World - II (History)",
        "unitKn": "ಘಟಕ ೧: ಭಾರತ ಮತ್ತು ಸಮಕಾಲೀನ ಜಗತ್ತು - ೨ (ಇತಿಹಾಸ)",
        "unitHi": "इकाई १: भारत और समकालीन विश्व - २ (इतिहास)",
        "description": "Pre-modern World, Silk Routes, Food Travels (Spaghetti and Potato), Conquest, Disease and Trade (Smallpox in Americas), 19th Century World Economy, Indentured Labour Migration, The Great Depression 1929, Bretton Woods Institutions (IMF & World Bank).",
        "descriptionKn": "ಪೂರ್ವ-ಆಧುನಿಕ ಜಗತ್ತು, ರೇಷ್ಮೆ ಮಾರ್ಗಗಳು, ಆಹಾರ ಸಂಚಾರ, ೧೯ ನೇ ಶತಮಾನದ ಆರ್ಥಿಕತೆ, ಮಹಾ ಆರ್ಥಿಕ ಕುಸಿತ ೧೯೨೯, ಬ್ರೆಟನ್ ವುಡ್ಸ್ ಸಂಸ್ಥೆಗಳು.",
        "descriptionHi": "रेशम मार्ग (सिल्क रूट), भोजन की यात्रा, 19वीं सदी का वैश्विक व्यापार, अनुबंधित श्रमिक, 1929 की महामंदी, ब्रेटन वुड्स संस्थान (IMF और विश्व बैंक)।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 6,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Key Concepts: Silk Routes link Asia to Europe/Africa, Rinderpest plague in Africa, Bretton Woods twins = IMF & World Bank"
        ],
        "subtopics": [
          {
            "id": "sst10-03-01",
            "title": "Silk Routes Linking the World & Food Travels",
            "titleKn": "ರೇಷ್ಮೆ ಮಾರ್ಗಗಳು ಮತ್ತು ಆಹಾರ ಸಂಚಾರ",
            "titleHi": "सिल्क रूट और भोजन की वैश्विक यात्रा (आलू, नूडल्स)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst10-03-02",
            "title": "Conquest, Disease & 19th Century Global Indentured Labour",
            "titleKn": "ವಸಾಹತುಶಾಹಿ ಮತ್ತು ಗಿರ್ಮಿಟಿಯಾ ಕಾರ್ಮಿಕರು",
            "titleHi": "उपनिवेशवाद, चेचक का प्रभाव और गिरमिटिया मजदूर",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst10-03-03",
            "title": "The Great Depression (1929) Causes and Impact on India",
            "titleKn": "೧೯೨೯ ರ ಮಹಾ ಆರ್ಥಿಕ ಕುಸಿತ ಮತ್ತು ಭಾರತದ ಮೇಲೆ ಪರಿಣಾಮ",
            "titleHi": "1929 की महामंदी के कारण और भारत पर उसका प्रभाव",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "sst10-03-04",
            "title": "Post-War Settlement & Bretton Woods Institutions (IMF & IBRD)",
            "titleKn": "ಬ್ರೆಟನ್ ವುಡ್ಸ್ ಸಂಸ್ಥೆಗಳು (IMF ಮತ್ತು ವಿಶ್ವ ಬ್ಯಾಂಕ್)",
            "titleHi": "युद्धोत्तर पुनर्निर्माण और ब्रेटन वुड्स जुड़वां संस्थाएं",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "sst10-04",
        "chapterNumber": 4,
        "title": "Resources and Development",
        "titleKn": "ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಅಭಿವೃದ್ಧಿ (Geography)",
        "titleHi": "संसाधन एवं विकास (Geography)",
        "unit": "Unit II: Contemporary India - II (Geography)",
        "unitKn": "ಘಟಕ ೨: ಸಮಕಾಲೀನ ಭಾರತ - ೨ (ಭೂಗೋಳ)",
        "unitHi": "इकाई २: समकालीन भारत - २ (भूगोल)",
        "description": "Concept of Resources, Classification of Resources, Development of Resources, Sustainable Development, Agenda 21, Resource Planning in India, Land Resources, Land Use Pattern in India, Land Degradation & Conservation, Soil as a Resource (Alluvial, Black, Red & Yellow, Laterite, Arid, Forest soils), Soil Erosion & Soil Conservation.",
        "descriptionKn": "ಸಂಪನ್ಮೂಲಗಳ ವರ್ಗೀಕರಣ, ಸುಸ್ಥಿರ ಅಭಿವೃದ್ಧಿ, ಅಜೆಂಡಾ ೨೧, ಭಾರತದಲ್ಲಿ ಸಂಪನ್ಮೂಲ ಯೋಜನೆ, ಭೂಬಳಕೆ ಮಾದರಿ, ಮಣ್ಣಿನ ವಿಧಗಳು ಮತ್ತು ಸಂರಕ್ಷಣೆ.",
        "descriptionHi": "संसाधनों का वर्गीकरण, सतत पोषणीय विकास, एजेंडा 21, भारत में संसाधन नियोजन, भू-उपयोग प्रारूप, मृदा के प्रकार (जलोढ़, काली, लाल, लैटेराइट आदि) और मृदा संरक्षण।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Sustainable Development: Rio de Janeiro Earth Summit 1992 & Agenda 21",
          "Soil Types: Alluvial (Northern plains), Black/Regur (Deccan lava/Cotton), Laterite (Leaching/Coffee-Tea)"
        ],
        "subtopics": [
          {
            "id": "sst10-04-01",
            "title": "Classification of Resources & Sustainable Development (Agenda 21)",
            "titleKn": "ಸಂಪನ್ಮೂಲಗಳ ವರ್ಗೀಕರಣ ಮತ್ತು ಅಜೆಂಡಾ ೨೧",
            "titleHi": "संसाधनों का वर्गीकरण और सतत पोषणीय विकास (एजेंडा 21)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst10-04-02",
            "title": "Resource Planning in India & Conservation of Resources",
            "titleKn": "ಭಾರತದಲ್ಲಿ ಸಂಪನ್ಮೂಲ ಯೋಜನೆ",
            "titleHi": "भारत में संसाधन नियोजन की आवश्यकता",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst10-04-03",
            "title": "Land Use Pattern in India & Causes of Land Degradation",
            "titleKn": "ಭಾರತದ ಭೂಬಳಕೆ ಮಾದರಿ & ಭೂಸವಕಳಿ",
            "titleHi": "भारत का भू-उपयोग प्रारूप और भू-निम्नीकरण के कारण",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst10-04-04",
            "title": "Soil Types of India (Alluvial, Black, Laterite, Arid) & Soil Erosion",
            "titleKn": "ಮಣ್ಣಿನ ವಿಧಗಳು ಮತ್ತು ಮಣ್ಣಿನ ಸಂರಕ್ಷಣಾ ಕ್ರಮಗಳು",
            "titleHi": "भारत की प्रमुख मृदाएं, मृदा अपरदन और संरक्षण के उपाय",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst10-05",
        "chapterNumber": 5,
        "title": "Forest and Wildlife Resources",
        "titleKn": "ಅರಣ್ಯ ಮತ್ತು ವನ್ಯಜೀವಿ ಸಂಪನ್ಮೂಲಗಳು (Geography)",
        "titleHi": "वन एवं वन्यजीव संसाधन (Geography)",
        "unit": "Unit II: Contemporary India - II (Geography)",
        "unitKn": "ಘಟಕ ೨: ಸಮಕಾಲೀನ ಭಾರತ - ೨ (ಭೂಗೋಳ)",
        "unitHi": "इकाई २: समकालीन भारत - २ (भूगोल)",
        "description": "Flora and Fauna in India, IUCN Classification of Species (Normal, Endangered, Vulnerable, Rare, Endemic, Extinct), Causes of Depletion of Flora and Fauna, Conservation of Forest and Wildlife in India (Indian Wildlife Protection Act 1972, Project Tiger), Types and Distribution of Forests (Reserved, Protected, Unclassed), Community and Conservation (Chipko Movement, Beej Bachao Andolan, JFM).",
        "descriptionKn": "ಭಾರತದಲ್ಲಿ ಸಸ್ಯ ಮತ್ತು ಪ್ರಾಣಿ ಸಂಕುಲ, IUCN ವರ್ಗೀಕರಣ, ಅರಣ್ಯ ಸಂರಕ್ಷಣೆ ಕಾಯ್ದೆ ೧೯೭೨, ಪ್ರಾಜೆಕ್ಟ್ ಟೈಗರ್, ಚಿಪ್ಕೋ ಚಳವಳಿ, ಜೆಎಫ್‌ಎಂ.",
        "descriptionHi": "IUCN प्रजातियों का वर्गीकरण (संकटग्रस्त, सुभेद्य, दुर्लभ आदि), वन्यजीव संरक्षण अधिनियम 1972, प्रोजेक्ट टाइगर, वनों का वर्गीकरण (आरक्षित, रक्षित, अवर्गीकृत), चिपको आंदोलन व JFM।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 5,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "IUCN categories: Endangered, Vulnerable, Rare, Endemic, Extinct",
          "Wildlife Act: 1972; Project Tiger: 1973; JFM: Joint Forest Management (Odisha 1988)"
        ],
        "subtopics": [
          {
            "id": "sst10-05-01",
            "title": "Flora & Fauna Biodiversity & IUCN Species Classification",
            "titleKn": "ಜೀವವೈವಿಧ್ಯ ಮತ್ತು IUCN ಪ್ರಭೇದಗಳ ವರ್ಗೀಕರಣ",
            "titleHi": "जैव विविधता और IUCN की प्रजाति श्रेणियां",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "sst10-05-02",
            "title": "Conservation Projects: Wildlife Protection Act 1972 & Project Tiger",
            "titleKn": "ವನ್ಯಜೀವಿ ಸಂರಕ್ಷಣೆ ಕಾಯ್ದೆ ೧೯೭೨ & ಪ್ರಾಜೆಕ್ಟ್ ಟೈಗರ್",
            "titleHi": "वन्यजीव संरक्षण अधिनियम 1972 और प्रोजेक्ट टाइगर",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "sst10-05-03",
            "title": "Forest Classification (Reserved, Protected, Unclassed Forests)",
            "titleKn": "ಅರಣ್ಯಗಳ ವರ್ಗೀಕರಣ (ಮೀಸಲು, ರಕ್ಷಿತ, ವರ್ಗೀಕರಿಸದ)",
            "titleHi": "वनों के प्रशासनिक प्रकार (आरक्षित, रक्षित, अवर्गीकृत वन)",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": false
          },
          {
            "id": "sst10-05-04",
            "title": "Community Conservation: Chipko Movement, Beej Bachao & JFM",
            "titleKn": "ಸಮುದಾಯ ಸಂರಕ್ಷಣೆ: ಚಿಪ್ಕೋ ಚಳವಳಿ ಮತ್ತು ಜೆಎಫ್‌ಎಂ",
            "titleHi": "समुदाय और वन संरक्षण: चिपको आंदोलन, बीज बचाओ और JFM",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "sst10-06",
        "chapterNumber": 6,
        "title": "Agriculture",
        "titleKn": "ಕೃಷಿ (Agriculture - Geography)",
        "titleHi": "कृषि (Agriculture - Geography)",
        "unit": "Unit II: Contemporary India - II (Geography)",
        "unitKn": "ಘಟಕ ೨: ಸಮಕಾಲೀನ ಭಾರತ - ೨ (ಭೂಗೋಳ)",
        "unitHi": "इकाई २: समकालीन भारत - २ (भूगोल)",
        "description": "Types of Farming (Primitive Subsistence / Jhumming, Intensive Subsistence, Commercial Farming / Plantation), Cropping Pattern (Rabi, Kharif, Zaid), Major Crops (Rice, Wheat, Millets, Pulses, Sugarcane, Oilseeds, Tea, Coffee, Cotton, Jute), Technological and Institutional Reforms (Green Revolution, White Revolution, KCC, PAIS), Food Security.",
        "descriptionKn": "ಕೃಷಿ ವಿಧಗಳು, ಬೆಳೆಗಳ ಋತುಮಾನಗಳು (ಖಾರಿಫ್, ರಬಿ, ಜೈದ್), ಪ್ರಮುಖ ಬೆಳೆಗಳು (ಭತ್ತ, ಗೋಧಿ, ಹತ್ತಿ, ಚಹಾ), ತಾಂತ್ರಿಕ ಮತ್ತು ಸಾಂಸ್ಥಿಕ ಸುಧಾರಣೆಗಳು.",
        "descriptionHi": "कृषि के प्रकार (प्रारंभिक जीविका, गहन जीविका, वाणिज्यिक कृषि), शस्य प्रारूप (रबी, खरीफ, जायद), मुख्य फसलें (चावल, गेहूं, चाय, कपास), संस्थागत व तकनीकी सुधार (हरित क्रांति)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Cropping Seasons: Kharif (Monsoon: Rice, Maize), Rabi (Winter: Wheat, Mustard), Zaid (Summer: Watermelon)",
          "Tea: Warm, moist frost-free climate, deep fertile well-drained soil",
          "Cotton: Black soil, 210 frost-free days, bright sunshine"
        ],
        "subtopics": [
          {
            "id": "sst10-06-01",
            "title": "Types of Farming: Primitive Subsistence, Intensive Subsistence & Commercial",
            "titleKn": "ಕೃಷಿ ಪದ್ಧತಿಗಳು ಮತ್ತು ತೋಟಗಾರಿಕೆ ಕೃಷಿ",
            "titleHi": "कृषि के प्रकार: प्रारंभिक, गहन जीविका और रोपण कृषि",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst10-06-02",
            "title": "Cropping Seasons: Rabi, Kharif and Zaid Comparison",
            "titleKn": "ರಬಿ, ಖಾರಿಫ್ ಮತ್ತು ಜೈದ್ ಬೆಳೆಗಳ ಋತುಗಳು",
            "titleHi": "शस्य प्रारूप: रबी, खरीफ और जायद ऋतुओं की तुलना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst10-06-03",
            "title": "Major Food Crops & Cash Crops (Rice, Wheat, Millets, Tea, Coffee, Cotton)",
            "titleKn": "ಪ್ರಮುಖ ಆಹಾರ ಮತ್ತು ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು",
            "titleHi": "प्रमुख फसलें (चावल, गेहूं, गन्ना, चाय, कपास) और भौगोलिक दशाएं",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst10-06-04",
            "title": "Technological & Institutional Reforms (Green Revolution, MSP, KCC)",
            "titleKn": "ಕೃಷಿ ಸುಧಾರಣೆಗಳು ಮತ್ತು ಕಿಸಾನ್ ಕ್ರೆಡಿಟ್ ಕಾರ್ಡ್",
            "titleHi": "कृषि में संस्थागत और तकनीकी सुधार (MSP, KCC, हरित क्रांति)",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst10-07",
        "chapterNumber": 7,
        "title": "Power Sharing",
        "titleKn": "ಅಧಿಕಾರ ಹಂಚಿಕೆ (Civics)",
        "titleHi": "सत्ता की साझेदारी (Civics)",
        "unit": "Unit III: Democratic Politics - II (Civics)",
        "unitKn": "ಘಟಕ ೩: ಪ್ರಜಾಪ್ರಭುತ್ವದ ರಾಜಕೀಯ - ೨ (ಪೌರನೀತಿ)",
        "unitHi": "इकाई ३: लोकतांत्रिक राजनीति - २ (नागरिक शास्त्र)",
        "description": "Case Studies of Belgium and Sri Lanka, Ethnic Composition, Majoritarianism in Sri Lanka, Accommodation in Belgium, Why Power Sharing is Desirable (Prudential vs Moral Reasons), Forms of Power Sharing (Horizontal, Vertical, Social Groups, Political Parties & Pressure Groups).",
        "descriptionKn": "ಬೆಲ್ಜಿಯಂ ಮತ್ತು ಶ್ರೀಲಂಕಾದ ಉದಾಹರಣೆಗಳು, ಅಧಿಕಾರ ಹಂಚಿಕೆಯ ಪ್ರಾಮುಖ್ಯತೆ, ಅಧಿಕಾರ ಹಂಚಿಕೆಯ ವಿವಿಧ ರೂಪಗಳು.",
        "descriptionHi": "बेल्जियम और श्रीलंका की जातीय बुनावट, श्रीलंका में बहुसंख्यकवाद, बेल्जियम की समझदारी, सत्ता की साझेदारी के रूप (क्षैतिज व ऊर्ध्वाधर)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 6,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Horizontal Division: Legislature, Executive, Judiciary (Checks & Balances)",
          "Vertical Division: Union Government, State Government, Local Self-Government",
          "Sri Lanka Majoritarian Act: 1956 (Sinhala only)"
        ],
        "subtopics": [
          {
            "id": "sst10-07-01",
            "title": "Ethnic Composition of Belgium & Sri Lanka",
            "titleKn": "ಬೆಲ್ಜಿಯಂ ಮತ್ತು ಶ್ರೀಲಂಕಾದ ಜನಾಂಗೀಯ ಸಂಯೋಜನೆ",
            "titleHi": "बेल्जियम और श्रीलंका की जातीय संरचना की तुलना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst10-07-02",
            "title": "Majoritarianism in Sri Lanka vs Accommodation in Belgium",
            "titleKn": "ಶ್ರೀಲಂಕಾದ ಬಹುಸಂಖ್ಯಾತವಾದ vs ಬೆಲ್ಜಿಯಂ ಮಾದರಿ",
            "titleHi": "श्रीलंका में बहुसंख्यकवाद और बेल्जियम का समझदारी मॉडल",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst10-07-03",
            "title": "Prudential vs Moral Reasons for Power Sharing",
            "titleKn": "ಅಧಿಕಾರ ಹಂಚಿಕೆಯ ವಿವೇಕಯುತ ಮತ್ತು ನೈತಿಕ ಕಾರಣಗಳು",
            "titleHi": "सत्ता की साझेदारी के युक्तिपरक और नैतिक तर्क",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst10-07-04",
            "title": "Forms of Power Sharing (Horizontal, Vertical, Community, Pressure Groups)",
            "titleKn": "ಅಧಿಕಾರ ಹಂಚಿಕೆಯ ನಾಲ್ಕು ಪ್ರಮುಖ ರೂಪಗಳು",
            "titleHi": "सत्ता की साझेदारी के विभिन्न रूप (क्षैतिज, ऊर्ध्वाधर आदि)",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst10-08",
        "chapterNumber": 8,
        "title": "Federalism",
        "titleKn": "ಫೆಡರಲಿಸಂ / ಒಕ್ಕೂಟ ವ್ಯವಸ್ಥೆ (Civics)",
        "titleHi": "संघवाद (Federalism - Civics)",
        "unit": "Unit III: Democratic Politics - II (Civics)",
        "unitKn": "ಘಟಕ ೩: ಪ್ರಜಾಪ್ರಭುತ್ವದ ರಾಜಕೀಯ - ೨ (ಪೌರನೀತಿ)",
        "unitHi": "इकाई ३: लोकतांत्रिक राजनीति - २ (नागरिक शास्त्र)",
        "description": "What is Federalism?, Unitary vs Federal Government, Key Features of Federalism, Coming Together vs Holding Together Federations, What Makes India a Federal Country? (Union List, State List, Concurrent List, Residuary Subjects), How is Federalism Practised? (Linguistic States, Language Policy, Centre-State Relations), Decentralisation in India (73rd and 74th Constitutional Amendments 1992).",
        "descriptionKn": "ಒಕ್ಕೂಟ ವ್ಯವಸ್ಥೆಯ ಲಕ್ಷಣಗಳು, ಭಾರತದ ಒಕ್ಕೂಟ ಪದ್ಧತಿ (ಕೇಂದ್ರ, ರಾಜ್ಯ, ಸಮವರ್ತಿ ಪಟ್ಟಿಗಳು), ಭಾಷಾ ನೀತಿ ಮತ್ತು ೧೯೯೨ ರ ವಿಕೇಂದ್ರೀಕರಣ.",
        "descriptionHi": "संघवाद की विशेषताएं, एकात्मक बनाम संघीय सरकार, भारत में त्रिस्तरीय व्यवस्था (संघ सूची, राज्य सूची, समवर्ती सूची), भाषाई राज्य, 1992 का विकेंद्रीकरण (पंचायती राज)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "3 Lists: Union List (97+ subjects - Defence, Foreign), State List (66 subjects - Police, Agriculture), Concurrent List (47 subjects - Education, Forests)",
          "1992 Constitutional Amendment: Mandatory regular local elections, 1/3 reservation for women, State Finance/Election Commissions"
        ],
        "subtopics": [
          {
            "id": "sst10-08-01",
            "title": "Federalism Definition, Key Features & Federal vs Unitary Systems",
            "titleKn": "ಒಕ್ಕೂಟ ವ್ಯವಸ್ಥೆಯ ಮುಖ್ಯ ಲಕ್ಷಣಗಳು",
            "titleHi": "संघवाद की परिभाषा, मुख्य विशेषताएं और एकात्मक व्यवस्था से अंतर",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst10-08-02",
            "title": "'Coming Together' vs 'Holding Together' Federations (USA vs India)",
            "titleKn": "ಒಕ್ಕೂಟಗಳ ವಿಧಗಳು (Coming Together vs Holding Together)",
            "titleHi": "साथ आकर संघ बनाना और सबको साथ लेकर संघ बनाना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst10-08-03",
            "title": "Three-fold Distribution of Legislative Powers (Union, State, Concurrent Lists)",
            "titleKn": "ಶಾಸಕಾಂಗ ಅಧಿಕಾರಗಳ ಮೂರು ಪಟ್ಟಿಗಳು",
            "titleHi": "विधायी शक्तियों का त्रिपक्षीय वितरण (संघ, राज्य, समवर्ती सूची)",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst10-08-04",
            "title": "Decentralisation in India: 1992 Amendment & Panchayati Raj System",
            "titleKn": "೧೯೯೨ ರ ಸಾಂವಿಧಾನಿಕ ತಿದ್ದುಪಡಿ ಮತ್ತು ಪಂಚಾಯತ್ ರಾಜ್",
            "titleHi": "भारत में विकेंद्रीकरण: 1992 का 73वां/74वां संविधान संशोधन",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst10-09",
        "chapterNumber": 9,
        "title": "Gender, Religion and Caste",
        "titleKn": "ಲಿಂಗ, ಧರ್ಮ ಮತ್ತು ಜಾತಿ (Civics)",
        "titleHi": "लिंग, धर्म और जाति (Civics)",
        "unit": "Unit III: Democratic Politics - II (Civics)",
        "unitKn": "ಘಟಕ ೩: ಪ್ರಜಾಪ್ರಭುತ್ವದ ರಾಜಕೀಯ - ೨ (ಪೌರನೀತಿ)",
        "unitHi": "इकाई ३: लोकतांत्रिक राजनीति - २ (नागरिक शास्त्र)",
        "description": "Gender and Politics, Public/Private Division, Women's Political Representation, Religion, Communalism and Politics, Communalism Forms, Secular State Constitutional Provisions, Caste and Politics, Caste Inequalities, Caste in Politics & Politics in Caste.",
        "descriptionKn": "ಲಿಂಗ ಮತ್ತು ರಾಜಕೀಯ, ಮಹಿಳಾ ಪ್ರಾತಿನಿಧ್ಯ, ಕೋಮುವಾದ ಮತ್ತು ಜಾತ್ಯತೀತ ರಾಷ್ಟ್ರ, ಜಾತಿ ಮತ್ತು ರಾಜಕೀಯ.",
        "descriptionHi": "लैंगिक मसले और राजनीति, महिला प्रतिनिधित्व, धर्म, सांप्रदायिकता और धर्मनिरपेक्ष राज्य के संवैधानिक प्रावधान, जाति और राजनीति।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 6,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Secular State: No official state religion in India (Articles 14, 15, 25-28)",
          "Women reservation: 1/3 seats reserved in local government bodies (Panchayats & Municipalities)"
        ],
        "subtopics": [
          {
            "id": "sst10-09-01",
            "title": "Gender Division & Women's Political Representation in India",
            "titleKn": "ಲಿಂಗ ತಾರತಮ್ಯ ಮತ್ತು ಮಹಿಳಾ ರಾಜಕೀಯ ಪ್ರಾತಿನಿಧ್ಯ",
            "titleHi": "लैंगिक विभाजन और भारत में महिलाओं का राजनीतिक प्रतिनिधित्व",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "sst10-09-02",
            "title": "Communalism: Forms in Politics & Threats to Democracy",
            "titleKn": "ಕೋಮುವಾದದ ರೂಪಗಳು ಮತ್ತು ಪ್ರಜಾಪ್ರಭುತ್ವಕ್ಕೆ ಸವಾಲು",
            "titleHi": "सांप्रदायिकता के विभिन्न रूप और दुष्परिणाम",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "sst10-09-03",
            "title": "Secular State: Indian Constitutional Safeguards",
            "titleKn": "ಜಾತ್ಯತೀತ ರಾಷ್ಟ್ರದ ಸಾಂವಿಧಾನಿಕ ಲಕ್ಷಣಗಳು",
            "titleHi": "धर्मनिरपेक्ष राज्य की संवैधानिक विशेषताएं",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "sst10-09-04",
            "title": "Caste in Politics & Politics in Caste Dynamic",
            "titleKn": "ರಾಜಕೀಯದಲ್ಲಿ ಜಾತಿ ಮತ್ತು ಜಾತಿಯಲ್ಲಿ ರಾಜಕೀಯ",
            "titleHi": "जाति के अंदर राजनीति और राजनीति में जाति की भूमिका",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "sst10-10",
        "chapterNumber": 10,
        "title": "Development",
        "titleKn": "ಅಭಿವೃದ್ಧಿ (Economics)",
        "titleHi": "विकास (Development - Economics)",
        "unit": "Unit IV: Understanding Economic Development (Economics)",
        "unitKn": "ಘಟಕ ೪: ಆರ್ಥಿಕ ಅಭಿವೃದ್ಧಿಯ ತಿಳುವಳಿಕೆ (ಅರ್ಥಶಾಸ್ತ್ರ)",
        "unitHi": "इकाई ۴: आर्थिक विकास की समझ (अर्थशास्त्र)",
        "description": "What Development Promises – Different People, Different Goals, Income and Other Goals (Freedom, Security, Respect), National Development, How to Compare Different Countries or States? (Per Capita Income / Average Income, World Bank Criteria), Income and Other Criteria (Infant Mortality Rate, Literacy Rate, Net Attendance Ratio), Public Facilities, Human Development Index (HDI - UNDP Report), Sustainability of Development (Groundwater Overuse, Crude Oil Exhaustion).",
        "descriptionKn": "ವಿವಿಧ ಜನರ ಅಭಿವೃದ್ಧಿ ಗುರಿಗಳು, ತಲಾದಾಯ, ವಿಶ್ವಬ್ಯಾಂಕ್ ಮಾನದಂಡ, ಶಿಶು ಮರಣ ದರ, ಮಾನವ ಅಭಿವೃದ್ಧಿ ಸೂಚ್ಯಂಕ (HDI) ಮತ್ತು ಸುಸ್ಥಿರ ಅಭಿವೃದ್ಧಿ.",
        "descriptionHi": "विकास के लक्ष्य (आय और अन्य लक्ष्य), राष्ट्रीय विकास, विश्व बैंक का प्रति व्यक्ति आय मापदंड, UNDP का मानव विकास सूचकांक (HDI), धारणीयता की संकल्पना।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 6,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Average Income (Per Capita Income) = Total National Income / Total Population",
          "World Bank: World Development Reports classify countries by Per Capita Income",
          "UNDP HDI: Considers Per Capita Income, Life Expectancy & Mean Years of Schooling"
        ],
        "subtopics": [
          {
            "id": "sst10-10-01",
            "title": "Different People, Different Goals & Conflicting Goals",
            "titleKn": "ವಿವಿಧ ಜನರ ಅಭಿವೃದ್ಧಿಯ ವಿಭಿನ್ನ ಮತ್ತು ಸಂಘರ್ಷದ ಗುರಿಗಳು",
            "titleHi": "विकास के विभिन्न व्यक्तियों के लिए विभिन्न लक्ष्य",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "sst10-10-02",
            "title": "Comparing Countries: World Bank Per Capita Income vs UNDP HDI Index",
            "titleKn": "ವಿಶ್ವಬ್ಯಾಂಕ್ vs UNDP ಮಾನವ ಅಭಿವೃದ್ಧಿ ಸೂಚ್ಯಂಕ",
            "titleHi": "देशों की तुलना: विश्व बैंक (प्रति व्यक्ति आय) बनाम UNDP (HDI)",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst10-10-03",
            "title": "Key Development Indicators (IMR, Literacy Rate, Net Attendance Ratio)",
            "titleKn": "ಪ್ರಮುಖ ಅಭಿವೃದ್ಧಿ ಸೂಚ್ಯಂಕಗಳು (ಶಿಶು ಮರಣ ದರ, ಸಾಕ್ಷರತೆ)",
            "titleHi": "शिशु मृत्यु दर (IMR), साक्षरता दर और निवल उपस्थिति अनुपात",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst10-10-04",
            "title": "Public Facilities (PDS, Healthcare) & Sustainable Development",
            "titleKn": "ಸಾರ್ವಜನಿಕ ಸೌಲಭ್ಯಗಳು ಮತ್ತು ಸುಸ್ಥಿರ ಅಭಿವೃದ್ಧಿ",
            "titleHi": "सार्वजनिक सुविधाएं (PDS, स्वास्थ्य) और विकास की धारणीयता",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst10-11",
        "chapterNumber": 11,
        "title": "Sectors of the Indian Economy",
        "titleKn": "ಭಾರತೀಯ ಅರ್ಥವ್ಯವಸ್ಥೆಯ ವಲಯಗಳು (Economics)",
        "titleHi": "भारतीय अर्थव्यवस्था के क्षेत्रक (Economics)",
        "unit": "Unit IV: Understanding Economic Development (Economics)",
        "unitKn": "ಘಟಕ ೪: ಆರ್ಥಿಕ ಅಭಿವೃದ್ಧಿಯ ತಿಳುವಳಿಕೆ (ಅರ್ಥಶಾಸ್ತ್ರ)",
        "unitHi": "इकाई ۴: आर्थिक विकास की समझ (अर्थशास्त्र)",
        "description": "Sectors of Economic Activities (Primary, Secondary, Tertiary), Historical Change in Sectors, Rising Importance of the Tertiary Sector in India, Where are Most People Employed? (Disguised Unemployment), How to Create More Employment? (MGNREGA 2005), Division of Sectors as Organised and Unorganised, Sectors in Terms of Ownership (Public and Private Sectors).",
        "descriptionKn": "ಪ್ರಾಥಮಿಕ, ದ್ವಿತೀಯ ಮತ್ತು ತೃತೀಯ ವಲಯಗಳು, ಜಿಡಿಪಿಯಲ್ಲಿ ತೃತೀಯ ವಲಯದ ಬೆಳವಣಿಗೆ, ಮರೆಮಾಚಿದ ನಿರುದ್ಯೋಗ, ಮನರೇಗಾ ೨೦೦೫, ಸಂಘಟಿತ ಮತ್ತು ಅಸಂಘಟಿತ ವಲಯಗಳು.",
        "descriptionHi": "प्राथमिक, द्वितीयक और तृतीयक क्षेत्रक, GDP में तृतीयक क्षेत्रक का महत्व, प्रच्छन्न/अल्प बेरोजगारी, मनरेगा 2005, संगठित व असंगठित क्षेत्रक, सार्वजनिक व निजी क्षेत्रक।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "GDP = Total value of final goods and services produced in all 3 sectors in a year",
          "MGNREGA 2005: Guarantees 100 days of wage employment in rural areas",
          "Disguised Unemployment: More people working than actually needed"
        ],
        "subtopics": [
          {
            "id": "sst10-11-01",
            "title": "Primary, Secondary & Tertiary Sectors Classification & Examples",
            "titleKn": "ಮೂರು ಆರ್ಥಿಕ ವಲಯಗಳ ವರ್ಗೀಕರಣ ಮತ್ತು ಉದಾಹರಣೆಗಳು",
            "titleHi": "प्राथमिक, द्वितीयक और तृतीयक क्षेत्रकों की संकल्पना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst10-11-02",
            "title": "GDP Calculation & Rising Prominence of Tertiary Sector in India",
            "titleKn": "ಜಿಡಿಪಿ ಲೆಕ್ಕಾಚಾರ & ತೃತೀಯ ವಲಯದ ಬೆಳವಣಿಗೆ",
            "titleHi": "सकल घरेलू उत्पाद (GDP) और तृतीयक क्षेत्रक के बढ़ते महत्व के कारण",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst10-11-03",
            "title": "Disguised Unemployment in Agriculture & Employment Creation (MGNREGA 2005)",
            "titleKn": "ಮರೆಮಾಚಿದ ನಿರುದ್ಯೋಗ ಮತ್ತು ಮನರೇಗಾ ೨೦೦೫",
            "titleHi": "प्रच्छन्न (छिपी हुई) बेरोजगारी और मनरेगा 2005 की विशेषताएं",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst10-11-04",
            "title": "Organised vs Unorganised Sectors & Public vs Private Sectors",
            "titleKn": "ಸಂಘಟಿತ-ಅಸಂಘಟಿತ & ಸಾರ್ವಜನಿಕ-ಖಾಸಗಿ ವಲಯಗಳು",
            "titleHi": "संगठित बनाम असंगठित और सार्वजनिक बनाम निजी क्षेत्रक",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst10-12",
        "chapterNumber": 12,
        "title": "Money and Credit",
        "titleKn": "ಹಣ ಮತ್ತು ಸಾಲ (Economics)",
        "titleHi": "मुद्रा और साख (Money and Credit - Economics)",
        "unit": "Unit IV: Understanding Economic Development (Economics)",
        "unitKn": "ಘಟಕ ೪: ಆರ್ಥಿಕ ಅಭಿವೃದ್ಧಿಯ ತಿಳುವಳಿಕೆ (ಅರ್ಥಶಾಸ್ತ್ರ)",
        "unitHi": "इकाई ۴: आर्थिक विकास की समझ (अर्थशास्त्र)",
        "description": "Money as a Medium of Exchange, Double Coincidence of Wants, Modern Forms of Money (Currency, Demand Deposits, Cheques), Loan Activities of Banks, Two Different Credit Situations, Terms of Credit (Collateral, Documentation, Interest Rate), Formal Sector Credit in India (RBI Supervision), Informal Sector (Moneylenders), Self Help Groups (SHGs) for the Poor.",
        "descriptionKn": "ಹಣದ ಕಾರ್ಯಗಳು, ಬ್ಯಾಂಕುಗಳ ಸಾಲ ಪ್ರಕ್ರಿಯೆ, ಸಾಲದ ಷರತ್ತುಗಳು, ಆರ್‌ಬಿಐ ಪಾತ್ರ, ಔಪಚಾರಿಕ vs ಅನೌಪಚಾರಿಕ ಸಾಲ, ಸ್ವಸಹಾಯ ಸಂಘಗಳು (SHGs).",
        "descriptionHi": "विनिमय के माध्यम के रूप में मुद्रा, आधुनिक रूप (करेंसी, चेक), बैंकों की ऋण संबंधी गतिविधियां, साख की शर्तें (समर्थक ऋणाधार), औपचारिक व अनौपचारिक साख, स्वयं सहायता समूह (SHG)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Barter System flaw: Double coincidence of wants",
          "Terms of Credit = Interest rate + Collateral + Documentation + Mode of repayment",
          "RBI functions: Supervises formal lending, sets SLR/CRR, monitors priority sector loans"
        ],
        "subtopics": [
          {
            "id": "sst10-12-01",
            "title": "Barter System, Double Coincidence of Wants & Modern Currency",
            "titleKn": "ಹಣ ವಿನಿಮಯ ಮಾಧ್ಯಮ & ಆಧುನಿಕ ಹಣದ ರೂಪಗಳು",
            "titleHi": "वस्तु विनिमय प्रणाली और मुद्रा के आधुनिक रूप (करेंसी, चेक)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "sst10-12-02",
            "title": "Bank Loan Process, Credit Situations & Debt-trap Risk",
            "titleKn": "ಬ್ಯಾಂಕ್ ಸಾಲಗಳು ಮತ್ತು ಸಾಲದ ಸುಳಿ",
            "titleHi": "बैंकों की ऋण प्रक्रिया और ऋण जाल (Debt Trap)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "sst10-12-03",
            "title": "Terms of Credit: Collateral, Interest Rate & Documentation",
            "titleKn": "ಸಾಲದ ಷರತ್ತುಗಳು ಮತ್ತು ಆಧಾರ ಭದ್ರತೆ (Collateral)",
            "titleHi": "साख की शर्तें: समर्थक ऋणाधार, ब्याज दर और दस्तावेज",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "sst10-12-04",
            "title": "Formal vs Informal Credit Sectors, RBI Role & SHG Groups",
            "titleKn": "ಔಪಚಾರಿಕ-ಅನೌಪಚಾರಿಕ ಸಾಲ, ಆರ್‌ಬಿಐ & ಸ್ವಸಹಾಯ ಸಂಘಗಳು",
            "titleHi": "औपचारिक बनाम अनौपचारिक ऋण, RBI की भूमिका और स्वयं सहायता समूह (SHG)",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c10-eng",
    "name": "English Grammar",
    "nameKn": "ಇಂಗ್ಲಿಷ್ (English Language & Literature)",
    "nameHi": "अंग्रेजी (English Language & Literature)",
    "classGrade": "Class 10",
    "icon": "BookOpen",
    "color": "#7c3aed",
    "badgeBg": "bg-purple-50 text-purple-800 border-purple-200",
    "borderColor": "border-purple-500",
    "chapters": [
      {
        "id": "eng10-01",
        "chapterNumber": 1,
        "title": "Tenses, Modals & Subject-Verb Concord",
        "titleKn": "ಕ್ರಿಯಾಪದ ಕಾಲಗಳು ಮತ್ತು ಸಹಾಯಕ ಕ್ರಿಯಾಪದಗಳು",
        "titleHi": "काल, मोडल्स और कर्ता-क्रिया संगति",
        "unit": "Unit I: Applied Grammar & Writing",
        "unitKn": "ಘಟಕ ೧: ವ್ಯಾಕರಣ ಮತ್ತು ಲೇಖನ ಕೌಶಲ್ಯ",
        "unitHi": "इकाई १: व्यावहारिक व्याकरण एवं लेखन कौशल",
        "description": "Detailed mastery of Present, Past, Future tenses, Modal auxiliaries (Can, Could, May, Might, Must, Should, Ought to), Subject-Verb Agreement rules, Error Correction & Gap Filling Drills.",
        "descriptionKn": "ಪ್ರಸ್ತುತ, ಭೂತ, ಭವಿಷ್ಯತ್ ಕಾಲಗಳು, ಮೋಡಲ್‌ಗಳು, ಸಬ್ಜೆಕ್ಟ್-ವರ್ಬ್ ಹೊಂದಾಣಿಕೆಯ ನಿಯಮಗಳು ಮತ್ತು ದೋಷ ತಿದ್ದುಪಡಿ.",
        "descriptionHi": "तीनों कालों के नियम, मोडल्स (Can, May, Must आदि), कर्ता-क्रिया संगति के नियम और वाक्य सुधार।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Singular Subject → Singular Verb (He writes)",
          "Neither/Either of them + Singular Verb",
          "Rule of Modals: Modal + Base Verb (V1)",
          "Past Perfect: Had + V3 for the earlier action"
        ],
        "subtopics": [
          {
            "id": "eng10-01-01",
            "title": "Complete Tenses Review & Integrated Gap Filling",
            "titleKn": "ಕಾಲಗಳ ಸಂಪೂರ್ಣ ಪುನರಾವರ್ತನೆ & ಬಿಟ್ಟ ಸ್ಥಳ ತುಂಬುವುದು",
            "titleHi": "काल (Tenses) का अभ्यास और रिक्त स्थान पूर्ति",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng10-01-02",
            "title": "Modal Auxiliaries Rules (Permission, Obligation, Probability)",
            "titleKn": "ಮೋಡಲ್ ಸಹಾಯಕ ಕ್ರಿಯಾಪದಗಳ ನಿಯಮಗಳು",
            "titleHi": "मोडल्स (Can, Could, Must, Should आदि) का सही प्रयोग",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng10-01-03",
            "title": "Subject-Verb Concord: 12 Cardinal Rules with Exceptions",
            "titleKn": "ಸಬ್ಜೆಕ್ಟ್-ವರ್ಬ್ ಕಾನ್‌ಕಾರ್ಡ್‌ನ ೧೨ ನಿಯಮಗಳು",
            "titleHi": "Subject-Verb Concord के प्रमुख नियम",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng10-01-04",
            "title": "Board Exam Editing, Omission & Error Correction Drills",
            "titleKn": "ದೋಷ ತಿದ್ದುಪಡಿ ಮತ್ತು ಎಡಿಟಿಂಗ್ ಅಭ್ಯಾಸ",
            "titleHi": "त्रुटि सुधार (Error Correction) और बोर्ड अभ्यास",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng10-02",
        "chapterNumber": 2,
        "title": "Reported Speech & Voice",
        "titleKn": "ಪರೋಕ್ಷ ಭಾಷಣ (Reported Speech)",
        "titleHi": "कथन (Direct & Indirect Speech)",
        "unit": "Unit I: Applied Grammar & Writing",
        "unitKn": "ಘಟಕ ೧: ವ್ಯಾಕರಣ ಮತ್ತು ಲೇಖನ ಕೌಶಲ್ಯ",
        "unitHi": "इकाई १: व्यावहारिक व्याकरण एवं लेखन कौशल",
        "description": "Direct to Indirect Speech Rules, Changing Statements, Imperatives (Commands & Requests), Interrogatives (Wh- questions & Yes/No), Exclamatory sentences, Dialogue Transformation.",
        "descriptionKn": "ನೇರ ಮತ್ತು ಪರೋಕ್ಷ ಭಾಷಣದ ನಿಯಮಗಳು, ಪ್ರಶ್ನಾರ್ಥಕ, ಆಜ್ಞಾರ್ಥಕ ಮತ್ತು ಭಾವಸೂಚಕ ವಾಕ್ಯಗಳ ಪರಿವರ್ತನೆ.",
        "descriptionHi": "प्रत्यक्ष से अप्रत्यक्ष कथन के नियम, प्रश्नवाचक, आज्ञासूचक और विस्मयादिबोधक वाक्यों का परिवर्तन।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Simple Present → Simple Past",
          "Present Perfect → Past Perfect",
          "Said to → Told / Asked / Ordered / Advised",
          "Yes/No Question → if / whether"
        ],
        "subtopics": [
          {
            "id": "eng10-02-01",
            "title": "Rules for Changing Statements & Pronoun/Time Shifting",
            "titleKn": "ಹೇಳಿಕೆ ವಾಕ್ಯಗಳ ಪರೋಕ್ಷ ರೂಪಾಂತರ",
            "titleHi": "साधारण वाक्यों का Direct से Indirect में रूपांतरण",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng10-02-02",
            "title": "Commands, Requests & Advice Reporting (Imperatives)",
            "titleKn": "ಆಜ್ಞೆ ಮತ್ತು ವಿನಂತಿ ವಾಕ್ಯಗಳ ಬದಲಾವಣೆ",
            "titleHi": "आज्ञा एवं प्रार्थना वाक्यों का परिवर्तन",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng10-02-03",
            "title": "Reporting Questions (Wh- & If/Whether Interrogatives)",
            "titleKn": "ಪ್ರಶ್ನಾರ್ಥಕ ವಾಕ್ಯಗಳ ಪರೋಕ್ಷ ಭಾಷಣ",
            "titleHi": "प्रश्नवाचक वाक्यों का रूपांतरण",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng10-02-04",
            "title": "Dialogue Conversion Practice for CBSE Board Questions",
            "titleKn": "ಸಂಭಾಷಣಾ ರೂಪಾಂತರ ಬೋರ್ಡ್ ಪ್ರಶ್ನೆಗಳು",
            "titleHi": "संवाद रूपांतरण आधारित बोर्ड प्रश्न अभ्यास",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng10-03",
        "chapterNumber": 3,
        "title": "Formal Letter & Analytical Paragraph Writing",
        "titleKn": "ಔಪಚಾರಿಕ ಪತ್ರ ಲೇಖನ & ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಪ್ಯಾರಾಗ್ರಾಫ್",
        "titleHi": "औपचारिक पत्र एवं विश्लेषणात्मक अनुच्छेद लेखन",
        "unit": "Unit I: Applied Grammar & Writing",
        "unitKn": "ಘಟಕ ೧: ವ್ಯಾಕರಣ ಮತ್ತು ಲೇಖನ ಕೌಶಲ್ಯ",
        "unitHi": "इकाई १: व्यावहारिक व्याकरण एवं लेखन कौशल",
        "description": "Letter to the Editor, Letter of Complaint, Letter of Enquiry/Placing an Order. Analytical Paragraph writing based on Bar Charts, Pie Charts, Tables and Line Graphs.",
        "descriptionKn": "ಪತ್ರಿಕಾ ಸಂಪಾದಕರಿಗೆ ಪತ್ರ, ದೂರು ಪತ್ರ, ವಿಚಾರಣಾ ಪತ್ರ ಮತ್ತು ನಕ್ಷೆ/ಕೋಷ್ಟಕ ಆಧಾರಿತ ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಲೇಖನ.",
        "descriptionHi": "संपादक को पत्र, शिकायत पत्र, पूछताछ पत्र और पाई चार्ट/ग्राफ आधारित विश्लेषणात्मक अनुच्छेद लेखन।",
        "status": "In Progress",
        "completionPercent": 70,
        "totalPeriods": 7,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Formal Letter Format: Sender's Address → Date → Receiver's Address → Subject → Salutation → Body (3 paras) → Complimentary Close",
          "Analytical Paragraph: Introduction (paraphrase title) → Overview & Comparison → Conclusion"
        ],
        "subtopics": [
          {
            "id": "eng10-03-01",
            "title": "Format & Vocabulary for Letter to the Editor",
            "titleKn": "ಸಂಪಾದಕರಿಗೆ ಪತ್ರ ಬರೆಯುವ ಮಾದರಿ ಮತ್ತು ಶಬ್ದಕೋಶ",
            "titleHi": "संपादक के नाम पत्र का प्रारूप और महत्वपूर्ण शब्दावली",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng10-03-02",
            "title": "Complaint Letters & Business Enquiry / Order Placement",
            "titleKn": "ದೂರು ಪತ್ರಗಳು ಮತ್ತು ವ್ಯವಹಾರ ಪತ್ರಗಳು",
            "titleHi": "शिकायती पत्र और पूछताछ/ऑर्डर पत्र का प्रारूप",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng10-03-03",
            "title": "Analytical Paragraph: Data Interpretation (Charts/Graphs)",
            "titleKn": "ದತ್ತಾಂಶ ವಿಶ್ಲೇಷಣಾತ್ಮಕ ಪ್ಯಾರಾಗ್ರಾಫ್ ರಚನೆ",
            "titleHi": "चार्ट और डेटा आधारित विश्लेषणात्मक अनुच्छेद",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng10-04",
        "chapterNumber": 4,
        "title": "First Flight: Prose & Poetry Highlights",
        "titleKn": "ಫರ್ಸ್ಟ್ ಫ್ಲೈಟ್: ಗದ್ಯ ಮತ್ತು ಕವನಗಳು",
        "titleHi": "First Flight: गद्य एवं कविताएँ",
        "unit": "Unit II: Literature (First Flight)",
        "unitKn": "ಘಟಕ ೨: ಸಾಹಿತ್ಯ (ಫರ್ಸ್ಟ್ ಫ್ಲೈಟ್)",
        "unitHi": "इकाई २: साहित्य (First Flight)",
        "description": "A Letter to God (G.L. Fuentes), Dust of Snow & Fire and Ice (Robert Frost), Nelson Mandela: Long Walk to Freedom, A Tiger in the Zoo (Leslie Norris), Two Stories about Flying, From the Diary of Anne Frank, Madam Rides the Bus, The Sermon at Benares, The Proposal (Anton Chekhov).",
        "descriptionKn": "ಎ ಲೆಟರ್ ಟು ಗಾಡ್, ನೆಲ್ಸನ್ ಮಂಡೇಲಾ, ಆನ್ ಫ್ರಾಂಕ್ ದಿನಚರಿ, ಮೇಡಂ ರೈಡ್ಸ್ ದಿ ಬಸ್, ಬುದ್ಧನ ಬೋಧನೆ, ದಿ ಪ್ರಪೋಸಲ್ ನಾಟಕ.",
        "descriptionHi": "A Letter to God, Nelson Mandela, Anne Frank, Madam Rides the Bus, The Sermon at Benares, The Proposal (नाटक) और प्रमुख कविताएँ।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 10,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Themes: Faith (Lencho), Freedom & Courage (Mandela), Innocence & Reality (Valli), Grief & Impermanence (Kisa Gotami)"
        ],
        "subtopics": [
          {
            "id": "eng10-04-01",
            "title": "A Letter to God & Poems: Dust of Snow, Fire and Ice",
            "titleKn": "ಎ ಲೆಟರ್ ಟು ಗಾಡ್ ಮತ್ತು ರಾಬರ್ಟ್ ಫ್ರಾಸ್ಟ್ ಕವನಗಳು",
            "titleHi": "A Letter to God और रॉबर्ट फ्रॉस्ट की कविताएँ",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "eng10-04-02",
            "title": "Nelson Mandela: Long Walk to Freedom & A Tiger in the Zoo",
            "titleKn": "ನೆಲ್ಸನ್ ಮಂಡೇಲಾ ಅವರ ಆತ್ಮಚರಿತ್ರೆ & ಕವನ",
            "titleHi": "Nelson Mandela और A Tiger in the Zoo कविता",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "eng10-04-03",
            "title": "From the Diary of Anne Frank & The Ball Poem",
            "titleKn": "ಆನ್ ಫ್ರಾಂಕ್ ದಿನಚರಿ & ದಿ ಬಾಲ್ ಪೋಯಮ್",
            "titleHi": "From the Diary of Anne Frank और The Ball Poem",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng10-04-04",
            "title": "Madam Rides the Bus, Sermon at Benares & The Proposal Play",
            "titleKn": "ಮೇಡಂ ರೈಡ್ಸ್ ದಿ ಬಸ್ & ದಿ ಪ್ರಪೋಸಲ್ ನಾಟಕ",
            "titleHi": "Madam Rides the Bus, Sermon at Benares और The Proposal",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "eng10-05",
        "chapterNumber": 5,
        "title": "Footprints Without Feet: Supplementary Reader",
        "titleKn": "ಫುಟ್‌ಪ್ರಿಂಟ್ಸ್ ವಿದೌಟ್ ಫೀಟ್: ಪೂರಕ ಪಠ್ಯ",
        "titleHi": "Footprints Without Feet: पूरक पाठ्यपुस्तक",
        "unit": "Unit III: Supplementary Reader (Footprints Without Feet)",
        "unitKn": "ಘಟಕ ೩: ಪೂರಕ ಓದು (ಫುಟ್‌ಪ್ರಿಂಟ್ಸ್ ವಿದೌಟ್ ಫೀಟ್)",
        "unitHi": "इकाई ३: पूरक साहित्य (Footprints Without Feet)",
        "description": "A Triumph of Surgery (James Herriot), The Thief's Story (Ruskin Bond), The Midnight Visitor (Robert Arthur), A Question of Trust (Victor Canning), Footprints without Feet (H.G. Wells), The Making of a Scientist (Robert W. Peterson), The Necklace (Guy de Maupassant), Bholi (K.A. Abbas), The Book That Saved the Earth (Claire Boiko).",
        "descriptionKn": "ಎ ಟ್ರಯಂಫ್ ಆಫ್ ಸರ್ಜರಿ, ದಿ ಥೀಫ್ಸ್ ಸ್ಟೋರಿ, ಫುಟ್‌ಪ್ರಿಂಟ್ಸ್ ವಿದೌಟ್ ಫೀಟ್, ದಿ ನೆಕ್ಲೇಸ್, ಭೋಲಿ.",
        "descriptionHi": "A Triumph of Surgery, The Thief's Story, Footprints without Feet, The Necklace, Bholi, The Making of a Scientist।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Themes: Transformation (Hari Singh & Anil), Vanity & Honesty (Madame Loisel / Necklace), Empowerment through Education (Bholi)"
        ],
        "subtopics": [
          {
            "id": "eng10-05-01",
            "title": "A Triumph of Surgery & The Thief's Story",
            "titleKn": "ಎ ಟ್ರಯಂಫ್ ಆಫ್ ಸರ್ಜರಿ & ದಿ ಥೀಫ್ಸ್ ಸ್ಟೋರಿ",
            "titleHi": "A Triumph of Surgery और The Thief's Story की समीक्षा",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "eng10-05-02",
            "title": "Footprints without Feet (Griffin's Science) & The Midnight Visitor",
            "titleKn": "ಫುಟ್‌ಪ್ರಿಂಟ್ಸ್ ವಿದೌಟ್ ಫೀಟ್ & ಮಿಡ್‌ನೈಟ್ ವಿಸಿಟರ್",
            "titleHi": "Footprints without Feet और The Midnight Visitor",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "eng10-05-03",
            "title": "The Necklace & The Making of a Scientist",
            "titleKn": "ದಿ ನೆಕ್ಲೇಸ್ & ದಿ ಮೇಕಿಂಗ್ ಆಫ್ ಎ ಸೈಂಟಿಸ್ಟ್",
            "titleHi": "The Necklace और The Making of a Scientist",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "eng10-05-04",
            "title": "Bholi & The Book That Saved the Earth (Character Analysis & Themes)",
            "titleKn": "ಭೋಲಿ ಮತ್ತು ಭೂಮಿಯನ್ನು ಉಳಿಸಿದ ಪುಸ್ತಕ",
            "titleHi": "Bholi और The Book That Saved the Earth (चरित्र चित्रण)",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c9-math",
    "name": "Mathematics",
    "nameKn": "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)",
    "nameHi": "गणित (Mathematics)",
    "classGrade": "Class 9",
    "icon": "Calculator",
    "color": "#1d4ed8",
    "badgeBg": "bg-blue-50 text-blue-800 border-blue-200",
    "borderColor": "border-blue-500",
    "chapters": [
      {
        "id": "m9-01",
        "chapterNumber": 1,
        "title": "Number Systems",
        "titleKn": "ಸಂಖ್ಯಾ ಪದ್ಧತಿಗಳು (Number Systems)",
        "titleHi": "संख्या पद्धति (Number Systems)",
        "unit": "Unit I: Number Systems",
        "unitKn": "ಘಟಕ ೧: ಸಂಖ್ಯಾ ಪದ್ಧತಿಗಳು",
        "unitHi": "इकाई १: संख्या पद्धतियाँ",
        "description": "Irrational Numbers, Real Numbers and their Decimal Expansions, Representing Real Numbers on the Number Line, Operations on Real Numbers, Laws of Exponents for Real Numbers.",
        "descriptionKn": "ಅಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳು, ನೈಜ ಸಂಖ್ಯೆಗಳ ದಶಮಾಂಶ ರೂಪ, ಸಂಖ್ಯಾ ರೇಖೆಯ ಮೇಲೆ ಗುರುತಿಸುವಿಕೆ, ಘಾತಾಂಕಗಳ ನಿಯಮಗಳು.",
        "descriptionHi": "अपरिमेय संख्याएँ, वास्तविक संख्याएँ और उनके दशमलव प्रसार, संख्या रेखा पर निरूपण, वास्तविक संख्याओं पर संक्रियाएँ और घातांक नियम।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "(a^p) × (a^q) = a^(p+q)",
          "(a^p)^q = a^(pq)",
          "a^p / a^q = a^(p-q)",
          "Rationalizing factor: (√a - √b)(√a + √b) = a - b"
        ],
        "subtopics": [
          {
            "id": "m9-01-01",
            "title": "Rational Numbers & Locating Irrationals (√2, √3, √5) on Number Line",
            "titleKn": "ಅಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳನ್ನು ಸಂಖ್ಯಾ ರೇಖೆಯಲ್ಲಿ ಗುರುತಿಸುವುದು",
            "titleHi": "अपरिमेय संख्याओं का संख्या रेखा पर स्थान निर्धारण",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m9-01-02",
            "title": "Decimal Expansions (Terminating, Non-terminating Repeating)",
            "titleKn": "ದಶಮಾಂಶ ವಿಸ್ತರಣೆಗಳು ಮತ್ತು p/q ರೂಪ",
            "titleHi": "दशमलव प्रसार (शांत व अनवसानी आवर्ती) और p/q रूप",
            "type": "Formula & Derivation",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m9-01-03",
            "title": "Rationalising the Denominator",
            "titleKn": "ಛೇದವನ್ನು ಅಕರಣೀಕರಿಸುವುದು",
            "titleHi": "हर का परिमेयकरण करना",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m9-01-04",
            "title": "Laws of Exponents for Real Numbers & Radical Practice",
            "titleKn": "ನೈಜ ಸಂಖ್ಯೆಗಳಿಗೆ ಘಾತಾಂಕಗಳ ನಿಯಮಗಳು",
            "titleHi": "वास्तविक संख्याओं के लिए घातांक नियम",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m9-02",
        "chapterNumber": 2,
        "title": "Polynomials",
        "titleKn": "ಬಹುಪದೋಕ್ತಿಗಳು (Polynomials)",
        "titleHi": "बहुपद (Polynomials)",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई २: बीजगणित",
        "description": "Polynomials in One Variable, Zeroes of a Polynomial, Factor Theorem, Remainder Theorem, Factorisation of Quadratic and Cubic Polynomials, Algebraic Identities.",
        "descriptionKn": "ಒಂದು ಚರಾಕ್ಷರದ ಬಹುಪದೋಕ್ತಿಗಳು, ಅಪವರ್ತನ ಪ್ರಮೇಯ, ಘನ ಬಹುಪದೋಕ್ತಿಗಳ ಅಪವರ್ತನ ಮತ್ತು ಬೀಜಗಣಿತೀಯ ನಿತ್ಯಸಮೀಕರಣಗಳು.",
        "descriptionHi": "एक चर वाले बहुपद, बहुपद के शून्यक, गुणनखंड प्रमेय, द्विघात व त्रिघात बहुपदों का गुणनखंड और बीजीय सर्वसमिकाएँ।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 10,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "(x+y+z)² = x²+y²+z²+2xy+2yz+2zx",
          "(x+y)³ = x³+y³+3xy(x+y)",
          "x³+y³+z³ - 3xyz = (x+y+z)(x²+y²+z²-xy-yz-zx)"
        ],
        "subtopics": [
          {
            "id": "m9-02-01",
            "title": "Degree, Coefficients, Types & Zeroes of Polynomials",
            "titleKn": "ಬಹುಪದೋಕ್ತಿಗಳ ಮಹತ್ತಮ ಘಾತ ಮತ್ತು ವಿಧಗಳು",
            "titleHi": "बहुपद की घात, गुणांक और शून्यक",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m9-02-02",
            "title": "Factor Theorem & Factorising Quadratic Polynomials (Splitting Middle Term)",
            "titleKn": "ಅಪವರ್ತನ ಪ್ರಮೇಯ ಮತ್ತು ವರ್ಗ ಬಹುಪದೋಕ್ತಿಗಳ ಅಪವರ್ತನ",
            "titleHi": "गुणनखंड प्रमेय और मध्य पद विभक्त करके गुणनखंड",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m9-02-03",
            "title": "Factorising Cubic Polynomials using Trial and Error + Division",
            "titleKn": "ಘನ ಬಹುಪದೋಕ್ತಿಗಳ ಅಪವರ್ತನ",
            "titleHi": "त्रिघात बहुपदों का गुणनखंडन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "m9-02-04",
            "title": "8 Essential Algebraic Identities Expansion & Factorisation Drills",
            "titleKn": "೮ ಪ್ರಮುಖ ನಿತ್ಯಸಮೀಕರಣಗಳ ಅಭ್ಯಾಸ",
            "titleHi": "8 प्रमुख बीजीय सर्वसमिकाओं का अनुप्रयोग",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 55,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m9-03",
        "chapterNumber": 3,
        "title": "Coordinate Geometry",
        "titleKn": "ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ (Coordinate Geometry)",
        "titleHi": "निर्देशांक ज्यामिति (Coordinate Geometry)",
        "unit": "Unit III: Coordinate Geometry",
        "unitKn": "ಘಟಕ ೩: ನಿರ್ದೇಶಾಂಕ ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ३: निर्देशांक ज्यामिति",
        "description": "Cartesian System, Origin, Axes (x-axis, y-axis), Coordinates of a Point, Four Quadrants and Plotting Points.",
        "descriptionKn": "ಕಾರ್ಟೀಸಿಯನ್ ಪದ್ಧತಿ, ಮೂಲಬಿಂದು, ಅಕ್ಷಗಳು, ನಾಲ್ಕು ಚತುರ್ಥಕಗಳು ಮತ್ತು ಬಿಂದುಗಳನ್ನು ಗುರುತಿಸುವುದು.",
        "descriptionHi": "कार्तीय पद्धति, मूल बिंदु, x-अक्ष और y-अक्ष, बिंदु के निर्देशांक, चारों चतुर्थांश और आलेख पर बिंदु निरूपण।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 5,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Point P(x, y): x = Abscissa, y = Ordinate",
          "Origin = (0, 0)",
          "Quadrant I (+,+), II (-,+), III (-,-), IV (+,-)"
        ],
        "subtopics": [
          {
            "id": "m9-03-01",
            "title": "Cartesian Plane, Abscissa, Ordinate & Four Quadrants",
            "titleKn": "ಕಾರ್ಟೀಸಿಯನ್ ಸಮತಲ ಮತ್ತು ೪ ಚತುರ್ಥಕಗಳು",
            "titleHi": "कार्तीय तल, भुज, कोटि और चतुर्थांशों की समझ",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "m9-03-02",
            "title": "Plotting Points on Cartesian Coordinate Plane",
            "titleKn": "ಸಮತಲದ ಮೇಲೆ ಬಿಂದುಗಳನ್ನು ಗುರುತಿಸುವುದು",
            "titleHi": "निर्देशांक तल पर दिए गए बिंदुओं को आलेखित करना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m9-04",
        "chapterNumber": 4,
        "title": "Linear Equations in Two Variables",
        "titleKn": "ಎರಡು ಚರಾಕ್ಷರಗಳಿರುವ ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳು",
        "titleHi": "दो चरों वाले रैखिक समीकरण",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई २: बीजगणित",
        "description": "Linear Equations, Solution of a Linear Equation ax + by + c = 0, Graph of a Linear Equation in Two Variables.",
        "descriptionKn": "ರೇಖಾತ್ಮಕ ಸಮೀಕರಣದ ಪರಿಹಾರ, ನಕ್ಷೆ ರಚನೆ ಮತ್ತು ನೈಜ ಸಮಸ್ಯೆಗಳ ಸಮೀಕರಣ ರಚನೆ.",
        "descriptionHi": "रैखिक समीकरण ax + by + c = 0, समीकरण के अपरिमित हल और आलेखीय निरूपण।",
        "status": "In Progress",
        "completionPercent": 80,
        "totalPeriods": 7,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Standard form: ax + by + c = 0",
          "A linear equation in 2 variables has infinitely many solutions",
          "Equation of x-axis is y=0, y-axis is x=0"
        ],
        "subtopics": [
          {
            "id": "m9-04-01",
            "title": "Standard Form ax + by + c = 0 & Finding Solutions",
            "titleKn": "ರೇಖಾತ್ಮಕ ಸಮೀಕರಣದ ಪರಿಹಾರಗಳು",
            "titleHi": "रैखिक समीकरण का मानक रूप और हल ज्ञात करना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m9-04-02",
            "title": "Graph of Linear Equation in Two Variables & NCERT Drills",
            "titleKn": "ನಕ್ಷೆ ರಚನೆ ಮತ್ತು ಅಭ್ಯಾಸ",
            "titleHi": "दो चरों वाले रैखिक समीकरण का ग्राफ खींचना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m9-05",
        "chapterNumber": 5,
        "title": "Introduction to Euclid's Geometry",
        "titleKn": "ಯೂಕ್ಲಿಡ್‌ನ ರೇಖಾಗಣಿತದ ಪ್ರಸ್ತಾವನೆ",
        "titleHi": "यूक्लिड की ज्यामिति का परिचय",
        "unit": "Unit IV: Geometry",
        "unitKn": "ಘಟಕ ೪: ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ४: ज्यामिति",
        "description": "History of Geometry, Euclid's Definitions, Axioms and 5 Postulates, Equivalent Versions of Euclid's Fifth Postulate.",
        "descriptionKn": "ಯೂಕ್ಲಿಡ್‌ನ ಸ್ವಯಂಸಿದ್ಧಗಳು ಮತ್ತು ೫ ಆಧಾರ ಪ್ರತಿಜ್ಞೆಗಳು, ೫ ನೇ ಆಧಾರ ಪ್ರತಿಜ್ಞೆಯ ಸಮಾನ ರೂಪಗಳು.",
        "descriptionHi": "यूक्लिड की परिभाषाएं, 7 अभिगृहीत और 5 अभिधारणाएं, पांचवीं अभिधारणा का समतुल्य रूप।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 5,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Axiom 1: Things equal to the same thing are equal to one another",
          "Postulate 5: Playfair's Axiom for parallel lines"
        ],
        "subtopics": [
          {
            "id": "m9-05-01",
            "title": "Euclid's 7 Fundamental Axioms with Practical Examples",
            "titleKn": "ಯೂಕ್ಲಿಡ್‌ನ ೭ ಮೂಲ ಸ್ವಯಂಸಿದ್ಧಗಳು",
            "titleHi": "यूक्लिड के 7 मौलिक अभिगृहीत",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "m9-05-02",
            "title": "Euclid's 5 Postulates & 5th Postulate Significance",
            "titleKn": "ಯೂಕ್ಲಿಡ್‌ನ ೫ ಆಧಾರ ಪ್ರತಿಜ್ಞೆಗಳು",
            "titleHi": "यूक्लिड की 5 अभिधारणाएं और 5वीं अभिधारणा",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m9-06",
        "chapterNumber": 6,
        "title": "Lines and Angles",
        "titleKn": "ರೇಖೆಗಳು ಮತ್ತು ಕೋನಗಳು",
        "titleHi": "रेखाएं और कोण",
        "unit": "Unit IV: Geometry",
        "unitKn": "ಘಟಕ ೪: ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ४: ज्यामिति",
        "description": "Basic Terms, Linear Pair Axiom, Vertically Opposite Angles Theorem, Parallel Lines and Transversal, Angle Sum Property of a Triangle.",
        "descriptionKn": "ರೇಖಾತ್ಮಕ ಜೋಡಿ, ಶೃಂಗಾಭಿಮುಖ ಕೋನಗಳ ಪ್ರಮೇಯ, ಛೇದಕ ರೇಖೆ ಮತ್ತು ಸಮಾಂತರ ರೇಖೆಗಳು, ತ್ರಿಭುಜದ ಒಳಕೋನಗಳ ಮೊತ್ತ.",
        "descriptionHi": "रैखिक युग्म अभिगृहीत, शीर्षाभिमुख कोण प्रमेय, तिर्यक रेखा और समांतर रेखाओं के कोण, त्रिभुज का कोण योग गुणधर्म।",
        "status": "In Progress",
        "completionPercent": 50,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Linear Pair: ∠1 + ∠2 = 180°",
          "Vertically opposite angles are equal",
          "Alternate interior angles are equal when lines are parallel",
          "Angle sum of triangle = 180°"
        ],
        "subtopics": [
          {
            "id": "m9-06-01",
            "title": "Linear Pair of Angles Axiom & Vertically Opposite Angles Proof",
            "titleKn": "ರೇಖಾತ್ಮಕ ಜೋಡಿ ಮತ್ತು ಶೃಂಗಾಭಿಮುಖ ಕೋನಗಳು",
            "titleHi": "रैखिक युग्म और शीर्षाभिमुख कोणों की उपपत्ति",
            "type": "Theorem & Proof",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m9-06-02",
            "title": "Parallel Lines & Transversal (Corresponding, Alternate, Co-interior)",
            "titleKn": "ಸಮಾಂತರ ರೇಖೆಗಳು ಮತ್ತು ಛೇದಕ ರೇಖೆಯ ಕೋನಗಳು",
            "titleHi": "समांतर रेखाएं और तिर्यक रेखा द्वारा बने कोण",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m9-06-03",
            "title": "Angle Sum Property of a Triangle & Exterior Angle Theorem",
            "titleKn": "ತ್ರಿಭುಜದ ಕೋನ ಮೊತ್ತ ಪ್ರಮೇಯ ಮತ್ತು ಹೊರಕೋನ",
            "titleHi": "त्रिभुज का कोण योग गुण और बहिष्कोण प्रमेय",
            "type": "Theorem & Proof",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m9-06-04",
            "title": "NCERT Exercise 6.1, 6.2 & 6.3 Comprehensive Geometry Drills",
            "titleKn": "ರೇಖೆಗಳು-ಕೋನಗಳ ಅಭ್ಯಾಸ ಲೆಕ್ಕಗಳು",
            "titleHi": "NCERT 6.1 और 6.2 के महत्वपूर्ण प्रश्नों का हल",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m9-07",
        "chapterNumber": 7,
        "title": "Triangles",
        "titleKn": "ತ್ರಿಭುಜಗಳು (Triangles)",
        "titleHi": "त्रिभुज (Triangles)",
        "unit": "Unit IV: Geometry",
        "unitKn": "ಘಟಕ ೪: ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ४: ज्यामिति",
        "description": "Congruence of Triangles, Criteria for Congruence (SAS, ASA, AAS, SSS, RHS), Properties of Triangles (Isosceles Triangles Angles Opposite to Equal Sides are Equal).",
        "descriptionKn": "ತ್ರಿಭುಜಗಳ ಸರ್ವಸಮತೆ, SAS, ASA, AAS, SSS, RHS ನಿಯಮಗಳು ಮತ್ತು ಸಮದ್ವಿಬಾಹು ತ್ರಿಭುಜದ ಗುಣಗಳು.",
        "descriptionHi": "त्रिभुजों की सर्वांगसमता, सर्वांगसमता की कसौटियाँ (SAS, ASA, AAS, SSS, RHS), समद्विबाहु त्रिभुज के गुण।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 10,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Congruence Criteria: SAS, ASA, AAS, SSS, RHS",
          "Isosceles Triangle: Angles opposite to equal sides are equal"
        ],
        "subtopics": [
          {
            "id": "m9-07-01",
            "title": "Congruence of Triangles Concept & SAS / ASA Congruence Criteria",
            "titleKn": "ಸರ್ವಸಮತೆಯ ಪರಿಕಲ್ಪನೆ ಮತ್ತು SAS/ASA ನಿಯಮಗಳು",
            "titleHi": "त्रिभुज सर्वांगसमता और SAS/ASA कसौटियाँ",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m9-07-02",
            "title": "AAS, SSS and RHS Congruence Theorems Proofs",
            "titleKn": "AAS, SSS ಮತ್ತು RHS ಪ್ರಮೇಯಗಳು",
            "titleHi": "SSS और RHS सर्वांगसमता नियम की उपपत्ति",
            "type": "Theorem & Proof",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "m9-07-03",
            "title": "Isosceles Triangle Theorems & Angle-Side Properties",
            "titleKn": "ಸಮದ್ವಿಬಾಹು ತ್ರಿಭುಜದ ಪ್ರಮೇಯಗಳು",
            "titleHi": "समद्विबाहु त्रिभुज के सम्मुख कोण और भुजाओं के प्रमेय",
            "type": "Theorem & Proof",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m9-07-04",
            "title": "NCERT Exercise 7.1, 7.2 & 7.3 Rigorous Proofs Drill",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ೭ ನೇ ಅಧ್ಯಾಯದ ಸಾಧನೆಗಳು",
            "titleHi": "NCERT 7.1, 7.2 व 7.3 के प्रश्नों का अभ्यास",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 60,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m9-08",
        "chapterNumber": 8,
        "title": "Quadrilaterals",
        "titleKn": "ಚತುರ್ಭುಜಗಳು (Quadrilaterals)",
        "titleHi": "चतुर्भुज (Quadrilaterals)",
        "unit": "Unit IV: Geometry",
        "unitKn": "ಘಟಕ ೪: ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ४: ज्यामिति",
        "description": "Angle Sum Property of Quadrilateral, Properties of Parallelogram (Diagonal divides into 2 congruent triangles, Opposite sides/angles equal), Mid-point Theorem & Its Converse.",
        "descriptionKn": "ಚತುರ್ಭುಜದ ಒಳಕೋನಗಳ ಮೊತ್ತ, ಸಮಾಂತರ ಚತುರ್ಭುಜದ ಗುಣಲಕ್ಷಣಗಳು, ಮಧ್ಯಬಿಂದು ಪ್ರಮೇಯ ಮತ್ತು ಅದರ ವಿಲೋಮ.",
        "descriptionHi": "चतुर्भुज का कोण योग गुण, समांतर चतुर्भुज के गुणधर्म (विकर्ण दो सर्वांगसम त्रिभुजों में बांटता है), मध्य-बिंदु प्रमेय और इसका विलोम।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Angle sum of quadrilateral = 360°",
          "Mid-point Theorem: Segment joining midpoints of 2 sides is parallel to 3rd side and half of it (DE ∥ BC, DE = 1/2 BC)"
        ],
        "subtopics": [
          {
            "id": "m9-08-01",
            "title": "Properties of Parallelogram, Rhombus, Rectangle & Square",
            "titleKn": "ಸಮಾಂತರ ಚತುರ್ಭುಜ, ವಜ್ರಾಕೃತಿ, ಆಯತ ಮತ್ತು ಚೌಕದ ಗುಣಗಳು",
            "titleHi": "समांतर चतुर्भुज, समचतुर्भुज, आयत और वर्ग के गुणधर्म",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m9-08-02",
            "title": "Mid-point Theorem Proof (Detailed Geometric Construction)",
            "titleKn": "ಮಧ್ಯಬಿಂದು ಪ್ರಮೇಯದ ಸಾಧನೆ",
            "titleHi": "मध्य-बिंदु प्रमेय की विस्तृत उपपत्ति",
            "type": "Theorem & Proof",
            "estimatedMinutes": 60,
            "isCompleted": false
          },
          {
            "id": "m9-08-03",
            "title": "Converse of Mid-point Theorem",
            "titleKn": "ಮಧ್ಯಬಿಂದು ಪ್ರಮೇಯದ ವಿಲೋಮ",
            "titleHi": "मध्य-बिंदु प्रमेय का विलोम",
            "type": "Theorem & Proof",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m9-08-04",
            "title": "NCERT Exercise 8.1 Complex Geometric Proofs",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ೮.೧ ಅಭ್ಯಾಸ",
            "titleHi": "NCERT 8.1 के महत्वपूर्ण प्रश्नों का हल",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m9-09",
        "chapterNumber": 9,
        "title": "Circles",
        "titleKn": "ವೃತ್ತಗಳು (Circles)",
        "titleHi": "वृत्त (Circles)",
        "unit": "Unit IV: Geometry",
        "unitKn": "ಘಟಕ ೪: ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ४: ज्यामिति",
        "description": "Equal Chords and their Distances from Centre, Perpendicular from Centre to a Chord Bisects the Chord, Angle Subtended by an Arc at the Centre is Double Angle at Remaining Part, Cyclic Quadrilaterals.",
        "descriptionKn": "ಕೇಂದ್ರದಿಂದ ಜ್ಯಾಗೆ ಲಂಬವು ಜ್ಯಾವನ್ನು ಅರ್ಧಿಸುತ್ತದೆ, ಕೇಂದ್ರದಲ್ಲಿ ಕಂಸವು ಉಂಟುಮಾಡುವ ಕೋನ, ಚಕ್ರೀಯ ಚತುರ್ಭುಜಗಳು.",
        "descriptionHi": "समान जीवाएं और केंद्र से दूरी, केंद्र से जीवा पर लंब जीवा को समद्विभाजित करता है, चाप द्वारा केंद्र पर बना कोण शेष भाग पर बने कोण का दुगुना होता है, चक्रीय चतुर्भुज।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Angle subtended by arc at centre: ∠AOB = 2 × ∠APB",
          "Angle in a semicircle is 90°",
          "Angles in same segment of circle are equal",
          "Sum of opposite angles of cyclic quadrilateral = 180°"
        ],
        "subtopics": [
          {
            "id": "m9-09-01",
            "title": "Chords & Perpendicular from Centre to Chord Theorems",
            "titleKn": "ವೃತ್ತದ ಜ್ಯಾ ಮತ್ತು ಕೇಂದ್ರದಿಂದ ಲಂಬ ಪ್ರಮೇಯಗಳು",
            "titleHi": "जीवाएं और केंद्र से जीवा पर लंब के प्रमेय",
            "type": "Theorem & Proof",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m9-09-02",
            "title": "Angle Subtended by Arc at Centre Theorem Proof",
            "titleKn": "ಕೇಂದ್ರದಲ್ಲಿ ಕಂಸ ಉಂಟುಮಾಡುವ ಕೋನದ ಪ್ರಮೇಯ ಸಾಧನೆ",
            "titleHi": "चाप द्वारा केंद्र पर अंतरित कोण प्रमेय की उपपत्ति",
            "type": "Theorem & Proof",
            "estimatedMinutes": 60,
            "isCompleted": false
          },
          {
            "id": "m9-09-03",
            "title": "Angles in Same Segment & Angles in Semicircle",
            "titleKn": "ಒಂದೇ ವೃತ್ತಖಂಡದ ಕೋನಗಳು ಮತ್ತು ಅರ್ಧವೃತ್ತದ ಕೋನ",
            "titleHi": "एक ही वृत्तखंड के कोण और अर्धवृत्त में बना समकोण",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "m9-09-04",
            "title": "Cyclic Quadrilaterals Theorems & NCERT 9.3 Drills",
            "titleKn": "ಚಕ್ರೀಯ ಚತುರ್ಭುಜಗಳ ಪ್ರಮೇಯಗಳು & ಅಭ್ಯಾಸ",
            "titleHi": "चक्रीय चतुर्भुज के प्रमेय और NCERT 9.3 का हल",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m9-10",
        "chapterNumber": 10,
        "title": "Heron's Formula",
        "titleKn": "ಹೆರಾನ್‌ನ ಸೂತ್ರ (Heron's Formula)",
        "titleHi": "हीरोन का सूत्र (Heron's Formula)",
        "unit": "Unit V: Mensuration",
        "unitKn": "ಘಟಕ ೫: ಕ್ಷೇತ್ರಗಣಿತ",
        "unitHi": "इकाई ५: क्षेत्रमिति",
        "description": "Area of a Triangle by Heron's Formula (Without Proof) & Application in Finding Areas of Triangles in Various Contexts.",
        "descriptionKn": "ಹೆರಾನ್‌ನ ಸೂತ್ರ ಬಳಸಿ ತ್ರಿಭುಜದ ವಿಸ್ತೀರ್ಣ ಕಂಡುಹಿಡಿಯುವುದು ಮತ್ತು ನೈಜ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರ.",
        "descriptionHi": "हीरोन के सूत्र द्वारा त्रिभुज का क्षेत्रफल ज्ञात करना (s = (a+b+c)/2) और विभिन्न प्रश्नों में अनुप्रयोग।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 6,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Semi-perimeter: s = (a + b + c) / 2",
          "Area of Triangle = √[s(s - a)(s - b)(s - c)]"
        ],
        "subtopics": [
          {
            "id": "m9-10-01",
            "title": "Heron's Formula Statement & Semi-perimeter Concept",
            "titleKn": "ಹೆರಾನ್ ಸೂತ್ರ ಮತ್ತು ಅರ್ಧ-ಸುತ್ತಳತೆ ಪರಿಕಲ್ಪನೆ",
            "titleHi": "हीरोन के सूत्र की संकल्पना और अर्धपरिमाप (s)",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": false
          },
          {
            "id": "m9-10-02",
            "title": "Area of Scalene, Isosceles & Equilateral Triangles using Heron's Formula",
            "titleKn": "ವಿಷಮಬಾಹು ಮತ್ತು ಸಮದ್ವಿಬಾಹು ತ್ರಿಭುಜಗಳ ವಿಸ್ತೀರ್ಣ",
            "titleHi": "विषमबाहु और समद्विबाहु त्रिभुजों का क्षेत्रफल",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m9-10-03",
            "title": "NCERT Chapter 10 Complete Exercise Drills",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ೧೦ ನೇ ಅಧ್ಯಾಯದ ಅಭ್ಯಾಸ ಲೆಕ್ಕಗಳು",
            "titleHi": "NCERT 10 के सभी महत्वपूर्ण प्रश्नों का हल",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m9-11",
        "chapterNumber": 11,
        "title": "Surface Areas and Volumes",
        "titleKn": "ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣಗಳು ಮತ್ತು ಘನಫಲಗಳು",
        "titleHi": "पृष्ठीय क्षेत्रफल और आयतन",
        "unit": "Unit V: Mensuration",
        "unitKn": "ಘಟಕ ೫: ಕ್ಷೇತ್ರಗಣಿತ",
        "unitHi": "इकाई ۵: क्षेत्रमिति",
        "description": "Surface Area and Volume of Right Circular Cone, Surface Area and Volume of Sphere and Hemisphere.",
        "descriptionKn": "ಲಂಬ ವೃತ್ತಾಕಾರದ ಶಂಕು, ಗೋಳ ಮತ್ತು ಅರ್ಧಗೋಳದ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಘನಫಲ.",
        "descriptionHi": "लंब वृत्तीय शंकु, गोला और अर्धगोला का पृष्ठीಯ क्षेत्रफल एवं आयतन।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Cone: CSA = πrl (l = √(r²+h²)), TSA = πr(l + r), Vol = 1/3 πr²h",
          "Sphere: SA = 4πr², Vol = 4/3 πr³",
          "Hemisphere: CSA = 2πr², TSA = 3πr², Vol = 2/3 πr³"
        ],
        "subtopics": [
          {
            "id": "m9-11-01",
            "title": "Surface Area & Volume of Right Circular Cone",
            "titleKn": "ಶಂಕುವಿನ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಘನಫಲ",
            "titleHi": "शंकु का वक्र पृष्ठीय क्षेत्रफल, कुल पृष्ठीय क्षेत्रफल और आयतन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m9-11-02",
            "title": "Surface Area & Volume of Sphere and Hemisphere",
            "titleKn": "ಗೋಳ ಮತ್ತು ಅರ್ಧಗೋಳದ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ & ಘನಫಲ",
            "titleHi": "गोले और अर्धगोले का पृष्ठीय क्षेत्रफल और आयतन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m9-11-03",
            "title": "NCERT 11.1, 11.2, 11.3 & 11.4 Comprehensive Practical Drills",
            "titleKn": "ಎನ್‌ಸಿಇಆರ್‌ಟಿ ೧೧ ನೇ ಅಧ್ಯಾಯದ ಲೆಕ್ಕಗಳು",
            "titleHi": "NCERT 11 के सभी अभ्यासों का गहन हल",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m9-12",
        "chapterNumber": 12,
        "title": "Statistics",
        "titleKn": "ಸಂಖ್ಯಾಶಾಸ್ತ್ರ (Statistics)",
        "titleHi": "सांख्यिकी (Statistics)",
        "unit": "Unit VI: Statistics",
        "unitKn": "ಘಟಕ ೬: ಸಂಖ್ಯಾಶಾಸ್ತ್ರ",
        "unitHi": "इकाई ६: सांख्यिकी",
        "description": "Bar Graphs, Histograms (with Varying Base Lengths), Frequency Polygons.",
        "descriptionKn": "ದಂಡ ನಕ್ಷೆಗಳು, ಆಯತಚಿತ್ರಗಳು (ವಿವಿಧ ಅಗಲಗಳ ತಳಹದಿ) ಮತ್ತು ಆವರ್ತಿ ಬಹುಭುಜಗಳು.",
        "descriptionHi": "दंड आलेख, आयत चित्र (समान व असमान चौड़ाई वाले) और बारंबारता बहुभुज।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Adjusted frequency for histogram with unequal widths = (Frequency / Width of class) × (Minimum class width)",
          "Frequency polygon midpoints: (Lower limit + Upper limit) / 2"
        ],
        "subtopics": [
          {
            "id": "m9-12-01",
            "title": "Bar Graphs & Grouped Frequency Tables Review",
            "titleKn": "ದಂಡ ನಕ್ಷೆಗಳು ಮತ್ತು ಆವರ್ತಿ ಕೋಷ್ಟಕ",
            "titleHi": "दंड आलेख और वर्गीकृत बारंबारता सारणी",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "m9-12-02",
            "title": "Histograms with Equal & Varying Class Widths",
            "titleKn": "ಆಯತಚಿತ್ರಗಳ ರಚನೆ (ಸಮಾನ & ಅಸಮಾನ ವರ್ಗಾಂತರ)",
            "titleHi": "समान और असमान वर्ग अंतराल वाले आयत चित्र",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m9-12-03",
            "title": "Constructing Frequency Polygons with and without Histograms",
            "titleKn": "ಆವರ್ತಿ ಬಹುಭುಜಾಕೃತಿಗಳ ರಚನೆ",
            "titleHi": "बारंबारता बहुभुज का निर्माण (आयत चित्र सहित व बिना)",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c9-sci",
    "name": "Science & Physics",
    "nameKn": "ವಿಜ್ಞಾನ (Science)",
    "nameHi": "विज्ञान (Science)",
    "classGrade": "Class 9",
    "icon": "Atom",
    "color": "#059669",
    "badgeBg": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "borderColor": "border-emerald-500",
    "chapters": [
      {
        "id": "s9-01",
        "chapterNumber": 1,
        "title": "Matter in Our Surroundings",
        "titleKn": "ನಮ್ಮ ಸುತ್ತಮುತ್ತಲಿನ ದ್ರವ್ಯ",
        "titleHi": "हमारे आस-पास के पदार्थ",
        "unit": "Unit I: Matter - Its Nature & Behaviour",
        "unitKn": "ಘಟಕ ೧: ದ್ರವ್ಯ - ಸ್ವಭಾವ & ವರ್ತನೆ",
        "unitHi": "इकाई १: पदार्थ - प्रकृति एवं व्यवहार",
        "description": "Physical Nature of Matter, Characteristics of Particles, States of Matter (Solid, Liquid, Gas), Change of State (Melting, Boiling, Sublimation, Evaporation), Factors Affecting Evaporation & Latent Heat.",
        "descriptionKn": "ದ್ರವ್ಯದ ಭೌತಿಕ ಸ್ವರೂಪ, ದ್ರವ್ಯದ ಸ್ಥಿತಿಗಳು, ಸ್ಥಿತ್ಯಂತರ, ಸುಪ್ತೋಷ್ಣ ಮತ್ತು ಬಾಷ್ಪೀಭವನ.",
        "descriptionHi": "पदार्थ के कणों के अभिलाक्षणिक गुण, पदार्थ की अवस्थाएँ (ठोस, द्रव, गैस), अवस्था परिवर्तन, गुप्त ऊष्मा और वाष्पीकरण को प्रभावित करने वाले कारक।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Temperature: K = °C + 273.15",
          "Latent Heat of Fusion & Vaporization",
          "Rate of Evaporation ∝ Surface area, Temp, Wind speed; ∝ 1/Humidity"
        ],
        "subtopics": [
          {
            "id": "s9-01-01",
            "title": "Characteristics of Particles of Matter & 3 States Comparison",
            "titleKn": "ದ್ರವ್ಯದ ಕಣಗಳ ಲಕ್ಷಣಗಳು & ಮೂರು ಸ್ಥಿತಿಗಳ ಹೋಲಿಕೆ",
            "titleHi": "पदार्थ के कणों के गुण और तीनों अवस्थाओं की तुलना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s9-01-02",
            "title": "Effect of Temperature & Pressure (Melting, Boiling, Sublimation, Dry Ice)",
            "titleKn": "ತಾಪಮಾನ ಮತ್ತು ಒತ್ತಡದ ಪರಿಣಾಮ",
            "titleHi": "तापमान व दाब परिवर्तन का प्रभाव (उर्ध्वपातन व शुष्क बर्फ)",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-01-03",
            "title": "Latent Heat of Fusion & Latent Heat of Vaporization",
            "titleKn": "ಸಮ್ಮಿಳನದ ಸುಪ್ತೋಷ್ಣ ಮತ್ತು ಬಾಷ್ಪೀಕರಣದ ಸುಪ್ತೋಷ್ಣ",
            "titleHi": "संगलन की गुप्त ऊष्मा और वाष्पीकरण की गुप्त ऊष्मा",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-01-04",
            "title": "Evaporation, Cooling Effect (Earthen Pot, Sweating) & Factors",
            "titleKn": "ಬಾಷ್ಪೀಭವನ ಮತ್ತು ತಂಪಾಗಿಸುವ ಪರಿಣಾಮ",
            "titleHi": "वाष्पीकरण और शीतलन प्रभाव के कारण",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s9-02",
        "chapterNumber": 2,
        "title": "Is Matter Around Us Pure?",
        "titleKn": "ನಮ್ಮ ಸುತ್ತಲಿನ ದ್ರವ್ಯವು ಶುದ್ಧವೇ?",
        "titleHi": "क्या हमारे आस-पास के पदार्थ शुद्ध हैं?",
        "unit": "Unit I: Matter - Its Nature & Behaviour",
        "unitKn": "ಘಟಕ ೧: ದ್ರವ್ಯ - ಸ್ವಭಾವ & ವರ್ತನೆ",
        "unitHi": "इकाई १: पदार्थ - प्रकृति एवं व्यवहार",
        "description": "Mixtures (Homogeneous & Heterogeneous), Solutions, Suspension, Colloidal Solutions, Tyndall Effect, Physical vs Chemical Changes, Elements & Compounds.",
        "descriptionKn": "ಮಿಶ್ರಣಗಳು, ದ್ರಾವಣ, ನಿಲಂಬನ, ಕಲಿಲ ದ್ರಾವಣ, ಟಿಂಡಾಲ್ ಪರಿಣಾಮ, ಭೌತ ಮತ್ತು ರಾಸಾಯನಿಕ ಬದಲಾವಣೆಗಳು, ಮೂಲಧಾತುಗಳು ಮತ್ತು ಸಂಯುಕ್ತಗಳು.",
        "descriptionHi": "मिश्रण (समांगी व विषमांगी), विलयन, निलंबन, कोलाइडल विलयन, टिंडल प्रभाव, भौतिक व रासायनिक परिवर्तन, तत्व और यौगिक।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Concentration of Solution = (Mass of Solute / Mass of Solution) × 100",
          "True Solution (<1 nm), Colloid (1-1000 nm), Suspension (>1000 nm)"
        ],
        "subtopics": [
          {
            "id": "s9-02-01",
            "title": "Pure Substances vs Mixtures & Types of Mixtures",
            "titleKn": "ಶುದ್ಧ ವಸ್ತುಗಳು vs ಮಿಶ್ರಣಗಳು",
            "titleHi": "शुद्ध पदार्थ बनाम मिश्रण और मिश्रण के प्रकार",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s9-02-02",
            "title": "True Solution, Suspension & Colloids Comparison with Tyndall Effect",
            "titleKn": "ದ್ರಾವಣ, ನಿಲಂಬನ, ಕಲಿಲ ಮತ್ತು ಟಿಂಡಾಲ್ ಪರಿಣಾಮ",
            "titleHi": "विलयन, निलंबन और कोलाइड की तुलना तथा टिंडल प्रभाव",
            "type": "Experiment & Practical",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s9-02-03",
            "title": "Mass by Mass & Mass by Volume Percentage Concentration Numericals",
            "titleKn": "ದ್ರಾವಣದ ಸಾಂದ್ರತೆಯ ಲೆಕ್ಕಾಚಾರಗಳು",
            "titleHi": "विलयन की सांद्रता (द्रव्यमान प्रतिशत) पर आधारित आंकिक प्रश्न",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-02-04",
            "title": "Physical vs Chemical Changes, Elements and Compounds Classification",
            "titleKn": "ಭೌತ ಮತ್ತು ರಾಸಾಯನಿಕ ಬದಲಾವಣೆಗಳು, ಧಾತುಗಳು & ಸಂಯುಕ್ತಗಳು",
            "titleHi": "भौतिक व रासायनिक परिवर्तन, तत्व (धातु, अधातु, उपधातु) और यौगिक",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s9-03",
        "chapterNumber": 3,
        "title": "Atoms and Molecules",
        "titleKn": "ಪರಮಾಣುಗಳು ಮತ್ತು ಅಣುಗಳು",
        "titleHi": "परमाणु एवं अणु",
        "unit": "Unit I: Matter - Its Nature & Behaviour",
        "unitKn": "ಘಟಕ ೧: ದ್ರವ್ಯ - ಸ್ವಭಾವ & ವರ್ತನೆ",
        "unitHi": "इकाई १: पदार्थ - प्रकृति एवं व्यवहार",
        "description": "Laws of Chemical Combination (Conservation of Mass, Constant Proportions), Dalton's Atomic Theory, Atomic Mass, Molecules, Chemical Formula Writing (Criss-Cross Method), Molecular Mass & Formula Unit Mass.",
        "descriptionKn": "ರಾಸಾಯನಿಕ ಸಂಯೋಗದ ನಿಯಮಗಳು, ಡಾಲ್ಟನ್‌ನ ಪರಮಾಣು ಸಿದ್ಧಾಂತ, ಪರಮಾಣು ತೂಕ, ಅಣು ಸೂತ್ರ ಬರೆಯುವುದು ಮತ್ತು ಅಣುತೂಕ.",
        "descriptionHi": "रासायनिक संयोजन के नियम (द्रव्यमान संरक्षण, स्थिर अनुपात का नियम), डाल्टन का परमाणु सिद्धांत, रासायनिक सूत्र लेखन (क्रिस-क्रॉस विधि) और आणविक द्रव्यमान।",
        "status": "In Progress",
        "completionPercent": 75,
        "totalPeriods": 10,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Law of Constant Proportions (Proust): In a chemical substance elements are present in definite proportions by mass",
          "Molecular mass = Sum of atomic masses of all atoms"
        ],
        "subtopics": [
          {
            "id": "s9-03-01",
            "title": "Laws of Chemical Combination & Dalton's Atomic Theory Postulates",
            "titleKn": "ರಾಸಾಯನಿಕ ಸಂಯೋಗದ ನಿಯಮಗಳು ಮತ್ತು ಡಾಲ್ಟನ್ ಸಿದ್ಧಾಂತ",
            "titleHi": "रासायनिक संयोजन के नियम और डाल्टन का परमाणु सिद्धांत",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-03-02",
            "title": "Atomic Mass Unit (amu / u) & Modern Symbols of Elements",
            "titleKn": "ಪರಮಾಣು ತೂಕದ ಮಾನದಂಡ ಮತ್ತು ಸಂಕೇತಗಳು",
            "titleHi": "परमाणु द्रव्यमान इकाई (u) और तत्वों के आधुनिक प्रतीक",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s9-03-03",
            "title": "Writing Chemical Formulae using Valency (Criss-Cross Method)",
            "titleKn": "ವೇಲೆನ್ಸಿ ಬಳಸಿ ರಾಸಾಯನಿಕ ಸೂತ್ರಗಳನ್ನು ಬರೆಯುವುದು",
            "titleHi": "संयोजकता और क्रिस-क्रॉस विधि द्वारा रासायनिक सूत्र लिखना",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "s9-03-04",
            "title": "Calculating Molecular Mass & Formula Unit Mass Numericals",
            "titleKn": "ಅಣುತೂಕ ಮತ್ತು ಸೂತ್ರ ತೂಕದ ಲೆಕ್ಕಗಳು",
            "titleHi": "आणविक द्रव्यमान और सूत्र इकाई द्रव्यमान की गणना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s9-04",
        "chapterNumber": 4,
        "title": "Structure of the Atom",
        "titleKn": "ಪರಮಾಣುವಿನ ರಚನೆ (Structure of Atom)",
        "titleHi": "परमाणु की संरचना",
        "unit": "Unit I: Matter - Its Nature & Behaviour",
        "unitKn": "ಘಟಕ ೧: ದ್ರವ್ಯ - ಸ್ವಭಾವ & ವರ್ತನೆ",
        "unitHi": "इकाई १: पदार्थ - प्रकृति एवं व्यवहार",
        "description": "Discovery of Electrons (Thomson), Protons (Goldstein) and Neutrons (Chadwick), Thomson's Model, Rutherford's α-Particle Scattering Experiment & Nuclear Model, Bohr's Model of Atom, Electronic Configuration (Bohr-Bury Scheme), Valency, Atomic Number (Z), Mass Number (A), Isotopes & Isobars.",
        "descriptionKn": "ಥಾಮ್ಸನ್ ಮಾದರಿ, ರುದರ್‌ಫೋರ್ಡ್‌ನ ಆಲ್ಫಾ ಕಣ ಚದುರುವಿಕೆ ಪ್ರಯೋಗ, ಬೋರ್‌ನ ಪರಮಾಣು ಮಾದರಿ, ಎಲೆಕ್ಟ್ರಾನ್ ವಿನ್ಯಾಸ, ಐಸೋಟೋಪುಗಳು ಮತ್ತು ಐಸೋಬಾರ್‌ಗಳು.",
        "descriptionHi": "इलेक्ट्रॉन, प्रोटॉन व न्यूट्रॉन की खोज, थॉमसन मॉडल, रदरफोर्ड का अल्फा कण प्रकीर्णन प्रयोग, बोर का परमाणु मॉडल, बोर-बरी नियम, संयोजकता, परमाणु संख्या, द्रव्यमान संख्या, समस्थानिक व समभारिक।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 10,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Max electrons in shell = 2n² (K=2, L=8, M=18, N=32)",
          "Mass Number (A) = Protons (Z) + Neutrons (n)",
          "Isotopes: Same Z, different A (e.g. 1H1, 1H2, 1H3)"
        ],
        "subtopics": [
          {
            "id": "s9-04-01",
            "title": "Subatomic Particles & Thomson's Plum Pudding Model",
            "titleKn": "ಉಪಪರಮಾಣು ಕಣಗಳು ಮತ್ತು ಥಾಮ್ಸನ್ ಮಾದರಿ",
            "titleHi": "अपरमाणुक कण (इलेक्ट्रॉन, प्रोटॉन, न्यूट्रॉन) और थॉमसन मॉडल",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s9-04-02",
            "title": "Rutherford's α-Particle Scattering Experiment & Nuclear Model",
            "titleKn": "ರುದರ್‌ಫೋರ್ಡ್‌ನ ಆಲ್ಫಾ ಕಣ ಪ್ರಯೋಗ & ನ್ಯೂಕ್ಲಿಯರ್ ಮಾದರಿ",
            "titleHi": "रदरफोर्ड का प्रकीर्णन प्रयोग, निष्कर्ष और कमियां",
            "type": "Experiment & Practical",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s9-04-03",
            "title": "Bohr's Model of Atom & Bohr-Bury Shell Distribution (2n²)",
            "titleKn": "ಬೋರ್‌ನ ಪರಮಾಣು ಮಾದರಿ ಮತ್ತು 2n² ಎಲೆಕ್ಟ್ರಾನ್ ಹಂಚಿಕೆ",
            "titleHi": "बोर का मॉडल और ऊर्जा स्तर (K, L, M, N)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-04-04",
            "title": "Valency, Atomic Number, Mass Number, Isotopes & Isobars",
            "titleKn": "ವೇಲೆನ್ಸಿ, ಪರಮಾಣು ಸಂಖ್ಯೆ, ಐಸೋಟೋಪುಗಳು ಮತ್ತು ಐಸೋಬಾರ್‌ಗಳು",
            "titleHi": "संयोजकता, परमाणु संख्या, द्रव्यमान संख्या, समस्थानिक व समभारिक",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s9-05",
        "chapterNumber": 5,
        "title": "The Fundamental Unit of Life",
        "titleKn": "ಜೀವದ ಮೂಲಭೂತ ಘಟಕ (Cell)",
        "titleHi": "जीवन की मौलिक इकाई (Cell)",
        "unit": "Unit II: Organization in Living World",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚದ ಸಂಘಟನೆ",
        "unitHi": "इकाई २: सजीव जगत में संगठन (जीव विज्ञान)",
        "description": "Cell as Basic Unit of Life, Prokaryotic vs Eukaryotic Cells, Plant Cell vs Animal Cell, Cell Membrane (Fluid Mosaic Model, Osmosis, Hypotonic/Isotonic/Hypertonic), Cell Wall, Nucleus (Chromosomes, DNA, Genes), Cytoplasm & Cell Organelles (ER, Golgi, Lysosomes, Mitochondria, Plastids, Vacuoles).",
        "descriptionKn": "ಕೋಶ ಜೀವದ ಮೂಲಭೂತ ಘಟಕ, ಪ್ರೊಕ್ಯಾರಿಯೋಟಿಕ್ vs ಯೂಕ್ಯಾರಿಯೋಟಿಕ್, ಸಸ್ಯ ಕೋಶ vs ಪ್ರಾಣಿ ಕೋಶ, ಆಸ್ಮಾಸಿಸ್, ಕೋಶದ ಕಣದಂಗಗಳು (ಮೈಟೋಕಾಂಡ್ರಿಯಾ, ಗಾಲ್ಗಿ ಸಂಕೀರ್ಣ, ಲೈಸೋಸೋಮ್).",
        "descriptionHi": "कोशिका सिद्धांत, प्रोकैरियोटिक व यूकैरियोटिक कोशिकाएं, पादप व जंतु कोशिका, कोशिका झिल्ली, परासरण (अल्पपरासरी, समपरासरी, अतिपरासरी), केंद्रक और कोशिकांग (माइटोकॉन्ड्रिया, गॉल्जी उपकरण, लाइसोसोम, लवक, रसधानी)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 10,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Mitochondria = Powerhouse of the Cell (Generates ATP)",
          "Lysosomes = Suicidal Bags",
          "Plastids: Chloroplast (Photosynthesis), Chromoplast (Colour), Leucoplast (Storage)"
        ],
        "subtopics": [
          {
            "id": "s9-05-01",
            "title": "Discovery of Cell (Robert Hooke) & Microscopic Observation of Onion Peel",
            "titleKn": "ಕೋಶದ ಆವಿಷ್ಕಾರ ಮತ್ತು ನೀರುಳ್ಳಿ ಸಿಪ್ಪೆಯ ಪರೀಕ್ಷೆ",
            "titleHi": "कोशिका की खोज और प्याज की झिल्ली का सूक्ष्मदर्शी अध्ययन",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-05-02",
            "title": "Plasma Membrane, Diffusion, Osmosis & Hypo/Hypertonic Solutions",
            "titleKn": "ಕೋಶಪೊರೆ, ವಿಸರಣ ಮತ್ತು ಆಸ್ಮಾಸಿಸ್",
            "titleHi": "प्लाज्मा झिल्ली, विसरण, परासरण और घोल के प्रकार",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s9-05-03",
            "title": "Nucleus, Chromosomes, DNA & Prokaryotic vs Eukaryotic Cells",
            "titleKn": "ಕೋಶಕೇಂದ್ರ ಮತ್ತು ಪ್ರೊಕ್ಯಾರಿಯೋಟಿಕ್-ಯೂಕ್ಯಾರಿಯೋಟಿಕ್ ಕೋಶಗಳು",
            "titleHi": "केंद्रक, क्रोमैटिन, DNA और प्रोकैरियोटिक बनाम यूकैरियोटिक",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-05-04",
            "title": "Cell Organelles: ER, Golgi Apparatus, Lysosomes, Mitochondria, Plastids, Vacuoles",
            "titleKn": "ಕೋಶದ ಕಣದಂಗಗಳ ರಚನೆ ಮತ್ತು ಕಾರ್ಯಗಳು",
            "titleHi": "कोशिकांगों (माइटोकॉन्ड्रिया, लवक, रसधानी आदि) के कार्य",
            "type": "Board Exam Important",
            "estimatedMinutes": 60,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s9-06",
        "chapterNumber": 6,
        "title": "Tissues",
        "titleKn": "ಅಂಗಾಂಶಗಳು (Tissues)",
        "titleHi": "ऊतक (Tissues)",
        "unit": "Unit II: Organization in Living World",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚದ ಸಂಘಟನೆ",
        "unitHi": "इकाई २: सजीव जगत में संगठन (जीव विज्ञान)",
        "description": "Plant Tissues (Meristematic: Apical, Intercalary, Lateral; Permanent: Simple - Parenchyma, Collenchyma, Sclerenchyma; Complex - Xylem, Phloem), Animal Tissues (Epithelial, Connective - Blood, Bone, Cartilage, Ligament, Tendon, Areolar, Adipose; Muscular - Striated, Unstriated, Cardiac; Nervous Tissue - Neuron).",
        "descriptionKn": "ಸಸ್ಯ ಅಂಗಾಂಶಗಳು (ವರ್ಧನ ಅಂಗಾಂಶ, ಸರಳ ಮತ್ತು ಸಂಕೀರ್ಣ ಕಾಯಂ ಅಂಗಾಂಶ), ಪ್ರಾಣಿ ಅಂಗಾಂಶಗಳು (ಉಪಕಲಾ, ಸಂಯೋಜಕ, ಸ್ನಾಯು, ನರ ಅಂಗಾಂಶ).",
        "descriptionHi": "पादप ऊतक (विभज्योतक: शीर्षस्थ, अंतर्विष्ट, पार्श्व; स्थायी: सरल - पैरेन्काइमा, कॉलेन्काइमा, स्क्लेरेन्काइमा; जटिल - जाइलम, फ्लोएम), जंतु ऊतक (उपकला, संयोजी, पेशीय, तंत्रिका ऊतक)।",
        "status": "In Progress",
        "completionPercent": 65,
        "totalPeriods": 10,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Xylem: Vessels, Tracheids, Xylem parenchyma, Xylem fibres (Unidirectional water transport)",
          "Phloem: Sieve tubes, Companion cells, Phloem parenchyma, Phloem fibres (Bidirectional food transport)"
        ],
        "subtopics": [
          {
            "id": "s9-06-01",
            "title": "Plant Meristematic Tissues (Apical, Lateral, Intercalary Meristem)",
            "titleKn": "ಸಸ್ಯ ವರ್ಧನ ಅಂಗಾಂಶಗಳು",
            "titleHi": "पादप विभज्योतक ऊतक (शीर्षस्थ, पार्श्व, अंतर्विष्ट)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s9-06-02",
            "title": "Simple Permanent Tissues (Parenchyma, Collenchyma, Sclerenchyma)",
            "titleKn": "ಸರಳ ಕಾಯಂ ಅಂಗಾಂಶಗಳು (ಪ್ಯಾರೆಂಖೈಮಾ, ಸ್ಕ್ಲೀರೆಂಖೈಮಾ)",
            "titleHi": "सरल स्थायी ऊतक (पैरेन्काइमा, कॉलेन्काइमा, स्क्लेरेन्काइमा)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-06-03",
            "title": "Complex Permanent Tissues: Xylem and Phloem Elements",
            "titleKn": "ಸಂಕೀರ್ಣ ಕಾಯಂ ಅಂಗಾಂಶಗಳು: ಜೈಲಂ ಮತ್ತು ಫ್ಲೋಯಂ",
            "titleHi": "जटिल स्थायी ऊतक: जाइलम और फ्लोएम के घटक व कार्य",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s9-06-04",
            "title": "Animal Tissues: Epithelial, Connective (Blood/Bone), Muscular & Nervous",
            "titleKn": "ಪ್ರಾಣಿ ಅಂಗಾಂಶಗಳು: ಸಂಯೋಜಕ, ಸ್ನಾಯು ಮತ್ತು ನರ ಅಂಗಾಂಶ",
            "titleHi": "जंतु ऊतक: उपकला, संयोजी (रक्त, अस्थि), पेशीय और तंत्रिका ऊतक",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s9-07",
        "chapterNumber": 7,
        "title": "Motion",
        "titleKn": "ಚಲನೆ (Motion - Physics)",
        "titleHi": "गति (Motion - Physics)",
        "unit": "Unit III: Motion, Force & Work",
        "unitKn": "ಘಟಕ ೩: ಚಲನೆ, ಬಲ & ಕೆಲಸ",
        "unitHi": "इकाई ३: गति, बल तथा कार्य (भौतिक विज्ञान)",
        "description": "Distance and Displacement, Speed and Velocity, Uniform and Non-uniform Motion along a Straight Line, Acceleration, Distance-Time and Velocity-Time Graphs, Three Equations of Motion by Graphical Method, Uniform Circular Motion.",
        "descriptionKn": "ದೂರ ಮತ್ತು ಸ್ಥಾನಪಲ್ಲಟ, ಜವ ಮತ್ತು ವೇಗ, ವೇಗೋತ್ಕರ್ಷ, ಚಲನೆಯ ನಕ್ಷೆಗಳು, ನಕ್ಷಾ ವಿಧಾನದಿಂದ ಚಲನೆಯ ೩ ಸಮೀಕರಣಗಳ ಸಾಧನೆ, ಏಕರೂಪ ವೃತ್ತೀಯ ಚಲನೆ.",
        "descriptionHi": "दूरी और विस्थापन, चाल और वेग, एकसमान व असमान गति, त्वरण, दूरी-समय व वेग-समय ग्राफ, ग्राफीय विधि द्वारा गति के 3 समीकरणों का निगमन, एकसमान वृत्तीय गति।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 11,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "1st equation: v = u + at",
          "2nd equation: s = ut + 1/2 at²",
          "3rd equation: v² = u² + 2as",
          "Circular speed: v = 2πr / t"
        ],
        "subtopics": [
          {
            "id": "s9-07-01",
            "title": "Distance vs Displacement & Speed vs Velocity Scalar/Vector",
            "titleKn": "ದೂರ vs ಸ್ಥಾನಪಲ್ಲಟ & ಜವ vs ವೇಗ",
            "titleHi": "दूरी बनाम विस्थापन, चाल बनाम वेग (अदिश व सदिश राशियां)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-07-02",
            "title": "Uniform / Non-Uniform Acceleration & Distance-Time / Velocity-Time Graphs",
            "titleKn": "ವೇಗೋತ್ಕರ್ಷ ಮತ್ತು ಚಲನೆಯ ನಕ್ಷೆಗಳು",
            "titleHi": "त्वरण और दूरी-समय तथा वेग-समय ग्राफ का विश्लेषण",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s9-07-03",
            "title": "Derivation of Three Equations of Motion using Graphical Method",
            "titleKn": "ನಕ್ಷಾ ವಿಧಾನದಿಂದ ಚಲನೆಯ ೩ ಸಮೀಕರಣಗಳ ಸಾಧನೆ",
            "titleHi": "ग्राफीय विधि से गति के 3 समीकरणों का निगमन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 60,
            "isCompleted": true
          },
          {
            "id": "s9-07-04",
            "title": "Uniform Circular Motion & NCERT Numerical Problem Solving",
            "titleKn": "ಏಕರೂಪ ವೃತ್ತೀಯ ಚಲನೆ & ಸಂಖ್ಯಾತ್ಮಕ ಲೆಕ್ಕಗಳು",
            "titleHi": "एकसमान वृत्तीय गति और आंकिक प्रश्नों का गहन अभ्यास",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 55,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s9-08",
        "chapterNumber": 8,
        "title": "Force and Laws of Motion",
        "titleKn": "ಬಲ ಮತ್ತು ಚಲನೆಯ ನಿಯಮಗಳು",
        "titleHi": "बल तथा गति के नियम",
        "unit": "Unit III: Motion, Force & Work",
        "unitKn": "ಘಟಕ ೩: ಚಲನೆ, ಬಲ & ಕೆಲಸ",
        "unitHi": "इकाई ३: गति, बल तथा कार्य (भौतिक विज्ञान)",
        "description": "Balanced and Unbalanced Forces, First Law of Motion (Inertia & Mass), Second Law of Motion (F = ma, Momentum p = mv), Third Law of Motion (Action and Reaction), Conservation of Momentum.",
        "descriptionKn": "ಸರಿದೂಗಿಸಿದ-ಸರಿದೂಗದ ಬಲಗಳು, ನ್ಯೂಟನ್‌ನ ೧ ನೇ ನಿಯಮ (ಜಡತ್ವ), ೨ ನೇ ನಿಯಮ (F = ma, ಸಂವೇಗ), ೩ ನೇ ನಿಯಮ (ಕ್ರಿಯೆ-ಪ್ರತಿಕ್ರಿಯೆ), ಸಂವೇಗ ಸಂರಕ್ಷಣಾ ನಿಯಮ.",
        "descriptionHi": "संतुलित व असंतुलित बल, गति का पहला नियम (जड़त्व व द्रव्यमान), दूसरा नियम (F = ma, संवेग p = mv), तीसरा नियम (क्रिया और प्रतिक्रिया), संवेग संरक्षण का नियम।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Momentum: p = m × v",
          "Newton's 2nd Law: F = m(v - u)/t = m × a",
          "Conservation of Momentum: m1u1 + m2u2 = m1v1 + m2v2",
          "Recoil velocity of gun: v = -(m × v_bullet) / M_gun"
        ],
        "subtopics": [
          {
            "id": "s9-08-01",
            "title": "Balanced vs Unbalanced Forces & Galileo's Concept of Inertia",
            "titleKn": "ಬಲದ ಪರಿಕಲ್ಪನೆ & ಗೆಲಿಲಿಯೋನ ಜಡತ್ವ ತತ್ವ",
            "titleHi": "संतुलित और असंतुलित बल तथा गैलीलियो का विचार",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s9-08-02",
            "title": "Newton's 1st Law of Motion & Inertia of Rest, Motion, Direction",
            "titleKn": "ನ್ಯೂಟನ್‌ನ ೧ ನೇ ಚಲನೆಯ ನಿಯಮ ಮತ್ತು ಜಡತ್ವದ ವಿಧಗಳು",
            "titleHi": "गति का प्रथम नियम और जड़त्व के प्रकार",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s9-08-03",
            "title": "Newton's 2nd Law of Motion: Mathematical Formulation F = ma",
            "titleKn": "ನ್ಯೂಟನ್‌ನ ೨ ನೇ ನಿಯಮ: F = ma ಸೂತ್ರದ ಸಾಧನೆ",
            "titleHi": "गति का द्वितीय नियम: F = ma का गणितीय निगमन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "s9-08-04",
            "title": "Newton's 3rd Law of Motion & Conservation of Momentum Numericals",
            "titleKn": "೩ ನೇ ನಿಯಮ & ಸಂವೇಗ ಸಂರಕ್ಷಣೆಯ ಲೆಕ್ಕಗಳು",
            "titleHi": "गति का तृतीय नियम और संवेग संरक्षण पर आंकिक प्रश्न",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s9-09",
        "chapterNumber": 9,
        "title": "Gravitation",
        "titleKn": "ಗುರುತ್ವ (Gravitation - Physics)",
        "titleHi": "गुरुत्वाकर्षण (Gravitation - Physics)",
        "unit": "Unit III: Motion, Force & Work",
        "unitKn": "ಘಟಕ ೩: ಚಲನೆ, ಬಲ & ಕೆಲಸ",
        "unitHi": "इकाई ३: गति, बल तथा कार्य (भौतिक विज्ञान)",
        "description": "Universal Law of Gravitation, Gravitational Constant (G), Free Fall, Acceleration due to Gravity (g), Mass vs Weight, Weight of an Object on the Moon, Thrust and Pressure, Buoyancy, Archimedes' Principle, Relative Density.",
        "descriptionKn": "ವಿಶ್ವ ಗುರುತ್ವಾಕರ್ಷಣಾ ನಿಯಮ (G), ಮುಕ್ತ ಪತನ, ಗುರುತ್ವ ವೇಗೋತ್ಕರ್ಷ (g), ರಾಶಿ vs ತೂಕ, ಚಂದ್ರನ ಮೇಲಿನ ತೂಕ, ಒತ್ತಡ, ತೇಲುವಿಕೆ, ಆರ್ಕಿಮಿಡಿಸ್ ತತ್ವ.",
        "descriptionHi": "सार्वत्रिक गुरुत्वाकर्षण नियम (G), मुक्त पतन, गुरुत्वीय त्वरण (g), द्रव्यमान व भार, चंद्रमा पर भार, प्रणोद व दाब, उत्प्लावकता, आर्किमिडीज का सिद्धांत।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Universal Law: F = G × (M × m) / d² (G = 6.67 × 10^-11 N m²/kg²)",
          "Acceleration due to gravity: g = GM / R² ≈ 9.8 m/s²",
          "Weight: W = m × g",
          "Weight on Moon = 1/6 × Weight on Earth",
          "Pressure = Thrust / Area"
        ],
        "subtopics": [
          {
            "id": "s9-09-01",
            "title": "Universal Law of Gravitation Formulation & Significance",
            "titleKn": "ವಿಶ್ವ ಗುರುತ್ವಾಕರ್ಷಣಾ ನಿಯಮ ಮತ್ತು ಪ್ರಾಮುಖ್ಯತೆ",
            "titleHi": "सार्वत्रिक गुरुत्वाकर्षण नियम का गणितीय सूत्र",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s9-09-02",
            "title": "Free Fall, Calculation of Acceleration due to Gravity (g = 9.8 m/s²)",
            "titleKn": "ಮುಕ್ತ ಪತನ ಮತ್ತು ಗುರುತ್ವ ವೇಗೋತ್ಕರ್ಷದ ಲೆಕ್ಕಾಚಾರ",
            "titleHi": "मुक्त पतन और गुरुत्वीय त्वरण (g) की गणना",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s9-09-03",
            "title": "Mass vs Weight & Weight on the Moon (1/6th Earth Weight)",
            "titleKn": "ರಾಶಿ vs ತೂಕ ಮತ್ತು ಚಂದ್ರನ ಮೇಲಿನ ತೂಕ",
            "titleHi": "द्रव्यमान बनाम भार और चंद्रमा पर वस्तु का भार",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s9-09-04",
            "title": "Thrust, Pressure, Buoyancy & Archimedes' Principle",
            "titleKn": "ಒತ್ತಡ, ಪ್ಲವನತೆ ಮತ್ತು ಆರ್ಕಿಮಿಡೀಸ್ ತತ್ವ",
            "titleHi": "प्रणोद, दाब, उत्प्लावन बल और आर्किमिडीज का सिद्धांत",
            "type": "Experiment & Practical",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s9-10",
        "chapterNumber": 10,
        "title": "Work and Energy",
        "titleKn": "ಕೆಲಸ ಮತ್ತು ಶಕ್ತಿ (Work and Energy)",
        "titleHi": "कार्य तथा ऊर्जा (Work and Energy)",
        "unit": "Unit III: Motion, Force & Work",
        "unitKn": "ಘಟಕ ೩: ಚಲನೆ, ಬಲ & ಕೆಲಸ",
        "unitHi": "इकाई ३: गति, बल तथा कार्य (भौतिक विज्ञान)",
        "description": "Scientific Concept of Work, Positive/Negative/Zero Work, Energy, Forms of Energy (Kinetic Energy Ek = 1/2 mv², Potential Energy Ep = mgh), Law of Conservation of Energy, Power (P = W/t, Watt), Commercial Unit of Energy (kWh).",
        "descriptionKn": "ಕೆಲಸದ ವೈಜ್ಞಾನಿಕ ಪರಿಕಲ್ಪನೆ, ಚಲನ ಶಕ್ತಿ, ಪ್ರಚ್ಛನ್ನ ಶಕ್ತಿ, ಶಕ್ತಿ ಸಂರಕ್ಷಣಾ ನಿಯಮ, ಸಾಮರ್ಥ್ಯ (ವ್ಯಾಟ್) ಮತ್ತು ವಾಣಿಜ್ಯ ಯುನಿಟ್ (kWh).",
        "descriptionHi": "कार्य की वैज्ञानिक संकल्पना, गतिज ऊर्जा (Ek = 1/2 mv²), स्थितिज ऊर्जा (Ep = mgh), ऊर्जा संरक्षण का नियम, शक्ति (P = W/t, वाट) और 1 kWh यूनिट।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Work: W = F × s × cos(θ)",
          "Kinetic Energy: Ek = 1/2 m v²",
          "Potential Energy: Ep = m g h",
          "Total Mechanical Energy = Ek + Ep = Constant",
          "Power: P = Work / Time = Energy / Time (Watts)"
        ],
        "subtopics": [
          {
            "id": "s9-10-01",
            "title": "Scientific Definition of Work & Positive/Negative/Zero Work Examples",
            "titleKn": "ಕೆಲಸದ ವ್ಯಾಖ್ಯೆ ಮತ್ತು ಧನ/ಋಣ/ಶೂನ್ಯ ಕೆಲಸ",
            "titleHi": "कार्य की वैज्ञानिक परिभाषा और धनात्मक/ऋणात्मक/शून्य कार्य",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s9-01-02",
            "title": "Kinetic Energy Derivation (Ek = 1/2 mv²) with Numerical Practice",
            "titleKn": "ಚಲನ ಶಕ್ತಿಯ ಸೂತ್ರದ ಸಾಧನೆ",
            "titleHi": "गतिज ऊर्जा के सूत्र (1/2 mv²) का निगमन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s9-10-03",
            "title": "Gravitational Potential Energy Derivation (Ep = mgh)",
            "titleKn": "ಪ್ರಚ್ಛನ್ನ ಶಕ್ತಿಯ ಸೂತ್ರದ ಸಾಧನೆ",
            "titleHi": "गुरुत्वीय स्थितिज ऊर्जा के सूत्र (mgh) का निगमन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s9-10-04",
            "title": "Law of Conservation of Energy (Free Falling Body) & Power Numericals",
            "titleKn": "ಶಕ್ತಿ ಸಂರಕ್ಷಣಾ ನಿಯಮ & ಸಾಮರ್ಥ್ಯದ ಲೆಕ್ಕಗಳು",
            "titleHi": "ऊर्जा संरक्षण का नियम और शक्ति (Watt, kWh) के प्रश्न",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s9-11",
        "chapterNumber": 11,
        "title": "Sound",
        "titleKn": "ಧ್ವನಿ (Sound - Physics)",
        "titleHi": "ध्वनि (Sound - Physics)",
        "unit": "Unit III: Motion, Force & Work",
        "unitKn": "ಘಟಕ ೩: ಚಲನೆ, ಬಲ & ಕೆಲಸ",
        "unitHi": "इकाई ३: गति, बल तथा कार्य (भौतिक विज्ञान)",
        "description": "Production and Propagation of Sound, Longitudinal and Transverse Waves, Compression and Rarefaction, Characteristics of Sound (Wavelength, Frequency, Time Period, Amplitude, Speed v = λν), Speed of Sound in Different Media, Reflection of Sound, Echo (Minimum 17.2m distance), Reverberation, Ultrasound Applications (SONAR, Echocardiography), Structure of Human Ear.",
        "descriptionKn": "ಧ್ವನಿಯ ಉತ್ಪಾದನೆ ಮತ್ತು ಪ್ರಸಾರ, ತರಂಗದ ಲಕ್ಷಣಗಳು (ಆವರ್ತಾಂಕ, ತರಂಗದೂರ v = fλ), ಪ್ರತಿಧ್ವನಿ, ಅಲ್ಟ್ರಾಸೌಂಡ್, ಸೋನಾರ್ ಮತ್ತು ಮಾನವ ಕಿವಿಯ ರಚನೆ.",
        "descriptionHi": "ध्वनि का उत्पादन और संचरण, अनुदैर्ध्य तरंगें (संपीड़न व विरलन), ध्वनि के अभिलक्षण (तरंगदैर्ध्य, आवृत्ति, आयाम, वेग v = λν), प्रतिध्वनि (इको), अनुरणन, पराध्वनि (SONAR) और मानव कान।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Wave Speed Equation: v = ν × λ (Speed = Frequency × Wavelength)",
          "Echo minimum distance in air at 22°C = 17.2 meters",
          "Audible range for humans = 20 Hz to 20,000 Hz",
          "SONAR: 2d = v × t"
        ],
        "subtopics": [
          {
            "id": "s9-11-01",
            "title": "Production of Sound & Propagation via Compressions and Rarefactions",
            "titleKn": "ಧ್ವನಿಯ ಉತ್ಪಾದನೆ ಮತ್ತು ಸಂಕೋಚನ-ವಿಕಾಸನ ಪ್ರಸಾರ",
            "titleHi": "ध्वनि का उत्पादन और संपीडन-विरलन द्वारा संचरण",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s9-11-02",
            "title": "Sound Wave Characteristics: Wavelength, Frequency, Amplitude, Pitch, Timber",
            "titleKn": "ಧ್ವನಿ ತರಂಗದ ಲಕ್ಷಣಗಳು & ಸೂತ್ರ v = νλ",
            "titleHi": "ध्वनि के अभिलक्षण (तरंगदैर्ध्य, आवृत्ति, आयाम, तारत्व)",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s9-11-03",
            "title": "Reflection of Sound, Echo (17.2m threshold) & Reverberation Control",
            "titleKn": "ಧ್ವನಿ ಪ್ರತಿಫಲನ, ಪ್ರತಿಧ್ವನಿ ಮತ್ತು ಅನುರಣನ",
            "titleHi": "ध्वनि का परावर्तन, प्रतिध्वनि (17.2 मी शर्त) और अनुरणन",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s9-11-04",
            "title": "Ultrasound Applications (SONAR calculations, Medical Scans) & Human Ear",
            "titleKn": "ಅಲ್ಟ್ರಾಸೌಂಡ್ ಅನ್ವಯಗಳು, ಸೋನಾರ್ & ಮಾನವ ಕಿವಿ",
            "titleHi": "पराध्वनि के अनुप्रयोग (SONAR) और मानव कान की कार्यप्रणाली",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s9-12",
        "chapterNumber": 12,
        "title": "Improvement in Food Resources",
        "titleKn": "ಆಹಾರ ಸಂಪನ್ಮೂಲಗಳ ಸುಧಾರಣೆ",
        "titleHi": "खाद्य संसाधनों में सुधार",
        "unit": "Unit IV: Food Production",
        "unitKn": "ಘಟಕ ೪: ಆಹಾರ ಉತ್ಪಾದನೆ",
        "unitHi": "इकाई ४: खाद्य उत्पादन (कृषि एवं पशुपालन)",
        "description": "Crop Yield Improvement (Varietal Improvement, Crop Production Management - Nutrients, Manure, Fertilizers, Irrigation, Cropping Patterns: Mixed, Intercropping, Crop Rotation), Crop Protection Management (Weeds, Pests, Storage of Grains), Animal Husbandry (Cattle Farming, Poultry Farming, Egg and Broiler Production, Fish Production / Aquaculture, Bee-keeping / Apiculture).",
        "descriptionKn": "ಬೆಳೆ ಇಳುವರಿ ಸುಧಾರಣೆ, ಸಾವಯವ ಗೊಬ್ಬರ ಮತ್ತು ರಾಸಾಯನಿಕ ಗೊಬ್ಬರಗಳು, ನೀರಾವರಿ, ಬೆಳೆ ರಕ್ಷಣೆ, ಪಶುಸಂಗೋಪನೆ, ಕೋಳಿ ಸಾಕಣೆ, ಮತ್ಸ್ಯೋದ್ಯಮ, ಜೇನುಸಾಕಣೆ.",
        "descriptionHi": "फसल सुधार (किस्म सुधार, पोषक तत्व प्रबंधन, खाद व उर्वरक, सिंचाई, मिश्रित/अंतराफसलीकरण), फसल सुरक्षा (खरपतवार व कीट नियंत्रण), पशुपालन (गाय-भैंस पालन, मुर्गी पालन, मत्स्य पालन, मधुमक्खी पालन)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "16 Essential Nutrients: Macro (N, P, K, Ca, Mg, S) & Micro (Fe, Mn, B, Zn, Cu, Mo, Cl)",
          "Italian bee variety: Apis mellifera for commercial honey production"
        ],
        "subtopics": [
          {
            "id": "s9-12-01",
            "title": "Crop Variety Improvement & Hybridisation Methods",
            "titleKn": "ಬೆಳೆ ತಳಿ ಸುಧಾರಣೆ ಮತ್ತು ಸಂಕರೀಕರಣ",
            "titleHi": "फसल की किस्मों में सुधार और संकरण विधियां",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s9-12-02",
            "title": "Nutrient Management: Manures vs Chemical Fertilizers & Irrigation",
            "titleKn": "ಪೋಷಕಾಂಶ ನಿರ್ವಹಣೆ: ಸಾವಯವ vs ರಾಸಾಯನಿಕ ಗೊಬ್ಬರ",
            "titleHi": "खाद बनाम रासायनिक उर्वरक और सिंचाई की प्रणालियां",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s9-12-03",
            "title": "Cropping Patterns (Mixed Cropping, Inter-cropping, Crop Rotation) & Weed Control",
            "titleKn": "ಬೆಳೆ ಪದ್ಧತಿಗಳು ಮತ್ತು ಕಳೆ ನಿಯಂತ್ರಣ",
            "titleHi": "फसल प्रारूप (मिश्रित फसल, अंतराफसलीकरण, फसल चक्र)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s9-12-04",
            "title": "Animal Husbandry: Cattle, Poultry Farming, Fisheries & Apiculture",
            "titleKn": "ಪಶುಸಂಗೋಪನೆ, ಕೋಳಿ ಸಾಕಣೆ, ಮೀನುಗಾರಿಕೆ ಮತ್ತು ಜೇನುಸಾಕಣೆ",
            "titleHi": "पशुपालन, कुक्कुट पालन, मत्स्य उत्पादन और मधुमक्खी पालन",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c9-sst",
    "name": "Social Studies",
    "nameKn": "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Science)",
    "nameHi": "सामाजिक विज्ञान (Social Science)",
    "classGrade": "Class 9",
    "icon": "Globe",
    "color": "#d97706",
    "badgeBg": "bg-amber-50 text-amber-800 border-amber-200",
    "borderColor": "border-amber-500",
    "chapters": [
      {
        "id": "sst9-01",
        "chapterNumber": 1,
        "title": "The French Revolution",
        "titleKn": "ಫ್ರೆಂಚ್ ಕ್ರಾಂತಿ (History)",
        "titleHi": "फ्रांसीसी क्रांति (History)",
        "unit": "Unit I: India & Contemporary World - I (History)",
        "unitKn": "ಘಟಕ ೧: ಭಾರತ ಮತ್ತು ಸಮಕಾಲೀನ ಜಗತ್ತು - ೧ (ಇತಿಹಾಸ)",
        "unitHi": "इकाई १: भारत और समकालीन विश्व - १ (इतिहास)",
        "description": "French Society during Late 18th Century (Three Estates), The Outbreak of Revolution (Storming of Bastille 14 July 1789), France Becomes a Constitutional Monarchy, France Abolishes Monarchy and Becomes a Republic, The Reign of Terror (Robespierre), Directory Rules France, Did Women have a Revolution?, The Abolition of Slavery, The Revolution and Everyday Life.",
        "descriptionKn": "೧೮ ನೇ ಶತಮಾನದ ಫ್ರೆಂಚ್ ಸಮಾಜ, ಬ್ಯಾಸ್ಟೈಲ್ ಕೋಟೆಯ ಪತನ, ಸಂವಿಧಾನಿಕ ರಾಜಪ್ರಭುತ್ವ, ಗಣರಾಜ್ಯ, ಭಯೋತ್ಪಾದನೆಯ ಆಳ್ವಿಕೆ (ರಾಬ್ಸ್‌ಪಿಯರ್), ಗುಲಾಮಗಿರಿ ರದ್ದತಿ.",
        "descriptionHi": "18वीं सदी के उत्तरार्ध में फ्रांसीसी समाज (तीन एस्टेट्स), बास्तील का पतन (14 जुलाई 1789), संवैधानिक राजतंत्र, आतंक का राज (रोबेस्पयेर), दास प्रथा का उन्मूलन और नेपोलियन का उदय।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Key Dates: 14 July 1789 (Storming of Bastille), 1791 (French Constitution), 1793-1794 (Reign of Terror), 1804 (Napoleon crowns himself Emperor)"
        ],
        "subtopics": [
          {
            "id": "sst9-01-01",
            "title": "Three Estates System & Crisis of Subsistence in 18th Century France",
            "titleKn": "ಮೂರು ಎಸ್ಟೇಟ್‌ಗಳ ಪದ್ಧತಿ ಮತ್ತು ಆರ್ಥಿಕ ಬಿಕ್ಕಟ್ಟು",
            "titleHi": "फ्रांसीसी समाज के तीन एस्टेट और जीविका संकट",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-01-02",
            "title": "Storming of Bastille & Tennis Court Oath (National Assembly)",
            "titleKn": "ಬ್ಯಾಸ್ಟೈಲ್ ಪತನ & ಟೆನ್ನಿಸ್ ಕೋರ್ಟ್ ಪ್ರತಿಜ್ಞೆ",
            "titleHi": "बास्तील का पतन और नेशनल असेंबली का गठन",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-01-03",
            "title": "Declaration of Rights of Man & Citizen & Constitutional Monarchy",
            "titleKn": "ಮಾನವ ಹಕ್ಕುಗಳ ಘೋಷಣೆ & ಸಾಂವಿಧಾನಿಕ ರಾಜಪ್ರಭುತ್ವ",
            "titleHi": "मनुष्य और नागरिक अधिकारों की घोषणा",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst9-01-04",
            "title": "The Reign of Terror (Jacobins / Robespierre) & Rise of Napoleon",
            "titleKn": "ಭಯೋತ್ಪಾದನಾ ಆಳ್ವಿಕೆ (ಜಾಕೋಬಿನ್ನರು) & ನೆಪೋಲಿಯನ್ ಉದಯ",
            "titleHi": "आतंक का राज (रोबेस्पयेर) और नेपोलियन का सत्ता में आना",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst9-02",
        "chapterNumber": 2,
        "title": "Socialism in Europe and the Russian Revolution",
        "titleKn": "ಯುರೋಪ್‌ನಲ್ಲಿ ಸಮಾಜವಾದ ಮತ್ತು ರಷ್ಯಾ ಕ್ರಾಂತಿ",
        "titleHi": "यूरोप में समाजवाद एवं रूसी क्रांति",
        "unit": "Unit I: India & Contemporary World - I (History)",
        "unitKn": "ಘಟಕ ೧: ಭಾರತ ಮತ್ತು ಸಮಕಾಲೀನ ಜಗತ್ತು - ೧ (ಇತಿಹಾಸ)",
        "unitHi": "इकाई १: भारत और समकालीन विश्व - १ (इतिहास)",
        "description": "The Age of Social Change (Liberals, Radicals, Conservatives), Industrial Society & Social Change, The Russian Empire in 1914, Economy and Society, Socialism in Russia, The 1905 Revolution (Bloody Sunday), The First World War and Russian Empire, The February Revolution in Petrograd (1917), The October Revolution (Lenin & Bolsheviks), What Changed after October?, The Civil War, Making a Socialist Society, Stalinism and Collectivisation.",
        "descriptionKn": "ಉದಾರವಾದಿಗಳು, ರಾಡಿಕಲ್‌ಗಳು, ರಷ್ಯಾದ ಸಾಮ್ರಾಜ್ಯ, ೧೯೦೫ ರ ಕ್ರಾಂತಿ (ರಕ್ತಸಿಕ್ತ ಭಾನುವಾರ), ೧೯೧೭ ರ ಫೆಬ್ರವರಿ ಮತ್ತು ಅಕ್ಟೋಬರ್ ಕ್ರಾಂತಿಗಳು (ಲೆನಿನ್), ಸ್ಟಾಲಿನ್‌ನ ಸಾಮೂಹಿಕ ಕೃಷಿ ಯೋಜನೆ.",
        "descriptionHi": "रूसी साम्राज्य (1914), 1905 की क्रांति (खूनी रविवार), 1917 की फरवरी व अक्टूबर क्रांति (लेनिन व बोल्शेविक), गृहयुद्ध, औद्योगीकरण और स्टालिन का सामूहिकीकरण।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 8,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Key Events: Bloody Sunday 1905, April Theses (Lenin: War end, Land to peasants, Banks nationalised), October Revolution 1917, Stalin's Kolkhoz (Collective Farms)"
        ],
        "subtopics": [
          {
            "id": "sst9-02-01",
            "title": "Liberals, Radicals, Conservatives & Karl Marx's Socialist Vision",
            "titleKn": "ಸಮಾಜವಾದಿ ಸಿದ್ಧಾಂತ ಮತ್ತು ಕಾರ್ಲ್ ಮಾರ್ಕ್ಸ್",
            "titleHi": "उदारवादी, रेडिकल, रूढ़िवादी और कार्ल मार्क्स का समाजवाद",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-02-02",
            "title": "1905 Russian Revolution & Bloody Sunday Incident",
            "titleKn": "೧೯೦೫ ರ ರಷ್ಯಾ ಕ್ರಾಂತಿ ಮತ್ತು ರಕ್ತಸಿಕ್ತ ಭಾನುವಾರ",
            "titleHi": "1905 की क्रांति और खूनी रविवार की घटना",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-02-03",
            "title": "February & October Revolutions 1917 (Petrograd Soviet & Lenin's Bolsheviks)",
            "titleKn": "ಫೆಬ್ರವರಿ ಮತ್ತು ಅಕ್ಟೋಬರ್ ಕ್ರಾಂತಿಗಳು (ಲೆನಿನ್)",
            "titleHi": "1917 की फरवरी और अक्टूबर क्रांति (लेनिन के अप्रैल थीसिस)",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "sst9-02-04",
            "title": "Stalinism: Collectivisation Programme (Kolkhoz) & Impact",
            "titleKn": "ಸ್ಟಾಲಿನ್‌ನ ಸಾಮೂಹಿಕ ಕೃಷಿ ಪದ್ಧತಿ (ಕೋಲ್ಖೋಜ್)",
            "titleHi": "स्टालिन का सामूहिकीकरण कार्यक्रम (कोलखोज) और प्रभाव",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "sst9-03",
        "chapterNumber": 3,
        "title": "India – Size and Location",
        "titleKn": "ಭಾರತ – ಗಾತ್ರ ಮತ್ತು ಭೌಗೋಳಿಕ ಸ್ಥಾನ (Geography)",
        "titleHi": "भारत – आकार और स्थिति (Geography)",
        "unit": "Unit II: Contemporary India - I (Geography)",
        "unitKn": "ಘಟಕ ೨: ಸಮಕಾಲೀನ ಭಾರತ - ೧ (ಭೂಗೋಳ)",
        "unitHi": "इकाई २: समकालीन भारत - १ (भूगोल)",
        "description": "Location of India (8°4'N to 37°6'N Latitudes, 68°7'E to 97°25'E Longitudes), Tropic of Cancer (23°30'N), Size (3.28 million sq km - 2.4% world area, 7th largest), Land Boundary (15,200 km) and Coastline (7,516.6 km), Standard Meridian of India (82°30'E passing through Mirzapur, UP), India and the World, India's Neighbours.",
        "descriptionKn": "ಭಾರತದ ಅಕ್ಷಾಂಶ-ರೇಖಾಂಶಗಳು, ಕರ್ಕಾಟಕ ಸಂಕ್ರಾಂತಿ ವೃತ್ತ, ವಿಸ್ತೀರ್ಣ (೩.೨೮ ಮಿಲಿಯನ್ ಚ.ಕಿ.ಮೀ), ಪ್ರಮಾಣಿತ ಕಾಲರೇಖೆ (೮೨°೩೦' ಪೂರ್ವ), ಭಾರತದ ನೆರೆಹೊರೆಯ ದೇಶಗಳು.",
        "descriptionHi": "भारत की अक्षांशीय व देशांतरीय स्थिति, कर्क रेखा (23°30'N), क्षेत्रफल (32.8 लाख वर्ग किमी), मानक याम्योत्तर (82°30'E मिर्जापुर), भारत और विश्व व्यापार मार्ग तथा पड़ोसी देश।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 6,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Latitudes: 8°4' N to 37°6' N",
          "Longitudes: 68°7' E to 97°25' E",
          "Standard Meridian: 82°30' E (passes through Mirzapur, UP)",
          "Total Area: 3.28 million sq km (7th largest)"
        ],
        "subtopics": [
          {
            "id": "sst9-03-01",
            "title": "Latitudinal & Longitudinal Extent of India & Tropic of Cancer",
            "titleKn": "ಭಾರತದ ಅಕ್ಷಾಂಶ-ರೇಖಾಂಶ ವಿಸ್ತಾರ & ಕರ್ಕಾಟಕ ಸಂಕ್ರಾಂತಿ ವೃತ್ತ",
            "titleHi": "भारत का अक्षांशीय व देशांतरीय विस्तार और कर्क रेखा",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst9-03-02",
            "title": "Standard Meridian of India (82°30'E) & Time Lag Calculation",
            "titleKn": "ಭಾರತದ ಪ್ರಮಾಣಿತ ಕಾಲರೇಖೆ (೮೨°೩೦' ಪೂ) ಮತ್ತು ಕಾಲವ್ಯತ್ಯಾಸ",
            "titleHi": "मानक याम्योत्तर (82°30'E) और अरुणाचल-गुजरात समय अंतर",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-03-03",
            "title": "India's Strategic Central Location on Indian Ocean & Neighbours",
            "titleKn": "ಹಿಂದೂ ಮಹಾಸಾಗರದಲ್ಲಿ ಭಾರತದ ಸ್ಥಾನ ಮತ್ತು ನೆರೆರಾಷ್ಟ್ರಗಳು",
            "titleHi": "हिंद महासागर में भारत की रणनीतिक स्थिति और पड़ोसी देश",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst9-04",
        "chapterNumber": 4,
        "title": "Physical Features of India",
        "titleKn": "ಭಾರತದ ನೈಸರ್ಗಿಕ ಲಕ್ಷಣಗಳು (Geography)",
        "titleHi": "भारत का भौतिक स्वरूप (Geography)",
        "unit": "Unit II: Contemporary India - I (Geography)",
        "unitKn": "ಘಟಕ ೨: ಸಮಕಾಲೀನ ಭಾರತ - ೧ (ಭೂಗೋಳ)",
        "unitHi": "इकाई २: समकालीन भारत - १ (भूगोल)",
        "description": "Theory of Plate Tectonics (Convergent, Divergent, Transform boundaries), Major Physiographic Divisions: The Himalayan Mountains (Himadri, Himachal, Shiwaliks), The Northern Plains (Bhabar, Terai, Bhangar, Khadar), The Peninsular Plateau (Central Highlands, Deccan Plateau, Western & Eastern Ghats), The Indian Desert (Thar), The Coastal Plains (Western & Eastern), The Islands (Lakshadweep & Andaman and Nicobar).",
        "descriptionKn": "ಭೂಫಲಕ ಸಿದ್ಧಾಂತ, ಹಿಮಾಲಯ ಪರ್ವತಗಳು (ಹಿಮಾದ್ರಿ, ಹಿಮಾಚಲ, ಶಿವಾಲಿಕ್), ಉತ್ತರ ಮೈದಾನಗಳು, ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿ, ಪಶ್ಚಿಮ-ಪೂರ್ವ ಘಟ್ಟಗಳು, ಥಾರ್ ಮರುಭೂಮಿ, ದ್ವೀಪಗಳು.",
        "descriptionHi": "प्लेट विवर्तनिकी सिद्धांत, प्रमुख भौगोलिक विभाग: हिमालय पर्वतमाला (हिमाद्रि, हिमाचल, शिवालिक), उत्तरी मैदान (भाबर, तराई, भांगर, खादर), प्रायद्वीपीय पठार, थार मरुस्थल, तटीय मैदान और द्वीप समूह।",
        "status": "In Progress",
        "completionPercent": 70,
        "totalPeriods": 8,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Himalayan ranges: Greater Himalayas (Himadri), Lesser Himalayas (Himachal), Outer Himalayas (Shiwaliks)",
          "Northern Plain soils: Bhabar (pebbles), Terai (marshy), Bhangar (old alluvium), Khadar (new alluvium)"
        ],
        "subtopics": [
          {
            "id": "sst9-04-01",
            "title": "Plate Tectonics Theory & Formation of Himalayas (Gondwanaland)",
            "titleKn": "ಭೂಫಲಕ ಸಿದ್ಧಾಂತ ಮತ್ತು ಹಿಮಾಲಯದ ಉಗಮ",
            "titleHi": "प्लेट विवर्तनिकी और हिमालय की उत्पत्ति (गोंडवाना लैंड)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-04-02",
            "title": "Three Ranges of Himalayas (Himadri, Himachal, Shiwaliks)",
            "titleKn": "ಹಿಮಾಲಯದ ಮೂರು ಸಮಾನಾಂತರ ಶ್ರೇಣಿಗಳು",
            "titleHi": "हिमालय की तीन प्रमुख श्रेणियां (हिमाद्रि, हिमाचल, शिवालिक)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-04-03",
            "title": "Northern Plains: Bhabar, Terai, Bhangar & Khadar",
            "titleKn": "ಉತ್ತರ ಮೈದಾನದ ೪ ವಲಯಗಳು: ಭಾಬರ್, ತೆರೈ, ಭಾಂಗರ್, ಖಾದರ್",
            "titleHi": "उत्तरी मैदान के चार क्षेत्र: भाबर, तराई, भांगर और खादर",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-04-04",
            "title": "Peninsular Plateau, Western Ghats vs Eastern Ghats & Island Groups",
            "titleKn": "ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿ, ಪಶ್ಚಿಮ-ಪೂರ್ವ ಘಟ್ಟಗಳು ಮತ್ತು ದ್ವೀಪಗಳು",
            "titleHi": "प्रायद्वीपीय पठार, पश्चिमी बनाम पूर्वी घाट और द्वीप समूह",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "sst9-05",
        "chapterNumber": 5,
        "title": "What is Democracy? Why Democracy?",
        "titleKn": "ಪ್ರಜಾಪ್ರಭುತ್ವ ಎಂದರೇನು? ಏಕೆ ಪ್ರಜಾಪ್ರಭುತ್ವ? (Civics)",
        "titleHi": "लोकतंत्र क्या? लोकतंत्र क्यों? (Civics)",
        "unit": "Unit III: Democratic Politics - I (Civics)",
        "unitKn": "ಘಟಕ ೩: ಪ್ರಜಾಪ್ರಭುತ್ವದ ರಾಜಕೀಯ - ೧ (ಪೌರನೀತಿ)",
        "unitHi": "इकाई ३: लोकतांत्रिक राजनीति - १ (नागरिक शास्त्र)",
        "description": "What is Democracy?, Features of Democracy (Major decisions by elected leaders, Free and fair electoral competition, One person one vote one value, Rule of law and respect for rights), Case studies (Pakistan under Musharraf, China, Mexico, Zimbabwe under Mugabe), Why Democracy? Arguments against and Arguments for Democracy, Broader Meanings of Democracy.",
        "descriptionKn": "ಪ್ರಜಾಪ್ರಭುತ್ವದ ವ್ಯಾಖ್ಯೆ, ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು (ಸ್ವತಂತ್ರ ಚುನಾವಣೆ, ಒಬ್ಬ ವ್ಯಕ್ತಿ-ಒಂದು ಮತ-ಒಂದು ಮೌಲ್ಯ, ಕಾನೂನಿನ ಆಳ್ವಿಕೆ), ಪ್ರಜಾಪ್ರಭುತ್ವದ ಪರ ಮತ್ತು ವಿರುದ್ಧ ವಾದಗಳು.",
        "descriptionHi": "लोकतंत्र की परिभाषा और विशेषताएं (प्रमुख निर्णय निर्वाचित नेताओं के हाथ, स्वतंत्र व निष्पक्ष चुनाव, एक व्यक्ति एक वोट एक मोल, कानून का राज), लोकतंत्र के पक्ष और विपक्ष में तर्क।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 6,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Core Definition: Democracy is a form of government in which the rulers are elected by the people",
          "4 Key Features: 1. Elected rulers make final decisions; 2. Free & fair elections; 3. Universal Adult Suffrage; 4. Constitutional rule & rights"
        ],
        "subtopics": [
          {
            "id": "sst9-05-01",
            "title": "Simple Definition of Democracy & Pakistan / China / Mexico Case Studies",
            "titleKn": "ಪ್ರಜಾಪ್ರಭುತ್ವದ ಸರಳ ವ್ಯಾಖ್ಯೆ ಮತ್ತು ಉದಾಹರಣೆಗಳು",
            "titleHi": "लोकतंत्र की परिभाषा और पाकिस्तान/चीन/मेक्सिको के उदाहरण",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst9-05-02",
            "title": "Four Major Features of Democratic Government",
            "titleKn": "ಪ್ರಜಾಪ್ರಭುತ್ವ ಸರಕಾರದ ೪ ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು",
            "titleHi": "लोकतांत्रिक सरकार की 4 अनिवार्य विशेषताएं",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-05-03",
            "title": "Arguments Against vs Arguments For Democracy (Why Democracy?)",
            "titleKn": "ಪ್ರಜಾಪ್ರಭುತ್ವದ ಪರ ಮತ್ತು ವಿರುದ್ಧ ವಾದಗಳು",
            "titleHi": "लोकतंत्र के पक्ष और विपक्ष में अकाट्य तर्क",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-05-04",
            "title": "Broader Meaning & Everyday Application of Democracy",
            "titleKn": "ಪ್ರಜಾಪ್ರಭುತ್ವದ ವಿಶಾಲ ಅರ್ಥ",
            "titleHi": "लोकतंत्र का व्यापक अर्थ और जीवन में महत्व",
            "type": "Board Exam Important",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst9-06",
        "chapterNumber": 6,
        "title": "Constitutional Design",
        "titleKn": "ಸಂವಿಧಾನ ರಚನೆ (Civics)",
        "titleHi": "संविधान निर्माण (Civics)",
        "unit": "Unit III: Democratic Politics - I (Civics)",
        "unitKn": "ಘಟಕ ೩: ಪ್ರಜಾಪ್ರಭುತ್ವದ ರಾಜಕೀಯ - ೧ (ಪೌರನೀತಿ)",
        "unitHi": "इकाई ३: लोकतांत्रिक राजनीति - १ (नागरिक शास्त्र)",
        "description": "Democratic Constitution in South Africa (Apartheid System, Nelson Mandela's Struggle, Making of New Constitution), Why do we need a Constitution?, Making of the Indian Constitution (Difficult circumstances, Path to Constitution, The Constituent Assembly), Guiding Values of Indian Constitution (The Preamble: Sovereign, Socialist, Secular, Democratic, Republic, Justice, Liberty, Equality, Fraternity).",
        "descriptionKn": "ದಕ್ಷಿಣ ಆಫ್ರಿಕಾದ ವರ್ಣಭೇದ ನೀತಿ ಮತ್ತು ನೆಲ್ಸನ್ ಮಂಡೇಲಾ, ಸಂವಿಧಾನ ಏಕೆ ಬೇಕು?, ಭಾರತೀಯ ಸಂವಿಧಾನ ರಚನಾ ಸಭೆ, ಪ್ರಸ್ತಾವನೆ ಮತ್ತು ಆದರ್ಶಗಳು.",
        "descriptionHi": "दक्षिण अफ्रीका में रंगभेद विरोधी संघर्ष और नेल्सन मंडेला, संविधान की आवश्यकता, भारतीय संविधान सभा का गठन, संविधान की प्रस्तावना (संप्रभु, समाजवादी, धर्मनिरपेक्ष, लोकतांत्रिक गणराज्य)।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Constituent Assembly: 299 members, Adopted on 26 Nov 1949, Enacted on 26 Jan 1950",
          "Preamble Keywords: Sovereign, Socialist, Secular, Democratic, Republic, Justice, Liberty, Equality, Fraternity"
        ],
        "subtopics": [
          {
            "id": "sst9-06-01",
            "title": "Apartheid System in South Africa & Transition to Democracy",
            "titleKn": "ದಕ್ಷಿಣ ಆಫ್ರಿಕಾದಲ್ಲಿ ವರ್ಣಭೇದ ನೀತಿ ಮತ್ತು ನೆಲ್ಸನ್ ಮಂಡೇಲಾ",
            "titleHi": "दक्षिण अफ्रीका में रंगभेद और नेल्सन मंडेला का संघर्ष",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-06-02",
            "title": "Why do we need a Constitution? 4 Key Functions",
            "titleKn": "ಸಂವಿಧಾನದ ಅಗತ್ಯತೆ ಮತ್ತು ೪ ಮುಖ್ಯ ಕಾರ್ಯಗಳು",
            "titleHi": "संविधान की आवश्यकता और इसके 4 प्रमुख कार्य",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst9-06-03",
            "title": "Making of Indian Constitution & Constituent Assembly (Dr. Ambedkar)",
            "titleKn": "ಭಾರತೀಯ ಸಂವಿಧಾನ ರಚನಾ ಸಭೆ ಮತ್ತು ಡಾ. ಅಂಬೇಡ್ಕರ್",
            "titleHi": "भारतीय संविधान सभा का निर्माण और डॉ. अंबेडकर की भूमिका",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst9-06-04",
            "title": "Philosophy of Constitution & Deep Dive into Preamble Keywords",
            "titleKn": "ಸಂವಿಧಾನದ ಪ್ರಸ್ತಾವನೆ ಮತ್ತು ಪ್ರಮುಖ ಮೌಲ್ಯಗಳು",
            "titleHi": "संविधान की उद्देशिका (प्रस्तावना) के मुख्य शब्द",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "sst9-07",
        "chapterNumber": 7,
        "title": "People as Resource",
        "titleKn": "ಸಂಪನ್ಮೂಲವಾಗಿ ಮಾನವರು (Economics)",
        "titleHi": "संसाधन के रूप में लोग (Economics)",
        "unit": "Unit IV: Economics",
        "unitKn": "ಘಟಕ ೪: ಅರ್ಥಶಾಸ್ತ್ರ",
        "unitHi": "इकाई ४: अर्थशास्त्र",
        "description": "Overview of Human Capital, Economic Activities by Men and Women (Primary, Secondary, Tertiary; Market vs Non-market), Quality of Population (Education, Health, Sarva Shiksha Abhiyan), Unemployment (Seasonal Unemployment, Disguised Unemployment, Educated Unemployment) & Its Consequences.",
        "descriptionKn": "ಮಾನವ ಬಂಡವಾಳ, ಆರ್ಥಿಕ ಚಟುವಟಿಕೆಗಳು, ಜನಸಂಖ್ಯೆಯ ಗುಣಮಟ್ಟ (ಶಿಕ್ಷಣ, ಆರೋಗ್ಯ), ನಿರುದ್ಯೋಗದ ವಿಧಗಳು (ಋತುಮಾನ ನಿರುದ್ಯೋಗ, ಮರೆಮಾಚಿದ ನಿರುದ್ಯೋಗ, ವಿದ್ಯಾವಂತ ನಿರುದ್ಯೋಗ).",
        "descriptionHi": "मानव पूंजी की संकल्पना, पुरुषों और महिलाओं की आर्थिक गतिविधियां, जनसंख्या की गुणवत्ता (शिक्षा, स्वास्थ्य, सर्व शिक्षा अभियान), बेरोजगारी के प्रकार (मौसमी, प्रच्छन्न, शिक्षित बेरोजगारी)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 6,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Human Capital Formation: Investment in education, training and healthcare",
          "Unemployment types: Seasonal (off-season farming), Disguised (surplus family labour), Educated (youth with degrees lacking jobs)"
        ],
        "subtopics": [
          {
            "id": "sst9-07-01",
            "title": "Concept of Human Capital & Virtuous Cycle of Education/Health",
            "titleKn": "ಮಾನವ ಬಂಡವಾಳ ಮತ್ತು ಶಿಕ್ಷಣ-ಆರೋಗ್ಯದ ಪ್ರಾಮುಖ್ಯತೆ",
            "titleHi": "मानव पूंजी निर्माण: शिक्षा और स्वास्थ्य में निवेश",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst9-07-02",
            "title": "Economic Activities (Primary, Secondary, Tertiary & Market Activities)",
            "titleKn": "ಆರ್ಥಿಕ ಚಟುವಟಿಕೆಗಳ ವಿಧಗಳು",
            "titleHi": "प्राथमिक, द्वितीयक, तृतीयक और बाजार/गैर-बाजार गतिविधियां",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst9-07-03",
            "title": "Quality of Population: Education Initiatives (Sarva Shiksha, Navodaya) & Health",
            "titleKn": "ಜನಸಂಖ್ಯೆಯ ಗುಣಮಟ್ಟ: ಸರ್ವ ಶಿಕ್ಷಣ ಅಭಿಯಾನ & ಆರೋಗ್ಯ",
            "titleHi": "जनसंख्या की गुणवत्ता: सर्व शिक्षा अभियान और स्वास्थ्य सूचकांक",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst9-07-04",
            "title": "Types of Unemployment: Seasonal, Disguised & Educated Unemployment",
            "titleKn": "ನಿರುದ್ಯೋಗದ ವಿಧಗಳು: ಋತುಮಾನ, ಮರೆಮಾಚಿದ & ವಿದ್ಯಾವಂತ",
            "titleHi": "बेरोजगारी के प्रकार (मौसमी, प्रच्छन्न, शिक्षित) और दुष्परिणाम",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst9-08",
        "chapterNumber": 8,
        "title": "Poverty as a Challenge",
        "titleKn": "ಒಂದು ಸವಾಲಾಗಿ ಬಡತನ (Economics)",
        "titleHi": "निर्धनता: एक चुनौती (Economics)",
        "unit": "Unit IV: Economics",
        "unitKn": "ಘಟಕ ೪: ಅರ್ಥಶಾಸ್ತ್ರ",
        "unitHi": "इकाई ४: अर्थशास्त्र",
        "description": "Two Typical Cases of Poverty (Urban & Rural), Poverty as Seen by Social Scientists (Social Exclusion, Vulnerability), Poverty Line Determination in India (Minimum calorie requirement 2400 rural / 2100 urban), Poverty Estimates, Vulnerable Groups, Inter-State Disparities, Global Poverty Scenario, Causes of Poverty, Anti-Poverty Measures (Promotion of Economic Growth, Targeted Anti-Poverty Programmes: MGNREGA 2005, PMRY, SGSY, AAY).",
        "descriptionKn": "ಬಡತನದ ಲಕ್ಷಣಗಳು, ಸಾಮಾಜಿಕ ಹೊರಗಿಡುವಿಕೆ, ಬಡತನ ರೇಖೆ (ಕ್ಯಾಲೋರಿ ಮಾನದಂಡ), ಬಡತನ ನಿವಾರಣಾ ಕಾರ್ಯಕ್ರಮಗಳು (ಮನರೇಗಾ ೨೦೦೫, ಪಿಎಂಆರ್‌ವೈ).",
        "descriptionHi": "शहरी व ग्रामीण निर्धनता, सामाजिक अपवर्जन व असुरक्षा, निर्धनता रेखा का निर्धारण (कैलोरी उपभोग: 2400 ग्रामीण / 2100 शहरी), निर्धनता उन्मूलन कार्यक्रम (मनरेगा, PMRY आदि)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Poverty Line Calorie Norm: 2400 kcal/day (Rural), 2100 kcal/day (Urban)",
          "MGNREGA 2005: 100 days guaranteed wage employment, 1/3 reserved for women"
        ],
        "subtopics": [
          {
            "id": "sst9-08-01",
            "title": "Dimensions of Poverty & Social Exclusion and Vulnerability Concepts",
            "titleKn": "ಬಡತನದ ಆಯಾಮಗಳು & ಸಾಮಾಜಿಕ ಹೊರಗಿಡುವಿಕೆ",
            "titleHi": "निर्धनता के आयाम, सामाजिक अपवर्जन और असुरक्षा की संकल्पना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "sst9-08-02",
            "title": "Poverty Line Estimation in India: Calorie & Income Criteria",
            "titleKn": "ಬಡತನ ರೇಖೆಯ ಅಂದಾಜು: ಕ್ಯಾಲೋರಿ & ಆದಾಯ ಮಾನದಂಡ",
            "titleHi": "भारत में निर्धनता रेखा का निर्धारण (कैलोरी व आय मापदंड)",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "sst9-08-03",
            "title": "Vulnerable Groups & Inter-State Disparities (Bihar, Odisha vs Kerala, Punjab)",
            "titleKn": "ದುರ್ಬಲ ವರ್ಗಗಳು ಮತ್ತು ರಾಜ್ಯಗಳ ನಡುವಿನ ಅಂತರ",
            "titleHi": "असुरक्षित सामाजिक समूह और अंतर्राज्यीय असमानताएं",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "sst9-08-04",
            "title": "Government Anti-Poverty Schemes (MGNREGA 2005, PMRY, AAY) & Future Challenges",
            "titleKn": "ಸರ್ಕಾರದ ಬಡತನ ನಿವಾರಣಾ ಯೋಜನೆಗಳು (ಮನರೇಗಾ ೨೦೦೫)",
            "titleHi": "सरकारी निर्धनता उन्मूलन कार्यक्रम (मनरेगा 2005 आदि)",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c9-eng",
    "name": "English Grammar",
    "nameKn": "ಇಂಗ್ಲಿಷ್ (English Language & Literature)",
    "nameHi": "अंग्रेजी (English Language & Literature)",
    "classGrade": "Class 9",
    "icon": "BookOpen",
    "color": "#7c3aed",
    "badgeBg": "bg-purple-50 text-purple-800 border-purple-200",
    "borderColor": "border-purple-500",
    "chapters": [
      {
        "id": "eng9-01",
        "chapterNumber": 1,
        "title": "Integrated Grammar: Tenses, Modals & Determiners",
        "titleKn": "ಸಮಗ್ರ ವ್ಯಾಕರಣ: ಕಾಲಗಳು, ಮೋಡಲ್‌ಗಳು & ಡಿಟರ್ಮಿನರ್‌ಗಳು",
        "titleHi": "एकीकृत व्याकरण: काल, मोडल्स एवं निर्धारक",
        "unit": "Unit I: Applied Grammar & Writing",
        "unitKn": "ಘಟಕ ೧: ವ್ಯಾಕರಣ ಮತ್ತು ಲೇಖನ ಕೌಶಲ್ಯ",
        "unitHi": "इकाई १: व्यावहारिक व्याकरण एवं लेखन कौशल",
        "description": "Tenses (Simple, Continuous, Perfect, Perfect Continuous), Modals (Ability, Permission, Obligation), Determiners (Articles, Demonstratives, Possessives, Quantifiers - few/a few, little/a little), Subject-Verb Agreement, Editing and Omission Drills.",
        "descriptionKn": "ಕಾಲಗಳು, ಮೋಡಲ್‌ಗಳು, ಡಿಟರ್ಮಿನರ್‌ಗಳು (ಆರ್ಟಿಕಲ್ಸ್, ಕ್ವಾಂಟಿಫೈಯರ್ಸ್), ಸಬ್ಜೆಕ್ಟ್-ವರ್ಬ್ ಕಾನ್‌ಕಾರ್ಡ್ ಮತ್ತು ದೋಷ ತಿದ್ದುಪಡಿ.",
        "descriptionHi": "काल (सभी 12 प्रकार), मोडल्स (Can, Could, May, Must आदि), निर्धारक (Articles, Quantifiers) और वाक्य संपादन।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Few (negative) vs A few (positive)",
          "Little (uncountable negative) vs A little (uncountable positive)",
          "Neither of the boys + was (Singular)"
        ],
        "subtopics": [
          {
            "id": "eng9-01-01",
            "title": "Determiners & Articles (A, An, The, Some, Any, Much, Many)",
            "titleKn": "ಡಿಟರ್ಮಿನರ್‌ಗಳು ಮತ್ತು ಆರ್ಟಿಕಲ್‌ಗಳ ನಿಯಮಗಳು",
            "titleHi": "निर्धारक (Determiners) और आर्टिकल्स के नियम",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng9-01-02",
            "title": "Modals of Ability, Obligation, Advice and Probability",
            "titleKn": "ಮೋಡಲ್ ಕ್ರಿಯಾಪದಗಳು (Can, Must, Should)",
            "titleHi": "मोडल्स का उचित प्रयोग (Can, Must, Should आदि)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng9-01-03",
            "title": "Subject-Verb Agreement Rules for Complex Compound Subjects",
            "titleKn": "ಸಬ್ಜೆಕ್ಟ್-ವರ್ಬ್ ಹೊಂದಾಣಿಕೆಯ ನಿಯಮಗಳು",
            "titleHi": "Subject-Verb Concord के आवश्यक नियम",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng9-01-04",
            "title": "Editing, Omission & Error Correction Exam Drills",
            "titleKn": "ದೋಷ ತಿದ್ದುಪಡಿ ಮತ್ತು ಎಡಿಟಿಂಗ್ ಅಭ್ಯಾಸ",
            "titleHi": "त्रुटि सुधार (Editing & Omission) अभ्यास",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng9-02",
        "chapterNumber": 2,
        "title": "Descriptive Paragraph & Story Writing",
        "titleKn": "ವಿವರಣಾತ್ಮಕ ಪ್ಯಾರಾಗ್ರಾಫ್ ಮತ್ತು ಕಥಾ ರಚನೆ",
        "titleHi": "वर्णनात्मक अनुच्छेद एवं कहानी लेखन",
        "unit": "Unit I: Applied Grammar & Writing",
        "unitKn": "ಘಟಕ ೧: ವ್ಯಾಕರಣ ಮತ್ತು ಲೇಖನ ಕೌಶಲ್ಯ",
        "unitHi": "इकाई १: व्यावहारिक व्याकरण एवं लेखन कौशल",
        "description": "Descriptive Paragraph Writing (Person, Event, Situation) using sensory details and strong vocabulary. Short Story Writing based on given outline, prompt or visual cue (Plot, Characters, Setting, Climax, Resolution, Title & Moral). Diary Entry format and practice.",
        "descriptionKn": "ವ್ಯಕ್ತಿ/ಘಟನೆಯ ವಿವರಣಾತ್ಮಕ ಲೇಖನ, ನೀಡಿರುವ ಸುಳಿವುಗಳ ಆಧಾರದ ಮೇಲೆ ಕಥಾ ರಚನೆ ಮತ್ತು ದಿನಚರಿ ಬರೆಯುವುದು.",
        "descriptionHi": "संकेत बिंदुओं पर आधारित वर्णनात्मक अनुच्छेद, कहानी लेखन (कथानक, पात्र, चरमोत्कर्ष, शीर्षक) और डायरी प्रविष्टि।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Story Structure: Catchy Title → Setting the Scene → Conflict/Problem → Climax → Resolution/Moral",
          "Diary Entry: Day, Date, Time on top left → Informal introspective tone → Sign-off"
        ],
        "subtopics": [
          {
            "id": "eng9-02-01",
            "title": "Descriptive Paragraph Format for Describing People & Events",
            "titleKn": "ವ್ಯಕ್ತಿ ಮತ್ತು ಘಟನೆಗಳ ವಿವರಣಾತ್ಮಕ ಪ್ಯಾರಾಗ್ರಾಫ್",
            "titleHi": "व्यक्ति और घटना पर आधारित वर्णनात्मक अनुच्छेद",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng9-02-02",
            "title": "Story Writing from Outlines: Plot Building, Climax & Dialogue",
            "titleKn": "ರೂಪರೇಖೆಗಳಿಂದ ಕಥಾ ರಚನೆ ಮತ್ತು ಶೀರ್ಷಿಕೆ",
            "titleHi": "संकेत बिंदुओं से रोचक कहानी निर्माण और शीर्षक",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng9-02-03",
            "title": "Diary Entry Format & Emotional Expression Drills",
            "titleKn": "ದಿನಚರಿ ಬರೆಯುವ ಮಾದರಿ ಮತ್ತು ಅಭ್ಯಾಸ",
            "titleHi": "डायरी लेखन का प्रारूप और अभ्यास",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng9-03",
        "chapterNumber": 3,
        "title": "Beehive: The Fun They Had & The Road Not Taken",
        "titleKn": "ದಿ ಫನ್ ದೇ ಹ್ಯಾಡ್ ಮತ್ತು ದಿ ರೋಡ್ ನಾಟ್ ಟೇಕನ್",
        "titleHi": "The Fun They Had और The Road Not Taken",
        "unit": "Unit II: Literature (Beehive)",
        "unitKn": "ಘಟಕ ೨: ಸಾಹಿತ್ಯ (ಬೀವ್)",
        "unitHi": "इकाई २: साहित्य (Beehive)",
        "description": "The Fun They Had (Isaac Asimov) - Future virtual schooling vs Old schools. The Road Not Taken (Robert Frost) - Choices, decisions and divergence in life.",
        "descriptionKn": "ದಿ ಫನ್ ದೇ ಹ್ಯಾಡ್ (ಭವಿಷ್ಯದ ವರ್ಚುವಲ್ ಶಾಲೆ), ದಿ ರೋಡ್ ನಾಟ್ ಟೇಕನ್ (ರಾಬರ್ಟ್ ಫ್ರಾಸ್ಟ್ ಕವನ - ಜೀವನದ ಆಯ್ಕೆಗಳು).",
        "descriptionHi": "The Fun They Had (आइजैक असीमोव - भविष्य के कंप्यूटर स्कूल) और The Road Not Taken (रॉबर्ट फ्रॉस्ट - जीवन के विकल्प)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 6,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Margie and Tommy (Year 2157) discover a printed paper book",
          "Two roads diverged in a yellow wood - Symbolizes life decisions and choices"
        ],
        "subtopics": [
          {
            "id": "eng9-03-01",
            "title": "The Fun They Had: Plot, Future Tele-books & Schooling Theme",
            "titleKn": "ದಿ ಫನ್ ದೇ ಹ್ಯಾಡ್ ಕಥಾ ಸಾರಾಂಶ ಮತ್ತು ಚರ್ಚೆ",
            "titleHi": "The Fun They Had की समीक्षा और भविष्य की शिक्षा",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng9-03-02",
            "title": "The Road Not Taken Poem: Metaphor, Rhyme Scheme (abaab) & Meaning",
            "titleKn": "ದಿ ರೋಡ್ ನಾಟ್ ಟೇಕನ್ ಕವನದ ಭಾವಾರ್ಥ & ರೂಪಕ",
            "titleHi": "The Road Not Taken कविता का भावार्थ और काव्य सौंदर्य",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng9-03-03",
            "title": "NCERT Questions, Extract-based Questions & Character Sketches",
            "titleKn": "ಪ್ರಶ್ನೋತ್ತರಗಳು ಮತ್ತು ಪಾತ್ರ ಪರಿಚಯ",
            "titleHi": "NCERT प्रश्न और उद्धरण आधारित महत्वपूर्ण प्रश्न",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng9-04",
        "chapterNumber": 4,
        "title": "Beehive: The Sound of Music & Wind",
        "titleKn": "ದಿ ಸೌಂಡ್ ಆಫ್ ಮ್ಯೂಸಿಕ್ ಮತ್ತು ವಿಂಡ್ ಕವನ",
        "titleHi": "The Sound of Music और Wind कविता",
        "unit": "Unit II: Literature (Beehive)",
        "unitKn": "ಘಟಕ ೨: ಸಾಹಿತ್ಯ (ಬೀವ್)",
        "unitHi": "इकाई २: साहित्य (Beehive)",
        "description": "Part I: Evelyn Glennie Listens to Sound Without Hearing It (Deborah Cowley) - Inspiring triumph over hearing impairment. Part II: The Shehnai of Bismillah Khan - Ustad Bismillah Khan's legacy. Poem: Wind (Subramania Bharati) - Facing challenges with resilience.",
        "descriptionKn": "ಎವೆಲಿನ್ ಗ್ಲೆನ್ನಿ (ಕಿವುಡುತನ ಮೆಟ್ಟಿ ನಿಂತ ಸಂಗೀತಗಾರ್ತಿ), ಉಸ್ತಾದ್ ಬಿಸ್ಮಿಲ್ಲಾ ಖಾನ್ (ಶೆಹನಾಯಿ), ವಿಂಡ್ (ಸುಬ್ರಹ್ಮಣ್ಯ ಭಾರತಿ ಕವನ).",
        "descriptionHi": "Evelyn Glennie (बधिरता पर विजय), उस्ताद बिस्मिल्ला खाँ (शहनाई) और Wind कविता (सुब्रह्मण्य भारती - साहस और संकल्प)।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 7,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Evelyn Glennie perceives music through her body vibrations (Ron Forbes mentorship)",
          "Bismillah Khan awarded Bharat Ratna in 2001"
        ],
        "subtopics": [
          {
            "id": "eng9-04-01",
            "title": "Evelyn Glennie: Determination, Percussion & Ron Forbes Inspiration",
            "titleKn": "ಎವೆಲಿನ್ ಗ್ಲೆನ್ನಿ ಅವರ ಸ್ಪೂರ್ತಿದಾಯಕ ಕಥೆ",
            "titleHi": "Evelyn Glennie के संघर्ष और सफलता की कहानी",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng9-04-02",
            "title": "The Shehnai of Bismillah Khan: Origin of Shehnai & Dedication",
            "titleKn": "ಉಸ್ತಾದ್ ಬಿಸ್ಮಿಲ್ಲಾ ಖಾನ್ ಅವರ ಶೆಹನಾಯಿ ಸಾಧನೆ",
            "titleHi": "उस्ताद बिस्मिल्ला खाँ और शहनाई की विरासत",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng9-04-03",
            "title": "Wind Poem: Symbolism of Wind as Life Adversities & Strength",
            "titleKn": "ವಿಂಡ್ ಕವನದ ಸಾಂಕೇತಿಕ ಅರ್ಥ ಮತ್ತು ಸಂದೇಶ",
            "titleHi": "Wind कविता का केंद्रीय भाव और जीवन संदेश",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "eng9-05",
        "chapterNumber": 5,
        "title": "Moments: Supplementary Reader Highlights",
        "titleKn": "ಮೊಮೆಂಟ್ಸ್: ಪೂರಕ ಪಠ್ಯದ ಪ್ರಮುಖ ಕಥೆಗಳು",
        "titleHi": "Moments: पूरक पाठ्यपुस्तक की प्रमुख कहानियां",
        "unit": "Unit III: Supplementary Reader (Moments)",
        "unitKn": "ಘಟಕ ೩: ಪೂರಕ ಓದು (ಮೊಮೆಂಟ್ಸ್)",
        "unitHi": "इकाई ३: पूरक साहित्य (Moments)",
        "description": "The Lost Child (Mulk Raj Anand), The Adventures of Toto (Ruskin Bond), Iswaran the Storyteller (R.K. Laxman), In the Kingdom of Fools (A.K. Ramanujan), The Happy Prince (Oscar Wilde), The Last Leaf (O. Henry), A House Is Not a Home, The Beggar (Anton Chekhov).",
        "descriptionKn": "ದಿ ಲಾಸ್ಟ್ ಚೈಲ್ಡ್, ಅಡ್ವೆಂಚರ್ಸ್ ಆಫ್ ಟೋಟೋ, ಇಶ್ವರನ್ ದಿ ಸ್ಟೋರಿಟೆಲ್ಲರ್, ಇನ್ ದಿ ಕಿಂಗ್ಡಮ್ ಆಫ್ ಫೂಲ್ಸ್, ದಿ ಲಾಸ್ಟ್ ಲೀಫ್.",
        "descriptionHi": "The Lost Child (मुल्कराज आनंद), The Adventures of Toto (रस्किन बॉन्ड), In the Kingdom of Fools, The Last Leaf (ओ हेनरी), The Beggar (चेखव)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Themes: Parental affection (The Lost Child), Compassion & Sacrifice (Happy Prince / Behrman's Last Leaf), Transformation through Kindness (Lushkoff & Olga in The Beggar)"
        ],
        "subtopics": [
          {
            "id": "eng9-05-01",
            "title": "The Lost Child & The Adventures of Toto Analysis",
            "titleKn": "ದಿ ಲಾಸ್ಟ್ ಚೈಲ್ಡ್ & ಅಡ್ವೆಂಚರ್ಸ್ ಆಫ್ ಟೋಟೋ ವಿಶ್ಲೇಷಣೆ",
            "titleHi": "The Lost Child और The Adventures of Toto की समीक्षा",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "eng9-05-02",
            "title": "In the Kingdom of Fools (Folklore & Humour) & The Happy Prince",
            "titleKn": "ಇನ್ ದಿ ಕಿಂಗ್ಡಮ್ ಆಫ್ ಫೂಲ್ಸ್ & ದಿ ಹ್ಯಾಪಿ ಪ್ರಿನ್ಸ್",
            "titleHi": "In the Kingdom of Fools और The Happy Prince",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "eng9-05-03",
            "title": "The Last Leaf (Behrman's Masterpiece) & The Beggar",
            "titleKn": "ದಿ ಲಾಸ್ಟ್ ಲೀಫ್ ಮತ್ತು ದಿ ಬೆಗ್ಗರ್ ಕಥೆಗಳು",
            "titleHi": "The Last Leaf (कला और त्याग) और The Beggar",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c8-math",
    "name": "Mathematics",
    "nameKn": "ಗಣಿತಶಾಸ್ತ್ರ (Mathematics)",
    "nameHi": "गणित (Mathematics)",
    "classGrade": "Class 8",
    "icon": "Calculator",
    "color": "#1d4ed8",
    "badgeBg": "bg-blue-50 text-blue-800 border-blue-200",
    "borderColor": "border-blue-500",
    "chapters": [
      {
        "id": "m8-01",
        "chapterNumber": 1,
        "title": "Rational Numbers",
        "titleKn": "ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳು (Rational Numbers)",
        "titleHi": "परिमेय संख्याएँ (Rational Numbers)",
        "unit": "Unit I: Number Systems",
        "unitKn": "ಘಟಕ ೧: ಸಂಖ್ಯಾ ಪದ್ಧತಿಗಳು",
        "unitHi": "इकाई १: संख्या पद्धतियाँ",
        "description": "Properties of Rational Numbers (Closure, Commutativity, Associativity, Distributivity of Multiplication over Addition), Additive and Multiplicative Identity/Inverse, Rational Numbers between Two Rational Numbers.",
        "descriptionKn": "ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳ ಗುಣಲಕ್ಷಣಗಳು (ಸಂವೃತ, ಪರಿವರ್ತನೀಯ, ಸಹವರ್ತನೀಯ, ವಿಭಾಜಕ ನಿಯಮ), ಸಂಕಲನ ಮತ್ತು ಗುಣಾಕಾರದ ಅನನ್ಯತೆಗಳು.",
        "descriptionHi": "परिमेय संख्याओं के गुणधर्म (संवृत, क्रमविनिमेय, साहचर्य, वितरकता), योज्य व गुणात्मक तत्समक/प्रतिलोम, दो परिमेय संख्याओं के बीच संख्याएं ज्ञात करना।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Closure: a/b + c/d is rational",
          "Commutative: a + b = b + a, a × b = b × a",
          "Additive Inverse of a is -a",
          "Multiplicative Inverse (Reciprocal) of a/b is b/a",
          "Distributive: a(b + c) = ab + ac"
        ],
        "subtopics": [
          {
            "id": "m8-01-01",
            "title": "Rational Numbers Definition & Closure/Commutative Properties",
            "titleKn": "ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳ ವ್ಯಾಖ್ಯೆ ಮತ್ತು ಸಂವೃತ-ಪರಿವರ್ತನೀಯ ಗುಣಗಳು",
            "titleHi": "परिमेय संख्या की परिभाषा, संवृत और क्रमविनिमेय गुणधर्म",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m8-01-02",
            "title": "Associative & Distributive Properties Verification",
            "titleKn": "ಸಹವರ್ತನೀಯ ಮತ್ತು ವಿಭಾಜಕ ಗುಣಗಳ ಪರಿಶೀಲನೆ",
            "titleHi": "साहचर्य और गुणन की योग पर वितरकता का सत्यापन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m8-01-03",
            "title": "Additive Inverse & Multiplicative Inverse (Reciprocal)",
            "titleKn": "ಸಂಕಲನದ ವಿಲೋಮ ಮತ್ತು ಗುಣಾಕಾರದ ವಿಲೋಮ (ವ್ಯುತ್ಕ್ರಮ)",
            "titleHi": "योज्य प्रतिलोम और गुणात्मक प्रतिलोम (व्युत्क्रम)",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "m8-01-04",
            "title": "Finding Rational Numbers between Two Rational Numbers",
            "titleKn": "ಎರಡು ಭಾಗಲಬ್ಧ ಸಂಖ್ಯೆಗಳ ನಡುವೆ ಸಂಖ್ಯೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯುವುದು",
            "titleHi": "दी गई दो परिमेय संख्याओं के बीच परिमेय संख्याएं ज्ञात करना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m8-02",
        "chapterNumber": 2,
        "title": "Linear Equations in One Variable",
        "titleKn": "ಒಂದು ಚರಾಕ್ಷರವಿರುವ ರೇಖಾತ್ಮಕ ಸಮೀಕರಣಗಳು",
        "titleHi": "एक चर वाले रैखिक समीकरण",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई २: बीजगणित",
        "description": "Solving Linear Equations having Linear Expressions on One Side and Numbers on the Other, Applications (Word Problems on Ages, Numbers, Perimeter, Currency Notes), Equations having Variable on Both Sides, Reducing Equations to Simpler Form.",
        "descriptionKn": "ಒಂದು ಚರಾಕ್ಷರದ ಸಮೀಕರಣಗಳ ಪರಿಹಾರ, ವಯಸ್ಸು ಮತ್ತು ಸಂಖ್ಯೆಗಳ ಮೇಲಿನ ಅನ್ವಯಿಕ ಲೆಕ್ಕಗಳು, ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಚರಾಕ್ಷರವಿರುವ ಸಮೀಕರಣಗಳು.",
        "descriptionHi": "एक तरफ व्यंजक और दूसरी तरफ संख्या वाले समीकरण, दोनों पक्षों में चर वाले समीकरण, समीकरणों को सरल रूप में बदलना और आयु/संख्या आधारित व्यावहारिक समस्याएं।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Transposition method: + changes to -, × changes to ÷ across '=' sign",
          "Cross-multiplication: If (ax+b)/(cx+d) = k/m ⇒ m(ax+b) = k(cx+d)"
        ],
        "subtopics": [
          {
            "id": "m8-02-01",
            "title": "Solving Basic Linear Equations with Variable on One Side",
            "titleKn": "ಒಂದು ಬದಿಯಲ್ಲಿ ಚರಾಕ್ಷರವಿರುವ ಸಮೀಕರಣಗಳ ಪರಿಹಾರ",
            "titleHi": "एक पक्ष में चर वाले रैखिक समीकरणों का हल",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m8-02-02",
            "title": "Equations with Variables on Both Sides & Verification",
            "titleKn": "ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಚರಾಕ್ಷರವಿರುವ ಸಮೀಕರಣಗಳು & ತಾಳೆ ನೋಡುವುದು",
            "titleHi": "दोनों पक्षों में चर वाले समीकरण और उत्तर की जांच",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m8-02-03",
            "title": "Real-life Word Problems: Age, Perimeter, Money and Digit Problems",
            "titleKn": "ವಯಸ್ಸು, ಸುತ್ತಳತೆ ಮತ್ತು ಸಂಖ್ಯೆಗಳ ಅನ್ವಯಿಕ ಸಮಸ್ಯೆಗಳು",
            "titleHi": "आयु, परिमाप और अंकों के स्थान बदलने वाले शब्द प्रश्न",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": true
          },
          {
            "id": "m8-02-04",
            "title": "Reducing Complex Equations to Simpler Linear Form & Cross-Multiplication",
            "titleKn": "ಕ್ಲಿಷ್ಟಕರ ಸಮೀಕರಣಗಳನ್ನು ಸರಳ ರೂಪಕ್ಕೆ ತರುವುದು",
            "titleHi": "समीकरणों को सरल रूप में बदलना और वज्र-गुणन विधि",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m8-03",
        "chapterNumber": 3,
        "title": "Understanding Quadrilaterals",
        "titleKn": "ಚತುರ್ಭುಜಗಳ ತಿಳುವಳಿಕೆ",
        "titleHi": "चतुर्भुजों को समझना",
        "unit": "Unit III: Geometry",
        "unitKn": "ಘಟಕ ೩: ರೇಖಾಗಣಿತ",
        "unitHi": "इकाई ३: ज्यामिति",
        "description": "Polygons (Convex, Concave, Regular, Irregular), Angle Sum Property of a Polygon (Interior Angles = (n-2)×180°, Sum of Exterior Angles = 360°), Kinds of Quadrilaterals (Trapezium, Kite, Parallelogram, Rhombus, Rectangle, Square) and their Geometric Properties.",
        "descriptionKn": "ಬಹುಭುಜಾಕೃತಿಗಳು, ಒಳಕೋನಗಳ ಮೊತ್ತ ಸೂತ್ರ, ಹೊರಕೋನಗಳ ಮೊತ್ತ (೩೬೦°), ತ್ರಾಪಿಜ್ಯ, ಗಾಳಿಪಟ, ಸಮಾಂತರ ಚತುರ್ಭುಜ, ವಜ್ರಾಕೃತಿ, ಆಯತ ಮತ್ತು ಚೌಕದ ಗುಣಗಳು.",
        "descriptionHi": "बहुभुज के प्रकार (उत्तल, अवतल, सम बहुभुज), बहुभुज के अंतःकोणों का योग ((n-2)×180°) व बाह्य कोणों का योग (360°), समलंब, पतंग, समांतर चतुर्भुज, समचतुर्भुज, आयत और वर्ग के गुणधर्म।",
        "status": "In Progress",
        "completionPercent": 70,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Sum of interior angles of n-sided polygon = (n - 2) × 180°",
          "Each interior angle of regular n-gon = [(n - 2) × 180°] / n",
          "Sum of exterior angles of ANY polygon = 360°",
          "Each exterior angle of regular n-gon = 360° / n"
        ],
        "subtopics": [
          {
            "id": "m8-03-01",
            "title": "Polygons Classification & Regular vs Irregular Polygons",
            "titleKn": "ಬಹುಭುಜಾಕೃತಿಗಳ ವಿಧಗಳು & ನಿಯಮಿತ ಬಹುಭುಜಾಕೃತಿ",
            "titleHi": "बहुभुज की परिभाषा, उत्तल/अवतल और सम बहुभुज",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "m8-03-02",
            "title": "Sum of Interior Angles & Exterior Angles of Polygons (360° Rule)",
            "titleKn": "ಒಳಕೋನಗಳು ಮತ್ತು ಹೊರಕೋನಗಳ ಮೊತ್ತದ ಸೂತ್ರಗಳು",
            "titleHi": "बहुभुज के अंतःकोणों का योग और बाह्य कोणों का 360° नियम",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m8-03-03",
            "title": "Properties of Parallelogram: Sides, Angles and Diagonals",
            "titleKn": "ಸಮಾಂತರ ಚತುರ್ಭುಜದ ಬಾಹುಗಳು, ಕೋನಗಳು & ಕರ್ಣಗಳ ಗುಣಗಳು",
            "titleHi": "समांतर चतुर्भुज के सम्मुख कोण, भुजाएं और विकर्ण",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m8-03-04",
            "title": "Special Parallelograms: Rhombus, Rectangle and Square Properties",
            "titleKn": "ವಜ್ರಾಕೃತಿ, ಆಯತ ಮತ್ತು ಚೌಕದ ವಿಶಿಷ್ಟ ಲಕ್ಷಣಗಳು",
            "titleHi": "समचतुर्भुज, आयत और वर्ग के विशेष गुणधर्म",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m8-04",
        "chapterNumber": 4,
        "title": "Data Handling",
        "titleKn": "ದತ್ತಾಂಶಗಳ ನಿರ್ವಹಣೆ (Data Handling)",
        "titleHi": "आँकड़ों का प्रबंधन (Data Handling)",
        "unit": "Unit IV: Statistics & Probability",
        "unitKn": "ಘಟಕ ೪: ಸಂಖ್ಯಾಶಾಸ್ತ್ರ & ಸಂಭವನೀಯತೆ",
        "unitHi": "इकाई ४: सांख्यिकी और प्रायिकता",
        "description": "Organising Data (Grouped Frequency Distribution), Histograms, Circle Graphs or Pie Charts (Calculating Central Angle θ = (Value/Total) × 360°), Chance and Probability (Outcomes, Equally Likely Outcomes, Linking Chances to Probability).",
        "descriptionKn": "ವರ್ಗೀಕೃತ ಆವರ್ತಿ ಕೋಷ್ಟಕ, ಆಯತಚಿತ್ರಗಳು, ವೃತ್ತ ನಕ್ಷೆಗಳು (ಪೈ ಚಾರ್ಟ್), ಕೇಂದ್ರ ಕೋನದ ಲೆಕ್ಕಾಚಾರ ಮತ್ತು ಸಂಭವನೀಯತೆ ಪರಿಚಯ.",
        "descriptionHi": "आंकड़ों का संगठन (वर्ग अंतराल), आयत चित्र, वृत्त आलेख (पाई चार्ट) का निर्माण (केंद्रीय कोण की गणना) और प्रायिकता की प्रारंभिक संकल्पना।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Central angle for pie chart component = (Component Value / Total Value) × 360°",
          "Probability P(E) = Number of favorable outcomes / Total outcomes"
        ],
        "subtopics": [
          {
            "id": "m8-04-01",
            "title": "Grouped Frequency Distribution Table & Class Intervals / Limits",
            "titleKn": "ವರ್ಗೀಕೃತ ಆವರ್ತಿ ಕೋಷ್ಟಕ ಮತ್ತು ವರ್ಗಾಂತರಗಳು",
            "titleHi": "वर्गीकृत बारंबारता सारणी और वर्ग सीमाएं",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m8-04-02",
            "title": "Drawing & Reading Histograms with Class Intervals",
            "titleKn": "ಆಯತಚಿತ್ರಗಳ ರಚನೆ ಮತ್ತು ಓದುವಿಕೆ",
            "titleHi": "आयत चित्र बनाना और दिए गए आयत चित्र से उत्तर देना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m8-04-03",
            "title": "Drawing Circle Graphs (Pie Charts) using Central Angle Formula",
            "titleKn": "ಕೇಂದ್ರ ಕೋನ ಸೂತ್ರ ಬಳಸಿ ಪೈ ಚಾರ್ಟ್ ರಚಿಸುವುದು",
            "titleHi": "केंद्रीय कोण की गणना और पाई चार्ट का निर्माण",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m8-04-04",
            "title": "Introduction to Probability: Coins, Dice & Spinner Outcomes",
            "titleKn": "ಸಂಭವನೀಯತೆ ಪರಿಚಯ: ನಾಣ್ಯ, ದಾಳಗಳ ಫಲಿತಾಂಶಗಳು",
            "titleHi": "प्रायिकता की समझ (सिक्का, पासा व चक्र के परिणाम)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m8-05",
        "chapterNumber": 5,
        "title": "Square and Square Roots",
        "titleKn": "ವರ್ಗ ಮತ್ತು ವರ್ಗಮೂಲಗಳು",
        "titleHi": "वर्ग और वर्गमूल",
        "unit": "Unit V: Arithmetic",
        "unitKn": "ಘಟಕ ೫: ಅಂಕಗಣಿತ",
        "unitHi": "इकाई ५: अंकगणित",
        "description": "Properties of Square Numbers (Units Digit Patterns, Pythagorean Triplets 2m, m²-1, m²+1), Finding Square Root by Prime Factorisation Method, Finding Square Root by Long Division Method, Square Roots of Decimals.",
        "descriptionKn": "ವರ್ಗ ಸಂಖ್ಯೆಗಳ ಲಕ್ಷಣಗಳು, ಪೈಥಾಗೋರಿಯನ್ ತ್ರಿವಳಿಗಳು (೨m, m²-೧, m²+೧), ಅವಿಭಾಜ್ಯ ಅಪವರ್ತನ ವಿಧಾನದಿಂದ ವರ್ಗಮೂಲ, ಭಾಗಾಕಾರ ವಿಧಾನದಿಂದ ವರ್ಗಮೂಲ.",
        "descriptionHi": "वर्ग संख्याओं के गुणधर्म, पाइथागोरियन त्रिक (2m, m²-1, m²+1), अभाज्य गुणनखंड विधि से वर्गमूल, दीर्घ विभाजन विधि द्वारा वर्गमूल और दशमलव संख्याओं का वर्गमूल।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Pythagorean Triplet: (2m)², (m² - 1)², (m² + 1)²",
          "Square of odd number is odd; Square of even is even",
          "Number of zeroes in square is always even"
        ],
        "subtopics": [
          {
            "id": "m8-05-01",
            "title": "Properties of Square Numbers & Unit Digits Patterns",
            "titleKn": "ವರ್ಗ ಸಂಖ್ಯೆಗಳ ಗುಣಲಕ್ಷಣಗಳು ಮತ್ತು ಕೊನೆಯ ಅಂಕಿಗಳ ಮಾದರಿ",
            "titleHi": "वर्ग संख्याओं के गुणधर्म और इकाई अंक के पैटर्न",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m8-05-02",
            "title": "Pythagorean Triplets Formula (2m, m²-1, m²+1)",
            "titleKn": "ಪೈಥಾಗೋರಿಯನ್ ತ್ರಿವಳಿಗಳ ಸೂತ್ರ ಮತ್ತು ಲೆಕ್ಕಗಳು",
            "titleHi": "पाइथागोरियन त्रिक ज्ञात करने का सूत्र",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m8-05-03",
            "title": "Finding Square Root by Prime Factorisation Method",
            "titleKn": "ಅವಿಭಾಜ್ಯ ಅಪವರ್ತನ ವಿಧಾನದಿಂದ ವರ್ಗಮೂಲ",
            "titleHi": "अभाज्य गुणनखंड विधि द्वारा वर्गमूल ज्ञात करना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m8-05-04",
            "title": "Finding Square Root by Long Division Method & Decimals",
            "titleKn": "ಭಾಗಾಕಾರ ವಿಧಾನದಿಂದ ವರ್ಗಮೂಲ ಮತ್ತು ದಶಮಾಂಶಗಳ ವರ್ಗಮೂಲ",
            "titleHi": "भाग विधि (दीर्घ विभाजन) द्वारा पूर्ण वर्ग व दशमलव का वर्गमूल",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m8-06",
        "chapterNumber": 6,
        "title": "Cube and Cube Roots",
        "titleKn": "ಘನ ಮತ್ತು ಘನಮೂಲಗಳು",
        "titleHi": "घन और घनमूल",
        "unit": "Unit V: Arithmetic",
        "unitKn": "ಘಟಕ ೫: ಅಂಕಗಣಿತ",
        "unitHi": "इकाई ۵: अंकगणಿತ",
        "description": "Properties of Cubes of Numbers, Hardy-Ramanujan Numbers (1729 = 1³+12³ = 9³+10³), Finding Cube Root through Prime Factorisation Method.",
        "descriptionKn": "ಘನ ಸಂಖ್ಯೆಗಳ ಲಕ್ಷಣಗಳು, ಹಾರ್ಡಿ-ರಾಮಾನುಜನ್ ಸಂಖ್ಯೆಗಳು (೧೭೨೯), ಅವಿಭಾಜ್ಯ ಅಪವರ್ತನ ವಿಧಾನದಿಂದ ಘನಮೂಲ ಕಂಡುಹಿಡಿಯುವುದು.",
        "descriptionHi": "घन संख्याओं के गुणधर्म, हार्डी-रामानुजन संख्या (1729 = 1³+12³ = 9³+10³), अभाज्य गुणनखंड विधि द्वारा घनमूल ज्ञात करना।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 6,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Hardy-Ramanujan Number: 1729 = 1728 + 1 = 1000 + 729",
          "Cube of even number is even, cube of odd number is odd",
          "Prime factor triplets for perfect cubes"
        ],
        "subtopics": [
          {
            "id": "m8-06-01",
            "title": "Cubes of Numbers & Hardy-Ramanujan Numbers (1729, 4104)",
            "titleKn": "ಘನ ಸಂಖ್ಯೆಗಳ ಪರಿಕಲ್ಪನೆ ಮತ್ತು ರಾಮಾನುಜನ್ ಸಂಖ್ಯೆಗಳು",
            "titleHi": "घन की संकल्पना और हार्डी-रामानुजन संख्याएं",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "m8-06-02",
            "title": "Prime Factorisation Method to Find Cube Root of Numbers",
            "titleKn": "ಅವಿಭಾಜ್ಯ ಅಪವರ್ತನದಿಂದ ಘನಮೂಲ ಲೆಕ್ಕಾಚಾರ",
            "titleHi": "अभाज्य गुणनखंड विधि से घनमूल ज्ञात करना",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m8-06-03",
            "title": "NCERT Chapter 6 Problem Drills & Smallest Multiplier Problems",
            "titleKn": "ಚಿಕ್ಕ ಗುಣಕ ಕಂಡುಹಿಡಿಯುವ ಸಮಸ್ಯೆಗಳು & ಅಭ್ಯಾಸ",
            "titleHi": "NCERT अभ्यास और पूर्ण घन बनाने वाली न्यूनतम संख्या",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "m8-07",
        "chapterNumber": 7,
        "title": "Comparing Quantities",
        "titleKn": "ಪ್ರಮಾಣಗಳ ಹೋಲಿಕೆ (Comparing Quantities)",
        "titleHi": "राशियों की तुलना (Comparing Quantities)",
        "unit": "Unit V: Arithmetic",
        "unitKn": "ಘಟಕ ೫: ಅಂಕಗಣಿತ",
        "unitHi": "इकाई ५: अंकगणित",
        "description": "Ratios and Percentages, Increase or Decrease Percent, Discounts and Marked Price (Discount = MP - SP), Sales Tax / Value Added Tax (VAT) / Goods and Services Tax (GST), Compound Interest Formula (Annually and Semi-Annually compounded).",
        "descriptionKn": "ಅನುಪಾತ ಮತ್ತು ಶೇಕಡಾವಾರು, ರಿಯಾಯಿತಿ ಮತ್ತು ಮುಖಬೆಲೆ (MP), ಜಿಎಸ್‌ಟಿ ಲೆಕ್ಕಾಚಾರ, ಚಕ್ರಬಡ್ಡಿ ಸೂತ್ರ (ವಾರ್ಷಿಕ ಮತ್ತು ಅರ್ಧವಾರ್ಷಿಕ).",
        "descriptionHi": "अनुपात और प्रतिशत, बट्टा (छूट = अंकित मूल्य - विक्रय मूल्य), GST की गणना, चक्रवृद्धि ब्याज सूत्र (वार्षिक और अर्धवार्षिक संयोजन)।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Discount = Marked Price (MP) - Selling Price (SP)",
          "Discount % = (Discount / MP) × 100",
          "Amount with Compound Interest: A = P(1 + R/100)^n",
          "Compound Interest: CI = A - P",
          "Semi-annual compounding: R' = R/2, n' = 2n"
        ],
        "subtopics": [
          {
            "id": "m8-07-01",
            "title": "Ratios, Percentage Conversion & Increase/Decrease Percentage",
            "titleKn": "ಅನುಪಾತ ಮತ್ತು ಶೇಕಡಾ ಹೆಚ್ಚಳ/ಇಳಿಕೆ ಲೆಕ್ಕಗಳು",
            "titleHi": "अनुपात, प्रतिशत में रूपांतरण और प्रतिशत वृद्धि/कमी",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m8-07-02",
            "title": "Marked Price, Discount Percentage & GST Calculation",
            "titleKn": "ಮುಖಬೆಲೆ, ರಿಯಾಯಿತಿ ಶೇಕಡಾವಾರು ಮತ್ತು ಜಿಎಸ್‌ಟಿ",
            "titleHi": "अंकित मूल्य, बट्टा प्रतिशत और GST की गणना",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m8-07-03",
            "title": "Compound Interest Formula Derivation (Annually Compounded)",
            "titleKn": "ವಾರ್ಷಿಕ ಚಕ್ರಬಡ್ಡಿ ಸೂತ್ರದ ಸಾಧನೆ",
            "titleHi": "चक्रवृद्धि ब्याज सूत्र (A = P(1 + R/100)^n) का निगमन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "m8-07-04",
            "title": "Half-Yearly Compounding & Real-life Population/Depreciation Applications",
            "titleKn": "ಅರ್ಧವಾರ್ಷಿಕ ಚಕ್ರಬಡ್ಡಿ ಮತ್ತು ಜನಸಂಖ್ಯೆ ಲೆಕ್ಕಗಳು",
            "titleHi": "अर्धवार्षिक चक्रवृद्धि ब्याज और जनसंख्या/मूल्यह्रास प्रश्न",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m8-08",
        "chapterNumber": 8,
        "title": "Algebraic Expressions and Identities",
        "titleKn": "ಬೀಜಗಣಿತೀಯ ಅಭಿವ್ಯಕ್ತಿಗಳು ಮತ್ತು ನಿತ್ಯಸಮೀಕರಣಗಳು",
        "titleHi": "बीजीय व्यंजक एवं सर्वसमिकाएँ",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई २: बीजगणित",
        "description": "Terms, Factors and Coefficients, Monomials, Binomials, Polynomials, Like and Unlike Terms, Addition and Subtraction of Algebraic Expressions, Multiplication of Expressions (Monomial by Monomial, Monomial by Polynomial, Binomial by Binomial), Standard Identities.",
        "descriptionKn": "ಪದಗಳು, ಅಪವರ್ತನಗಳು, ಏಕಪದೋಕ್ತಿ, ದ್ವಿಪದೋಕ್ತಿ, ಸಜಾತೀಯ-ವಿಜಾತೀಯ ಪದಗಳು, ಬೀಜಗಣಿತೀಯ ಗುಣಾಕಾರ ಮತ್ತು ನಿತ್ಯಸಮೀಕರಣಗಳು.",
        "descriptionHi": "पद, गुणनखंड, गुणांक, एकपदी, द्विपदी, बहुपद, समान व असमान पद, बीजीय व्यंजकों का जोड़, घटाना और गुणा, मानक सर्वसमिकाएँ।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Identity I: (a + b)² = a² + 2ab + b²",
          "Identity II: (a - b)² = a² - 2ab + b²",
          "Identity III: (a + b)(a - b) = a² - b²",
          "Identity IV: (x + a)(x + b) = x² + (a + b)x + ab"
        ],
        "subtopics": [
          {
            "id": "m8-08-01",
            "title": "Monomials, Binomials, Polynomials, Like Terms & Addition/Subtraction",
            "titleKn": "ಬೀಜಗಣಿತೀಯ ಪದಗಳು ಮತ್ತು ಸಂಕಲನ-ವ್ಯವಕಲನ",
            "titleHi": "व्यंजक के प्रकार, समान पद और व्यंजकों का योग व व्यवकलन",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "m8-08-02",
            "title": "Multiplication of Algebraic Expressions (Monomial × Polynomial, Binomial × Binomial)",
            "titleKn": "ಬೀಜಗಣಿತೀಯ ಅಭಿವ್ಯಕ್ತಿಗಳ ಗುಣಾಕಾರ",
            "titleHi": "बीजीय व्यंजकों का गुणा (द्विपद × द्विपद)",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "m8-08-03",
            "title": "4 Standard Algebraic Identities Proofs & Geometric Meaning",
            "titleKn": "೪ ಮಾನಕ ನಿತ್ಯಸಮೀಕರಣಗಳ ಸಾಧನೆಗಳು",
            "titleHi": "4 मानक बीजीय सर्वसमिकाओं की उपपत्ति",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "m8-08-04",
            "title": "Applying Identities for Numerical Calculations & NCERT Drills",
            "titleKn": "ನಿತ್ಯಸಮೀಕರಣಗಳನ್ನು ಬಳಸಿ ಲೆಕ್ಕ ಮಾಡುವುದು",
            "titleHi": "सर्वसमिकाओं का उपयोग करके संख्याओं का वर्ग व गुणन",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m8-09",
        "chapterNumber": 9,
        "title": "Mensuration",
        "titleKn": "ಕ್ಷೇತ್ರಗಣಿತ (Mensuration)",
        "titleHi": "क्षेत्रमिति (Mensuration)",
        "unit": "Unit VI: Mensuration",
        "unitKn": "ಘಟಕ ೬: ಕ್ಷೇತ್ರಗಣಿತ",
        "unitHi": "इकाई ६: क्षेत्रमिति",
        "description": "Area of Trapezium, Area of General Quadrilateral, Area of Special Quadrilaterals (Rhombus), Area of Polygon, Surface Area and Volume of Solid Shapes (Cube, Cuboid, Cylinder).",
        "descriptionKn": "ತ್ರಾಪಿಜ್ಯದ ವಿಸ್ತೀರ್ಣ, ಸಾಮಾನ್ಯ ಚತುರ್ಭುಜದ ವಿಸ್ತೀರ್ಣ, ವಜ್ರಾಕೃತಿಯ ವಿಸ್ತೀರ್ಣ, ಆಯತಘನ, ಘನ ಮತ್ತು ಸಿಲಿಂಡರ್‌ನ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ ಮತ್ತು ಘನಫಲ.",
        "descriptionHi": "समलंब का क्षेत्रफल, सामान्य चतुर्भुज का क्षेत्रफल, समचतुर्भुज का क्षेत्रफल (1/2 d1 d2), बहुभुज का क्षेत्रफल, घन, घनाभ व बेलन का पृष्ठीय क्षेत्रफल और आयतन।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 10,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Trapezium Area = 1/2 × (a + b) × h",
          "Rhombus Area = 1/2 × d1 × d2",
          "Cuboid: TSA = 2(lb + bh + hl), Vol = l × b × h",
          "Cube: TSA = 6a², Vol = a³",
          "Cylinder: CSA = 2πrh, TSA = 2πr(r + h), Vol = πr²h"
        ],
        "subtopics": [
          {
            "id": "m8-09-01",
            "title": "Area of Trapezium & Area of Rhombus (1/2 d1*d2)",
            "titleKn": "ತ್ರಾಪಿಜ್ಯ ಮತ್ತು ವಜ್ರಾಕೃತಿಯ ವಿಸ್ತೀರ್ಣದ ಸೂತ್ರಗಳು",
            "titleHi": "समलंब और समचतुर्भुज (1/2 d1 d2) का क्षेत्रफल",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m8-09-02",
            "title": "Area of General Polygons by Splitting into Triangles/Trapeziums",
            "titleKn": "ಬಹುಭುಜಾಕೃತಿಗಳ ವಿಸ್ತೀರ್ಣ ವಿಭಜಿಸಿ ಲೆಕ್ಕ ಹಾಕುವುದು",
            "titleHi": "बहुभुज को त्रिभुजों व समलंबों में बांटकर क्षेत्रफल निकालना",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m8-09-03",
            "title": "Surface Area of Cube, Cuboid and Right Circular Cylinder",
            "titleKn": "ಘನ, ಆಯತಘನ ಮತ್ತು ಸಿಲಿಂಡರ್ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣ",
            "titleHi": "घन, घनाभ और बेलन का कुल व वक्र पृष्ठीय क्षेत्रफल",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "m8-09-04",
            "title": "Volume and Capacity of Cube, Cuboid & Cylinder (Litres Conversion)",
            "titleKn": "ಘನಫಲ ಮತ್ತು ಸಾಮರ್ಥ್ಯ (ಲೀಟರ್ ಪರಿವರ್ತನೆ)",
            "titleHi": "आयतन और धारिता (1 m³ = 1000 L) पर आधारित प्रश्न",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m8-10",
        "chapterNumber": 10,
        "title": "Exponents and Powers",
        "titleKn": "ಘಾತಗಳು ಮತ್ತು ಘಾತಾಂಕಗಳು",
        "titleHi": "घातांक और घात",
        "unit": "Unit I: Arithmetic & Algebra",
        "unitKn": "ಘಟಕ ೧: ಅಂಕಗಣಿತ & ಬೀಜಗಣಿತ",
        "unitHi": "इकाई १: अंकगणित और बीजगणित",
        "description": "Powers with Negative Exponents, Laws of Exponents (a^m × a^n = a^(m+n), a^m / a^n = a^(m-n), (a^m)^n = a^(mn), a^m × b^m = (ab)^m, a^0 = 1), Use of Exponents to Express Small and Large Numbers in Standard Form (Scientific Notation).",
        "descriptionKn": "ಋಣಾತ್ಮಕ ಘಾತಾಂಕಗಳು, ಘಾತಾಂಕಗಳ ನಿಯಮಗಳು, ವೈಜ್ಞಾನಿಕ ಸಂಕೇತ / ಪ್ರಮಾಣಿತ ರೂಪದಲ್ಲಿ ಸಂಖ್ಯೆಗಳನ್ನು ಬರೆಯುವುದು.",
        "descriptionHi": "ऋणात्मक घातांक वाली घातें, घातांक के नियम (a^m × a^n = a^(m+n) आदि), बहुत बड़ी व बहुत छोटी संख्याओं को मानक रूप (वैज्ञानिक संकेतन) में व्यक्त करना।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "a^(-m) = 1 / a^m",
          "a^m × a^n = a^(m+n)",
          "a^m / a^n = a^(m-n)",
          "(a^m)^n = a^(mn)",
          "a^0 = 1",
          "Standard Form: k × 10^n (1 ≤ k < 10)"
        ],
        "subtopics": [
          {
            "id": "m8-10-01",
            "title": "Powers with Negative Exponents & Reciprocal Concept",
            "titleKn": "ಋಣಾತ್ಮಕ ಘಾತಗಳು ಮತ್ತು ವ್ಯುತ್ಕ್ರಮ ಪರಿಕಲ್ಪನೆ",
            "titleHi": "ऋणात्मक घातांक की अवधारणा (a^-m = 1/a^m)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "m8-10-02",
            "title": "Comprehensive Practice of Laws of Exponents with Integer Powers",
            "titleKn": "ಘಾತಾಂಕ ನಿಯಮಗಳ ಸಮಗ್ರ ಅಭ್ಯಾಸ",
            "titleHi": "घातांक के सभी नियमों का पूर्णांक घातों के साथ अभ्यास",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m8-10-03",
            "title": "Standard Scientific Notation Form (k × 10^n) & Comparing Numbers",
            "titleKn": "ವೈಜ್ಞಾನಿಕ ಪ್ರಮಾಣಿತ ರೂಪ (k × 10^n) & ಹೋಲಿಕೆ",
            "titleHi": "मानक रूप (वैज्ञानिक संकेतन) में बदलना और तुलना करना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m8-11",
        "chapterNumber": 11,
        "title": "Direct and Inverse Proportions",
        "titleKn": "ನೇರ ಮತ್ತು ವಿಲೋಮ ಅನುಪಾತಗಳು",
        "titleHi": "सीधा और प्रतिलोम समानुपात",
        "unit": "Unit I: Arithmetic & Algebra",
        "unitKn": "ಘಟಕ ೧: ಅಂಕಗಣಿತ & ಬೀಜಗಣಿತ",
        "unitHi": "इकाई १: अंकगणित और बीजगणित",
        "description": "Concept of Direct Proportion (x/y = k or x1/y1 = x2/y2), Concept of Inverse Proportion (xy = k or x1×y1 = x2×y2), Real-life Applications (Speed and Time, Men and Days, Cost and Quantity).",
        "descriptionKn": "ನೇರ ಅನುಪಾತ (x/y = k), ವಿಲೋಮ ಅನುಪಾತ (xy = k), ಕೆಲಸ ಮತ್ತು ದಿನಗಳು, ವೇಗ ಮತ್ತು ಸಮಯದ ನೈಜ ಸಮಸ್ಯೆಗಳ ಪರಿಹಾರ.",
        "descriptionHi": "सीधा समानुपात (x1/y1 = x2/y2), प्रतिलोम समानुपात (x1 y1 = x2 y2), समय और कार्य, चाल और समय से संबंधित व्यावहारिक समस्याएं।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Direct Proportion: x / y = Constant k ⇒ x1 / y1 = x2 / y2",
          "Inverse Proportion: x × y = Constant k ⇒ x1 × y1 = x2 × y2"
        ],
        "subtopics": [
          {
            "id": "m8-11-01",
            "title": "Concept of Direct Proportion & Constant of Variation (x/y = k)",
            "titleKn": "ನೇರ ಅನುಪಾತದ ಪರಿಕಲ್ಪನೆ ಮತ್ತು ಸ್ಥಿರಾಂಕ (x/y = k)",
            "titleHi": "सीधे समानुपात की पहचान और सूत्र x1/y1 = x2/y2",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "m8-11-02",
            "title": "Direct Proportion Word Problems: Cost, Distance, Scale Drawings",
            "titleKn": "ನೇರ ಅನುಪಾತದ ನೈಜ ಲೆಕ್ಕಗಳು",
            "titleHi": "दूरी, मूल्य और मानचित्र पैमाने पर सीधे समानुपात के प्रश्न",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "m8-11-03",
            "title": "Concept of Inverse Proportion (xy = k) & Speed-Time / Men-Days Problems",
            "titleKn": "ವಿಲೋಮ ಅನುಪಾತ (xy = k) & ವೇಗ-ಸಮಯ, ಆಳು-ದಿನ ಲೆಕ್ಕಗಳು",
            "titleHi": "प्रतिलोम समानुपात (x1 y1 = x2 y2) और कार्य-समय के प्रश्न",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m8-12",
        "chapterNumber": 12,
        "title": "Factorisation",
        "titleKn": "ಅಪವರ್ತಿಸುವಿಕೆ (Factorisation)",
        "titleHi": "गुणनखंडन (Factorisation)",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई २: बीजगणित",
        "description": "What is Factorisation?, Method of Common Factors, Factorisation by Regrouping Terms, Factorisation using Algebraic Identities (a²-b², (a+b)², (a-b)²), Factors of the Form (x+a)(x+b) / Middle Term Splitting, Division of Algebraic Expressions (Monomial by Monomial, Polynomial by Monomial, Polynomial by Polynomial).",
        "descriptionKn": "ಸಾಮಾನ್ಯ ಅಪವರ್ತನ ವಿಧಾನ, ಗುಂಪು ಮಾಡುವ ವಿಧಾನ, ನಿತ್ಯಸಮೀಕರಣಗಳಿಂದ ಅಪವರ್ತನ, ಮಧ್ಯಪದ ವಿಭಜನೆ ಮತ್ತು ಬೀಜಗಣಿತೀಯ ಭಾಗಾಕಾರ.",
        "descriptionHi": "सार्व गुणनखंड विधि, पदों के पुनर्समूहन द्वारा गुणनखंडन, सर्वसमिकाओं का उपयोग करके गुणनखंड, मध्य पद विभक्त करके गुणनखंड और बीजीय व्यंजकों का भाग।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Common Factor: 2x + 4 = 2(x + 2)",
          "Identity III: a² - b² = (a + b)(a - b)",
          "Middle Term: x² + (a+b)x + ab = (x + a)(x + b)",
          "Division: (Dividend) = (Divisor × Quotient) + Remainder"
        ],
        "subtopics": [
          {
            "id": "m8-12-01",
            "title": "Common Factor Method & Regrouping Terms Factorisation",
            "titleKn": "ಸಾಮಾನ್ಯ ಅಪವರ್ತನ ಮತ್ತು ಗುಂಪು ಮಾಡುವ ವಿಧಾನ",
            "titleHi": "सार्व गुणनखंड विधि और पदों के पुनर्समूहन द्वारा गुणनखंडन",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "m8-12-02",
            "title": "Factorisation using Algebraic Identities (a²-b², (a±b)²)",
            "titleKn": "ನಿತ್ಯಸಮೀಕರಣಗಳನ್ನು ಬಳಸಿ ಅಪವರ್ತಿಸುವ ವಿಧಾನ",
            "titleHi": "सर्वसमिकाओं (a²-b², a²±2ab+b²) द्वारा गुणनखंडन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "m8-12-03",
            "title": "Factorising Trinomials by Splitting the Middle Term",
            "titleKn": "ಮಧ್ಯಪದ ವಿಭಜಿಸಿ ತ್ರಿಪದೋಕ್ತಿಯನ್ನು ಅಪವರ್ತಿಸುವುದು",
            "titleHi": "मध्य पद विभक्त करके द्विघात त्रिपद का गुणनखंडन",
            "type": "Formula & Derivation",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "m8-12-04",
            "title": "Division of Algebraic Expressions (Polynomial by Monomial / Binomial)",
            "titleKn": "ಬೀಜಗಣಿತೀಯ ಅಭಿವ್ಯಕ್ತಿಗಳ ಭಾಗಾಕಾರ",
            "titleHi": "बहुपद का एकपदी व द्विपद से विभाजन",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "m8-13",
        "chapterNumber": 13,
        "title": "Introduction to Graphs",
        "titleKn": "ನಕ್ಷೆಗಳ ಪ್ರಸ್ತಾವನೆ (Introduction to Graphs)",
        "titleHi": "आलेखों से परिचय (Introduction to Graphs)",
        "unit": "Unit II: Algebra",
        "unitKn": "ಘಟಕ ೨: ಬೀಜಗಣಿತ",
        "unitHi": "इकाई २: बीजगणित",
        "description": "A Bar Graph, A Pie Graph, A Histogram, A Line Graph, Linear Graphs (Coordinates of Points on Graph, Independent & Dependent Variables), Some Applications (Distance-Time, Quantity-Cost, Simple Interest-Time).",
        "descriptionKn": "ರೇಖಾ ನಕ್ಷೆಗಳು, ರೇಖಾತ್ಮಕ ನಕ್ಷೆಗಳು, ನಿರ್ದೇಶಾಂಕಗಳು, ಸ್ವತಂತ್ರ ಮತ್ತು ಅವಲಂಬಿತ ಚರಾಕ್ಷರಗಳು, ದೂರ-ಸಮಯ ಮತ್ತು ಸರಳ ಬಡ್ಡಿಯ ನಕ್ಷೆಗಳು.",
        "descriptionHi": "रेखा आलेख, रैखिक आलेख, बिंदु के निर्देशांक, स्वतंत्र व आश्रित चर और व्यावहारिक अनुप्रयोग (दूरी-समय, साधारण ब्याज-समय आलेख)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 6,
        "assignedTeacher": "Mr. Rohan Sharma",
        "keyFormulas": [
          "Line graph shows continuous data changes over time",
          "Cartesian origin (0, 0), x-coordinate (horizontal), y-coordinate (vertical)",
          "Slope = Dependent variable change / Independent variable change"
        ],
        "subtopics": [
          {
            "id": "m8-13-01",
            "title": "Review of Bar Graph, Histogram, Pie Chart vs Line Graph",
            "titleKn": "ನಕ್ಷೆಗಳ ವಿಧಗಳು ಮತ್ತು ರೇಖಾ ನಕ್ಷೆಯ ಪರಿಚಯ",
            "titleHi": "विभिन्न आलेखों (दंड, वृत्त, आयत) की तुलना और रेखा आलेख",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": false
          },
          {
            "id": "m8-13-02",
            "title": "Coordinates of Points on a Grid & Plotting Points (x, y)",
            "titleKn": "ಗ್ರಿಡ್ ಮೇಲೆ ಬಿಂದುಗಳ ನಿರ್ದೇಶಾಂಕಗಳನ್ನು ಗುರುತಿಸುವುದು",
            "titleHi": "ग्राफ पेपर पर बिंदु (x, y) के निर्देशांक और आलेखन",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "m8-13-03",
            "title": "Linear Graphs for Real-world Relationships (Cost-Quantity, Distance-Time)",
            "titleKn": "ನೈಜ ಸಂಬಂಧಗಳ ರೇಖಾತ್ಮಕ ನಕ್ಷೆಗಳು",
            "titleHi": "दूरी-समय और मूल्य-मात्रा पर आधारित रैखिक आलेख बनाना",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c8-sci",
    "name": "Science & Physics",
    "nameKn": "ವಿಜ್ಞಾನ (Science)",
    "nameHi": "विज्ञान (Science)",
    "classGrade": "Class 8",
    "icon": "Atom",
    "color": "#059669",
    "badgeBg": "bg-emerald-50 text-emerald-800 border-emerald-200",
    "borderColor": "border-emerald-500",
    "chapters": [
      {
        "id": "s8-01",
        "chapterNumber": 1,
        "title": "Crop Production and Management",
        "titleKn": "ಬೆಳೆ ಉತ್ಪಾದನೆ ಮತ್ತು ನಿರ್ವಹಣೆ",
        "titleHi": "फसल उत्पादन एवं प्रबंध",
        "unit": "Unit I: Food & Agriculture",
        "unitKn": "ಘಟಕ ೧: ಆಹಾರ ಮತ್ತು ಕೃಷಿ",
        "unitHi": "इकाई १: खाद्य एवं कृषि",
        "description": "Agricultural Practices (Preparation of Soil, Sowing - Traditional & Seed Drill, Adding Manure and Fertilizers, Irrigation - Traditional & Modern: Drip and Sprinkler Systems, Protection from Weeds, Harvesting, Storage - Silos and Granaries), Food from Animals (Animal Husbandry).",
        "descriptionKn": "ಕೃಷಿ ಪದ್ಧತಿಗಳು (ಮಣ್ಣು ಹದಗೊಳಿಸುವುದು, ಬಿತ್ತನೆ, ಗೊಬ್ಬರ ಹಾಕುವುದು, ಆಧುನಿಕ ನೀರಾವರಿ: ಹನಿ ಮತ್ತು ತುಂತುರು ಪದ್ಧತಿ, ಕಳೆ ಕೀಳುವುದು, ಕೊಯ್ಲು ಮತ್ತು ದಾಸ್ತಾನು).",
        "descriptionHi": "कृषि पद्धतियां (मिट्टी तैयार करना, बुआई, खाद व उर्वरक देना, आधुनिक सिंचाई: ड्रिप व स्प्रिंकलर तंत्र, खरपतवार से सुरक्षा, कटाई और भंडारण - साइलो)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Kharif crops: Sown in rainy season (June-Sept) e.g. Paddy, Maize, Cotton",
          "Rabi crops: Sown in winter (Oct-March) e.g. Wheat, Gram, Mustard",
          "Rhizobium bacteria in leguminous root nodules fix atmospheric nitrogen"
        ],
        "subtopics": [
          {
            "id": "s8-01-01",
            "title": "Kharif vs Rabi Crops & Agricultural Soil Preparation / Ploughing",
            "titleKn": "ಖಾರಿಫ್ vs ರಬಿ ಬೆಳೆಗಳು & ಮಣ್ಣನ್ನು ಹದಗೊಳಿಸುವುದು",
            "titleHi": "खरीफ बनाम रबी फसलें और मिट्टी तैयार करने के चरण",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s8-01-02",
            "title": "Sowing Techniques & Manure vs Chemical Fertilizers Comparison",
            "titleKn": "ಬಿತ್ತನೆ ತಂತ್ರಗಳು ಮತ್ತು ಸಾವಯವ vs ರಾಸಾಯನಿಕ ಗೊಬ್ಬರ",
            "titleHi": "बुआई के तरीके और खाद बनाम रासायनिक उर्वरक की तुलना",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s8-01-03",
            "title": "Modern Irrigation Systems: Drip System and Sprinkler System",
            "titleKn": "ಆಧುನಿಕ ನೀರಾವರಿ: ಹನಿ ನೀರಾವರಿ ಮತ್ತು ತುಂತುರು ನೀರಾವರಿ",
            "titleHi": "आधुनिक सिंचाई प्रणालियां: ड्रिप तंत्र और छिड़काव तंत्र",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s8-01-04",
            "title": "Weeding, Harvesting (Threshing/Winnowing) & Safe Grain Storage (Silos)",
            "titleKn": "ಕಳೆ ನಿರ್ವಹಣೆ, ಕೊಯ್ಲು ಮತ್ತು ಧಾನ್ಯಗಳ ಸುರಕ್ಷಿತ ಸಂಗ್ರಹಣೆ",
            "titleHi": "खरपतवार नियंत्रण, कटाई और साइलो में सुरक्षित भंडारण",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s8-02",
        "chapterNumber": 2,
        "title": "Microorganisms: Friend and Foe",
        "titleKn": "ಸೂಕ್ಷ್ಮಜೀವಿಗಳು: ಮಿತ್ರ ಮತ್ತು ಶತ್ರು",
        "titleHi": "सूक्ष्मजीव: मित्र एवं शत्रु",
        "unit": "Unit II: The Living World",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚ",
        "unitHi": "इकाई २: सजीव जगत (जीव विज्ञान)",
        "description": "Four Major Groups of Microorganisms (Bacteria, Fungi, Protozoa, Algae), Viruses, Friendly Microorganisms (Making of Curd & Bread - Lactobacillus and Yeast, Commercial Use - Fermentation / Louis Pasteur, Medicinal Use - Antibiotics / Alexander Fleming, Vaccines / Edward Jenner, Soil Fertility - Nitrogen Fixers), Harmful Microorganisms (Pathogens, Communicable Diseases, Carriers - Female Anopheles & Aedes Mosquito), Food Preservation (Chemical method, Salt, Sugar, Oil/Vinegar, Heat & Cold treatments, Pasteurisation), Nitrogen Cycle.",
        "descriptionKn": "ಸೂಕ್ಷ್ಮಜೀವಿಗಳ ಗುಂಪುಗಳು, ಉಪಯುಕ್ತ ಸೂಕ್ಷ್ಮಜೀವಿಗಳು (ಕಿಣ್ವನ, ಆ್ಯಂಟಿಬಯೋಟಿಕ್ಸ್, ಲಸಿಕೆಗಳು), ಹಾನಿಕಾರಕ ಸೂಕ್ಷ್ಮಜೀವಿಗಳು (ರೋಗಕಾರಕಗಳು), ಆಹಾರ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಸಾರಜನಕ ಚಕ್ರ.",
        "descriptionHi": "सूक्ष्मजीवों के 4 वर्ग (जीवाणु, कवक, प्रोटोजोआ, शैवाल), विषाणु (वायरस), मित्रवत सूक्ष्मजीव (किण्वन, एंटीबायोटिक, टीका/वैक्सीन), रोगाणु व वाहक (मादा एनाफिलीज़), खाद्य परिरक्षण (पाश्चुरीकरण) और नाइट्रोजन चक्र।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Fermentation discovered by Louis Pasteur (1857)",
          "Penicillin discovered by Alexander Fleming (1929)",
          "Smallpox vaccine discovered by Edward Jenner (1798)",
          "Pasteurisation: Milk heated to 70°C for 15-30s then chilled"
        ],
        "subtopics": [
          {
            "id": "s8-02-01",
            "title": "4 Groups of Microorganisms + Viruses & Habitats",
            "titleKn": "ಸೂಕ್ಷ್ಮಜೀವಿಗಳ ೪ ಗುಂಪುಗಳು ಮತ್ತು ವೈರಸ್‌ಗಳು",
            "titleHi": "सूक्ष्मजीवों के 4 मुख्य समूह, वायरस और उनके वास स्थान",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s8-02-02",
            "title": "Commercial & Medicinal Uses: Fermentation, Antibiotics and Vaccines",
            "titleKn": "ಕಿಣ್ವನ, ಆ್ಯಂಟಿಬಯೋಟಿಕ್ಸ್ ಮತ್ತು ಲಸಿಕೆಗಳು",
            "titleHi": "किण्वन (यीस्ट), एंटीबायोटिक्स और वैक्सीन की क्रियाविधि",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "s8-02-03",
            "title": "Harmful Microbes: Human/Plant Pathogens & Mosquito Carriers",
            "titleKn": "ರೋಗಕಾರಕ ಸೂಕ್ಷ್ಮಜೀವಿಗಳು ಮತ್ತು ಸೊಳ್ಳೆ ವಾಹಕಗಳು",
            "titleHi": "मानव और पौधों में रोगाणु तथा मच्छर वाहक (एनाफिलीज़/एडीज)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s8-02-04",
            "title": "Food Preservation Techniques & Nitrogen Cycle Steps (78% N2 in air)",
            "titleKn": "ಆಹಾರ ಸಂರಕ್ಷಣಾ ವಿಧಾನಗಳು ಮತ್ತು ಸಾರಜನಕ ಚಕ್ರ",
            "titleHi": "खाद्य परिरक्षण की विधियाँ और नाइट्रोजन चक्र के चरण",
            "type": "Board Exam Important",
            "estimatedMinutes": 55,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "s8-03",
        "chapterNumber": 3,
        "title": "Coal and Petroleum",
        "titleKn": "ಕಲ್ಲಿದ್ದಲು ಮತ್ತು ಪೆಟ್ರೋಲಿಯಂ",
        "titleHi": "कोयला और पेट्रोलियम",
        "unit": "Unit III: Materials & Chemistry",
        "unitKn": "ಘಟಕ ೩: ವಸ್ತುಗಳು ಮತ್ತು ರಸಾಯನಶಾಸ್ತ್ರ",
        "unitHi": "इकाई ३: पदार्थ एवं रसायन विज्ञान",
        "description": "Inexhaustible vs Exhaustible Natural Resources, Fossil Fuels, Coal (Story of Coal - Carbonisation, Products: Coke, Coal Tar, Coal Gas), Petroleum (Origin, Refining of Petroleum, Fractional Distillation Fractions: LPG, Petrol, Kerosene, Diesel, Lubricating Oil, Paraffin Wax, Bitumen), Natural Gas (CNG), Limited Natural Resources & Conservation Tips (PCRA guidelines).",
        "descriptionKn": "ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು, ಕಲ್ಲಿದ್ದಲು (ಕಾರ್ಬೊನೈಸೇಶನ್, ಕೋಕ್, ಕೋಲ್ ಟಾರ್), ಪೆಟ್ರೋಲಿಯಂ ಸಂಸ್ಕರಣೆ ಮತ್ತು ಉಪಉತ್ಪನ್ನಗಳು, ಸಿಎನ್‌ಜಿ, ಪಿಸಿಆರ್‌ಎ ನಿಯಮಗಳು.",
        "descriptionHi": "समाप्य व अक्षय प्राकृतिक संसाधन, जीवाश्म ईंधन, कोयले की कहानी (कार्बनीकरण, कोक, कोलतार, कोयला गैस), पेट्रोलियम का प्रभाजी आसवन (LPG, पेट्रोल, डीजल आदि), प्राकृतिक गैस (CNG) और PCRA के संरक्षण नियम।",
        "status": "In Progress",
        "completionPercent": 75,
        "totalPeriods": 7,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Carbonisation: Slow process of conversion of dead vegetation into coal",
          "CNG = Compressed Natural Gas (Clean fuel)",
          "PCRA: Petroleum Conservation Research Association advice on saving fuel"
        ],
        "subtopics": [
          {
            "id": "s8-03-01",
            "title": "Exhaustible vs Inexhaustible Natural Resources & Fossil Fuel Concept",
            "titleKn": "ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳ ವಿಧಗಳು & ಪಳೆಯುಳಿಕೆ ಇಂಧನಗಳು",
            "titleHi": "समाप्य और अक्षय संसाधन तथा जीवाश्म ईंधन की अवधारणा",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": true
          },
          {
            "id": "s8-03-02",
            "title": "Coal Formation (Carbonisation) & Products: Coke, Coal Tar, Coal Gas",
            "titleKn": "ಕಲ್ಲಿದ್ದಲಿನ ರಚನೆ ಮತ್ತು ಉಪಉತ್ಪನ್ನಗಳು (ಕೋಕ್, ಕೋಲ್ ಟಾರ್)",
            "titleHi": "कोयले का निर्माण (कार्बनीकरण) और इसके उत्पाद (कोक, कोलतार)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s8-03-03",
            "title": "Petroleum Refining Fractions & Natural Gas (CNG) Advantages",
            "titleKn": "ಪೆಟ್ರೋಲಿಯಂ ಸಂಸ್ಕರಣೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ಅನಿಲ (CNG)",
            "titleHi": "पेट्रोलियम का प्रभाजी आसवन और सीएनजी के लाभ",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s8-03-04",
            "title": "Conservation of Fossil Fuels & PCRA Guidelines for Fuel Saving",
            "titleKn": "ಪಳೆಯುಳಿಕೆ ಇಂಧನಗಳ ಸಂರಕ್ಷಣೆ ಮತ್ತು ಪಿಸಿಆರ್‌ಎ ಮಾರ್ಗಸೂಚಿಗಳು",
            "titleHi": "जीवाश्म ईंधनों का सीमित उपयोग और PCRA की गाइडलाइंस",
            "type": "Board Exam Important",
            "estimatedMinutes": 40,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-04",
        "chapterNumber": 4,
        "title": "Combustion and Flame",
        "titleKn": "ದಹನ ಮತ್ತು ಜ್ವಾಲೆ",
        "titleHi": "दहन और ज्वाला",
        "unit": "Unit III: Materials & Chemistry",
        "unitKn": "ಘಟಕ ೩: ವಸ್ತುಗಳು ಮತ್ತು ರಸಾಯನಶಾಸ್ತ್ರ",
        "unitHi": "इकाई ३: पदार्थ एवं रसायन विज्ञान",
        "description": "What is Combustion?, Combustible and Non-combustible Substances, Conditions Necessary for Combustion (Fuel, Air/Oxygen, Ignition Temperature), Inflammable Substances, How Do We Control Fire? (Fire Extinguishers - Water, CO2), Types of Combustion (Rapid, Spontaneous, Explosion), Structure of a Flame (Outer blue zone - complete combustion/hottest, Middle yellow luminous zone, Innermost dark zone), Fuel Efficiency & Calorific Value (kJ/kg), Harmful Products of Fuel Burning (Acid rain, Global warming, Carbon monoxide poisoning).",
        "descriptionKn": "ದಹನ ಎಂದರೇನು?, ದಹ್ಯ ವಸ್ತುಗಳು, ದಹನಕ್ಕೆ ಅಗತ್ಯ ಪರಿಸ್ಥಿತಿಗಳು, ಜ್ವಾಲೆಯ ರಚನೆ, ಇಂಧನದ ಕ್ಯಾಲೋರಿಫಿಕ್ ಮೌಲ್ಯ ಮತ್ತು ಆಮ್ಲ ಮಳೆ.",
        "descriptionHi": "दहन की परिभाषा, ज्वलन ताप, दहन के प्रकार (तीव्र, स्वतः, विस्फोट), ज्वाला की संरचना (तीनों मंडल: सबसे गर्म नीला बाहरी मंडल आदि), ईंधन की दक्षता और कैलोरी मान (kJ/kg), अम्लीय वर्षा व ग्रीनहाउस प्रभाव।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 8,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Calorific Value: Amount of heat energy produced on complete combustion of 1 kg of fuel (kJ/kg)",
          "Hydrogen has highest calorific value = 150,000 kJ/kg",
          "LPG calorific value = 55,000 kJ/kg"
        ],
        "subtopics": [
          {
            "id": "s8-04-01",
            "title": "Combustion Conditions (Fuel, Oxygen, Ignition Temperature)",
            "titleKn": "ದಹನದ ಅಗತ್ಯ ಷರತ್ತುಗಳು (ಇಂಧನ, ಆಮ್ಲಜನಕ, ಜ್ವಲನ ತಾಪ)",
            "titleHi": "दहन की आवश्यक शर्तें (ईंधन, ऑक्सीजन, ज्वलन ताप)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "s8-04-02",
            "title": "Fire Extinguishers (Water vs CO2 Extinguisher Chemistry)",
            "titleKn": "ಅಗ್ನಿಶಾಮಕಗಳ ಕಾರ್ಯವಿಧಾನ (ನೀರು vs CO2)",
            "titleHi": "अग्निशामक यंत्रों की कार्यप्रणाली (जल व CO2 की भूमिका)",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s8-04-03",
            "title": "Types of Combustion & Structure of a Candle Flame (3 Zones)",
            "titleKn": "ದಹನದ ವಿಧಗಳು ಮತ್ತು ಮೇಣದಬತ್ತಿಯ ಜ್ವಾಲೆಯ ೩ ವಲಯಗಳು",
            "titleHi": "दहन के प्रकार और मोमबत्ती की ज्वाला के तीन मंडल",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "s8-04-04",
            "title": "Calorific Value Calculations & Pollution (Acid Rain / Global Warming)",
            "titleKn": "ಕ್ಯಾಲೋರಿಫಿಕ್ ಮೌಲ್ಯ ಮತ್ತು ಮಾಲಿನ್ಯ ಪರಿಣಾಮಗಳು",
            "titleHi": "कैलोरी मान (kJ/kg) और ईंधन दहन के हानिकारक प्रभाव",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-05",
        "chapterNumber": 5,
        "title": "Conservation of Plants and Animals",
        "titleKn": "ಸಸ್ಯ ಮತ್ತು ಪ್ರಾಣಿಗಳ ಸಂರಕ್ಷಣೆ",
        "titleHi": "पौधे एवं जंतुओं का संरक्षण",
        "unit": "Unit II: The Living World",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚ",
        "unitHi": "इकाई २: सजीव जगत (जीव विज्ञान)",
        "description": "Deforestation and Its Causes, Consequences of Deforestation (Desertification, Droughts, Global Warming), Conservation of Forest and Wildlife, Biosphere Reserve (Pachmarhi Biosphere Reserve), Flora and Fauna, Endemic Species, Wildlife Sanctuary vs National Park vs Biosphere Reserve, Project Tiger, Endangered Species & Red Data Book, Migration (Migratory Birds), Recycling of Paper, Reforestation.",
        "descriptionKn": "ಅರಣ್ಯನಾಶ ಮತ್ತು ಪರಿಣಾಮಗಳು, ಜೈವಿಕ ಮೀಸಲು ಪ್ರದೇಶಗಳು, ಸ್ಥಳೀಯ ಪ್ರಭೇದಗಳು, ವನ್ಯಜೀವಿ ಧಾಮ vs ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನವನ, ಪ್ರಾಜೆಕ್ಟ್ ಟೈಗರ್, ರೆಡ್ ಡಾಟಾ ಬುಕ್, ಮರುಅರಣ್ಯೀಕರಣ.",
        "descriptionHi": "वनोन्मूलन के कारण और परिणाम (मरुस्थलीकरण, सूखा), जैवमंडल आरक्षित क्षेत्र (पचमढ़ी), स्थानिक प्रजातियाँ (Endemic), वन्यजीव अभयारण्य बनाम राष्ट्रीय उद्यान, प्रोजेक्ट टाइगर, रेड डाटा पुस्तक और पुनर्वनरोपण।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Red Data Book: Source book keeping record of all endangered animals and plants",
          "Project Tiger launched in 1973 by Govt of India to protect Bengal Tigers",
          "Reforestation: Restocking destroyed forests by planting new trees"
        ],
        "subtopics": [
          {
            "id": "s8-05-01",
            "title": "Deforestation Causes & Consequences (Desertification, Global Warming)",
            "titleKn": "ಅರಣ್ಯನಾಶದ ಕಾರಣಗಳು ಮತ್ತು ದುಷ್ಪರಿಣಾಮಗಳು",
            "titleHi": "वनोन्मूलन के कारण और परिणाम (मरुस्थलीकरण, सूखा आदि)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s8-05-02",
            "title": "Protected Areas: Wildlife Sanctuary, National Park & Biosphere Reserves",
            "titleKn": "ವನ್ಯಜೀವಿ ಧಾಮ, ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನ & ಜೈವಿಕ ಮೀಸಲು ಪ್ರದೇಶಗಳು",
            "titleHi": "संरक्षित क्षेत्र: वन्यजीव अभयारण्य, राष्ट्रीय उद्यान और जैवमंडल रिजर्व",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-05-03",
            "title": "Flora, Fauna, Endemic Species & Red Data Book Significance",
            "titleKn": "ಸಸ್ಯ-ಪ್ರಾಣಿ ಸಂಕುಲ, ಸ್ಥಳೀಯ ಪ್ರಭೇದಗಳು & ರೆಡ್ ಡಾಟಾ ಬುಕ್",
            "titleHi": "वनस्पतिजात, प्राणिजात, स्थानिक प्रजातियां और रेड डाटा बुक",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s8-05-04",
            "title": "Project Tiger, Bird Migration & Paper Recycling / Reforestation",
            "titleKn": "ಪ್ರಾಜೆಕ್ಟ್ ಟೈಗರ್, ಪಕ್ಷಿ ವಲಸೆ ಮತ್ತು ಮರುಅರಣ್ಯೀಕರಣ",
            "titleHi": "प्रोजेक्ट टाइगर, पक्षी प्रवास और पुनर्वनरोपण का महत्व",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-06",
        "chapterNumber": 6,
        "title": "Reproduction in Animals",
        "titleKn": "ಪ್ರಾಣಿಗಳಲ್ಲಿ ಸಂತಾನೋತ್ಪತ್ತಿ",
        "titleHi": "जंतुओं में जनन",
        "unit": "Unit II: The Living World",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚ",
        "unitHi": "इकाई २: सजीव जगत (जीव विज्ञान)",
        "description": "Modes of Reproduction (Sexual & Asexual), Sexual Reproduction: Male Reproductive Organs (Testes, Sperm Ducts, Penis, Sperm structure), Female Reproductive Organs (Ovaries, Oviducts/Fallopian Tubes, Uterus, Ovum structure), Fertilisation (Internal Fertilisation vs External Fertilisation), IVF (In Vitro Fertilisation) / Test Tube Babies, Development of Embryo (Zygote → Embryo → Foetus), Viviparous and Oviparous Animals, Metamorphosis in Frogs (Egg → Tadpole → Adult Frog), Asexual Reproduction in Animals (Binary Fission in Amoeba, Budding in Hydra).",
        "descriptionKn": "ಲೈಂಗಿಕ ಮತ್ತು ಅಲೈಂಗಿಕ ಸಂತಾನೋತ್ಪತ್ತಿ, ಗಂಡು ಮತ್ತು ಹೆಣ್ಣು ಸಂತಾನೋತ್ಪತ್ತಿ ಅಂಗಗಳು, ಆಂತರಿಕ vs ಬಾಹ್ಯ ನಿಷೇಚನ, ಭ್ರೂಣದ ಬೆಳವಣಿಗೆ, ಜರಾಯುಜ vs ಅಂಡಜ ಪ್ರಾಣಿಗಳು, ಕಪ್ಪೆಯಲ್ಲಿ ರೂಪಾಂತರ, ಅಮೀಬಾದಲ್ಲಿ ದ್ವಿದಳನ.",
        "descriptionHi": "लैंगिक व अलैंगिक जनन, नर व मादा जनन अंग, आंतरिक व बाह्य निषेचन, परखनली शिशु (IVF), भ्रूण का परिवर्धन (जरायुज व अंडप्रजक जंतु), मेंढक का कायांतरण और हाइड्रा/अमीबा में अलैंगिक जनन (मुकुलन, द्विखंडन)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Fertilisation: Fusion of sperm nucleus with ovum nucleus to form single-celled Zygote",
          "Viviparous = Give birth to young ones (Humans, Cows)",
          "Oviparous = Lay eggs (Birds, Frogs)"
        ],
        "subtopics": [
          {
            "id": "s8-06-01",
            "title": "Male & Female Reproductive Organs and Gametes (Sperm & Ovum)",
            "titleKn": "ಗಂಡು ಮತ್ತು ಹೆಣ್ಣು ಸಂತಾನೋತ್ಪತ್ತಿ ಅಂಗಗಳು ಮತ್ತು ಗ್ಯಾಮೆಟ್‌ಗಳು",
            "titleHi": "नर और मादा जनन अंग तथा युग्मकों (शुक्राणु व अंडाणु) की संरचना",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-06-02",
            "title": "Internal vs External Fertilisation & IVF (Test Tube Babies)",
            "titleKn": "ಆಂತರಿಕ vs ಬಾಹ್ಯ ನಿಷೇಚನ ಮತ್ತು ಐವಿಎಫ್ ತಂತ್ರಜ್ಞಾನ",
            "titleHi": "आंतरिक बनाम बाह्य निषेचन और परखनली शिशु (IVF)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-06-03",
            "title": "Development of Embryo & Viviparous vs Oviparous Animals",
            "titleKn": "ಭ್ರೂಣದ ಬೆಳವಣಿಗೆ ಮತ್ತು ಜರಾಯುಜ-ಅಂಡಜ ಪ್ರಾಣಿಗಳು",
            "titleHi": "भ्रूण का विकास और जरायुज बनाम अंडप्रजक जंतुओं में अंतर",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-06-04",
            "title": "Metamorphosis in Frog & Asexual Modes (Hydra Budding, Amoeba Binary Fission)",
            "titleKn": "ಕಪ್ಪೆಯ ರೂಪಾಂತರ ಮತ್ತು ಅಮೀಬಾದಲ್ಲಿ ದ್ವಿದಳನ",
            "titleHi": "मेंढक में कायांतरण और अलैंगिक जनन (मुकुलन व द्विखंडन)",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-07",
        "chapterNumber": 7,
        "title": "Reaching the Age of Adolescence",
        "titleKn": "ಹದಿಹರೆಯಕ್ಕೆ ಕಾಲಿಡುವುದು",
        "titleHi": "किशोरावस्था की ओर",
        "unit": "Unit II: The Living World",
        "unitKn": "ಘಟಕ ೨: ಜೀವ ಪ್ರಪಂಚ",
        "unitHi": "इकाई २: सजीव जगत (जीव विज्ञान)",
        "description": "Adolescence and Puberty, Changes at Puberty (Increase in Height, Change in Body Shape, Voice Change - Adam's Apple, Increased Activity of Sweat and Sebaceous Glands, Development of Sex Organs, Reaching Mental, Intellectual and Emotional Maturity), Secondary Sexual Characters, Role of Hormones in Initiating Reproductive Function (Pituitary Gland, Testosterone, Estrogen), Reproductive Phase of Life in Humans (Menstruation, Menarche, Menopause), How is the Sex of the Baby Determined? (X and Y Chromosomes), Hormones other than Sex Hormones (Thyroid - Thyroxine/Goitre, Pancreas - Insulin/Diabetes, Adrenals - Adrenaline, Pituitary - Growth Hormone), Reproductive Health & Personal Hygiene.",
        "descriptionKn": "ಪ್ರೌಢಾವಸ್ಥೆ ಮತ್ತು ಬದಲಾವಣೆಗಳು (ಎತ್ತರ, ಧ್ವನಿ ಬದಲಾವಣೆ - ಆಡಮ್ಸ್ ಆಪಲ್), ದ್ವಿತೀಯ ಲೈಂಗಿಕ ಲಕ್ಷಣಗಳು, ಹಾರ್ಮೋನ್‌ಗಳ ಪಾತ್ರ, ಋತುಚಕ್ರ (ಮೆನಾರ್ಕಿ & ಮೆನೋಪಾಸ್), ಲಿಂಗ ನಿರ್ಧಾರಣೆ ಮತ್ತು ಹದಿಹರೆಯದ ಆರೋಗ್ಯ.",
        "descriptionHi": "किशोरावस्था और यौवनारंभ के परिवर्तन (लंबाई में वृद्धि, कंठमणि/एडम्स एप्पल, स्वर परिवर्तन), गौण लैंगिक लक्षण, अंतःस्रावी ग्रंथियों के हार्मोन (टेस्टोस्टेरोन, एस्ट्रोजन), ऋतुस्राव चक्र (रजोदर्शन व रजोनिवृत्ति), लिंग निर्धारण (XX/XY) और पोषण।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Master Gland = Pituitary Gland (regulates all other endocrine glands)",
          "Adam's Apple: Protruding voice box / larynx in boys at puberty",
          "Menarche: First menstrual flow at puberty; Menopause: Stoppage of menstruation around 45-50 yrs"
        ],
        "subtopics": [
          {
            "id": "s8-07-01",
            "title": "Puberty Physical & Psychological Changes & Adam's Apple",
            "titleKn": "ಪ್ರೌಢಾವಸ್ಥೆಯ ದೈಹಿಕ ಬದಲಾವಣೆಗಳು ಮತ್ತು ಆಡಮ್ಸ್ ಆಪಲ್",
            "titleHi": "यौवनारंभ के लक्षण (लंबाई, कंठमणि/एडम्स एप्पल, स्वर परिवर्तन)",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s8-07-02",
            "title": "Secondary Sexual Characters & Hormones (Testosterone, Estrogen)",
            "titleKn": "ದ್ವಿತೀಯ ಲೈಂಗಿಕ ಲಕ್ಷಣಗಳು ಮತ್ತು ಹಾರ್ಮೋನ್‌ಗಳು",
            "titleHi": "गौण लैंगिक लक्षण और टेस्टोस्टेरोन व एस्ट्रोजन की भूमिका",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-07-03",
            "title": "Reproductive Phase, Menstrual Cycle (Menarche, Menopause) & Sex Determination",
            "titleKn": "ಋತುಚಕ್ರ (ಮೆನಾರ್ಕಿ, ಮೆನೋಪಾಸ್) ಮತ್ತು ಲಿಂಗ ನಿರ್ಧಾರಣೆ",
            "titleHi": "ऋतुस्राव चक्र (रजोदर्शन, रजोनिवृत्ति) और लिंग निर्धारण (XX/XY)",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s8-07-04",
            "title": "Endocrine Glands (Thyroid, Pancreas, Adrenal, Pituitary) & Adolescent Nutrition",
            "titleKn": "ಅಂತಃಸ್ರಾವಕ ಗ್ರಂಥಿಗಳು ಮತ್ತು ಹದಿಹರೆಯದ ಪೌಷ್ಟಿಕಾಂಶ",
            "titleHi": "अन्य अंतःस्रावी ग्रंथियां (थायराइड, अग्न्याशय) और संतुलित आहार",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-08",
        "chapterNumber": 8,
        "title": "Force and Pressure",
        "titleKn": "ಬಲ ಮತ್ತು ಒತ್ತಡ (Force and Pressure)",
        "titleHi": "बल तथा दाब (Force and Pressure)",
        "unit": "Unit IV: Moving Things, People & Ideas (Physics)",
        "unitKn": "ಘಟಕ ೪: ಚಲನೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ನಿಯಮಗಳು",
        "unitHi": "इकाई ४: भौतिक विज्ञान",
        "description": "Force: A Push or a Pull, Forces are due to an Interaction, Exploring Forces (Net Force / Resultant Force), A Force can Change the State of Motion, A Force can Change the Shape of an Object, Contact Forces (Muscular Force, Friction), Non-contact Forces (Magnetic Force, Electrostatic Force, Gravitational Force), Pressure (Pressure = Force / Area), Pressure Exerted by Liquids and Gases (Manometer), Atmospheric Pressure.",
        "descriptionKn": "ಬಲ (ತಳ್ಳುವಿಕೆ ಅಥವಾ ಎಳೆಯುವಿಕೆ), ಸಂಪರ್ಕ ಬಲಗಳು (ಸ್ನಾಯು ಬಲ, ಘರ್ಷಣೆ), ಸಂಪರ್ಕರಹಿತ ಬಲಗಳು (ಕಾಂತೀಯ, ಸ್ಥಿರವಿದ್ಯುತ್, ಗುರುತ್ವ ಬಲ), ಒತ್ತಡ = ಬಲ / ವಿಸ್ತೀರ್ಣ, ದ್ರವ ಮತ್ತು ವಾತಾವರಣದ ಒತ್ತಡ.",
        "descriptionHi": "बल (खिंचाव या धक्का), संपर्क बल (पेशीय बल, घर्षण) और असंपर्क बल (चुंबकीय, स्थिरवैद्युत, गुरुत्वाकर्षण बल), दाब (दाब = बल / क्षेत्रफल), द्रवों और गैसों द्वारा डाला गया दाब और वायुमंडलीय दाब।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Pressure = Force / Area (P = F / A)",
          "SI Unit of Pressure = Pascal (Pa) or N/m²",
          "Liquid pressure increases with depth and is equal in all directions at same depth",
          "Atmospheric pressure is maximum at sea level"
        ],
        "subtopics": [
          {
            "id": "s8-08-01",
            "title": "Concept of Force (Push/Pull), Direction & Effects of Force",
            "titleKn": "ಬಲದ ಪರಿಕಲ್ಪನೆ, ದಿಕ್ಕು ಮತ್ತು ಬಲದ ಪರಿಣಾಮಗಳು",
            "titleHi": "बल की संकल्पना और गति व आकृति पर बल के प्रभाव",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s8-08-02",
            "title": "Contact Forces (Muscular, Friction) vs Non-Contact Forces (Magnetic, Electrostatic, Gravitational)",
            "titleKn": "ಸಂಪರ್ಕ vs ಸಂಪರ್ಕರಹಿತ ಬಲಗಳು",
            "titleHi": "संपर्क बल (पेशीय, घर्षण) बनाम असंपर्क बल (चुंबकीय, स्थिरवैद्युत, गुरुत्व)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-08-03",
            "title": "Pressure Definition, Formula (P = Force/Area) & Application of Sharp Knives/Wide Straps",
            "titleKn": "ಒತ್ತಡದ ಸೂತ್ರ (P = F/A) ಮತ್ತು ಅನ್ವಯಗಳು",
            "titleHi": "दाब की परिभाषा, सूत्र (P = F/A) और दैनिक जीवन के अनुप्रयोग",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s8-08-04",
            "title": "Liquid Pressure with Depth & Atmospheric Pressure / Rubber Sucker",
            "titleKn": "ದ್ರವದ ಒತ್ತಡ ಮತ್ತು ವಾತಾವರಣದ ಒತ್ತಡ",
            "titleHi": "द्रवों का दाब (गहराई के साथ वृद्धि) और वायुमंडलीय दाब",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-09",
        "chapterNumber": 9,
        "title": "Friction",
        "titleKn": "ಘರ್ಷಣೆ (Friction - Physics)",
        "titleHi": "घर्षण (Friction - Physics)",
        "unit": "Unit IV: Moving Things, People & Ideas (Physics)",
        "unitKn": "ಘಟಕ ೪: ಚಲನೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ನಿಯಮಗಳು",
        "unitHi": "इकाई ४: भौतिक विज्ञान",
        "description": "Force of Friction, Factors Affecting Friction (Nature of Surfaces, Irregularities, Interlocking, Spring Balance), Friction: A Necessary Evil (Advantages: Walking, Writing, Braking; Disadvantages: Wear and Tear, Heat Generation), Increasing and Reducing Friction (Lubricants, Ball Bearings, Treaded Tyres), Wheels Reduce Friction (Rolling Friction vs Sliding Friction vs Static Friction), Fluid Friction (Drag, Streamlined Shape of Aeroplanes and Birds).",
        "descriptionKn": "ಘರ್ಷಣಾ ಬಲ, ಘರ್ಷಣೆಗೆ ಕಾರಣಗಳು (ಮೇಲ್ಮೈ ಅಸಮತೆಗಳು), ಘರ್ಷಣೆಯ ಅನುಕೂಲಗಳು ಮತ್ತು ಅನನುಕೂಲಗಳು, ಜಾರುವ vs ಉರುಳುವ ಘರ್ಷಣೆ, ದ್ರವ ಘರ್ಷಣೆ (ಡ್ರ್ಯಾಗ್) ಮತ್ತು ಸುವ್ಯವಸ್ಥಿತ ಆಕಾರ.",
        "descriptionHi": "घर्षण बल, घर्षण को प्रभावित करने वाले कारक (सतह का खुरदरापन व अंतःग्रथन), घर्षण: एक आवश्यक बुराई, स्थैतिक > सर्पी > लोटनिक घर्षण, स्नेहक व बॉल बेयरिंग द्वारा घर्षण कम करना, तरल घर्षण (कर्षण व सुवाही आकृति)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Static Friction > Sliding Friction > Rolling Friction",
          "Lubricants form thin layer between surfaces to reduce friction",
          "Fluid friction (Drag) is minimized by streamlined body design"
        ],
        "subtopics": [
          {
            "id": "s8-09-01",
            "title": "Origin of Friction (Microscopic Irregularities & Interlocking)",
            "titleKn": "ಘರ್ಷಣೆಯ ಉಗಮ (ಸೂಕ್ಷ್ಮ ಅಸಮತೆಗಳು ಮತ್ತು ಇಂಟರ್‌ಲಾಕಿಂಗ್)",
            "titleHi": "घर्षण की उत्पत्ति और सतहों का सूक्ष्म अंतःग्रथन",
            "type": "Core Concept",
            "estimatedMinutes": 35,
            "isCompleted": false
          },
          {
            "id": "s8-09-02",
            "title": "Static, Sliding and Rolling Friction Hierarchy (Static > Sliding > Rolling)",
            "titleKn": "ಸ್ಥಿರ, ಜಾರುವ ಮತ್ತು ಉರುಳುವ ಘರ್ಷಣೆಗಳ ಹೋಲಿಕೆ",
            "titleHi": "स्थैतिक, सर्पी और लोटनिक घर्षण की तुलना (स्थैतिक > सर्पी > लोटनिक)",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-09-03",
            "title": "Friction as a Necessary Evil: Increasing (Spikes, Tyres) & Decreasing (Lubricants, Ball Bearings)",
            "titleKn": "ಘರ್ಷಣೆ ನಿಯಂತ್ರಣ: ಹೆಚ್ಚಿಸುವುದು ಮತ್ತು ಕಡಿಮೆ ಮಾಡುವುದು",
            "titleHi": "घर्षण के लाभ-हानि, स्नेहक और बॉल बेयरिंग का उपयोग",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-09-04",
            "title": "Fluid Friction (Drag) & Streamlined Shapes in Airplanes, Ships and Birds",
            "titleKn": "ದ್ರವ ಘರ್ಷಣೆ (ಡ್ರ್ಯಾಗ್) ಮತ್ತು ಏರೋಡೈನಾಮಿಕ್ ಆಕಾರ",
            "titleHi": "तरल घर्षण (कर्षण) और पक्षियों/हवाई जहाजों की सुवाही आकृति",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-10",
        "chapterNumber": 10,
        "title": "Sound",
        "titleKn": "ಧ್ವನಿ (Sound - Physics)",
        "titleHi": "ध्वनि (Sound - Physics)",
        "unit": "Unit IV: Moving Things, People & Ideas (Physics)",
        "unitKn": "ಘಟಕ ೪: ಚಲನೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ನಿಯಮಗಳು",
        "unitHi": "इकाई ४: भौतिक विज्ञान",
        "description": "Sound is Produced by a Vibrating Body, Sound Produced by Humans (Voice Box / Larynx / Vocal Cords), Sound Needs a Medium for Propagation (Cannot travel in vacuum), How We Hear Sound through Our Ears (Eardrum / Tympanic Membrane), Amplitude, Time Period and Frequency of a Vibration (Frequency in Hertz Hz), Loudness (Depends on Amplitude², measured in Decibels dB) and Pitch (Depends on Frequency), Audible and Inaudible Sounds (20 Hz - 20,000 Hz), Noise and Music, Noise Pollution: Sources, Harms and Control Measures.",
        "descriptionKn": "ಕಂಪಿಸುವ ವಸ್ತುಗಳಿಂದ ಧ್ವನಿ ಉತ್ಪತ್ತಿ, ಮಾನವರಲ್ಲಿ ಧ್ವನಿಪೆಟ್ಟಿಗೆ (ಲ್ಯಾರಿಂಕ್ಸ್), ಧ್ವನಿ ಪ್ರಸಾರಕ್ಕೆ ಮಾಧ್ಯಮದ ಅಗತ್ಯ, ಕಿವಿ ತಮಟೆ, ಕಂಪನ ವಿಸ್ತಾರ, ಆವರ್ತಾಂಕ (Hz), ಶಬ್ದ ಮಾಲಿನ್ಯ ಮತ್ತು ನಿಯಂತ್ರಣ ಕ್ರಮಗಳು.",
        "descriptionHi": "कंपित वस्तुओं द्वारा ध्वनि का उत्पादन, मानव स्वरयंत्र (लैरिक्स/वाक् तंतु), ध्वनि संचरण हेतु माध्यम की आवश्यकता (निर्वात में गमन नहीं), आयाम, आवर्तकाल व आवृत्ति (Hz), प्रबलता (डेसिबल dB) व तारत्व, श्रव्य सीमा (20 Hz - 20,000 Hz) और ध्वनि प्रदूषण।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Frequency = Vibrations / Time (Unit = Hertz Hz)",
          "Loudness ∝ (Amplitude)²",
          "Audible range for human ear = 20 Hz to 20,000 Hz",
          "Noise above 80 dB becomes physically painful"
        ],
        "subtopics": [
          {
            "id": "s8-10-01",
            "title": "Vibrations Produce Sound & Human Larynx / Vocal Cords Mechanism",
            "titleKn": "ಕಂಪನಗಳಿಂದ ಧ್ವನಿ ಉತ್ಪತ್ತಿ ಮತ್ತು ಮಾನವ ಧ್ವನಿಪೆಟ್ಟಿಗೆ",
            "titleHi": "कंपन द्वारा ध्वनि का उत्पादन और मानव स्वरयंत्र की क्रियाविधि",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": false
          },
          {
            "id": "s8-10-02",
            "title": "Propagation Medium (Solids, Liquids, Gases vs Vacuum Bell Jar Experiment)",
            "titleKn": "ಧ್ವನಿ ಪ್ರಸಾರಕ್ಕೆ ಮಾಧ್ಯಮದ ಅಗತ್ಯ (ನಿರ್ವಾತ ಪ್ರಯೋಗ)",
            "titleHi": "ध्वनि संचरण के माध्यम और निर्वात में घंटी का प्रयोग",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-10-03",
            "title": "Human Ear Eardrum Structure, Amplitude (Loudness) & Frequency (Pitch/Shrillness)",
            "titleKn": "ಕಿವಿ ತಮಟೆ, ಧ್ವನಿಯ ತೀವ್ರತೆ ಮತ್ತು ಸ್ಥಾಯಿ",
            "titleHi": "मानव कर्णपटह, आयाम (प्रबलता) और आवृत्ति (तारत्व) का संबंध",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s8-10-04",
            "title": "Audible Range (20Hz-20kHz), Noise vs Music & Noise Pollution Hazards",
            "titleKn": "ಶ್ರವ್ಯ ಮಿತಿ ಮತ್ತು ಶಬ್ದ ಮಾಲಿನ್ಯ ತಡೆಗಟ್ಟುವಿಕೆ",
            "titleHi": "श्रव्य सीमा (20Hz-20kHz), संगीत बनाम शोर और ध्वनि प्रदूषण",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-11",
        "chapterNumber": 11,
        "title": "Chemical Effects of Electric Current",
        "titleKn": "ವಿದ್ಯುತ್ ಪ್ರವಾಹದ ರಾಸಾಯನಿಕ ಪರಿಣಾಮಗಳು",
        "titleHi": "विद्युत धारा के रासायनिक प्रभाव",
        "unit": "Unit III: Materials & Chemistry",
        "unitKn": "ಘಟಕ ೩: ವಸ್ತುಗಳು ಮತ್ತು ರಸಾಯನಶಾಸ್ತ್ರ",
        "unitHi": "इकाई ३: पदार्थ एवं रसायन विज्ञान",
        "description": "Do Liquids Conduct Electricity? (Good Conductors and Poor Conductors, Testing with LED / Magnetic Compass Tester), Chemical Effects of Electric Current (Deposition of Metal, Change of Colour, Gas Bubbles - Electrolysis of Water: Oxygen at Anode, Hydrogen at Cathode), Electroplating (Definition, Process of Copper Plating, Applications: Chromium Plating on car parts, Gold/Silver plating on jewellery, Tin cans, Zinc galvanisation of iron).",
        "descriptionKn": "ದ್ರವಗಳಲ್ಲಿ ವಿದ್ಯುತ್ ಪ್ರವಹಿಸುವಿಕೆ, ಎಲೆಕ್ಟ್ರೋಲೈಸಿಸ್ (ನೀರಿನ ವಿದ್ಯುದ್ವಿಭಜನೆ), ವಿದ್ಯುಲ್ಲೇಪನ (ಕ್ರೋಮಿಯಂ ಲೇಪನ, ಚಿನ್ನ/ಬೆಳ್ಳಿ ಲೇಪನ, ಕಲಾಯಿ).",
        "descriptionHi": "द्रवों में विद्युत चालकता (LED व चुंबकीय टेस्टर), विद्युत धारा के रासायनिक प्रभाव (गैस के बुलबुले, रंग परिवर्तन), जल का विद्युत अपघटन (ऑक्सीजन व हाइड्रोजन) और विद्युत लेपन (इलेक्ट्रोप्लेटिंग - क्रोमियम, सोना, जस्ता लेपन)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Electrolysis of Water: Oxygen gas bubbles at Positive terminal (Anode), Hydrogen gas at Negative terminal (Cathode)",
          "Electroplating: Coating metal connected to Cathode (-), Pure metal plate connected to Anode (+)"
        ],
        "subtopics": [
          {
            "id": "s8-11-01",
            "title": "Electrical Conductivity of Liquids (Salts, Acids, Bases vs Pure Water) & LED Tester",
            "titleKn": "ದ್ರವಗಳ ವಿದ್ಯುತ್ ವಾಹಕತೆ ಮತ್ತು ಎಲ್‌ಇಡಿ ಪರೀಕ್ಷಕ",
            "titleHi": "द्रवों में विद्युत चालकता (अम्ल, क्षार, लवण) और LED टेस्टर",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-11-02",
            "title": "Chemical Effects: Gas Bubbles & Water Electrolysis Experiment",
            "titleKn": "ರಾಸಾಯನಿಕ ಪರಿಣಾಮಗಳು ಮತ್ತು ನೀರಿನ ವಿದ್ಯುದ್ವಿಭಜನೆ",
            "titleHi": "विद्युत धारा के रासायनिक प्रभाव और जल का विद्युत अपघटन",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-11-03",
            "title": "Electroplating Principles, Setup & Copper Sulphate Electrolyte",
            "titleKn": "ವಿದ್ಯುಲ್ಲೇಪನದ ತತ್ವಗಳು ಮತ್ತು ತಾಮ್ರದ ಲೇಪನ ಪ್ರಯೋಗ",
            "titleHi": "विद्युत लेपन (इलेक्ट्रोप्लेटिंग) का सिद्धांत और परिपथ",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s8-11-04",
            "title": "Industrial Applications of Electroplating (Chromium, Gold, Tin, Zinc Galvanising)",
            "titleKn": "ವಿದ್ಯುಲ್ಲೇಪನದ ಕೈಗಾರಿಕಾ ಉಪಯೋಗಗಳು",
            "titleHi": "विद्युत लेपन के औद्योगिक अनुप्रयोग (क्रोमियम, जस्ता लेपन आदि)",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-12",
        "chapterNumber": 12,
        "title": "Some Natural Phenomena",
        "titleKn": "ಕೆಲವು ನೈಸರ್ಗಿಕ ವಿದ್ಯಮಾನಗಳು",
        "titleHi": "कुछ प्राकृतिक परिघटनाएं",
        "unit": "Unit IV: Moving Things, People & Ideas (Physics)",
        "unitKn": "ಘಟಕ ೪: ಚಲನೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ನಿಯಮಗಳು",
        "unitHi": "इकाई ४: भौतिक विज्ञान",
        "description": "Lightning (Charging by Rubbing, Types of Charges and their Interaction: Like charges repel, Unlike charges attract, Transfer of Charge, Gold-Leaf Electroscope, Story of Lightning - Electric Discharge, Lightning Safety - Lightning Conductors / Rods on Buildings), Earthquakes (What is an Earthquake?, Plate Tectonics, Seismic / Fault Zones, Richter Scale, Seismograph, Protection Against Earthquakes).",
        "descriptionKn": "ಮಿಂಚು (ಸ್ಥಿರವಿದ್ಯುತ್ ಆವೇಶಗಳು, ಎಲೆಕ್ಟ್ರೋಸ್ಕೋಪ್, ಮಿಂಚು ವಾಹಕಗಳು), ಭೂಕಂಪಗಳು (ಭೂಫಲಕಗಳ ಚಲನೆ, ರಿಕ್ಟರ್ ಮಾಪಕ, ಸಿಸ್ಮೋಗ್ರಾಫ್, ಭೂಕಂಪ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು).",
        "descriptionHi": "तड़ित (घर्षण द्वारा आवेशन, आवेशों के प्रकार व अन्योन्यक्रिया, स्वर्ण-पत्र विद्युतदर्शी, तड़ित चालक), भूकंप (विवर्तनिक प्लेटें, रिक्टर पैमाना, सिस्मोग्राफ) और भूकंप से बचाव के उपाय।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 7,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Like charges repel each other, unlike charges attract",
          "Richter Scale is logarithmic (Magnitude 6 is 1000 times more destructive than Magnitude 4)",
          "Lightning Rod safely grounds atmospheric electric discharge into earth"
        ],
        "subtopics": [
          {
            "id": "s8-12-01",
            "title": "Static Electric Charges by Rubbing & Gold-Leaf Electroscope Detection",
            "titleKn": "ಸ್ಥಿರವಿದ್ಯುತ್ ಆವೇಶಗಳು ಮತ್ತು ಎಲೆಕ್ಟ್ರೋಸ್ಕೋಪ್",
            "titleHi": "घर्षण द्वारा आवेशन और विद्युतदर्शी द्वारा आवेश की पहचान",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-12-02",
            "title": "Story of Lightning, Clouds Electric Discharge & Lightning Conductor",
            "titleKn": "ಮಿಂಚಿನ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಕಟ್ಟಡಗಳಿಗೆ ಮಿಂಚು ವಾಹಕಗಳು",
            "titleHi": "तड़ित (आकाशीय बिजली) का बनना और तड़ित चालक की कार्यप्रणाली",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-12-03",
            "title": "Earthquakes Causes, Fault Zones, Richter Scale & Seismograph Readings",
            "titleKn": "ಭೂಕಂಪಗಳ ಕಾರಣಗಳು, ರಿಕ್ಟರ್ ಮಾಪಕ ಮತ್ತು ಸಿಸ್ಮೋಗ್ರಾಫ್",
            "titleHi": "भूकंप के कारण, सिस्मिक जोन, रिक्टर पैमाना और सिस्मोग्राफ",
            "type": "Formula & Derivation",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-12-04",
            "title": "Do's and Don'ts during Lightning and Earthquakes for Personal Safety",
            "titleKn": "ಮಿಂಚು ಮತ್ತು ಭೂಕಂಪದ ಸಮಯದಲ್ಲಿ ಸುರಕ್ಷತಾ ಕ್ರಮಗಳು",
            "titleHi": "तड़ित और भूकंप के समय जीवन सुरक्षा के उपाय",
            "type": "Board Exam Important",
            "estimatedMinutes": 40,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "s8-13",
        "chapterNumber": 13,
        "title": "Light",
        "titleKn": "ಬೆಳಕು (Light - Physics)",
        "titleHi": "प्रकाश (Light - Physics)",
        "unit": "Unit IV: Moving Things, People & Ideas (Physics)",
        "unitKn": "ಘಟಕ ೪: ಚಲನೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ನಿಯಮಗಳು",
        "unitHi": "इकाई ४: भौतिक विज्ञान",
        "description": "What makes Things Visible?, Laws of Reflection (Angle of Incidence = Angle of Reflection, Incident ray, Normal and Reflected ray lie in same plane), Regular and Diffused Reflection, Reflected Light can be Reflected Again (Periscope, Kaleidoscope), Multiple Images (Formula n = (360°/θ) - 1), Sunlight - White or Coloured (Dispersion / Prism), What is inside Our Eyes? (Cornea, Iris, Pupil, Lens, Retina: Rods and Cones, Blind Spot, Persistence of Vision = 1/16th second), Care of Eyes, Visually Impaired Persons can Read and Write (Braille System / Louis Braille 1821).",
        "descriptionKn": "ಪ್ರತಿಫಲನದ ನಿಯಮಗಳು, ನಿಯಮಿತ ಮತ್ತು ಚದುರಿದ ಪ್ರತಿಫಲನ, ಬಹು ಬಿಂಬಗಳು, ಪೆರಿಸ್ಕೋಪ್, ಕಲಿಡೋಸ್ಕೋಪ್, ಮಾನವ ಕಣ್ಣಿನ ರಚನೆ (ರೆಟಿನಾ, ಶಂಕು-ಕಡ್ಡಿ ಜೀವಕೋಶಗಳು), ದೃಷ್ಟಿ ಸ್ಥಿರತೆ, ಬ್ರೈಲ್ ಲಿಪಿ.",
        "descriptionHi": "परावर्तन के नियम (आपतन कोण = परावर्तन कोण), नियमित व विसरित परावर्तन, बहु-प्रतिबिम्ब (कैलाइडोस्कोप, पेरिस्कोप), श्वेत प्रकाश का विक्षेपण, मानव नेत्र की संरचना (कॉर्निया, पुतली, रेटिना: शलाका व शंकु, अंध बिंदु), समंजन और ब्रेल लिपि।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 9,
        "assignedTeacher": "Dr. Priya Patel",
        "keyFormulas": [
          "Law of Reflection: ∠i = ∠r",
          "Number of images formed by two inclined mirrors: n = (360°/θ) - 1",
          "Persistence of Vision: Image stays on retina for 1/16th of a second",
          "Braille System: 63 dot patterns in 6-dot cells"
        ],
        "subtopics": [
          {
            "id": "s8-13-01",
            "title": "Laws of Reflection Verification & Ray Diagram Construction",
            "titleKn": "ಪ್ರತಿಫಲನದ ನಿಯಮಗಳು ಮತ್ತು ಕಿರಣ ನಕ್ಷೆಗಳು",
            "titleHi": "परावर्तन के नियम (∠i = ∠r) का प्रायोगिक सत्यापन",
            "type": "Experiment & Practical",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "s8-13-02",
            "title": "Regular vs Diffuse Reflection & Multiple Images Formula (Kaleidoscope, Periscope)",
            "titleKn": "ನಿಯಮಿತ-ಚದುರಿದ ಪ್ರತಿಫಲನ & ಬಹು ಬಿಂಬಗಳ ಸೂತ್ರ",
            "titleHi": "नियमित बनाम विसरित परावर्तन और बहु-प्रतिबिम्ब (कैलाइडोस्कोप)",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "s8-13-03",
            "title": "Anatomy of Human Eye: Cornea, Iris, Pupil, Lens, Retina (Rods & Cones), Blind Spot",
            "titleKn": "ಮಾನವ ಕಣ್ಣಿನ ರಚನೆ: ಐರಿಸ್, ಕಾರ್ನಿಯಾ, ರೆಟಿನಾ",
            "titleHi": "मानव नेत्र की आंतरिक संरचना (रेटिना, शंकु, शलाका कोशिकाएं)",
            "type": "Core Concept",
            "estimatedMinutes": 55,
            "isCompleted": false
          },
          {
            "id": "s8-13-04",
            "title": "Persistence of Vision (1/16s), Eye Care & Louis Braille System for Visually Impaired",
            "titleKn": "ದೃಷ್ಟಿ ಸ್ಥಿರತೆ, ಕಣ್ಣಿನ ಆರೈಕೆ ಮತ್ತು ಬ್ರೈಲ್ ಲಿಪಿ",
            "titleHi": "दृष्टि निर्बंध (1/16 सेकंड), नेत्र सुरक्षा और ब्रेल लिपि",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c8-sst",
    "name": "Social Studies",
    "nameKn": "ಸಮಾಜ ವಿಜ್ಞಾನ (Social Science)",
    "nameHi": "सामाजिक विज्ञान (Social Science)",
    "classGrade": "Class 8",
    "icon": "Globe",
    "color": "#d97706",
    "badgeBg": "bg-amber-50 text-amber-800 border-amber-200",
    "borderColor": "border-amber-500",
    "chapters": [
      {
        "id": "sst8-01",
        "chapterNumber": 1,
        "title": "How, When and Where & From Trade to Territory",
        "titleKn": "ಹೇಗೆ, ಯಾವಾಗ ಮತ್ತು ಎಲ್ಲಿ & ವ್ಯಾಪಾರದಿಂದ ಸಾಮ್ರಾಜ್ಯಕ್ಕೆ",
        "titleHi": "कैसे, कब और कहाँ एवं व्यापार से साम्राज्य तक",
        "unit": "Unit I: Our Pasts - III (History)",
        "unitKn": "ಘಟಕ ೧: ನಮ್ಮ ಗತಕಾಲ - ೩ (ಇತಿಹಾಸ)",
        "unitHi": "इकाई १: हमारे अतीत - ३ (इतिहास)",
        "description": "Periodisation of Indian History (James Mill's 1817 Classification), Colonisation, Official Records (National Archives), East India Company Comes East (Royal Charter 1600), Battle of Plassey 1757 (Robert Clive vs Sirajuddaulah), Battle of Buxar 1764 (Diwani of Bengal), Company Rule Expands (Subsidiary Alliance, Tipu Sultan - The Tiger of Mysore, Anglo-Maratha Wars, Doctrine of Lapse by Lord Dalhousie).",
        "descriptionKn": "ಭಾರತೀಯ ಇತಿಹಾಸದ ಕಾಲವಿಂಗಡಣೆ, ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಂಪನಿಯ ಆಗಮನ, ಪ್ಲಾಸಿ ಕದನ ೧೭೫೭, ಬಕ್ಸಾರ್ ಕದನ ೧೭೬೪, ಸಹಾಯಕ ಸೈನ್ಯ ಪದ್ಧತಿ, ಟಿಪ್ಪು ಸುಲ್ತಾನ್, ದತ್ತು ಮಕ್ಕಳಿಗೆ ಹಕ್ಕಿಲ್ಲ ನೀತಿ.",
        "descriptionHi": "इतिहास में अवधियों का विभाजन (जेम्स मिल), ईस्ट इंडिया कंपनी का भारत आगमन (1600), प्लासी का युद्ध 1757 (सिराजुद्दौला), बक्सर का युद्ध 1764 (दीवानी अधिकार), सहायक संधि, टीपू सुल्तान (मैसूर का शेर) और लॉर्ड डलहौजी की हड़प नीति (विलय नीति)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Key Dates: 1600 (Queen Elizabeth Charter), 1757 (Battle of Plassey), 1764 (Battle of Buxar - Diwani rights granted), 1799 (Death of Tipu Sultan at Seringapatam), 1848-1856 (Dalhousie's Doctrine of Lapse)"
        ],
        "subtopics": [
          {
            "id": "sst8-01-01",
            "title": "Periodisation of Indian History & Colonial Official Records",
            "titleKn": "ಭಾರತೀಯ ಇತಿಹಾಸದ ಕಾಲವಿಂಗಡಣೆ ಮತ್ತು ಬ್ರಿಟಿಷ್ ದಾಖಲೆಗಳು",
            "titleHi": "इतिहास का कालखंड विभाजन और औपनिवेशिक अभिलेख",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst8-01-02",
            "title": "Battle of Plassey (1757) & Battle of Buxar (1764) - Diwani Rights",
            "titleKn": "ಪ್ಲಾಸಿ ಕದನ ಮತ್ತು ಬಕ್ಸಾರ್ ಕದನ - ದಿವಾನಿ ಹಕ್ಕುಗಳು",
            "titleHi": "प्लासी का युद्ध (1757) और बक्सर का युद्ध (1764) - दीवानी अधिकार",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst8-01-03",
            "title": "Subsidiary Alliance (Lord Wellesley) & Resistance of Tipu Sultan",
            "titleKn": "ಸಹಾಯಕ ಸೈನ್ಯ ಪದ್ಧತಿ ಮತ್ತು ಟಿಪ್ಪು ಸುಲ್ತಾನನ ಪ್ರತಿರೋಧ",
            "titleHi": "सहायक संधि प्रणाली और टीपू सुल्तान का प्रतिरोध",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst8-01-04",
            "title": "Doctrine of Lapse (Lord Dalhousie - Satara, Jhansi annexation)",
            "titleKn": "ದತ್ತು ಮಕ್ಕಳಿಗೆ ಹಕ್ಕಿಲ್ಲ ನೀತಿ (ಝಾನ್ಸಿ, ಸತಾರಾ ವಿಲೀನ)",
            "titleHi": "हड़प नीति (झांसी, सतारा आदि का विलय) और नई शासन व्यवस्था",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst8-02",
        "chapterNumber": 2,
        "title": "When People Rebel: 1857 and After",
        "titleKn": "ಜನರು ದಂಗೆಯೆದ್ದಾಗ: ೧೮೫೭ ಮತ್ತು ನಂತರ",
        "titleHi": "जब जनता बगावत करती है: 1857 और उसके बाद",
        "unit": "Unit I: Our Pasts - III (History)",
        "unitKn": "ಘಟಕ ೧: ನಮ್ಮ ಗತಕಾಲ - ೩ (ಇತಿಹಾಸ)",
        "unitHi": "इकाई १: हमारे अतीत - ३ (इतिहास)",
        "description": "Policies and the People (Nawabs Lose their Power, Peasants & Sepoys, Responses to Reforms), A Mutiny Becomes a Popular Rebellion (From Meerut to Delhi 9-10 May 1857, Bahadur Shah Zafar Proclaimed Leader), Rebellion Spreads (Nana Saheb in Kanpur, Begum Hazrat Mahal in Lucknow, Rani Lakshmibai of Jhansi, Kunwar Singh in Bihar), The Company Fights Back, Aftermath of 1857 (Government of India Act 1858 - British Crown takes over, Queen Victoria's Proclamation).",
        "descriptionKn": "೧೮೫೭ ರ ಮಹಾ ದಂಗೆಯ ಕಾರಣಗಳು (ಸೈನಿಕ, ರಾಜಕೀಯ, ಧಾರ್ಮಿಕ), ಮೀರತ್‌ನಿಂದ ದೆಹಲಿಗೆ ದಂಗೆಯ ಹರಡುವಿಕೆ, ಝಾನ್ಸಿ ರಾಣಿ ಲಕ್ಷ್ಮೀಬಾಯಿ, ನಾನಾ ಸಾಹೇಬ್, ೧೮೫೮ ರ ಬ್ರಿಟಿಷ್ ಕಾಯ್ದೆ.",
        "descriptionHi": "1857 के विद्रोह के कारण (कारतूस विवाद, अवध का विलय), मेरठ से दिल्ली तक विद्रोह का प्रसार, बहादुर शाह जफर, रानी लक्ष्मीबाई, नाना साहेब, विद्रोह का दमन और 1858 का भारत सरकार अधिनियम (ब्रिटिश क्राउन का सीधा शासन)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Key Figures: Mangal Pandey (Barrackpore), Bahadur Shah Zafar (Delhi), Rani Lakshmibai (Jhansi), Nana Saheb (Kanpur), Begum Hazrat Mahal (Lucknow), Kunwar Singh (Arrah/Bihar)",
          "1858 Act: Governor-General became Viceroy (Lord Canning)"
        ],
        "subtopics": [
          {
            "id": "sst8-02-01",
            "title": "Causes of 1857 Revolt: Political, Economic, Military (Greased Cartridges)",
            "titleKn": "೧೮೫೭ ರ ದಂಗೆಯ ಕಾರಣಗಳು: ರಾಜಕೀಯ, ಆರ್ಥಿಕ & ಸೈನಿಕ",
            "titleHi": "1857 के विद्रोह के कारण: चर्बी वाले कारतूस और नीतियां",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst8-02-02",
            "title": "Spread of Revolt: Meerut, Delhi, Kanpur, Lucknow, Jhansi, Arrah",
            "titleKn": "ದಂಗೆಯ ವ್ಯಾಪ್ತಿ ಮತ್ತು ಪ್ರಮುಖ ನಾಯಕರು",
            "titleHi": "विद्रोह का प्रसार और प्रमुख नेता (रानी लक्ष्मीबाई, नाना साहेब)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst8-02-03",
            "title": "Company Repression & Recapture of Delhi and Lucknow",
            "titleKn": "ಬ್ರಿಟಿಷ್ ಪ್ರತಿದಾಳಿ ಮತ್ತು ದೆಹಲಿ ಪುನರ್ವಶ",
            "titleHi": "कंपनी की जवाबी कार्रवाई और दिल्ली का पतन",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst8-02-04",
            "title": "Aftermath of 1857: Government of India Act 1858 & Changes in Army",
            "titleKn": "೧೮೫೮ ರ ಕಾಯ್ದೆ ಮತ್ತು ಬ್ರಿಟಿಷ್ ಆಡಳಿತದಲ್ಲಿ ಬದಲಾವಣೆಗಳು",
            "titleHi": "1858 का अधिनियम: ईस्ट इंडिया कंपनी का अंत और क्राउन का शासन",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst8-03",
        "chapterNumber": 3,
        "title": "Resources & Land, Soil, Water Resources",
        "titleKn": "ಸಂಪನ್ಮೂಲಗಳು: ಭೂಮಿ, ಮಣ್ಣು ಮತ್ತು ನೀರು (Geography)",
        "titleHi": "संसाधन: भूमि, मृदा, जल संसाधन (Geography)",
        "unit": "Unit II: Resources & Development (Geography)",
        "unitKn": "ಘಟಕ ೨: ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಅಭಿವೃದ್ಧಿ (ಭೂಗೋಳ)",
        "unitHi": "इकाई २: संसाधन एवं विकास (भूगोल)",
        "description": "Types of Resources (Natural, Human Made, Human; Renewable vs Non-Renewable), Sustainable Development. Land Resources & Land Use, Soil Profile (Topsoil, Subsoil, Weathered rock, Parent rock), Factors of Soil Formation (Parent Rock, Relief, Climate, Flora/Fauna, Time), Soil Degradation & Soil Conservation (Mulching, Contour barriers, Rock dam, Terrace farming, Intercropping, Contour ploughing, Shelter belts), Water Resources (Water Scarcity & Rainwater Harvesting).",
        "descriptionKn": "ನೈಸರ್ಗಿಕ ಸಂಪನ್ಮೂಲಗಳು, ನವೀಕರಿಸಬಹುದಾದ ಸಂಪನ್ಮೂಲಗಳು, ಮಣ್ಣಿನ ರಚನೆ ಮತ್ತು ಪ್ರೊಫೈಲ್, ಮಣ್ಣಿನ ಸಂರಕ್ಷಣಾ ಕ್ರಮಗಳು (ಮೆಟ್ಟಿಲು ಕೃಷಿ, ಮಲ್ಚಿಂಗ್), ನೀರಿನ ಕೊರತೆ ಮತ್ತು ಮಳೆನೀರು ಕೊಯ್ಲು.",
        "descriptionHi": "संसाधनों के प्रकार (प्राकृतिक, मानव निर्मित, नवीकरणीय), भूमि उपयोग, मृदा परिच्छेदिका और मृदा निर्माण के कारक, मृदा संरक्षण की विधियाँ (वेदिका फार्म, मल्चिंग, समोच्च रेखीय जुताई, रक्षक मेखलाएं) और जल संरक्षण।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Principles of Sustainable Development: Respect & care for all life, Conserve Earth's vitality, Minimize depletion of natural resources",
          "Soil Conservation: Terrace farming (hilly slopes), Shelter belts (coastal/dry regions), Mulching"
        ],
        "subtopics": [
          {
            "id": "sst8-03-01",
            "title": "Types of Resources & Principles of Sustainable Development",
            "titleKn": "ಸಂಪನ್ಮೂಲಗಳ ವಿಧಗಳು ಮತ್ತು ಸುಸ್ಥಿರ ಅಭಿವೃದ್ಧಿ",
            "titleHi": "संसाधनों का वर्गीकरण और सतत पोषणीय विकास के सिद्धांत",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst8-03-02",
            "title": "Land Use Factors & Land Degradation Solutions",
            "titleKn": "ಭೂಬಳಕೆಯ ಅಂಶಗಳು ಮತ್ತು ಭೂಸಂರಕ್ಷಣೆ",
            "titleHi": "भूमि उपयोग प्रारूप और भूमि संरक्षण के उपाय",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst8-03-03",
            "title": "Soil Profile & Soil Conservation Methods (Terrace, Mulch, Shelter Belts)",
            "titleKn": "ಮಣ್ಣಿನ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಸಂರಕ್ಷಣಾ ವಿಧಾನಗಳು",
            "titleHi": "मृदा परिच्छेदिका और मृदा संरक्षण की 6 प्रमुख तकनीकें",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst8-03-04",
            "title": "Freshwater Distribution, Water Scarcity & Rainwater Harvesting",
            "titleKn": "ಸಿಹಿನೀರಿನ ಹಂಚಿಕೆ ಮತ್ತು ಮಳೆನೀರು ಕೊಯ್ಲು",
            "titleHi": "जल संकट के कारण और वर्षा जल संचयन की विधियाँ",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst8-04",
        "chapterNumber": 4,
        "title": "Agriculture and Industries",
        "titleKn": "ಕೃಷಿ ಮತ್ತು ಕೈಗಾರಿಕೆಗಳು (Geography)",
        "titleHi": "कृषि एवं उद्योग (Geography)",
        "unit": "Unit II: Resources & Development (Geography)",
        "unitKn": "ಘಟಕ ೨: ಸಂಪನ್ಮೂಲಗಳು ಮತ್ತು ಅಭಿವೃದ್ಧಿ (ಭೂಗೋಳ)",
        "unitHi": "इकाई २: संसाधन एवं विकास (भूगोल)",
        "description": "Farm System (Inputs, Processes, Outputs), Types of Farming (Subsistence Farming: Shifting Cultivation / Nomadic Herding; Commercial Farming: Grain Farming, Mixed Farming, Plantation Agriculture), Major Crops (Rice, Wheat, Millets, Maize, Cotton, Jute, Coffee, Tea). Industries: Classification of Industries (Raw Materials: Agro-based, Mineral-based, Marine-based, Forest-based; Size: Small Scale, Large Scale; Ownership: Private, Public, Joint, Co-operative Sector), Industrial System & Industrial Regions of the World, Iron and Steel Industry (Jamshedpur vs Pittsburgh), Information Technology (Silicon Valley vs Bengaluru).",
        "descriptionKn": "ಕೃಷಿ ವ್ಯವಸ್ಥೆ, ಕೃಷಿ ವಿಧಗಳು, ಪ್ರಮುಖ ಬೆಳೆಗಳು, ಕೈಗಾರಿಕೆಗಳ ವರ್ಗೀಕರಣ, ಜಮ್ಶೆಡ್‌ಪುರ vs ಪಿಟ್ಸ್‌ಬರ್ಗ್ ಉಕ್ಕು ಕೈಗಾರಿಕೆ, ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ vs ಬೆಂಗಳೂರು ಐಟಿ ಹಬ್.",
        "descriptionHi": "कृषि तंत्र, निर्वाह व वाणिज्यिक कृषि (रोपण कृषि), प्रमुख फसलें (चावल, कपास, चाय), उद्योगों का वर्गीकरण (कच्चा माल, आकार, स्वामित्व: निजी, सार्वजनिक, सहकारी), जमशेदपुर बनाम पिट्सबर्ग (लोहा-इस्पात), सिलिकॉन वैली बनाम बेंगलुरु (सूचना प्रौद्योगिकी)।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 8,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Jamshedpur TISCO established in 1907 at Sakchi (Jharkhand)",
          "Bengaluru IT Hub = Silicon Plateau / Silicon Valley of India",
          "Sunrise Industries = Emerging industries like IT, Wellness, Hospitality"
        ],
        "subtopics": [
          {
            "id": "sst8-04-01",
            "title": "Farm System (Inputs, Processes, Outputs) & Farming Types Comparison",
            "titleKn": "ಕೃಷಿ ವ್ಯವಸ್ಥೆ ಮತ್ತು ಕೃಷಿ ಪದ್ಧತಿಗಳ ಹೋಲಿಕೆ",
            "titleHi": "कृषि प्रणाली और निर्वाह बनाम वाणिज्यिक कृषि की तुलना",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst8-04-02",
            "title": "Major World Crops (Rice, Wheat, Cotton, Tea, Coffee) Geographical Requirements",
            "titleKn": "ಪ್ರಮುಖ ಬೆಳೆಗಳಿಗೆ ಅಗತ್ಯವಾದ ಹವಾಮಾನ ಪರಿಸ್ಥಿತಿಗಳು",
            "titleHi": "प्रमुख फसलों (चावल, गेहूं, कपास, चाय) की भौगोलिक दशाएं",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst8-04-03",
            "title": "Classification of Industries (Agro, Mineral, Size & Ownership Sectors)",
            "titleKn": "ಕೈಗಾರಿಕೆಗಳ ವರ್ಗೀಕರಣ (ಕಚ್ಚಾ ವಸ್ತು, ಗಾತ್ರ, ಮಾಲೀಕತ್ವ)",
            "titleHi": "उद्योगों का वर्गीकरण (कच्चा माल, आकार, स्वामित्व)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst8-04-04",
            "title": "Case Studies: Iron & Steel (Jamshedpur vs Pittsburgh) & IT (Bengaluru vs Silicon Valley)",
            "titleKn": "ಜಮ್ಶೆಡ್‌ಪುರ vs ಪಿಟ್ಸ್‌ಬರ್ಗ್ & ಬೆಂಗಳೂರು vs ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ",
            "titleHi": "तुलनात्मक अध्ययन: जमशेदपुर बनाम पिट्सबर्ग और बेंगलुरु IT हब",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "sst8-05",
        "chapterNumber": 5,
        "title": "The Indian Constitution & Secularism",
        "titleKn": "ಭಾರತೀಯ ಸಂವಿಧಾನ ಮತ್ತು ಜಾತ್ಯತೀತತೆ (Civics)",
        "titleHi": "भारतीय संविधान एवं धर्मनिरपेक्षता (Civics)",
        "unit": "Unit III: Social & Political Life - III (Civics)",
        "unitKn": "ಘಟಕ ೩: ಸಾಮಾಜಿಕ ಮತ್ತು ರಾಜಕೀಯ ಜೀವನ - ೩ (ಪೌರನೀತಿ)",
        "unitHi": "इकाई ३: सामाजिक एवं राजनीतिक जीवन - ३ (नागरिक शास्त्र)",
        "description": "Why Does a Country Need a Constitution? (Nepal Case Study), Key Features of Indian Constitution: 1. Federalism, 2. Parliamentary Form of Government, 3. Separation of Powers (Legislature, Executive, Judiciary), 4. Fundamental Rights (Right to Equality, Freedom, Against Exploitation, Freedom of Religion, Cultural and Educational Rights, Constitutional Remedies), 5. Secularism. Understanding Secularism (Separation of Religion from State, Indian Secularism vs US Secularism).",
        "descriptionKn": "ಸಂವಿಧಾನ ಏಕೆ ಬೇಕು?, ನೇಪಾಳದ ಉದಾಹರಣೆ, ಭಾರತೀಯ ಸಂವಿಧಾನದ ೫ ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು, ೬ ಮೂಲಭೂತ ಹಕ್ಕುಗಳು, ಜಾತ್ಯತೀತತೆ ಮತ್ತು ಅಮೆರಿಕನ್ ಮಾದರಿಯ ಹೋಲಿಕೆ.",
        "descriptionHi": "संविधान की आवश्यकता (नेपाल का उदाहरण), भारतीय संविधान के 5 प्रमुख लक्षण: संघवाद, संसदीय प्रणाली, शक्तियों का बंटवारा, मौलिक अधिकार (समानता, स्वतंत्रता, धार्मिक स्वतंत्रता, शोषण के विरुद्ध, संवैधानिक उपचार) और धर्मनिरपेक्षता की समझ।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "6 Fundamental Rights: Equality (Art 14-18), Freedom (Art 19-22), Against Exploitation (Art 23-24), Religious Freedom (Art 25-28), Cultural/Educational (Art 29-30), Constitutional Remedies (Art 32)",
          "Dr. Ambedkar called Article 32 the 'Heart and Soul of the Constitution'"
        ],
        "subtopics": [
          {
            "id": "sst8-05-01",
            "title": "Why Does a Country Need a Constitution? Case of Nepal's Democratic Transition",
            "titleKn": "ಸಂವಿಧಾನದ ಪ್ರಾಮುಖ್ಯತೆ ಮತ್ತು ನೇಪಾಳದ ಉದಾಹರಣೆ",
            "titleHi": "संविधान की आवश्यकता और नेपाल का लोकतांत्रिक आंदोलन",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "sst8-05-02",
            "title": "5 Key Features of Indian Constitution (Federalism, Parliamentary, Separation of Powers)",
            "titleKn": "ಭಾರತೀಯ ಸಂವಿಧಾನದ ೫ ಪ್ರಮುಖ ಲಕ್ಷಣಗಳು",
            "titleHi": "भारतीय संविधान के 5 मुख्य लक्षण और शक्तियों का पृथक्करण",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "sst8-05-03",
            "title": "Six Fundamental Rights of Indian Citizens (Articles 14 to 32)",
            "titleKn": "ಭಾರತೀಯ ನಾಗರಿಕರ ೬ ಮೂಲಭೂತ ಹಕ್ಕುಗಳು",
            "titleHi": "नागरिकों के 6 मौलिक अधिकार और संवैधानिक उपचार (अनुच्छेद 32)",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "sst8-05-04",
            "title": "Indian Secularism: Principled Distance & Comparison with USA",
            "titleKn": "ಭಾರತೀಯ ಜಾತ್ಯತೀತತೆ vs ಅಮೆರಿಕದ ಜಾತ್ಯತೀತತೆ",
            "titleHi": "भारतीय धर्मनिरपेक्षता की अवधारणा और अमेरिका से तुलना",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "sst8-06",
        "chapterNumber": 6,
        "title": "Parliament, Laws & Judiciary",
        "titleKn": "ಸಂಸತ್ತು, ಕಾನೂನುಗಳು ಮತ್ತು ನ್ಯಾಯಾಂಗ (Civics)",
        "titleHi": "संसद, कानून निर्माण एवं न्यायपालिका (Civics)",
        "unit": "Unit III: Social & Political Life - III (Civics)",
        "unitKn": "ಘಟಕ ೩: ಸಾಮಾಜಿಕ ಮತ್ತು ರಾಜಕೀಯ ಜೀವನ - ೩ (ಪೌರನೀತಿ)",
        "unitHi": "इकाई ३: सामाजिक एवं राजनीतिक जीवन - ३ (नागरಿಕ ಶಾಸ್ತ್ರ)",
        "description": "Why should People Decide? Role of Parliament (Lok Sabha - House of the People, Rajya Sabha - Council of States, President), Functions of Parliament (Selecting National Government, Controlling the Executive, Law Making). How Do New Laws Come About? (Domestic Violence Act 2005), Unpopular and Controversial Laws. What is the Role of the Judiciary? (Dispute Resolution, Judicial Review, Upholding Law and Enforcing Fundamental Rights), Structure of Courts in India (Supreme Court, High Courts, Subordinate / District Courts), Civil Law vs Criminal Law, Public Interest Litigation (PIL).",
        "descriptionKn": "ಸಂಸತ್ತಿನ ರಚನೆ (ಲೋಕಸಭೆ, ರಾಜ್ಯಸಭೆ, ರಾಷ್ಟ್ರಪತಿ), ಹೊಸ ಕಾನೂನುಗಳ ರಚನೆ (ಕೌಟುಂಬಿಕ ದೌರ್ಜನ್ಯ ಕಾಯ್ದೆ ೨೦೦೫), ನ್ಯಾಯಾಂಗ ವ್ಯವಸ್ಥೆ (ಸುಪ್ರೀಂ ಕೋರ್ಟ್, ಹೈಕೋರ್ಟ್), ಕ್ರಿಮಿನಲ್ vs ಸಿವಿಲ್ ಕಾನೂನು, ಸಾರ್ವಜನಿಕ ಹಿತಾಸಕ್ತಿ ಅರ್ಜಿ (PIL).",
        "descriptionHi": "संसद की भूमिका (लोकसभा, राज्यसभा, राष्ट्रपति), कानून निर्माण की प्रक्रिया (घरेलू हिंसा अधिनियम 2005), न्यायपालिका की संरचना (सर्वोच्च न्यायालय, उच्च न्यायालय, अधीनस्थ अदालतें), दीवानी बनाम फौजदारी कानून और जनहित याचिका (PIL)।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Mrs. Anjali Sharma",
        "keyFormulas": [
          "Lok Sabha: Max 543 elected members; Rajya Sabha: Max 245 members (12 nominated by President)",
          "Judicial Hierarchy: Supreme Court (Chief Justice of India) → High Courts → District / Subordinate Courts",
          "PIL introduced by Supreme Court in early 1980s (Justice P.N. Bhagwati)"
        ],
        "subtopics": [
          {
            "id": "sst8-06-01",
            "title": "Structure of Parliament: Lok Sabha, Rajya Sabha & President Roles",
            "titleKn": "ಸಂಸತ್ತಿನ ರಚನೆ: ಲೋಕಸಭೆ, ರಾಜ್ಯಸಭೆ & ರಾಷ್ಟ್ರಪತಿ",
            "titleHi": "संसद के अंग (लोकसभा, राज्यसभा, राष्ट्रपति) और उनके कार्य",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "sst8-06-02",
            "title": "How a Bill Becomes a Law & Domestic Violence Act 2005 Case Study",
            "titleKn": "ಮಸೂದೆ ಕಾನೂನಾಗುವ ಹಂತಗಳು & ಕೌಟುಂಬಿಕ ದೌರ್ಜನ್ಯ ಕಾಯ್ದೆ",
            "titleHi": "विधेयक के कानून बनने की प्रक्रिया और नागरिक समाज की भूमिका",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "sst8-06-03",
            "title": "Hierarchy of Courts (Supreme Court, High Court, Subordinate Courts) & Judicial Review",
            "titleKn": "ನ್ಯಾಯಾಲಯಗಳ ಶ್ರೇಣಿ ಮತ್ತು ನ್ಯಾಯಾಂಗ ವಿಮರ್ಶೆ",
            "titleHi": "न्यायालयों की त्रस्तरीय संरचना और न्यायिक समीक्षा",
            "type": "Core Concept",
            "estimatedMinutes": 50,
            "isCompleted": false
          },
          {
            "id": "sst8-06-04",
            "title": "Civil Law vs Criminal Law & Public Interest Litigation (PIL) Mechanism",
            "titleKn": "ಸಿವಿಲ್ vs ಕ್ರಿಮಿನಲ್ ಕಾನೂನು ಮತ್ತು ಸಾರ್ವಜನಿಕ ಹಿತಾಸಕ್ತಿ ಅರ್ಜಿ (PIL)",
            "titleHi": "दीवानी बनाम फौजदारी कानून और जनहित याचिका (PIL) का महत्व",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      }
    ]
  },
  {
    "id": "c8-eng",
    "name": "English Grammar",
    "nameKn": "ಇಂಗ್ಲಿಷ್ (English Language & Literature)",
    "nameHi": "अंग्रेजी (English Language & Literature)",
    "classGrade": "Class 8",
    "icon": "BookOpen",
    "color": "#7c3aed",
    "badgeBg": "bg-purple-50 text-purple-800 border-purple-200",
    "borderColor": "border-purple-500",
    "chapters": [
      {
        "id": "eng8-01",
        "chapterNumber": 1,
        "title": "Applied English Grammar: Parts of Speech & Tenses",
        "titleKn": "ವ್ಯಾಕರಣ: ನಾಮಪದ, ಕ್ರಿಯಾಪದ, ಕಾಲಗಳು ಮತ್ತು ಧ್ವನಿ",
        "titleHi": "व्याकरण: शब्द भेद, काल एवं वाच्य",
        "unit": "Unit I: Applied Grammar & Writing",
        "unitKn": "ಘಟಕ ೧: ವ್ಯಾಕರಣ ಮತ್ತು ಲೇಖನ ಕೌಶಲ್ಯ",
        "unitHi": "इकाई १: व्यावहारिक व्याकरण एवं लेखन कौशल",
        "description": "Nouns, Pronouns, Adjectives, Adverbs, Prepositions, Conjunctions. Verb Tenses (Present, Past, Future), Active and Passive Voice conversion rules, Direct and Indirect Speech basics, Sentence Reordering.",
        "descriptionKn": "ನಾಮಪದ, ಸರ್ವನಾಮ, ಗುಣವಾಚಕ, ಕ್ರಿಯಾವಿಶೇಷಣ, ಕ್ರಿಯಾಪದದ ಕಾಲಗಳು, ಕರ್ತರಿ-ಕರ್ಮಣಿ ಪ್ರಯೋಗ ಮತ್ತು ಪರೋಕ್ಷ ಭಾಷಣ.",
        "descriptionHi": "शब्द भेद (संज्ञा, सर्वनाम, विशेषण, क्रियाविशेषण), काल के प्रकार, कर्तृवाच्य व कर्मवाच्य (Active/Passive Voice) और वाक्य पुनर्व्यवस्था।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 8,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Active to Passive: Object of active becomes Subject of passive; Verb becomes 'be + V3'",
          "Direct to Indirect: 'said to' becomes 'told', simple present becomes simple past"
        ],
        "subtopics": [
          {
            "id": "eng8-01-01",
            "title": "8 Parts of Speech Mastery & Identification Drills",
            "titleKn": "೮ ಭಾಷಾ ಭಾಗಗಳ ಸಮಗ್ರ ವಿವರಣೆ ಮತ್ತು ಅಭ್ಯಾಸ",
            "titleHi": "8 शब्द भेदों की पहचान और वाक्य में सही प्रयोग",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng8-01-02",
            "title": "12 Tenses Master Chart & Fill-in-the-Blanks Practice",
            "titleKn": "೧೨ ಕಾಲಗಳ ಕೋಷ್ಟಕ ಮತ್ತು ಅಭ್ಯಾಸ",
            "titleHi": "तीनों कालों के 12 रूपों का तुलनात्मक अध्ययन",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng8-01-03",
            "title": "Active and Passive Voice Transformation Rules (All Tenses)",
            "titleKn": "ಕರ್ತರಿ-ಕರ್ಮಣಿ ಪ್ರಯೋಗದ ರೂಪಾಂತರ ನಿಯಮಗಳು",
            "titleHi": "Active से Passive Voice में बदलने के सामान्य नियम",
            "type": "Formula & Derivation",
            "estimatedMinutes": 50,
            "isCompleted": true
          },
          {
            "id": "eng8-01-04",
            "title": "Direct and Indirect Speech for Assertive Sentences & Jumbled Words",
            "titleKn": "ನೇರ-ಪರೋಕ್ಷ ಭಾಷಣ ಮತ್ತು ವಾಕ್ಯ ಜೋಡಣೆ",
            "titleHi": "Direct से Indirect Speech और अव्यवस्थित वाक्यों को क्रमबद्ध करना",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng8-02",
        "chapterNumber": 2,
        "title": "Writing Skills: Formal Letters, Notices & Short Essays",
        "titleKn": "ಲೇಖನ ಕೌಶಲ್ಯ: ಪತ್ರ ಲೇಖನ, ಪ್ರಕಟಣೆ ಮತ್ತು ಪ್ರಬಂಧ",
        "titleHi": "लेखन कौशल: पत्र, सूचना एवं निबंध लेखन",
        "unit": "Unit I: Applied Grammar & Writing",
        "unitKn": "ಘಟಕ ೧: ವ್ಯಾಕರಣ ಮತ್ತು ಲೇಖನ ಕೌಶಲ್ಯ",
        "unitHi": "इकाई १: व्यावहारिक व्याकरण एवं लेखन कौशल",
        "description": "Formal Letter to Principal/Headmaster (Leave application, Fee concession, Facilities) and Municipal Authorities. Notice Writing format (School events, Lost & Found, Competitions). Short Descriptive Essay Writing on environmental and social topics.",
        "descriptionKn": "ಮುಖ್ಯೋಪಾಧ್ಯಾಯರಿಗೆ ರಜಾ ಅರ್ಜಿ, ಪ್ರಕಟಣೆ (Notice) ರಚನೆ ಮತ್ತು ಕಿರು ಪ್ರಬಂಧ ಬರೆಯುವುದು.",
        "descriptionHi": "प्रधानाचार्य को प्रार्थना पत्र (अवकाश, शुल्क मुक्ति), स्कूल नोटिस बोर्ड हेतु सूचना लेखन का प्रारूप और निबंध।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 7,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Notice Format: Organization Name → 'NOTICE' in Caps → Date → Catchy Heading → Body (What, When, Where, Who) → Signature/Designation (in Box)"
        ],
        "subtopics": [
          {
            "id": "eng8-02-01",
            "title": "Formal Letter Format: School Applications & Municipal Letters",
            "titleKn": "ಔಪಚಾರಿಕ ಪತ್ರ ಲೇಖನದ ನಿಯಮಗಳು ಮತ್ತು ಮಾದರಿಗಳು",
            "titleHi": "औपचारिक पत्र और प्रधानाचार्य को प्रार्थना पत्र का प्रारूप",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng8-02-02",
            "title": "Notice Writing: Standard 50-word Format within Box",
            "titleKn": "ಪ್ರಕಟಣೆ (Notice) ಬರೆಯುವ ಸರಿಯಾದ ವಿಧಾನ",
            "titleHi": "सूचना लेखन (Notice) का 50 शब्दों का मानक प्रारूप",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng8-02-03",
            "title": "Short Essay / Paragraph Writing Structure (Intro, Body, Conclusion)",
            "titleKn": "ಕಿರು ಪ್ರಬಂಧ ರಚನೆ (ಪೀಠಿಕೆ, ವಿಷಯ ವಿವರಣೆ, ಉಪಸಂಹಾರ)",
            "titleHi": "निबंध लेखन (प्रस्तावना, मुख्य भाग, उपसंहार)",
            "type": "Board Exam Important",
            "estimatedMinutes": 45,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng8-03",
        "chapterNumber": 3,
        "title": "Honeydew: The Best Christmas Present in the World & The Ant and the Cricket",
        "titleKn": "ದಿ ಬೆಸ್ಟ್ ಕ್ರಿಸ್ಮಸ್ ಪ್ರೆಸೆಂಟ್ & ದಿ ಆಂಟ್ ಅಂಡ್ ದಿ ಕ್ರಿಕೆಟ್",
        "titleHi": "The Best Christmas Present और The Ant and the Cricket",
        "unit": "Unit II: Literature (Honeydew)",
        "unitKn": "ಘಟಕ ೨: ಸಾಹಿತ್ಯ (ಹನಿಡ್ಯೂ)",
        "unitHi": "इकाई २: साहित्य (Honeydew)",
        "description": "The Best Christmas Present in the World (Michael Morpurgo) - World War I Christmas truce 1914 between British (Jim Macpherson) and German (Hans Wolf) soldiers, Connie's letter. Poem: The Ant and the Cricket (Aesop's Fables) - Hard work, foresight vs negligence.",
        "descriptionKn": "ದಿ ಬೆಸ್ಟ್ ಕ್ರಿಸ್ಮಸ್ ಪ್ರೆಸೆಂಟ್ (ಮೊದಲ ಮಹಾಯುದ್ಧದ ಕ್ರಿಸ್ಮಸ್ ಶಾಂತಿ ಒಪ್ಪಂದ), ದಿ ಆಂಟ್ ಅಂಡ್ ದಿ ಕ್ರಿಕೆಟ್ (ಇರುವೆ ಮತ್ತು ಮಿಡತೆ ಕವನ).",
        "descriptionHi": "The Best Christmas Present in the World (माइकल मोरपुर्गो - 1914 प्रथम विश्व युद्ध का क्रिसमस युद्धविराम) और The Ant and the Cricket कविता (मेहनत और दूरदर्शिता की सीख)।",
        "status": "Completed",
        "completionPercent": 100,
        "totalPeriods": 6,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "WWI Christmas 1914: British & German soldiers shared schnapps, sausages and played football in No Man's Land",
          "Moral of The Ant & The Cricket: 'Folks call this a fable. I'll warrant it true: Some crickets have four legs, and some have two'"
        ],
        "subtopics": [
          {
            "id": "eng8-03-01",
            "title": "The Best Christmas Present: WWI Truce & Jim Macpherson's Letter",
            "titleKn": "ಮೊದಲ ಮಹಾಯುದ್ಧದ ಕ್ರಿಸ್ಮಸ್ ದಿನ ಮತ್ತು ಜಿಮ್ ಪತ್ರ",
            "titleHi": "The Best Christmas Present की कहानी और युद्धविराम की भावना",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng8-03-02",
            "title": "The Ant and the Cricket: Rhyme Scheme (aabbcc), Fable & Moral Lesson",
            "titleKn": "ಇರುವೆ ಮತ್ತು ಮಿಡತೆ ಕವನದ ನೀತಿ ಸಂದೇಶ",
            "titleHi": "The Ant and the Cricket कविता का काव्य सौंदर्य और सीख",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng8-03-03",
            "title": "NCERT Textbook Exercises, Vocabulary & Short Answer Questions",
            "titleKn": "ಪ್ರಶ್ನೋತ್ತರಗಳು ಮತ್ತು ಶಬ್ದಾರ್ಥಗಳು",
            "titleHi": "NCERT प्रश्नोत्तर और महत्वपूर्ण शब्दावली",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 40,
            "isCompleted": true
          }
        ]
      },
      {
        "id": "eng8-04",
        "chapterNumber": 4,
        "title": "Honeydew: The Tsunami & Geography Lesson",
        "titleKn": "ದಿ ಸುನಾಮಿ ಮತ್ತು ಜಿಯಾಗ್ರಫಿ ಲೆಸನ್",
        "titleHi": "The Tsunami और Geography Lesson",
        "unit": "Unit II: Literature (Honeydew)",
        "unitKn": "ಘಟಕ ೨: ಸಾಹಿತ್ಯ (ಹನಿಡ್ಯೂ)",
        "unitHi": "इकाई २: साहित्य (Honeydew)",
        "description": "The Tsunami - True courage and survival stories from 26 Dec 2004 Indian Ocean Tsunami (Ignesious in Andaman, Sanjeev, Meghna, Almas Javed, Tilly Smith saving lives in Phuket, Animal senses). Poem: Geography Lesson (Zulfikar Ghose) - Perspective of Earth from jet plane, logic of geography vs human hatred.",
        "descriptionKn": "ದಿ ಸುನಾಮಿ (೨೦೦೪ ರ ಸುನಾಮಿ ನೈಜ ಬದುಕುಳಿದ ಕಥೆಗಳು, ಟಿಲ್ಲಿ ಸ್ಮಿತ್), ಜಿಯಾಗ್ರಫಿ ಲೆಸನ್ (ವಿಮಾನದಿಂದ ಭೂಮಿಯ ದೃಶ್ಯ ಮತ್ತು ಭೌಗೋಳಿಕ ತರ್ಕ).",
        "descriptionHi": "The Tsunami (26 दिसंबर 2004 की सुनामी में साहस और बचाव की सच्ची कहानियां, टिली स्मिथ) और Geography Lesson कविता (जुल्फिकार घोष - विमान से पृथ्वी का दृश्य)।",
        "status": "In Progress",
        "completionPercent": 60,
        "totalPeriods": 6,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "26 Dec 2004 Tsunami caused by 9.1 magnitude undersea earthquake off Sumatra coast",
          "Tilly Smith (10-yr-old British girl) saved many tourists at Maikhao Beach Phuket after recognizing tsunami warning signs"
        ],
        "subtopics": [
          {
            "id": "eng8-04-01",
            "title": "The Tsunami: Stories of Courage (Meghna, Almas, Tilly Smith, Animals' Sixth Sense)",
            "titleKn": "ಸುನಾಮಿ ನೈಜ ಕಥೆಗಳು ಮತ್ತು ಪ್ರಾಣಿಗಳ ಆರನೇ ಇಂದ್ರಿಯ",
            "titleHi": "सुनामी के दौरान साहस की सच्ची कहानियां (टिली स्मिथ आदि)",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": true
          },
          {
            "id": "eng8-04-02",
            "title": "Geography Lesson Poem: Scales of View (10,000 ft & 6 miles) & Human Borders",
            "titleKn": "ಜಿಯಾಗ್ರಫಿ ಲೆಸನ್ ಕವನದ ಅರ್ಥ ಮತ್ತು ಮಾನವ ಗಡಿಗಳು",
            "titleHi": "Geography Lesson कविता का भावार्थ और मानव सीमाओं पर विचार",
            "type": "Core Concept",
            "estimatedMinutes": 40,
            "isCompleted": true
          },
          {
            "id": "eng8-04-03",
            "title": "NCERT Questions, Comprehension Check & Long Answer Questions",
            "titleKn": "ಪಾಠದ ಪ್ರಶ್ನೋತ್ತರಗಳು ಮತ್ತು ಅಭ್ಯಾಸ",
            "titleHi": "NCERT प्रश्न और विस्तृत व्याख्या",
            "type": "NCERT Exercise Drill",
            "estimatedMinutes": 40,
            "isCompleted": false
          }
        ]
      },
      {
        "id": "eng8-05",
        "chapterNumber": 5,
        "title": "It So Happened: Supplementary Reader Highlights",
        "titleKn": "ಇಟ್ ಸೋ ಹ್ಯಾಪನ್ಡ್: ಪೂರಕ ಪಠ್ಯದ ಪ್ರಮುಖ ಕಥೆಗಳು",
        "titleHi": "It So Happened: पूरक पाठ्यपुस्तक की प्रमुख कहानियां",
        "unit": "Unit III: Supplementary Reader (It So Happened)",
        "unitKn": "ಘಟಕ ೩: ಪೂರಕ ಓದು (ಇಟ್ ಸೋ ಹ್ಯಾಪನ್ಡ್)",
        "unitHi": "इकाई ३: पूरक साहित्य (It So Happened)",
        "description": "How the Camel Got His Hump (Rudyard Kipling), Children at Work (Gita Wolf - Child labour and ragpickers like Velu and Jaya in Chennai), The Selfish Giant (Oscar Wilde - Compassion, redemption and love), The Treasure Within (Hafeez Contractor interview), Princess September, The Fight (Ruskin Bond), Jalebis (Ahmed Nadeem Qasmi).",
        "descriptionKn": "ಹೌ ದಿ ಕ್ಯಾಮೆಲ್ ಗಾಟ್ ಹಿಸ್ ಹಂಪ್, ಚಿಲ್ಡ್ರನ್ ಅಟ್ ವರ್ಕ್ (ಮಕ್ಕಳ ಕಾರ್ಮಿಕ ಪದ್ಧತಿ), ದಿ ಸೆಲ್ಫಿಶ್ ಜೈಂಟ್, ದಿ ಟ್ರೆಷರ್ ವಿದಿನ್, ಜಲೇಬಿಸ್.",
        "descriptionHi": "How the Camel Got His Hump (रुडयार्ड किपलिंग), Children at Work (बाल श्रम और वेल्लू की कहानी), The Selfish Giant (ऑस्कर वाइल्ड - दया और प्रेम), The Treasure Within (हाफ़िज़ कांट्रैक्टर), Jalebis।",
        "status": "Upcoming",
        "completionPercent": 0,
        "totalPeriods": 8,
        "assignedTeacher": "Ms. Kavita Nair",
        "keyFormulas": [
          "Themes: Anti-laziness (Camel saying 'Humph'), Social realism of child ragpickers (Children at Work), Selflessness and Love (Selfish Giant), Unconventional learning (Hafeez Contractor)"
        ],
        "subtopics": [
          {
            "id": "eng8-05-01",
            "title": "How the Camel Got His Hump & Children at Work Analysis",
            "titleKn": "ಕ್ಯಾಮೆಲ್ ಕಥೆ & ಚಿಲ್ಡ್ರನ್ ಅಟ್ ವರ್ಕ್ ವಿಶ್ಲೇಷಣೆ",
            "titleHi": "How the Camel Got His Hump और Children at Work की समीक्षा",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "eng8-05-02",
            "title": "The Selfish Giant (Oscar Wilde) & The Treasure Within (Hafeez Contractor)",
            "titleKn": "ದಿ ಸೆಲ್ಫಿಶ್ ಜೈಂಟ್ & ದಿ ಟ್ರೆಷರ್ ವಿದಿನ್ ಸಂದರ್ಶನ",
            "titleHi": "The Selfish Giant और The Treasure Within",
            "type": "Core Concept",
            "estimatedMinutes": 45,
            "isCompleted": false
          },
          {
            "id": "eng8-05-03",
            "title": "Jalebis & The Fight: Character Sketches and Life Lessons",
            "titleKn": "ಜಲೇಬಿಸ್ ಮತ್ತು ದಿ ಫೈಟ್ ಕಥೆಗಳ ಪಾತ್ರಗಳು ಮತ್ತು ನೀತಿ",
            "titleHi": "Jalebis और The Fight के प्रमुख पात्र और नैतिक सीख",
            "type": "Board Exam Important",
            "estimatedMinutes": 50,
            "isCompleted": false
          }
        ]
      }
    ]
  }
];
