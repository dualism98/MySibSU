import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Linking , TouchableWithoutFeedback} from 'react-native'
import call from 'react-native-phone-call'
import { h, w } from '../../../modules/constants'
import Header from '../../../modules/Header'
import { ScrollView } from 'react-native-gesture-handler'
import Cafedra from '../../../modules/Cafedra'
import Swiper from 'react-native-swiper'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from '../../../themes/ThemeManager'


const url = 'http://193.187.174.224'

const Information = ({ number, data }) => {
    const {mode, theme, toggle} = useTheme()
    if (number == 1){
        return(
            <View style={{ minHeight: h}}>
            <ScrollView>
                <View style={{ borderBottomWidth: 2, borderColor: 'gray', backgroundColor: 'white'}}>
                    <Image source={require('../../../assets/back.png')}  style={{ width: w * 0.8, height: w / 2, resizeMode: 'cover', alignSelf: 'center'}}/>
                </View>
                <View style={[styles.profile, styles.centerContent, styles.shadow1]}>
                    <Image source={{uri: url + data.image}} style={{width: w*0.4, height: w*0.4, borderRadius: w*0.4, borderWidth: 2, borderColor: 'gray'}} />
                </View>
                <Text style={{ fontFamily: 'roboto', fontSize: 22, marginTop: w * 0.2 + 20, marginLeft: 20, color: '#5575A7',}}>Директор</Text>
                <View style={[styles.box, styles.centerContent, styles.shadow2, {backgroundColor: theme.blockColor}]}>
                    <Text style={{fontFamily: 'roboto', fontSize: 20, color: '#5575A7'}}>{data.name}</Text>
                </View>
                <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                    <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="map-marker" size={24} color="rgb(115, 182, 28)" />
                    </View>
                    <Text style={{ width: w * 0.8, color: '#5575A7', fontFamily: 'roboto', fontSize: 15, justifyContent:'center'}}>{data.address}</Text>
                </View>
                <View style={{flexDirection: 'column', paddingBottom: 180}}>
                    <TouchableWithoutFeedback onPress={() => call({number: data.phone, prompt: false})}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                            <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons name="phone" size={24} color="rgb(115, 182, 28)" />
                            </View>
                            <Text style={styles.buttonText}>Позвонить</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${data.mail}?subject==&`)}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                            <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                <Ionicons name="mail" size={24} color="rgb(115, 182, 28)" />
                            </View>
                            <Text style={styles.buttonText}>Написать письмо</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            </View>
        )
    }
    else if(number == 2){
        return(
            <View style={{ minHeight: h, paddingBottom: 150}}>
                <Text style={{fontFamily: 'roboto', fontSize: 30, color: '#5575A7', marginLeft: 20, marginTop: 25, marginBottom: 20}}>КАФЕДРЫ</Text>
                {data.map( item => {
                    return( 
                        <Cafedra name={item.name} fio={item.fio} address={item.address} phone={item.phone} email={item.mail} key={item.name}/>
                    )})}
            </View>
        )
    }
    else{
        return(
            <View>
            <ScrollView>
                <View style={{ borderBottomWidth: 2, borderColor: 'gray', backgroundColor: 'white'}}>
                    <Image source={require('../../../assets/back.png')}  style={{ width: w * 0.8, height: w / 2, resizeMode: 'cover', alignSelf: 'center'}}/>
                </View>
                <View style={[styles.profile, styles.centerContent, styles.shadow1]}>
                    <Image source={{ uri: url + data.image}} style={{width: w*0.4, height: w*0.4, borderRadius: w*0.4, borderWidth: 2, borderColor: 'gray'}} />
                </View>
                <Text style={{ fontFamily: 'roboto', fontSize: 22, marginTop: w * 0.2 + 20, marginLeft: 20, color: '#5575A7',}}>Председатель</Text>
                <View style={[styles.box, styles.centerContent, styles.shadow2, {backgroundColor: theme.blockColor}]}>
                    <Text style={{fontFamily: 'roboto', fontSize: 20, color: '#5575A7'}}>{data.fio}</Text>
                </View>
                <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                    <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="map-marker" size={24} color="rgb(115, 182, 28)" />
                    </View>
                    <Text style={{ width: w * 0.8, color: '#5575A7', fontFamily: 'roboto', fontSize: 15, justifyContent:'center'}}>{data.address}</Text>
                </View>
                <View style={{flexDirection: 'column', paddingBottom: 180}}>
                    <TouchableWithoutFeedback onPress={() => call({number: data.phone, prompt: false})}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                            <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                <MaterialCommunityIcons name="phone" size={24} color="rgb(115, 182, 28)" />
                            </View>
                            <Text style={styles.buttonText}>Позвонить</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${data.mail}?subject==&`)}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row', backgroundColor: theme.blockColor}]}>
                            <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                                <Ionicons name="mail" size={24} color="rgb(115, 182, 28)" />
                            </View>
                            <Text style={styles.buttonText}>Написать письмо</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            </View>
        )
    }
}


