import React from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts, size } from '../../theme';
import { Icon, Text } from '../atoms';
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";
import { useSelector } from "react-redux";

export const FooterWrapper = styled.footer`
  background: ${(props) => colors[props.selectedTheme]?.footer.bg};
  color: ${(props) => colors[props.selectedTheme]?.footer.fontColor};
  width: 100%;
  margin: 0px 0 -10px;

  .footer-logo{
    width: 50px;
    margin: 0 auto;
  }

  .footer-design-text{
    margin-bottom: 5px;
  }

  .footer-design-text, .footer-design-company{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.footer.fontColor};
  }

  .footer-design-company{
    font-weight: 700;
    font-size: 16px;
  }

  .footer-content-owned-text{
    font-family: ${fonts.default}
    font-style: normal;
    font-weight: 500;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 17px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.footer.fontColor};
    margin-bottom: 5px;
    
    &:last-child{
      margin-bottom: 0;
    }

    @media ${device.laptop} {
      margin-bottom: 0px;
    }
  }

  .footer-hosted-text{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: ${(props) => `${fonts.size[props.selectedFontSize] * 10}px`};
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.footer.hostedFontColor};
    text-align: left;
    padding: 15px 30px;
    background: ${(props) => colors[props.selectedTheme]?.footer.hostedBG};

    @media ${device.laptop} {
      padding: 15px 65px;
      text-align: center;
    }
  }
`;

export const FooterInnerWrapper = styled.div`
  max-width: ${size.laptopM};
  display: flex;
  margin: 0 auto 15px;
  justify-content: space-between;
  padding: 15px;
  flex-wrap: wrap;

  @media ${device.laptop} {
    padding: 25px 65px;
    padding-bottom: 0px
    margin: 0 auto 25px;
    margin-bottom: 0px;
  }
`;

export const FooterListWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  &:last-child{
    margin-bottom: 0px;
  }

  @media ${device.laptop} {
    width: calc((100% - 50px) / 3);
    margin-bottom: 0px;
    border-right: 1px solid #fff;
    padding-right: 5px;
  }
  
  &.footer_copyrights_cont{
    display: flex;
    align-items: center;
  }

  .footer_heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
    line-height: 17px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.footer.fontColor};
    margin-bottom: 15px;
  }

  .footer_desc{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 161.52%;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.footer.fontColor};
  }
`;

export const FooterListWrapperNoDivider = styled.div`
  width: 100%;
  margin-bottom: 20px;

  &:last-child{
    margin-bottom: 0px;
  }

  @media ${device.laptop} {
    width: calc((100% - 50px) / 3);
    margin-bottom: 0px;
  }
  
  &.footer_copyrights_cont{
    display: flex;
    align-items: center;
  }

  .footer_heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
    line-height: 17px;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.footer.fontColor};
    margin-bottom: 15px;
  }

  .footer_desc{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 161.52%;
    letter-spacing: -0.24px;
    color: ${(props) => colors[props.selectedTheme]?.footer.fontColor};
  }
`;

export const FooterLinkListContWrapper = styled.ul`
  margin: 0 auto;
  display: flex;
  padding: 0;
  flex-wrap: wrap;
`;

export const FooterLinkListWrapper = styled.li`
  width: 100%;
  margin-bottom: 5px;
`;

export const FooterListLinkWrapper = styled.a`
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
  line-height: 161.52%;
  letter-spacing: -0.24px;
  color: ${(props) => colors[props.selectedTheme]?.footer.fontColor};
  display: flex;
  flex-wrap: wrap;

  .footer-contact-link-text {
    margin-left: 15px;
    width: 85%;
  }
`;

export const FooterBottomtWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
  max-width: 100%;
  flex-direction: column;

  @media ${device.laptop} {
    padding: 15px 65px;
    max-width: ${size.laptopM};
    margin: 0 auto;
    flex-direction: row;
  }
`;

export const Footer = () => {
  const { selectedLanguage, selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));
  const language = selectedLanguage === 'en_in' ? languageEn : language_ka;
  
  return (
    <FooterWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
      <FooterInnerWrapper>
        <FooterListWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
          <Text className="footer_heading" text={language.footer.quickLinks.label} tag="h5" />
          <FooterLinkListContWrapper>
            {language.footer.quickLinks.list.map((item, index) => {
              return (
                <FooterLinkListWrapper key={index}>
                  <FooterListLinkWrapper href={item.redirectionPath} title={item.label} selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
                    {item.label}
                  </FooterListLinkWrapper>
                </FooterLinkListWrapper>
              )}
            )}
          </FooterLinkListContWrapper>
        </FooterListWrapper>

        <FooterListWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
          <Text className="footer_heading" text={language.footer.disclaimerLabel} tag="h5" />
          <Text className="footer_desc" text={language.footer.disclaimerDescription} tag="p" />
        </FooterListWrapper>
        
        <FooterListWrapperNoDivider selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
          <Text className="footer_heading" text={language.footer.contactUsLabel} tag="h5" />
          <FooterLinkListContWrapper>
            <FooterLinkListWrapper>
              <FooterListLinkWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize} href={`tel:${language.contactMobile}`} title={language.contactMobile}>
                <Icon name="call" color={colors[selectedTheme]?.footer.fontColor} />
                <Text className="footer-contact-link-text" tag="span" text={language.contactMobile} />
              </FooterListLinkWrapper>
            </FooterLinkListWrapper>
            <FooterLinkListWrapper>
              <FooterListLinkWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize} href={`tel:${language.contactMobile}`} title={language.contactMobile}>
                <Icon name="whatsapp" color={colors[selectedTheme]?.footer.fontColor} />
                <Text className="footer-contact-link-text" tag="span" text={language.contactMobile} />
              </FooterListLinkWrapper>
            </FooterLinkListWrapper>
            <FooterLinkListWrapper>
              <FooterListLinkWrapper  selectedTheme={selectedTheme} selectedFontSize={selectedFontSize} href={`mailto:${language.contactEmail}`} title={language.contactEmail}>
                <Icon name="mail" color={colors[selectedTheme]?.footer.fontColor} />
                <Text className="footer-contact-link-text" tag="span" text={language.contactEmail} />
              </FooterListLinkWrapper>
            </FooterLinkListWrapper>
            <FooterLinkListWrapper>
              <FooterListLinkWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize} href="/contact_us" title={language.footer.contactUsLabel}>
                {language.contactAddress.map((item, index) => {
                  return (
                    <>
                      <Icon name="locator" color={index === 0 ? colors[selectedTheme]?.footer.fontColor : colors.transparent} />
                      <Text className="footer-contact-link-text" tag="span" text={item} />
                    </>
                  )}
                )}
              </FooterListLinkWrapper>
            </FooterLinkListWrapper>
          </FooterLinkListContWrapper>
        </FooterListWrapperNoDivider>
      </FooterInnerWrapper>

      <Text className="footer-hosted-text" tag="h1" text={`${language.footer.hostedBy.label}${language.footer.hostedBy.value}`} />

      <FooterBottomtWrapper selectedTheme={selectedTheme}>
        <Text className="footer-content-owned-text" tag="h1" text={`${language.footer.contentOwned.label}${language.footer.contentOwned.value}`} />
        <Text className="footer-content-owned-text" tag="h1" text={`${language.footer.lastUpdated} 10-October-2023 11:10 AM Version:1.0`} />
      </FooterBottomtWrapper>
    </FooterWrapper>
  );
};

Footer.defaultProps = {};
