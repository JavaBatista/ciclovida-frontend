import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    userId: -1,
    name: '',
    userLoggedIn: false,
    authorization: ''
};

const session = createSlice({
    name: 'session',
    initialState,
    reducers: {
        setId(state, action) {
            state.userId = action.payload.userId;
        },

        setName(state, action) {
            state.name = action.payload.name;
        },

        setAuthorization(state, action) {
            state.authorization = action.payload;
        },

        sessionLogin(state, action) {
            state.userId = action.payload.userId;
            state.name = action.payload.name;
            state.authorization = action.payload.authorization;
            state.userLoggedIn = true;
        },

        sessionLogout(state) {
            state.userId = -1;
            state.name = '';
            state.userLoggedIn = false;
            state.authorization = '';
        }
    }
});

export default session.reducer;

export const { setId, setName, setAuthorization, sessionLogin, sessionLogout } = session.actions;