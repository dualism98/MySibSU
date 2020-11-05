import React, { PureComponent, Component } from 'react'
import { View, Text, StyleSheet, Image, Linking , TouchableOpacity} from 'react-native'
import call from 'react-native-phone-call'
import { h, w } from '../../modules/constants'
import Header from '../../modules/Header'
import { ScrollView } from 'react-native-gesture-handler'
import Cafedra from '../../modules/Cafedra'
import Swiper from 'react-native-swiper'

const Information = ({ number, info }) => {
    if (number == 1){
        return(
            <View style={{ minHeight: h}}>
            <View style={styles.general}>
                <Text style={styles.generalText}>ОБЩАЯ ИНФОРМАЦИЯ</Text>
            </View>
            
            <View style={styles.dekan}>
                <Image style={{width: w*0.4, height: w*0.4, resizeMode: 'stretch', marginLeft: 15,}} source={info[0][1].photo} ></Image>
                <View>
                <Text style={styles.dekanText}>{info[0][1].rector} {'\n'}{info[0][1].pos}{'\n'}{info[0][1].rank}</Text>
                </View>
            </View>
            
            <View style={styles.info}>
                <Image style={{width: w*0.1, height: w * 0.12, resizeMode:"stretch", marginLeft: 15, marginRight: 10}} source={require('../../assets/adress.png')}></Image>
                <Text style={{height: 'auto', maxWidth: w * 0.6, color: '#006AB3', fontFamily: 'roboto', fontSize: 15, justifyContent:'center', marginBottom: 5, marginTop: 5}}>{info[0][1].address}</Text>
            </View>
            
            <TouchableOpacity onPress={() => call({number: info[0][1].telefon, prompt: false})}>
                <View style={styles.info}>
                    <Image style={{width: w*0.08, height:w*0.08, resizeMode:"stretch", marginLeft: 15, marginRight: 10 }} source={require('../../assets/telefon.png')}></Image>
                    <Text style={{ fontFamily: 'roboto', color: '#006AB3', fontSize: 18, textAlignVertical: 'center'}}>Позвонить</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${info[0][1].email}?subject==&`)}>
                <View style={styles.info}>
                    <Image style={{width: w*0.08, height:w*0.08, resizeMode:"stretch", marginLeft: 15, marginRight: 10}} source={require('../../assets/mail.png')}></Image>
                    <Text style={{ fontFamily: 'roboto', color: '#006AB3', fontSize: 18, textAlignVertical: 'center'}}>Написать письмо</Text>
                </View>
            </TouchableOpacity>
            </View>
        )
    }
    else if(number == 2){
        return(
            <View style={{}}>
                <Text style={{fontFamily: 'roboto', fontSize: 30, color: '#006AB3', marginLeft: 20, marginTop: 25, marginBottom: 20}}>КАФЕДРЫ</Text>
                {info[0][2].chairs.map( item => {
                    return( 
                        <Cafedra name={item[0]} fio={item[1]} address={item[2]} phone={item[3]} email={item[4]} key={item[0]}/>
                    )})}
            </View>
        )
    }
    else{
        if (info[0][3].pred !== 'none'){
        return(
            <View>
            <Text style={{fontFamily: 'roboto', fontSize: 30, color: '#006AB3', marginLeft: 20, marginTop: 25}}>СТУДЕНЧЕСКИЙ СОВЕТ</Text>
            <View style={{flexDirection:'row', flexWrap: 'wrap', marginBottom: 15}}>
                <Image style={{width: w*0.4, height: w*0.4, borderRadius: w*0.4, borderWidth: 2, borderColor: 'rgb(125, 199, 28)', marginTop: 25, marginLeft: 15,}} source={info[0][3].photo} ></Image>
                <Text style={{width: w/2, marginTop: 40, marginLeft: 10, color: '#006AB3', fontFamily: 'roboto', fontSize: 15}}>Председатель{'\n'}{info[0][3].pred}</Text>
            </View>
            <View style={{flexDirection:'row', marginBottom: 20}}>
                <Image style={{width: w*0.1, height: w * 0.12, resizeMode:"stretch", marginLeft: 15, marginRight: 10}} source={require('../../assets/address_.png')}></Image>
                <Text style={{height: 'auto', maxWidth: w * 0.6, color: '#006AB3', fontFamily: 'roboto', fontSize: 15, justifyContent:'center'}}>{info[0][3].address}</Text>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'space-evenly', marginTop: 10, width: w/2, marginLeft: 10}}>
            <TouchableOpacity onPress={() => call({number: info[0][3].telefon, prompt: false})}>
                <View style={{flexDirection: 'row', height: w * 0.1, marginBottom: 10}}>
                    <Image style={{width: w*0.08, height:w*0.08, resizeMode:"stretch", marginLeft: 10, marginRight: 10}} source={require('../../assets/telefon_.png')}></Image>
                    <Text style={{ fontFamily: 'roboto', color: '#006AB3', fontSize: 18, textAlignVertical: 'center'}}>Позвонить</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Linking.openURL(`mailto:${info[0][3].email}?subject==&`)}>
                {(info[0][3].email === undefined ? <View></View> : 
                <View  style={{flexDirection: 'row', height: w * 0.1, marginBottom: 10}}>
                    <Image style={{width: w*0.08, height:w*0.08, resizeMode:"stretch", marginLeft: 10, marginRight: 10}} source={require('../../assets/mail_.png')}></Image>
                    <Text style={{ fontFamily: 'roboto', color: '#006AB3', fontSize: 18, textAlignVertical: 'center'}}>Написать письмо</Text>
                </View>)}
            </TouchableOpacity>
            </View>
            </View>
        )}
        else{
            return(<View><Text style={{fontFamily: 'roboto', textAlign: 'center', marginTop: 10, color: '#006AB3'}}>Студ. Совета нет :с</Text></View>)
        }
    }
}

export default class IITK extends PureComponent{
    state = {choice : 1}
    
    render(){
        const info = this.props.route.params.data.filter(item => item[0] === this.props.route.params.institute)
        return(
            <View style={styles.container}>
                <Header title={this.props.route.params.institute} onPress={() => this.props.navigation.goBack()}/>
                <Swiper style={styles.wrapper} showsButtons={false}>
                    <View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'column' }}>  
                            <Information number={1} info={info} />
                        </ScrollView>
                    </View>
                    <View>
                        <ScrollView>
                            <Information number={2} info={info} />
                        </ScrollView>
                    </View>
                    <View>
                        <ScrollView>
                            <Information number={3} info={info} />
                        </ScrollView>
                    </View>
                </Swiper>
            </View>
        )
    }
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
    }

})