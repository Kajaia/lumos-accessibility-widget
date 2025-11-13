export default async function tts(text, { onPlay, onEnd } = {}) {
  if (!text) return;

  const baseURL = "";

  try {
    const res = await fetch(`${baseURL}/api/tts/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) throw new Error("TTS API not working.");

    const { audio_url } = await res.json();

    if (audio_url) {
      const audio = new Audio(`${baseURL}${audio_url}`);
      onPlay?.(audio);
      audio.addEventListener("ended", () => onEnd?.());
      await audio.play();
      return audio;
    } else {
      throw new Error("Can't play audio file.");
    }
  } catch (error) {
    console.error("TTS error:", error);
  }
}
