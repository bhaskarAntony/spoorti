import React from 'react';
import { Breadcrumb, Text } from '../components/atoms';
import { CommonWrapper } from '../components/views/CommonWrapper';
import { ContentWrapper } from './Training';
import languageEn from "../data/language_en.json";
import language_ka from "../data/language_ka.json";
import { useSelector } from "react-redux";

export const TermsConditions = (props) => {
  const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;

  return <CommonWrapper customContClass="contactus-page">
      <ContentWrapper>
        <Breadcrumb currentPageName={language.termsNConditions.headingLabel} />
        <Text tag="h3" text={language.termsNConditions.headingLabel} className="static-page-heading" />
        {language.termsNConditions.descriptionList.map((item, index) => {
          return (
            <Text key={index} tag={item.labelType === "heading" ? "h4" : "p"} text={item.labeltext} className={item.labelType === "heading" ? "static-page-sub-heading" : "static-page-desc mar-bot-0"} />
          )}
        )}
      </ContentWrapper>
    </CommonWrapper>
};

export default TermsConditions;
