export const size = {
  mobile: '320px',
  mobileM: '375px',
  mobileL: '480px',
  tablet: '640px',
  tabletM: '800px',
  laptop: '960px',
  laptopM: '1280px',
  laptopL: '1440px',
};

export const device = {
  mobile: `(min-width: ${size.mobile})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  tabletM: `(min-width: ${size.tabletM})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopM: `(min-width: ${size.laptopM})`,
  laptopL: `(min-width: ${size.laptopL})`,
};

export const bp = {
  sm: device.mobile,
  md: device.tablet,
  lg: device.laptop,
  xl: device.laptopM,
};

export const colors = {
  black: '#000',
  white: '#FFF',
  whiteSmoke: '#F5F5F5',
  cultured: '#F8F8F8',
  transparent: 'transparent',
  mischka: '#9FA2B4',
  darkShadeOfRed: '#575353',
  nero: '#201E1E',
  tutu: '#FDE7E7',
  springSlumberGreen: '#CBF8BC',
  ghostWhite: '#FEFEFF',
  mediumDarkShadeOfGreen: '#05B336',
  quartz: '#4F4B4B',
  blindnessSimulator: '#F1F3FA',
  softRed: '#F05151',
  nobel: '#9D9595',
  cyan: '#BFBCBC',
  brightGray: '#F4EAEA',
  lightGreen: '#51C177',
  fauxPale: '#B4C3FA',
  cosmixLatte: '#E3F9E9',
  fruitSalad: '#4BB449',
  sunsetOrange: '#FC5151',
  scampi: '#716E8D',
  coralRed: '#EF4141',
  brightLimeGreen: '#64EF41',
  pureOrange: '#f6b100',
  strongCyan: '#02a8be',
  vividOrange: '#F6B918',
  lightBlue: '#4A3AFF',
  lightGrayishBlue: '#FAF9FE',
  darkDesaturatedBlue: '#1E1B39',
  grayishBlue: '#E5E5EF',
  desaturatedSarkBlue: '#615E83',
  vividYellow: '#F4EC22',
  darkGrayishBlue: '#9291A5',
  darkGray: '#949494',
  veryPaleBlue: '#e7ecff',
  strongRed: '#B50F00',
  paleOrange: '#FFDF9E',
  verySoftBlue: 'rgba(180, 195, 250, 0.25)',
  verySoftOrange: '#FCE8B7',
  vividYellow2: '#ffc90b',
  mostlyPureOrange: '#dea100',
  darkGrayishRed: '#696363',
  lightGrayBlue: '#eff0f5',
  brightYellow: '#f6e440',
  lightOrange: '#ffcd55',
  verySoftBlue15: 'rgba(180, 195, 250, 0.15)',
  mostlyBlackBlue: '#010731',
  veryMostlyBlackBlue: '#010522',
  veryMostlyPaleBlue: '#f8f9ff', 
  veryDarkGrayRed: '#585757', 
  veryDarkGray: '#0f0f0f',
  darkBlue: '#2A3896',
  veryLightGray: '#EBEBEB',
  veryDarkGrayishRed: '#6F6D6D',
  light: {
    header: {
      bg: '#007BFF',
      fontSize: '#FFFF00',
      fontColor: '#FFFFFF',
      contentBG: '#FFFFFF',
      contentFontColor: '#000000'
    },
    banner: {
      bg: '#F61818',
      fontColor: '#FFFFFF'
    },
    footer: {
      bg: 'rgba(0, 0, 0, 0.82)',
      fontColor: '#FFFFFF',
      hostedBG: '#D9D9D9',
      hostedFontColor: '#000000'
    },
    homeContent: {
      overallBG: '#FFFFFF',
      bg: '#FFE59F',
      highLightBG: '#FFFFFF',
      fontColor: '#000000',
      eventHeadingBG: '#007BFF',
      eventHeadingFontColor: '#FFFFFF',
      arrowBG: '#007BFF',
      eventListBG: '#F5F5F5',
      eventHoverBG: '#E5F2FF',
      eventBG: '#2E2E2E',
      headingBG: '#000000',
      headingFontColor: '#FFFFFF',
      newBG: '#F8F8F8',
      todayEventBG: '#007BFF',
      eventInnerBG: '#FFFFFF',
      calenderBorderColor: '#D5D4DF',
      calenderSelectedBG: '#007BFF',
      calenderSelectedFontColor: '#FFFFFF',
      calendarOutsideBG: '#F2F3F7',
      calendarOutsideFontColor: '#000000',
      calendarExcludeBG: '#FFD03B',
      calendarExcludeFontColor: '#000000',
      recentEventListBG: '#EDF6FF',
      recentEventDateFontColor: '#585757',
      recentCalendarIconColor: '#007BFF'
    },
    contactUs: {
      headingFontColor: '#000000',
      fontColor: '#949494',
      inputBG: '#FFFFFF',
      labelFontColor: '#000000',
      buttonBG: '#007BFF',
      buttonFontColor: '#FFFFFF'
    },
    content: {
      bg: '#FFFFFF'
    },
    faq: {
      accordionBG: 'rgba(42,56,150,0.03)',
      accordionExpandedBG: 'rgba(0,123,255,0.24)',
      accordionFontColor: '#000000'
    },
    sitemapFontColor: '#007BFF',
    card: {
      fontColor: '#000000',
      bg: '#f8f9ff'
    },
    breadcrumb: {
      linkColor: '#000000',
      textColor: '#007BFF'
    }
  },
  dark: {
    header: {
      bg: '#323232',
      fontSize: '#FFFF00',
      fontColor: '#FFFF00',
      contentBG: '#000000',
      contentFontColor: '#FFFF00'
    },
    banner: {
      bg: '#323232',
      fontColor: '#FFFF00'
    },
    footer: {
      bg: '#2E2E2E',
      fontColor: '#FFFF00',
      hostedBG: '#000000',
      hostedFontColor: '#FFFF00'
    },
    homeContent: {
      overallBG: '#000000',
      bg: '#000000',
      highLightBG: '#2E2E2E',
      fontColor: '#FFFF00',
      eventHeadingBG: '#007BFF',
      eventHeadingFontColor: '#FFFF00',
      arrowBG: '#FFFF00',
      eventListBG: '#F5F5F5',
      eventHoverBG: '#E5F2FF',
      eventBG: '#2E2E2E',
      headingBG: '#FFFF00',
      headingFontColor: '#000000',
      newBG: '#2E2E2E',
      todayEventBG: '#121111',
      eventInnerBG: '#585757',
      calenderBorderColor: '#FFFF00',
      calenderSelectedBG: '#FFFF00',
      calenderSelectedFontColor: '#000000',
      calendarOutsideBG: '#000000',
      calendarOutsideFontColor: '#FFFFFF',
      calendarExcludeBG: '#FFD03B',
      calendarExcludeFontColor: '#000000',
      recentEventListBG: '#464646',
      recentEventDateFontColor: '#FFFFFF',
      recentCalendarIconColor: '#FFFFFF'
    },
    contactUs: {
      headingFontColor: '#FFFF00',
      fontColor: '#FFFF00',
      inputBG: '#464646',
      labelFontColor: '#FFFF00',
      buttonBG: '#616161',
      buttonFontColor: '#FFFF00'
    },
    content: {
      bg: '#000000'
    },
    faq: {
      accordionBG: '#323232',
      accordionExpandedBG: '#464646',
      accordionFontColor: '#FFFF00'
    },
    sitemapFontColor: '#FFFF00',
    card: {
      fontColor: '#FFFF00',
      bg: '#2E2E2E'
    },
    breadcrumb: {
      linkColor: '#FFFF00',
      textColor: '#FFFF00'
    }
  }
};

