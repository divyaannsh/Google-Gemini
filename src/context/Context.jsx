import React, { createContext } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const onSent = async (prompt) => {
        await runChat(prompt);
    };

    // Call onSent function with the prompt
    onSent("what is react js");

    // Define context value if needed
    const contextValue = {/* Your context value */};

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
