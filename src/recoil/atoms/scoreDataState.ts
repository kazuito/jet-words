import { ScoreData } from "./../../types.d";
import { atom } from "recoil";
import { decryptGetLS, encryptSetLS } from "../../utils";

function getInitValue() {
  let [status, item] = decryptGetLS("score_data");
  switch (status) {
    case 1:
      return item;
    case 0:
      return [];
    case -1: {
      window.alert("Failed to load your score data. It will be reset.");
      localStorage.setItem("score_data", "");
      return [];
    }
  }
}

export const scoreDataState = atom<ScoreData[]>({
  key: "scoreDataState",
  default: getInitValue(),
  effects: [
    ({ onSet }) => {
      onSet((newData) => {
        encryptSetLS("score_data", newData);
      });
    },
  ],
});
