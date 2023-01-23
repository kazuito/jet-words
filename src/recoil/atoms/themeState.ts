import { atom } from "recoil";
import { lightTheme } from "../../components/Themes";
import { ThemeType } from "../../types";

export const themeState = atom<ThemeType>({
  key: "themeState",
  default: lightTheme,
});
