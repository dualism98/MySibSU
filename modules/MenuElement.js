import React from 'react';
import { TouchableOpacity, ImageBackground, View, StyleSheet, Text } from 'react-native';
import { h, w } from './constants';
import {useTheme} from '../themes/ThemeManager'
import {useLocale} from '../locale/LocaleManager'

const MenuElement = ({data}) => {
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    return(
        <View style={{ alignItems: 'center'}}>
            <View style={styles.down}>
                {
                    data.map(item => (
                        <View style={{ elevation: 5, width: w * 0.9, padding: 10, borderRadius: 15, marginTop: 10, flexDirection: 'row', heigth: 20, backgroundColor: theme.blockColor}}>
                            <View style={{ height: 20, width: '55%', }}>
                                <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'left', textAlignVertical: 'center', color: theme.labelColor }}>{item.diner_name}</Text>
                            </View>
                            <View style={{ height: 20, width: '25%', }}>
                                <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'center', textAlignVertical: 'center', color: theme.labelColor }}>{item.weight}г.</Text>
                            </View>
                            <View style={{ height: 20, width: '25%',}}>
                                <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'center', textAlignVertical: 'center', color: theme.labelColor }}>{item.price}₽</Text>
                            </View>
                        </View>
                    ))
                }
            </View>  
        </View>
    );
}

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation
    };
  }

const styles = StyleSheet.create({
    sub: {
        height: 30,
        width: '100%',
        marginTop: 20,
        marginLeft: 20
    },

    h1: {
        color: '#5575A7',
        fontSize: 22,
        fontFamily: 'roboto',
    },

    downtext:{
        paddingLeft: 8,
        paddingTop: 5,
        paddingBottom: 2,
        width: w * 0.8,
        borderWidth: 2,
        borderColor: '#518E90',
        fontSize: 20,
        fontFamily: 'roboto'
    },

    shadow2: elevationShadowStyle(6),
    box: {
      borderRadius: 15,
      backgroundColor: 'white',
      padding: 10,
      width: w * 0.9,
      marginTop: 10,
    },

})

export default MenuElement