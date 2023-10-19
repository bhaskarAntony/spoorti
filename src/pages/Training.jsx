import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { CommonWrapper } from '../components/views/CommonWrapper';
import { getService } from '../service.js';
import languageEn from "../data/language_en.json";
import language_ka from "../data/language_ka.json";
import { apiList } from '../util/apiList';
import { useSelector } from "react-redux";

// import { Text } from '../components/atoms';
import { device, size } from '../theme';
import { CardImageWithText } from '../components/organisms';
import { Breadcrumb } from '../components/atoms';
import ImageGallery from '../components/organisms/ImageGallery';

export const ContentWrapper = styled.section`
  margin: 15px auto;
  max-width: calc(100% - 30px);
  
  @media ${device.laptop} { 
    max-width: ${size.laptopM};
    margin: 0 auto;
    padding: 0 50px 55px;
  }
`;

export const Training = (props) => {
  const { selectedLanguage, selectedTheme } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetch = async() => {
    const data = await getService(apiList.training);
    setResponseData(data[0]);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!loading)
  return <CommonWrapper 
      // bannerSlider={responseData.banners}
    >
      <ContentWrapper selectedTheme={selectedTheme}>
      <Breadcrumb currentPageName={language.list[2].label} />
        {/* <Text className="traning_text" tag="h4" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryV" /> */}
        {responseData.trainings.map((item, index) => {
          return (
            <CardImageWithText
              key={index}
              reverse={index%2 === 1 ? true : false}
              cardImage={item.image_url}
              cardImage2x={item.image_url}
              cardImage3x={item.image_url}
              cardHeading={selectedLanguage === 'en_in' ? item.caption_en : item.caption_ka}
              cardDesc={selectedLanguage === 'en_in' ? item.description_en : item.description_ka}
            />
          )}
        )}
        <ImageGallery bannerSlider={responseData.banners} />
      </ContentWrapper>
    </CommonWrapper>
};

export default Training;
