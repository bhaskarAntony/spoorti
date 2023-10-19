import React from 'react';
import { Breadcrumb, Text } from '../components/atoms';
import languageEn from "../data/language_en.json";
import language_ka from "../data/language_ka.json";
import { CommonWrapper } from '../components/views/CommonWrapper';
import { ContentWrapper } from './Training';
import { useSelector } from "react-redux";

export const Accessibility = (props) => {
  const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;

  return <CommonWrapper customContClass="contactus-page">
    <ContentWrapper>
      <Breadcrumb currentPageName={language.accessiblity.headingLabel} />
      <Text tag="h3" text={language.accessiblity.headingLabel} className="static-page-heading" />
      {language.accessiblity.descriptionList.map((item, index) => {
        return (
          <Text key={index} tag="p" text={item} className="static-page-desc" />
        )}
      )}
      
      <table className='static-table'>
        <thead>
          <tr>
            <th>Document Type </th>
            <th>Download</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              Non Visual Desktop
              <br />
              Access (NVDA)
            </td>
            <td>http://www.nvda-project.org/(External website that opens in a new window)</td>
          </tr>
          <tr>
            <td>JAWS </td>
            <td>http://www.freedomscientific.com(External website that opens in new window) </td>
          </tr>
          <tr>
            <td>Window-Eyes</td>
            <td>http://www.gwmicro.com(External website that opens in a new window) </td>
          </tr>
          <tr>
            <td>PowerPoint presentations  </td>
            <td>http://www.satogo.com/(External website that opens in a new window)</td>
          </tr>
          <tr>
            <td>Audio Files</td>
            <td>http://webinsight.cs.washington.edu/(External website that opens in a new window)</td>
          </tr>
        </tbody>
      </table>
    </ContentWrapper>
  </CommonWrapper>
};

export default Accessibility;
