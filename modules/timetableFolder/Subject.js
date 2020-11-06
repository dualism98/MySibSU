import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { h, w } from '../constants'


const types = ['', 'Лекция', 'Лабораторная работа', 'Практика']
const subgroups = ['', 'I подгруппа', 'II подгруппа']

const Subject = (data) =>{
    return(
        <View style={[styles.box, styles.centerContent, styles.shadow2]}>
            <Text style={styles.time}>{data.data.time}</Text>
            {data.data.subgroups.map(item => {
                return(
                    <View key={item.teacher + item.place}>
                        <View style={styles.line}></View>
                        {
                            (item.num !== 0) ? <Text style={{fontSize: 14,
                                fontFamily: 'roboto',
                                color: 'rgb(154,158,159)',
                                marginBottom: -5, marginRight: 10}}>{subgroups[Number(item.num)]}</Text> : <View></View>
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

function elevationShadowStyle(elevation) {
    return {
      elevation,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0.5 * elevation },
      shadowOpacity: 0.3,
      shadowRadius: 0.8 * elevation
    };
  }

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: w * 0.9,
        paddingLeft: 15,
        paddingRight: 5,
        paddingTop: 7,
        paddingBottom: 5,
        marginTop: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        shadowRadius: 4,
        alignItems: 'center'
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
        color: '#5575A7',
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
    },

    shadow2: elevationShadowStyle(10),
  box: {
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    width: w * 0.9,
    marginTop: 10,
  },
  centerContent: {
    justifyContent: 'space-around',
    alignItems: 'center'
  },
})

export default Subject