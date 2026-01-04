import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { SignupApi } from "./features/Auth/SingupS";
import { LoginApi } from "./features/Auth/LoginS";
import authReducer from "./features/Auth/Auth";
import CartS from "./features/product/CartS";
import globalS from "./features/globalS";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PrduactS } from "./features/product/PrduactS";
import { CategoryS } from "./features/product/CategoryS";
import { uploadApi } from "./features/uploadApi";
import NetworkS from "./features/NetworkS";


const persistCartConfig = {
  key: "cart",
  storage,
};

const persistedCart = persistReducer(persistCartConfig, CartS);

const store = configureStore({
  reducer: {
    auth: authReducer,
    [SignupApi.reducerPath]: SignupApi.reducer,
    [LoginApi.reducerPath]: LoginApi.reducer,
    [PrduactS.reducerPath]:PrduactS.reducer,
    [CategoryS.reducerPath]:CategoryS.reducer,
    cart: persistedCart,
    global: globalS,
[uploadApi.reducerPath]: uploadApi.reducer,
Network:NetworkS
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(SignupApi.middleware, LoginApi.middleware,PrduactS.middleware,CategoryS.middleware,uploadApi.middleware),
});

export default store;
export const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
