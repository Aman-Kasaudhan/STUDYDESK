import { combineReducers, createReducer } from "@reduxjs/toolkit";
import authReducer from '../slice/authSlice'
import profileReducer from '../slice/profileSlice'
import carteReducer from '../slice/cartSlice'
import courseReducer from '../slice/courseSlice'
import loaderReducer from '../slice/loaderSlice'


const rootReducer=combineReducers({
    auth:authReducer,
    profile:profileReducer,
    cart:carteReducer,
    course:courseReducer,
    loader: loaderReducer,
})
export default rootReducer;