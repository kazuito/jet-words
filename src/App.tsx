import { useEffect, useState } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { getRandInt, isDarkMode, speech } from "./utils";
import { IoSettingsSharp } from "react-icons/io5";
import getWords from "./word-db";
import jetWordsLogoPath from "./assets/jetwords-logo-text.svg";
import ProblemTexts from "./components/Problem/ProblemText";
import SettingsPanel from "./components/Settings/SettingsPanel";
import { useRecoilState } from "recoil";
import { userSettingsState } from "./recoil/atoms/userSettingsState";
import { lightTheme, darkTheme } from "./components/Themes";
import { themeState } from "./recoil/atoms/themeState";
import { ThemeType } from "./types";
import Header from "./components/Header";
import Problem from "./components/Problem";

const AppFrame = styled.div`
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  background-color: ${(p) => p.theme.primaryBg};
`;

/**
 * Get Theme object by a theme name
 * @param themeName name of the theme
 * @returns Theme object
 */
function getTheme(themeName: string): ThemeType {
  switch (themeName) {
    case "light":
      return lightTheme;
    case "dark":
      return darkTheme;
    case "system_default":
      return isDarkMode() ? darkTheme : lightTheme;
    default:
      return lightTheme;
  }
}

function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userSettings, setUserSettings] = useRecoilState(userSettingsState);
  const [allWords, setAllWords] = useState([["Loading...","Loading..."]]);
  const [curTheme, setCurTheme] = useRecoilState(themeState);

  useEffect(() => {
    let user_settings_str = localStorage.getItem("user_settings");
    if (user_settings_str != null) {
      setUserSettings((cur) => {
        return { ...cur, ...JSON.parse(user_settings_str!) };
      });
    }

    getWords().then((w) => {
      setAllWords(JSON.parse(w).words);
    });
  }, []);

  useEffect(() => {
    setCurTheme(getTheme(userSettings.color_theme));
  }, [userSettings.color_theme]);

  function onClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let el = e.target as HTMLElement;
    let closeDetails = true;
    while (el.parentElement != null) {
      if (el.matches(".select-box[open]")) {
        closeDetails = false;
        break;
      }
      el = el.parentElement;
    }

    if (closeDetails)
      document.querySelectorAll(".select-box[open]")?.forEach((elem) => {
        elem.querySelector(".menu")?.classList.add("fade-out");
        setTimeout(() => {
          elem.removeAttribute("open");
          elem.querySelector(".menu")?.classList.remove("fade-out");
        }, 200);
      });
  }

  return (
    <ThemeProvider theme={curTheme}>
      <AppFrame onClick={(e) => onClickHandler(e)}>
        <Header setSettingsOpen={setSettingsOpen} />
        <Problem allWords={allWords} settingsOpen={settingsOpen} />
        {settingsOpen && <SettingsPanel />}
      </AppFrame>
    </ThemeProvider>
  );
}

export default App;
