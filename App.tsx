import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./store";
import PokemonList from "./src/PokemonList";
import PokemonDetail from "./src/PokemonDetail";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="PokemonList" component={PokemonList} options={{ title: "Pokémon Listesi" }} />
          <Stack.Screen name="PokemonDetail" component={PokemonDetail} options={{ title: "Kart Detayı" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
