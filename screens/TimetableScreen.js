import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, TextInput, ScrollView, StatusBar, TouchableHighlight, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { h, w } from '../modules/constants'
import MainHeader from '../modules/MainHeader'
import { AntDesign } from '@expo/vector-icons'
import Day from '../modules/timetableFolder/Day'
import Swiper from 'react-native-swiper'
import Help from '../modules/timetableFolder/Help'
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

import {useTheme} from '../themes/ThemeManager'
import {useLocale} from '../locale/LocaleManager'

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
    const [currentWeek, setCurrentWeek] = useState(getIndex())
    const [textGroup, setTextGroup] = useState('')
    const [groupList, setGroupList] = useState([])
    const [timetable, setTimetable] = useState([{even_week: [], odd_week: []}])
    const [loaded, setLoaded] = useState(false)
    const [similar, setSimilar] = useState([])
    const [shown, setShown] = useState([])
    const [index, setIndex] = useState(getIndex())
    const [first_dates, setFirstDates] = useState([])
    const [second_dates, setSecondDates] = useState([])
    const [lastGroups, setLastGroups] = useState([])

    const f_scrollViewRef = useRef()
    const s_scrollViewRef = useRef()

    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()

    useEffect(() => {
        console.log('Определение группы')
        AsyncStorage.getItem('@key').then((id) => setGroup(id))
        AsyncStorage.getItem('@name').then((name) => setTextGroup(name))
        AsyncStorage.getItem('LastGroups').then((res) => res === null ? setLastGroups([]) : setLastGroups(JSON.parse(res)))
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
                console.log(second[i])
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
        console.log(name)
        var choosed = name
        .toUpperCase()
        .split(' ')[0]

        groupList.map(group => {
            if (group.name === choosed){
                setTextGroup(group.name)
                setGroup(group.id)
                storeData(group.id, group.name)
                AsyncStorage.getItem("LastGroups")
                    .then(res => {
                        let info = []
                        if (res !== null){
                            console.log("NOT NULL", res, group)
                            info.includes(group) ? console.log('DOES NOT INCLUDE') : info.push(group)

                            console.log('INFO: ', info)
                        }
                        else{
                            console.log('NULL')
                            info.push(group)
                        }
                        AsyncStorage.setItem('LastGroups', JSON.stringify(info))
                        setLastGroups(info)
                    })
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

    function changeIndex(){
        index === 1 ? setIndex(2) : setIndex(1)
    }
 
    const TimetableHeader = ({}) =>{
        return(
            <View style={[{backgroundColor: 'white',
                            height: 40,
                            width: w,
                            elevation: 10,
                            position: 'relative',
                            flexDirection: 'row',
                            alignItems: 'center',
                            zIndex: 4,}, styles.shadow, {backgroundColor: theme.blockColor}]}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{ width: 60, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            AsyncStorage.removeItem('@key')
                            AsyncStorage.removeItem('@group')
                            setGroup(null); setTextGroup(''), setShown([]), setTimetable([{even_week: [], odd_week: []}])
                        }}>
                            <AntDesign name="logout" size={20} color={theme.headerTitle} style={{transform:[{rotate: '180deg'}] }}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={[{
                        height: 40,
                        textAlignVertical: 'center',
                        fontSize: 25,
                        fontFamily: 'roboto',
                        color: theme.headerTitle}]}>{textGroup}</Text>
                </View>
                <View style={[{width: 100,
                                alignItems: 'center',
                                paddingLeft: 5,
                                paddingRight: 5,
                                paddingTop: 3,
                                paddingBottom: 3,
                                borderRadius: 15,
                                backgroundColor: 'white',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 6,
                                    height: 6,
                                },
                                shadowOpacity: 0.30,
                                shadowRadius: 4.65,

                                elevation: 4,
                                position: 'absolute',
                                right: 10,
                                bottom: 6,}, {backgroundColor: theme.headerColor}]}>
                    <Text style={[{fontFamily: 'roboto',
                                fontSize: 17,
                                color: 'gray'}, {color: theme.headerTitle}]}>{index} {locale['week']}</Text>
                </View>
                
            </View>
        )
    }
    
    if (group === null){
        return(
            <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
                <StatusBar backgroundColor={theme.blockColor} barStyle={mode === 'light' ? 'dark-content' : 'light-content'}/>
                <MainHeader title={locale['timetable']} onPress={() => props.navigation.goBack()}/>
                <View style={{flexDirection: 'row', marginTop: 25}}>
                    <TextInput style={[styles.input, {backgroundColor: theme.blockColor, color: theme.labelColor}]} placeholderTextColor={'lightgray'} onChangeText={text => similarGroup(text)} placeholder={locale['input_group_name']} />
                    <TouchableHighlight style={{borderRadius: 7}} onPress={() => setCurrentGroup(textGroup)}>
                        <View style={[styles.button, {backgroundColor: theme.blockColor}]}>
                            <Ionicons name="ios-search" size={24} color="#006AB3" />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={{ height: 30 + shown.length * 30, marginTop: 10, flexDirection: 'column', borderRadius: 15, paddingTop: 15, paddingBottom: 15, backgroundColor: theme.blockColor, zIndex: 3}}>
                    <FlatList 
                        data={shown}
                        renderItem={renderHelp}
                        keyExtractor={item => item}
                    />
                </View>
                <View style={[{ shadowColor: "#000",
                                shadowOffset: {
                                    width: 6,
                                    height: 6,
                                },
                                shadowOpacity: 0.30,
                                shadowRadius: 4.65,

                                elevation: 5,}, styles.shadow, { flex: 1, backgroundColor: theme.blockColor, width: w * 0.9, position: 'absolute', top: 120, zIndex: 0, borderRadius: 15, paddingBottom: 10}]}>
                    {lastGroups.length !== 0 ? 
                    <Text style={{ fontFamily: 'roboto', width: w, paddingLeft: 20, fontSize: 20, marginTop: 10, color: '#5575A7'}}>Последние</Text> : null}
                    {lastGroups.length !== 0 ? 
                        lastGroups.map(item => {
                            return(
                                <View style={{ height: 30, flexDirection: 'row', borderTopWidth: 1, borderColor: theme.labelColor, marginTop: 10}}>
                                <TouchableOpacity onPress={() => setCurrentGroup(item.name)}>
                                    <View style={{ height: 30, width: w * 0.8, paddingLeft: 20 }}>
                                        <Text style={{ height: 30, textAlignVertical: 'center', fontFamily: 'roboto', fontSize: 15, color: theme.labelColor}}>{item.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <View style={{height: 30, width: w * 0.1, alignItems: 'center', justifyContent: 'center'}}>
                                        <FontAwesome name="trash-o" size={20} color={theme.labelColor} />
                                    </View>
                                </TouchableOpacity>
                                </View>)
                        }) : null}
                </View>
            </View>
        )
    }
    else {
        var y
        return(
            <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
                    <StatusBar backgroundColor={theme.blockColor} barStyle={mode === 'light' ? 'dark-content' : 'light-content'}/>
                    <TimetableHeader />

                    <Swiper style={styles.wrapper} loop={false} index={getIndex() - 1} showsPagination={false} onIndexChanged={() => changeIndex()}>
                    <ScrollView ref={f_scrollViewRef}>
                    {!loaded ? 
                            <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                                <ActivityIndicator size='large' color={"#0060B3"}/>
                            </View> :
                        timetable[0].odd_week.map(item => {
                            const index = timetable[0].odd_week.indexOf(item)
                            return(
                                <View key={item.day} onLayout={(event) => {
                                    var date = new Date()
                                    if(date.getDay() - 1 === item.day && getIndex() === 1){
                                        const layout = event.nativeEvent.layout
                                        y = layout.y
                                        f_scrollViewRef.current.scrollTo({x: 0, y: y - 20, animated: true})
                                    }
                            }}>
                            <Day day={item}  date={first_dates[index]} week={1} currentWeek={getIndex()} weekDay={weekDay} />
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
                            return(<View key={item.day} onLayout={(event) => {
                                var date = new Date()
                                if(date.getDay() - 1 === item.day && getIndex() === 2){
                                    const layout = event.nativeEvent.layout
                                    y = layout.y
                                    s_scrollViewRef.current.scrollTo({x: 0, y: y - 20, animated: true})
                                }
                            }}>
                            <Day day={item} date={second_dates[index]} week={2} currentWeek={getIndex()} weekDay={weekDay}/>
                        </View>) })}
                    </ScrollView>
                </Swiper>
            </View>
                
        )
    }   
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

    shadow: elevationShadowStyle(5),

    

})

