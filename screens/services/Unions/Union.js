import React, { PureComponent } from 'react'
import { View, Text, Image, Linking, StyleSheet, TouchableWithoutFeedback, Modal, TextInput, Alert, ScrollView, Platform } from 'react-native'
import call from 'react-native-phone-call'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 


const url = 'http://193.187.174.224'

export default class Ermak extends PureComponent{

    state = {
        onVisible: false,
        fio: '',
        institute: '',
        group: '',
        vk: '',
        hobby: '',
        why: ''
    }

    changeVisible(){
        this.setState({ onVisible: !this.state.onVisible })
    }

    async sendMessage(link){
        var vk = this.state.vk.split('/')
        if (this.state.fio === '' || this.state.institute === '' || this.state.group === '' || this.state.group === '' ||
        this.state.vk === '' || this.state.hobby === '' || this.state.why === '' || this.state.fio === 'text' || this.state.institute === 'text' ||
        this.state.group === 'text' || this.state.vk === 'text' || this.state.hobby === 'text' || this.state.why === 'text'){return null}
        const request = 'http://185.228.233.193:5000/invite?fio=' + this.state.fio + '&institute=' + this.state.institute + '&group=' + this.state.group + '&vk=' + vk[vk.length - 1] + '&hobby=' + this.state.hobby + '&reason=' + this.state.why + '&linkID=' + link
        const uri = encodeURI(request)

        try {
            await fetch(uri, {method: 'GET'})
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }
    }

