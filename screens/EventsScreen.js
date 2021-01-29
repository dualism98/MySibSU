import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, FlatList, AsyncStorage, StyleSheet, StatusBar} from 'react-native'
import { h, w } from '../modules/constants'
import EventModule from '../modules/EventModule'
import {useTheme} from '../themes/ThemeManager'

const url = 'http://193.187.174.224/v2/informing/all_events/?uuid='

export default function EventsScreen(props){
    const [eventList, setEventList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const {mode, theme, toggle} = useTheme()

    useEffect(() => {
        AsyncStorage.getItem('UUID')
            .then(res => 
                {
                    fetch(url + res, {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            setEventList(json)
                            setLoaded(true)
                        })
                        .catch(err => console.log(err))
                })
    }, [loaded])

    const renderEvent = ({ item }) => (
        <EventModule data={item} />
    )
    
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <View style={{height: h - w/8 - 30 - StatusBar.currentHeight, paddingBottom: 10}}>
            {    !loaded ? 
                    <View style={{ height: h - 140, width: w, alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                        <ActivityIndicator color='#006AB3' size={'large'}/>
                    </View> : 
                    <FlatList 
                        data={eventList}
                        renderItem={renderEvent}
                        keyExtractor={item => item.text}
                        initialNumToRender={4}/>
            }
            </View>
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
    },

    header: {
        height: w / 8,
        width: w,
        elevation: 6
    },

    wrapper: {}
})
