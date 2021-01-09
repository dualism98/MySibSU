import React, { useEffect, useState, useRef } from 'react'
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'

import {useTheme} from '../../../themes/ThemeManager'
import {useLocale} from '../../../locale/LocaleManager'

import SingleAnswer from '../../../modules/answers/SingleAnswer'
import MultipleAnswer from '../../../modules/answers/MultipleAnswer'
import TextAnswer from '../../../modules/answers/TextAnswer'


export default function PollScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    const [poll, setPoll] = useState({})
    const [loaded, setLoaded] = useState(false)
    const [answers, setAnswers] = useState([])

    useEffect(() => {
        fetch('http://193.187.174.224/v2/surveys/' + props.route.params.id + '/?uuid=' + props.route.params.UUID, {method: 'GET'})
            .then(response => response.json())
            .then(json => {
                setPoll(json)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    }, [props.route.params.UUID])

    function setResponses(id, data, type){
        let array = []
        answers.map(item => array.push(item))
        let there_is = false
        let index = -1

        array.map(item => {
            if (item.id == id){
                there_is = true
                index = array.indexOf(item)
            }
        })

        if (there_is){
            if (type === 2){
                array[index] = {"id": id, "text": data}
            }
            else{
                array[index] = {"id": id, "answers": data}
            }
        }
        else{
            if (type === 2){
                array.push({"id": id, "text": data})
            }
            else{
                array.push({"id": id, "answers": data})
            }
        }

        setAnswers(array)
    }

    function renderItem(id, type, options){
        const responses = {
        0: <SingleAnswer responses={options} onChange={data => setResponses(id, data, 0)}/>,
        1: <MultipleAnswer responses={options} onChange={data => setResponses(id, data, 1)}/>,
        2: <TextAnswer onChange={data => setResponses(id, data, 2)} />
        }

        return responses[type]
    }

    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
            <Header title={locale['feedback']} onPress={() => props.navigation.goBack()}/>
            <ScrollView>
                {!loaded ? 
                <View style={{ height: h, width: w, paddingBottom: 120, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color="#006AB3" />
                </View> : 
                <View style={{ minHeight: h, paddingBottom: 120}}>
                    <Text style={[styles.name]}>{poll.name}</Text>
                    {poll.questions.map(item => {
                        return(
                        <View style={[styles.question, styles.shadow, {backgroundColor: theme.blockColor}]}>
                            <View style={{ flexDirection: 'row'}}>
                                <Text style={{color: theme.labelColor, fontSize: 15, fontFamily: 'roboto'}}>{item.name}{!item.necessarily ? '\t(необязательно)' : null}</Text>
                            </View>
                            {renderItem(item.id, item.type, item.responses)}

                        </View>
                        )
                    })}
                    <TouchableOpacity onPress={() => console.log(answers)}>
                        <View style={[styles.shadow, {alignSelf: 'center', width: w / 4, height: w / 8, borderRadius: 15, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.blockColor, marginTop: 20}]}>
                            <Text style={{color: theme.labelColor}}>Отправить</Text>
                        </View>
                    </TouchableOpacity>
                </View>}
            </ScrollView>
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
        alignItems: 'center',
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
    },

    name: {
        width: w,
        fontFamily: 'roboto',
        fontSize: 20,
        color: '#5575A7',
        textAlign: 'left',
        paddingLeft: 20,
        marginTop: 20,
    },

    shadow: elevationShadowStyle(10),
    question: {
        width: w * 0.9,
        borderRadius: 15,
        alignSelf: 'center',
        padding: 10,
        marginTop: 20
    }
})
