import * as React from 'react';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';
import { useSelector } from "react-redux";

export const LogoHeadingWrapper = styled.h1`
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .logoText {
    font-family: ${fonts.default};
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 13}px`};
  color: ${(props) => colors[props.selectedTheme]?.header.fontColor};
  line-height: 19px;
  letter-spacing: -0.24px;
  margin: 0;
  padding: 0;
  }
`;

export const LogolinkWrapper = styled.a`
  width: 100%;
  height: 100%;
  text-indent: -99999em;
  float: left;
  font-family: ${fonts.default};
  background: url(${(props) => props.logoImage}) no-repeat 0 0 transparent;
  background-size: contain;

`;

export const Logo = ({ ...props }) => {

  const { selectedLanguage, selectedFontSize, selectedTheme } = useSelector(({ common }) => ({ ...common }));

  return (
    <>
      <LogoHeadingWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <LogolinkWrapper logoImage={props.logoImage} href='/' title={props.titleText}></LogolinkWrapper>
        <a href='/' title={props.titleText} className='logoText'>SPORTI</a>
      </LogoHeadingWrapper>
    </>
  );
};

Logo.defaultProps = {};
