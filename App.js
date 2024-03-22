import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImgSearch from './ImgSearch';
import Tab1 from './tab1';

const Tab = createBottomTabNavigator();

const MywebComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Tab1} />
        <Tab.Screen name="Search" component={ImgSearch} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MywebComponent;
