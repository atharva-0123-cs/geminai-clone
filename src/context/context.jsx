/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompts, setRecentPrompts] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const  dealypara = (index,nextWorld) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWorld)
        },index * 75);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSet = async (promptT) => {

        setResultData("");
        setLoading(true);
        setShowResult(true);
        
        
        try {
            let response;
            if(promptT !== undefined){
                response = await runChat(promptT);
                setRecentPrompts(promptT);
            }else{
                setPrevPrompt(prev => [...prev , input]);
                setRecentPrompts(input);
                response = await runChat(input);
            }
         

            let responseArray = response.split("**");
            let newResponse = "";

            for(let i=0; i<responseArray.length; i++){
                if(i === 0 || i%2 !== 1){
                    newResponse += responseArray[i];
                }else{
                    newResponse += "<b>" + responseArray[i] + "</b>";
                }
            }
            let newResponse2 = newResponse.split("*").join("</br>");
            let newResponseArray = newResponse2.split(" ");
            for(let i=0; i<newResponseArray.length; i++){
                const nextWorld  = newResponseArray[i];
                dealypara(i,nextWorld+" ")
            }

            // setResultData(newResponse2);
        } catch (error) {
            throw new Error(error);
        }
        
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        input,
        setInput,
        resultData,
        setResultData,
        recentPrompts,
        setRecentPrompts,
        prevPrompt,
        setPrevPrompt,
        showResult,
        setShowResult,
        loading,
        setLoading,
        onSet,
        newChat
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )

}

export default ContextProvider;