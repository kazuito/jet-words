import styled, { keyframes } from "styled-components";
import { useRecoilState } from "recoil";
import { userSettingsState } from "../../recoil/atoms/userSettingsState";
import { Settings } from "../../types";

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

export default InputRadio;
