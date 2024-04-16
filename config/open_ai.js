import OpenAI from 'openai';//import OpenAI library 
import dotenv from 'dotenv'; //import to get API key
dotenv.config();

//configuration object
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default openai;