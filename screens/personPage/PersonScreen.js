import React from 'react'
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Octicons } from '@expo/vector-icons'; 
import { h, w } from '../../modules/constants'
import {useLocale} from '../../locale/LocaleManager'
import {useTheme} from '../../themes/ThemeManager'

export default function PersonScreen(props){
    const {localeMode, locale, toggleLang} = useLocale()
    const {mode, theme, toggle} = useTheme()


    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <View style={[styles.box, styles.shadow, {backgroundColor: theme.blockColor}]}>
                <Image source={require('../../assets/header_logo.png')} style={{ width: 25, height: 25, marginBottom: 3, marginRight: 10, marginLeft: 10}} />
                <Text style={[styles.maintext, {color: theme.headerTitle}]}>{locale['personal_account']}</Text>
                <TouchableOpacity onPress={() => {
                    const modes = {"Default": 0, "Light": 1, "Dark": 2, null: 0}
                    AsyncStorage.getItem('Theme')
                        .then(res => props.navigation.navigate('Settings', {theme: modes[res]}))}}>
                    <Octicons name="gear" size={24} color={theme.headerTitle}/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                
            </ScrollView>
            
        </View>
    )
}

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation
    };
  }

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: h,
        flex: 1,
        width: w,
        paddingBottom: 40
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    },

    shadow: elevationShadowStyle(5),
    box: {
        backgroundColor: 'white',
        height: w/8,
        width: w,
        paddingLeft: 10,
        elevation: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 4,
    },

    maintext: {
        height: w / 8,
        width: w * 0.75,
        fontSize: 25,
        color: 'grey',
        textAlignVertical: 'center',
        fontFamily: 'roboto',
        textAlign: 'left',
    },
})
