import { getSavedUserSettings } from "@/globals/userSettings";

export async function fetchAudio(text, gender = "male") {
  if (!text) return null;

  const baseURL = "https://tts.geoevents.ge";

  const userSettings = getSavedUserSettings();

  try {
    const res = await fetch(`${baseURL}/api/tts/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        locale: userSettings?.lang || "en",
        gender,
      }),
    });

    if (!res.ok) throw new Error("TTS API not working.");

    const { audio_url } = await res.json();

    if (audio_url) {
      const audio = new Audio(audio_url);

      await new Promise((resolve, reject) => {
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
      });

      return audio;
    } else {
      throw new Error("Missing audio URL.");
    }
  } catch (error) {
    console.error("TTS error:", error);
    return null;
  }
}
