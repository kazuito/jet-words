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
const NavIcon = styled.button`
  border: none;
  padding: 0;
  display: grid;
  place-content: center;
  background: transparent;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  transition: 0.1s;
  padding: 8px;

  &:hover {
    background: ${(p) => p.theme.secondaryBg};
  }
  &:active svg {
    transform: scale(0.9);
  }
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
        <NavIcon
          onClick={() => {
            props.setSettingsOpen((cur) => !cur);
          }}
        >
          <IoSettingsSharp size={"24px"} color={curTheme.primaryFg} />
        </NavIcon>
      </HeaderR>
    </HeaderContainer>
  );
};

export default Header;
