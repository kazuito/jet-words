import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { scoreDataState } from "../../recoil/atoms/scoreDataState";
import { userSettingsState } from "../../recoil/atoms/userSettingsState";
import { getRandInt, speech } from "../../utils";
import ProblemTexts from "./ProblemText";
import { ScoreData } from "../../types";

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

// Problem Section
const ProblemSec = styled.div<{ shiftLeft: boolean }>`
  grid-column: ${(p) => (p.shiftLeft ? "1 / 7" : "2 / -2")};
  grid-row: 3 / 7;
  padding-left: 24px;
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

  &.pop {
    animation: ${PopAnimation} 0.3s;
  }
`;

// Input Section
const InputSec = styled.div<{ shiftLeft: boolean }>`
  display: grid;
  place-content: center center;
  grid-column: ${(p) => (p.shiftLeft ? "1/7" : "1/-1")};
  grid-row: 8 / 9;
  padding-left: 24px;
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

const Problem = (props: { allWords: string[][]; settingsOpen: boolean }) => {
  const [inputVal, setInputVal] = useState("");
  const [missCount, setMissCount] = useState(0);
  const [correctCharCount, setCorrectCharCount] = useState(0);
  const [wordObj, setWordObj] = useState(() => {
    let rnd = getRandInt(0, props.allWords.length);
    return {
      en: props.allWords[rnd][0],
      ja: props.allWords[rnd][1],
      number: rnd,
    };
  });
  const [answerText, setAnswerText] = useState("");
  const [userSettings, setUserSettings] = useRecoilState(userSettingsState);
  const ProblemBoxRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [scoreData, setScoreData] = useRecoilState(scoreDataState);
  const [curScoreDataIndex, setCurScoreDataIndex] = useState(0);

  useEffect(() => {}, []);

  useEffect(() => {
    problemPopAnimate();
  }, [props.settingsOpen]);

  useEffect(() => {
    newProblem();
  }, [props.allWords.length]);

  function problemPopAnimate() {
    ProblemBoxRef.current.classList.add("pop");
    setTimeout(() => {
      ProblemBoxRef.current.classList.remove("pop");
    }, 300);
  }

  function newProblem() {
    setMissCount(0);
    setCorrectCharCount(0);
    setWordObj((prev) => {
      let rnd = getRandInt(0, props.allWords.length);
      return {
        en: props.allWords[rnd][0],
        ja: props.allWords[rnd][1],
        number: rnd,
      };
    });
    problemPopAnimate();
  }
  return (
    <>
      <ProblemSec shiftLeft={props.settingsOpen}>
        <ProblemBox ref={ProblemBoxRef}>
          <ProblemTexts text={wordObj.ja} />
        </ProblemBox>
      </ProblemSec>
      <InputSec shiftLeft={props.settingsOpen}>
        <InputWrapper>
          {missCount > 0 && <AnswerText>{answerText}</AnswerText>}
          <InputBox
            value={inputVal}
            onInput={(e) => {
              let newVal = (e.target as HTMLInputElement).value;
              if (newVal == wordObj.en) {
                if (missCount < 2 && userSettings.auto_speech_answer == "on") {
                  speech(wordObj.en);
                }

                // Update Score Data
                let scoreData_tmp = JSON.parse(
                  JSON.stringify(scoreData)
                ) as ScoreData[];
                let index = scoreData_tmp.findIndex(
                  (elem) => elem.key == wordObj.en
                );
                if (index == -1) {
                  scoreData_tmp.push({
                    key: wordObj.en,
                    miss: missCount == 0 ? 0 : 1,
                    correct: missCount == 0 ? 1 : 0,
                  });
                } else {
                  if (missCount == 0) scoreData_tmp[index].correct++;
                  else scoreData_tmp[index].miss++;
                }

                // Sort Score Data
                scoreData_tmp.sort((a, b) => {
                  if (a.correct > 0 && b.correct > 0) {
                    let aRate = a.correct / (a.correct + a.miss);
                    let bRate = b.correct / (b.correct + b.miss);

                    if (aRate > bRate) {
                      return 1;
                    }
                  }
                  if (a.miss > b.miss || a.correct < b.correct) return -1;
                  return 1;
                });
                setScoreData(scoreData_tmp);

                newProblem();
                setInputVal("");
              } else if (wordObj.en.startsWith(newVal)) {
                setInputVal(newVal);
                setCorrectCharCount((cur) =>
                  cur < newVal.length ? newVal.length : cur
                );
              } else {
                setInputVal("");
                setAnswerText(() => {
                  if (missCount >= 1) return wordObj.en;
                  return wordObj.en.slice(0, correctCharCount + 1);
                });
                setMissCount((cur) => {
                  if (cur == 1 && userSettings.auto_speech_answer == "on") {
                    speech(wordObj.en);
                  }
                  return cur + 1;
                });
              }
            }}
          />
        </InputWrapper>
      </InputSec>
    </>
  );
};

export default Problem;
