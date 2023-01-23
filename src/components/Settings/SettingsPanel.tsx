import styled, { keyframes } from "styled-components";
import Setting from "./Setting";
import InputRadio from "./InputRadio";
import InputSelect from "./InputSelect";
import { IoColorPalette, IoVolumeMedium } from "react-icons/io5";
import Group from "./Group";

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
  position: relative;
  grid-row: 2 / -1;
  grid-column: 7 / -1;
  padding: 24px;
  margin: 0 24px 24px 24px;
  border-radius: 16px;
  border: 3.6px solid ${p=>p.theme.borderColor};
  animation: ${PopAnimation} 0.3s forwards;
  animation-delay: 0.2s;
  opacity: 0;
  font-family: "Inter", sans-serif;
  background: ${(p) => p.theme.primaryBg};
`;

const SettingsPanel = () => {
  return (
    <SettingsSec>
      <Group title="Appearance" icon={<IoColorPalette />}>
        <Setting title="Color theme" description="">
          <InputSelect
            name="color_theme"
            options={[
              { text: "System Default", value: "system_default" },
              { text: "Dark", value: "dark" },
              { text: "Light", value: "light" },
            ]}
          ></InputSelect>
        </Setting>
      </Group>
      <Group title="Speech" icon={<IoVolumeMedium />}>
        <Setting
          title="Auto speech the answer"
          description="Speech the answer automatically"
        >
          <InputRadio text="on" name="auto_speech_answer" value="on" />
          <InputRadio text="off" name="auto_speech_answer" value="off" />
        </Setting>
      </Group>
    </SettingsSec>
  );
};

export default SettingsPanel;
