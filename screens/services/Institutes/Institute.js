import React, { PureComponent, Component } from 'react'
import { View, Text, StyleSheet, Image, Linking , TouchableWithoutFeedback} from 'react-native'
import call from 'react-native-phone-call'
import { h, w } from '../../../modules/constants'
import Header from '../../../modules/Header'
import { ScrollView } from 'react-native-gesture-handler'
import Cafedra from '../../../modules/Cafedra'
import Swiper from 'react-native-swiper'

const url = 'http://193.187.174.224'

const Information = ({ number, data }) => {
    if (number == 1){
        return(
            <View style={{ minHeight: h}}>
            <ScrollView>
                <View style={{ borderBottomWidth: 2, borderColor: 'gray'}}>
                    <Image source={require('../../../assets/back.png')}  style={{ width: w * 0.8, height: w / 2, resizeMode: 'cover', alignSelf: 'center'}}/>
                </View>
                <View style={[styles.profile, styles.centerContent, styles.shadow1]}>
                    <Image source={{uri: url + data.image}} style={{width: w*0.4, height: w*0.4, borderRadius: w*0.4, borderWidth: 2, borderColor: 'gray'}} />
                </View>
                <Text style={{ fontFamily: 'roboto', fontSize: 22, marginTop: w * 0.2 + 20, marginLeft: 20, color: '#5575A7',}}>Директор</Text>
                <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                    <Text style={{fontFamily: 'roboto', fontSize: 20, color: '#5575A7'}}>{data.name}</Text>
                </View>
                <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                    <Image style={{width: w*0.1, height: w * 0.1, resizeMode:'contain', position: 'absolute', left: 4 }} source={require('../../../assets/adress.png')}></Image>
                    <Text style={{color: '#006AB3', fontFamily: 'roboto', fontSize: 15, justifyContent:'center', paddingLeft: w * 0.1}}>{data.address}</Text>
                </View>
                <View style={{flexDirection: 'column', paddingBottom: 180}}>
                    <TouchableWithoutFeedback onPress={() => call({number: data.phone, prompt: false})}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                            <Image style={{width: w*0.08, height: w * 0.08, resizeMode:'contain', position: 'absolute', left: 6 }} source={require('../../../assets/telefon.png')}></Image>
                            <Text style={styles.buttonText}>Позвонить</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${data.mail}?subject==&`)}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                            <Image style={{ width: w*0.08, height: w * 0.08, resizeMode:'contain', position: 'absolute', left: 6 }} source={require('../../../assets/mail.png')}></Image>
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
                <Text style={{fontFamily: 'roboto', fontSize: 30, color: '#006AB3', marginLeft: 20, marginTop: 25, marginBottom: 20}}>КАФЕДРЫ</Text>
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
                <View style={{ borderBottomWidth: 2, borderColor: 'gray'}}>
                    <Image source={require('../../../assets/back.png')}  style={{ width: w * 0.8, height: w / 2, resizeMode: 'cover', alignSelf: 'center'}}/>
                </View>
                <View style={[styles.profile, styles.centerContent, styles.shadow1]}>
                    <Image source={{ uri: url + data.image}} style={{width: w*0.4, height: w*0.4, borderRadius: w*0.4, borderWidth: 2, borderColor: 'gray'}} />
                </View>
                <Text style={{ fontFamily: 'roboto', fontSize: 22, marginTop: w * 0.2 + 20, marginLeft: 20, color: '#5575A7',}}>Председатель</Text>
                <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                    <Text style={{fontFamily: 'roboto', fontSize: 20, color: '#5575A7'}}>{data.fio}</Text>
                </View>
                <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                    <Image style={{width: w*0.1, height: w * 0.1, resizeMode:'contain', position: 'absolute', left: 4 }} source={require('../../../assets/adress.png')}></Image>
                    <Text style={{color: '#006AB3', fontFamily: 'roboto', fontSize: 15, justifyContent:'center', paddingLeft: w * 0.1}}>{data.address}</Text>
                </View>
                <View style={{flexDirection: 'column', paddingBottom: 180}}>
                    <TouchableWithoutFeedback onPress={() => call({number: data.phone, prompt: false})}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                            <Image style={{width: w*0.08, height: w * 0.08, resizeMode:'contain', position: 'absolute', left: 6 }} source={require('../../../assets/telefon.png')}></Image>
                            <Text style={styles.buttonText}>Позвонить</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => Linking.openURL(`mailto:${data.mail}?subject==&`)}>
                        <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                            <Image style={{ width: w*0.08, height: w * 0.08, resizeMode:'contain', position: 'absolute', left: 6 }} source={require('../../../assets/mail.png')}></Image>
                            <Text style={styles.buttonText}>Написать письмо</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </ScrollView>
            </View>
        )
    }
}

export default class IITK extends PureComponent{
    state = {choice : 1}
    
    render(){
        const data = this.props.route.params.data
        console.log(data.soviet)
        return(
            <View style={styles.container}>
                <Header title={data.short_name} onPress={() => this.props.navigation.goBack()}/>
                <Swiper showsButtons={false} >
                    <View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>  
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
            </View>
        )
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
        color: '#006AB3', 
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
        width: w * 0.9,
        paddingLeft: w * 0.14,
        textAlign: 'left',
        fontFamily: 'roboto',
        color: '#006AB3',
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
        borderRadius: 30,
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

})