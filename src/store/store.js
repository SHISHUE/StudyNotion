import {configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/index';
export const store = configureStore({
    reducer:rootReducer,
});