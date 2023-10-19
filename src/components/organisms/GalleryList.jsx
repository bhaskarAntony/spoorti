import React from 'react';
import styled from 'styled-components/macro';
import { device, size } from '../../theme';
import { Image } from '../atoms';
import gallery_1 from "../../assets/images/gallery_1.png";
import gallery_1_2x from "../../assets/images/gallery_1_2x.png";
import gallery_1_3x from "../../assets/images/gallery_1_3x.png";
import gallery_2 from "../../assets/images/gallery_2.png";
import gallery_2_2x from "../../assets/images/gallery_2_2x.png";
import gallery_2_3x from "../../assets/images/gallery_2_3x.png";
import gallery_3 from "../../assets/images/gallery_3.png";
import gallery_3_2x from "../../assets/images/gallery_3_2x.png";
import gallery_3_3x from "../../assets/images/gallery_3_3x.png";

export const GalleryListWrapper = styled.section`
  width: 100%;
  margin: 75px auto 200px;
  display: flex;
  justify-content: space-between;
  max-width: calc(100% - 110px);
  
  @media ${device.laptop} { 
    max-width: ${size.laptopM};
  }
  
  .gallery_image{
    margin-bottom: 35px;
  }

  .gallery_image_cont img{
    max-height: 265px;
  }
`;

export const GalleryImageWrapper = styled.div`
  width: calc((100% - 60px) / 3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const GalleryList = () => {
  return (
    <GalleryListWrapper>
      <GalleryImageWrapper >
        <Image className="gallery_image" mobilesrcfile={gallery_1} tabletsrcfile={gallery_1_2x} desktopsrcfile={gallery_1_3x}/>
        <Image mobilesrcfile={gallery_2} tabletsrcfile={gallery_2_2x} desktopsrcfile={gallery_2_3x}/>
      </GalleryImageWrapper>
      <GalleryImageWrapper className='gallery_image_cont'>
        <Image className="gallery_image" mobilesrcfile={gallery_3} tabletsrcfile={gallery_3_2x} desktopsrcfile={gallery_3_3x}/>
        <Image className="gallery_image" mobilesrcfile={gallery_3} tabletsrcfile={gallery_3_2x} desktopsrcfile={gallery_3_3x}/>
        <Image mobilesrcfile={gallery_3} tabletsrcfile={gallery_3_2x} desktopsrcfile={gallery_3_3x}/>
      </GalleryImageWrapper>
      <GalleryImageWrapper>
        <Image className="gallery_image" mobilesrcfile={gallery_1} tabletsrcfile={gallery_1_2x} desktopsrcfile={gallery_1_3x}/>
        <Image mobilesrcfile={gallery_2} tabletsrcfile={gallery_2_2x} desktopsrcfile={gallery_2_3x}/>
      </GalleryImageWrapper>
    </GalleryListWrapper>
  );
};

GalleryList.defaultProps = {};
