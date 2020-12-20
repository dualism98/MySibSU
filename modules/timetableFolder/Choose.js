import React from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { h, w } from '../constants'
import Header from '../Header'

function Choose(){
    return(
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>#</Text>
                    <Text style={styles.cellText}>Время</Text>
                    <Text style={styles.cellText}>Перерыв</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>1 лента</Text>
                    <Text style={styles.cellText}>08:00-09:30</Text>
                    <Text style={styles.cellText}>10 мин.</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>2 лента</Text>
                    <Text style={styles.cellText}>09:40-11:10</Text>
                    <Text style={styles.cellText}>20 мин.</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>3 лента</Text>
                    <Text style={styles.cellText}>11:30-13:00</Text>
                    <Text style={styles.cellText}>30 мин.</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>4 лента</Text>
                    <Text style={styles.cellText}>13:30-15:00</Text>
                    <Text style={styles.cellText}>10 мин.</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>5 лента</Text>
                    <Text style={styles.cellText}>15:10-16:40</Text>
                    <Text style={styles.cellText}>10 мин.</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>6 лента</Text>
                    <Text style={styles.cellText}>16:50-18:20</Text>
                    <Text style={styles.cellText}>10 мин.</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>7 лента</Text>
                    <Text style={styles.cellText}>18:30-20:00</Text>
                    <Text style={styles.cellText}>10 мин.</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.cellText}>8 лента</Text>
                    <Text style={styles.cellText}>20:10-21:40</Text>
                    <Text style={styles.cellText}>-</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        zIndex: -1,
        position: 'absolute',
        top: 130 + h * 0.06, 
        
    },

    table: {
        marginTop: 20,
    },

    cell: {
        width: w * 0.9,
        height: h * 0.06,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowColor: "#000",
        shadowOffset: {
	        width: 2,
	        height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        marginTop: 3,
        elevation: 2,
    },

    cellText: {
        height: h * 0.06,
        width: w * 0.3,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'roboto',
        fontSize: 16,
        color: 'black'
    }

})

export default Choose