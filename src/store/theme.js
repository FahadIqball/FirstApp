import { createSlice } from '@reduxjs/toolkit';

const LIGHT_THEME = {
    mode: "light",
    primary: "#FFFFFF",
    background: "#FFFFFF",
    text: "#000000",
    accent: "#FF0000"
}

const DARK_THEME = {
    mode: 'dark',
    primary: "#000000",
    background: "#000000",
    text: "#FFFFFF",
    accent: "#FF00"
}

const themes = createSlice({
    name: 'theme',
    initialState: { mode: LIGHT_THEME },
    reducers: {
        toggleTheme: state => {
            state.mode = state.mode.mode === 'light' ? DARK_THEME : LIGHT_THEME;
        },
    },
});

export const { toggleTheme } = themes.actions;
export default themes.reducer;