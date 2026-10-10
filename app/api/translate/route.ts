import { NextRequest, NextResponse } from "next/server";

// Dictionary of common tuition center phrases & vocabulary for offline / fallback translation
const COMMON_DICTIONARY: Record<string, { kn: string; hi: string }> = {
  "test": { kn: "ಪರೀಕ್ಷೆ", hi: "परीक्षा" },
  "exam": { kn: "ಪರೀಕ್ಷೆ", hi: "परीक्षा" },
  "class": { kn: "ತರಗತಿ", hi: "कक्षा" },
  "classes": { kn: "ತರಗತಿಗಳು", hi: "कक्षाएं" },
  "student": { kn: "ವಿದ್ಯಾರ್ಥಿ", hi: "छात्र" },
  "students": { kn: "ವಿದ್ಯಾರ್ಥಿಗಳು", hi: "छात्रों" },
  "teacher": { kn: "ಶಿಕ್ಷಕರು", hi: "अध्यापक" },
  "teachers": { kn: "ಶಿಕ್ಷಕರು", hi: "अध्यापकगण" },
  "tomorrow": { kn: "ನಾಳೆ", hi: "कल" },
  "today": { kn: "ಇಂದು", hi: "आज" },
  "yesterday": { kn: "ನಿನ್ನೆ", hi: "कल" },
  "important": { kn: "ಮುಖ್ಯವಾದ", hi: "महत्वपूर्ण" },
  "urgent": { kn: "ತುರ್ತು", hi: "अति आवश्यक" },
  "holiday": { kn: "ರಜೆ", hi: "छुट्टी" },
  "closed": { kn: "ಮುಚ್ಚಲಾಗಿದೆ", hi: "बंद है" },
  "fees": { kn: "ಶುಲ್ಕ", hi: "शुल्क" },
  "fee": { kn: "ಶುಲ್ಕ", hi: "शुल्क" },
  "reminder": { kn: "ಜ್ಞಾಪನೆ", hi: "याद दिलाना" },
  "revision": { kn: "ಪುನರಾವರ್ತನೆ", hi: "पुनरीक्षण" },
  "workshop": { kn: "ಕಾರ್ಯಾಗಾರ", hi: "कार्यशाला" },
  "maths": { kn: "ಗಣಿತ", hi: "गणित" },
  "mathematics": { kn: "ಗಣಿತ", hi: "गणित" },
  "science": { kn: "ವಿಜ್ಞಾನ", hi: "विज्ञान" },
  "physics": { kn: "ಭೌತಶಾಸ್ತ್ರ", hi: "भौतिक विज्ञान" },
  "chemistry": { kn: "ರಸಾಯನಶಾಸ್ತ್ರ", hi: "रसायन विज्ञान" },
  "english": { kn: "ಇಂಗ್ಲಿಷ್", hi: "अंग्रेजी" },
  "homework": { kn: "ಮನೆಕೆಲಸ", hi: "गृहकार्य" },
  "meeting": { kn: "ಸಭೆ", hi: "बैठक" },
  "room": { kn: "ಕೊಠಡಿ", hi: "कमरा" },
  "schedule": { kn: "ವೇಳಾಪಟ್ಟಿ", hi: "समय सारिणी" },
  "syllabus": { kn: "ಪಠ್ಯಕ್ರಮ", hi: "पाठ्यक्रम" },
  "attendance": { kn: "ಹಾಜರಾತಿ", hi: "उपस्थिति" },
  "compulsory": { kn: "ಕಡ್ಡಾಯ", hi: "अनिवार्य" },
  "marks": { kn: "ಅಂಕಗಳು", hi: "अंक" },
  "result": { kn: "ಫಲಿತಾಂಶ", hi: "परिणाम" },
  "results": { kn: "ಫಲಿತಾಂಶಗಳು", hi: "परिणाम" },
  "notice": { kn: "ಸೂಚನೆ", hi: "सूचना" },
  "announcement": { kn: "ಪ್ರಕಟಣೆ", hi: "घोषणा" },
  "doubt": { kn: "ಅನುಮಾನ", hi: "शंका" },
  "question": { kn: "ಪ್ರಶ್ನೆ", hi: "प्रश्न" },
  "answer": { kn: "ಉತ್ತರ", hi: "उत्तर" },
  "please": { kn: "ದಯವಿಟ್ಟು", hi: "कृपया" },
  "all": { kn: "ಎಲ್ಲಾ", hi: "सभी" },
  "submit": { kn: "ಸಲ್ಲಿಸಿ", hi: "जमा करें" },
  "parent": { kn: "ಪೋಷಕರು", hi: "अभिभावक" },
  "parents": { kn: "ಪೋಷಕರು", hi: "अभिभावकगण" },
  "saturday": { kn: "ಶನಿವಾರ", hi: "शनिवार" },
  "sunday": { kn: "ಭಾನುವಾರ", hi: "रविवार" },
  "monday": { kn: "ಸೋಮವಾರ", hi: "सोमवार" },
};

