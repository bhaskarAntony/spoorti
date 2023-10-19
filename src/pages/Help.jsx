import React from 'react';
import { Breadcrumb, Text } from '../components/atoms';
import languageEn from "../data/language_en.json";
import language_ka from "../data/language_ka.json";
import { CommonWrapper } from '../components/views/CommonWrapper';
import { ContentWrapper } from './Training';
import { useSelector } from "react-redux";

export const Help = (props) => {
  const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;

  return <CommonWrapper customContClass="contactus-page">
    <ContentWrapper>
      <Breadcrumb currentPageName={language.help.headingLabel} />
      <Text tag="h3" text={language.help.headingLabel} className="static-page-heading" />
      {language.help.descriptionList.map((item, index) => {
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
            <td>PDF content</td>
            <td>Adobe Acrobat Reader</td>
          </tr>
          <tr>
            <td>Word files </td>
            <td>
              Word Viewer 
              <br/>
              Microsoft Office Compatibility Pack for Word (for 2007 version)
            </td>
          </tr>
          <tr>
            <td>Excel files </td>
            <td>
              Excel Viewer
              <br />
              Microsoft Office Compatibility Pack for Excel (for 2007version) 
            </td>
          </tr>
          <tr>
            <td>PowerPoint presentations  </td>
            <td>
              PowerPoint Viewer
              <br />
              Microsoft Office Compatibility Pack for PowerPoint (for 2007version)
            </td>
          </tr>
          <tr>
            <td>Audio Files</td>
            <td>Adobe Acrobat Reader</td>
          </tr>
        </tbody>
      </table>
    </ContentWrapper>
  </CommonWrapper>
};

export default Help;
