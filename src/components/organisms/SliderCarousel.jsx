import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Banner } from '../molecules';
import { useSelector } from "react-redux";
import Lightbox from 'react-image-lightbox';

export const SliderCarousel = ({ ...props }) => {
    const { selectedLanguage } = useSelector(({ common }) => ({ ...common }));

    const [isOpen, setIsopen] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)

    const bannerOnClickHandler = (index) => {
        setIsopen(true)
        setImageIndex(index)
    }

    return (
        <>
            <Carousel onClickItem={bannerOnClickHandler} className='slider-carousel' infiniteLoop="true" autoPlay="true" interval="5000">
                {props.bannerSlider.map((item, index) => {
                    const bannerImages = {
                        banner: item.image_url || item.url || item.events?.[0]?.url,
                        banner_2x: item.image_url || item.url || item.events?.[0]?.url,
                        banner_3x: item.image_url || item.url || item.events?.[0]?.url
                    };

                    return (
                        bannerImages.banner ? <Banner key={index}
                            pagename={(selectedLanguage === 'en_in' ? (item.caption_en || item.name_en) : (item.caption_ka || item.name_ka)) || ''}
                            pagedesc={(selectedLanguage === 'en_in' ? item.description_en : item.description_ka) || ''}
                            bannerImages={bannerImages}
                        /> : <div></div>
                    )
                }
                )}
            </Carousel>
            {isOpen && (
                <Lightbox
                    mainSrc={props?.bannerSlider[imageIndex].url}
                    nextSrc={props?.bannerSlider[(imageIndex + 1) % props?.bannerSlider.length]}
                    prevSrc={props?.bannerSlider[(imageIndex + props?.bannerSlider.length - 1) % props?.bannerSlider.length]}
                    onCloseRequest={() => setIsopen(false)}
                    onMovePrevRequest={() =>
                        setImageIndex((imageIndex + props?.bannerSlider.length - 1) % props?.bannerSlider.length)
                    }
                    onMoveNextRequest={() =>
                        setImageIndex((imageIndex + 1) % props?.bannerSlider.length)
                    }
                />
            )}
        </>
    );
};

SliderCarousel.defaultProps = {};
