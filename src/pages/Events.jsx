import React, { useEffect, useState } from 'react';
import { CommonWrapper } from '../components/views/CommonWrapper';
import { CardList } from '../components/organisms';
import { getService } from '../service.js';
import languageEn from "../data/language_en.json";
import language_ka from "../data/language_ka.json";
import { apiList } from '../util/apiList';

import { useSelector } from "react-redux";
import { Breadcrumb } from '../components/atoms';
import { ContentWrapper } from './Training';
import Eventlist from '../data/eventList.json'

export const Events = (props) => {
  const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(true);
  const publicHeadingLabel = selectedLanguage === 'en_in' ? languageEn.publicHeadingLabel : language_ka.publicHeadingLabel;
  const privateHeadingLabel = selectedLanguage === 'en_in' ? languageEn.privateHeadingLabel : language_ka.privateHeadingLabel;
  const fetch = async() => {
    const data = await getService(`${apiList.events}/1000?status=COMPLETED`);
    setResponseData(data[0]);
    setLoading(false);
  };

  // useEffect(() => {
  //   fetch();
  // }, []);

  //if (!loading)
  return <CommonWrapper 
      // bannerSlider={responseData?.banners}
    >
      <ContentWrapper>
        <Breadcrumb currentPageName={language.list[3].label} />
        <CardList pageRedirection='/eventDetail' eventInfo={Eventlist} headingText={publicHeadingLabel} />
        {/* {responseData?.public?.length && <CardList pageRedirection='/eventDetail' eventInfo={responseData.public} headingText={publicHeadingLabel} />}
        {responseData?.private?.length && <CardList pageRedirection='/eventDetail' eventInfo={responseData.private} headingText={privateHeadingLabel} />} */}
      </ContentWrapper>
    </CommonWrapper>
};

export default Events;
