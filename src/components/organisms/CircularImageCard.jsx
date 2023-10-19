import React from 'react'
import { Image, Text } from '../atoms';
import styled from 'styled-components/macro';
import { device, fonts } from '../../theme';
import { useSelector } from 'react-redux';

export const UserInfoImageWrapper = styled.div`
  position: relative;
  height: 70px;
  width: 70px;
  border-radius: 50px;
  overflow: hidden;

  .user-info-image{
    object-fit: cover;
  }

  @media ${device.laptop} {
    height: 90px;
    width: 90px;

    .user-info-image{
      object-fit: cover;
    }

  }

`;

export const UserInfoTextContWrapper = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;

  .user-info-name, .user-info-designation{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 4}px`};
    line-height: 20px;
    letter-spacing: 0.2px;
    margin-top: 5px;
    color: #fff;

    @media ${device.laptop} {
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
      text-align: left;
    }
  }

  .user-info-designation{
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 3}px`};
    line-height: 10px;

    @media ${device.laptop} {
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
    }
  }
`;

const CircularImageCard = ({ ...props }) => {

  const { selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  return (
    <div className={props.className}>
      <UserInfoImageWrapper>
        <Image className="user-info-image" mobilesrcfile={props.userImage} tabletsrcfile={props.userImage} desktopsrcfile={props.userImage} width={90} height={90} />
      </UserInfoImageWrapper>
      <UserInfoTextContWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Text className="user-info-name" tag="h5" text={props.userName} />
        <Text className="user-info-designation" tag="h6" text={props.userDescription} />
      </UserInfoTextContWrapper>
    </div>

  )
}

export default CircularImageCard