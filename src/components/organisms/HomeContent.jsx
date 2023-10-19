import React, { useEffect, useState } from 'react';
import moment from "moment";
import styled from "styled-components/macro";
import { colors, device, fonts, size } from "../../theme";
import { Icon, Text } from "../atoms";
import userImage1 from "../../assets/images/user_image_1.png";
import userImage2 from "../../assets/images/user_image_2.png";
import userImage3 from "../../assets/images/user_image_3.png";
import userImage4 from "../../assets/images/user_image_4.png";
import { EventInfo, HighLightProfile, UserInfo } from "../molecules";
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";
import { useSelector } from "react-redux";
import { getService } from '../../service.js';
import { apiList } from '../../util/apiList';
import Eventlist from '../../data/eventList.json'

export const HomeContentWrapper = styled.section`
  background: ${(props) => colors[props.selectedTheme]?.homeContent.overallBG};
  width: 100%;
  margin-top: -8px;

  .home-content-heading {
    background: ${(props) =>
    colors[props.selectedTheme]?.homeContent.headingBG};
    color: ${(props) =>
    colors[props.selectedTheme]?.homeContent.headingFontColor};
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 18px;
    padding: 15px;
  }
`;

export const HomeMiddleInnerWrapper = styled.div`
  width: 100%;
  background: ${(props) => colors[props.selectedTheme]?.homeContent.headingBG};
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.25);
  padding: 0;
  margin-right: 0px;
  margin-bottom: 15px;

  @media ${device.laptop} {
    width: calc(50% - 10px);
    margin-right: 20px;
    margin-bottom: 0px;

    &:last-child {
      margin-right: 0px;
    }
  }
`;

export const HomeInnerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  max-width: calc(100% - 30px);
  padding: 15px 0px;
  flex-wrap: wrap;

  &:last-child {
    margin-top: 0;
  }

  @media ${device.laptop} {
    padding: 30px 65px;
    max-width: ${size.laptopM};
  }

  .header-info-left,
  .header-info-right {
    flex-direction: column;
    align-items: center;
    width: calc(50% - 5px);

    @media ${device.laptop} {
      display: none;
    }
  }
`;

export const HomeMiddleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  @media ${device.laptop} {
    width: calc(50% - 40px);
  }
`;

export const HomeRecentListWrapper = styled.div`
  padding: 15px 0px;
  border-bottom: dotted 2px
    ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
  margin: 0 10px;
  float: left;
  width: calc(100% - 20px);

  &:last-child {
    border-bottom: 0;
  }

  .home-recent-event-text {
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
    line-height: 19px;
    color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
    width: calc(100% - 25px);
    float: left;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    max-height: 55px;
  }
`;

export const HomeArrow = styled.div`
  border-top: solid 8px transparent;
  border-bottom: solid 8px transparent;
  border-left: solid 10px
    ${(props) => colors[props.selectedTheme]?.homeContent.arrowBG};
  margin-right: 15px;
  float: left;
  margin-top: 5px;
`;

export const HomeNewListContWrapper = styled.div`
  background: ${(props) => colors[props.selectedTheme]?.homeContent.newBG};
  padding: 10px 15px;
  width: 100%;
  margin-top: 10px;
  display: flex;
  align-items: center;
  position: relative;

  .home-new-icon {
    width: 32px;
    height: 32px;
    margin-right: 15px;
  }

  .home-new-text {
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
    line-height: 19px;
    color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
  }

  .home-new-link {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-indent: -99999em;
  }
`;

export const RecentEventsWrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  .recent-event-heading {
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 19px;
    color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
    padding: 10px 10px 20px;
    box-shadow: 4px 4px 17px rgba(0, 0, 0, 0.25);
  }

  @media ${device.laptop} {
    width: calc(50% - 40px);
  }
`;

export const RecentEventsList = styled.div`
  background: ${(props) =>
    colors[props.selectedTheme]?.homeContent.recentEventListBG};
  display: flex;
  padding: 15px 30px 0;
  width: 100%;
  position: relative;

  &:last-child {
    padding-bottom: 15px;
  }

  .event-calendar-icon {
    margin-bottom: 5px;
  }

  .recent-event-info {
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 19px;
    color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    height: 40px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin-top: 10px;
  }

  .event-recent-link {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-indent: -99999em;
  }
`;

export const RecentEventsIconDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;

  .recent-event-date {
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 4}px`};
    line-height: 11px;
    color: ${(props) =>
    colors[props.selectedTheme]?.homeContent.recentEventDateFontColor};
    white-space: nowrap;
  }
`;

export const RecentEventsListCont = styled.div`
  height: calc(100% - 35px);
  background: ${(props) =>
    colors[props.selectedTheme]?.homeContent.recentEventListBG};
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.25);
`;

export const HomeUpcomingEventListCont = styled.div`
  height: 250px;
`;

export const HomeUpcomingEventListInner = styled.div`
  height: calc(100% - 20px);
  overflow: auto;
