import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

type PokemonStateType = {
    savedCards: string[];
};

const initialState: PokemonStateType = {
    savedCards: [],
};

const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        toggleSaveCard: (state, action: PayloadAction<string>) => {
            if (state.savedCards.includes(action.payload)) {
                state.savedCards = state.savedCards.filter(id => id !== action.payload);
            } else {
                state.savedCards.push(action.payload);
            }
        },
    },
});

const rootReducer = combineReducers({
    pokemon: pokemonSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export const { toggleSaveCard } = pokemonSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
