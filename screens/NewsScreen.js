import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, ScrollView, AsyncStorage, StyleSheet, StatusBar, Image, FlatList } from 'react-native'
import { h, w } from '../modules/constants'
import NewsModule from '../modules/NewsModule'
import {useLocale} from '../locale/LocaleManager'
import {useTheme} from '../themes/ThemeManager'

const url = 'http://193.187.174.224/v2/informing/all_news/?uuid='

export default function NewsScreen(props){
    const [newsList, setNewsList] = useState([])
    const [loaded, setLoaded] = useState(false)

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
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

    const renderNews = ({ item }) => (
        <NewsModule data={item} />
    )

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <View style={{ paddingBottom: 10}}>
                {    !loaded ? 
                        <View style={{ height: h - 140, width: w, alignSelf: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                            <ActivityIndicator color='#006AB3' size={'large'}/>
                        </View> : 
                        <FlatList 
                            data={newsList}
                            renderItem={renderNews}
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
