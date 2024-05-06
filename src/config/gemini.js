// Import statements should use 'import' instead of 'from'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Define your model name and API key
const MODEL_NAME = "gemini-1.5-pro-latest";
// const API_KEY = ""; // Replace 'Your_API_Key_Here' with your actual API key
// AIzaSyAY8FAZTRBUGoE7o15F4seWbFWMh1z77zc
// Define the asynchronous function to run the chat
async function runChat(prompt) {
    // Create a new instance of GoogleGenerativeAI with your API key
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_API_KEY);

    // Retrieve the generative model with the specified name
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    // Define generation configuration
    const generationConfig = {
        temperature: 1,
        topK: 0,
        topP: 0.95,
        maxOutputTokens: 8192,
    };

    // Define safety settings to filter harmful content
    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    // Start a chat session with the specified configurations
    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });

    // Send the prompt message to the chat and wait for the response
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    console.log(response.text());
    return response.text();
}

// Export the runChat function to be used in other modules
export default runChat;
