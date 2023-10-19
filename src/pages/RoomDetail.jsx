import React, { useState } from 'react';
import { FileUploader } from "react-drag-drop-files";
import styled from 'styled-components/macro';
import { colors, fonts } from '../theme';
import { SignInWrapper } from '../components/views/SignInWrapper';
import { Button, Image, Text } from '../components/atoms';

export const ContentContWrapper = styled.section`
  background: ${colors.white};
  padding: 0 30px 30px;
`;

export const ContentInnerWrapper = styled.section`
  padding: 0 50px;
  position: relative;

  .room-detail-heading{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 27px;
    display: flex;
    align-items: center;
    text-align: center;
    color: ${colors.veryDarkGray};
  }

  .room-update{
    background: ${colors.darkBlue};
    border-radius: 8px;
    padding: 15px 25px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.2px;
    color: ${colors.white};
    margin-left: auto;
    margin-right: 20px;
    border: solid 2px ${colors.darkBlue};
    &:hover{
      background: ${colors.white};
      color: ${colors.darkBlue};
    }
  }

  .room-discard{
    background: ${colors.veryLightGray};
    border-radius: 8px;
    padding: 15px 25px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 0.2px;
    color: ${colors.black};
    border: solid 2px ${colors.veryLightGray};
    &:hover{
      background: ${colors.white};
      color: ${colors.darkBlue};
    }
  }

  .room-detail-sub-heading{
    margin: 30px 0 15px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.24px;
    color: ${colors.black};
  }

  .room-detail-desc{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 161.52%;
    letter-spacing: -0.24px;
    color: ${colors.black};
  }
`;

export const ContentHeaderWrapper = styled.div`
  padding: 80px 0 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RoomContentWrapper = styled.div`
  display: flex;
  label{
    width: 200px;
    height: 200px;
  }
`;

export const RoomContentImageListContWrapper = styled.div`
  max-width: 75%;
  margin-right: 20px;
  overflow: auto;
`;

export const RoomContentImageListWrapper = styled.div`
  margin-right: 20px;
  width: 200px;
  height: 200px;
  overflow: hidden;
  float: left;

  .room-detail-image{
    object-fit: cover;
    width: 200px;
    height: 200px;
  }
`;

export const RoomDetail = (props) => {
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [fileList, setFileList] = useState(null);
  const handleChange = (file) => {
    setFileList(file);
    console.log('file', file);
  };

  return <SignInWrapper>
      <ContentContWrapper>
        <ContentInnerWrapper>
          <ContentHeaderWrapper>
            <Text className="room-detail-heading" tag="h3" text="Family Room" />
            <Button className="room-update" text="Update"/>
            <Button className="room-discard" text="Discard"/>
          </ContentHeaderWrapper>
          <RoomContentWrapper>
            <RoomContentImageListContWrapper>
            {fileList && Object.keys(fileList).map(key => {
              const objectUrl = URL.createObjectURL(fileList[key]);
              return (
                <RoomContentImageListWrapper>
                  <Image className="room-detail-image" mobilesrcfile={objectUrl} tabletsrcfile={objectUrl} desktopsrcfile={objectUrl}/>
                </RoomContentImageListWrapper>
              )}
            )}
              
            </RoomContentImageListContWrapper>
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </RoomContentWrapper>
          {/* <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p> */}
          <Text className="room-detail-sub-heading" tag="h4" text="Amenities" />
          <Text className="room-detail-desc" tag="p" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing  Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing " />
        </ContentInnerWrapper>
      </ContentContWrapper>
  </SignInWrapper>;
};

export default RoomDetail;
