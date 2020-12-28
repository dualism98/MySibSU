import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import { ScrollView, TapGestureHandler } from 'react-native-gesture-handler'
import { h, w } from '../modules/constants' 
import MenuElement from '../modules/MenuElement'
import MainHeader from '../modules/MainHeader'
import moment from 'moment'


const url = 'http://185.228.233.193/api/day_food/'

function food(count){
    if (count == 0){
        return(<Text style={{fontSize: 20, fontFamily: 'roboto', marginTop: 20}}>Меню на сегодня нет</Text>)
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
            console.log(day_food)
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
        var count = 0
        return(
            
            <View>
                <MainHeader title={'Моё меню'}/>
                <ScrollView>
                <View style={styles.container}>
                    <View>
                        {
                            this.state.dayList.map(item => {
                                if (item.day === this.state.date){
                                    count++
                                    return(
                                        <MenuElement data={item} date={this.state.date} key={item.id}/>
                                    )
                                }
                            })
                        }
                    </View>
                    {this.state.loading === true ?
                        <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size='large' color='#0060B3' />
                        </View> :
                        food(count)}
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
