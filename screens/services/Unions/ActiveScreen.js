import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActiveElement from '../../../modules/ActiveElement'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useLocale} from '../../../locale/LocaleManager'
import { useTheme } from '../../../themes/ThemeManager'


export default function ActiveScreen(props){
    const [unions, setUnions] = useState([])
    const [loaded, setLoaded] = useState(false)
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        fetch('http://193.187.174.224/v2/campus/unions/', {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setUnions(json)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [unions])

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={locale['student_life']} onPress={() => props.navigation.goBack()}/>
            <ScrollView>
                <View style={styles.main}>
                    {loaded ? 
                    unions.map( item => {
                        return(<ActiveElement onPress={() => props.navigation.navigate('Ermak', {data: item})} title={item.name} source={item.logo} key={item[0]} />)
                    }) : <ActivityIndicator size='large' color='#0060B3' />}   
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        paddingBottom: 150, 
        width: w,
        minHeight: h,
        justifyContent: 'center'
    },

    text: {
        fontSize: 25,
        color: '#006AB3',
        fontFamily: 'roboto',
        marginTop: 10,
        marginLeft: 10,
    },
})