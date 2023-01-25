import CryptoJS from "crypto-js";

/**
 * Get random integer (min <= x < max)
 * @param min
 * @param max
 * @returns random int
 */
export function getRandInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * max);
}

const utter = new SpeechSynthesisUtterance("");
const synth = window.speechSynthesis;
/**
 * Speech text with the Web Speech API
 * @param text text to speech
 */
export function speech(text: string) {
  utter.text = text;
  synth.cancel();
  synth.speak(utter);
}

/**
 * Detect if the system is in dark mode
 * @return In dark mode, returns `true`
 */
export function isDarkMode(): boolean {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
    return true;
  return false;
}

/**
 * Encrypt an item and set it to local storage
 */
export function encryptSetLS(key: string, item: any): void {
  localStorage.setItem(
    key,
    CryptoJS.AES.encrypt(
      JSON.stringify(item),
      import.meta.env.VITE_CRYPTO_JS_SECRET_KEY
    ).toString()
  );
}

/**
 * Get an encrypted item from local storage and returns the decrypted one
 * @returns status: 1 if successful, 0 if item not found, -1 if decryption failed
 * @returns item: Decrypted item on success, null otherwise
 */
export function decryptGetLS(key: string): [number, any | null] {
  let ls = localStorage.getItem(key);
  if (ls) {
    try {
      return [
        1,
        JSON.parse(
          CryptoJS.AES.decrypt(
            ls,
            import.meta.env.VITE_CRYPTO_JS_SECRET_KEY
          ).toString(CryptoJS.enc.Utf8)
        ),
      ];
    } catch (error) {
      return [-1, null];
    }
  } else return [0, null];
}
