import {
    combineReducers, configureStore
} from "@reduxjs/toolkit";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import RecentPromptSlice from "./RecentPromptSlice";
import PrevPromptSlice from "./PrevPromptsSlice";
import ShowResultSlice from "./ShowResultSlice";
import LoadingSlice from "./LoadingSlice";
import ResultDataSlice from "./ResultDataSlice";
import InputDataSlice from "./InputDataSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";

// combine all reducer
const rootReducer = combineReducers({
    recentStatus: RecentPromptSlice.reducer,
    prevStatus: PrevPromptSlice.reducer,
    resultStatus: ShowResultSlice.reducer,
    loadingStatus: LoadingSlice.reducer,
    resultDataStatus: ResultDataSlice.reducer,
    inputDataStatus: InputDataSlice.reducer
})

//Configure persist

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["prevStatus"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer);


const survisStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(survisStore)
export default survisStore;