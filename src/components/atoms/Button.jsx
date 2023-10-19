import React from 'react';
import styled from 'styled-components/macro';
import { Image, Icon } from '../atoms';
import { colors, fonts } from '../../theme';

export const ButtonWrapper = styled.button`
  background-color: ${(props) => props.bg};
  color: ${(props) => props.color};
  border: none;
  padding: 15px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  box-shadow: 0px 4px 16px -1px rgba(0, 0, 0, 0.05);
  border-radius: ${(props) => props.borderRadius};
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
  min-width: ${(props) => props.minwidth};
`;

export const Button = ({ bg, color, text, action, icon, image, iconcolor, opacity, mobilesrcfile, tabletsrcfile, desktopsrcfile, minwidth, borderRadius, className, disabled }) => {
  return (
    <ButtonWrapper disabled = {disabled} className={className} color={color} bg={bg} onClick={action} minwidth={minwidth} borderRadius={borderRadius}>
      {text}
      {image && <Image mobilesrcfile={mobilesrcfile} tabletsrcfile={tabletsrcfile} desktopsrcfile={desktopsrcfile} height={'30px'} width={'auto'} />}
      {icon && <Icon name={icon} color={iconcolor} opacity={opacity} />}
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  color: colors.white,
  bg: '',
  text: 'noText',
  mobilesrcfile: "",
  tabletsrcfile: "",
  desktopsrcfile: "",
  action: () => {},
  minwidth: '10px',
  borderRadius: '0'
};
