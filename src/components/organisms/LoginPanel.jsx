import React, { useState } from 'react';
import styled from 'styled-components/macro';
import Swal from 'sweetalert2';
import { colors, fonts } from '../../theme';
import { Button, Icon, Input, Text } from '../atoms';
import { postService } from '../../service.js';
import { apiList } from '../../util/apiList';

export const LoginPanelContWrapper = styled.div`
  margin-left: auto;
  margin-right: 120px;
  .login-heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: ${colors.black};
    margin-bottom: 70px;
  }
  .login-submit-btn{
    width: 100%;
    text-transform: none;
    min-width: 400px;
    border-radius: 8px;
  }
`;

export const LoginPanelListContWrapper = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const LoginPanelListWrapper = styled.li`
  margin-bottom: 30px;
  position: relative;

  .login-label{
    font-family: ${fonts.default};
    font-style: normal;
    font-size: 16px;
    line-height: 20px;
    color: ${colors.black};
    margin-bottom: 5px;
    font-style: normal;
  }

  .login-input{
    min-width: 400px;
    background: ${colors.white};
    border: 1px solid ${colors.black};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
    color: ${colors.darkGray};
  }

  .password-eye-icon{
    position: absolute;
    right: 15px;
    top: 38px;
    cursor: pointer;
  }
`;

export const LoginPanelLinkWrapper = styled.a`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: ${colors.black};
  float:right;
  margin-bottom: 10px;
`;

export const LoginPanel = () => {
  const [userId, setUserId] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const loginSubmit = async() => {
    if (userId && userPassword) {
      const requestParam = {
        "mobile": userId,
        "password": userPassword
      };
      const login = await postService(apiList.adminLogin, requestParam);
      
      if (login[0].acces_token) {
        sessionStorage.setItem('acces_token', login[0].acces_token);
        sessionStorage.setItem('at_expiry', login[0].at_expiry);
        sessionStorage.setItem('refresh_token', login[0].refresh_token);
        sessionStorage.setItem('rt_expiry', login[0].rt_expiry);
        window.location.href = '/admin/room';
        setUserId('');
        setUserPassword('');
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, Please enter the details!',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };
  const updateType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <LoginPanelContWrapper>
      {/* <form action='/room'> */}
        <Text className="login-heading" tag="h1" text="Admin Login" />
        <LoginPanelListContWrapper>
          <LoginPanelListWrapper>
            <Text className="login-label" tag="label" text="Mobile Number" />
            <Input className="login-input" 
              value={userId}
              minLength="10" maxLength="10" 
              borderRadius="8px" color={colors.cyan} 
              bg={colors.white} type="text" 
              placeholder="Type your mobile number" 
              action={(e) => setUserId(e.target.value)}
            />
          </LoginPanelListWrapper>
          <LoginPanelListWrapper>
            <Text className="login-label" tag="label" text="Password" />
            <Input className="login-input" 
              value={userPassword}
              minLength="8" maxLength="24" 
              borderRadius="8px" color={colors.cyan} 
              bg={colors.white} type={passwordType} 
              placeholder="Type your password" 
              action={(e) => setUserPassword(e.target.value)}
            />
            <div onClick={()=> updateType()} >
              <Icon className="password-eye-icon" name={passwordType === 'password' ? 'eyeStrike' : 'eye'} color={colors.black} />
            </div>
          </LoginPanelListWrapper>
          <LoginPanelListWrapper>
            {/* <LoginPanelLinkWrapper href="#">
              Forgot password
            </LoginPanelLinkWrapper> */}
          </LoginPanelListWrapper>
          <Button className="login-submit-btn" action={loginSubmit} type="submit" text="Login" bg={colors.mostlyBlackBlue} />
        </LoginPanelListContWrapper>
      {/* </form> */}
    </LoginPanelContWrapper>
  );
};

LoginPanel.defaultProps = {};
