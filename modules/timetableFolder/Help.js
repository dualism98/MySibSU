import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { h, w} from '../constants'
import { useTheme } from '../../themes/ThemeManager'

const Help = ({title, onPress}) => {
    const {mode, theme, toggle} = useTheme()
    return(
                <TouchableOpacity key={title} onPress={onPress}>
                    <View style={{ height: 30}}>
                        <Text style={{ fontFamily: 'roboto', fontSize: 18, backgroundColor: 'transparent', color: theme.labelColor, zIndex: 2, width: w * 0.89, paddingLeft: 10, paddingTop: 4, paddingBottom: 4, borderBottomWidth: 1, borderColor: 'lightgray'}}>{title}</Text>
                    </View>
                </TouchableOpacity>
    )
}


export default Help