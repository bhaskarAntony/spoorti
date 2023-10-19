import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { CommonWrapper } from '../components/views/CommonWrapper';
// import { Text } from '../components/atoms';
import { colors, device, fonts, size } from '../theme';
import { CardImageWithText } from '../components/organisms';
import { getService } from '../service.js';
import { apiList } from '../util/apiList';
import { useSelector } from "react-redux";
import { Breadcrumb, Text } from '../components/atoms';
import ImageGallery from '../components/organisms/ImageGallery';
import EventsList from '../data/eventList.json'

export const ContentWrapper = styled.section`
  margin: 50px auto;
  max-width: calc(100% - 110px);
  
  @media ${device.laptop} { 
    max-width: ${size.laptopM};
  }

  .event-detail-heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 18}px`};
    line-height: ${(props) => `${fonts.size[props.selectedFontSize] * 22}px`};
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.card.fontColor};
  }
`;

export const EventDetail = ({ ...props }) => {
  const { selectedLanguage, selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));
  const [responseData, setResponseData] = useState({});
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventId = urlParams.get('eventId')

  const fetch = async () => {
    //const data = await getService(`${apiList.eventDetail}/${eventId}`);

    const data = EventsList.filter(item => item.event_id == eventId)
    const banner = data[0].media.filter(item => item.type !== "EVENT");
    setBannerImages([...banner])
    setResponseData(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!loading)
    return <CommonWrapper
      //bannerSlider={bannerImages}
    >
      <ContentWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Breadcrumb currentPageName={selectedLanguage === 'en_in' ? responseData.name_en : responseData.name_ka} />
        <Text tag="h4" className="event-detail-heading" text={selectedLanguage === 'en_in' ? responseData.name_en : responseData.name_ka} />
        {/* <CardImageWithText
          image={false}
          cardDesc={selectedLanguage === 'en_in' ? responseData.description_en : responseData.description_ka}
        />
        {responseData?.media?.map((item, index) => {
          return (
            item.type === "EVENT" &&
            <CardImageWithText
              key={index}
              reverse={index % 2 === 0 ? true : false}
              cardImage={item.url}
              cardImage2x={item.url}
              cardImage3x={item.url}
              cardHeading={selectedLanguage === 'en_in' ? item.caption_en : item.caption_ka}
              cardDesc={selectedLanguage === 'en_in' ? item.description_en : item.description_ka}
            />
          )
        }
        )} */}

        <ImageGallery bannerSlider={bannerImages} largeImageSize = {true} />
      </ContentWrapper>
    </CommonWrapper>
};

export default EventDetail;
