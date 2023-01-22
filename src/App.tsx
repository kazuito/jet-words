import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { getRandInt, speech } from "./utils";
import { IoSettingsSharp } from "react-icons/io5";

import getWords from "./word-db";
import jetWordsLogoPath from "./assets/jetwords-logo-text.svg";

import ProblemTexts from "./ProblemText";
import SettingsPanel from "./components/SettingsPanel";
import { useRecoilState } from "recoil";
import { userSettingsState } from "./recoil/atoms/userSettingsState";

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
  /* background: gold; */
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

  @media screen and (max-width: 1200px) {
    /* grid-column: 2 / 12; */
  }
`;
const ProblemBox = styled.div`
  padding: 34px 60px;
  border: 3.6px #333333 solid;
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
    background-color: #cfcfcf;
    margin-top: 0;
    border-radius: 2px;
  }
  &:has(input:focus)::after {
    background-color: #333;
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
  color: #333333;
`;
const AnswerText = styled(InputCommon)`
  margin-bottom: -44px;
  color: #c8c8c8;
  white-space: nowrap;
  overflow: visible;
`;

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
    <AppFrame>
      <Header>
        <a href="/">
          <JetWordsLogo src={jetWordsLogoPath} alt="JetWords logo" />
        </a>
        <HeaderR>
          <IoSettingsSharp
            size={"24px"}
            style={{ padding: "4px", boxSizing: "initial" }}
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
                if (missCount == 0 && userSettings.auto_speech_answer == "on") {
                  speech(wordObj.en);
                }
                newProblem();
                setInputVal("");
              } else if (wordObj.en.startsWith(newVal)) {
                setInputVal(newVal);
              } else {
                setInputVal("");
                setMissCount((cur) => {
                  if (cur == 0  && userSettings.auto_speech_answer == "on") {
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
  );
}

export default App;
