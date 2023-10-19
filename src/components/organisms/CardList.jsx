import React from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts, size } from '../../theme';
import { Image, Text } from '../atoms';
import { useSelector } from "react-redux";

export const CardListWrapper = styled.section`
  background: transparent;
  width: 100%;
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;

  img {
    object-fit: cover;
  }
  
  @media ${device.laptop} { 
    max-width: ${size.laptopM};
  }

  &.service-card-cont{
    .card-heading{
      text-align: center;
    }

    [class*='CardList__CardWrapper'] {
      background: rgba(42, 56, 150, 0.05)!important;
      border-radius: 0!important;
      padding: 65px 45px;
      cursor: pointer; 
      border: 13px solid transparent;
      margin-bottom: 35px;

      &:hover {
        background: rgba(16, 16, 16, 0.2)!important;
        border: 13px solid rgba(0, 0, 0, 0.01);
        box-shadow: 0px 4px 75px rgba(0, 0, 0, 0.08);
      }
    }

    [class*='Image__PictureWrapper'] {
      border-radius: 50%;
      overflow: hidden;
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }

    .card-list-heading{
      margin: 30px auto 15px;
      text-align: center;
    }

    .card-desc{
      text-align: center;
      margin: 0 auto;
    }
  }

  .card-heading{
    margin: 50px 0 25px;
    width: 100%;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 12}px`};
    line-height: 29px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.card.fontColor};
  }
`;

export const CardWrapper = styled.div`
  background: ${(props) => colors[props.selectedTheme]?.card.bg};
  box-shadow:  13px 12px 22px rgba(42, 56, 150, 0.08);
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 55px;
  width: calc((100% - 50px) / 3);
  position: relative;
  margin-bottom: 30px;
  margin-right: 25px;

  &:last-child{
    margin-right: 0px;
  }

  .card-list-heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 12}px`};
    line-height: 161.52%;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.card.fontColor};
    margin: 20px 25px 10px;
  }

  .card-desc{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 300;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
    line-height: 161.52%;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.card.fontColor};
    margin: 0 25px;
  }

  .card-link{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    font-size: 0;
    z-index: 1;
  }
`;

export const CardList = ({...props}) => {
  const { selectedLanguage, selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  return (
    <CardListWrapper className={props.customClass} selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
      <Text className="card-heading" tag="h3" text={props.headingText} />
      {props.eventInfo.map((item, index) => {
        return (
          <CardWrapper key={index} selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
            {(item.redirection || props.pageRedirection) && <a className='card-link' href={`${item.redirection || props.pageRedirection}?eventId=${item.event_id}`} title={selectedLanguage === 'en_in' ? (item.caption_en || item.name_en) : (item.caption_ka || item.name_ka)}>{selectedLanguage === 'en_in' ? (item.caption_en || item.name_en) : (item.caption_ka || item.name_ka)}</a>}
            <Image className="card-image" 
              mobilesrcfile={item.image_url || item.media[0].url} 
              tabletsrcfile={item.image_url || item.media[0].url} 
              desktopsrcfile={item.image_url || item.media[0].url}/>
            <Text className="card-list-heading" tag="h5" text={selectedLanguage === 'en_in' ? (item.caption_en || item.name_en) : (item.caption_ka || item.name_ka)} />
            {/* <Text className="card-desc" tag="p"  text={selectedLanguage === 'en_in' ? item.description_en : item.description_ka} /> */}
          </CardWrapper>
        )}
      )}
    </CardListWrapper>
  );
};

CardList.defaultProps = {};
