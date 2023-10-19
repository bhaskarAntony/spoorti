import React, { useState } from 'react'
import userImage1 from '../../assets/images/contacts/contact_1.jpg'
import userImage2 from '../../assets/images/contacts/contact_2.jpg'
import userImage3 from '../../assets/images/contacts/contact_3.jpg'
import userImage4 from '../../assets/images/contacts/contact_4.jpg'
import { colors, device, fonts } from '../../theme';
import styled from 'styled-components/macro';
import { Image, Text } from '../atoms';
import { useSelector } from 'react-redux';
import banner from '../../assets/images/aboutus/smwaus_2.jpg'


export const ContactDirectoryWithImageWrapper = styled.div`
width: 100%;
display: flex;
justify-content: space-around;
margin-top: 20px;
flex-direction column-reverse;
align-items: center;

@media ${device.laptop} {
  flex-direction: ${(props) => `${props.reverse ? 'row-reverse' : 'row'}`};
}

.card-list-heading{
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 600;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
  line-height: ${(props) => `${fonts.size[props.selectedFontSize] * 11}px`};
  letter-spacing: -0.24px;
  color: ${(props) => colors[props.selectedTheme]?.card.fontColor};
  
}

.card-desc{
  font-family: ${fonts.default};
  font-style: normal;
  font-weight: 400;
  font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 7}px`};
  line-height: 161.52%;
  letter-spacing: -0.24px;
  color: ${(props) => colors[props.selectedTheme]?.card.fontColor};
  margin: 0 0 25px;

  &:last-child{
    margin-bottom: 0;
  }
}

.card-image{
  max-height: 400px;
  object-fit: cover;
}
`;


export const ContactDirectoryContentWrapper = styled.div`
display: flex;
text-align: center;
flex-direction: column;

`;

export const ContactDirectorySecondaryWrapper = styled.div`
margin-top: 25px;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;

@media ${device.laptop} {
  flex-direction: ${(props) => `${props.reverse ? 'row' : 'row-reverse'}`};
}

.img_content {
  border-radius: 50%;
  height: 200px;
  width: 200px;
  margin-top: 10px;
  object-fit: cover;
  object-position: 50% 0%;
  

  @media ${device.laptop} {
    height: 230px;
    width: 230px;
    margin-top: 1px;
  }
}
`;



export const UserInfoTextContWrapper = styled.div`
  .user-info-name, .user-info-designation{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 8}px`};
    line-height: 10px;
    letter-spacing: 0.2px;
    margin-top: 5px;
    color: ${(props) => colors[props.selectedTheme]?.homeContent.fontColor};

    @media ${device.laptop} {
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 16}px`};
    }
  }

  .user-info-designation{
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 6}px`};
    line-height: 10px;
    margin-top: 5px;

    @media ${device.laptop} {
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 12}px`};
      margin-top: 25px;
    }
  }

  .user-info-email{
    font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 4}px`};
    line-height: 10px;
    margin-top: 5px;

    @media ${device.laptop} {
      font-size: ${(props) => `${fonts.size[props.selectedFontSize] * 10}px`};
      margin-top: 25px;
    }
  }
`;

export const ContactDirectoriesWithImages = () => {
  const { selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

  const [contacts] = useState([
    { designation: "Honorable President", name: "Sri Alok Mohan, IPS.", phoneNumber: "+91 1234567890", userImage: userImage1 },
    { designation: "President", name: "Sri B Dayanand, IPS.", phoneNumber: "+91 9876543210", userImage: userImage2 },
    { designation: "Secretary", name: "Sri Ramakrishna Prasad.", phoneNumber: "+91 4567891230", userImage: userImage3 },
    { designation: "Mess Officer", name: "Sri N S Prakash. ", phoneNumber: "+91 9480805826", userImage: userImage4 }
  ]);

  return (
     <ContactDirectoryContentWrapper>
        {contacts.map((contact, index) => (
          <ContactDirectorySecondaryWrapper reverse = {index%2 === 0 ? true : false}>
            <img className="img_content" src={contact.userImage} />
            <UserInfoTextContWrapper selectedTheme={selectedTheme} selectedFontSize={selectedFontSize}>
              <Text className="user-info-name" tag="h5" text={contact.name} />
              <Text className="user-info-designation" tag="h6" text={contact.designation} />
              <Text className="user-info-email" tag="label" text={contact.phoneNumber} />
            </UserInfoTextContWrapper>
          </ContactDirectorySecondaryWrapper>
        ))}
      </ContactDirectoryContentWrapper>
  )
}
