import React, { useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Linking, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { h, w } from './constants'

url = 'http://193.187.174.224'

const EventModule = ({data}) => {
    const [mode, setMode] = useState(false)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    Image.getSize(url + data.logo, (width, height) => {
        setHeight(height)
        setWidth(width)})

    return(
        <View style={{ width: w, backgroundColor: 'white', alignItems: 'center', marginBottom: 20}}>
            <View style={[styles.box, styles.centerContent, styles.shadow2]}> 
                <ScrollView nestedScrollEnabled = {true}>
                <Image style={{width: w * 0.9, height: w * 0.9 * height/width,  borderRadius: 15}}
                    source={{ uri: url + data.logo }} />
                <View> 
                        {String(data.text).length >= 100 && mode === false ? 
                        <View>
                        <Text style={{width: w * 0.85, padding: 15, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3'}}>{data.text.slice(0, 100)}...</Text>
                        <View>
                            <TouchableWithoutFeedback onPress={() => {
                                setMode(!mode)
                            }}>
                                <Text style={{ fontFamily: 'roboto', fontSize: 16, color: '#006AB3', marginLeft: 25}}>[Читать далее]</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        </View>
                        : 
                        <View>
                            <Text style={{width: w * 0.85, padding: 15, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3'}}>{data.text}</Text>
                            {data.links.map(item => {
                                return(
                                    <TouchableWithoutFeedback onPress={() => Linking.openURL(item.link)}>
                                        <Text style={{width: w * 0.85, padding: 15, paddingTop: 0, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3', textDecorationLine: 'underline'}}>{item.name}</Text>
                                    </TouchableWithoutFeedback>
                                )
                            })}
                        <View>
                            <TouchableWithoutFeedback onPress={() => {
                                setMode(!mode)
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

export default EventModule