import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { userSettingsState } from "../recoil/atoms/userSettingsState";
import { Settings } from "../types";

const PopAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1)
  }
  50% {
    transform: scale(1.04);
  }
  80% {
    transform: scale(.98);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const SettingsSec = styled.div`
  grid-row: 2 / -1;
  grid-column: 7 / -1;
  padding: 18px 24px;
  margin: 0 24px 24px 24px;
  border-radius: 16px;
  border: 3.6px solid #333;
  animation: ${PopAnimation} 0.3s forwards;
  animation-delay: 0.2s;
  opacity: 0;
  font-family: "Inter", sans-serif;
  background: white;
`;
const H2 = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: gray;
`;

const Set = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 8px;
`;
const SettingTitle = styled.div`
  font-weight: bold;
`;
const SettingDescription = styled.div`
  margin-top: 2px;
  color: gray;
`;
const SettingInput = styled.div`
  width: 50%;
  display: flex;
  gap: 6px;
`;

// Radio Button
const InputRadioLabel = styled.label`
  flex-grow: 1;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  border: black solid 3.6px;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  align-self: start;
  transition: transform 0.1s;
  display: grid;
  place-content: center;

  &:active {
    transform: scale(0.96);
  }
  &:has(input:checked) {
    background: black;
    color: white;
    animation: ${PopAnimation} 0.3s;
  }
  &:has(input:focus-visible) {
    outline: 4px orange solid;
  }
  & input {
    width: 0;
    height: 0;
    opacity: 0;
  }
`;

const InputRadio = (props: { text: string; name: string; value: string }) => {
  const [userSettings, setUserSettings] = useRecoilState(userSettingsState);

  return (
    <InputRadioLabel>
      <input
        type="radio"
        name={props.name}
        defaultChecked={
          userSettings[props.name as keyof Settings] == props.value
        }
        onChange={(e) => {
          setUserSettings((cur) => {
            return { ...cur, [props.name]: props.value };
          });
        }}
      />
      {props.text}
    </InputRadioLabel>
  );
};

const SettingSummary = (props: { title: string; description: string }) => {
  return (
    <div>
      <SettingTitle>{props.title}</SettingTitle>
      <SettingDescription>{props.description}</SettingDescription>
    </div>
  );
};

const SettingsPanel = () => {
  return (
    <SettingsSec>
      <H2>Settings</H2>
      <Set>
        <SettingSummary
          title="Auto speech the answer"
          description="Speech the answer automatically"
        />
        <SettingInput>
          <InputRadio text="on" name="auto_speech_answer" value="on" />
          <InputRadio text="off" name="auto_speech_answer" value="off" />
        </SettingInput>
      </Set>
    </SettingsSec>
  );
};

export default SettingsPanel;
