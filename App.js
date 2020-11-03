import React from 'react'
import HomeScreen from './screens/HomeScreen'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font'


function App(){
  let [fontsLoaded] = useFonts({
    'roboto': require('./assets/fonts/release.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <HomeScreen />
  )
}

export default App;