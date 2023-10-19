import * as React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { colors, device, fonts } from '../../theme';
import { Image, Text } from '../atoms';

export const HighLightProfileWrapper = styled.div`
  width: 100%;
  background: ${(props) => colors[props.selectedTheme]?.homeContent.highLightBG};
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.25);
  margin-right: 0px;
  margin-top: 15px;
  margin-bottom: 15px;

  &:last-child{
    margin-bottom: 0px;
  }  

  &.home-events-news{
    padding: 0;
  }

  @media ${device.laptop} {
    width: 25%;
    margin-right: 20px;
    margin-bottom: 0px;
    margin-top: 0px;

    &:last-child{
      margin-right: 0px;
      margin-left: 20px;
    }
  }
`;

export const HighLightProfileTextContWrapper = styled.div`
  background: ${(props) => colors[props.selectedTheme]?.homeContent.bg};
  padding: 5px 10px 10px;
  height: 80px;

  .highlight-user-name, .highlight-user-designation {
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 151.02%;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
    margin-bottom: 5px;
  }

  .highlight-user-designation{
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
  }
`;

export const HighLightProfile = ({ ...props }) => {
  const { selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  return (
    <HighLightProfileWrapper selectedTheme={selectedTheme}>
        <img className='home-user-image' src={props.userImage}/>
      <HighLightProfileTextContWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Text className="highlight-user-name" tag="h3" text={props.userName} />
        <Text className="highlight-user-designation" tag="h4" text={props.userDesignation} />
        <Text className="highlight-user-designation" tag="h5" text={props.userLocation} />
      </HighLightProfileTextContWrapper>
    </HighLightProfileWrapper>
  );
};

HighLightProfile.defaultProps = {};
