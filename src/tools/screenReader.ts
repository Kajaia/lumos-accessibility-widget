import tts from "@/utils/tts";

const allowedElements = [
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "P",
  "A",
  "BUTTON",
  "B",
  "STRONG",
  "I",
  "EM",
  "MARK",
  "INS",
  "DEL",
  "SUP",
  "SUB",
  "SMALL",
  "BLOCKQUOTE",
  "Q",
  "PRE",
  "ABBR",
  "UL",
  "LI",
  "SPAN",
];

let mouseOverHandler = null;
let currentAudio = null;

export default function screenReader(enable = false) {
  if (enable) {
    if (mouseOverHandler) return;

    mouseOverHandler = async (e) => {
      const element = e.target;
      if (!allowedElements.includes(element.tagName)) return;

      element.style.outline = "2px solid #0948CA";

      element.addEventListener(
        "mouseleave",
        () => {
          element.style.outline = "";
          if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
          }
        },
        { once: true }
      );

      const text = element?.innerText?.trim();
      if (!text) return;

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
      }

      currentAudio = await tts(text, {
        onPlay: (audio) => (currentAudio = audio),
        onEnd: () => (currentAudio = null),
      });
    };

    document.addEventListener("mouseover", mouseOverHandler);
  } else {
    if (mouseOverHandler) {
      document.removeEventListener("mouseover", mouseOverHandler);
      mouseOverHandler = null;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
  }
}
