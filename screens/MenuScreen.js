import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ScrollView, TapGestureHandler } from 'react-native-gesture-handler'
import { h, w } from '../modules/constants' 
import MenuElement from '../modules/MenuElement'
import Header from '../modules/Header'
import moment from 'moment'


const url = 'https://api.mysibsau.ru/api/day_food/'

function food(count){
    if (count == 0){
        return(<Text style={{fontSize: 20, fontFamily: 'roboto'}}>Меню на сегодня нет</Text>)
    }
}

export default class MenuScreen extends PureComponent {
    state = {
        dayList: [],
        loading: true,
        date: '',
    }

    async componentDidMount() {
        try {
            const foodApiCall = await fetch(url, {method: 'GET'});
            const day_food = await foodApiCall.json();
            this.setState({dayList: day_food, loading: false});
        } catch(err) {
            console.log("Error fetching data-----------", err);
        }

        var today = moment().format('YYYY-MM-DD')
        this.setState({
            date:
              today,
          });
    }
    
    render(){
        const { container, text, image, head, back } = styles
        const { dayList, loading, date } = this.state
        var count = 0
        return(
            
            <View>
                <Header title={'Моё меню'} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                <View style={container}>
                    <View>
                        {
                            dayList.map(item => {
                                if (item.day === date){
                                    count++
                                    return(
                                        <MenuElement data={item} date={date} key={item.id}/>
                                    )
                                }
                            })
                        }
                    </View>
                    <View>{food(count)}</View>
                </View>
                </ScrollView>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        minHeight: h,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
    },

})
