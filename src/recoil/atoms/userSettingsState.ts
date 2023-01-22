import { atom } from "recoil";
import { Settings } from "../../types";

export const userSettingsState = atom<Settings>({
  key: "userSettingsState",
  default: {
    auto_speech_answer: "on",
  },
  effects: [
    ({ onSet }) => {
      onSet((newUserSettings) => {
        localStorage.setItem("user_settings", JSON.stringify(newUserSettings));
      });
    },
  ],
});
