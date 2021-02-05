import React, { useState, useEffect, setState } from 'react'
import {AsyncStorage, View, Text} from 'react-native'
import HomeScreen from './screens/HomeScreen'
import AppLoading from 'expo-app-loading'
import { useFonts } from '@use-expo/font'
import { AppearanceProvider } from 'react-native-appearance'
import { ThemeManager } from './themes/ThemeManager'
import { LocaleManager } from './locale/LocaleManager'
import WeekManager from './week/WeekManager'

// async function getWeek(){
//   fetch("https://mysibsau.ru/CurrentWeek/", {method: "GET"})
//     .then(response => JSON.parse(response))
//     .then(json => {
//       console.log("JSON: ", json.week)
//       global.week = 2})
//     .then(res => {
//       console.log("RESPONSE: ", res)
//       console.log("GLOBAL: ", global.week)

      
//       })

//   return Promise.all(global.week)
// }

function App(){

  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false; 

  // const [loaded, setLoaded] = useState(false)


  // Устанавливаем кастомный шрифт, который лежит в ./assets/fonts/
  let [fontsLoaded] = useFonts({
    'roboto': require('./assets/fonts/18811.ttf'),
  });

  // Если шрифты еще не были установлены, продолжаем загружать приложение
  if (!fontsLoaded) {
    return <AppLoading 
            // startAsync={getWeek}
            // onFinish={() => setLoaded(true)}
            // onError={() =>{
            //   console.log('error')
            //   global.week = (((new Date() - new Date(2020, 9, 12, 0, 0, 0, 0))/1000/60/60/24)%14 <= 7) ? 1 : 2
            // }}
            />;
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

  

  return (
    <WeekManager>
      <AppearanceProvider>
        <LocaleManager>
          <ThemeManager>
            <HomeScreen />
          </ThemeManager>
        </LocaleManager>
      </AppearanceProvider> 
    </WeekManager> 
  )
}

export default App;