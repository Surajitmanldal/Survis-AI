// store/asyncActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { marked } from "marked";
import DOMPurify from "dompurify";
import main from "../config"; // Your API call function
import { recentPromptActions } from "./RecentPromptSlice";
import { PrevPromptSliceActions } from "./PrevPromptsSlice";
import { ShowResultSliceActions } from "./ShowResultSlice";
import { LoadingSliceActions } from "./LoadingSlice";
import { ResultDataSliceActions } from "./ResultDataSlice";
import { InputDataSliceActions } from "./InputDataSlice";

export const onSent = createAsyncThunk(
    "chat/onSent",
    async (prompt, { getState, dispatch }) => {
        const inputData = getState().inputDataStatus;
        dispatch(InputDataSliceActions.setInput(""));
        dispatch(ResultDataSliceActions.setResultData(""));
        dispatch(LoadingSliceActions.setLoading());
        dispatch(ShowResultSliceActions.setShowResult(true));

        let response;
        if (prompt !== undefined) {
            dispatch(recentPromptActions.setRecentPrompt(prompt));
            response = await main(prompt);
        } else {
            dispatch(PrevPromptSliceActions.setPrevPrompts(inputData));
            dispatch(recentPromptActions.setRecentPrompt(inputData));
            response = await main(inputData);
        }

        const html = DOMPurify.sanitize(marked(response || ""));
        let newResponse = html.split(" ");

        newResponse.forEach((word, i) => {
            setTimeout(() => {
                dispatch(ResultDataSliceActions.appendResultData(word + " "));
            }, 75 * i);
        });

        dispatch(LoadingSliceActions.setLoading());
    }
);
