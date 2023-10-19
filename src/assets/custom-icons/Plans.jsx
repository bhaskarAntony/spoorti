import React from 'react';
import { colors } from '../../theme';

export const Plans = ({ color }) => {
  return (
    <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_162_2682)">
      <path d="M45 39.6279C45 40.3874 37.8342 41 29 41C20.1658 41 13 40.3874 13 39.6279C13 38.8683 20.1658 38.2557 29 38.2557C37.8342 38.2557 45 38.8683 45 39.6279Z" fill="url(#paint0_radial_162_2682)"/>
      <path d="M40.9218 39.6279H18.3875V9H34.4396L40.9218 15.0337V39.6279Z" fill="#C8C8C8"/>
      <path d="M19.2158 38.7519H40.0934V15.4257L34.1268 9.87598H19.2158V38.7519Z" fill="#F0F0F0"/>
      <path d="M40.5106 15.2297H34.2832V9.44104L40.5106 15.2297Z" fill="#C8C8C8"/>
      <path d="M29.6545 38.7519H40.0934V15.4257L34.1267 9.87598H29.6545V38.7519Z" fill="white"/>
      <path d="M32.0007 18.3722H20.8088V19.6892H32.0007V18.3722Z" fill="#787878"/>
      <path d="M32.0007 23.4197H20.8088V24.7367H32.0007V23.4197Z" fill="#787878"/>
      <path d="M32.0007 28.3875H20.8088V29.7044H32.0007V28.3875Z" fill="#787878"/>
      <path d="M32.0007 33.2144H20.8088V34.5314H32.0007V33.2144Z" fill="#787878"/>
      <path d="M38.2745 21.2634H34.3005V17.0613H38.2745V21.2634ZM34.7176 20.8224H37.8632V17.4962H34.7176V20.8224Z" fill="#646464"/>
      <path d="M38.2745 26.1761H34.3005V21.974H38.2745V26.1761ZM34.7176 25.7351H37.8632V22.4089H34.7176V25.7351Z" fill="#646464"/>
      <path d="M38.2745 31.1501H34.3005V26.948H38.2745V31.1501ZM34.7176 30.7091H37.8632V27.3829H34.7176V30.7091Z" fill="#646464"/>
      <path d="M38.2745 36.4855H34.3005V32.2833H38.2745V36.4855ZM34.7176 36.0444H37.8632V32.7182H34.7176V36.0444Z" fill="#646464"/>
      <path d="M35.998 25.6983L34.822 22.7764L35.3955 22.5191L36.1428 24.3752L38.3383 21.2021L38.8365 21.5942L35.998 25.6983Z" fill="#CD3A28"/>
      </g>
      <defs>
      <filter id="filter0_d_162_2682" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dy="4"/>
      <feGaussianBlur stdDeviation="6.5"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_162_2682"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_162_2682" result="shape"/>
      </filter>
      <radialGradient id="paint0_radial_162_2682" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(29.0459 37.905) scale(16.0538 1.41464)">
      <stop stop-color="#CCCCCC"/>
      <stop offset="1" stop-color="white"/>
      </radialGradient>
      </defs>
    </svg>
  );
};

Plans.defaultProps = {
  color: colors.darkShadeOfRed,
};
