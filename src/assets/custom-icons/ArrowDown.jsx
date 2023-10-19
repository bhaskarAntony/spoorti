import React from 'react';
import { colors } from '../../theme';

export const ArrowDown = ({ color }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 9L12 19L2 9L3.775 7.225L12 15.45L20.225 7.225L22 9Z" fill={color}/>
    </svg>
  );
};

ArrowDown.defaultProps = {
  color: colors.darkShadeOfRed,
};
