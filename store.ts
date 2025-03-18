import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["pokemon"],
};

type PokemonStateType = {
    savedCards: string[];
}

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

const persistedReducer = persistReducer(persistConfig, pokemonSlice.reducer);

const rootReducer = combineReducers({
    pokemon: persistedReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"],
            },
        }),
});

export const persistor = persistStore(store);

export const { toggleSaveCard } = pokemonSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
