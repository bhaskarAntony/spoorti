import React, { useEffect, useState } from 'react';
import { CommonWrapper } from '../components/views/CommonWrapper';
// import { CardList, Download } from '../components/organisms';
import { getService } from '../service.js';
// import languageEn from "../data/language_en.json";
// import language_ka from "../data/language_ka.json";
import { apiList } from '../util/apiList';
// import { useSelector } from "react-redux";
import { BannerBottom } from '../components/atoms';
import { HomeContent } from '../components/organisms';
import homeList from '../data/homeList.json'

export const Home = ({...props}) => {
  // const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(true);

  // const headingText = selectedLanguage === 'en_in' ? languageEn.serviceHeadingLabel : language_ka.serviceHeadingLabel;

  const fetch = async() => {
    const data = await getService(apiList.home);
    setResponseData(data[0]);
    setLoading(false);
  };

  // useEffect(() => {
  //   fetch();
  // }, []);


  //if (!loading)
  return <CommonWrapper 
          bannerSlider={homeList.banners}
        >
          <BannerBottom />
          <HomeContent 
            recentEvents={responseData?.recent_events} 
            upcommingEvents={responseData?.upcomming_events}
            liveEvents={responseData?.live_events}
          />
          {/* <HomeContent responseData={responseData} {...props} /> */}
          {/* <CardList customClass="service-card-cont" headingText={headingText} eventInfo={responseData.services} /> */}
          {/* <Download /> */}
    </CommonWrapper>
};

export default Home;
