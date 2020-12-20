import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { h, w } from './constants'


const MainHeader = ({title}) => {
    return(
        <View style={[styles.box, styles.shadow2]}>
            <Image source={require('../assets/logo.jpeg')} style={{ width: 25, height: 25, marginBottom: 3, marginRight: 10, marginLeft: 10}} />
            <Text style={styles.maintext}>{title}</Text>
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
        width: w,
        fontSize: 25,
        color: 'grey',
        textAlignVertical: 'bottom',
        fontFamily: 'roboto',
        textAlign: 'left',
      },

      shadow2: elevationShadowStyle(5),
      box: {
          backgroundColor: 'white',
          height: 65,
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