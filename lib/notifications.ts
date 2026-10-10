export type NotificationCategory = 'general' | 'urgent' | 'exam' | 'schedule' | 'fees';
export type NotificationTarget = 'all' | 'students' | 'teachers';

export interface TTCNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  target: NotificationTarget;
  author: string;
  createdAt: string;
  pinned?: boolean;
  translations?: {
    kn?: { title: string; message: string };
    hi?: { title: string; message: string };
  };
}

export const INITIAL_NOTIFICATIONS: TTCNotification[] = [
  {
    id: "notif-1",
    title: "Mid-Term Revision Marathon This Saturday",
    message: "Special 3-hour revision workshop covering Physics Optics and Mathematics Trigonometry for Class 10 students. Attendance is compulsory.",
    category: "exam",
    target: "students",
    author: "Center Admin",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    pinned: true,
    translations: {
      kn: {
        title: "ಈ ಶನಿವಾರ ಮಧ್ಯವಾರ್ಷಿಕ ಪುನರಾವರ್ತನೆ ಮ್ಯಾರಥಾನ್",
        message: "10 ನೇ ತರಗತಿ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಭೌತಶಾಸ್ತ್ರ ಮತ್ತು ಗಣಿತ ತ್ರಿಕೋನಮಿತಿಯ 3 ಗಂಟೆಗಳ ವಿಶೇಷ ಪುನರಾವರ್ತನೆ ಕಾರ್ಯಾಗಾರ. ಹಾಜರಾತಿ ಕಡ್ಡಾಯ.",
      },
      hi: {
        title: "इस शनिवार मध्यावधि पुनरीक्षण मैराथन",
        message: "कक्षा 10 के छात्रों के लिए भौतिकी और गणित की 3 घंटे की विशेष पुनरीक्षण कार्यशाला। उपस्थिति अनिवार्य है।",
      },
    },
  },
  {
    id: "notif-2",
    title: "Staff Meeting on Syllabus Completion",
    message: "All faculty members are requested to assemble in Conference Room 1 tomorrow at 7:30 PM to review monthly test papers and syllabus benchmarks.",
    category: "general",
    target: "teachers",
    author: "Center Admin",
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    pinned: false,
    translations: {
      kn: {
        title: "ಪಠ್ಯಕ್ರಮ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆ ಕುರಿತು ಶಿಕ್ಷಕರ ಸಭೆ",
        message: "ಎಲ್ಲಾ ಬೋಧಕ ಸಿಬ್ಬಂದಿಗಳು ನಾಳೆ ಸಂಜೆ 7:30 ಕ್ಕೆ ಕೊಠಡಿ 1 ರಲ್ಲಿ ಸಭೆಗೆ ಹಾಜರಾಗಲು ಕೋರಲಾಗಿದೆ.",
      },
      hi: {
        title: "पाठ्यक्रम पूर्णता पर शिक्षक बैठक",
        message: "सभी संकाय सदस्यों से अनुरोध है कि वे कल शाम 7:30 बजे सम्मेलन कक्ष 1 में बैठक के लिए उपस्थित हों।",
      },
    },
  },
  {
    id: "notif-3",
    title: "Urgent: Center Closed on Monday for Festival",
    message: "Talent Tuition Center will remain closed on Monday on account of the state festival. Extra makeup classes will be rescheduled next week.",
    category: "urgent",
    target: "all",
    author: "Center Admin",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    pinned: true,
    translations: {
      kn: {
        title: "ತುರ್ತು: ಹಬ್ಬದ ನಿಮಿತ್ತ ಸೋಮವಾರ ಕೇಂದ್ರಕ್ಕೆ ರಜೆ",
        message: "ರಾಜ್ಯ ಹಬ್ಬದ ಪ್ರಯುಕ್ತ ಸೋಮವಾರ ಟ್ಯಾಲೆಂಟ್ ಟ್ಯೂಷನ್ ಸೆಂಟರ್ ಮುಚ್ಚಿರುತ್ತದೆ. ಹೆಚ್ಚುವರಿ ತರಗತಿಗಳನ್ನು ಮುಂದಿನ ವಾರ ನಡೆಸಲಾಗುವುದು.",
      },
      hi: {
        title: "ज़रूरी: त्योहार के उपलक्ष्य में सोमवार को केंद्र बंद रहेगा",
        message: "राज्य उत्सव के कारण सोमवार को टैलेंट ट्यूशन सेंटर बंद रहेगा। अतिरिक्त कक्षाएं अगले सप्ताह आयोजित की जाएंगी।",
      },
    },
  },
  {
    id: "notif-4",
    title: "Quarterly Fee Reminder Notice",
    message: "Parents and students are kindly requested to clear pending September quarter fees by 28th September to ensure uninterrupted learning resources.",
    category: "fees",
    target: "students",
    author: "Center Admin",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    pinned: false,
    translations: {
      kn: {
        title: "ತ್ರೈಮಾಸಿಕ ಶುಲ್ಕ ಜ್ಞಾಪನೆ ಸೂಚನೆ",
        message: "ಸೆಪ್ಟೆಂಬರ್ ತಿಂಗಳ ಬಾಕಿ ಶುಲ್ಕವನ್ನು ಸೆಪ್ಟೆಂಬರ್ 28 ರೊಳಗೆ ಪಾವತಿಸಲು ವಿನಂತಿಸಲಾಗಿದೆ.",
      },
      hi: {
        title: "त्रैमासिक शुल्क अनुस्मारक सूचना",
        message: "कृपया 28 सितंबर तक लंबित सितंबर तिमाही शुल्क का भुगतान करें।",
      },
    },
  },
];
