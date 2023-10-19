import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Footer, Header, HeaderNav, SliderCarousel } from '../organisms';
import { useSelector } from "react-redux";
import CircularImageCard from '../organisms/CircularImageCard';
import userImage1 from '../../assets/images/user_image_3.png'
import userImage2 from '../../assets/images/user_image_4.png'
import styled from 'styled-components/macro';
import {  device, } from '../../theme';

export const CarouselContentWrapper = styled.div`

position: relative;

.user-info-left{
    width: 200px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media ${device.laptop} {
      width: 350px;
    }
  }

  .user-info-right{
    width: 200px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    @media ${device.laptop} {
       width: 350px;
     }
  }

`;

export const CommonWrapper = ({ children, pagename, pagedesc = "", bannerImages, bannerSlider, ...props }) => {
    const { selectedTheme, selectedFontSize } = useSelector(({ common }) => ({ ...common }));

    return <Box sx={{ flexGrow: 1 }}>
        <Grid className={`overall_container ${props.customContClass}`} container spacing={2}>
            <Grid item xs={12} md={12} className={`${selectedTheme === 'dark' ? 'overall-dark' : ''} overall-${selectedFontSize} overall-inner`}>
                <Header />
                {/* <HeaderInfo /> */}
                <HeaderNav />
                {bannerSlider && <SliderCarousel bannerSlider={bannerSlider} />
                    // <CarouselContentWrapper>
                    //     <CircularImageCard className="user-info-left" userImage={userImage1} userName={'Shri. Alok Mohan, IPS'} userDescription={'Director General & Inspector General of Police'} />
                    //     <CircularImageCard className="user-info-right" userImage={userImage2} userName={'Shri. B Dayanand, IPS'} userDescription={'Commisioner of Police Bangalore city'} />
                    //     {/* <img className='ImageSample' src={userImage} /> */}
                    //     {bannerSlider && <SliderCarousel bannerSlider={bannerSlider} />}

                    // </CarouselContentWrapper>
                }
                {children}
                <Footer />
            </Grid>
        </Grid>
    </Box>;
};

CommonWrapper.defaultProps = {};

export default CommonWrapper;
