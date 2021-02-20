import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, AsyncStorage, ScrollView} from 'react-native'
import { h, w } from '../../modules/constants' 
import MenuElement from '../../modules/MenuElement'
import Header from '../../modules/Header'
import moment from 'moment'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'

const url = 'https://mysibsau.ru/v2/menu/all/'

function food(count, theme, locale){
    if (count == 0){
        return(<Text style={{ color: theme.labelColor,fontSize: 20, fontFamily: 'roboto', marginTop: 20}}>{locale}</Text>)
    }
}

export default function MenuScreen(props){

    const [dayList, setDayList] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [date, setDate] = useState('')

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        AsyncStorage.getItem('Diner')
            .then(res => {
                if (res !== null){
                    fetch(url, {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            console.log(json[Number(res)])
                            setDayList(json[Number(res)])
                            setLoaded(true)
                        })
                }
            })
    }, [])

    return( 
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <Header title={dayList.name}/>
            <ScrollView contentContainerStyle={{flex: 1, paddingBottom: 120}}>
                
                {!loaded ?
                <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color={theme.blueColor} />
                </View> :
                <View>
                {
                    dayList.menu.map(item => {
                        if(item.diners.length !== 0)
                            return(
                                <View>
                                    {/* <View style={{width: w * 0.9, marginTop: 10, alignSelf: 'center', padding: 10, backgroundColor: theme.primaryBackground, borderRadius: 15, elevation: 5}}> */}
                                        <Text style={{fontFamily: 'roboto', marginLeft: w * 0.05, fontSize: 18, color: '#006AB3', marginTop: 20}}>{item.type}</Text>
                                    {/* </View> */}
                                    <MenuElement data={item.diners} />
                                </View>
                            )  
                    })
                }
                </View>}
            </ScrollView>
        </View>       
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: h,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },

})