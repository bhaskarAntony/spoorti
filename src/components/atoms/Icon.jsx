import * as React from 'react';
import styled, { css } from 'styled-components/macro';
import { respCss } from '../../helper';

import { EyeStrike, Call, Mail, CopyRights,
        ArrowRight, ArrowDown, Locator, Eye,
        Meeting, ScheduleMeeting, Training, Plans, 
        Calendar, HamBurgerMenu, Close, MoreOption, 
        Table, TableSlash, Whatsapp } from '../../assets/custom-icons';
        

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => (props.mr ? `${props.mr}px` : 0)};
  margin-left: ${(props) => (props.ml ? `${props.ml}px` : 0)};
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  ${css`
    ${(props) => respCss('height', props.height)}
  `}

  ${css`
    ${(props) => respCss('width', props.width)}
  `}

  svg {
    display: block;
    width: 100%;
  }
`;

export const Icon = (props) => {
  const components = {
    eyeStrike: EyeStrike,
    call: Call,
    mail: Mail,
    copyRights: CopyRights,
    arrowRight: ArrowRight,
    arrowDown: ArrowDown,
    locator: Locator,
    eye: Eye,
    meeting: Meeting, 
    scheduleMeeting: ScheduleMeeting, 
    training: Training, 
    plans: Plans,
    calendar: Calendar,
    hamBurgerMenu: HamBurgerMenu,
    close: Close,
    moreOption: MoreOption,
    table: Table,
    tableSlash: TableSlash,
    whatsapp: Whatsapp,
  };

  const Icon = components[props.name];

  return (
    <IconWrapper
      mt={props.mt}
      mr={props.mr}
      ml={props.ml}
      width={props.width}
      height={props.height}
      className={props.className}
      onClick={props.action}
    >
      <Icon {...props} />
    </IconWrapper>
  );
};

Icon.defaultProps = {
  height: '24px',
  width: '24px',
  className: '',
  playerLength: 2
};
