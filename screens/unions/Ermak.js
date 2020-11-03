import React, { PureComponent } from 'react'
import { View, Text, Image, Linking, StyleSheet, TouchableWithoutFeedback, Modal, TextInput, Alert, ScrollView, BackHandler } from 'react-native'
import call from 'react-native-phone-call'
import Header from '../../modules/Header'
import { h, w } from '../../modules/constants'

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
        if (this.state.onVisible === false){
            this.setState({onVisible: true})
        }
        else{
            this.setState({onVisible: false})
        }
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
        const name = this.props.route.params.unions
        const info = this.props.route.params.data.filter( item => item[0] === name)

        return(
        <View style={container}>
            <Header title={name} onPress={() => this.props.navigation.goBack()}/>
            <View style={{flexDirection:'row', flexWrap: 'wrap', marginBottom: 15}}>
                <Image style={{width: w*0.4, height: w*0.4, borderRadius: w*0.4, borderWidth: 2, borderColor: 'rgb(125, 199, 28)', marginTop: 25, marginLeft: 25,}} source={info[0][1].photo} ></Image>
                <Text style={{width: w/2, marginTop: 40, marginLeft: 10, color: '#006AB3', fontFamily: 'roboto', fontSize: 15}}>{info[0][1].rank}{'\n'}{info[0][1].fio}</Text>
            </View>
            <View style={{flexDirection:'row', marginBottom: 20}}>
                <Image style={{width: w*0.1, height: w * 0.12, resizeMode:"stretch", marginLeft: 10, marginRight: 10}} source={require('../../assets/adress.png')}></Image>
                <Text style={{color: '#006AB3', fontFamily: 'roboto', fontSize: 15, justifyContent:'center', maxWidth: w * 0.6}}>{info[0][1].address}</Text>
            </View>
            <View style={{flexDirection: 'column', justifyContent: 'space-evenly', marginTop: 10, width: w/2, marginLeft: 10}}>
            <TouchableWithoutFeedback onPress={() => call({number: info[0][1].telefon, prompt: false})}>
                <View style={button}>
                    <Image style={icons} source={require('../../assets/telefon.png')}></Image>
                    <Text style={buttonText}>Позвонить</Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => Linking.openURL(info[0][1].vk)}>
                <View style={button}>
                    <Image style={icons} source={require('../../assets/vk.png')}></Image>
                    <Text style={buttonText}>Группа VK</Text>
                </View>
            </TouchableWithoutFeedback>
            {info[0][1].link !== '' ?
            <TouchableWithoutFeedback onPress={() => this.changeVisible()}>
            <View style={button}>
                <Image style={icons} source={require('../../assets/kafedra.png')}></Image>
                <Text style={buttonText}>Подать заявку</Text>
            </View>
        </TouchableWithoutFeedback> : null}
            

            <Modal animationType="slide" transparent={true} visible={this.state.onVisible}>
                <ScrollView>
                <View style={modalView}>
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
                        {this.sendMessage(info[0][1].link)
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
        </View>
        )
    }
}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        flexGrow: 1, 
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
        borderRadius: 4, 
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
        fontFamily: 'roboto',
        color: '#006AB3',
        fontSize: 18,
        textAlignVertical: 'center'
    }
})