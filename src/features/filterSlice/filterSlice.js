import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    ascending: false,
    decending: false
}
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleAscending: (state) => {
            state.ascending = !state.ascending;
            state.decending = false;
        },
        toggleDecending: (state) => {
            state.decending = !state.decending;
            state.ascending = false
        },
    }
})
export const { toggleAscending, toggleDecending } = filterSlice.actions
export default filterSlice.reducer;