import { createSlice } from "@reduxjs/toolkit";

const LoadingSlice = createSlice({
    name: "loadingStatus",
    initialState: false,
    reducers: {
        setLoading: (store) => {
            return !store;
        }
    }

})
export const LoadingSliceActions = LoadingSlice.actions;
export default LoadingSlice;