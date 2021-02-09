import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'
import { h, w } from './constants'
import {useTheme} from '../themes/ThemeManager'
import {useLocale} from '../locale/LocaleManager'
import { FontAwesome } from '@expo/vector-icons'; 



const HelloModule = ({color, name, image, what_a, why_a}) => {
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    return(
        <View style={{flex: 1, backgroundColor: color}}>
            <View style={{height: h * 0.25 - 15, width: w}}>
                <Text style={{ color: 'white', fontFamily: 'roboto', padding: w * 0.05, fontSize: 40, fontWeight: 'bold'}}>{name}</Text>
                {image}
            </View>
            
            <View style={{ padding: w * 0.1, backgroundColor: theme.primaryBackground, borderTopLeftRadius: 15, borderTopRightRadius: 15, height: h * 0.75, width: w}}>
                <View style={{flexDirection: 'row'}}>
                    <FontAwesome name="magic" size={35} color={color} style={{ width: w * 0.1 }} />
                    <View style={{ width: w * 0.7}}>
                        <Text style={{ color: theme.labelColor, fontFamily: 'roboto', fontSize: 20, fontWeight: 'bold', paddingLeft: 10}}>{locale['what_it']}</Text>
                        <Text style={{ color: theme.labelColor, fontFamily: 'roboto', fontSize: 16, paddingLeft: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <FontAwesome name="question" size={35} color={color} style={{ width: w * 0.1 }} />
                    <View style={{ width: w * 0.7}}>
                        <Text style={{ color: theme.labelColor, fontFamily: 'roboto', fontSize: 20, fontWeight: 'bold', paddingLeft: 10}}>{locale['how_it_work']}</Text>
                        <Text style={{ color: theme.labelColor, fontFamily: 'roboto', fontSize: 16, paddingLeft: 10}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</Text>
                    </View>
                </View>
            </View>            
        </View>
    )
}

export default HelloModule