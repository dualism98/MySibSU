import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { h, w } from '../constants'
import Subject from './Subject'

const weekday = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const Day = ({day, week, currentWeek, weekDay}) => {
    if (day.lessons.length !== 0){
        return(
            <View style={styles.container}>
                <View style={styles.dayname}>
                <Text style={styles.title}>{weekday[Number(day.day)]}</Text>
                {week === currentWeek && weekDay ===  weekday[Number(day.day)] ?
                        Platform.OS === 'android' ?
                        <Text style={{ backgroundColor: '#FF7575', opacity: 0.9, alignSelf: 'center', fontSize: 18, color: 'white', paddingLeft: 8, paddingRight: 8, paddingBottom: 4, paddingTop: 3, borderRadius: 14, fontFamily: 'roboto', marginLeft: 3,
                        shadowOffset: {
                            width: 0,
                            height: 3,
                        },
                        shadowOpacity: 0.27,
                        shadowRadius: 4.65,
                        elevation: 10,}}>cегодня</Text> :
                        <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white', paddingLeft: 8, paddingRight: 8, paddingBottom: 4, paddingTop: 3, borderRadius: 14, fontFamily: 'roboto', marginLeft: 3}}>(сегодня)</Text>
                 : null}
                </View>
                {day.lessons.map(item => {
                    let index = day.lessons.indexOf(item)
                    return(<Subject data={item} key={index}/>)
                })}
            </View>
        )
    }
    else{
        return(null)
    }
}

const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        marginBottom: 60,
        alignSelf: 'center',
    },

    dayname: {
        width: w * 0.9,
        minHeight: h * 0.06,
        maxHeight: h * 0.06,
        //backgroundColor: '#006AB3',
        //borderColor: '#006AB3',
        flexDirection: 'row',
        //elevation: 6,

    },

    title: {
        marginRight: 5,
        paddingLeft: 7,
        textAlign: 'left',
        textAlignVertical: 'center',
        color: '#5575A7', 
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'center'
    },

    subjects: {
        color: 'transparent',
        width: w * 0.9,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        //borderColor: '#006AB3',
        paddingBottom: 10
    }
})

export default Day