import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, ScrollView, StatusBar, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { h, w } from '../modules/constants'
import Choose from '../modules/timetableFolder/Choose'
import MainHeader from '../modules/MainHeader'
import TimetableHeader from '../modules/TimetableHeader'
import Day from '../modules/timetableFolder/Day'
import Swiper from 'react-native-swiper'
import Help from '../modules/timetableFolder/Help'


const groupURL = 'https://timetable.mysibsau.ru/groups/'
const secondGroupURL = 'http://185.228.233.243/groups/'
const weekURL = 'http://185.228.233.243/CurrentWeek/'
const secondWeekURL = 'http://185.228.233.243/CurrentWeek/'

const storeData = async (value, name) => {
    try {
      await AsyncStorage.setItem('@key', String(value))
      await AsyncStorage.setItem('@name', String(name))
    } catch (e) {
    }
}


export default class TimetableScreen extends PureComponent {
    constructor(props){
        super(props)
    }

    state = {
        group: null,
        weekDay: '',
        week: 1,
        currentWeek: 1,
        textGroup: '',
        groupList: [],
        timetable: [{even_week: [], odd_week: []}],
        loading: true,
        changeButtonFirst: {
            width: w,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'lightgray',
        },
        changeButtonSecond: {
            width: w,
            alignItems: 'center',
            justifyContent: 'center',
        },
        similar: [],
        shown: [],
        x: 0,
        y: 0,
    }

    async getInfo(){
        var currentWeek = 0;
        const id = await AsyncStorage.getItem('@key').then((id) => this.setState({ group: id}))
        const name = await AsyncStorage.getItem('@name').then((name) => this.setState({ textGroup: name}))
        const weekApiCall = await fetch(weekURL, {method: 'GET'})
            const week = await weekApiCall.json()
            await this.setState({ week: week.week, currentWeek: week.week })

        this.getTimetable(this.state.group)
        return currentWeek
    }

    async componentDidMount(){
        try {
            this.getInfo()
            const groupsApiCall = await fetch(groupURL, {method: 'GET'})
            const groups = await groupsApiCall.json()
            await this.setState({ groupList: groups })
            
            var array = []
            groups.map(item => {
                array.push(item.name)
            })

            this.setState({similar: array})

            let date = new Date()
            let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

            this.setState({ weekDay:days[date.getDay()] })
        } catch(err) {
            const groupsApiCall = await fetch(secondGroupURL, {method: 'GET'})
            const groups = await groupsApiCall.json()
            await this.setState({ groupList: groups })
            
            var array = []
            groups.map(item => {
                array.push(item.name)
            })

            this.setState({similar: array})

            let date = new Date()
            let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

            this.setState({ weekDay:days[date.getDay()] })
        }
    }

    async getTimetable(id){
        var firstURL = 'https://timetable.mysibsau.ru/timetable/' + String(id)
        var secondURL = 'http://185.228.233.243/timetable/' + String(id)

        try {

            const timetableApiCall = await fetch(firstURL, {method: 'GET'})
            const timetable = await timetableApiCall.json()

            this.setState({ timetable: timetable, loading: false })
        } catch(err) {
            try{
                const timetableApiCall = await fetch(secondURL, {method: 'GET'})
                const timetable = await timetableApiCall.json()

                this.setState({ timetable: timetable, loading: false })
            }
            catch(err){
                console.log('Не могу получить расписание')
            }
        }
    }

    setGroup(name){
        var choosed = name
        .toUpperCase()
        .split(' ')[0]

        this.state.groupList.map(group => {

            if (group.name === choosed){
                this.setState({ textGroup: group.name})
                this.setState({ group: group.id})
                this.getTimetable(group.id)
                storeData(group.id, group.name)
            }
        })
    }

    similarGroup(text){
        if(text.length >= 2){
            this.setState({ shown: this.state.similar.filter(item => {
                if(item.includes(text.toUpperCase()))
                    return item
        })})
        }
    }

    getIndex(){
        if (((new Date() - new Date(2020, 9, 12, 0, 0, 0, 0))/1000/60/60/24)%14 <= 7)
            return 1
        else
            return 2
    }

