import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {h, w} from './constants'
import {useTheme} from '../themes/ThemeManager'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const FAQModule = (data) => {
    const {mode, theme, toggle} = useTheme()
    const [show, setShow] = useState(false)
    return(
        <TouchableWithoutFeedback onPress={() => {
            setShow(!show)
            if(!show)
                fetch('https://mysibsau.ru/v2/support/faq/' + data.data.id + '/', {method: 'POST'})}}>
            <View style={[styles.container, {backgroundColor: theme.blockColor}]}>
                <Text style={styles.question}>{data.data.question}</Text>
                {show ? 
                <Text style={[styles.answer, {color: theme.labelColor}]}>{data.data.answer}</Text> : null}
            </View>
        </TouchableWithoutFeedback>
        
    )
}

const styles = StyleSheet.create({
    container: {
        width: w * 0.9, 
        padding: 10, 
        marginBottom: 7,
        marginTop: 5,
        borderRadius: 15, 
        elevation: 4, 
        alignSelf: 'center'
    },

    question: {
        fontFamily: 'roboto', 
        fontSize: 18, 
        color: '#0060B3'
    },

    answer: {
        fontFamily: 'roboto', 
        fontSize: 16, 
        marginTop: 10
    }
})

export default FAQModule