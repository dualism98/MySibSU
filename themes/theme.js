
export const ThemeColors = {
    blueColor: {
        light: '#4b7ab8',
        dark: '#377fde',
    },
    primaryText: {
       light: 'black',
       dark: 'white',
    },
    primaryBackground: {
       light: 'white',
       dark: 'rgb(55,55,55)',
    },
    headerTitle: {
        light: 'gray',
        dark: 'white'
    },
    headerColor: {
        light: 'white',
        dark: 'rgb(55,55,55)'
    },
    blockColor: {
        light: 'white',
        dark: 'rgb(38,38,38)'
    },
    labelColor: {
        light: 'black',
        dark: 'white'
    }
 };

 export const getTheme = (mode) => {
    let Theme = {};
    for (let key in ThemeColors) {
       Theme[key] = ThemeColors[key][mode];
    }
    return Theme;
 };