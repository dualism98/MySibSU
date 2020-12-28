import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Linking, ScrollView, Image } from 'react-native'
import Header from '../../modules/Header'
import Maps from '../../modules/maps'
import { h, w } from '../../modules/constants'

export default class MapScreen extends PureComponent {
    render(){
        const { container, right, left, head, text, number, text_left } = styles
        const maps = Maps
            return(
                <View style={{backgroundColor:'white', flex: 1, paddingBottom: 0}}> 
                
                    <Header title="Мои корпуса" onPress={() => this.props.navigation.goBack()}/>  
                    <ScrollView>
                        <View style={container}>               
                            <View style={right}>
                                <Text style={head}>Учебные объекты (правый берег):</Text>
                                {maps[0].map( map => {
                                    return(<TouchableWithoutFeedback onPress={() => Linking.openURL(map.url)} key={map.name}>
                                            <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                                                <Text style={number}>{map.name.split('\"')[1]}</Text>
                                                <View style={{borderLeftWidth: 2, borderLeftColor: '#006AB3',}}>
                                                    <Text style={text}>{map.name.split('\"')[0]}{'\n'}{map.address}</Text>
                                                </View>
                                            </View>
                                            </TouchableWithoutFeedback>)
                                })}
                            </View>
                            <View style={left}>
                                <Text style={head}>Учебные объекты (левый берег):</Text>
                                {maps[1].map( map => {
                                    return(<TouchableWithoutFeedback onPress={() => Linking.openURL(map.url)} key={map.name}>
                                            <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                                            <Text style={number}>{map.name.split('\"')[1]}</Text>
                                            <Text style={text_left}>{map.name.split('\"')[0]}{'\n'}{map.address}</Text>
                                            </View>
                                            </TouchableWithoutFeedback>)
                                })}    
                            </View>
                        </View>
                    </ScrollView>
                </View>)
    }
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
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        width: w,
        paddingTop: 10,
        backgroundColor: 'white'
    },

    right: {
        width: w * 0.94,
        marginBottom: 10,
        flex: 1
    },

    left: {
        width: w * 0.94,
        marginBottom: 10,
        marginTop: 10,
    },

    head: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: 'grey',
        width: w * 0.94,
        marginBottom: 8,
        marginLeft: 7
    },

    text: {
        height: '100%',
        fontSize: 13,
        fontFamily: 'roboto',
        alignSelf: 'flex-start',
        color: 'black',
        paddingBottom: 0,
        paddingLeft: 11,
    },

    number: {
        height: '100%',
        width: 25,
        fontSize: 15,
        fontFamily: 'roboto',
        color: 'black',
        textAlignVertical: 'center',
        textAlign: 'center'
    },  

    text_left: {
        height: '100%',
        borderLeftWidth: 2,
        borderLeftColor: 'rgb(125, 199, 28)',
        fontSize: 13,
        fontFamily: 'roboto',
        alignSelf: 'flex-start',
        color: 'black',
        paddingBottom: 0,
        paddingLeft: 11,
        textAlignVertical: 'center'
    },

    changeText: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3',
    },

    shadow2: elevationShadowStyle(5),
    box: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 15,
        backgroundColor: 'white',
        width: w * 0.9, 
        marginTop: 10,
        paddingRight: 19,
        paddingLeft: 15,
        alignSelf: 'center'
    },
})