export const fonts = {
  default: "'Merriweather', Helvetica, Arial, Verdana, Tahoma,sans-serif",
  secondary: "'Crimson Text', Helvetica, Arial, Verdana, Tahoma,sans-serif",
  size: [1.2, 1.7, 2.2, 2.7, 3.2]
}

export const textSize = {
  text1: {
    laptop: '6.4rem',
    tablet: '4rem',
    mobile: '2.5rem',
  },

  text2: {
    laptop: '3.2rem',
    tablet: '3.5rem',
    mobile: '2.3rem',
  },

  text3: {
    laptop: '2.4rem',
    tablet: '2.5rem',
    mobile: '1.8rem',
  },

  text4: {},
  text5: {},
  text6: {},

  body: {
    laptop: '1.8rem',
    tablet: '1.9rem',
    mobile: '1.7rem',
  },

  body2: {
    laptop: '1.6rem',
  },
};

export const lineHeight = {
  text1: {
    laptop: '7.6rem',
    tablet: '',
    mobile: '',
  },

  text2: {
    laptop: '4.2rem',
    tablet: '',
    mobile: '',
  },

  text3: {
    laptop: '3.2rem',
    tablet: '',
    mobile: '',
  },

  body: {
    laptop: '2.8rem',
    tablet: '',
    mobile: '',
  },

  body2: {
    laptop: '1.6rem',
    tablet: '',
    mobile: '',
  },
};

export const spacers = {
  spacer1: '4px',
  spacer2: '8px',
  spacer3: '12px',
  spacer4: '16px',
  spacer5: '32px',
  spacer6: '48px',
  spacer7: '72px',
};

export const box = {
  shadow1: "0px 2px 6px rgba(13, 10, 44, 0.08)"
}
