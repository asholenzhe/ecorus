import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface City {
    id: number
    name: string
}

interface CityState {
    cities: City[]
    selected: City | null
}

const initialState: CityState = {
    cities: [],
    selected: null,
}

const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        setCities(state, action: PayloadAction<City[]>) {
            state.cities = action.payload
        },
        setCity(state, action: PayloadAction<City>) {
            state.selected = action.payload
            localStorage.setItem('cityId', String(action.payload.id))
        },
    },
})

export const { setCities, setCity } = citySlice.actions
export default citySlice.reducer
