import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ImgSearch from './ImgSearch';
import Notes from './Notes';
import EditNotes from './EditNotes';

const Tab = createBottomTabNavigator();

const MywebComponent = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Notes" component={Notes} />
        <Tab.Screen name="Create/Edit" component={EditNotes} />
        <Tab.Screen name="Search" component={ImgSearch} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MywebComponent;
