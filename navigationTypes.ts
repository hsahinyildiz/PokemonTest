import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
    PokemonList: undefined;
    PokemonDetail: { cardId: string };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, "PokemonList">;
export type PokemonDetailRouteProp = RouteProp<RootStackParamList, "PokemonDetail">;