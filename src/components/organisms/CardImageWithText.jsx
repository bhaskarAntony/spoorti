import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { colors, device, fonts } from '../../theme';
import { Image, Text } from '../atoms';
import { selectFontSize } from '../../redux/common/action';

export const CardImageWithTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-direction column-reverse;
  
  @media ${device.laptop} {
    flex-direction: ${(props) => `${props.reverse ? 'row-reverse' : 'row'}`};
  }

  .card-list-heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * `${props.isTextSizeHigh ? 12 : 8}`}px`};
    line-height: ${(props) => `${fonts.size[props.selectedFontSize] * 11}px`};
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.card.fontColor};
    
  }

  .card-desc{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * `${props.isTextSizeHigh ? 10 : 7}`}px`};
    line-height: 161.52%;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.card.fontColor};
    margin: 10px 0 25px;

    &:last-child{
      margin-bottom: 0;
    }
  }

  .card-image{
    max-height: 600px;
    object-fit: cover;
  }
`;

export const CardImageWithTextInnerWrapper = styled.div`
  width: 100%;

  @media ${device.laptop} {
    width: ${(props) => `${props.imageExist ? 'calc(50% - 30px)' : '100%'}`} ;
  }
`;

export const CardImageContWrapper = styled.div`
  width: 100%;
  margin-top: 20px;

  @media ${device.laptop} {
    width: calc(50% - 100px);
    margin-top: 0px;
  }
`;

export const CardImageWithText = ({ image = true, isTextSizeHigh = false, ...props }) => {
  const { selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  return (
    <CardImageWithTextWrapper reverse={props.reverse} selectedTheme={selectedTheme} selectedFontSize={selectedFontSize} isTextSizeHigh={isTextSizeHigh}>
      {image &&
        <CardImageContWrapper>
          <img className="card-image" src={props.cardImage} />
          {/* <Image className="card-image"
            mobilesrcfile={props.cardImage}
            tabletsrcfile={props.cardImage2x}
            desktopsrcfile={props.cardImage3x} /> */}
        </CardImageContWrapper>
      }
      <CardImageWithTextInnerWrapper imageExist={image} >
        {props.cardHeading && <Text className="card-list-heading" tag="h5" text={props.cardHeading} />}
        <Text className="card-desc" tag="p" text={props.cardDesc} />
      </CardImageWithTextInnerWrapper>
    </CardImageWithTextWrapper>
  );
};

CardImageWithText.defaultProps = {};
