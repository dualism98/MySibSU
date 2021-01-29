import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { h, w} from '../constants'
import { useTheme } from '../../themes/ThemeManager'

const Help = ({group, onPress}) => {
    const {mode, theme, toggle} = useTheme()
    return(
                <TouchableOpacity key={group.name} onPress={onPress}>
                    <View style={{ height: 30, width: w * 0.89}}>
                        <Text style={{ height: 30, width: w * 0.89, fontFamily: 'roboto', fontSize: 18, backgroundColor: 'transparent', color: theme.labelColor, zIndex: 2, paddingLeft: 10, paddingTop: 4, paddingBottom: 4}}>{group.name}</Text>
                    </View>
                </TouchableOpacity>
    )
}


export default Help