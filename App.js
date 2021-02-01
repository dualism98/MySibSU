import React, { useState, useEffect, setState } from 'react'
import {AsyncStorage, StatusBar} from 'react-native'
import HomeScreen from './screens/HomeScreen'
import AppLoading from 'expo-app-loading'
import { useFonts } from '@use-expo/font'
import { AppearanceProvider } from 'react-native-appearance'
import { ThemeManager } from './themes/ThemeManager'
import { LocaleManager } from './locale/LocaleManager'

function App(){

  const [week, setWeek] = useState(0)

  useEffect(() => {
    console.log('Определяем номер недели')
    fetch("https://mysibsau.ru/CurrentWeek/", {method: "GET"})
      .then(response => response.json())
      .then(json => global.week = json.week)
  }, [])

  // Устанавливаем кастомный шрифт, который лежит в ./assets/fonts/
  let [fontsLoaded] = useFonts({
    'roboto': require('./assets/fonts/18811.ttf'),
  });

  // Если шрифты еще не были установлены, продолжаем загружать приложение
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  // Проверяем наличие UUID в хранилище. Если его нет, то генерируем и записываем
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

  AsyncStorage.getItem('@mode')
    .then(res => {
      if (res === null)
        AsyncStorage.setItem('@mode', '0')
    })

  
  
  console.log("GLOBAL: ", global.week)

  // Если шрифты загружены и UUID существует, запускаем приложение
  return (
    <AppearanceProvider>
      <LocaleManager>
        <ThemeManager>
          <HomeScreen />
        </ThemeManager>
      </LocaleManager>
    </AppearanceProvider>  
  )
}

export default App;