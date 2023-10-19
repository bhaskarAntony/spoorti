import React from 'react';
import styled from 'styled-components/macro';
import { colors, device } from '../../theme';
import { Logo } from '../molecules';
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";
import headerInfoLogo from "../../assets/images/header_info_logo.svg";
import headerInfoLogoDark from "../../assets/images/header_info_logo_dark.svg";
// import userImage1 from "../../assets/images/user_image_1.png";
// import userImage2 from "../../assets/images/user_image_2.png";

import { useSelector } from "react-redux";

export const HeaderInfoWrapper = styled.header`
  background: ${(props) => colors[props.selectedTheme]?.header.contentBG};
  width: 100%;
  padding: 15px 65px;
  color: ${(props) => colors[props.selectedTheme]?.header.contentFontColor};
  display: flex;
  align-items: center;
  justify-content: center;

  .header-info-left{
    margin-right: auto;
    display: none;

    @media ${device.laptop} {
      display: flex;
    }
  }

  .header-info-right{
    margin-left: auto;
    display: none;

    @media ${device.laptop} {
      display: flex;
    }
  }
`;

export const HeaderInfo = () => {
  const { selectedLanguage, selectedTheme } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;

  return (
    <HeaderInfoWrapper selectedTheme={selectedTheme}>
      {/* <UserInfo className="header-info-left" userImage={userImage1} userName="SRI BASAVARAJ BOMMAI" userDesignation="Hon’ble Chief Minister | Govt. of Karnataka" /> */}
      <Logo logoImage={selectedTheme === 'dark' ? headerInfoLogoDark : headerInfoLogo} titleText={language.headerLogotext}/>
      {/* <UserInfo className="header-info-right" userImage={userImage2} userName="Sri Araga Jnanendra" userDesignation="Hon’ble Minister for Home Government of Karnataka" /> */}
    </HeaderInfoWrapper>
  );
};

HeaderInfo.defaultProps = {};
