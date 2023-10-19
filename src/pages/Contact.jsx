import React, { useEffect, useState } from 'react';
import { Breadcrumb, Image, Text } from '../components/atoms';
import { CommonWrapper } from '../components/views/CommonWrapper';
import { ContentWrapper } from './Training';
import { Enquiry } from '../components/organisms';
import { getService } from '../service.js';
import languageEn from "../data/language_en.json";
import language_ka from "../data/language_ka.json";
import { apiList } from '../util/apiList';
import { useSelector } from "react-redux";
import contactImage from '..//assets/images/smwcus_2.jpg'

export const Contact = (props) => {
  const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;
  const { viewOnMapsLabel } = selectedLanguage === 'en_in' ? languageEn : language_ka;

  return <CommonWrapper customContClass="contactus-page">
      <ContentWrapper>
        <Breadcrumb currentPageName={language.list[5].label} />
        <Enquiry sideImage={contactImage} imageLabel = {viewOnMapsLabel} />
        {/* <Text tag="h4" text={contactDirectoriesLabel} className="contact_directories_heading" /> */}
        {/* <ContactDirectories /><br/>
        <Text tag="h5" text={viewOnMapsLabel} className="view_map_heading" />
        <Image 
          className="map-img"
          mobilesrcfile={responseData.contact_us.url} 
          tabletsrcfile={responseData.contact_us.url} 
          desktopsrcfile={responseData.contact_us.url}/> */}
      </ContentWrapper>
    </CommonWrapper>
};

export default Contact;
