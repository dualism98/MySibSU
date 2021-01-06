import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MainHeader from '../modules/MainHeader'
import ServiceElement from '../modules/ServiceElement'
import { h, w } from '../modules/constants'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import i18n from '../locale/locale' 
import { useTheme } from '../themes/ThemeManager'


const services = [{name: i18n.t('buildings'), path: 'Map', image: <Entypo name="map" size={44} color="#0060B3" />},
                    {name: i18n.t('student_life'), path: 'Active', image: <MaterialIcons name="people-outline" size={44} color="rgb(76, 174, 50)" />},
                    {name: i18n.t('institutes'), path: 'Institutes', image: <FontAwesome5 name="university" size={42.5} color="gray" />}, 
                    {name: i18n.t('online_catalog'), path: 'Shop', image: <AntDesign name="shoppingcart" size={42} color="#ef8531" />},
                    {name: i18n.t('feedback'), path: 'Poll', image: <MaterialIcons name="poll" size={42} color="rgb(49, 151, 39)"/>}]

export default function EventsScreen(props){
    const {mode, theme, toggle} = useTheme()
    return(
        <View style={styles.container}>
            <MainHeader title={i18n.t('services')} onPress={() => props.navigation.goBack()}/>
            <ScrollView>
                <View style={{ backgroundColor: theme.headerColor,width: w, minHeight: h, paddingTop: 20, paddingLeft: 5, paddingRight: 5, flexDirection: 'column', alignItems: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
                    {services.map(item => {
                        return(<ServiceElement name={item.name} image={item.image} onPress={() => props.navigation.navigate(item.path)}/>)
                    })}
                </View>
            </ScrollView>    
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flex: 1,
        width: w,
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    }
})
