import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { h, w } from './constants'
import { AntDesign } from '@expo/vector-icons'


const MainHeader = ({title, onPress}) => {
    const {container, maintext} = styles
    return(
        <View style={container}>
            <Image style={{width: 45, height: 45, marginLeft: 31}} source={require('../assets/logo.jpeg')}/>
            <Text style={maintext}>{title}</Text>
                <TouchableWithoutFeedback onPress={onPress}>
                    <AntDesign name="logout" size={24} color="gray" style={{ position: 'absolute', right: 20, top: 45 }}/>
                </TouchableWithoutFeedback>
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

export default MainHeader