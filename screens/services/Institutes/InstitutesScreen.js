import React, { PureComponent } from 'react'
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native'
import ListElement from '../../../modules/ListElement'
import Header from '../../../modules/Header'
import { h, w } from '../../../modules/constants'


export default class InstitutesScreen extends PureComponent {

    state = {
        institutes: [],
        loaded: false
    }

    async componentDidMount(){
        try{
            let institutesRequest = await fetch('http://193.187.174.224/v2/campus/institute/', {method: 'GET'})
            let institutes = await institutesRequest.json()
            this.setState({ institutes: institutes, loaded: true})
        }
        catch(err){
            console.log(err)
        }
    }

    render(){
        const { container, back } = styles
        const { navigate } = this.props.navigation
        return(
            <View style={{flex: 1, backgroundColor: 'white', flexDirection: 'column' }} >
                <Header title={'Мой институт'} onPress={() => this.props.navigation.goBack()}/>
                <View style={{flexDirection: 'row'}}>
                <Image style={back} source={require('../../../assets/rocket.png')} />
                <ScrollView style={{}}>
                    {this.state.loaded ? 
                    <View style={container}>
                        {this.state.institutes.map( institute => {
                            return( <ListElement onPress={() => navigate('IITK', {data: institute})} title={institute.short_name} prop={institute.name} key={institute.short_name}/>)
                        })}
                    </View> :
                    <View style={{ height: h, paddingBottom: 120, justifyContent: 'center'}}>
                        <ActivityIndicator size='large' color='#0060B3' />
                    </View>}
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
        minHeight: h,
        justifyContent: 'center'
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
