import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { colors, fonts } from '../../theme';
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";
import { Text } from './Text';

export const BreadcrumbWrapper = styled.section`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
  line-height: 16px;
  letter-spacing: -0.24px;
  color: ${(props) => colors[props.selectedTheme]?.breadcrumb.textColor};
  margin: 60px auto 0px;
  display: flex;
  justify-content: flex-end;

  .breadcrumb-slash{
    color: ${(props) => colors[props.selectedTheme]?.breadcrumb.textColor};
    margin: 0 3px;
  }
`;

export const BreadcrumbParentLintWrapper = styled.a`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
  line-height: 16px;
  letter-spacing: -0.24px;
  color: ${(props) => colors[props.selectedTheme]?.breadcrumb.linkColor};
`;

export const Breadcrumb = ({parentPageList = [], currentPageName = ''}) => {
  const { selectedLanguage, selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;
  parentPageList = window.location.search ? language.eventBreadcrumb : language.breadcrumb;

  return (
    <BreadcrumbWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
      {parentPageList.map((item, index) => {
        return (<>
            <BreadcrumbParentLintWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize} key={index} href={item.pageLink} title={item.pageName}>{item.pageName}</BreadcrumbParentLintWrapper>
            {index !== (parentPageList.length - 1) && <Text className='breadcrumb-slash' tag='span' text='/' />}
          </>
        )}
      )}
      {currentPageName && <Text className='breadcrumb-slash' tag='span' text='/' />} 
      {currentPageName}
    </BreadcrumbWrapper>
  );
};
