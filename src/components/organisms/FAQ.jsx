import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts, size } from '../../theme';
import { Text } from '../atoms';
import { getService } from '../../service.js';
import { apiList } from '../../util/apiList';
import { FAQAccordion } from '../molecules';
import { useSelector } from 'react-redux';
import FaqList from '../../data/faqList.json'

export const FAQWrapper = styled.section`
  background: transparent;
  width: 100%;
  margin: 0 auto;

  @media ${device.laptop} { 
    max-width: ${size.laptopM};
  }

  .faq-heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 12}px`};
    line-height: 29px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.faq.accordionFontColor};
    margin: 65px auto 30px; 
  }
`;

export const FAQ = ({ ...props }) => {
  const [responseData, setResponseData] = useState({});
  const [loading, setLoading] = useState(true);
  const { selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  const fetch = async () => {
    //const data = await getService(apiList.faq);
    setResponseData(FaqList.faq);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (!loading)
    return (
      <FAQWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Text tag="h3" text="FAQ’S" className="faq-heading" />
        {responseData.map((item, index) => {
          const collapsed = index >= 0 && responseData.length > 0;
          return (
            <FAQAccordion item={item} key={index} collapse={collapsed} />
          );
        })}
      </FAQWrapper>

    );

};

FAQ.defaultProps = {};
