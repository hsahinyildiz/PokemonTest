import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListScreen from './src/List';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="List"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="List" component={ListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}