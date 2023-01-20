/**
 * Get random integer (min <= x < max)
 * @param min
 * @param max
 * @returns random int
 */
function getRandInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * max);
}

/**
 * Speech text with the Web Speech API
 * @param text text to speech
 */
function speech(text: string) {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  synth.speak(utter);
}

export { getRandInt, speech };
