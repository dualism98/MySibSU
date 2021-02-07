import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Animated, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { h, w } from '../../modules/constants'
import { AntDesign } from '@expo/vector-icons'
import Day from '../../modules/timetableFolder/Day'
import Swiper from 'react-native-swiper'


import {useTheme} from '../../themes/ThemeManager'
import {useLocale} from '../../locale/LocaleManager'
import {useWeek} from '../../week/WeekManager'

const URLs = ['group', 'teacher', 'place']


export default function TimetableScreen(props){
    const {mode, theme, toggle} = useTheme()
    const {localeMode, locale, toggleLang} = useLocale()
    const {week} = useWeek()

    const [group, setGroup] = useState(null)
    const [weekDay, setWeekDay] = useState('')
    const [currentWeek, setCurrentWeek] = useState(week)
    const [textGroup, setTextGroup] = useState('')
    const [timetable, setTimetable] = useState({even_week: [], odd_week: []})
    const [loaded, setLoaded] = useState(false)
    const [index, setIndex] = useState(week)
    const [first_dates, setFirstDates] = useState([])
    const [second_dates, setSecondDates] = useState([])
    const [timetableMode, setMode] = useState(0)

    const f_scrollViewRef = useRef()
    const s_scrollViewRef = useRef()
    
    const didFocusSubscription = props.navigation.addListener(
        'state',
        payload => {
            console.log('Определение группы')
            AsyncStorage.getItem('@mode').then((mode) => setMode(mode))
            AsyncStorage.getItem('@key').then((id) => setGroup(id))
            AsyncStorage.getItem('@name').then((name) => setTextGroup(name))
        }
      );
    
    // useEffect(() => {
    //     console.log('Определение группы')
    //     AsyncStorage.getItem('@mode').then((mode) => setMode(mode))
    //     AsyncStorage.getItem('@key').then((id) => setGroup(id))
    //     AsyncStorage.getItem('@name').then((name) => setTextGroup(name))
    // })

    useEffect(() => {
        if(group !== null){
            console.log('Получение расписания группы ' + textGroup )
            let uri = 'https://mysibsau.ru/v2/timetable/' + URLs[Number(timetableMode)] + '/' + String(group) + '/'
            console.log(uri)
            fetch(uri, {method: 'GET'})
                .then(response => {
                    if(response['status'] !== 200){
                        AsyncStorage.removeItem('@key')
                        AsyncStorage.removeItem('@group')
                        props.navigation.navigate('SearchScreen')
                        return {odd_week: [], even_week: []}
                    }
                    return response.json()})
                .then(json => {
                    setTimetable(json)
                    setLoaded(true)})
                .catch(err => console.log(err))
        }
    }, [group])

    useEffect(() => {
        console.log('Определение дат')
        var first = []
        var second = []
        const week = [6, 0, 1, 2, 3, 4, 5]
        
        if (this.getIndex() === 1) {
            for (var i = 0; i <= week[new Date().getDay()]; i++){
                first.push(new Date().setDate(new Date().getDate() - (week[new Date().getDay()] - i)))
                first[i] = new Date(first[i])
            }
            for (var i = new Date().getDay(); i < 6; i++){
                first.push(new Date().setDate(new Date().getDate() + (i - week[new Date().getDay()])))
                first[i] = new Date(first[i])
            }
            for (var i = 0; i < 6; i++){
                var tmp = new Date(first[i])
                second.push(tmp.setDate(tmp.getDate() + 7))
                second[i] = new Date(second[i])
            }
        }
        else{
            for (var i = 0; i <= week[new Date().getDay()]; i++){
                second.push(new Date().setDate(new Date().getDate() - (week[new Date().getDay() - i])))
                second[i] = new Date(second[i])
            }
            console.log(second)
            for (var i = new Date().getDay(); i < 6; i++){
                second.push(new Date().setDate(new Date().getDate() + (week[i - new Date().getDay()])))
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
        console.log('Определяем день недели')
        let date = new Date()
        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

        setWeekDay(locale[days[date.getDay()]])
    }, [])

    function getIndex(){
        if (((new Date() - new Date(2020, 9, 12, 0, 0, 0, 0))/1000/60/60/24)%14 <= 7)
            return 1
        else
            return 2
    }

    function changeIndex(){
        index === 1 ? setIndex(2) : setIndex(1)
    }
 
    const TimetableHeader = ({}) =>{
        return(
            <View style={[{backgroundColor: 'white',
                            height: w / 8,
                            width: w,
                            elevation: 10,
                            position: 'relative',
                            flexDirection: 'row',
                            alignItems: 'center',
                            zIndex: 4,}, styles.shadow, {backgroundColor: theme.blockColor}]}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{ width: 60, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            setTextGroup(''); setTimetable({even_week: [], odd_week: []}); setLoaded(false); setGroup(null)
                            AsyncStorage.removeItem('@key')
                            AsyncStorage.removeItem('@group')
                            props.navigation.navigate('SearchScreen')
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
                <View style={[{
                                height: w / 12,
                                width: 100,
                                alignItems: 'center',
                                paddingLeft: 5,
                                paddingRight: 5,
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
                                bottom: (w/8 - w/12)/2}, {backgroundColor: theme.headerColor}]}>
                    <Text style={[{height: w/12, textAlignVertical: 'center', fontFamily: 'roboto',
                                fontSize: 17,
                                color: 'gray'}, {color: theme.headerTitle}]}>{index} {locale['week']}</Text>
                </View>
                
            </View>
        )
    }
    
    return(
        <View style={[styles.container, {backgroundColor: theme.primaryBackground}]}>
                <StatusBar backgroundColor={theme.blockColor} barStyle={mode === 'light' ? 'dark-content' : 'light-content'}/>
                <TimetableHeader />
                <Swiper style={styles.wrapper} loop={false} index={currentWeek - 1} onIndexChanged={() => changeIndex()} showsPagination={false} >
                <ScrollView ref={f_scrollViewRef}>
                {!loaded ? 
                        <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size='large' color={"#0060B3"}/>
                        </View> :
                    timetable.odd_week.map(item => {
                        const index = timetable.odd_week.indexOf(item)
                        return(
                            <View key={item.day} onLayout={(event) => {
                                var date = new Date()
                                if(date.getDay() - 1 === item.day && currentWeek === 1){
                                    const layout = event.nativeEvent.layout
                                    f_scrollViewRef.current.scrollTo({x: 0, y: layout.y - 20, animated: true})
                                }
                        }}>
                        <Day day={item}  date={first_dates[index]} week={1} currentWeek={currentWeek} weekDay={weekDay} />
                    </View>
                )})}
                </ScrollView>
                <ScrollView ref={s_scrollViewRef}>
                    {!loaded ?  
                        <View style={{ height: h - 140, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size='large' color={"#0060B3"}/>
                        </View> :
                        timetable.even_week.map(item => {
                        const index = timetable.even_week.indexOf(item)
                        return(<View key={item.day} onLayout={(event) => {
                            var date = new Date()
                            if(date.getDay() - 1 === item.day && currentWeek === 2){
                                const layout = event.nativeEvent.layout
                                s_scrollViewRef.current.scrollTo({x: 0, y: layout.y - 20, animated: true})
                            }
                        }}>
                        <Day day={item} date={second_dates[index]} week={2} currentWeek={currentWeek} weekDay={weekDay}/>
                    </View>) })}
                </ScrollView>
            </Swiper>
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
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingBottom: 0,
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

