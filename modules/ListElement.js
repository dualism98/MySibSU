import React from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text } from 'react-native';
import { h, w } from './constants';
  

const ListElement = ({onPress, title, prop}) => {
    const { container, text, down } = styles

    return(
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Text style={text} >{title}</Text>
                <Text style={down} >{prop}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        width: w * 0.7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 15,
        marginRight: w * 0.03,
        borderWidth: 2,
        borderColor: 'gray',
        borderRadius: 10,
        textAlignVertical: 'bottom',
    },

    text: {
        paddingTop: 5,
        fontSize: 24,
        color: '#006AB3',
        fontFamily: 'roboto',
        marginBottom: -5,
        textAlign: 'center',
    },

    down: {
        width: w * 0.7 * 0.94,
        fontFamily: 'roboto',
        color: '#006AB3',
        marginBottom: 5,
        textAlign: 'center',
    }
})

export default ListElement