import React from 'react';
import { Breadcrumb } from '../components/atoms';
import { FAQ } from '../components/organisms';
import { CommonWrapper } from '../components/views/CommonWrapper';
import { ContentWrapper } from './Training';

export const FAQS = (props) => {
  return <CommonWrapper customContClass="contactus-page">
    <ContentWrapper>
      <Breadcrumb currentPageName="FAQ" />
      <FAQ />
    </ContentWrapper>
  </CommonWrapper>
};

export default FAQS;
