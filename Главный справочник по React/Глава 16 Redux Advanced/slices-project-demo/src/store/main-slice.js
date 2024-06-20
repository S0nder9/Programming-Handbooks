import { createSlice } from "@reduxjs/toolkit";

const initialState = {isCartVisible: false, statusMessage: null}

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        toggleCartVisibility(state) 
            {state.isCartVisible = !state.isCartVisible},
        showStatusMessage(state, action) {
            state.statusMessage = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    },

});
export const mainActions = mainSlice.actions;

export default mainSlice;

