import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {h, w} from './constants'
import {useTheme} from '../themes/ThemeManager'

const ServiceElement = ({name, image, onPress}) => {
    const {mode, theme, toggle} = useTheme()
    return(
        <TouchableOpacity  onPress={onPress}>
            <View style={[styles.box2, styles.shadow2, {backgroundColor: theme.blockColor}]}>
                {image}
                <Text style={{fontFamily: 'roboto', fontSize: 18, marginLeft: 20, color: theme.headerTitle}}>{name}</Text>
            </View>
        </TouchableOpacity>
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
    shadow1: elevationShadowStyle(6),
    box1: {
      borderRadius: 15,
      alignItems: 'center',
      backgroundColor: 'white',
      width: w * 0.29,
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5
    },

    shadow2: elevationShadowStyle(6),
    box2: {
      borderRadius: 15,
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: w * 0.8,
      height: 55,
      marginTop: 10,
      marginLeft: 5,
      marginRight: 5,
      paddingLeft: 10,
    },
})

export default ServiceElement