    render(){
        if (this.state.group === null){
            return(
                <View style={styles.container}>
                <MainHeader title={'Моё расписание'} onPress={() => this.props.navigation.goBack()}/>
                <View style={{flexDirection: 'row', marginTop: 25}}>
                    <TextInput style={styles.input} onChangeText={text => this.similarGroup(text)} placeholder={'Введите название группы...'} />
                    <TouchableHighlight style={{borderTopRightRadius: 7, borderBottomRightRadius: 7}} onPress={() => this.setGroup(this.state.textGroup)}>
                        <View style={styles.button}>
                            <Text>🔍</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                {this.state.shown.map(item => {
                    return(<Help info={item} onPress={() => this.setGroup(item)} />)
                })}
                <Choose />
                </View>
            )
        }
        else {
            var y
            return(
                
                <View style={styles.container}>
                    <View style={{ height: StatusBar.currentHeight, width: w, backgroundColor: 'white', position: 'absolute', zIndex: 2}}></View>
                    <TimetableHeader title={this.state.textGroup} onPress={() => {
                        AsyncStorage.removeItem('@key')
                        AsyncStorage.removeItem('@group')
                        this.setState({ group: null, textGroup: '', shown: [], timetable: [{even_week: [], odd_week: []}]})
                        }}/>

                    <Swiper style={styles.wrapper} loop={false} index={this.getIndex() - 1} showsPagination={false}>
                        <ScrollView ref={"_ScrollView1"}>
    
                        <View style={styles.changeView}>
                            <TouchableWithoutFeedback>
                                <View style={this.state.changeButtonSecond}>
                                    <Text style={styles.changeText}>1 неделя</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {this.state.loading === true ? <Text style={styles.loading}>Подождите, идёт загрузка...</Text> :
                        this.state.timetable[0].odd_week.map(item => {
                            return(
                                <View onLayout={(event) => {
                                    var date = new Date()
                                    if(date.getDay() - 1 === item.day && this.getIndex() === 1){
                                        const layout = event.nativeEvent.layout
                                        y = layout.y
                                        this.refs._ScrollView1.scrollTo({x: 0, y: y - 20, animated: true})
                                    }
                                }}>
                                <Day day={item} key={item.day} week={1} currentWeek={this.getIndex()} weekDay={this.state.weekDay} />
                                </View>
                        )})}
                        </ScrollView>
                        <ScrollView ref={"_ScrollView2"}>
                        <View style={styles.changeView}>
                            <TouchableWithoutFeedback>
                                <View style={this.state.changeButtonSecond}>
                                    <Text style={styles.changeText}>2 неделя</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {this.state.loading === true ? <Text style={styles.loading}>Подождите, идёт загрузка...</Text> :
                        this.state.timetable[0].even_week.map(item => {
                            return(<View onLayout={(event) => {
                                var date = new Date()
                                if(date.getDay() - 1 === item.day && this.getIndex() === 2){
                                    const layout = event.nativeEvent.layout
                                    y = layout.y
                                    this.refs._ScrollView2.scrollTo({x: 0, y: y - 20, animated: true})
                                }
                            }}>
                            <Day day={item} key={item.day} week={2} currentWeek={this.getIndex()} weekDay={this.state.weekDay}/>
                            </View>) })}
                    
                        </ScrollView>
                    </Swiper>
                       
                </View>
                
            )
        }    
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        paddingBottom: 0
    },

    input: {
        width: w * 0.75,
        height: h * 0.06,
        borderWidth: 2,
        borderColor: '#006AB3',
        borderTopLeftRadius: 7,
        borderBottomLeftRadius: 7,
        backgroundColor: 'white',
        paddingLeft: 10,
        fontSize: 20,
        fontFamily: 'roboto'
    },

    button: {
        height: h * 0.06,
        width: w * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#006AB3',
        borderWidth: 2,
        borderLeftWidth: 0,
        borderTopRightRadius: 7,
        borderBottomRightRadius: 7,
        backgroundColor: 'white',
    },

    changeView: {
        height: w * 0.1,
        flexDirection: 'row',
        alignSelf: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#006AB3',
        marginBottom: 20
    },

    changeButton: {
        width: w,
        alignItems: 'center',
        justifyContent: 'center',
    },

    changeButtonChoosen: {
        width: w * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
    },

    changeText: {
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3',
    },

    changeGroupView: {
        height: w * 0.1,
        width: w,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderColor: '#006AB3',
    },

    changeGroupText: {
        color: '#006AB3',
        fontFamily: 'roboto',
        fontSize: 20
    },

    loading: {
        marginTop: 20,
        fontSize: 20,
        fontFamily: 'roboto',
        color: '#006AB3',
        alignSelf: 'center'
    }

})

