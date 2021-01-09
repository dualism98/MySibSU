import React, { PureComponent } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'
import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'

export default function ProductScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    let item = props.route.params.item
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={locale['online_catalog']} onPress={() => props.navigation.goBack()}/>
            <ScrollView>
                <Image source={{uri: item.image}} style={styles.image}/>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={[styles.name, {marginTop: 10}]}>{locale['price']}: {item.price}₽</Text>
                <Text style={styles.name}>{locale['description']}:</Text>
                <Text style={styles.description}>{String(item.description)}</Text>
            </ScrollView>
        </View>
    )
    
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

    image: {
        width: w - 40,
        height: w - 40,
        resizeMode: 'contain',
        marginTop: 20,
        borderRadius: 15,
        alignSelf: 'center'
    },

    name: {
        marginTop: 30,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#5575A7',
        marginLeft: 20
    },

    description: {
        fontSize: 15,
        fontFamily: 'roboto',
        color: '#5575A7',
        paddingLeft: 20,
        paddingRight: 20,
    }
})
