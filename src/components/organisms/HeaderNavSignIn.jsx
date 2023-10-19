import React from 'react';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';
import menu from "../../data/menu.json";

export const HeaderNavSignInWrapper = styled.nav`
  background: ${colors.darkBlue};
  box-shadow: 21px 14px 23px rgba(42, 56, 150, 0.3);
  padding: 25px 80px;
`;

export const HeaderNavSignInMenuWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
`;

export const HeaderNavSignInMenuListWrapper = styled.li`
  margin-right: 100px;

  &:last-child{
    margin-right: 0px;
  }
`;

export const HeaderNavSignInMenuLinkWrapper = styled.a`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.24px;
  color: ${colors.white};

  &.header-signin-active-link, &:hover{
    color: ${colors.vividOrange};
    font-weight: 900;
  }
`;

export const HeaderNavSignIn = () => {
  return (
    <HeaderNavSignInWrapper>
      <HeaderNavSignInMenuWrapper>
      {menu.listAfterSignIn.map((item, index) => {
        const activeClassName = window.location.pathname.indexOf(item.label.replace(' ', '_').toLowerCase()) > -1 ? 'header-signin-active-link' : '';
        return (
          <HeaderNavSignInMenuListWrapper key={index}>
            <HeaderNavSignInMenuLinkWrapper className={activeClassName} href={item.redirect} title={item.label}>
              {item.label}
            </HeaderNavSignInMenuLinkWrapper>
          </HeaderNavSignInMenuListWrapper>
        )}
      )}
      </HeaderNavSignInMenuWrapper>
    </HeaderNavSignInWrapper>
  );
};

HeaderNavSignIn.defaultProps = {};
