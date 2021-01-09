import React, { useState, useEffect, setState } from 'react'
import {AsyncStorage, StatusBar} from 'react-native'
import HomeScreen from './screens/HomeScreen'
import AppLoading from 'expo-app-loading'
import { useFonts } from '@use-expo/font'
import * as Notifications from 'expo-notifications'
import * as Localization from 'expo-localization'
import { AppearanceProvider } from 'react-native-appearance'
import { ThemeManager } from './themes/ThemeManager'
import { LocaleManager } from './locale/LocaleManager'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

Notifications.setNotificationChannelAsync('default', {
  name: 'default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 0],
  lightColor: '#000000',
});


function App(){

  let [notification, setNotification] = useState({})
  // Устанавливаем прослушивание событий на получение и нажатие пушей
  React.useEffect(() => {
    Notifications.addNotificationReceivedListener(_handleNotification);
    Notifications.addNotificationResponseReceivedListener(_handleNotificationResponse);
  })

 // Ловит получение пушей
  _handleNotification = notification => {
    setNotification(notification)
    console.log('Просто сработало')
  };

  // Ловит нажатия пушей
  _handleNotificationResponse = response => {
    console.log('Зашел через оповещение')
  };

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