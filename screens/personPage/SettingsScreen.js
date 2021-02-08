import React, { useState } from 'react'
import {View, Text, StyleSheet, ScrollView, AsyncStorage, Appearance } from 'react-native'
import Header from '../../modules/Header'
import { h, w } from '../../modules/constants'
import LangElem from '../../modules/LangElem'
import { useTheme } from '../../themes/ThemeManager'
import SwitchSelector from "react-native-switch-selector";
import {useLocale} from '../../locale/LocaleManager'

export default function SettingsScreen(props){ 
    const { mode, theme, toggle } = useTheme();
    const { localeMode, locale, toggleLang } = useLocale()
    const langs = [{name: 'Русский', short_name: 'ru'}, {name: 'English', short_name: 'en'}]
    const themes = [
        { label: locale['default'], value: "default" },
        { label: locale['light_theme'], value: "light" },
        { label: locale['dark_theme'], value: "dark" }
    ];

    const [scheme, setTheme] = useState(props.route.params.theme)
    
    function changeTheme(value){
        switch(value){
            case 'default':
                AsyncStorage.setItem('Theme', 'Default')
                const colorScheme = Appearance.getColorScheme()
                if (colorScheme !== 'light' && colorScheme !== 'dark'){
                    mode === 'dark' ? toggle() : null
                }
                else if (mode !== colorScheme)
                    toggle()
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

    function changeLang(name){
        if (name !== localeMode){
            AsyncStorage.setItem('Locale', name)
            toggleLang()
        }
    }
  
    return(
        <View style={{ backgroundColor: theme.primaryBackground}}>
            <Header title={locale['settings']} onPress={() => props.navigation.goBack()}/>
            {/* {loaded ? */}
            <ScrollView>
                <View style={{ minHeight: h, backgroundColor: theme.primaryBackground}}>
                    <Text style={styles.large_text}>{locale['choose_lang']}</Text>
                    <View style={[styles.container, styles.shadow, {alignItems: 'center', minHeight: 50, backgroundColor: theme.blockColor}]}>
                        {langs.map(item => {
                            let first = langs.indexOf(item) === 0
                            return(<LangElem name={item.name} current={localeMode === item.short_name} first={first} onPress={() => {
                                AsyncStorage.setItem('Locale', item.short_name)
                                changeLang(item.short_name)
                            }}/>)
                        })}
                    </View>

                    <Text style={styles.large_text}>{locale['choose_theme']}</Text>
                    <View style={[styles.container, styles.shadow, {backgroundColor: theme.blockColor}]}>
                    <SwitchSelector
                        options={themes}
                        initial={scheme}
                        borderRadius={15}
                        buttonColor={'#006AB3'}
                        textStyle={{fontFamily: 'roboto', height: 40, textAlignVertical: 'center', color: theme.headerTitle}}
                        selectedTextStyle={{fontFamily: 'roboto', height: 40, textAlignVertical: 'center',}}
                        backgroundColor={theme.blockColor}
                        onPress={value => changeTheme(value)}
                        />
                    </View>
                </View>
            </ScrollView>
            {/* <View>
                <ActivityIndicator size={'large'} color={'006AB3'} />   
            </View>}       */}
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
        color: '#006AB3', 
        marginLeft: w * 0.05,
        marginTop: 20,
        marginBottom: 5
    },

    small_text: {
        height: 30,
        fontFamily: 'roboto',
        fontSize: 18,
        color: '#006AB3',
    }
})