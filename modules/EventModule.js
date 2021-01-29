import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Linking, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { h, w } from './constants'
import {useTheme} from '../themes/ThemeManager'
import {useLocale} from '../locale/LocaleManager'
import Hyperlink from 'react-native-hyperlink'

const url = 'http://mysibsau.ru'

const EventModule = ({data}) => {
    const [mode, setMode] = useState(false)
    const {theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    const stringLinkRegex = 'https?://(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,4}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)'
    const regex = '\\[(.*?)\\]\\(\(stringLinkRegex)\\)'.replace('stringLinkRegex', stringLinkRegex)
    
    let text = data.text
    let links = []

    while(text.match(regex) !== null){
        let link = text.match(regex)[0]
        links.push({name: text.match(regex)[1], link: text.match(regex)[2]})
        text = text.replace(link, text.match(regex)[2])
    }

    function setLink(url){
        let there_is = false
        let link = ''
        links.map(item => {
            if(item.link === url)
            {
                there_is = true
                link = item.name
            }
        })

        return link
    }

    const coef = data.logo.height/data.logo.width
    return(
        <View style={{ width: w, backgroundColor: 'transparent', alignItems: 'center', marginBottom: 20, marginTop: 20}}>
            <View style={[styles.box, styles.centerContent, styles.shadow2, {backgroundColor: theme.blockColor}]}> 
                <ScrollView nestedScrollEnabled = {true}>
                <Image style={{width: w * 0.9, height: w * 0.9 * coef,  borderRadius: 15}}
                    source={{ uri: url + data.logo.url }} />
                <View> 
                        {String(text).length >= 100 && mode === false ? 
                        <View>
                            <Hyperlink linkStyle={ { color: '#006AB3', fontSize: 16 } }
                            linkText={ url => setLink(url)}>
                                <Text style={{width: w * 0.85, color: 'black', padding: 5, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16}}>{text.slice(0, 100)}...</Text>
                            </Hyperlink>
                        <View>
                            <TouchableWithoutFeedback onPress={() => {
                                setMode(!mode)
                            }}>
                                <Text style={{ fontFamily: 'roboto', fontSize: 16, color: 'gray', marginLeft: 25}}>{locale['read_more']}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        </View>
                        : 
                        <View>
                            <Hyperlink linkStyle={ { color: '#006AB3', fontSize: 16, } }
                            linkDefault
                            linkText={ url => setLink(url)}
                            >
                                <Text style={{width: w * 0.85, padding: 5, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: 'black'}}>{text}</Text>
                            </Hyperlink>
                            <View>
                                {String(text).length >= 100 ? 
                                <TouchableWithoutFeedback onPress={() => {setMode(!mode)}}>
                                    <Text style={{ fontFamily: 'roboto', fontSize: 16, color: 'gray', marginLeft: 25}}>{locale['hide']}</Text>
                                </TouchableWithoutFeedback> : null}
                            </View>
                        </View>
                        }
                </View>
                </ScrollView>
            </View>
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
    shadow2: elevationShadowStyle(10),
    box: {
        borderRadius: 15,
        backgroundColor: 'white',
        width: w * 0.9, 
        flexDirection: 'column',
        paddingBottom: 10,
    },
    centerContent: {
        alignItems: 'center'
    },
})

export default EventModule