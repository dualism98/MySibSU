import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, ScrollView, AsyncStorage, StyleSheet, RefreshControl, FlatList } from 'react-native'
import { h, w } from '../modules/constants'
import NewsModule from '../modules/NewsModule'
import {useLocale} from '../locale/LocaleManager'
import {useTheme} from '../themes/ThemeManager'

const url = 'https://mysibsau.ru/v2/informing/all_news/?uuid='

export default function NewsScreen(props){
    const [newsList, setNewsList] = useState([])
    const [refreshing, setRefreshing] = useState(true)

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
                refreshControl={<RefreshControl colors={['#006AB3', '#7DC71C']} refreshing={refreshing} onRefresh={onRefresh} />}
                data={newsList}
                renderItem={({ item }) => <NewsModule data={item} />}
                keyExtractor={item => item.text}
                initialNumToRender={4}/>
        </View>
    )
}
