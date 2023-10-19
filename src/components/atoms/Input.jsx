import React from 'react';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';

export const InputWrapper = styled.input`
  background: ${(props) => props.bg};
  border: 1px solid ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius};
  flex: none;
  order: 0;
  flex-grow: 1;
  padding: 15px 15px;
  min-width: 250px;
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 140%;
  display: flex;
  align-items: center;
  color: ${(props) => props.color};
`;

export const Input = ({ bg, color, placeholder, value, type, borderColor, borderRadius, className, action, minLength, maxLength, ...props }) => {
  return (
    <InputWrapper 
      onChange={(event) => {
        if (props.searchType) {
          action(event, props.searchType);
        } else {
          action(event);
        }
      }} 
      onKeyPress={(event) => {
        if (props.searchType) {
          action(event, props.searchType);
        } else {
          action(event);
        }
      }} 
      onKeyUp={(event) => {
        if (props.searchType) {
          action(event, props.searchType);
        } else {
          action(event);
        }
      }} 
      onKeyDown={(event) => {
        if (props.searchType) {
          action(event, props.searchType);
        } else {
          action(event);
        }
      }} 
      value={value} 
      className={className} 
      borderRadius={borderRadius} 
      color={color} 
      bg={bg} 
      placeholder={placeholder} 
      type={type} 
      minLength={minLength}
      maxLength={maxLength}
      borderColor={borderColor} 
    />
  );
};

Input.defaultProps = {
  color: colors.black,
  bg: colors.white,
  placeholder: '',
  value: '',
  type: '',
  borderColor: colors.white,
  borderRadius: 0
};
