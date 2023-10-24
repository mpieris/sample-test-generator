import { config } from "dotenv";
import {Configuration, OpenAIApi} from "openai"
import readline from "readline"

config()

const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.API_KEY
}))

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

userInterface.prompt();

const lines = [];

userInterface.on('line', (line) => {
  lines.push(line);
  userInterface.prompt();
});

userInterface.on('close', async prompt => {
  
  prompt = lines.join('\n');

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: prompt}]
  })

  console.log(res.data.choices[0].message.content)

});