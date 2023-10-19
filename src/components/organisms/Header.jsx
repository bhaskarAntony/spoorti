import React from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts } from '../../theme';
import { Icon, Text } from '../atoms';
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";

import { useDispatch, useSelector } from "react-redux";
import { selectFontSize, selectLanguage, selectTheme } from "../../redux/common/action";

export const HeaderWrapper = styled.header`
  background: ${(props) => colors[props.selectedTheme]?.banner.bg};
  width: 100%;
  padding: 0 15px;
  color: ${(props) => colors[props.selectedTheme]?.header.fontColor};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media ${device.laptop} {
    padding: 0 65px;
    flex-direction: row;
  }

  .header-link {
    align-items: center;
    display: flex;

    @media ${device.laptop} {
      margin-left: 55px;
    }

  }

  .header-link-text {
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
    line-height: 17px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.header.fontColor};
    margin-left: 18px;
  }

  .header-select{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 17px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.header.fontColor};
    background: transparent;
    border: 0;
    width: 100px;
    margin-right: 20px;
  }

  .header-download-btn{
    background: transparent;
    border: 2px solid ${(props) => colors[props.selectedTheme]?.header.fontColor};;
    border-radius: 38px;
    padding: 10px 25px;
    margin-right: 30px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
    line-height: 15px;
    text-align: center;
    letter-spacing: -0.24px;
    color: ${colors.white};
    text-transform: none;
  }

  .header-font-size-text{
    background: ${colors.black};
    padding: 10px 15px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 17px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.header.fontSize};
    cursor: pointer;
  }
`;

export const HeaderFontSizeWrapper = styled.div`
  display: flex;
  

  @media ${device.laptop} {
    margin-right: auto;
  }

  .header-font-text, .header-font-selected-text{
    padding: 10px 15px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 17px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.header.fontColor};
    cursor: pointer;
  }

  .header-font-selected-text{
    background: ${colors.white};
    color: ${(props) => colors[props.selectedTheme]?.header.bg};
  }
`;

export const Header = () => {
  const dispatch = useDispatch();
  const { selectedLanguage, selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;

  const changeLanguage = (langParam) => {
    localStorage.setItem('selected_language', langParam);
    dispatch(selectLanguage(langParam));
  };

  const changeTheme = (themeParam) => {
    localStorage.setItem('selected_theme', themeParam);
    dispatch(selectTheme(themeParam));
  };

  const changeFontSize = (fontSizeParam) => {
    let fontIndex = selectedFontSize
    if (fontSizeParam === 'decrease') {
      fontIndex--;
      fontIndex = fontIndex <= 0 ? 0 : fontIndex;
    } else {
      fontIndex++;
      fontIndex = fontIndex >= 4 ? 4 : fontIndex;
    }

    localStorage.setItem('selected_font_size', fontIndex);
    dispatch(selectFontSize(fontIndex));
  };

  return (
    <HeaderWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
      <select className='header-select' onChange={(e) => changeLanguage(e.target.value)}>
        <option selected={selectedLanguage === 'en_in' ? 'selected' : ''} value="en_in">English</option>
        <option selected={selectedLanguage === 'ka_in' ? 'selected' : ''} value="ka_in">Kannada</option>
      </select>

      <HeaderFontSizeWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Text className="header-font-size-text" tag="h4" text="A" action={() => changeTheme('dark')} />
        <Text className="header-font-selected-text" tag="h5" text="A" action={() => changeTheme('light')} />
        <Text className="header-font-text" tag="h5" text="A+" action={() => changeFontSize('increase')} />
        <Text className="header-font-text" tag="h5" text="A-" action={() => changeFontSize('decrease')} />
      </HeaderFontSizeWrapper>
      <a className="header-link" href={`tel:${language.contactMobile}`} title={language.contactMobile}>
        <Icon name="call" color={colors[selectedTheme]?.header.fontColor} />
        <Text className="header-link-text" tag="span" text={language.contactMobile} />
      </a>
      <a className="header-link" href={`mailto:${language.contactEmail}`} title={language.contactEmail}>
        <Icon name="mail" color={colors[selectedTheme]?.header.fontColor} />
        <Text className="header-link-text" tag="span" text={language.contactEmail} />
      </a>
    </HeaderWrapper>
  );
};

Header.defaultProps = {};
