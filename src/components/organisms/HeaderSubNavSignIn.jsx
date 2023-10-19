import React from 'react';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';
import menu from "../../data/menu.json";
import { useSelector } from "react-redux";

export const HeaderNavSignInWrapper = styled.section`
  // background: rgba(42, 56, 150, 0.03);
  bakground: transparent;
  padding: 25px 80px;
  border-left: solid 30px ${colors.white};
  border-right: solid 30px ${colors.white};
`;

export const HeaderNavSignInMenuWrapper = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
`;

export const HeaderNavSignInMenuListWrapper = styled.li`
  margin-right: 35px;

  &:last-child{
    margin-right: 0px;
  }
`;

export const HeaderNavSignInMenuLinkWrapper = styled.a`
  color: ${colors.white};
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  color: ${colors.black};
  cursor: pointer;
  &.sub-nav-active{
    color: ${colors.darkBlue};
  }
`;

export const HeaderSubNavSignIn = ({...props}) => {
  const { selectedSubNav } = useSelector(({ common }) => ({ ...common }));
  let subMenu = [];
  menu.listAfterSignIn.map(function(item){
    if (window.location.pathname.indexOf(item.label.replace(' ', '_').toLowerCase()) > -1) {
      subMenu = item.submenu;
    }
    return subMenu;
  });
  const subNavActive = selectedSubNav;

  return (
    <HeaderNavSignInWrapper>
      <HeaderNavSignInMenuWrapper>
      {subMenu.map((item, index) => {
        return (
          <HeaderNavSignInMenuListWrapper key={index}>
            {!item.disable && <HeaderNavSignInMenuLinkWrapper 
              className={index === subNavActive ? 'sub-nav-active' : ''} 
              href={item.redirect} 
              title={item.label} 
              onClick={() => props.action(index)}
            >
              {item.label}
            </HeaderNavSignInMenuLinkWrapper>}
          </HeaderNavSignInMenuListWrapper>
        )}
      )}
      </HeaderNavSignInMenuWrapper>
    </HeaderNavSignInWrapper>
  );
};

HeaderSubNavSignIn.defaultProps = {};
