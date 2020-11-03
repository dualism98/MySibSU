import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActiveElement from '../modules/ActiveElement'
import MainHeader from '../modules/MainHeader'
import Unions from '../modules/unions'
import { h, w } from '../modules/constants'


export default class ActiveScreen extends PureComponent {
    render(){
        const { container, text, main } = styles
        const { navigate } = this.props.navigation
        const unions = [['Insight', 'Социально-психологический центр «ИнсайТ»', '«ИнсайТ»'], ['Ermak', 'Военно-патриотический клуб «Ермак»', '«Ермак»'], ['Souz', 'Союз студентов', 'Союз студентов'], ['Otryad', 'Студенческие отряды', 'Студенческие отряды'],
                        ['Lis', 'Лига интеллектуального спорта «Лис»', '«Лис»'], ['International', 'Международный студенческий клуб', 'МСК'], ['Cybersport', 'Киберспортивная лига', 'КСЛ'],
                        ['Science', 'Студенческое научное общество', 'СНО'], ['Volunteer', 'Студенческий волонтерский ресурсный центр', 'Волонтерский центр'], ['Profkom', 'Первичная профсоюзная организация студентов', 'Профком'],
                        ['AeroSOSI', 'Медиа-группа аэроСМИ', 'аэроСМИ'], ['Sirius', 'Лига интеллектуальных игр «Сириус»', '«Сириус»']]
        const data = Unions
        return(
            <View style={container}>
                <MainHeader title={'Мои объединения'} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                <Text style={text}>Студенческие объединения</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={main}>
                        {unions.map( item => {
                            return(<ActiveElement onPress={() => navigate('Ermak', {unions: item[2], data: data})} title={item[1]} key={item[0]} />)
                        })}
                       
                    </View>
                    <View style={{height: w * 0.8, paddingLeft: 15, marginTop: 30, borderLeftWidth: 2, borderLeftColor: '#006AB3', alignItems: 'center'}}>
                        <View style={{width: w * 0.4, marginTop: 15, borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#006AB3', alignItems: 'center'}}>
                            <Image style={{width: w * 0.6, height: w * 0.29, resizeMode: 'contain', marginBottom: 3, marginTop: 3}} source={require('../assets/active_1.png')} />
                        </View>
                        <View style={{width: w * 0.4, marginTop: 25, borderBottomWidth: 2, borderTopWidth: 2, borderColor: '#006AB3', alignItems: 'center'}}>
                            <Image style={{width: w * 0.6, height: w * 0.29, resizeMode: 'contain', marginBottom: 3, marginTop: 3}} source={require('../assets/active_2.png')} />
                        </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },

    main: {
        paddingBottom: 15, 
        width: w * 0.51,
    },

    text: {
        fontSize: 30,
        color: '#006AB3',
        fontFamily: 'roboto',
        marginTop: 10,
        marginLeft: 10,
    },
})
