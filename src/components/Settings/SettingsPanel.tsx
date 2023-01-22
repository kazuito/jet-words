import styled, { keyframes } from "styled-components";
import Setting from "./Setting";
import InputRadio from "./InputRadio";

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
const SettingsGroupTitle = styled.h3`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: gray;
`;

const SettingInput = styled.div`
  width: 50%;
  display: flex;
  gap: 6px;
`;

const SettingsPanel = () => {
  return (
    <SettingsSec>
      <H2>Settings</H2>
      <SettingsGroupTitle>Speech</SettingsGroupTitle>
      <Setting
        title="Auto speech the answer"
        description="Speech the answer automatically"
      >
        <SettingInput>
          <InputRadio text="on" name="auto_speech_answer" value="on" />
          <InputRadio text="off" name="auto_speech_answer" value="off" />
        </SettingInput>
      </Setting>
    </SettingsSec>
  );
};

export default SettingsPanel;
