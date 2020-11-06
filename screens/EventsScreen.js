import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MainHeader from '../modules/MainHeader'
import { h, w } from '../modules/constants'
import MapModule from '../modules/MapModule'

const url = 'https://api.mysibsau.ru/api/event/'
const secondURL = 'http://185.228.233.193/api/event/'

export default class EventsScreen extends PureComponent {
    state = {
        eventList: [],
        loading: true,
    }

    async componentDidMount() {
        try {
            const eventApiCall = await fetch(url, {method: 'GET'});
            const event = await eventApiCall.json();
            this.setState({eventList: event.reverse(), loading: false});

        } catch(err) {
            try {
                const eventApiCall = await fetch(secondURL, {method: 'GET'});
                const event = await eventApiCall.json();
                this.setState({eventList: event.reverse(), loading: false});
            }
            catch(err){
                console.log('Ошибка получения событий')
            }
        }
    }

    render(){
        const { eventList, loading} = this.state
        const { container, text } = styles
        return(
            <View style={container}>
                <MainHeader title={'Мои события'} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView nestedScrollEnabled = {true}>
                        {
                            (loading === true) ? <Text style={text}>Подождите, идет загрузка...</Text> :
                            eventList.map(item =>           
                                <MapModule key={item.name} name={item.name} inf={item.inf} />                              
                            )
                        }
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
