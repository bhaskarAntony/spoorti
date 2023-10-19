import React from 'react';
import { CommonWrapper } from '../components/views/CommonWrapper';
import gallery_banner from "../assets/images/gallery_banner.png";
import gallery_banner_2x from "../assets/images/gallery_banner_2x.png";
import gallery_banner_3x from "../assets/images/gallery_banner_3x.png";
import { GalleryList } from '../components/organisms';

export const Gallery = (props) => {
  const bannerImages = {
    banner: gallery_banner,
    banner_2x: gallery_banner_2x,
    banner_3x: gallery_banner_3x,
  }
  return <CommonWrapper pagename="Gallery" bannerImages={bannerImages}>
      <GalleryList />
    </CommonWrapper>
};

export default Gallery;
