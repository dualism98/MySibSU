import React, {useEffect, useState} from 'react'
import {View, StyleSheet} from 'react-native'
import Header from '../../../modules/Header'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'


export default function VacanciesScreen(props){

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    const [vacanciesList, setVacanciesList] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        console.log('Получаем список вакансий')
        fetch('https://mysibsau.ru/v2/work/vacancies/', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setVacanciesList(json)
                setLoaded(true)
            })
    }, [])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={locale['vacancies']} onPress={() => props.navigation.goBack()} />

        </View>
    )
}