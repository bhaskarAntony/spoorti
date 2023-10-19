import React from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts, size } from '../../theme';
import { Image, Text } from '../atoms';
import home_1 from "../../assets/images/home_1.png";
import home_1_2x from "../../assets/images/home_1_2x.png";
import home_1_3x from "../../assets/images/home_1_3x.png";
import home_2 from "../../assets/images/home_2.png";
import home_2_2x from "../../assets/images/home_2_2x.png";
import home_2_3x from "../../assets/images/home_2_3x.png";
import home_3 from "../../assets/images/home_3.png";
import home_3_2x from "../../assets/images/home_3_2x.png";
import home_3_3x from "../../assets/images/home_3_3x.png";
import home_4 from "../../assets/images/home_4.png";
import home_4_2x from "../../assets/images/home_4_2x.png";
import home_4_3x from "../../assets/images/home_4_3x.png";

export const ImageListWrapper = styled.section`
  background: transparent;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  flex-wrap: wrap;
  max-width: calc(100% - 110px);
  align-items: center;
  @media ${device.laptop} { 
    max-width: ${size.laptopM};
  }

  .card-heading{
    margin: 50px 0 25px;
    width: 100%;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.24px;
    color: ${colors.black};
    width: 75%;
  }

  .card-link{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.24px;
    color: ${colors.black};
    padding-top: 25px;
  }
`;

export const ImageListContWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ImageContWrapper = styled.div`
  width: calc((100% - 60px) / 3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ImageList = ({...props}) => {
  return (
    <ImageListWrapper>
      <Text className="card-heading" tag="h3" text={props.heading} />
      <a className="card-link" tag="a" href="/gallery">View more</a>
      <ImageListContWrapper>
        <ImageContWrapper>
          <Image mobilesrcfile={home_1} tabletsrcfile={home_1_2x} desktopsrcfile={home_1_3x}/>
        </ImageContWrapper>
        <ImageContWrapper>
          <Image mobilesrcfile={home_2} tabletsrcfile={home_2_2x} desktopsrcfile={home_2_3x}/>
          <Image mobilesrcfile={home_3} tabletsrcfile={home_3_2x} desktopsrcfile={home_3_3x}/>
        </ImageContWrapper>
        <ImageContWrapper>
        <Image mobilesrcfile={home_4} tabletsrcfile={home_4_2x} desktopsrcfile={home_4_3x}/>
        </ImageContWrapper>
      </ImageListContWrapper>
    </ImageListWrapper>
  );
};

ImageList.defaultProps = {};
