import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { h, w } from './constants'


const MainHeader = ({title}) => {
    const {container, maintext} = styles
    return(
        <View style={[styles.box, styles.shadow2]}>
            <Text style={maintext}>{title}</Text>
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
    container: {
        backgroundColor: 'white',
        height: 80,
        width: w,
        paddingTop: 30,
        elevation: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
    
    maintext: {
        width: w,
        fontSize: 30,
        color: 'grey',
        textAlignVertical: 'bottom',
        fontFamily: 'roboto',
        textAlign: 'center',
      },

      shadow2: elevationShadowStyle(5),
      box: {
          backgroundColor: 'white',
          height: 80,
          width: w,
          paddingLeft: 10,
          paddingTop: 30,
          elevation: 10,
          position: 'relative',
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 4,
        },
})

export default MainHeader