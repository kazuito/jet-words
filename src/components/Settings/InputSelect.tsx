import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { userSettingsState } from "../../recoil/atoms/userSettingsState";
import { Settings } from "../../types";

const SelectBox = styled.div`
  cursor: pointer;
  font-size: 16px;
  flex-grow: 1;
  position: relative;
`;
const Current = styled.div`
  border-radius: 6px;
  font-weight: bold;
  border: black solid 3.6px;
  padding: 8px 16px;
  width: 100%;
  display: grid;
  place-content: center;
`;
const OptionBox = styled.div`
  position: absolute;
  background: white;
  width: 100%;
  opacity: 0;
  display: none;

  [open] & {
    opacity: 1;
    display: block;
  }
`;
const Option = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  width: 100%;
  display: grid;
  place-content: center;
  cursor: pointer;
  font-weight: bold;

  background: ${(p) => (p.selected ? "#000" : "#f7f7f7")};
  color: ${(p) => (p.selected ? "#fff" : "#000")};

  &:first-child {
    border-radius: 6px 6px 0 0;
  }
  &:last-child {
    border-radius: 0 0 6px 6px;
  }

  &:hover {
    background: ${(p) => !p.selected && "#d5d5d5"};
  }
  &:focus-visible {
    box-shadow: inset 0 0 0 3.6px orange;
  }
`;

const InputSelect = (props: {
  name: string;
  options: Array<{ text: string; value: string }>;
}) => {
  const [userSettings, setUserSettings] = useRecoilState(userSettingsState);
  const [selected, setSelected] = useState({
    text:
      props.options.find(
        (opt) => opt.value == userSettings[props.name as keyof Settings]
      )?.text || "Unknown",
    value: userSettings[props.name as keyof Settings],
  });
  const selectBoxRef = useRef()  as React.MutableRefObject<HTMLInputElement>;

  return (
    <SelectBox ref={selectBoxRef} className="select-box">
      <Current
        onClick={(e) => {
          (e.target as HTMLElement).parentElement?.toggleAttribute("open");
        }}
      >
        {selected.text}
      </Current>

      <OptionBox className="menu">
        {props.options.map((opt, i) => {
          return (
            <Option
              tabIndex={0}
              key={i}
              selected={opt.value == selected.value}
              onClick={() => {
                selectBoxRef.current?.removeAttribute("open");
                setUserSettings((cur) => {
                  setSelected({
                    text: opt.text,
                    value: opt.value,
                  });
                  return { ...cur, [props.name]: opt.value };
                });
              }}
            >
              {opt.text}
            </Option>
          );
        })}
      </OptionBox>
    </SelectBox>
  );
};

export default InputSelect;
