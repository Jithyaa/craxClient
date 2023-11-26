import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./slices/user/userSlice"; //importing the reducer


const userPersistConfig = {
    key : "tutor",
    storage
}


const persistedUserReducer = persistReducer(userPersistConfig,userReducer)


const store = configureStore({
    reducer:{     //something similar to combine reducers
        'user': persistedUserReducer,
    }
})

export const persistor = persistStore(store);

export default store;