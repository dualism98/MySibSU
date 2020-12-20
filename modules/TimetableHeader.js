import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { h, w } from './constants'
import { AntDesign } from '@expo/vector-icons'


const MainHeader = ({title, onPress, week}) => {
    return(
        <View style={[styles.box, styles.shadow2]}>
            <TouchableWithoutFeedback style={{ zIndex: 4}} onPress={onPress}>
                <AntDesign name="logout" size={20} color="gray" style={{ position: 'absolute', left: 20, top: 35, transform:[{rotate: '180deg'}] }}/>
            </TouchableWithoutFeedback>
            
            <Text style={styles.maintext}>{title}</Text>
            <View style={styles.week}>
                <Text style={styles.week_text}>{week+1} неделя</Text>
            </View>
            
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
        color: 'grey',
        textAlignVertical: 'bottom',
        fontFamily: 'roboto',
        position: 'absolute',
        left: w * 0.15,
        top: 28,
      },

      week: {
        width: 100,
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 4,
        position: 'absolute',
        right: 10,
        bottom: 6,
    },
    
    week_text: {
        fontFamily: 'roboto',
        fontSize: 17,
        color: 'gray'
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