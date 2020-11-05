import React, {useState} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { h, w } from '../constants'
import { LinearGradient } from 'expo-linear-gradient'

const types = ['', 'Лекция', 'Лабораторная работа', 'Практика']
const subgroups = ['', 'I подгруппа', 'II подгруппа']

const Subject = (data) =>{
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)

    return(
        <View style={styles.container} onLayout={(event) =>{
            var {x, y, width, height} = event.nativeEvent.layout;
            setHeight(height)
            setWidth(width)
        }}>
            <LinearGradient
                colors={['white', 'lightgray']}
                style={{
                position: 'absolute',
                left: 3,
                right: 0,
                top: 4,
                height: height - 4,
                width: w * 0.89 - 3,
                borderRadius: 20,
                opacity: 0.4,
                alignSelf: 'center',
                }}

                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
            />
            
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

const styles = StyleSheet.create({
    container: {
        width: w * 0.9,
        paddingLeft: 15,
        paddingRight: 5,
        paddingTop: 7,
        paddingBottom: 5,
        marginTop: 8,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 4,
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
    }
})

export default Subject