import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { h, w } from './constants'
import { Ionicons } from '@expo/vector-icons'; 


const Header = ({title, onPress}) => {
    return(
        <View style={[styles.box, styles.shadow2]}>
            <TouchableWithoutFeedback onPress={onPress}>
                <Ionicons name="ios-arrow-back" size={30} color="black" style={{ color: '#006AB3', paddingRight: 20, paddingLeft: 20, marginBottom: 8}}/>
            </TouchableWithoutFeedback>
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

export default Header