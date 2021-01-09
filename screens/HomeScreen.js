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
import TopicsScreen from './services/poll/TopicsScreen'
import PollScreen from './services/poll/PollScreen'
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import PersonScreen from './personPage/PersonScreen'
import SettingsScreen from './personPage/SettingsScreen'
import { useTheme } from '../themes/ThemeManager'
import { useLocale } from '../locale/LocaleManager'


const Tabs = createBottomTabNavigator();

export default function HomeScreen(){
  const {localeMode, locale, toggleLang} = useLocale()
  
    return (
      <NavigationContainer>
      <Tabs.Navigator initialRouteName={'Timetable'} tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name={'Events'} component={EventsScreen}
        options={{
          headerShown: false,
          title: locale['events']
        }}/>
        <Tabs.Screen name={'Menu'} component={MenuScreen} 
        options={{
          headerShown: false,
          title: locale['menu']
        }}/>
        <Tabs.Screen name={'Timetable'} component={TimetableScreen}
        options={{
          headerShown: false,
          title: locale['timetable']
        }}/>
        <Tabs.Screen name={'Services'} component={ServiceStackScreen} 
        options={{
          headerShown: false,
          title: locale['services']
        }}/>
        <Tabs.Screen name={'Profile'} component={PersonStackScreen}
        options={{
          headerShown: false,
          title: locale['profile']
        }}/>
      </Tabs.Navigator>
    </NavigationContainer>
  )
  
}

const PersonStack = createStackNavigator();

function PersonStackScreen(){
  return(
    <PersonStack.Navigator initialRouteName='Account' headerMode='none'>
      <PersonStack.Screen name='Account' component={PersonScreen} />
      <PersonStack.Screen name='Settings' component={SettingsScreen} />
    </PersonStack.Navigator>
  )
}

const ServiceStack = createStackNavigator();

function ServiceStackScreen(){
  return(
    <ServiceStack.Navigator initialRouteName='Service' headerMode='none'>
      <ServiceStack.Screen name="Service" component={ServiceScreen} />
      <ServiceStack.Screen name="Active" component={ActiveScreen} />
      <ServiceStack.Screen name='Ermak' component={Ermak} />
      <ServiceStack.Screen name="Institutes" component={InstitutesScreen} />
      <ServiceStack.Screen name="IITK" component={IITK} />
      <ServiceStack.Screen name="Map" component={MapScreen} />
      <ServiceStack.Screen name='Shop' component={ShopScreen} />
      <ServiceStack.Screen name='Product' component={ProductScreen} />
      <ServiceStack.Screen name='Topics' component={TopicsScreen} />
      <ServiceStack.Screen name='Poll' component={PollScreen} />
    </ServiceStack.Navigator>
  )
}

const BottomMenuItem = ({ iconName, label, isCurrent }) => {

  const icons = {
    'Events': <MaterialCommunityIcons name="timetable" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'}  />, 
    'Menu': <MaterialIcons name="restaurant-menu" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'} />, 
    'Timetable': <MaterialCommunityIcons name="calendar-text" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'} />, 
    'Services': <AntDesign name="appstore-o" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'} />,
    'Profile': <Ionicons name='md-person' size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'} />}

  const color = isCurrent ? '#5575A7' : 'gray'
  return (
    <View
      style={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {icons[iconName]}
      <Text style={{ fontFamily: 'roboto', fontSize: 10, color: color }}>{label}</Text>
    </View>
  );
};


const TabBar = ({state, descriptors, navigation}) => {
  const {mode, theme, toggle} = useTheme()
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(tabWidth * state.index));
  return (
    <View style={[style.tabContainer, { width: totalWidth, backgroundColor: theme.blockColor}]}>
      
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
                iconName={route.name}
                label={options.title}
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