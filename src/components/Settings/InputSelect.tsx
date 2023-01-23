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
  border: ${(p) => p.theme.borderColor} solid 3.6px;
  color: ${(p) => p.theme.primaryFg};
  padding: 8px 16px;
  width: 100%;
  display: grid;
  place-content: center;
`;
const OptionBox = styled.div`
  position: absolute;
  width: 100%;
  opacity: 0;
  display: none;
  background: ${(p) => p.theme.listBg};
  padding: 4px 8px;
  border-radius: 6px;
  box-sizing: initial;
  margin-left: -8px;

  [open] & {
    opacity: 1;
    display: block;
  }
`;
const Option = styled.div<{ selected: boolean }>`
  padding: 6px 16px;
  margin: 4px 0;
  display: grid;
  place-content: center;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  background: ${(p) =>
    p.selected ? p.theme.listSelectedItemBg : "transparent"};
  color: ${(p) => (p.selected ? p.theme.listSelectedItemFg : p.theme.listFg)};

  &:hover {
    background: ${(p) => !p.selected && p.theme.listHoverItemBg};
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
  const selectBoxRef = useRef() as React.MutableRefObject<HTMLInputElement>;

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
