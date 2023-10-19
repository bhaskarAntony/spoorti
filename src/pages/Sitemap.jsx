import React from 'react';
import styled from 'styled-components/macro';
import { Breadcrumb, Text } from '../components/atoms';
import languageEn from "../data/language_en.json";
import language_ka from "../data/language_ka.json";
import { CommonWrapper } from '../components/views/CommonWrapper';
import { ContentWrapper } from './Training';
import { useSelector } from "react-redux";
import { colors, fonts } from '../theme';

export const SiteMapListCont = styled.ul`
  margin: 0;
  padding-left: 20px;
`;

export const SiteMapList = styled.li`
  list-style: disc;
  color: ${(props) => colors[props.selectedTheme]?.sitemapFontColor};
  line-height: ${(props) => `${fonts.size[props.selectedFontSize] * 12}px`};
`;

export const SiteMapListLink = styled.a`
  font-family: ${fonts.default}
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
  line-height: ${(props) => `${fonts.size[props.selectedFontSize] * 12}px`};
  letter-spacing: -0.24px;
  color: ${(props) => colors[props.selectedTheme]?.sitemapFontColor};
`;

export const Sitemap = (props) => {
  const { selectedLanguage, selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;

  return <CommonWrapper customContClass="contactus-page">
    <ContentWrapper>
      <Breadcrumb currentPageName={language.sitemap.headingLabel} />
      <Text tag="h3" text={language.sitemap.headingLabel} className="static-page-heading" />
      <SiteMapListCont>
        {language.sitemap.list.map((item, index) => {
          return (<SiteMapList key={index} selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
            <SiteMapListLink selectedTheme={selectedTheme} href={item.redirect} title={item.label} selectedFontSize={selectedFontSize}>{item.label}</SiteMapListLink>
          </SiteMapList>
          )}
        )}
      </SiteMapListCont>
    </ContentWrapper>
  </CommonWrapper>
};

export default Sitemap;
