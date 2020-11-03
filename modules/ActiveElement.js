import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { h, w } from './constants';


const ListElement = ({onPress, title}) => {
    const { container, text } = styles

    return(
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <Text style={text} >{title}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        width: w * 0.45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        marginRight: w * 0.03,
        marginLeft: w * 0.03,
        flexWrap: 'wrap',
        alignContent: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(125, 199, 28)'
    },

    text: {
        fontSize: 15,
        color: '#006AB3',
        fontFamily: 'roboto',
        textAlign: 'center',
        maxWidth: w * 0.45,
    }
})

export default ListElement