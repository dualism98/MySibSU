import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MainHeader from '../modules/MainHeader'
import ServiceElement from '../modules/ServiceElement'
import { h, w } from '../modules/constants'
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


const services = [{name: 'Корпуса', path: 'Map', image: <Entypo name="map" size={44} color="#0060B3" />},
                    {name: 'Объединения', path: 'Active', image: <MaterialIcons name="people-outline" size={44} color="rgb(76, 174, 50)" />},
                    {name: 'Институты', path: 'Institutes', image: <FontAwesome5 name="university" size={42.5} color="gray" />}, 
                    {name: 'Интернет-каталог', path: 'Shop', image: <AntDesign name="shoppingcart" size={42} color="#ef8531" />},
                    {name: 'Обратная связь', path: 'Poll', image: <MaterialIcons name="poll" size={42} color="rgb(49, 151, 39)"/>}]

export default class EventsScreen extends PureComponent {
    render(){
        return(
            <View style={styles.container}>
                <MainHeader title={'Мои сервисы'} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                    <View style={{ width: w, minHeight: h, paddingTop: 20, paddingLeft: 5, paddingRight: 5, flexDirection: 'column', alignItems: 'center', alignContent: 'center', flexWrap: 'wrap'}}>
                        {services.map(item => {
                            console.log(item)
                            return(<ServiceElement name={item.name} image={item.image} onPress={() => this.props.navigation.navigate(item.path)}/>)
                        })}
                    </View>
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

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    }
})
