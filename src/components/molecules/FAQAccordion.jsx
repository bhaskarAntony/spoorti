import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';
import { Icon, Text } from '../atoms';

export const FAQListWrapper = styled.div`
  background: ${(props) => colors[props.selectedTheme]?.faq.accordionBG};
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const FAQListAccordianWrapper = styled.div`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
  line-height: 161.52%;
  letter-spacing: -0.24px;
  color: ${(props) => colors[props.selectedTheme]?.faq.accordionFontColor};
  padding: 20px 50px;
  cursor: pointer;
  display: flex;

  .faq-accordian-heading {
    width: 100%;
    // max-width: 540px;
  }

  &.accordian-expanded{
    background: ${(props) => colors[props.selectedTheme]?.faq.accordionExpandedBG};
    color: ${(props) => colors[props.selectedTheme]?.faq.accordionFontColor};
    border-radius: 8px;
  }
`;

export const FAQListAccordianDetailWrapper = styled.div`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
  line-height: 161.52%;
  letter-spacing: -0.24px;
  color: rgba(0, 0, 1, 0.8);
  padding: 20px 40px;
  // min-height: 100px;
  width: 100%;
  // max-width: 570px;

  .faq-accordian-detail{
    color: ${(props) => colors[props.selectedTheme]?.faq.accordionFontColor};
  }
`;

export const FAQAccordion = ({ item, collapse, ...props }) => {
  const [isActive, setIsActive] = useState(collapse);
  const { selectedTheme, selectedFontSize, selectedLanguage } = useSelector(({ common }) => ({ ...common }));

  return (
    <FAQListWrapper selectedTheme={selectedTheme}>
      <FAQListAccordianWrapper selectedTheme={selectedTheme} className={!isActive ? "accordian-expanded" : ""} onClick={() => setIsActive(!isActive)} selectedFontSize={selectedFontSize}>
        <Text tag="h4" text={selectedLanguage === "en_in" ? item.query_en : item.query_ka} className="faq-accordian-heading" />
        <Icon name={isActive ? "arrowRight" : "arrowDown"} color={colors[selectedTheme]?.faq.accordionFontColor} />
      </FAQListAccordianWrapper>
      {!isActive && <FAQListAccordianDetailWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Text className="faq-accordian-detail" text={selectedLanguage === "en_in" ? item.answer_en : item.answer} tag="p" />
      </FAQListAccordianDetailWrapper>}
    </FAQListWrapper>
  );
};

FAQAccordion.defaultProps = {};
