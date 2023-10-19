import React, { useEffect, useState } from 'react';
import { CommonWrapper } from '../components/views/CommonWrapper';
import { CardImageWithText } from '../components/organisms';
import { ContentWrapper } from './Training';
import { Breadcrumb } from '../components/atoms';
import { getService } from '../service.js';
import { apiList } from '../util/apiList';
import languageEn from "../data/language_en.json";
import language_ka from "../data/language_ka.json";
import { useSelector } from "react-redux";
import ImageGallery from "../components/organisms/ImageGallery"
import facilitiesList from '../data/facilitiesList.json'

export const Facilities = (props) => {
  const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;
  
  return <CommonWrapper 
      // bannerSlider={responseData.banners}
    >
      <ContentWrapper>
        <Breadcrumb currentPageName={language.list[2].label} />
        {/* <Text className="traning_text" tag="h4" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryV" /> */}
        {facilitiesList.facilities.map((item, index) => {
          return (
            <CardImageWithText
              key={index}
              reverse={index%2 === 0 ? true : false}
              cardImage={item.image_url}
              cardImage2x={item.image_url}
              cardImage3x={item.image_url}
              image={ true}
              cardHeading={selectedLanguage === 'en_in' ? item.caption_en : item.caption_ka}
              cardDesc={selectedLanguage === 'en_in' ? item.description_en : item.description_ka}
              isTextSizeHigh = { true }
            />
          )}
        )}
        <ImageGallery bannerSlider = {facilitiesList.banners}/>
      </ContentWrapper>
    </CommonWrapper>
};

export default Facilities;
