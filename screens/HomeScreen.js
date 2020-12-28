import React, { Component, PureComponent, useState, setState } from 'react'
import { Text, StyleSheet, View, Image, Dimensions, Animated, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MenuScreen from './MenuScreen'
import EventsScreen from './EventsScreen'
import ServiceScreen from './ServiceScreen'
import MapScreen from './services/MapScreen'
import TimetableScreen from './TimetableScreen'
import InstitutesScreen from './services/Institutes/InstitutesScreen'
import ActiveScreen from './services/Unions/ActiveScreen'
import IITK from './services/Institutes/Institute'
import Ermak from './services/Unions/Union'
import ShopScreen from './services/shop/ShopScreen'
import ProductScreen from './services/shop/ProductScreen'
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import PersonScreen from './PersonScreen'



const Tabs = createBottomTabNavigator();

export default class HomeScreen extends PureComponent{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <NavigationContainer>
      <Tabs.Navigator initialRouteName={'Расписание'} tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="События" component={EventsScreen}
        options={{
          headerShown: false,
        }}/>
        <Tabs.Screen name='Меню' component={MenuScreen} 
        options={{
          headerShown: false,
        }}/>
        <Tabs.Screen name="Расписание" component={TimetableScreen}
        options={{
          headerShown: false,
        }}/>
        <Tabs.Screen name='Сервисы' component={ServiceStackScreen} 
        options={{
          headerShown: false,
        }}/>
        <Tabs.Screen name='Профиль' component={PersonScreen}
        options={{
          headerShown: false,
        }}/>
      </Tabs.Navigator>
    </NavigationContainer>
  )
  }
}

const ServiceStack = createStackNavigator();

function ServiceStackScreen(){
  return(
    <ServiceStack.Navigator>
      <ServiceStack.Screen name="Service" component={ServiceScreen} 
        options={{
          headerShown: false,
      }}/>
      <ServiceStack.Screen name="Active" component={ActiveScreen} 
        options={{
          headerShown: false,
      }}/>
      <ServiceStack.Screen name='Ermak' component={Ermak}
      options={{
        headerShown: false,
      }}/>
      <ServiceStack.Screen name="Institutes" component={InstitutesScreen} 
        options={{
          headerShown: false,
      }}/>
      <ServiceStack.Screen name="IITK" component={IITK} 
        options={{
          headerShown: false,
      }}/>
      <ServiceStack.Screen name="Map" component={MapScreen} 
        options={{
          headerShown: false,
      }}/>
      <ServiceStack.Screen name='Shop' component={ShopScreen}
        options={{
          headerShown: false,
      }}/>
      <ServiceStack.Screen name='Product' component={ProductScreen}
        options={{
          headerShown: false,
      }}/>
    </ServiceStack.Navigator>
  )
}

const BottomMenuItem = ({ iconName, isCurrent }) => {
  const images = {
      'События': <MaterialCommunityIcons name="timetable" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'}  />, 
      'Меню': <MaterialIcons name="restaurant-menu" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'} />, 
      'Расписание': <MaterialCommunityIcons name="calendar-text" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'} />, 
      'Сервисы': <AntDesign name="appstore-o" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'} />,
      'Профиль': <Ionicons name='md-person' size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'} />}
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
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
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