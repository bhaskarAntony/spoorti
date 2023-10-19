import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts, size } from '../../theme';
// import { Button } from '../atoms';
import logo from "../../assets/images/logo.svg";
import logoDark from "../../assets/images/logoDark.svg";
import logoNew from "../../assets/images/smwaus_1.jpg";
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";

import { useSelector } from "react-redux";
import { Logo } from '../molecules';
import { Icon } from '../atoms';

export const HeaderNavWrapper = styled.nav`
  background: ${(props) => colors[props.selectedTheme]?.header.bg};
  box-shadow: 0px 4px 4px rgba(42, 56, 150, 0.08);
  padding: 15px;
  width: 100%;
  z-index: 9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .header-ham-menu-close{
    position: absolute;
    top: 20px;
    right: 20px;
    
  }

  [class*='Logo__LogoHeadingWrapper'] {
    width: 180px;
    height: 50px;
  }
  
  @media ${device.laptop} { 
    padding: 8px 55px;

    .header-ham-menu, .header-ham-menu-close{
      display: none;
    }

    [class*='Logo__LogoHeadingWrapper'] {
      width: 180px;
      height: 60px;
    }
  }
`;

export const HeaderNavListContWrapper = styled.ul`
  margin: 0;
  padding: 0;
  align-items: center;
  position: fixed;
  z-index: 9;
  background: ${(props) => colors[props.selectedTheme]?.header.bg};
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  padding: 20px;

  @media ${device.laptop} {
    display: flex;
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    background: transparent;

    [class*='Logo__LogoHeadingWrapper'] {
      display: none;
    }
  }

  [class*='Logo__LogoHeadingWrapper'] {
    margin: 30px 0;
    width: 180px;
      height: 60px;
  }
`;

export const HeaderNavListWrapper = styled.li`
  margin-right: 0;
  margin-bottom: 15px;

  @media ${device.laptop} {
    margin-right: ${(props) => props.selectedFontSize <= 2 ? '30px' : '20px'};
    margin-bottom: 0px;
  }

  &:last-child{
    margin-right: 0px;
  }

  .header-btn{
    background: transparent;
    border: 2px solid ${colors.white};
    border-radius: 38px;
    padding: 15px 35px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.24px;
    color: ${colors.white};
    text-transform: none;
    &:hover {
      background: ${colors.white};
      color: ${colors.darkBlue};
    }
  }
`;

export const HeaderNavListLinkWrapper = styled.a`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
  line-height: 19px;
  letter-spacing: -0.24px;
  color: ${(props) => colors[props.selectedTheme]?.header.fontColor};
  padding-bottom: 8px;
  border-bottom: solid 2px transparent;

  &.header-active-link, &:hover{
    border-bottom: solid 2px ${(props) => colors[props.selectedTheme]?.header.fontColor};
  }
`;

export const HeaderNav = () => {
  const { selectedLanguage, selectedFontSize, selectedTheme } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;
  const [openMenu, setOpenMenu] = useState(false);
  // const loginRedirection = () => {
  //   if (!sessionStorage.getItem('acces_token')) {
  //     window.location.href = "/admin/login";
  //   } else if (sessionStorage.getItem('acces_token')) {
  //     window.location.href = "/admin/room";
  //   }
  // };
  const menuList = selectedLanguage === 'en_in' ? languageEn.list : language_ka.list;

  const toggelMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <HeaderNavWrapper selectedTheme={selectedTheme}>
      <Logo logoImage={logoNew} titleText={language.headerLogotext} />
      <Icon action={toggelMenu} name="hamBurgerMenu" color={colors.white} className="header-ham-menu" />
      {(window.outerWidth >= parseInt(size.laptop.replace('px', '')) || openMenu) && <HeaderNavListContWrapper selectedTheme={selectedTheme}>
        <Logo logoImage={logoNew} titleText={language.headerLogotext} />
        <Icon action={toggelMenu} name="close" color={colors.white} className="header-ham-menu-close" />
        {menuList.map((item, index) => {
          const activeClassName = (window.location.pathname.indexOf(item.originalLabel.toLowerCase()) > -1 ||
            (item.originalLabel.toLowerCase() === "home" && window.location.pathname === "/")
            || (item.originalLabel.toLowerCase() === "about us" && window.location.pathname === "/about_us")) ? 'header-active-link' : '';

          return (<HeaderNavListWrapper key={index} selectedFontSize={selectedFontSize}>
            <HeaderNavListLinkWrapper selectedFontSize={selectedFontSize} className={activeClassName} href={item.redirect} title={item.label} selectedTheme={selectedTheme}>
              {item.label}
            </HeaderNavListLinkWrapper>
          </HeaderNavListWrapper>)
        }
        )}
        {/* <HeaderNavListWrapper>
          <Button text={selectedLanguage === 'en_in' ? languageEn.adminLoginLabel : language_ka.adminLoginLabel} action={loginRedirection} className="header-btn" />
        </HeaderNavListWrapper> */}
      </HeaderNavListContWrapper>}
    </HeaderNavWrapper>
  );
};

HeaderNav.defaultProps = {};
