import styled from "styled-components";

const SettingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  gap: 8px;
`;
const SettingTitle = styled.div`
  font-weight: bold;
  color: ${(p) => p.theme.primaryFg};
`;
const SettingDescription = styled.div`
  margin-top: 2px;
  color: ${(p) => p.theme.secondaryFg};
`;

const SettingInput = styled.div`
  width: 50%;
  display: flex;
  gap: 6px;
  background: ${(p) => p.theme.listBg};
  margin-top: -8px;
  padding: 8px;
  border-radius: 6px;
  align-self: start;
`;

const Setting = (props: {
  title: string;
  description: string;
  children: any;
}) => {
  return (
    <SettingWrapper>
      <div>
        <SettingTitle>{props.title}</SettingTitle>
        <SettingDescription>{props.description}</SettingDescription>
      </div>
      <SettingInput>{props.children}</SettingInput>
    </SettingWrapper>
  );
};

export default Setting;
