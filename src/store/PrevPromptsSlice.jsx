import { createSlice } from "@reduxjs/toolkit";

const PrevPromptSlice = createSlice({
    name: "prevPromptsStatus",
    initialState: [],
    reducers: {
        setPrevPrompts: (store, action) => {
            store.push(action.payload);
        },
        deletePrompt: (state, action) => {
            state.splice(action.payload, 1)
        }
    }
})
export const PrevPromptSliceActions = PrevPromptSlice.actions;
export default PrevPromptSlice;