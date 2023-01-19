import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ProblemTexts from "./ProblemText";
import { getRandInt } from "./utils";
import getWords from "./word-db";

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

// Problem Section
const ProblemSec = styled.div`
  grid-column: 4 / 10;
  grid-row: 3 / 7;
  display: grid;
  place-content: center center;

  @media screen and (max-width: 1200px) {
    grid-column: 2 / 12;
  }
`;
const ProblemBox = styled.div`
  padding: 34px 60px;
  border: 3.6px #333333 solid;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition: 1s;

  &.animate {
    animation: 0.3s ${PopAnimation};
  }
`;

// Input Section
const InputSec = styled.div`
  display: grid;
  place-content: center center;
  grid-column: 6 / 8;
  grid-row: 8 / 9;
  position: relative;
  transition: 0.3s;
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

  useEffect(() => {
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
    setShouldAnimate(true);

    setTimeout(() => {
      setShouldAnimate(false);
    }, 400);
  }
  return (
    <AppFrame>
      <ProblemSec>
        <ProblemBox className={shouldAnimate ? "animate" : ""}>
          <ProblemTexts text={wordObj.ja} />
        </ProblemBox>
      </ProblemSec>
      <InputSec>
        <InputWrapper>
          {missCount > 0 && <AnswerText>{wordObj.en}</AnswerText>}
          <InputBox
            value={inputVal}
            onInput={(e) => {
              let newVal = (e.target as HTMLInputElement).value;
              if (newVal == wordObj.en) {
                newProblem();
                setInputVal("");
              } else if (wordObj.en.startsWith(newVal)) {
                setInputVal(newVal);
              } else {
                setInputVal("");
                setMissCount((cur) => cur + 1);
              }
            }}
          />
        </InputWrapper>
      </InputSec>
    </AppFrame>
  );
}

export default App;
