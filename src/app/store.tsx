import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import cityReducer from '../features/citySlice'
export const store = configureStore({
    reducer: {
        user: userReducer,
        city: cityReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
