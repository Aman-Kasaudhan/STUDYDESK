// // src/redux/store.js or src/store.js
// import { configureStore } from '@reduxjs/toolkit';
// // import your reducers
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from '../slice/authSlice'; // Replace with your actual slice
// import profileReducer from '../slice/profileSlice';
// import carteReducer from '../slice/cartSlice'
// import courseReducer from '../slice/courseSlice'
// import loaderReducer from '../slice/loaderSlice'

// const store = configureStore({
//   reducer: {
//       auth:authReducer,
//        profile:profileReducer,
//        cart:carteReducer,
//        course:courseReducer,
//        loader: loaderReducer,
     
//   },
// });
 


// export default store;


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../slice/authSlice";
import profileReducer from "../slice/profileSlice";
import cartReducer from "../slice/cartSlice";
import courseReducer from "../slice/courseSlice";
import loaderReducer from "../slice/loaderSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  cart: cartReducer,
  course: courseReducer,
  loader: loaderReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["course"], // 👈 persist ONLY course
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 REQUIRED for redux-persist
    }),
});

const persistor = persistStore(store);
export {store,persistor}
