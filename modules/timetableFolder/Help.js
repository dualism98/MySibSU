import React from 'react'
import { Text, TouchableHighlight, View } from 'react-native'
import { h, w} from '../constants'
import { useTheme } from '../../themes/ThemeManager'

const Help = ({title, onPress}) => {
    const {mode, theme, toggle} = useTheme()
    console.log(title)
    return(
                <TouchableHighlight key={title} onPress={onPress}>
                    <View style={{ height: 30}}>
                        <Text style={{ fontFamily: 'roboto', fontSize: 18, backgroundColor: 'transparent', color: theme.labelColor, zIndex: 2, width: w * 0.89, paddingLeft: 10, paddingTop: 4, paddingBottom: 4, borderBottomWidth: 1, borderColor: 'lightgray'}}>{title}</Text>
                    </View>
                </TouchableHighlight>
    )
}


export default Help