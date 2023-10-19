import * as React from 'react';
import styled from 'styled-components/macro';
import { colors } from '../../theme';

export const StatusIndicatorCont = styled.span`
  background-color: ${(props) => props.bgcolor};
  border-width: ${(props) => props.borderwidth};
  border-style: solid;
  border-color: ${(props) => props.bordercolor};
  border-radius: 50%;
  width: ${(props) => props.iconWidth};
  height: ${(props) => props.iconWidth};
`;

export const StatusIndicator = ({ iconWidth, bgcolor, bordercolor, borderwidth }) => {
  return (
    <StatusIndicatorCont bgcolor={bgcolor} iconWidth={iconWidth} bordercolor={bordercolor} borderwidth={borderwidth} />
  );
};

StatusIndicator.defaultProps = {
  iconWidth: '7px', 
  bgcolor: colors.black, 
  bordercolor: colors.black, 
  borderwidth: '1.5px'
};
