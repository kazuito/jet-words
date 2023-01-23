import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { themeState } from "../../recoil/atoms/themeState";

const GroupContainer = styled.div`
  & + & {
    margin-top: 20px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const SettingsGroupTitle = styled.h3`
  font-size: 18px;
  font-size: 18px;
  font-weight: bold;
  color: ${(p) => p.theme.secondaryFg};
`;
const Group = (props: { title: string; icon: any; children: any }) => {
  const curTheme = useRecoilValue(themeState);
  return (
    <GroupContainer>
      <TitleWrapper>
        {React.cloneElement(props.icon, { size: "24px", color: curTheme.secondaryFg })}
        <SettingsGroupTitle>{props.title}</SettingsGroupTitle>
      </TitleWrapper>
      {props.children}
    </GroupContainer>
  );
};

export default Group;
