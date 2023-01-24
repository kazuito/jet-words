import styled from "styled-components";
import { IoSettingsSharp } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { themeState } from "../recoil/atoms/themeState";
import jetWordsLogoPath from "../assets/jetwords-logo-text.svg";

const HeaderContainer = styled.header`
  grid-row-start: 1;
  grid-column: 1 / -1;
  height: 80px;
  width: 100%;
  padding: 0 4vw;
  justify-self: center;
  display: flex;
  align-items: center;
`;
const HeaderR = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;
const JetWordsLogo = styled.img`
  width: 160px;
  height: auto;
`;

const Header = (props: {
  setSettingsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const curTheme = useRecoilValue(themeState);

  return (
    <HeaderContainer>
      <a href="/">
        <JetWordsLogo src={jetWordsLogoPath} alt="JetWords logo" />
      </a>
      <HeaderR>
        <IoSettingsSharp
          size={"24px"}
          color={curTheme.primaryFg}
          onClick={() => {
            props.setSettingsOpen((cur) => !cur);
          }}
        />
      </HeaderR>
    </HeaderContainer>
  );
};

export default Header;
