import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, ScrollView, AsyncStorage, StyleSheet, RefreshControl, FlatList } from 'react-native'
import { h, w } from '../modules/constants'
import NewsModule from '../modules/NewsModule'
import {useLocale} from '../locale/LocaleManager'
import {useTheme} from '../themes/ThemeManager'

const url = 'https://mysibsau.ru/v2/informing/all_news/?uuid='

export default function NewsScreen(props){
    const [newsList, setNewsList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const {mode, theme, toggle} = useTheme()

    useEffect(() => {
        console.log("Получение новостей")
        AsyncStorage.getItem('UUID')
            .then(res => 
                {
                    fetch(url + res, {method: 'GET'})
                        .then(response => response.json())
                        .then(json => {
                            setNewsList(json)
                            setLoaded(true)
                        })
                        .catch(err => console.log(err))
                })
    }, [loaded])

    return(
        <View style={{flex: 1, backgroundColor: theme.primaryBackground}}>
            {!loaded ? 
            <View style={{flex: 1, justifyContent: 'center', paddingBottom: 120}}>
                <ActivityIndicator color={theme.blueColor} size='large' />
            </View> :
            <FlatList 
                data={newsList}
                renderItem={({ item }) => <NewsModule data={item} />}
                keyExtractor={item => item.text}
                contentContainerStyle={{paddingBottom: 120}}
                initialNumToRender={4}/>}
        </View>
    )
}
