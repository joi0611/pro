window.VOCAB_AUDIO_BACKUPS = Object.fromEntries(
  (window.VOCAB_GROUPS || [])
    .map((group) => String(group?.core?.word || "").trim().toLowerCase())
    .filter(Boolean)
    .map((word) => [
      word,
      `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=en&q=${encodeURIComponent(
        word.replace(/-/g, " ")
      )}`,
    ])
);

window.VOCAB_AUDIO_POLICY = {
  mode: "browser-first",
  note: "Browser speech is used first, with electronic backup pronunciation as fallback.",
};
