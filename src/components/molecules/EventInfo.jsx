import * as React from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts } from '../../theme';
import { Text } from '../atoms';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from 'react-redux';

export const EventInfoContWrapper = styled.div`
  background: ${(props) => colors[props.selectedTheme]?.homeContent.eventInnerBG};
  box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.25);
  width: 100%;
  margin-right: 0px;
  margin-bottom: 15px;

  &:last-child{
    margin-bottom: 0;
  }
  
  @media ${device.laptop} {
    width: 25%;
    margin-right: 20px;
    margin-bottom: 0;
    
    &:last-child{
      margin-right: 0;
      margin-left: 20px;
      margin-bottom: 0;
    }
  }

  .event-heading{
    background: ${(props) => colors[props.selectedTheme]?.homeContent.eventBG};
    padding: 10px 15px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 19px;
    color: ${(props) => colors[props.selectedTheme]?.homeContent.eventHeadingFontColor};

    + div{
      display: flex;
      border-radius: 0;
      padding-bottom: 10px;

      .react-datepicker{
        border-radius: 0;
        border: 0;
        margin: 0 auto;
        width: 240px;
      }

      .react-datepicker__day--disabled{
        background: #F2F3F7;
        color: #000000;
      }

      .react-datepicker__month-container{
        width: 100%;
        border-radius: 0;
        background: ${(props) => colors[props.selectedTheme]?.homeContent.eventInnerBG};
      }

      .react-datepicker__header{
        background: ${(props) => colors[props.selectedTheme]?.homeContent.eventInnerBG};
        border: 0;
      }

      .react-datepicker__day, .react-datepicker__day-name{
        border: 0.5px solid ${(props) => colors[props.selectedTheme]?.homeContent.calenderBorderColor};
        margin: 0;
        padding: 5px;
        width: 25px;
        border-right: 0;
        border-bottom: 0;
        font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 4}px`};
        color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
        &:last-child{
          border-right: 0.5px solid ${(props) => colors[props.selectedTheme]?.homeContent.calenderBorderColor};
        }
      }

      .react-datepicker__week:last-child{
        .react-datepicker__day{
          border-bottom: 0.5px solid ${(props) => colors[props.selectedTheme]?.homeContent.calenderBorderColor};
        }
      }

      .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected{
        border-radius: 0;
        background: ${(props) => colors[props.selectedTheme]?.homeContent.calenderSelectedBG};
        color: ${(props) => colors[props.selectedTheme]?.homeContent.calenderSelectedFontColor};
      }

      .react-datepicker__day-name{
        border: 0!important;
      }

      .react-datepicker__navigation-icon::before{
        border-width: 2px 2px 0 0;
        height: 6px;
        width: 6px;
        border-color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
      }

      .react-datepicker__navigation--previous {
        right: 50px;
        top: 7px;
        left: auto;
      }

      .react-datepicker__navigation--next {
        right: 20px;
        top: 7px;
      }

      .react-datepicker__current-month{
        text-align: left;
        padding-left: 35px;
        font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
        color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};
      }

      .react-datepicker__day--outside-month{
        background: ${(props) => colors[props.selectedTheme]?.homeContent.calendarOutsideBG};
        color: ${(props) => colors[props.selectedTheme]?.homeContent.calendarOutsideFontColor};
      }

      .react-datepicker__day--excluded{
        background: ${(props) => colors[props.selectedTheme]?.homeContent.calendarExcludeBG};
        color: ${(props) => colors[props.selectedTheme]?.homeContent.calendarExcludeFontColor};
      }
    }
  }
`;

export const EventInfoText = styled.div`
  background: ${(props) => colors[props.selectedTheme]?.homeContent.todayEventBG};
  display: flex;
  padding: ${(props) => props.selectedFontSize <= 2 ? '10px 15px' : '10px 0px'};

  .event-info-label, .event-info-value{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 300;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
    line-height: 18px;
    color: ${(props) => colors[props.selectedTheme]?.homeContent.eventHeadingFontColor};
  }

  .event-info-value{
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: calc(100% - 90px);
    ext-transform: capitalize;
  }
`;

export const EventInfo = ({ ...props }) => {
  const startDate = new Date();
  const endDate = null;
  const { selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  return (
    <EventInfoContWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
      <Text className="event-heading" tag="h5" text={props.eventHeading} />
      <DatePicker 
        selected={startDate}
        minDate={new Date()}
        startDate={startDate}
        onChange={(date) => props.fetchDataUsingDate(date, props.eventHeading)}
        endDate={endDate}
        highlightDates={props.highlightDates}
        inline
      />
      <EventInfoText selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Text className="event-info-label" tag="h6" text={props.todaysEvent ? props.todayEventLabel : 'Event Info: '} />
        <Text className="event-info-value" tag="p" text={props.todaysEventInfo.length ? props.todaysEventInfo[0].description_en : 'No events today'} />
      </EventInfoText> 
    </EventInfoContWrapper>
  );
};

EventInfo.defaultProps = {};