`;

export const HomeContent = ({ ...props }) => {
  const [recentEvents, setRecentEvents] = useState([]);
  const fetchData = async () => {
    try {
      const data = await getService(`${apiList.events}/1000?status=COMPLETED`);
      if (data && data.length > 0) {
        setRecentEvents(data[0]?.public || []);
      } else {
        setRecentEvents([]);
        showMessage("No events available");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const showMessage = (message) => {
    alert(message);
  };

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  //Upcoming events 
  const [upcommingEvent, setUpcommingEvent] = useState([]);
  const fetch = async () => {
    try {
      const data = await getService(`${apiList.events}/1000?status=NEW`);
      if (data && data.length > 0) {
        setUpcommingEvent(data[0]?.public || []);
      } else {
        setUpcommingEvent([]);
        displayMessage("No events available");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const displayMessage = (message) => {
    alert(message);
  };

  // useEffect(() => {
  //   fetch();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);


  //const { liveEvents } = props;
  // let upcomingEventDates = [];
  // upcommingEvent?.map((event) => {
  //   upcomingEventDates.push(new Date(event.event_from_dt));
  //   if (new Date(event.event_from_dt) !== new Date(event.event_to_dt)) {
  //     const numberOfDays =
  //       (new Date(new Date(event.event_to_dt).setHours(0)).setMinutes(0) -
  //         new Date(new Date(event.event_from_dt).setHours(0)).setMinutes(0)) /
  //       (1000 * 3600 * 24);
  //     for (let i = 1; i <= numberOfDays; i++) {
  //       let nextDate = new Date(event.event_from_dt);
  //       nextDate.setDate(nextDate.getDate() + i);
  //       upcomingEventDates.push(nextDate);
  //     }
  //   }
  //   return event;
  // });



  // const [upcomingEventToday, setUpcomingEventToday] = useState(true);
  // const [liveEventToday, setLiveEventToday] = useState(true);
  // let liveEventDates = [];
  // liveEvents?.map((event) => {
  //   liveEventDates.push(new Date(event.event_from_dt));
  //   if (new Date(event.event_from_dt) !== new Date(event.event_to_dt)) {
  //     const numberOfDays =
  //       (new Date(new Date(event.event_to_dt).setHours(0)).setMinutes(0) -
  //         new Date(new Date(event.event_from_dt).setHours(0)).setMinutes(0)) /
  //       (1000 * 3600 * 24);
  //     for (let i = 1; i <= numberOfDays; i++) {
  //       let nextDate = new Date(event.event_from_dt);
  //       nextDate.setDate(nextDate.getDate() + i);
  //       liveEventDates.push(nextDate);
  //     }
  //   }
  //   return event;
  // });
  // const todaysUpcommingData = upcommingEvent
  //   ? upcommingEvent?.filter(
  //     (event) =>
  //       new Date().getTime() >=
  //       new Date(new Date(event.event_from_dt).setHours(0)).setMinutes(0) &&
  //       new Date().getTime() <=
  //       new Date(new Date(event.event_to_dt).setHours(0)).setMinutes(0)
  //   )
  //   : [];
  // const [todaysUpcommingEvent, setTodaysUpcommingEvent] = useState([
  //   ...todaysUpcommingData,
  // ]);

  // const todaysLiveData = liveEvents
  //   ? liveEvents?.filter(
  //     (event) =>
  //       moment(event.event_from_dt).format("DD") ===
  //       moment(new Date()).format("DD") &&
  //       moment(event.event_from_dt).format("MMM") ===
  //       moment(new Date()).format("MMM") &&
  //       moment(event.event_from_dt).format("YYYY") ===
  //       moment(new Date()).format("YYYY")
  //   )
  //   : [];
  //const [todaysLiveEvent, setTodaysLiveEvent] = useState([...todaysLiveData]);

  const { selectedTheme, selectedFontSize, selectedLanguage } = useSelector(
    ({ common }) => ({ ...common })
  );
  const language = selectedLanguage === "en_in" ? languageEn : language_ka;

  // const fetchDataUsingDate = (date, type) => {
  //   if (type === "Live EVENTS") {
  //     if (
  //       moment(date).format("DD") === moment(new Date()).format("DD") &&
  //       moment(date).format("MMM") === moment(new Date()).format("MMM") &&
  //       moment(date).format("YYYY") === moment(new Date()).format("YYYY")
  //     ) {
  //       setLiveEventToday(true);
  //     } else {
  //       setLiveEventToday(false);
  //     }
  //     const todaysLiveDataLatest = liveEvents.filter(
  //       (event) =>
  //         new Date(date).getTime() >
  //         new Date(new Date(event.event_from_dt).setHours(0)).setMinutes(0) &&
  //         new Date(date).getTime() <
  //         new Date(new Date(event.event_to_dt).setHours(23)).setMinutes(59)
  //     );
  //     setTodaysLiveEvent([...todaysLiveDataLatest]);
  //   } else {
  //     if (
  //       moment(date).format("DD") === moment(new Date()).format("DD") &&
  //       moment(date).format("MMM") === moment(new Date()).format("MMM") &&
  //       moment(date).format("YYYY") === moment(new Date()).format("YYYY")
  //     ) {
  //       setUpcomingEventToday(true);
  //     } else {
  //       setUpcomingEventToday(false);
  //     }
  //     const todaysUpcommingLatest = upcommingEvent?.filter(
  //       (event) =>
  //         new Date(date).getTime() >
  //         new Date(new Date(event.event_from_dt).setHours(0)).setMinutes(0) &&
  //         new Date(date).getTime() <
  //         new Date(new Date(event.event_to_dt).setHours(23)).setMinutes(59)
  //     );
  //     setTodaysUpcommingEvent([...todaysUpcommingLatest]);
  //   }
  // };

  return (
    <HomeContentWrapper
      selectedTheme={selectedTheme}
      selectedFontSize={selectedFontSize}
    >
      <HomeInnerWrapper>
        {/* <UserInfo
          className="header-info-left"
          userImage={userImage1}
          userName={language.officerInfo[3].name}
          userDesignation={language.officerInfo[3].position}
        />
        <UserInfo
          className="header-info-right"
          userImage={userImage2}
          userName="Sri Araga Jnanendra"
          userDesignation="Hon’ble Minister for Home Government of Karnataka"
        /> */}
        <HighLightProfile
          userImage={userImage3}
          userName={language.officerInfo[2].name}
          userDesignation={language.officerInfo[2].position}
          userLocation={language.officerInfo[2].location}
        />

        <RecentEventsWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
          <Text tag="h3" text={language.recentEvents} className="recent-event-heading" />
          <RecentEventsListCont selectedTheme={selectedTheme}>
            {Eventlist.map((item, index) => {
              // debugger;
              return (
                <RecentEventsList selectedTheme={selectedTheme} selectedFontSize={selectedFontSize} key={index}>
                  <RecentEventsIconDate selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
                    <Icon className="event-calendar-icon" name="calendar" color={colors[selectedTheme].homeContent.recentCalendarIconColor} />
                    <Text tag="p" text={moment(item.event_from_dt).format('DD MMM YYYY')} className="recent-event-date" />
                  </RecentEventsIconDate>
                  <Text tag="p" text={selectedLanguage === 'en_in' ? item.name_en : item.name_ka} className="recent-event-info" />
                  <a className='event-recent-link' href={`/eventDetail?eventId=${item.event_id}`} title={selectedLanguage === 'en_in' ? item.description_en : item.description_ka}>
                    {selectedLanguage === 'en_in' ? item.description_en : item.description_ka}
                  </a>
                </RecentEventsList>
              )
            }
            )}

          </RecentEventsListCont>
        </RecentEventsWrapper>

        <HighLightProfile
          userImage={userImage4}
          userName={language.officerInfo[3].name}
          userDesignation={language.officerInfo[3].position}
          userLocation={language.officerInfo[3].location}
        />
      </HomeInnerWrapper>

      {/* <HomeInnerWrapper>
        <EventInfo
          eventHeading={language.upcomingEvent}
          todayEventLabel={`${language.todaysEvent}: `}
          highlightDates={upcomingEventDates}
          todaysEventInfo={todaysUpcommingEvent}
          todaysEvent={upcomingEventToday}
          fetchDataUsingDate={fetchDataUsingDate}
          eventData={upcommingEvent}
        />

        <RecentEventsWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
          <Text tag="h3" text={language.recentEvents} className="recent-event-heading" />
          <RecentEventsListCont selectedTheme={selectedTheme}>
            {recentEvents.map((item, index) => {
              // debugger;
              return (
                <RecentEventsList selectedTheme={selectedTheme} selectedFontSize={selectedFontSize} key={index}>
                  <RecentEventsIconDate selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
                    <Icon className="event-calendar-icon" name="calendar" color={colors[selectedTheme].homeContent.recentCalendarIconColor} />
                    <Text tag="p" text={moment(item.event_from_dt).format('DD MMM YYYY')} className="recent-event-date" />
                  </RecentEventsIconDate>
                  <Text tag="p" text={selectedLanguage === 'en_in' ? item.description_en : item.description_ka} className="recent-event-info" />
                  <a className='event-recent-link' href={`/eventDetail?eventId=${item.event_id}`} title={selectedLanguage === 'en_in' ? item.description_en : item.description_ka}>
                    {selectedLanguage === 'en_in' ? item.description_en : item.description_ka}
                  </a>
                </RecentEventsList>
              )
            }
            )}

          </RecentEventsListCont>
        </RecentEventsWrapper>


        <EventInfo
          eventHeading={language.liveEvents}
          todayEventLabel={`${language.todaysEvent}: `}
          todaysEventInfo={todaysLiveEvent}
          todaysEvent={liveEventToday}
          highlightDates={liveEventDates}
          fetchDataUsingDate={fetchDataUsingDate}
          eventData={liveEvents}
        />
      </HomeInnerWrapper> */}
    </HomeContentWrapper>
  );
};

HomeContent.defaultProps = {};
