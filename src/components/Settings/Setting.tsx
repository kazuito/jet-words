import styled from "styled-components";

const SettingWrapper = styled.div`
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
      {props.children}
    </SettingWrapper>
  );
};

export default Setting;
