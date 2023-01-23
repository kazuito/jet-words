/**
 * Get random integer (min <= x < max)
 * @param min
 * @param max
 * @returns random int
 */
function getRandInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * max);
}

const utter = new SpeechSynthesisUtterance("");
const synth = window.speechSynthesis;
/**
 * Speech text with the Web Speech API
 * @param text text to speech
 */
function speech(text: string) {
  utter.text = text;
  synth.cancel();
  synth.speak(utter);
}

/**
 * Detect if the system is in dark mode
 * @return In dark mode, returns `true`
 */
function isDarkMode(): boolean {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    return true;
  return false;
}

export { getRandInt, speech, isDarkMode };
