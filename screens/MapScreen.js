import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableWithoutFeedback, Linking, ScrollView, Image } from 'react-native'
import MainHeader from '../modules/MainHeader'
import Maps from '../modules/maps'
import { h, w } from '../modules/constants'
//import MapView, {Marker} from 'react-native-maps'

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 56.007676;
const LONGITUDE = 92.871994;
const LATITUDE_DELTA = 0.0522;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends PureComponent {
    state = {
        mapView: 0,
        region: {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          },
    }

    render(){
        const { container, right, left, head, text, text_left, changeView, changeButton, changeButtonChoosen, changeText } = styles
        const maps = Maps
            return(
                <View style={{backgroundColor:'white', flex: 1, paddingBottom: 0}}> 
                
                    <MainHeader title="Мои корпуса" onPress={() => this.props.navigation.goBack()}/>  
                    <ScrollView>
                        <Text style={{width: w, marginTop: 25, marginLeft: 20, marginBottom: 10, fontSize: 30, color: '#006CB5', fontFamily: 'roboto' }}>CПИСОК КОРПУСОВ</Text>
                        <View style={container}>               
                            <View style={right}>
                                <Text style={head}>Учебные объекты (правый берег):</Text>
                                {maps[0].map( map => {
                                    return(<TouchableWithoutFeedback onPress={() => Linking.openURL(map.url)} key={map.name}>
                                            <View style={{borderBottomWidth: 2, borderBottomColor: '#006CB5', marginBottom: 10,}}>
                                            <Text style={text}>{map.name}{'\n'}{map.address}</Text>
                                            </View>
                                            </TouchableWithoutFeedback>)
                                })}
                            </View>
                            <View style={left}>
                                <Text style={head}>Учебные объекты (левый берег):</Text>
                                {maps[1].map( map => {
                                    return(<TouchableWithoutFeedback onPress={() => Linking.openURL(map.url)} key={map.name}>
                                            <View style={{borderBottomWidth: 2, borderBottomColor: 'rgb(125, 199, 28)', marginBottom: 10}}>
                                            <Text style={text}>{map.name}{'\n'}{map.address}</Text>
                                            </View>
                                            </TouchableWithoutFeedback>)
                                })}    
                            </View>
                        </View>
                    </ScrollView>
                </View>)
    }
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
        borderLeftWidth: 3,
        borderLeftColor: '#006CB5',
        paddingLeft: 7,
        flex: 1
    },

    left: {
        width: w * 0.94,
        marginBottom: 10,
        marginTop: 10,
        borderLeftWidth: 3,
        borderLeftColor: 'rgb(125, 199, 28)',
        paddingLeft: 7,
    },

    head: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: 'grey',
        width: w * 0.94,
        marginBottom: 8,
    },

    text: {
        width: w * 0.90,
        fontSize: 16,
        fontFamily: 'roboto',
        alignSelf: 'flex-start',
        color: 'black',
        paddingBottom: 4,
        
    },

    text_left: {
        width: w * 0.90,
        fontSize: 16,
        fontFamily: 'roboto',
        alignSelf: 'flex-start',
        color: 'black',
        paddingBottom: 4,
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(125, 199, 28)',
        marginBottom: 10,
    },

    changeView: {
        height: w * 0.1,
        flexDirection: 'row',
        alignSelf: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#006AB3',
    },

    changeButton: {
        width: w * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    changeButtonChoosen: {
        width: w * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
    },

    changeText: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3',
    },
})