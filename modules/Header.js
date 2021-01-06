import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { h, w } from './constants'
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from '../themes/ThemeManager'

const Header = ({title, onPress}) => {
    const {mode, theme, toggle} = useTheme()
    return(
        <View style={[styles.box, styles.shadow2, {backgroundColor: theme.blockColor}]}>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name="ios-arrow-back" size={30} color="black" style={{ color: '#006AB3', paddingRight: 10, paddingLeft: 15, marginBottom: 8}}/>
            </TouchableOpacity>
            <Text style={[styles.maintext, {color: theme.headerTitle}]}>{title}</Text>
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
    maintext: {
        fontSize: 25,
        color: 'gray',
        textAlignVertical: 'bottom',
        marginLeft: 10,
        fontFamily: 'roboto',
        textAlign: 'center',
        paddingBottom: 6,
      },

    shadow2: elevationShadowStyle(5),
    box: {
        height: 40,
        width: w,
        elevation: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 4,
      },
})

export default Header