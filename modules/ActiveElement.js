import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { h, w } from './constants';
import { useTheme } from '../themes/ThemeManager'


const ListElement = ({onPress, title, source}) => {
    const {mode, theme, toggle} = useTheme()
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.box, styles.centerContent, styles.shadow2, {backgroundColor: theme.blockColor, flexDirection: 'row', justifyContent: 'space-between'}]}>
                <View style={{ height: 50, width: 50, borderRadius: 25, marginLeft: 5}}>
                    <Image style={{ height: 50, width: 50, borderRadius: 25,resizeMode: 'cover', borderWidth: 1, borderColor: 'gray'}} source={{ uri:'http://193.187.174.224' + source }}/>
                </View>
                <Text style={styles.text} >{title}</Text>
            </View>
        </TouchableOpacity>
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
    text: {
        width: w * 0.9 - 80,
        fontSize: 14,
        color: '#5575A7',
        fontFamily: 'roboto',
        textAlign: 'left',
    },

    shadow2: elevationShadowStyle(10),
    box: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 10,
        paddingLeft: 0,
        height: 60,
        width: w * 0.9,
        marginTop: 20,
        alignSelf: 'center'
    },
    centerContent: {
        alignItems: 'center'
    },
})

export default ListElement