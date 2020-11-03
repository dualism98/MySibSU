import React from 'react'
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native'
import { w } from './constants'

const Tab = ({onPress, title}) =>{
    return(
        <TouchableHighlight onPress={onPress}>
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    container:{
        width: w/3,
        height: 50,
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#006AB3',
        justifyContent: 'center',
    },

    text:{
        color: 'white',
        fontSize: 20,
        color: '#006AB3',
        fontFamily: 'roboto'
    }
})

export default Tab