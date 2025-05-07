import { createSlice } from "@reduxjs/toolkit";

const ShowResultSlice = createSlice({
    name: "resultStatus",
    initialState: false,
    reducers: {
        setShowResult: (store, action) => {
            return store = action.payload;
        }
    }
})

export const ShowResultSliceActions = ShowResultSlice.actions;
export default ShowResultSlice;