import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'

export default class ProductScreen extends PureComponent {
    state = {

    }

    render(){
        let item = this.props.route.params.item
        return(
            <View style={styles.container}>
                <Header title={'Интернет-каталог'} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                    <Image source={{uri: item.image}} style={styles.image}/>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={[styles.name, {marginTop: 10}]}>Цена: {item.price}₽</Text>
                    <Text style={styles.name}>Описание:</Text>
                    <Text style={styles.description}>{String(item.description)}</Text>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: h,
        flex: 1,
        width: w,
        paddingBottom: 40
    },

    image: {
        width: w - 40,
        height: w - 40,
        resizeMode: 'contain',
        marginTop: 20,
        borderRadius: 15,
        alignSelf: 'center'
    },

    name: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#5575A7',
        marginLeft: 20
    },

    description: {
        fontSize: 15,
        fontFamily: 'roboto',
        color: '#5575A7',
        paddingLeft: 20,
        paddingRight: 20,
    }
})
