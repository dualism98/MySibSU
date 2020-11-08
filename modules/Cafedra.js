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
            <TouchableWithoutFeedback onPress={() => this.changeView()}>
                <View style={[styles.box, styles.shadow2]}>  
                    <View style={{ flex: 1, minHeight: 50, justifyContent: 'center'}}>
                        <Text style={styles.view}>{this.props.name}</Text>
                    </View>
                    {this.state.show === true ? 
                    <View style={{ borderLeftWidth: 2, borderLeftColor: '#006AB3', paddingLeft: 10, marginLeft: 10 }}>
                    <Text style={styles.text}>Зав. кафедрой: {this.props.fio}{'\n'}Адрес: {this.props.address}{'\n'}Телефон: {this.props.phone}{'\n'}Email: {this.props.email}</Text>
                    </View> : null}
                </View>
            </TouchableWithoutFeedback>
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
    view: { 
        textAlignVertical: 'center',
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
    },

    shadow2: elevationShadowStyle(5),
    box: {
        flex: 1,
        borderRadius: 15,
        backgroundColor: 'white',
        width: w * 0.9, 
        marginTop: 10,
        flexDirection: 'column',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 19,
        paddingLeft: 15,
        alignSelf: 'center',
        minHeight: 50,
    },
})

export default Cafedra