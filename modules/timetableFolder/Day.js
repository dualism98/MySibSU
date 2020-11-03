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
                        <Text style={{ backgroundColor: 'red', alignSelf: 'center', fontSize: 18, color: 'white', paddingLeft: 8, paddingRight: 8, paddingBottom: 4, paddingTop: 3, borderRadius: 14, fontFamily: 'roboto', marginLeft: 3}}>cегодня</Text> :
                        <Text style={{ alignSelf: 'center', fontSize: 18, color: 'white', paddingLeft: 8, paddingRight: 8, paddingBottom: 4, paddingTop: 3, borderRadius: 14, fontFamily: 'roboto', marginLeft: 3}}>(сегодня)</Text>
                 : null}
                </View>
                <View style={styles.subjects}>
                    {day.lessons.map(item => {
                        return(<Subject data={item} key={item.time}/>)
                    })}
                </View>
            </View>
        )
    }
    else{
        return(null)
    }
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 30,
        width: w * 0.9,
        alignSelf: 'center',
    },

    dayname: {
        width: w * 0.9,
        minHeight: h * 0.06,
        maxHeight: h * 0.06,
        backgroundColor: '#006AB3',
        borderWidth: 2,
        borderColor: '#006AB3',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        justifyContent: 'center',
        flexDirection: 'row',
        alignContent: 'center',

    },

    title: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white', 
        fontFamily: 'roboto',
        fontSize: 20,
        alignSelf: 'center'
    },

    subjects: {
        width: w * 0.9,
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        borderColor: '#006AB3',
        borderWidth: 2,
        borderTopWidth: 0,
        paddingBottom: 10
    }
})

export default Day