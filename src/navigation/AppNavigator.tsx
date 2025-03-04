import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList, MeditationItem, CourseItem } from '../types';

// Screens
import LoginScreen from '../screens/LoginScreen';
import IndexScreen from '../screens/IndexScreen';
import ExploreScreen from '../screens/ExploreScreen';
import LibraryScreen from '../screens/LibraryScreen';
import MoreScreen from '../screens/MoreScreen';
import DetailScreen from '../screens/DetailScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import TestAlertScreen from '../screens/TestAlertScreen';

// Typed navigators
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Add type for tab routes
type TabParamList = {
  Home: undefined;
  Explore: undefined;
  Library: undefined;
  More: undefined;
  test: undefined
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          height: 70,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          marginVertical: 5,
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Explore') iconName = 'explore';
          else if (route.name === 'Library') iconName = 'library-books';
          else if (route.name === 'More') iconName = 'more-horiz';
          else if (route.test === 'test') iconName = 'more-horiz';

          return <Icon name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={IndexScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
      <Tab.Screen name="test" component={TestAlertScreen} />
      
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Main"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({ 
            title: route.params.meditation.title || 'Meditation Details',
            headerBackTitle: 'Back'
          })}
        />

        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={({ route }) => ({
            title: route.params.course.title || 'Course Details',
            headerBackTitle: 'Back'
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;