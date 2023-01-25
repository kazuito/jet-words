import { ScoreData } from "./../../types.d";
import { atom } from "recoil";
import CryptoJS from "crypto-js";

function getInitValue() {
  let ls = localStorage.getItem("score_data");
  if (ls)
    try {
      return JSON.parse(
        CryptoJS.AES.decrypt(
          ls,
          import.meta.env.VITE_CRYPTO_JS_SECRET_KEY
        ).toString(CryptoJS.enc.Utf8)
      ) as ScoreData[];
    } catch (error) {
      window.alert("Failed to load your score data. It will be reset.");
      localStorage.setItem("score_data", "");
      return [] as ScoreData[];
    }
  return [] as ScoreData[];
}

export const scoreDataState = atom<ScoreData[]>({
  key: "scoreDataState",
  default: getInitValue(),
  effects: [
    ({ onSet }) => {
      onSet((newData) => {
        localStorage.setItem(
          "score_data",
          CryptoJS.AES.encrypt(
            JSON.stringify(newData),
            import.meta.env.VITE_CRYPTO_JS_SECRET_KEY
          ).toString()
        );
      });
    },
  ],
});
