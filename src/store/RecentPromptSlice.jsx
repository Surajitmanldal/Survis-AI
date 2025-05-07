import { createSlice } from "@reduxjs/toolkit";


const RecentPromptSlice = createSlice({
    name: "recentStatus",
    initialState: "",
    reducers: {
        setRecentPrompt: (store, action) => {
            return store = action.payload;
        }
    }
})
export const recentPromptActions = RecentPromptSlice.actions;
export default RecentPromptSlice;