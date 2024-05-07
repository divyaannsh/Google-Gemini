import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const[input,setInput] =useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading,setloading]  = useState(false);
    const [resultData,setResultData] =useState("");

   const delaypara =(index,nextword)=>{

   }

    const onSent = async (prompt) => {

        setResultData("")
        setloading(true)
        setShowResult(true)
        setRecentPrompt(input)
        const response = await runChat(input);
        setResultData(response)
        setloading(false)
        setInput("")
    };

    // Call onSent function with the prompt
    // onSent("what is react js");

    // Define context value if needed
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
        setInput
       
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