function fallbackDictionaryTranslate(text: string, targetLang: "kn" | "hi"): string {
  if (!text) return "";
  
  // Quick phrase matches
  const lower = text.trim().toLowerCase();
  
  if (lower.includes("test") && lower.includes("tomorrow")) {
    return targetLang === "kn" ? "ನಾಳೆ ಪರೀಕ್ಷೆ ನಡೆಯಲಿದೆ. ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳು ಸಿದ್ಧರಾಗಿ ಬನ್ನಿ." : "कल परीक्षा आयोजित की जाएगी। सभी छात्र तैयार होकर आएं।";
  }
  if (lower.includes("holiday") || (lower.includes("closed") && lower.includes("monday"))) {
    return targetLang === "kn" ? "ಹಬ್ಬದ ಪ್ರಯುಕ್ತ ಕೇಂದ್ರ ಮುಚ್ಚಿರುತ್ತದೆ. ರಜೆ ಘೋಷಿಸಲಾಗಿದೆ." : "त्योहार के अवसर पर केंद्र बंद रहेगा। अवकाश घोषित किया गया है।";
  }
  if (lower.includes("fee") && lower.includes("reminder")) {
    return targetLang === "kn" ? "ತ್ರೈಮಾಸಿಕ ಶುಲ್ಕ ಪಾವತಿಸಲು ಜ್ಞಾಪನೆ. ದಯವಿಟ್ಟು ಬಾಕಿ ಮೊತ್ತವನ್ನು ಪಾವತಿಸಿ." : "त्रैमासिक शुल्क भुगतान अनुस्मारक। कृपया बकाया राशि का भुगतान करें।";
  }
  if (lower.includes("meeting")) {
    return targetLang === "kn" ? "ಶಿಕ್ಷಕರು ಮತ್ತು ಸಿಬ್ಬಂದಿ ಸಭೆ ನಿಗದಿಯಾಗಿದೆ." : "शिक्षकों और कर्मचारियों की बैठक निर्धारित है।";
  }
  if (lower.includes("homework") || lower.includes("assignment")) {
    return targetLang === "kn" ? "ಹೊಸ ಮನೆಕೆಲಸ ಮತ್ತು ಅಭ್ಯಾಸ ಪ್ರಶ್ನೆಗಳನ್ನು ನೀಡಲಾಗಿದೆ." : "नया गृहकार्य और अभ्यास प्रश्न दिए गए हैं।";
  }

  // Token replacement for educational terms
  let translatedWords = text.split(/\b/);
  return translatedWords
    .map((word) => {
      const match = COMMON_DICTIONARY[word.toLowerCase()];
      if (match) {
        return match[targetLang];
      }
      return word;
    })
    .join("");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, texts, target = "kn", source = "en" } = body;

    const libreUrl = process.env.LIBRETRANSLATE_URL || "https://libretranslate.com";
    const apiKey = process.env.LIBRETRANSLATE_API_KEY;

    const translateSingle = async (inputStr: string, targetLanguage: "kn" | "hi"): Promise<string> => {
      if (!inputStr || !inputStr.trim()) return "";

      // Try LibreTranslate endpoint if available
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const payload: Record<string, string> = {
          q: inputStr,
          source: source,
          target: targetLanguage,
          format: "text",
        };
        if (apiKey) payload.api_key = apiKey;

        const res = await fetch(`${libreUrl}/translate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.translatedText) {
            return data.translatedText;
          }
        }
      } catch {
        // Fallback below
      }

      // Try MyMemory public translation as backup
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);
        const encoded = encodeURIComponent(inputStr);
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encoded}&langpair=en|${targetLanguage}`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);
        if (res.ok) {
          const data = await res.json();
          if (data?.responseData?.translatedText && !data.responseData.translatedText.startsWith("MYMEMORY WARNING")) {
            return data.responseData.translatedText;
          }
        }
      } catch {
        // Fallback below
      }

      // Offline dictionary & terminology heuristic translation
      return fallbackDictionaryTranslate(inputStr, targetLanguage);
    };

    if (texts && Array.isArray(texts)) {
      const results = await Promise.all(
        texts.map((t: string) => translateSingle(t, target as "kn" | "hi"))
      );
      return NextResponse.json({ translatedTexts: results });
    }

    if (text) {
      const result = await translateSingle(text, target as "kn" | "hi");
      return NextResponse.json({ translatedText: result });
    }

    return NextResponse.json({ error: "Missing text or texts parameter" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Translation error" }, { status: 500 });
  }
}
