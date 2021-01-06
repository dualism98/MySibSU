import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import MainHeader from '../modules/MainHeader'
import { h, w } from '../modules/constants'
import EventModule from '../modules/EventModule'
import i18n from '../locale/locale'
import {useTheme} from '../themes/ThemeManager'

const url = 'http://193.187.174.224/v2/events/all/'
const secondURL = 'http://185.228.233.193/api/event/'

export default function EventsScreen(props){
    const [eventList, setEventList] = useState([])
    const [loading, setLoading] = useState(true)

    const {mode, theme, toggle} = useTheme()

    useEffect(() => {
        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setEventList(json)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [eventList])

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <MainHeader title={i18n.t('events')} onPress={() => props.navigation.goBack()}/>
            <ScrollView nestedScrollEnabled = {true}>
                <View style={{ paddingTop: 20, paddingBottom: 100}}>
                {
                (loading === true) ? 
                <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size='large' color='#0060B3' />
                </View> :
                eventList.map(item =>           
                    <EventModule key={item.name} data={item} />                              
                )
                }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: w,
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    }
})
