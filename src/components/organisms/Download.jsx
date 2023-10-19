import React from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts, size } from '../../theme';
import { Button, Image, Text } from '../atoms';
import app_download_bg from "../../assets/images/app_download_bg.svg";
import download from "../../assets/images/download.svg";
import download_mobile from "../../assets/images/download_mobile.png";
import download_mobile_2x from "../../assets/images/download_mobile_2x.png";
import download_mobile_3x from "../../assets/images/download_mobile_3x.png";
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";
import { useSelector } from "react-redux";

export const DownloadWrapper = styled.section`
  width: 100%;
  background: url(${app_download_bg}) bottom right no-repeat ${colors.vividOrange};
  padding: 100px 0;
  position: relative;
  margin-top: 350px;

  + footer{
    margin-top: 0;
  }

  .app-download-image{
    position: absolute;
    right: 0;
    bottom: 0;
    height: auto;
    width: 70%;
  }
`;

export const DownloadInnerWrapper = styled.div`
  max-width: calc(100% - 110px);
  display: flex;
  margin: 0 auto;
  
  @media ${device.laptop} { 
    max-width: ${size.laptopM};
  }
`;

export const DownloadleftWrapper = styled.div`
  width: 500px;

  .app-download-heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
    letter-spacing: -0.24px;
    color: ${colors.black};
    margin-bottom: 25px;
  }

  .app-download-desc{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 161.52%;
    letter-spacing: -0.231956px;
    color: ${colors.veryDarkGrayRed};
    margin-bottom: 25px;
  }

  .app-download-btn{
    background: url(${download}) 25px center no-repeat ${colors.black};
    border-radius: 8px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    color: ${colors.white};
    text-transform: none;
    padding-left: 60px;
  }
`;

export const Download = () => {
  const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;
  return (
    <DownloadWrapper>
      <DownloadInnerWrapper>
        <DownloadleftWrapper>
          <Text tag="h5" text={language.appDownload.headingLabel} className="app-download-heading" />
          <Text className="app-download-desc" tag="p" text={language.appDownload.description} />
          <Button text={language.appDownload.buttonText} className="app-download-btn" />
        </DownloadleftWrapper>
      </DownloadInnerWrapper>
      <Image className="app-download-image" mobilesrcfile={download_mobile} tabletsrcfile={download_mobile_2x} desktopsrcfile={download_mobile_3x}/>
    </DownloadWrapper>
  );
};

Download.defaultProps = {};
