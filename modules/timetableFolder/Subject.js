import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { h, w } from '../constants'

const types = ['', 'Лекция', 'Лабораторная работа', 'Практика']
const subgroups = ['', '1 подгруппа', '2 подгруппа']

const Subject = (data) =>{
    return(
        <View style={styles.container}>
            <Text style={styles.time}>{data.data.time}</Text>
            {data.data.subgroups.map(item => {
                return(
                    <View key={item.teacher + item.place}>
                        <View style={styles.line}></View>
                        {
                            (item.num !== 0) ? <Text style={styles.professor}>{subgroups[Number(item.num)]}</Text> : <View></View>
                        }
                        <Text style={styles.subject}>{item.name}</Text>
                        <Text style={styles.type}>{types[Number(item.type)]}</Text>
                        <Text style={styles.professor}>{item.teacher}</Text>
                        <Text style={styles.place}>{item.place}</Text>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: w * 0.89,
        borderColor: '#006AB3',
        borderTopWidth: 2,
        paddingLeft: 10,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5
    },

    time: {
        fontFamily: 'roboto',
        fontSize: 20,
        alignSelf: 'center'
    },

    line: {
        height: 1,
        width: w * 0.7,
        backgroundColor: 'gray',
        alignSelf: 'center'
    },

    subject: {
        marginTop: 4,
        fontSize: 18,
        color: '#006AB3',
        fontFamily: 'roboto'
    },

    type: {
        fontSize: 18,
        color: 'rgb(125, 199, 28)',
        fontFamily: 'roboto',
    },

    professor: {
        fontSize: 18,
        fontFamily: 'roboto',
        color: 'rgb(154,158,159)',
        marginBottom: -5
    },

    place: {
        fontSize: 18,
        color: 'gray',
        fontFamily: 'roboto',
        width: w * 0.82,
        textAlign: 'right',
        marginBottom: 3
    }
})

export default Subject