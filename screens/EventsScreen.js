import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, FlatList, RefreshControl, AsyncStorage, StyleSheet, StatusBar} from 'react-native'
import { h, w } from '../modules/constants'
import EventModule from '../modules/EventModule'
import {useTheme} from '../themes/ThemeManager'

const url = 'https://mysibsau.ru/v2/informing/all_events/?uuid='

export default function EventsScreen(props){
    const [eventList, setEventList] = useState([])
    const [refreshing, setRefreshing] = useState(true)

    const {mode, theme, toggle} = useTheme()

    useEffect(() => {
        AsyncStorage.getItem('UUID')
            .then(res => 
                {
                    fetch(url + res, {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            setEventList(json)
                            setRefreshing(false)
                        })
                        .catch(err => console.log(err))
                })
    }, [refreshing])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
      }, [refreshing]);
    
    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            <FlatList 
                data={eventList}
                renderItem={({ item }) => <EventModule data={item} />}
                keyExtractor={item => item.text}
                contentContainerStyle={{paddingBottom: 120}}
                initialNumToRender={4}/>
        </View>
    )
}
