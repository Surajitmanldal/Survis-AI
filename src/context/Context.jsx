import { createContext, useEffect, useState } from "react";
// import main from "../config/survis";
import main from "../config/index";
import { marked } from 'marked';
import DOMPurify from 'dompurify';
export const Context = createContext();
const ContextProvider = ({ children }) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");


    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord)
        }, 75 * index)
    }

    const onSent = async (prompt) => {
        setInput('');
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined) {
            setRecentPrompt(prompt);
            response = await main(prompt);
        }
        else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input)
            response = await main(input);
            console.log(response);
        }
        const html = DOMPurify.sanitize(marked(response || ""));
        let newResponse = html.split(" ");
        for (let i = 0; i < newResponse.length; i++) {
            const nextWord = newResponse[i];
            delayPara(i, nextWord + " ");
        }
        setLoading(false);

    }
    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        setShowResult,
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}
export default ContextProvider;