import * as React from 'react';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';

export const ProgressOveralltWrapper = styled.div`
  position: relative;

  .progress-percentage {
    position: absolute;
    top: 23px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    letter-spacing: 0.177539px;
    color: colors.quartz;
    left: 13px;
  }
`;


export const ProgressContWrapper = styled.div`
  position: relative;
  width: 55px;
  height: 55px;
  margin: 0;
  transform: rotate(-90deg);
  @keyframes anim_circle-css {
    to {
      stroke-dashoffset: ${(props) => (120 - (120 * props.percentage) / 100)};
    }
  }
    
  .progress-bar-svg {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .progress-bar-svg-circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 6;
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    stroke: ${(props) => props.progresColor};
    stroke-linecap: round;
    transform: translate(5px, 5px); // stroke-width / 2
  }

  .circle-css {
    animation: anim_circle-css 1s ease-in-out forwards;
  }

  .progress-bar-svg-full-circle {
    width: 100%;
    height: 100%;
    fill: none;
    stroke-width: 6;
    stroke-dasharray: 120;
    stroke-dashoffset: 120;
    stroke: ${(props) => props.progresFullCircleColor};
    stroke-linecap: round;
    transform: translate(5px, 5px); 
    stroke-dashoffset: 0;
  }
`;

export const Progress = ({ percentage, progresFullCircleColor, progresColor }) => {
  return (
    <ProgressOveralltWrapper>
      <ProgressContWrapper percentage={percentage} progresFullCircleColor={progresFullCircleColor} progresColor={progresColor}>
        <svg className="progress-bar-svg">
            <circle cx="20" cy="20" r="20" className="progress-bar-svg-full-circle"> </circle>
            <circle cx="20" cy="20" r="20" className="progress-bar-svg-circle circle-css"> </circle>
        </svg>
      </ProgressContWrapper>
      <span className='progress-percentage'>{percentage}%</span>
    </ProgressOveralltWrapper>
  );
};

Progress.defaultProps = {
  percentage: 85,
  progresFullCircleColor: colors.brightGray,
  progresColor: colors.softRed
};
