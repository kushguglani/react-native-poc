import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { legacy_createStore as createStore } from "redux";
import { userReducer } from "../reducer/user";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

