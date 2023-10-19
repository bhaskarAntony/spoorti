import React from 'react';
import { colors } from '../../theme';

export const ArrowRight = ({ color }) => {
  return (
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 8.74228e-07L12 10L2 20L0.225 18.225L8.45 10L0.224999 1.775L2 8.74228e-07Z" fill={color}/>
    </svg>
  );
};

ArrowRight.defaultProps = {
  color: colors.darkShadeOfRed,
};
