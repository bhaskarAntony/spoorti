import React from 'react';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';
import sporti_logo from "../../assets/images/sporti_logo.svg";

export const HeaderWrapper = styled.header`
  background: ${colors.white};
  width: 100%;
  padding: 20px 80px;
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderNavLogoHeadingWrapper = styled.h1`
  width: 125px;
  height: 41px;
`;

export const HeaderNavLogolinkWrapper = styled.a`
  width: 100%;
  height: 100%;
  text-indent: -99999em;
  float: left;
  background: url(${sporti_logo}) no-repeat 0 0 transparent;
  background-size: contain;
`;

export const HeaderLogoutLink = styled.a`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.24px;
  color: ${colors.darkBlue}
`;

export const HeaderSignIn = () => {
  const doLogout = () => {
    sessionStorage.removeItem('acces_token');
    sessionStorage.removeItem('at_expiry');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('rt_expiry');
  };

  return (
    <HeaderWrapper>
      <HeaderNavLogoHeadingWrapper>
        <HeaderNavLogolinkWrapper href='/admin/room' title='Sporti'>Sporti</HeaderNavLogolinkWrapper>
      </HeaderNavLogoHeadingWrapper>
      <HeaderLogoutLink href='/admin/login' title='Logout' onClick={() => doLogout()}>Logout</HeaderLogoutLink>
    </HeaderWrapper>
  );
};

HeaderSignIn.defaultProps = {};
