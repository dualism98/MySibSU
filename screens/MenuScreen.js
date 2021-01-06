import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import { h, w } from '../modules/constants' 
import MenuElement from '../modules/MenuElement'
import MainHeader from '../modules/MainHeader'
import moment from 'moment'
import i18n from '../locale/locale'
import {useTheme} from '../themes/ThemeManager'

const url = 'http://185.228.233.193/api/day_food/'

function food(count){
    if (count == 0){
        return(<Text style={{fontSize: 20, fontFamily: 'roboto', marginTop: 20}}>{i18n.t('no_menu')}</Text>)
    }
}

export default function MenuScreen(props){

    const [dayList, setDayList] = useState([])
    const [loading, setLoading] = useState(true)
    const [date, setDate] = useState('')

    const {mode, theme, toggle} = useTheme()

    useEffect(() => {
        setDate(moment().format('YYYY-MM-DD'))
        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setDayList(json)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [dayList])

    var count = 0
    return( 
        <View>
            <MainHeader title={i18n.t('menu')}/>
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
                {loading === true ?
                    <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                        <ActivityIndicator size='large' color='#0060B3' />
                    </View> :
                    food(count)}
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
