import { useEffect, useState } from "react";
import styled, { keyframes, ThemeProvider } from "styled-components";
import { getRandInt, isDarkMode, speech } from "./utils";
import { IoSettingsSharp } from "react-icons/io5";
import getWords from "./word-db";
import jetWordsLogoPath from "./assets/jetwords-logo-text.svg";
import ProblemTexts from "./ProblemText";
import SettingsPanel from "./components/Settings/SettingsPanel";
import { useRecoilState } from "recoil";
import { userSettingsState } from "./recoil/atoms/userSettingsState";
import { lightTheme, darkTheme } from "./components/Themes";
import { themeState } from "./recoil/atoms/themeState";
import { ThemeType } from "./types";

const PopAnimation = keyframes`
  0% {
    transform: scale(1)
  }
  50% {
    transform: scale(1.1)
  }
  80% {
    transform: scale(.98)
  }
  100% {
    transform: scale(1)
  }
`;

const AppFrame = styled.div`
  height: 100vh;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);

  background-color: ${(p) => p.theme.primaryBg};
`;

// Header
const Header = styled.header`
  grid-row-start: 1;
  grid-column: 1 / -1;
  height: 80px;
  width: 100%;
  padding: 0 4vw;
  justify-self: center;
  display: flex;
  align-items: center;
`;
const HeaderR = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
const JetWordsLogo = styled.img`
  width: 160px;
  height: auto;
`;

// Problem Section
const ProblemSec = styled.div<{ settingsOpen: boolean }>`
  grid-column: ${(p) => (p.settingsOpen ? "2 / 6" : "2 / -2")};
  grid-row: 3 / 7;
  display: grid;
  place-content: center center;
`;
const ProblemBox = styled.div`
  padding: 34px 60px;
  border: 3.6px ${(p) => p.theme.borderColor} solid;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  &.animate {
    animation: 0.3s ${PopAnimation};
  }
`;

// Input Section
const InputSec = styled.div<{ settingsOpen: boolean }>`
  display: grid;
  place-content: center center;
  grid-column: ${(p) => (p.settingsOpen ? "1/7" : "1/-1")};
  grid-row: 8 / 9;
  position: relative;
  transition: 0.3s;
  transition: 1s;
`;
const InputWrapper = styled.div`
  width: 220px;
  display: grid;
  place-content: center center;

  &::after {
    transition: 0.3s;
    content: "";
    display: block;
    width: 100%;
    height: 3.6px;
    background-color: ${(p) => p.theme.borderColor};
    margin-top: 0;
    border-radius: 2px;
    opacity: 0.5;
  }
  &:has(input:focus)::after {
    opacity: 1;
  }
`;
const InputCommon = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 4px 16px;
  background: transparent;
  width: 100%;
  transition: 0.2s;
  letter-spacing: -0.5px;
`;
const InputBox = styled(InputCommon.withComponent("input"))`
  color: ${(p) => p.theme.primaryFg};
`;
const AnswerText = styled(InputCommon)`
  margin-bottom: -44px;
  color: ${(p) => p.theme.secondaryFg};
  white-space: nowrap;
  overflow: visible;
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
  const [words, setWords] = useState([["Loading...", "Loading..."]]);
  const [inputVal, setInputVal] = useState("");
  const [wordObj, setWordObj] = useState(() => {
    let rnd = getRandInt(0, words.length);
    return {
      en: words[rnd][0],
      ja: words[rnd][1],
      number: rnd,
    };
  });
  const [missCount, setMissCount] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [userSettings, setUserSettings] = useRecoilState(userSettingsState);
  const [curTheme, setCurTheme] = useRecoilState(themeState);

  useEffect(() => {
    setCurTheme(getTheme(userSettings.color_theme));
  }, [userSettings.color_theme]);

  useEffect(() => {
    let user_settings_str = localStorage.getItem("user_settings");
    if (user_settings_str != null) {
      setUserSettings((cur) => {
        return { ...cur, ...JSON.parse(user_settings_str!) };
      });
    }

    getWords().then((w) => {
      setWords(JSON.parse(w).words);
    });
  }, []);

  useEffect(() => {
    newProblem();
  }, [words.length]);

  function newProblem() {
    setMissCount(0);
    setWordObj((prev) => {
      let rnd = getRandInt(0, words.length);
      return {
        en: words[rnd][0],
        ja: words[rnd][1],
        number: rnd,
      };
    });
    ProblemPopAnimate();
  }

  function ProblemPopAnimate() {
    setShouldAnimate(true);
    setTimeout(() => {
      setShouldAnimate(false);
    }, 400);
  }

  return (
    <ThemeProvider theme={curTheme}>
      <AppFrame
        onClick={(e) => {
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
        }}
      >
        <Header>
          <a href="/">
            <JetWordsLogo src={jetWordsLogoPath} alt="JetWords logo" />
          </a>
          <HeaderR>
            <IoSettingsSharp
              size={"24px"}
              color={curTheme.primaryFg}
              onClick={() => {
                setSettingsOpen((cur) => !cur);
                ProblemPopAnimate();
              }}
            />
          </HeaderR>
        </Header>
        <ProblemSec settingsOpen={settingsOpen}>
          <ProblemBox className={shouldAnimate ? "animate" : ""}>
            <ProblemTexts text={wordObj.ja} />
          </ProblemBox>
        </ProblemSec>
        <InputSec settingsOpen={settingsOpen}>
          <InputWrapper>
            {missCount > 0 && <AnswerText>{wordObj.en}</AnswerText>}
            <InputBox
              value={inputVal}
              onInput={(e) => {
                let newVal = (e.target as HTMLInputElement).value;
                if (newVal == wordObj.en) {
                  if (
                    missCount == 0 &&
                    userSettings.auto_speech_answer == "on"
                  ) {
                    speech(wordObj.en);
                  }
                  newProblem();
                  setInputVal("");
                } else if (wordObj.en.startsWith(newVal)) {
                  setInputVal(newVal);
                } else {
                  setInputVal("");
                  setMissCount((cur) => {
                    if (cur == 0 && userSettings.auto_speech_answer == "on") {
                      speech(wordObj.en);
                    }
                    return cur + 1;
                  });
                }
              }}
            />
          </InputWrapper>
        </InputSec>
        {settingsOpen && <SettingsPanel />}
      </AppFrame>
    </ThemeProvider>
  );
}

export default App;
