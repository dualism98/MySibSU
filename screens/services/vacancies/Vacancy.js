import React from 'react'
import {View} from 'react-native'
import Header from '../../../modules/Header'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'


export default function Vacancy(props){
    const data = props.route.params.data

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    return(
        <View>
            <Header title={locale['vacancies']} onPress={() => props.navigation.goBack()} />
        </View>
    )
}