import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, DeviceEventEmitter, ScrollView} from 'react-native'
import { h, w } from '../modules/constants' 
import MenuElement from '../modules/MenuElement'
import MainHeader from '../modules/MainHeader'
import moment from 'moment'
import {useLocale} from '../locale/LocaleManager'
import {useTheme} from '../themes/ThemeManager'

const url = 'http://185.228.233.193/api/day_food/'

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
        setDate(moment().format('YYYY-MM-DD'))
        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setDayList(json)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [dayList])

    var count = 0
    return( 
        <View>
            <MainHeader title={locale['menu']}/>
            <ScrollView>
            <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
                <View>
                    {
                        dayList.map(item => {
                            if (item.day === date){
                                count++
                                return(
                                    <MenuElement data={item} date={date} key={item.id}/>
                                )
                            }
                        })
                    }
                </View>
                {!loaded ?
                    <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size='large' color={theme.blueColor} />
                    </View> :
                    food(count, theme, locale['no_menu'])}
            </View>
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