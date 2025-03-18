import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PokemonList from './src/PokemonList';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PokemonList" component={PokemonList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}