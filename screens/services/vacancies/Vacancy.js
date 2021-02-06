import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'


export default function Vacancy(props){
    const name = props.route.params.data.name
    const info = Object.entries(props.route.params.data.info)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    return(
        <View style={{flex: 1}}>
            <Header title={locale['vacancies']} onPress={() => props.navigation.goBack()} />
            <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
                <ScrollView contentContainerStyle={{paddingBottom: 120}}>
                <Text style={{ fontFamily: 'roboto', fontSize: 18, color: 'gray', margin: 10}}>{name}</Text>
                {info.map(item => {
                    console.log(item)
                    return(
                        <View style={{ marginTop: 10, alignSelf: 'center'}}>
                            <Text style={{ fontFamily: 'roboto', fontSize: 16, color: '#006AB3', marginBottom: 5}}>{item[0]}</Text>
                            <View style={{ padding: 10, width: w * 0.9, backgroundColor: theme.blockColor, borderRadius: 15, elevation: 5}}>
                                <Text style={{fontFamily: 'roboto', fontSize: 14, color: theme.labelColor}}>{item[1]}</Text>
                            </View>
                        </View>
                    )
                })} 
                </ScrollView>
            </View>
        </View>
    )
}