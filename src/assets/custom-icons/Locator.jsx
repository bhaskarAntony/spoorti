import React from 'react';
import { colors } from '../../theme';

export const Locator = ({ color }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 0C5.45929 0 3 2.504 3 5.6C3 9.8 8.5 16 8.5 16C8.5 16 14 9.8 14 5.6C14 2.504 11.5407 0 8.5 0ZM8.5 7.6C7.97904 7.6 7.47942 7.38929 7.11104 7.01421C6.74267 6.63914 6.53571 6.13043 6.53571 5.6C6.53571 5.06957 6.74267 4.56086 7.11104 4.18579C7.47942 3.81071 7.97904 3.6 8.5 3.6C9.02096 3.6 9.52058 3.81071 9.88896 4.18579C10.2573 4.56086 10.4643 5.06957 10.4643 5.6C10.4643 6.13043 10.2573 6.63914 9.88896 7.01421C9.52058 7.38929 9.02096 7.6 8.5 7.6Z" fill={color}/>
    </svg>
  );
};

Locator.defaultProps = {
  color: colors.darkShadeOfRed,
};