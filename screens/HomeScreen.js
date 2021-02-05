import React, { useState } from 'react'
import { Text, StyleSheet, View,  Dimensions, TouchableOpacity, AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MenuScreen from './MenuScreen'
import EventsScreen from './EventsScreen'
import NewsScreen from './NewsScreen'
import ServiceScreen from './ServiceScreen'
import MapScreen from './services/MapScreen'
import InstitutesScreen from './services/Institutes/InstitutesScreen'
import ActiveScreen from './services/student_life/ActiveScreen'
import SportScreen from './services/student_life/SportScreen'
import DesignScreen from './services/student_life/DesignScreen'
import IITK from './services/Institutes/Institute'
import Ermak from './services/student_life/Unit'
import ShopScreen from './services/shop/ShopScreen'
import ProductScreen from './services/shop/ProductScreen'
import FAQScreen from './services/FAQScreen'
import TopicsScreen from './services/poll/TopicsScreen'
import SearchScreen from './Timetable/SearchScreen'
import TimetableScreen from './Timetable/TimetableScreen'
import PollScreen from './services/poll/PollScreen'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import PersonScreen from './personPage/PersonScreen'
import SettingsScreen from './personPage/SettingsScreen'
import { useTheme } from '../themes/ThemeManager'
import { useLocale } from '../locale/LocaleManager'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useEffect } from 'react'
import Animated, {Easing} from 'react-native-reanimated'

const FeedTab = createMaterialTopTabNavigator();

function FeedTabs() {
  const {localeMode, locale, toggleLang} = useLocale()
  const {mode, theme, toggle} = useTheme()
  return (
    <FeedTab.Navigator tabBarOptions={{
      labelStyle: {
        fontFamily: 'roboto',
        fontSize: 13,
      },
      tabStyle: {
        height: Dimensions.get('window').width / 8,
        width: Dimensions.get('window').width / 4,
      },
      style: {
        backgroundColor: theme.blockColor,
        paddingLeft: Dimensions.get('window').width / 4,
        elevation: 6
      },
      indicatorStyle: {
        marginLeft: Dimensions.get('window').width / 4
      },
      activeTintColor: theme.labelColor,
      allowFontScaling: false,
    }}>
      <FeedTab.Screen  options={{ title: locale['events'] }} name="Events" component={EventsScreen} />
      <FeedTab.Screen options={{ title: locale['news'] }} name="News" component={NewsScreen} />
    </FeedTab.Navigator>
  );
}

function MyTabBar({ state, descriptors, navigation, position }) {
  const {mode, theme, toggle} = useTheme()
  const inputRange = state.routes.map((_, i) => i);
  const translateX = Animated.interpolate(position, {
    inputRange,
    outputRange: inputRange.map(i => i * Dimensions.get('window').width / 4)
  })
  
  return (
    <View style={{ flexDirection: 'row', backgroundColor: theme.blockColor, elevation: 6}}>
      <TouchableOpacity onPress={() => navigation.navigate('Service')}>
        <View style={{ height: Dimensions.get('window').width / 8, width: Dimensions.get('window').width / 8 , justifyContent: 'center'}}>
          <Ionicons name="ios-arrow-back" size={30} color="black" style={{ color: '#006AB3', paddingRight: 10, paddingLeft: 15}}/>
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
            style.slider,
            {
                transform: [{translateX}],
                width: Dimensions.get('window').width / 4,
                height: 2,
            },
        ]}
          />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ width: Dimensions.get('window').width / 4, alignItems: 'center', justifyContent: 'center' }}
          >
            <Animated.Text style={{ textTransform: 'uppercase', fontFamily: 'roboto', color: theme.labelColor, fontSize: 13, opacity }}>
              {label}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const StudentLifeTab = createMaterialTopTabNavigator();

function StudentLifeTabs(){
  const {localeMode, locale, toggleLang} = useLocale()
  const {mode, theme, toggle} = useTheme()
  return(
    <StudentLifeTab.Navigator tabBar={props => <MyTabBar {...props} />} tabBarOptions={{
      indicatorStyle: {
        marginLeft: Dimensions.get('window').width / 8
      },
      activeTintColor: theme.labelColor,
    }}>
      <StudentLifeTab.Screen options={{ title: locale['unions']}} name="Unions" component={ActiveScreen} />
      <StudentLifeTab.Screen options={{ title: locale['sport']}} name="Sport" component={SportScreen} />
      <StudentLifeTab.Screen options={{ title: locale['sdo']}} name="Design" component={DesignScreen} />
    </StudentLifeTab.Navigator>
  )
}

const Tabs = createBottomTabNavigator();

export default function HomeScreen(){
  const {localeMode, locale, toggleLang} = useLocale()
  
    return (
      <NavigationContainer>
      <Tabs.Navigator initialRouteName={'Timetable'} tabBar={(props) => <MainTabBar {...props} />}>
        <Tabs.Screen name={'Feed'} component={FeedTabs}
        options={{
          headerShown: false,
          title: locale['feed']
        }}/>
        <Tabs.Screen name={'Menu'} component={MenuScreen} 
        options={{
          headerShown: false,
          title: locale['menu']
        }}/>
        <Tabs.Screen name={'Timetable'} component={TimetableStackScreen}
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

const TimetableStack = createStackNavigator();


function TimetableStackScreen(){
  const [screen, setScreen] = useState('')

  const Layout = (initialName) => {
    if(initialName === '')
      return(<View></View>)
    else
      return(
        <TimetableStack.Navigator initialRouteName={initialName} headerMode='none'>
          <TimetableStack.Screen name='SearchScreen' component={SearchScreen} />
          <TimetableStack.Screen name='TimetableScreen' component={TimetableScreen} />
        </TimetableStack.Navigator>
      )
  }

  useEffect(() => {
    AsyncStorage.getItem('@key')
    .then(res => {
      if (res !== null)
        setScreen('TimetableScreen')
      else
        setScreen('SearchScreen')
    })
  }, [])

  return(
    Layout(screen)
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
      <ServiceStack.Screen name="Active" component={StudentLifeTabs} />
      <ServiceStack.Screen name='Ermak' component={Ermak} />
      <ServiceStack.Screen name="Institutes" component={InstitutesScreen} />
      <ServiceStack.Screen name="IITK" component={IITK} />
      <ServiceStack.Screen name="Map" component={MapScreen} />
      <ServiceStack.Screen name='Shop' component={ShopScreen} />
      <ServiceStack.Screen name='Product' component={ProductScreen} />
      <ServiceStack.Screen name='Topics' component={TopicsScreen} />
      <ServiceStack.Screen name='Poll' component={PollScreen} />
      <ServiceStack.Screen name='FAQ' component={FAQScreen} />
    </ServiceStack.Navigator>
  )
}

const BottomMenuItem = ({ iconName, label, isCurrent }) => {

  const icons = {
    'Feed': <MaterialCommunityIcons name="timetable" size={26} color={isCurrent ? '#5575A7' : 'rgb(159, 165, 163)'}  />, 
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


const MainTabBar = ({state, descriptors, navigation}) => {
  const {mode, theme, toggle} = useTheme()
  const totalWidth = Dimensions.get("window").width;
  return (
    <View style={[style.tabContainer, { width: totalWidth, backgroundColor: theme.blockColor}]}>
      <View style={{ flexDirection: "row" }}>
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
    position: "absolute",
    bottom: 0,
    left: Dimensions.get('window').width / 8,
    backgroundColor: '#006AB3',
    borderRadius: 10,
},
});