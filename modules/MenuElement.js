import React from 'react';
import { TouchableOpacity, ImageBackground, View, StyleSheet, Text } from 'react-native';
import { h, w } from './constants';


const MenuElement = ({data, date}) => {
    const { container, sub, h1, cover, down, downtext } = styles
    var { day, food } = data

    day = day.split('-')

    return(
        <View style={container}>
            <View style={sub}>
                <ImageBackground style={cover} source={require('../assets/menu_back.png')}>
                <Text style={h1}>{day[2]}.{day[1]}.{day[0]}</Text>
                </ImageBackground>
            </View>
            <View style={down}>
                {
                    food.map(item => (
                        <Text style={downtext}>{item.name} - {item.mass} г. - {item.price} р.</Text>
                    ))
                }
            </View>  
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: w * 0.8,
        marginBottom: 20,
        marginTop: 20,
    },

    sub: {
        height: w/9,
    },

    cover:{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    h1: {
        color: 'white',
        fontSize: w/12,
        alignSelf: 'center',
        fontFamily: 'roboto'
    },

    downtext:{
        paddingLeft: 8,
        paddingTop: 5,
        paddingBottom: 2,
        width: w * 0.8,
        borderWidth: 2,
        borderColor: '#518E90',
        fontSize: 20,
        fontFamily: 'roboto'
    }

})

export default MenuElement