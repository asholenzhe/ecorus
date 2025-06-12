import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    token: string | null;
    balance: number;
    name: string | null;
}

const saved = localStorage.getItem('user');
const initialState: UserState = saved
    ? JSON.parse(saved)
    : { token: null, balance: 0, name: null };

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials(
            state,
            action: PayloadAction<{ token: string; balance: number; name: string }>
        ) {
            state.token = action.payload.token;
            state.balance = action.payload.balance;
            state.name = action.payload.name;
            localStorage.setItem('user', JSON.stringify(state));
        },
        clearCredentials(state) {
            state.token = null;
            state.balance = 0;
            state.name = null;
            localStorage.removeItem('user');
        },
    },
});

export const { setCredentials, clearCredentials } = userSlice.actions;
export default userSlice.reducer;
