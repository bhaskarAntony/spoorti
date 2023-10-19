import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { colors, device, fonts } from '../../theme';
import { Image, Text } from '../atoms';

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserInfoImageWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;

  .user-info-image{
    object-fit: cover;
  }
`;

export const UserInfoTextContWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .user-info-name, .user-info-designation{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 4}px`};
    line-height: 20px;
    letter-spacing: 0.2px;
    text-align: center;
    color: ${(props) => colors[props.selectedTheme]?.header.contentFontColor};

    @media ${device.laptop} {
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
      text-align: left;
    }
  }

  .user-info-designation{
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 3}px`};
    line-height: 10px;

    @media ${device.laptop} {
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 4}px`};
    }
  }
`;

export const UserInfoHorizontalLine = styled.hr`
  width: 100%;
  height: 1px;
  border-color: ${(props) => colors[props.selectedTheme]?.header.contentFontColor};
`;

export const UserInfo = ({ ...props }) => {
  const { selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  return (
    <UserInfoWrapper className={props.className}>
      <UserInfoImageWrapper>
        <Image className="user-info-image" mobilesrcfile={props.userImage} tabletsrcfile={props.userImage} desktopsrcfile={props.userImage}/>
      </UserInfoImageWrapper>
      <UserInfoTextContWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Text className="user-info-name" tag="h5" text={props.userName} />
        <UserInfoHorizontalLine selectedTheme={selectedTheme} />
        <Text className="user-info-designation" tag="h6" text={props.userDesignation} />
      </UserInfoTextContWrapper>
    </UserInfoWrapper>
  );
};

UserInfo.defaultProps = {};
