import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { colors, device, fonts, size } from '../../theme';
import { Button, Image, Input, Text } from '../atoms';
import languageEn from "../../data/language_en.json";
import language_ka from "../../data/language_ka.json";
import { useSelector } from "react-redux";
import { postService } from '../../service.js';
import { apiList } from '../../util/apiList';
import Swal from 'sweetalert2';
import ReCAPTCHA from "react-google-recaptcha";
import { getRecaptchaKey } from '../../util/environment';

export const EnquiryWrapper = styled.section`
  margin: 50px auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media ${device.laptop} { 
    max-width: ${size.laptopM};
    flex-direction: row;
  }
  
  [class*='Image__PictureWrapper'] {
    width: 100%;

    @media ${device.laptop} { 
      width: calc(50% - 55px);
    }
  }

`;

export const MapContentWrapper = styled.div`
width: 100%;

@media ${device.laptop} { 
  width: calc(50% - 55px);
}
  
.img_content {
  width: 100%;

  @media ${device.laptop} { 
    width: 100%;
    height: calc(100% - 55px);
    object-fit: cover!important;
  }

}
`;

export const EnquiryFormWrapper = styled.div`
  width: 100%;

  @media ${device.laptop} { 
    width: calc(50% - 55px);
  }
  
  .enquiry-heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 12}px`};
    line-height: 29px;
    color: ${(props) => colors[props.selectedTheme]?.contactUs.headingFontColor};
    margin-bottom: 15px;
  }
`;

export const EnquiryLabelListContWrapper = styled.ul`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const EnquiryLabelListWrapper = styled.li`
  width: 100%;
  margin-bottom: 15px;

  .enquiry-label {
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
    line-height: 19px;
    color: ${(props) => colors[props.selectedTheme]?.contactUs.labelFontColor};
    margin-bottom: 10px;
  }

  .enquiry-input{
    width: 100%;
    border: 1px solid ${colors.black};
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 300;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
    line-height: 17px;
    color: ${(props) => colors[props.selectedTheme]?.contactUs.fontColor};
    background: ${(props) => colors[props.selectedTheme]?.contactUs.inputBG};
    &::placeholder {
      color: ${(props) => colors[props.selectedTheme]?.contactUs.fontColor};
    }
  }

  .enquiry-submit-btn{
    background: ${(props) => colors[props.selectedTheme]?.contactUs.buttonBG};
    border-radius: 8px;
    width: 100%;
    text-transform: none;
    text-align: center;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
    line-height: 19px;
    color: ${(props) => colors[props.selectedTheme]?.contactUs.buttonFontColor};
  }

  .enquiry-submit-btn-disabled {
    background: ${(props) => colors[props.selectedTheme]?.contactUs.fontColor};
    border-radius: 8px;
    width: 100%;
    text-transform: none;
    text-align: center;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
    line-height: 19px;
    color: ${(props) => colors[props.selectedTheme]?.contactUs.buttonFontColor};
    cursor: auto;
  }
`;

export const EnquiryTextAreaWrapper = styled.textarea`
  border: 1px solid ${colors.black};
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
  border-radius: 8px;
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 300;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
  line-height: 17px;
  color: ${colors.darkGray};
  resize: none;
  padding: 15px;
  width: 100%;
  height: 150px;
  color: ${(props) => colors[props.selectedTheme]?.contactUs.fontColor};
  background: ${(props) => colors[props.selectedTheme]?.contactUs.inputBG};
  &::placeholder {
    color: ${(props) => colors[props.selectedTheme]?.contactUs.fontColor};
  }
`;

export const CaptchaWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
 
