import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, StatusBar } from 'react-native'
import { h, w } from './constants'
import { AntDesign } from '@expo/vector-icons'


const MainHeader = ({title, onPress, week}) => {
    const {container, maintext } = styles
    return(
        <View style={[styles.box, styles.shadow2]}>
            {/*<Image style={{width: 45, height: 45, marginLeft: 31}} source={require('../assets/logo.jpeg')}/>*/}
            <TouchableWithoutFeedback style={{ zIndex: 4}} onPress={onPress}>
                <AntDesign name="logout" size={24} color="gray" style={{ position: 'absolute', left: 20, top: 45, transform:[{rotate: '180deg'}] }}/>
            </TouchableWithoutFeedback>
            
            <Text style={maintext}>{title}</Text>
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
    container: {
        backgroundColor: 'white',
        height: 80,
        width: w,
        paddingTop: 30,
        elevation: 8,
        position: 'relative',
        flexDirection: 'row',
      },
    
    maintext: {
        fontSize: 30,
        color: 'grey',
        textAlignVertical: 'bottom',
        fontFamily: 'roboto',
        alignSelf: 'center',
        position: 'absolute',
        left: w * 0.3,
        top: 35,
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
        bottom: 10,
    },
    
    week_text: {
        fontFamily: 'roboto',
        fontSize: 17,
        color: 'gray'
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