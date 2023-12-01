import {Dimensions} from 'react-native';

// colors
export const COLORS = {
    blackBg: '#141414',
    blackText: '#000000',
    green: '#08AD6C',
    greenDark: '#009566',
    greenLight: '#81CFB0',
    greenRegular: '#53DAA5',
    white: '#DDF9EA',
    redLight: '#FF0015',
    grey: '#242424',
    disabledText: '#979797',
    priorityLow: '#009566',
    priorityMedium: '#3BA5FE',
    priorityHigh: '#F4900C',
    priorityImportant: '#E91E2F',
    placeholderColor: '#979797',
    white40: function() {
        return this.white + '66'
    },
}


//fonts
export const fonts = {
    400: 'SFUIRegular',
    300: 'SFUILight',
    500: 'SFUIMedium',
    600: 'SFUISemiBold',
}

// sizes
export const screenWidth = Dimensions.get('window').width;
export const containerPadding = 16
export const containerWidth = Dimensions.get('window').width - containerPadding * 2;
export const screenHeight = Dimensions.get('window').height;

// mediaSize
export const mediaSizes = {
    sm: screenWidth <= 375,
    md: screenWidth > 375 && screenWidth <= 410,
    lg: screenWidth > 410 && screenWidth <= 440
}


export const isBigScreen = screenWidth > 400

export const borderRadiusField = 6

