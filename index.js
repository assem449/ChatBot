import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('Welcome to my ChatBot :)'));
  console.log(colors.bold.green('Happy chatting!'));

  const chatHistory = []; 

  while (true) {
    const userInput = readlineSync.question(colors.blue('You: '));

    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // latest user input
      messages.push({ role: 'user', content: userInput });

      // Call the API
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });
      const completionContent = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('ChatBot: ') + completionContent);
        return;
      }

      console.log(colors.green('ChatBot: ') + completionContent);

      // Update history
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionContent]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();