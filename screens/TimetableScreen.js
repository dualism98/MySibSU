import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TextInput, ScrollView, StatusBar, TouchableHighlight, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { h, w } from '../modules/constants'
import Choose from '../modules/timetableFolder/Choose'
import MainHeader from '../modules/MainHeader'
import TimetableHeader from '../modules/TimetableHeader'
import Day from '../modules/timetableFolder/Day'
import Swiper from 'react-native-swiper'
import Help from '../modules/timetableFolder/Help'
import { Ionicons } from '@expo/vector-icons'; 
import i18n from '../locale/locale'
import {useTheme} from '../themes/ThemeManager'

const groupURL = 'https://timetable.mysibsau.ru/groups/'

const storeData = async (value, name) => {
    try {
      await AsyncStorage.setItem('@key', String(value))
      await AsyncStorage.setItem('@name', String(name))
    } catch (e) {
    }
}

export default function TimetableScreen(props){
    const [group, setGroup] = useState(null)
    const [weekDay, setWeekDay] = useState('')
    const [week, setWeek] = useState(1)
    const [currentWeek, setCurrentWeek] = useState(1)
    const [textGroup, setTextGroup] = useState('')
    const [groupList, setGroupList] = useState([])
    const [timetable, setTimetable] = useState([{even_week: [], odd_week: []}])
    const [loaded, setLoaded] = useState(false)
    const [similar, setSimilar] = useState([])
    const [shown, setShown] = useState([])
    const [index, setIndex] = useState(1)
    const [first_dates, setFirstDates] = useState([])
    const [second_dates, setSecondDates] = useState([])

    const f_scrollViewRef = useRef()
    const s_scrollViewRef = useRef()

    const {mode, theme, toggle} = useTheme()

    useEffect(() => {
        console.log('Определение группы')
        AsyncStorage.getItem('@key').then((id) => setGroup(id))
        AsyncStorage.getItem('@name').then((name) => setTextGroup(name))
    }, [group])

    useEffect(() => {
        console.log('Получение расписания')
        let uri = 'https://timetable.mysibsau.ru/timetable/' + String(group)

        fetch(uri, {method: 'GET'})
            .then(response => response.json())
            .then(json => setTimetable(json))
    }, [group])

    useEffect(() => {
        console.log('Определение дат')
        var first = []
        var second = []
            
        if (currentWeek === 1) {
            for (var i = 0; i <= new Date().getDay() - 1; i++){
                first.push(new Date().setDate(new Date().getDate() - (new Date().getDay() - 1 - i)))
                first[i] = new Date(first[i])
            }
            for (var i = new Date().getDay(); i < 6; i++){
                first.push(new Date().setDate(new Date().getDate() + (i - new Date().getDay() + 1)))
                first[i] = new Date(first[i])
            }
            for (var i = 0; i < 6; i++){
                var tmp = new Date(first[i])
                second.push(tmp.setDate(tmp.getDate() + 7))
                second[i] = new Date(second[i])
            }
        }
        else{
            for (var i = 0; i <= new Date().getDay() - 1; i++){
                second.push(new Date().setDate(new Date().getDate() - (new Date().getDay() - 1 - i)))
                second[i] = new Date(second[i])
            }
            for (var i = new Date().getDay(); i < 6; i++){
                second.push(new Date().setDate(new Date().getDate() + (i - new Date().getDay() + 1)))
                second[i] = new Date(second[i])
            }
            for (var i = 0; i < 6; i++){
                var tmp = new Date(second[i])
                first.push(tmp.setDate(tmp.getDate() + 7))
                first[i] = new Date(first[i])
            }
        }
        setFirstDates(first)
        setSecondDates(second)
    }, [group])

    useEffect(() => {
        fetch(groupURL, {method: 'GET'})
            .then(response => response.json())
            .then(json => setGroupList(json))
        
        var array = []
        groupList.map(item => {
            array.push(item.name)
        })

        setSimilar(array)

        let date = new Date()
        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

        setWeekDay(days[date.getDay()])
        setLoaded(true)
    }, [group])

    function setCurrentGroup(name){
        var choosed = name
        .toUpperCase()
        .split(' ')[0]

        groupList.map(group => {
            if (group.name === choosed){
                setTextGroup(group.name)
                setGroup(group.id)
                storeData(group.id, group.name)
            }
        })
    }

    function similarGroup(text){
        setTextGroup(text)
        text !== '' && text.length > 2 ?
        setShown(similar.filter(item => {
            if(item.includes(text.toUpperCase()))
                return item
        })) : setShown([])
    }

    function getIndex(){
        if (((new Date() - new Date(2020, 9, 12, 0, 0, 0, 0))/1000/60/60/24)%14 <= 7)
            return 1
        else
            return 2
    }

    const renderHelp = ({ item }) => (
        <Help title={item} onPress={() => setCurrentGroup(item)} />
    )
    
    if (group === null){
        return(
            <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
                <StatusBar backgroundColor={theme.blockColor} barStyle={mode === 'light' ? 'dark-content' : 'light-content'}/>
                <MainHeader title={i18n.t('timetable')} onPress={() => props.navigation.goBack()}/>
                <View style={{flexDirection: 'row', marginTop: 25}}>
                    <TextInput style={[styles.input, {backgroundColor: theme.blockColor, color: theme.labelColor}]} placeholderTextColor={'lightgray'} onChangeText={text => similarGroup(text)} placeholder={i18n.t('input_group_name')} />
                    <TouchableHighlight style={{borderRadius: 7}} onPress={() => setCurrentGroup(textGroup)}>
                        <View style={[styles.button, {backgroundColor: theme.blockColor}]}>
                            <Ionicons name="ios-search" size={24} color="#006AB3" />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{ height: 30 + shown.length * 30, marginTop: 10, flexDirection: 'column', borderRadius: 15, paddingTop: 15, paddingBottom: 15, backgroundColor: theme.blockColor}}>
                    <FlatList 
                        data={shown}
                        renderItem={renderHelp}
                        keyExtractor={item => item}
                    />
                </View>
            </View>
        )
    }
    else {
        var y
        return(
            <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
                    <StatusBar backgroundColor={theme.blockColor} barStyle={mode === 'light' ? 'dark-content' : 'light-content'}/>
                    <TimetableHeader title={textGroup} week={index} onPress={() => {
                        AsyncStorage.removeItem('@key')
                        AsyncStorage.removeItem('@group')
                        setGroup(null); setTextGroup(''), setShown([]), setTimetable([{even_week: [], odd_week: []}])
                    }}/>

                    <Swiper style={styles.wrapper} loop={false} index={getIndex() - 1} showsPagination={false} onIndexChanged={(index) => setIndex(index)}>
                    <ScrollView ref={f_scrollViewRef}>
                    {!loaded ? 
                            <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                                <ActivityIndicator size='large' color={"#0060B3"}/>
                            </View> :
                        timetable[0].odd_week.map(item => {
                            const index = timetable[0].odd_week.indexOf(item)
                            return(
                                <View onLayout={(event) => {
                                    var date = new Date()
                                    if(date.getDay() - 1 === item.day && getIndex() === 1){
                                        const layout = event.nativeEvent.layout
                                        y = layout.y
                                        f_scrollViewRef.current.scrollTo({x: 0, y: y - 20, animated: true})
                                    }
                            }}>
                            <Day day={item} key={item.day} date={first_dates[index]} week={1} currentWeek={getIndex()} weekDay={weekDay} />
                        </View>
                    )})}
                    </ScrollView>
                    <ScrollView ref={s_scrollViewRef}>
                        {!loaded ?  
                            <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                                <ActivityIndicator size='large' color={"#0060B3"}/>
                            </View> :
                            timetable[0].even_week.map(item => {
                            const index = timetable[0].even_week.indexOf(item)
                            return(<View onLayout={(event) => {
                                var date = new Date()
                                if(date.getDay() - 1 === item.day && getIndex() === 2){
                                    const layout = event.nativeEvent.layout
                                    y = layout.y
                                    s_scrollViewRef.current.scrollTo({x: 0, y: y - 20, animated: true})
                                }
                            }}>
                            <Day day={item} key={item.day} date={second_dates[index]} week={2} currentWeek={getIndex()} weekDay={weekDay}/>
                        </View>) })}
                    </ScrollView>
                </Swiper>
            </View>
                
        )
    }   
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingBottom: 0,
    },

    input: {
        width: w * 0.745,
        height: h * 0.06,
        borderRadius: 7,
        backgroundColor: 'white',
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'roboto',
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 5,
        marginRight: w * 0.01
    },

    button: {
        height: h * 0.06,
        width: w * 0.145,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
	        width: 6,
	        height: 6,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 10,
        zIndex: 1,
    },

    changeText: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3',
    },

    loading: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3',
        alignSelf: 'center'
    },

    

})

