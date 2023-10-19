import React from 'react';
import styled from 'styled-components/macro';
import { LoginPanel } from '../components/organisms';
import { colors, fonts } from '../theme';
import loginBGImage from "../assets/images/login_image.svg";

export const LoginWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

export const LoginLeftWrapper = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  background: ${colors.white};
  align-items: center;
`;

export const LoginRightWrapper = styled.div`
  display: flex;
  width: 50%;
  height: 100%;
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 800;
  font-size: 80px;
  line-height: 100px;
  color: ${colors.white};
  align-items: center;
  justify-content: center;
  padding-left: 150px;
  background: url(${loginBGImage}) transparent;
`;

export const Login = (props) => {
  return <LoginWrapper>
      <LoginLeftWrapper>
        <LoginPanel />
      </LoginLeftWrapper>
      <LoginRightWrapper></LoginRightWrapper>
    </LoginWrapper>;
};

export default Login;
