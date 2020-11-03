import React, { Component, PureComponent } from 'react'
import { Text, StyleSheet, View, Image, ImageBackground, TouchableWithoutFeedback, Modal, Linking } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AsyncStorage from '@react-native-community/async-storage'
import EventsScreen from './EventsScreen'
import MapScreen from './MapScreen'
import TimetableScreen from './TimetableScreen'
import InstitutesScreen from './InstitutesScreen'
import ActiveScreen from './ActiveScreen'
import IITK from './institutes/IITK'
import Ermak from './unions/Ermak'

const Tabs = createBottomTabNavigator();

export default class HomeScreen extends PureComponent{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <NavigationContainer>
      <Tabs.Navigator initialRouteName={'Расписание'}>
        <Tabs.Screen name="События" component={EventsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            var iconName = ''
            focused ? iconName=require('../assets/events.png') : iconName=require('../assets/events-outline.png')
            return <Image source={iconName} style={{ width: 25, height: 25}} />
          }
        }}/>
        <Tabs.Screen name='Корпуса' component={MapScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            var iconName = ''
            focused ? iconName=require('../assets/map.png') : iconName=require('../assets/map-outline.png')
            return <Image source={iconName} style={{ width: 25, height: 25}} />
          }
        }}/>
        <Tabs.Screen name="Расписание" component={TimetableScreen}
        options={{
          headerShown: false,
          
          
          tabBarIcon: ({ focused }) => {
            var iconName = ''
            focused ? iconName=require('../assets/timetable.png') : iconName=require('../assets/timetable-outline.png')

            return <Image source={iconName} style={{ width: 25, height: 25}} />
          }
        }}/>
        <Tabs.Screen name='Институты' component={InstituteStackScreen} 
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            var iconName = ''
            focused ? iconName=require('../assets/institutes.png') : iconName=require('../assets/institutes-outline.png')
            return <Image source={iconName} style={{ width: 25, height: 25}} />
          }
        }}/>
        <Tabs.Screen name='Объединения' component={ActiveStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            var iconName = ''
            focused ? iconName=require('../assets/active.png') : iconName=require('../assets/active-outline.png')
            return <Image source={iconName} style={{ width: 25, height: 25}} />
          }
        }}/>
      </Tabs.Navigator>
    </NavigationContainer>
  )
  }
}

const ActiveStack = createStackNavigator();

function ActiveStackScreen(){
  return(
    <ActiveStack.Navigator>
      <ActiveStack.Screen name="Active" component={ActiveScreen} 
        options={{
          headerShown: false,
      }}/>
      <ActiveStack.Screen name='Ermak' component={Ermak}
      options={{
        headerShown: false,
      }}/>
    </ActiveStack.Navigator>
  )
}

const InstituteStack = createStackNavigator();

function InstituteStackScreen(){
  return(
    <InstituteStack.Navigator>
      <InstituteStack.Screen name="Institutes" component={InstitutesScreen} 
        options={{
          headerShown: false,
          }}/>
      <InstituteStack.Screen name="IITK" component={IITK}
        options={{ title: 'ИИТК', headerShown: false
        }}/>
    </InstituteStack.Navigator>
  )
}