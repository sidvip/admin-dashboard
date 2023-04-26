import { configureStore } from '@reduxjs/toolkit'
import utilityReducer from './utility.slice';

export const store = configureStore({
    reducer: {
        utility: utilityReducer
    },
})