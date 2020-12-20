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
        const unions = [['Souz', 'Союз студентов', 'Союз студентов', require('../assets/souz.jpg')], ['AeroSOSI', 'Медиа-группа аэроСМИ', 'аэроСМИ', require('../assets/aerososi.png')], ['Sirius', 'Лига интеллектуальных игр «Сириус»', '«Сириус»', require('../assets/sirius.png')],
                        ['International', 'Международный студенческий клуб', 'МСК', require('../assets/international.png')], ['Cybersport', 'Киберспортивная лига', 'КСЛ', require('../assets/cybersport.jpg')],
                        ['Science', 'Студенческое научное общество', 'СНО', require('../assets/science.png')], ['Lis', 'Лига интеллектуального спорта «Лис»', '«Лис»', require('../assets/lis.png')], ['Profkom', 'Первичная профсоюзная организация студентов', 'Профком', require('../assets/profkom.png')],['Otryad', 'Студенческие отряды', 'Студенческие отряды', require('../assets/otryad.png')], ['Volunteer', 'Студенческий волонтерский ресурсный центр', 'Волонтерский центр', require('../assets/volunteer.png')], ['Ermak', 'Военно-патриотический клуб «Ермак»', '«Ермак»', require('../assets/ermak.png')], 
                          ['Insight', 'Социально-психологический центр «ИнсайТ»', '«ИнсайТ»', require('../assets/insight.jpg')]]
        const data = Unions
        return(
            <View style={container}>
                <MainHeader title={'Мои объединения'} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                    <View style={main}>
                        {unions.map( item => {
                            return(<ActiveElement onPress={() => navigate('Ermak', {unions: item[2], data: data})} title={item[1]} source={item[3]} key={item[0]} />)
                        })}
                       
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        paddingBottom: 150, 
        width: w,
    },

    text: {
        fontSize: 25,
        color: '#006AB3',
        fontFamily: 'roboto',
        marginTop: 10,
        marginLeft: 10,
    },
})
