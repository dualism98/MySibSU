import React, { useState, setState } from 'react'
import HomeScreen from './screens/HomeScreen'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font'
import * as Permissions from 'expo-permissions';


function App(){

  let [fontsLoaded] = useFonts({
    'roboto': require('./assets/fonts/18811.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <HomeScreen />
  )
}

export default App;