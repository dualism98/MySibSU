import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ImageBackground, TextInput, Button, Linking } from 'react-native'
import { h, w } from '../modules/constants'
import Communications from 'react-native-communications';


export default class EventsScreen extends PureComponent {
    state={
        name: '',
        email: '',
        inst: '',
        message: ''
    }

    render(){
        const { container, text } = styles
        return(
            <View style={container}>
                <ImageBackground style={styles.back} source={require('../assets/inst_back.png')}>
                <View style={styles.nameview}>
                    <Text style={{fontWeight: 'bold', width: w * 0.2}}>Ваше имя</Text>
                    <TextInput style={styles.name} autoCompleteType='name' onChangeText={text => this.setState({name: text})} required/>
                </View>
                <View style={styles.nameview}>
                    <Text style={{fontWeight: 'bold', width: w * 0.2}}>E-mail</Text>
                    <TextInput style={styles.name} autoCompleteType='email' onChangeText={text => this.setState({email: text})} required/>
                </View>
                <View style={styles.nameview}>
                    <Text style={{fontWeight: 'bold', width: w * 0.2}}>Институт</Text>
                    <TextInput style={styles.name} autoCompleteType='name' onChangeText={text => this.setState({inst: text})} required/>
                </View>
                <View style={styles.textview}>
                    <Text style={{fontWeight: 'bold', width: w * 0.2}}>Вопрос</Text>
                    <TextInput style={styles.textinput} autoCompleteType='off' multiline={true} scrollEnabled={true} onChangeText={text => this.setState({message: text})}/>
                </View>
                <Button style={styles.button} onPress={() => Communications.email(['beachsidebearhi@gmail.com'],null,null,'Demo Subject','Demo Content for the mail')} title='Отправить'></Button>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    nameview:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },

    name: {
        width: w * 0.70,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'black',
        opacity: 0.7,
    },

    back:{
        width: w,
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    textview:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },

    textinput: {
        width: w * 0.70,
        backgroundColor: 'white',
        borderRadius: 5,
        height: h * 0.4,
        borderWidth: 2,
        borderColor: 'black',
        opacity: 0.7
    },

    button:{
        width: w * 0.9,
    }
})
