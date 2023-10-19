import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { colors, device, fonts } from '../../theme';
import { Text } from './Text';
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";

export const BannerBottomWrapper = styled.marquee`
  width: 100%;
  padding: 15px;
  background: ${(props) => colors[props.selectedTheme]?.banner.bg};

  .banner-bottom-text{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 5}px`};
    line-height: 151.02%;
    text-align: center;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.banner.fontColor};

    @media ${device.laptop} {
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    }
  }
`;

export const BannerBottom = ({ ...props }) => {
  const { selectedTheme, selectedFontSize, selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;

  return (
    <BannerBottomWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
      <Text className="banner-bottom-text" tag="p" text={language.banerScrollText} />
    </BannerBottomWrapper>
  );
};

BannerBottom.defaultProps = {};
