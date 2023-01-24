import { ThemeType } from "../types";

const lightTheme: ThemeType = {
  primaryFg: "#000000",
  secondaryFg: "#c7c7c7",
  primaryBg: "#fff",
  secondaryBg: "#f8f7f7",
  borderColor: "#000",
  listSelectedItemBg: "#000000",
  listSelectedItemFg: "#ffffff",
  listHoverItemBg: "#f9f9f9",
  listHoverItemFg: "#fff",
  listBg: "#f5f5f5",
  listFg: "#323232",
};

const darkTheme: ThemeType = {
  primaryFg: "#aeaeae",
  secondaryFg: "#444444",
  primaryBg: "#171717",
  secondaryBg: "#262626",
  borderColor: "#363636",
  listSelectedItemBg: "#121212",
  listSelectedItemFg: "#aeaeae",
  listHoverItemBg: "#313131",
  listHoverItemFg: "#fff",
  listBg: "#232323",
  listFg: "#8f8f8f",
};

export { lightTheme, darkTheme };
