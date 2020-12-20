import React, { useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Linking, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { h, w } from './constants'


const MapModule = (name) => {
    const [mode, setMode] = useState(false)
    const info = name.inf.split('|')
    return(
        
        <View style={{ width: w, backgroundColor: 'white', alignItems: 'center', marginBottom: 20}}>
            <View style={[styles.box, styles.centerContent, styles.shadow2]}> 
                <ScrollView nestedScrollEnabled = {true}>
                <Image style={{width: w * 0.9, height: h/2, borderRadius: 15}}
                source={{ uri: name.name }} />
                <View> 
                        {String(info[0]).length + String(info[1]).length + String(info[2]).length >= 100 && mode === false ? 
                        <View>
                        <Text style={{width: w * 0.85, padding: 15, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3'}}>{info[0].slice(0, 100)}...</Text>
                        <View>
                            <TouchableWithoutFeedback onPress={() => {
                                if (mode === true)
                                    setMode(false)
                                else
                                    setMode(true)
                            }}>
                                <Text style={{ fontFamily: 'roboto', fontSize: 16, color: '#006AB3', marginLeft: 25}}>[Читать далее]</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        </View>
                        : 
                        <View>
                        <Text style={{width: w * 0.85, padding: 15, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3'}}>{info[0]}</Text>
                        {info[1] !== '' && info.length > 1 ?
                            <TouchableWithoutFeedback onPress={() => Linking.openURL(info[1])}>
                                <Text style={{width: w * 0.85, padding: 15, paddingTop: 0, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3', textDecorationLine: 'underline'}}>Ссылка на регистрацию</Text>
                            </TouchableWithoutFeedback> : null}
                        {info[2] !== '' && info.length > 1  ? 
                            <TouchableWithoutFeedback onPress={() => Linking.openURL(info[2])}>
                                <Text style={{width: w * 0.85, padding: 15, paddingTop: 0, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3', textDecorationLine: 'underline'}}>Связаться с организатором</Text>
                        </TouchableWithoutFeedback>: null}
                        <View>
                            <TouchableWithoutFeedback onPress={() => {
                                if (mode === true)
                                    setMode(false)
                                else
                                    setMode(true)
                            }}>
                                <Text style={{ fontFamily: 'roboto', fontSize: 16, color: '#006AB3', marginLeft: 25}}>[Свернуть]</Text>
                            </TouchableWithoutFeedback>
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
        marginTop: 20,
        flexDirection: 'column',
        paddingBottom: 10,
    },
    centerContent: {
        alignItems: 'center'
    },
})

export default MapModule