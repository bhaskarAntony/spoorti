import * as React from 'react';
import styled from 'styled-components/macro';
import { Image, Text } from '../atoms';
import { colors, device, fonts, size } from '../../theme';
import { useSelector } from 'react-redux';

export const BannerWrapper = styled.section`
    position: relative;

    .banner-heading{
      font-family: ${fonts.default};
      font-style: normal;
      font-weight: 700;
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 12}px`};
      line-height: 24px;
      letter-spacing: -0.24px;
      color: ${colors.white};
      margin: 0 auto;
      text-align: left;

      @media ${device.laptop} { 
        font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 20}px`};
        line-height: 48px;
      }
    }

    .banner-desc{
      font-family: ${fonts.default};
      font-style: normal;
      font-weight: 600;
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
      line-height: 161.52%;
      letter-spacing: -0.24px;
      color: ${colors.white};
      margin-top: 15px;
      text-align: left;

      @media ${device.laptop} { 
        font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
      }
    }
`;

export const BannerOverlayWrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(89.36deg, rgba(0, 0, 0, 0.65) 1.56%, rgba(0, 0, 0, 0.33) 48.93%, rgba(0, 0, 0, 0) 99.36%);
`;

export const BannerTextWrapper = styled.div`
  position: absolute;
  bottom: 55px;
  max-width: calc(100% - 30px);
  left: 15px;
  width: 100%;

  @media ${device.laptop} { 
    max-width: ${size.laptopM};
    left: calc((100% - ${size.laptopM}) / 2);
  }
`;

export const Banner = ({ ...props }) => {
  
  const { selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  return (
    <BannerWrapper selectedFontSize={selectedFontSize}>
        <Image mobilesrcfile={props.bannerImages.banner} tabletsrcfile={props.bannerImages.banner_2x} desktopsrcfile={props.bannerImages.banner_3x}/>
        <BannerOverlayWrapper />
        <BannerTextWrapper>
          <Text className="banner-heading" tag="h3" text={props.pagename} />
          {props.pagedesc && <Text className="banner-desc" tag="p" text={props.pagedesc} />}
        </BannerTextWrapper>
    </BannerWrapper>
  );
};

Banner.defaultProps = {};