    render(){
        const { container, icons, modalView, input, button, buttonText } = styles
        const data = this.props.route.params.data
        console.log(data)

        return(
        <View style={container}>
            <Header title={data.short_name} onPress={() => this.props.navigation.goBack()}/>
            <ScrollView>
                
            <View style={{ borderBottomWidth: 2, borderColor: 'gray'}}>
                <Image source={{uri: url + data.logo}}  style={{ width: w, height: w / 2, resizeMode: 'cover'}} blurRadius={Platform.OS === 'android' ? 0.5 : 1}/>
            </View>

            <View style={[styles.profile, styles.centerContent, styles.shadow1]}>
                <Image source={{uri: url + data.photo}} style={{width: w*0.4, height: w*0.4, borderRadius: w*0.4, borderWidth: 2, borderColor: 'gray'}} />
            </View>

            <Text style={{ fontFamily: 'roboto', fontSize: 20, marginTop: w * 0.2 + 20, marginLeft: 20, color: '#5575A7',}}>Описание</Text>
            <View style={[styles.box, styles.centerContent, styles.shadow2, {padding: 10}]}>
                <Text style={{fontFamily: 'roboto', fontSize: 13, color: '#5575A7', paddingLeft: 5}}>{data.about}</Text>
            </View>

            <Text style={{ fontFamily: 'roboto', fontSize: 20, marginTop: 15, marginLeft: 20, color: '#5575A7',}}>{data.leader_rank}</Text>
            {data.fio !== '-' ? 
            <View style={[styles.box, styles.centerContent, styles.shadow2]}>
                <Text style={{fontFamily: 'roboto', fontSize: 20, color: '#5575A7'}}>{data.fio}</Text>
            </View> : null}

            <View style={[styles.box, styles.shadow2, {flexDirection: 'row'}]}>
                <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="map-marker" size={24} color="rgb(115, 182, 28)" />
                </View>
                <View style={{ justifyContent: 'center'}}>
                    <Text style={buttonText}>{data.address}</Text>
                </View>
            </View>

            <View style={{flexDirection: 'column', paddingBottom: 180}}>
            <TouchableWithoutFeedback onPress={() => call({number: data.phone, prompt: false})}>
                <View style={[styles.box, styles.shadow2, {flexDirection: 'row'}]}>
                    <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="phone" size={24} color="rgb(115, 182, 28)" />
                    </View>
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={buttonText}>Позвонить</Text>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => Linking.openURL(data.group_vk)}>
                <View style={[styles.box, styles.centerContent, styles.shadow2, {flexDirection: 'row'}]}>
                    <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="vk-with-circle" size={24} color="rgb(115, 182, 28)" />
                    </View>
                    <View style={{ justifyContent: 'center'}}>
                        <Text style={buttonText}>Группа VK</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>

            {data.page_vk ?
            <TouchableWithoutFeedback onPress={() => this.changeVisible()}>
            <View style={[styles.box, styles.centerContent, styles.shadow2, { flexDirection: 'row'}]}>
                <View style={{ width: w * 0.1, justifyContent: 'center', alignItems: 'center'}}>
                    <Entypo name="circle-with-plus" size={24} color="rgb(115, 182, 28)" />
                </View>
                <View style={{ justifyContent: 'center'}}>
                    <Text style={buttonText}>Подать заявку</Text>
                </View> 
            </View>
        </TouchableWithoutFeedback> : null}
            

            <Modal animationType="slide" transparent={true} visible={this.state.onVisible}>
                <ScrollView>
                <View style={[styles.modal, styles.centerContent, styles.shadow2]}>
                    <View style={{width: w * 0.8, height: 45}}>
                    <TouchableWithoutFeedback onPress={() => this.changeVisible()}>
                        <Text style={{color: '#006AB3', fontSize: 50, marginLeft: 6}}>˟</Text>
                    </TouchableWithoutFeedback>
                    </View>

                    <Text style={{fontFamily: 'roboto', color: '#006AB3', fontSize: 24, marginBottom: 10}}>Заявка на вступление</Text>

                    <TextInput style={input} onChangeText={text => this.setState({fio: text})} placeholder={'ФИО'}/>
                    <TextInput style={input} onChangeText={text => this.setState({institute: text})} placeholder={'Институт'} />
                    <TextInput style={input} onChangeText={text => this.setState({group: text})} placeholder={'Группа'} />
                    <TextInput style={input} onChangeText={text => this.setState({vk: text})} placeholder={'ID в VK'} />
                    <TextInput style={input} onChangeText={text => this.setState({hobby: text})} placeholder={'Какие у вас есть увлечения?'} multiline scrollEnabled={true}/>
                    <TextInput style={input} onChangeText={text => this.setState({why: text})} placeholder={'Почему хотите вступить?'} multiline scrollEnabled={true} selectTextOnFocus={true}/>

                    <TouchableWithoutFeedback onPress={() => 
                        {this.sendMessage(data.page_vk.split('id')[1])
                        this.changeVisible()
                    }}>
                    <View style={{borderWidth: 1, borderColor: '#006AB3', borderRadius: 4, paddingBottom: 3, paddingTop: 3, paddingLeft: 5, paddingRight: 5, marginBottom: 10}}>
                        <Text style={{fontFamily: 'roboto', color: '#006AB3', fontSize: 15}}>ОТПРАВИТЬ</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
                </ScrollView>
            </Modal>
            </View>
            </ScrollView>
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
        width: w,
        flexDirection: 'column',
        backgroundColor: 'white',
    },

    icons: {
        width: w*0.08, 
        height:w*0.08, 
        resizeMode:"stretch", 
        marginLeft: 10, 
        marginRight: 10
    },

    modalView: {
        borderColor: '#006AB3', 
        borderWidth: 1, 
        borderRadius: 15, 
        backgroundColor: 'white', 
        width: w * 0.8, 
        alignSelf: 'center', 
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50
    },

    input: {
        height: 40,
        width: w * 0.75,
        borderBottomWidth: 1,
        borderColor: '#006AB3',
        marginBottom: 15,
        fontFamily: 'roboto',
        fontSize: 18
    },

    button: {
        height: w * 0.1, 
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'flex-end',
    },

    buttonText: {
        width: w * 0.8,
        color: '#006AB3', 
        fontFamily: 'roboto', 
        fontSize: 15,
        paddingTop: 10,
        paddingBottom: 10, 
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
        minHeight: 55,
        width: w * 0.9,
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    centerContent: {
        alignItems: 'center'
    },
})