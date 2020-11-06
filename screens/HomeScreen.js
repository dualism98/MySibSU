import React, { Component, PureComponent, useState, setState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, Animated, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient';
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
      <Tabs.Navigator initialRouteName={'Расписание'} tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}>
        <Tabs.Screen name="События" component={EventsScreen}
        options={{
          headerShown: false,
        }}/>
        <Tabs.Screen name='Корпуса' component={MapScreen} 
        options={{
          headerShown: false,
        }}/>
        <Tabs.Screen name="Расписание" component={TimetableScreen}
        options={{
          headerShown: false,
        }}/>
        <Tabs.Screen name='Институты' component={InstituteStackScreen} 
        options={{
          headerShown: false,
        }}/>
        <Tabs.Screen name='Объединения' component={ActiveStackScreen}
        options={{
          headerShown: false,
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

type Props = {
  iconName: string;
  isCurrent?: boolean;
};

const BottomMenuItem = ({ iconName, isCurrent }: Props) => {
  const images = {
      'События': <Image source={isCurrent ? require('../assets/events.png') : require('../assets/events-outline.png')} style={{ width: 25, height: 25}}/>, 
      'Корпуса': <Image source={isCurrent ? require('../assets/map.png') : require('../assets/map-outline.png')} style={{ width: 25, height: 25}}/>, 
      'Расписание': <Image source={isCurrent ? require('../assets/timetable.png') : require('../assets/timetable-outline.png')} style={{ width: 25, height: 25, }}/>, 
      'Институты': <Image source={isCurrent ? require('../assets/institutes.png') : require('../assets/institutes-outline.png')} style={{ width: 25, height: 25}}/>,
      'Объединения': <Image source={isCurrent ? require('../assets/active.png') : require('../assets/active-outline.png')} style={{ width: 25, height: 25}}/>}
  const color = isCurrent ? '#5575A7' : 'gray'
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {images[iconName]}
      <Text style={{ fontFamily: 'roboto', fontSize: 10, color: color }}>{iconName}</Text>
    </View>
  );
};


const TabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(tabWidth * state.index));
  console.log(translateValue)
  return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
      
      <View style={{ flexDirection: "row" }}>
          <Animated.View
              style={[
                  style.slider,
                  {
                      transform: [{ translateX: translateValue }],
                      width: tabWidth - 30,
                      height: 3,
                      marginLeft: 5
                  },
              ]}
          />
          {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
          if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
          }

          Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
          });
          };
return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityStates={isFocused ? ["selected"] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <BottomMenuItem
                iconName={label.toString()}
                isCurrent={isFocused}
              />
            </TouchableOpacity>
          );
        })
      }
      </View>
    </View> 
  )
}

const style = StyleSheet.create({
  tabContainer: {
    height: 50,
    shadowOffset: {
      width: 0,
      height: -15,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4.0,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    elevation: 10,
    position: "absolute",
    bottom: 0,
  },
  slider: {
    height: 5,
    position: "absolute",
    top: 0,
    left: 10,
    backgroundColor: '#5575A7',
    borderRadius: 10,
    width: 50
},
});