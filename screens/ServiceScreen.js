import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MainHeader from '../modules/MainHeader'
import ServiceElement from '../modules/ServiceElement'
import { h, w } from '../modules/constants'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../themes/ThemeManager'
import { useLocale } from '../locale/LocaleManager'




export default function EventsScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const services = (locale) => {return [{name: locale['institutes'], path: 'Institutes', image: <FontAwesome5 name="university" style={{alignSelf: 'flex-end', marginBottom: -5, marginRight: -5, opacity: 0.6}} size={60} color="gray" />}, 
                    {name: locale['student_life'], path: 'Active', image: <MaterialIcons name="people-outline" style={{alignSelf: 'flex-end', marginBottom: -5, marginRight: -5, opacity: 0.6}} size={60} color="rgb(76, 174, 50)" />},
                    {name: locale['buildings'], path: 'Map', image: <Entypo name="map" style={{alignSelf: 'flex-end', marginBottom: -5, marginRight: -5, opacity: 0.6}} size={60} color={theme.blueColor} />},
                    // {name: locale['online_catalog'], path: 'Shop', image: <AntDesign name="shoppingcart" style={{alignSelf: 'flex-end', marginBottom: -5, marginRight: -5, opacity: 0.6}} size={60} color="#ef8531" />},
                    {name: locale['vacancies'], path: 'Vacancies', image: <MaterialIcons name="engineering" style={{alignSelf: 'flex-end', marginBottom: -8, marginRight: -5, opacity: 0.6}} size={60} color="gray" />},
                    {name: locale['feedback'], path: 'Topics', image: <MaterialIcons name="poll" style={{alignSelf: 'flex-end', marginBottom: -8, marginRight: -7, opacity: 0.6}} size={60} color="rgb(49, 151, 39)"/>},
                    {name: "FAQ", path: 'FAQ', image: <MaterialIcons name="help-center" style={{alignSelf: 'flex-end', marginBottom: -8, marginRight: -7, opacity: 0.6}} size={60} color={theme.blueColor} />}] }
    return(
        <View style={styles.container}>
            <MainHeader title={locale['services']} onPress={() => props.navigation.goBack()}/>
                <View style={{ backgroundColor: theme.headerColor, height: '100%',  width: w, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {services(locale).map(item => {
                        return(<ServiceElement key={item.name} name={item.name} image={item.image} onPress={() => props.navigation.navigate(item.path)}/>)
                    })}
                </View>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: w,
    },
})
