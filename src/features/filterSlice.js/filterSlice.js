import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: "open",
    brand: [],
    keyword: ''
}
const filterSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggle: (state) => {
            state.stock = !state.stock
        },
        toggleBrands: (state, action) => {
            if (!state.brand.includes(action.payload)) {
                state.brand.push(action.payload)
            }
            else {
                state.brand = state.brand.filter(brand => brand !== action.payload)
            }
        }
    }
})
export const { toggle, toggleBrands } = filterSlice.actions
export default filterSlice.reducer;