import * as React from 'react';
import styled from 'styled-components/macro';

export const ArrowWrapper = styled.div`
  ${(props) =>
    props.direction === 'up' &&
    `
    border-left: ${props.size} solid transparent;
    border-right: ${props.size} solid transparent;
    border-bottom: ${props.size} solid ${props.color};
    `}
  
  ${(props) =>
    props.direction === 'down' &&
    `
    border-left: ${props.size} solid transparent;
    border-right: ${props.size} solid transparent;
    border-top: ${props.size} solid ${props.color};
    `}
  
  ${(props) =>
    props.direction === 'left' &&
    `
    border-right: ${props.size} solid ${props.color};
    border-top: ${props.size} solid transparent;
    border-bottom: ${props.size} solid transparent;
    `}
  
  ${(props) =>
    props.direction === 'right' &&
    `
    border-left: ${props.size} solid ${props.color};
    border-top: ${props.size} solid transparent;
    border-bottom: ${props.size} solid transparent;
    `}
`;

export const Arrow = (props) => {
  return (
    <ArrowWrapper
      direction={props.direction}
      color={props.color}
      size={props.size}
      className={props.className}
    />
  );
};

Arrow.defaultProps = {
  direction: '',
  color: '',
  size: '10px',
  className: ''
};
