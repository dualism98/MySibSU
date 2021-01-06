import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { h, w } from './constants'
import i18n from '../locale/locale'
import { Octicons } from '@expo/vector-icons'; 
import { useTheme } from '../themes/ThemeManager'

const MainHeader = ({title, onPress}) => {
    const {mode, theme, toggle} = useTheme() 
    return(
        <View style={[styles.box, styles.shadow2, {backgroundColor: theme.blockColor}]}>
            <Image source={require('../assets/logo.png')} style={{ width: 25, height: 25, marginBottom: 3, marginRight: 10, marginLeft: 10}} />
            <Text style={[styles.maintext, {color: theme.headerTitle}]}>{title}</Text>
            {title === i18n.t('personal_account') ? 
            <TouchableOpacity onPress={onPress}>
              <Octicons name="gear" size={24} color={theme.headerTitle}/>
            </TouchableOpacity> : null}
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
        width: w * 0.75,
        fontSize: 25,
        color: 'grey',
        textAlignVertical: 'bottom',
        fontFamily: 'roboto',
        textAlign: 'left',
      },

      shadow2: elevationShadowStyle(5),
      box: {
          backgroundColor: 'white',
          height: 40,
          width: w,
          paddingLeft: 10,
          elevation: 10,
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 4,
        },
})

export default MainHeader