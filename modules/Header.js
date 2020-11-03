import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { h, w } from './constants'
import { Ionicons } from '@expo/vector-icons'; 


const Header = ({title, onPress}) => {
    const {container, maintext} = styles
    return(
        <View style={container}>
            <TouchableWithoutFeedback onPress={onPress}>
                <Ionicons name="ios-arrow-back" size={30} color="black" style={{ color: '#006AB3', paddingRight: 20, marginBottom: 8}}/>
            </TouchableWithoutFeedback>
            
            <Image style={{width: 45, height: 45}} source={require('../assets/logo.jpeg')}/>
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
        borderBottomWidth: 3,
        borderColor: 'rgb(125, 199, 28)',
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

export default Header