import React, { useState } from 'react'
import { View, Text, Image, TouchableWithoutFeedback, Linking} from 'react-native'
import { h, w } from './constants'


const MapModule = (name) => {
    const [mode, setMode] = useState(true)
    const info = name.inf.split('|')
    console.log(info)
    return(
        <TouchableWithoutFeedback onPress={() => {
            if(mode === true){setMode(false)}
            else{setMode(true)}
            }}>
            <View style={{width: w, alignItems: 'center', shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.27,
shadowRadius: 4.65,

elevation: 6,}}>
            {mode === true ?
            <Image style={{width: w * 0.7, height: h/2, marginBottom: 10, marginTop: 10, borderRadius: 10, resizeMode: 'contain'}}
            source={{ uri: name.name }} /> : 
            <View style={{width: w * 0.66, flex: 1, marginBottom: 10, marginTop: 10, borderRadius: 15, borderWidth: 1, borderColor: '#006AB3', alignSelf: 'center'}}>
                <Text style={{width: w * 0.66, padding: 15, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3'}}>{info[0]}</Text>
                {info[1] !== '' && info.length > 1 ?
                <TouchableWithoutFeedback onPress={() => Linking.openURL(info[1])}>
                    <Text style={{width: w * 0.66, padding: 15, paddingTop: 0, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3', textDecorationLine: 'underline'}}>Ссылка на регистрацию</Text>
                </TouchableWithoutFeedback> : null}
                {info[2] !== '' && info.length > 1  ? 
                <TouchableWithoutFeedback onPress={() => Linking.openURL(info[2])}>
                    <Text style={{width: w * 0.66, padding: 15, paddingTop: 0, alignSelf: 'center', fontFamily: 'roboto', fontSize: 16, color: '#006AB3', textDecorationLine: 'underline'}}>Связаться с организатором</Text>
                </TouchableWithoutFeedback> : null}
            </View>
            }
            </View>
        </TouchableWithoutFeedback>
    )
}

export default MapModule