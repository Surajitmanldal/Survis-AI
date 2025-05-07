import { createSlice } from "@reduxjs/toolkit";

const InputDataSlice = createSlice({
    name: "inputStatus",
    initialState: "",
    reducers: {
        setInput: (store, action) => {
            return store = action.payload;
        }
    }
})

export const InputDataSliceActions = InputDataSlice.actions;
export default InputDataSlice;