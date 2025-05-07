import { createSlice } from "@reduxjs/toolkit";

const ResultDataSlice = createSlice({
    name: "resultData",
    initialState: "",
    reducers: {
        setResultData: (store, action) => {
            return store = action.payload;
        },
        appendResultData: (store, action) => {
            return store += action.payload;
        }
    }
})
export const ResultDataSliceActions = ResultDataSlice.actions;
export default ResultDataSlice;