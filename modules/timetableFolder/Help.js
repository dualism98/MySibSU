import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { h, w} from '../constants'

const Help = ({info, onPress}) => {
    return(
                <TouchableHighlight key={info} onPress={onPress}>
                    <View>
                        <Text style={{ fontFamily: 'roboto', fontSize: 18, backgroundColor: 'white', color: '#006AB3', zIndex: 2, width: w * 0.89, paddingLeft: 10, paddingTop: 4, paddingBottom: 4, borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'gray'}}>{info}</Text>
                    </View>
                </TouchableHighlight>
    )
}


export default Help