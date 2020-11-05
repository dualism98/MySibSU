import React from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { h, w } from '../constants'
import Header from '../Header'

function Choose(){
    return(
        <View style={styles.container}>
            <View style={styles.table}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>#</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>Время</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>Перерыв</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>1 лента</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>08:00-09:30</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>10 мин.</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>2 лента</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>09:40-11:10</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>20 мин.</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>3 лента</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>11:30-13:00</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>30 мин.</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>4 лента</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>13:30-15:00</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>10 мин.</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>5 лента</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>15:10-16:40</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>10 мин.</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>6 лента</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>16:50-18:20</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>10 мин.</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>7 лента</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>18:30-20:00</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>10 мин.</Text></View>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.cell}><Text style={styles.cellText}>8 лента</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>20:10-21:40</Text></View>
                    <View style={styles.cell}><Text style={styles.cellText}>-</Text></View>
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
        borderRadius: 20,
    },

    cell: {
        width: w * 0.3,
        height: h * 0.06,
        borderRadius: 3,
        justifyContent: 'center',
        paddingLeft: 10,
        shadowColor: "#000",
        shadowOffset: {
	        width: 2,
	        height: 2,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 2,
    },

    cellText: {
        fontFamily: 'roboto',
        fontSize: 16,
        color: '#006AB3'
    }

})

export default Choose