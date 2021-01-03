import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ActiveElement from '../../../modules/ActiveElement'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'


export default class ActiveScreen extends PureComponent {
    state = {
        unions: [],
        loaded: false
    }

    async componentDidMount(){
        try{
            let unionRequest = await fetch('http://193.187.174.224/v2/campus/unions/', {method: 'GET'})
            let unions = await unionRequest.json()
            this.setState({ unions: unions, loaded: true})
        }
        catch(err){
            console.log(err)
        }
    }


    render(){
        const { container, text, main } = styles
        const { navigate } = this.props.navigation
        return(
            <View style={container}>
                <Header title={'Мои объединения'} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView>
                    <View style={main}>
                        {this.state.loaded ? 
                        this.state.unions.map( item => {
                            return(<ActiveElement onPress={() => navigate('Ermak', {data: item})} title={item.name} source={item.logo} key={item[0]} />)
                        }) : <ActivityIndicator size='large' color='#0060B3' />}
                       
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
        minHeight: h,
        justifyContent: 'center'
    },

    text: {
        fontSize: 25,
        color: '#006AB3',
        fontFamily: 'roboto',
        marginTop: 10,
        marginLeft: 10,
    },
})
