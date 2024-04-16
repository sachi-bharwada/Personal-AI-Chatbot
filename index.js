import openai from './config/open_ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

// Aynchronous function
async function main(){
    console.log(colors.bold.green('Welcome to Sachi\'s ChatBot Program!'));
    console.log(colors.bold.green('You can start chatting with the bot now :)'));

    const chatHistory = []; //Store conversation history

    while(true){
        const userInput = readlineSync.question(colors.yellow('You: '));

        try {
            // Construct messages by iterating over the chat history
            const messages = chatHistory.map(([role, content]) => ({role, content}))

            // Add latest user input 
            messages.push({role: 'user', content: userInput})

            // Call the API with the user input
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messages,
            });

            // Get completion text/content 
            const completionContent = completion.choices[0].message.content;

            if (userInput.toLowerCase() === 'exit') {
                console.log(colors.green('Bot: ') + completionContent);
                return;
            }

            console.log(colors.green('Bot: ') + completionContent);
            // Update history with user input and assistant response 
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionContent]);
        } catch (error) {
            console.error(colors.red(error));
        }
    }

}

main();