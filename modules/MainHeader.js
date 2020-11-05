import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { h, w } from './constants'


const MainHeader = ({title}) => {
    const {container, maintext} = styles
    return(
        <View style={container}>
            <Image style={{width: 45, height: 45, marginLeft: 31}} source={require('../assets/logo.jpeg')}/>
            <Text style={maintext}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: 80,
        width: w,
        paddingLeft: 10,
        paddingTop: 30,
        elevation: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'flex-end',
      },
    
    maintext: {
        fontSize: 30,
        color: 'grey',
        textAlignVertical: 'bottom',
        marginLeft: 10,
        fontFamily: 'roboto'
      },
})

export default MainHeader