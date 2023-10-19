import React, { useState } from 'react'
import Lightbox from 'react-image-lightbox';

const ImageGallery = (props) => {

    const [isOpen, setIsopen] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)

    const handleClick = (index) => {
        setIsopen(true)
        setImageIndex(index)
    }

    return (
        <div>
            <div className='singleLineImageContainer'>
                {props?.bannerSlider && props?.bannerSlider.map((image, index) => (
                    <img
                        key={index}
                        className={props.largeImageSize ? "Largeimage" :"image"}
                        src={image.image_url || image.url || image.events?.[0]?.url}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </div>
            {isOpen && (
                <Lightbox
                    mainSrc={props?.bannerSlider[imageIndex].image_url || props?.bannerSlider[imageIndex].url}
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
        </div>
    )
}

export default ImageGallery