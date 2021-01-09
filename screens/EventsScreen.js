import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native'
import MainHeader from '../modules/MainHeader'
import { h, w } from '../modules/constants'
import EventModule from '../modules/EventModule'
import {useLocale} from '../locale/LocaleManager'
import {useTheme} from '../themes/ThemeManager'

const url = 'http://193.187.174.224/v2/events/all/'

export default function EventsScreen(props){
    const [eventList, setEventList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        fetch(url, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setEventList(json)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [eventList])

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <MainHeader title={locale['events']} onPress={() => props.navigation.goBack()}/>
            <ScrollView nestedScrollEnabled = {true}>
                <View style={{ minHeight: h, paddingTop: 20, paddingBottom: 100, backgroundColor: theme.primaryBackground}}>
                {
                    eventList.map(item =>           
                        <EventModule key={item.name} data={item} />                              
                    )
                }
                {
                    !loaded ? 
                        <View style={{ height: h - 140, width: w, alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                            <ActivityIndicator color='#006AB3' size={'large'}/>
                        </View> : null
                }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: w,
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    }
})
