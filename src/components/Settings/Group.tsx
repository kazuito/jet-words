import React from "react";
import styled from "styled-components";

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
  color: #c7c7c7;
`;
const Group = (props: { title: string; icon: any; children: any }) => {
  return (
    <GroupContainer>
      <TitleWrapper>
        {React.cloneElement(props.icon, { size: "24px", color: "#c7c7c7" })}
        <SettingsGroupTitle>{props.title}</SettingsGroupTitle>
      </TitleWrapper>
      {props.children}
    </GroupContainer>
  );
};

export default Group;
