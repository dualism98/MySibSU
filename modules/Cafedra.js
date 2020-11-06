import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { h, w } from './constants'

class Cafedra extends Component{
    state = {
        show: false
    }

    changeView(){
        if (this.state.show === false){
            this.setState({show: true})
        }
        else{
            this.setState({show: false})
        }
    }

    render(){
        return(
        <View style={{maxWidth: w - w*0.15, flexDirection:"row", paddingBottom: 5, paddingTop: 5, marginLeft: 10, borderLeftWidth: 2, borderLeftColor: '#006AB3', flexDirection: 'column'}}>
            <TouchableWithoutFeedback onPress={() => this.changeView()}>
                <Text style={styles.view}>{this.props.name}</Text>
            </TouchableWithoutFeedback>
            <View>
                {this.state.show === true ? 
                <View style={{ borderLeftWidth: 2, borderLeftColor: '#006AB3', paddingLeft: 10, marginLeft: 10 }}>
                <Text style={styles.text}>Зав. кафедрой: {this.props.fio}{'\n'}Адрес: {this.props.address}{'\n'}Телефон: {this.props.phone}{'\n'}Email: {this.props.email}</Text>
                </View>
                 
                : null}
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        height: 'auto', 
        color: '#006AB3', 
        fontFamily: 'roboto', 
        fontSize: 14, 
        flexWrap:'wrap', 
        marginLeft: 10
    },

    text: {
        height: 'auto', 
        color: '#006AB3', 
        fontFamily: 'roboto', 
        fontSize: 14, 
        flexWrap:'wrap',
    }
})

export default Cafedra