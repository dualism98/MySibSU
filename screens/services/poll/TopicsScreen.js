import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import i18n from '../../../locale/locale'


export default class TopicsScreen extends PureComponent {
    render(){
        return(
            <View style={styles.container}>
                <Header title={i18n.t('feedback')} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                    
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        minHeight: h,
        width: w,
        paddingBottom: 40
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    },

    product_view: {
        paddingBottom: 100,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})
