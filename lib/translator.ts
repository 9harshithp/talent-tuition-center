import { Language } from "./translations";

export interface NotificationTranslations {
  kn?: { title: string; message: string };
  hi?: { title: string; message: string };
}

/**
 * Translates a single text into a target language (Kannada or Hindi)
 */
export async function translateText(text: string, target: "kn" | "hi"): Promise<string> {
  if (!text || !text.trim()) return "";
  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target, source: "en" }),
    });
    if (res.ok) {
      const data = await res.json();
      if (data.translatedText) {
        return data.translatedText;
      }
    }
  } catch (err) {
    console.warn("Translation failed, using fallback:", err);
  }
  return text;
}

/**
 * Translates both title and message of a notification into Kannada and Hindi
 */
export async function translateNotificationPayload(
  title: string,
  message: string
): Promise<NotificationTranslations> {
  try {
    const [knTitle, knMsg, hiTitle, hiMsg] = await Promise.all([
      translateText(title, "kn"),
      translateText(message, "kn"),
      translateText(title, "hi"),
      translateText(message, "hi"),
    ]);

    return {
      kn: {
        title: knTitle || title,
        message: knMsg || message,
      },
      hi: {
        title: hiTitle || title,
        message: hiMsg || message,
      },
    };
  } catch {
    return {
      kn: { title, message },
      hi: { title, message },
    };
  }
}
