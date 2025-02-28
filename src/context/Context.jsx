import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const[input,setInput] =useState("");
    const [recentPrompt,setRecentPrompt] = useState("");  // to show prompt
    const [prevPrompts,setPrevPrompts] = useState([]); //to save the prompt in sidebar
    const [showResult, setShowResult] = useState(false); //for for display
    const [loading,setloading]  = useState(false);   //loading animation
    const [resultData,setResultData] =useState("");  //result on web 

   const delaypara =(index,nextword)=>{
             setTimeout(function(){
                setResultData(prev=>prev+nextword);

             },75*index)
   }

   const  newChat = () => {
    setloading(false)
    setShowResult(false)
   }

    const onSent = async (prompt) => {

        setResultData("")
        setloading(true)
        setShowResult(true)
        let response;
        if (prompt !== undefined) {
            response = await runChat (prompt);
            setRecentPrompt(prompt)
        }
        else
        {
            setPrevPrompts(prev=>[...prev,input])
            setRecentPrompt(input)
            response = await runChat(input)
        }
        // setRecentPrompt(input)
        // setPrevPrompts(prev=>[...prev,input])
        // const response = await runChat(input);
        let responseArray = response.split("**")
        let newResponse="";
        for(let i =0 ; i< responseArray.length; i++ )
            {
                if(i === 0|| i%2 !==1){
                   newResponse += responseArray[i]

                }
                else{
                    newResponse += "<b>" +responseArray[i]+"</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>")
       let newResponseArray = newResponse2.split(" ");
       for (let i= 0; i<newResponseArray.length;i++)
        {
            const nextword = newResponseArray[i];
            delaypara(i,nextword + " ")
        }
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
        setInput,
        newChat
       
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
