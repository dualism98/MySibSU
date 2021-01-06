import React, { PureComponent } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import MainHeader from '../../modules/MainHeader'
import { h, w } from '../../modules/constants'
import i18n from '../../locale/locale'


export default class PersonScreen extends PureComponent {
    render(){
        return(
            <View style={styles.container}>
                <MainHeader title={i18n.t('personal_account')} onPress={() => this.props.navigation.navigate('Settings')}/>
                <ScrollView>
                    
                </ScrollView>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        minHeight: h,
        flex: 1,
        width: w,
        paddingBottom: 40
    },

    text: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3'
    }
})
