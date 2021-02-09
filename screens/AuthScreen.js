import React from 'react'
import { View , Text, TextInput, StyleSheet} from 'react-native'
import {useTheme} from '../themes/ThemeManager'
import {useLocale} from '../locale/LocaleManager'
import { h, w } from '../modules/constants'


export default function AuthScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Text>LOGIN</Text>
        </View>
    )
}