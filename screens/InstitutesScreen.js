import React, { PureComponent } from 'react'
import { ScrollView, View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
import ListElement from '../modules/ListElement'
import MainHeader from '../modules/MainHeader'
import { h, w } from '../modules/constants'
import Info from '../modules/information'


export default class InstitutesScreen extends PureComponent {
    constructor(route, navigation){
        super(route, navigation)

        console.log(this.props)
    }

    render(){
        const { container, back } = styles
        const { navigate } = this.props.navigation
        const institutes = [['IITK', 'ИИТК', 'Институт информатики и телекоммуникаций'], ['IKT', 'ИКТ', 'Институт космической техники'],
                            ['IHT', 'ИХТ', 'Институт химических технологий'], ['ILT', 'ИЛТ', 'Институт лесных технологий'], 
                            ['ISI', 'ИСИ', 'Институт социального инжиниринга'], ['IEI', 'ИЭИ', 'Инженерно-экономический институт'],
                            ['IMM', 'ИММ', 'Институт машиноведения и мехатроники'], ['IGAITD', 'ИГАиТД', 'Институт гражданской авиации и таможенного дела'], 
                            ['IKIVT', 'ИКИВТ', 'Институт космических исследований и высоких технологий'], ['AK', 'АК', 'Аэрокосмический колледж']]

        const info = Info
        return(
            
            
            <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column' }} >
                <MainHeader title={'Мой институт'} onPress={() => this.props.navigation.goBack()}/>
                <View style={{flexDirection: 'row'}}>
                <Image style={back} source={require('../assets/rocket.png')} />
                <ScrollView style={{}}>
                    <View style={container}>
                        {institutes.map( institute => {
                            return( <ListElement onPress={() => navigate('IITK', {data: info, institute: institute[1]})} title={institute[1]} prop={institute[2]} key={institute[1]}/>)
                        })}
                    </View> 
                    
                </ScrollView> 
                </View>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignSelf: 'flex-end',
        flex: 1,
        marginBottom: 150,
    },

    back: {
        height: h - 2*w/5,
        width: w/5,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 40,
        zIndex: -1,
    },
})