export default function Institute(props){

    const [page, setPage] = useState(0)
    const {mode, theme, toggle} = useTheme()

    const data = props.route.params.data
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={data.short_name} onPress={() => props.navigation.goBack()}/>
            <Swiper style={styles.wrapper} onIndexChanged={index => setPage(index)}>
                <View>
                    <ScrollView>  
                        <Information number={1} data={data.director} />
                    </ScrollView>
                </View>
                <View>
                    <ScrollView>
                        <Information number={2} data={data.departments} />
                    </ScrollView>
                </View>
                <View>
                    <ScrollView>
                        <Information number={3} data={data.soviet} />
                    </ScrollView>
                </View>
            </Swiper>
            <View style={{ position: 'absolute', flexDirection: 'row', bottom: 60, alignSelf: 'center'}}>
                {[0,1,2].map(item =>{
                    return(<View style={{backgroundColor: page === item ? 'rgba(0, 122, 255, .5)' : 'rgba(0,0,0,.2)', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />)
                })}
            </View>
        </View>
    )
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
    container:{
        flex: 1,
        backgroundColor: 'white'
    },

    bottomTab:{
        flexDirection: 'row',
        alignSelf:'flex-end',
    },

    text: {
        fontSize: 24,
    },

    general: {
        width: w * 0.9,
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 15,
    },

    generalText: {
        fontFamily: 'roboto',
        fontSize: 30,
        color: '#006AB3', 
        textAlign: 'center',
    },

    dekan:{
        width: w * 0.9,
        height: w * 0.5,
        flexDirection: 'row',
        marginTop: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 4,
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
    },

    dekanText: {
        width: '80%',
        alignSelf: 'center',
        color: '#5575A7', 
        fontSize: 15, 
        fontFamily: 'roboto',
    },

    info: {
        minHeight: w * 0.15,
        width: w * 0.9,
        flexDirection: 'row',
        marginTop: 10,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 4,
        alignItems: 'center',
        alignSelf: 'center',
    },

    buttonText: {
        width: w * 0.8,
        fontFamily: 'roboto',
        color: '#5575A7',
        fontSize: 18,
        textAlignVertical: 'center'
    },

    shadow1: elevationShadowStyle(30),
    shadow2: elevationShadowStyle(10),

    profile: {
        borderRadius: w * 0.2,
        backgroundColor: 'white',
        width: w * 0.4,
        height: w * 0.4,
        alignSelf: 'center',
        position: 'absolute',
        top: w / 2 - 75,
    },

    modal: {
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 10,
        width: w * 0.9,
        marginTop: Platform.OS === 'android' ? 50 : 100,
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },

    box: {
        borderRadius: 15,
        backgroundColor: 'white',
        padding: 10,
        width: w * 0.9,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    centerContent: {
        alignItems: 'center'
    },

    wrapper: {
    }
})