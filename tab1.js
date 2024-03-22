import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Notes from './Notes';
import EditNotes from './EditNotes';

const stack = createStackNavigator();

const Tab1 = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name={'Notes'}
        component={Notes}
        options={{headerShown: false}}
      />
      <stack.Screen
        name={'Create/Edit'}
        component={EditNotes}
        options={{headerShown: true}}
      />
    </stack.Navigator>
  );
};

export default Tab1;