`;

export const Enquiry = ({ ...props }) => {
  const { selectedLanguage, selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));
  const { enquiryHeadingLabel, nameLabel, phoneNumberLabel,
    messgeLabel, typeNameLabel, typePhoneNumberLabel,
    typeMessageLabel, submitButtonText } = selectedLanguage === 'en_in' ? languageEn : language_ka;
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [enableButton, setEnabledButton] = useState(true);

  const submitEnquiry = async () => {
    if (name && phoneNumber && message) {
      console.log('name.length', name.length);
      if (name.length < 3) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, name minimum characters should be 4 & more',
          showConfirmButton: false,
          timer: 7000
        });
      } else if (phoneNumber.length < 10 && !isNaN(phoneNumber)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, phone number format (or) length is not correct',
          showConfirmButton: false,
          timer: 7000
        });
      } else if (message.length < 50) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong, message minimum characters should be 50 & more',
          showConfirmButton: false,
          timer: 7000
        });
      } else {
        const requestParam = {
          name: name,
          message: message,
          mobile: phoneNumber
        };
        const enquiry = await postService(apiList.enquiry, requestParam);
        if (enquiry[1]?.errors) {
          if (enquiry[1]?.errors?.name) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong, name minimum characters should be 4 & more',
              showConfirmButton: false,
              timer: 3000
            });
          } else if (enquiry[1]?.errors?.mobile) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong, phone number format (or) length is not correct',
              showConfirmButton: false,
              timer: 3000
            });
          } else if (enquiry[1]?.errors?.message) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong, message length should be more than 50',
              showConfirmButton: false,
              timer: 3000
            });
          }
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Information submitted successfully',
            showConfirmButton: false,
            timer: 3000
          });

          setName('');
          setPhoneNumber('');
          setMessage('');
        }
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, Please enter the details!',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  function recaptchaHandler(value) {
    setEnabledButton(false)
  }

  return (
    <EnquiryWrapper>
      <EnquiryFormWrapper action='#' selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
        <Text className="enquiry-heading" tag="h4" text={enquiryHeadingLabel} />
        <EnquiryLabelListContWrapper>
          <EnquiryLabelListWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
            <Text className="enquiry-label" tag="label" text={nameLabel} />
            <Input className="enquiry-input" minLength={4} action={(e) => setName(e.target.value)} value={name} type="text" placeholder={typeNameLabel} />
          </EnquiryLabelListWrapper>
          <EnquiryLabelListWrapper selectedTheme={selectedTheme}>
            <Text className="enquiry-label" tag="label" text={phoneNumberLabel} />
            <Input className="enquiry-input" minLength={10} maxLength={10} action={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} type="text" placeholder={typePhoneNumberLabel} />
          </EnquiryLabelListWrapper>
          <EnquiryLabelListWrapper selectedTheme={selectedTheme}>
            <Text className="enquiry-label" tag="label" text={messgeLabel} />
            <EnquiryTextAreaWrapper
              selectedTheme={selectedTheme}
              selectedFontSize={selectedFontSize}
              minLength="50"
              maxLength="250"
              onKeyPress={(e) => setMessage(e.target.value)}
              onKeyUp={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => setMessage(e.target.value)}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              placeholder={typeMessageLabel}
            />
          </EnquiryLabelListWrapper>
          <CaptchaWrapper>
            <ReCAPTCHA
              sitekey={getRecaptchaKey()}
              onChange={recaptchaHandler}
            />
          </CaptchaWrapper>
          <EnquiryLabelListWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
            <Button disabled={enableButton} text={submitButtonText} action={submitEnquiry} className={enableButton ? "enquiry-submit-btn-disabled" : "enquiry-submit-btn"} />
          </EnquiryLabelListWrapper>
        </EnquiryLabelListContWrapper>
      </EnquiryFormWrapper>
      <MapContentWrapper>
        <Text tag="h5" text={props.imageLabel} className="view_map_heading" />
        {/* <img className='img_content' src={props.sideImage} /> */}
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1944.0136828251436!2d77.6120953!3d12.970100700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1715a47fbf91%3A0x105bdbe2d51128a2!2sSenior%20Police%20Officer&#39;s%20Research%20and%20Training%20Institute%20(SPORTI)!5e0!3m2!1sen!2sbe!4v1697025115298!5m2!1sen!2sbe" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0001881500343!2d77.60762927822843!3d12.971839482262952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae16816f7febab%3A0xbc6b027c46838481!2sPrimrose%20Rd%2C%20Ashok%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560025%2C%20India!5e0!3m2!1sen!2sbe!4v1696963246481!5m2!1sen!2sbe" width="600" height="450" frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> */}

      </MapContentWrapper>

    </EnquiryWrapper>
  );
};

Enquiry.defaultProps = {};
