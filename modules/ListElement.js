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
        borderRadius: 10,
        textAlignVertical: 'bottom',
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 4,
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