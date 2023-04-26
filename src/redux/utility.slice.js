import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toast: {
        timeOut: 3000,
        data: { heading: "", content: "" },
        show: false
    },
    leftNav: {
        open: false,
    },
    mail: {
        composing: false,
        selectedCategory: null,
        unreadCount: 0,
    }
}

export const utilitySlice = createSlice({
    name: 'utility',
    initialState,
    reducers: {
        showToast: (state, action) => {
            state.toast = { ...state.toast, ...action.payload };
        },
        resetToast: (state, action) => {
            state.toast = initialState.toast;
        },
        setLeftNavOpenState: (state, action) => {
            state.leftNav.open = action.payload;
        },
        setIsComposing: (state, action) => {
            state.mail.composing = action.payload;
        },
        setSelectedMailCategory: (state, action) => {
            state.mail.selectedCategory = action.payload;
        },
        setUnReadCount: (state, action) => {
            state.mail.unreadCount = action.payload;
        }
    },
})

// Action creators are generated for each case reducer function
export const { showToast, resetToast, setLeftNavOpenState, setIsComposing, setSelectedMailCategory, setUnReadCount } = utilitySlice.actions
export const selectUtility = (state) => state.utility
export default utilitySlice.reducer