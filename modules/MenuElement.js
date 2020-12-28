import React from 'react';
import { TouchableOpacity, ImageBackground, View, StyleSheet, Text } from 'react-native';
import { h, w } from './constants';


const MenuElement = ({data, date}) => {
    const { sub, h1, down, downtext } = styles
    var { day, food } = data

    day = day.split('-')

    return(
        <View style={{ alignItems: 'center'}}>
            <View style={sub}>
                <Text style={h1}>{day[2]}.{day[1]}.{day[0]}</Text>
            </View>
            <View style={[styles.box, {flexDirection: 'row', heigth: 20, marginTop: 10, backgroundColor: 'rgb(240,240,240)', marginBottom: 10}]}>
                <View style={{ height: 20, width: '55%', }}>
                    <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'left', textAlignVertical: 'center' }}>Блюдо</Text>
                </View>
                <View style={{ height: 20, width: '15%',}}>
                    <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>Вес</Text>
                </View>
                <View style={{ height: 20, width: '30%', }}>
                    <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>Стоимость</Text>
                </View>
            </View>
            <View style={down}>
                {
                    food.map(item => (
                        <View style={[styles.box, styles.shadow2, {flexDirection: 'row', heigth: 20}]}>
                            <View style={{ height: 20, width: '55%', }}>
                                <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'left', textAlignVertical: 'center' }}>{item.name}</Text>
                            </View>
                            <View style={{ height: 20, width: '15%', }}>
                                <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>{item.mass}г.</Text>
                            </View>
                            <View style={{ height: 20, width: '30%',}}>
                                <Text style={{ height: '100%', fontFamily: 'roboto', fontSize: 15, textAlign: 'center', textAlignVertical: 'center' }}>{item.price}₽</Text>
                            </View>
                        </View>
                    ))
                }
            </View>  
        </View>
    );
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
    sub: {
        height: 30,
        width: '100%',
        marginTop: 20,
        marginLeft: 20
    },

    h1: {
        color: '#5575A7',
        fontSize: 22,
        fontFamily: 'roboto',
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
    },

    shadow2: elevationShadowStyle(6),
    box: {
      borderRadius: 15,
      backgroundColor: 'white',
      padding: 10,
      width: w * 0.9,
      marginTop: 10,
    },

})

export default MenuElement