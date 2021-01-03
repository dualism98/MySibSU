import React, { useState, setState } from 'react'
import {AsyncStorage} from 'react-native'
import HomeScreen from './screens/HomeScreen'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font'
// import * as Random from 'expo-random';


function App(){

  let [fontsLoaded] = useFonts({
    'roboto': require('./assets/fonts/18811.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  AsyncStorage.getItem('UUID')
  .then(res => {
    if (res === null){
      AsyncStorage.setItem('UUID', Math.random().toString(36).substr(2, 8) + '-' + Math.random().toString(36).substr(2, 4) + '-' + 
      Math.random().toString(36).substr(2, 4) + '-' + Math.random().toString(36).substr(2, 4) + '-' + 
      Math.random().toString(36).substr(2, 12))
    }
    else{
      console.log(res)
    }
  })

  return (
    <HomeScreen />
  )
}

export default App;