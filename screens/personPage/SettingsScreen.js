import React, { PureComponent, useState } from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity,Switch, AsyncStorage, DevSettings, ActivityIndicator} from 'react-native'
import i18n from '../../locale/locale'
import Header from '../../modules/Header'
import { h, w } from '../../modules/constants'
import LangElem from '../../modules/LangElem'
import { useTheme } from '../../themes/ThemeManager'
import SwitchSelector from "react-native-switch-selector";
import { Appearance } from 'react-native-appearance'
import { useEffect } from 'react/cjs/react.development'

export default function SettingsScreen(props){ 
    const { mode, theme, toggle } = useTheme();
    const langs = [{name: 'Русский', short_name: 'ru'}, {name: 'English', short_name: 'en'}]
    const themes = [
        { label: i18n.t('default'), value: "default" },
        { label: i18n.t('light_theme'), value: "light" },
        { label: i18n.t('dark_theme'), value: "dark" }
    ];

    const [scheme, setTheme] = useState(0)
    const [loaded, setLoaded] = useState(false)
    
    function changeTheme(value){
        switch(value){
            case 'default':
                AsyncStorage.setItem('Theme', 'Default')
                const colorScheme = Appearance.getColorScheme()
                mode === colorScheme ? null : toggle()
                break
            case 'light':
                AsyncStorage.setItem('Theme', 'Light')
                mode !== 'light' ? toggle() : null
                break
            case 'dark':
                AsyncStorage.setItem('Theme', 'Dark')
                mode !== 'dark' ? toggle() : null
                break
        }
    }


    useEffect(() => {
        const modes = {"Default": 0, "Light": 1, "Dark": 2}
        AsyncStorage.getItem('Theme')
            .then(res => 
                setTheme(modes[res]))
            .then(() => setLoaded(true))
    }, [scheme])
  
    return(
        <View style={{ backgroundColor: theme.primaryBackground}}>
            <Header title={i18n.t('settings')} onPress={() => props.navigation.goBack()}/>
            {loaded ?
            <ScrollView>
                <View style={{ minHeight: h, backgroundColor: theme.primaryBackground}}>
                    <Text style={styles.large_text}>{i18n.t('choose_lang')}</Text>
                    <View style={[styles.container, styles.shadow, {alignItems: 'center', minHeight: 50, backgroundColor: theme.blockColor}]}>
                        {langs.map(item => {
                            let first = langs.indexOf(item) === 0
                            return(<LangElem name={item.name} current={i18n.locale === item.short_name} first={first} onPress={() => {
                                AsyncStorage.setItem('Locale', item.short_name)
                                DevSettings.reload()
                            }}/>)
                        })}
                    </View>

                    <Text style={styles.large_text}>{i18n.t('choose_theme')}</Text>
                    <View style={[styles.container, styles.shadow, {backgroundColor: theme.blockColor}]}>
                    <SwitchSelector
                        options={themes}
                        initial={scheme}
                        borderRadius={15}
                        buttonColor={'#0060B3'}
                        textStyle={{fontFamily: 'roboto', color: theme.headerTitle}}
                        selectedTextStyle={{fontFamily: 'roboto'}}
                        backgroundColor={theme.blockColor}
                        onPress={value => changeTheme(value)}
                        />
                    </View>
                </View>
            </ScrollView> : 
            <View>
                <ActivityIndicator size={'large'} color={'006AB3'} />   
            </View>}      
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
        borderRadius: 15,
        width: w * 0.9,
        alignSelf: 'center',
    },

    shadow: elevationShadowStyle(10),
    
    large_text: {
        fontFamily: 'roboto',
        fontSize: 20,
        color: '#0060B3', 
        marginLeft: w * 0.05,
        marginTop: 20,
        marginBottom: 5
    },

    small_text: {
        height: 30,
        fontFamily: 'roboto',
        fontSize: 18,
        color: '#0060B3',
    }
})