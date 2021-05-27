const axios = require('axios');
const querystring = require('querystring');
require('dotenv').config();

const instance = axios.create({
    baseURL: 'https://api.openai.com/v1/engines/davinci/',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    }
});

const defaults = {
    "temperature": 0.7,
    "max_tokens": 150,
    "top_p": 1,
    "frequency_penalty": 0.0,
    "presence_penalty": 0.6,
};

module.exports = async function(prompt, config) {
    try {
        const request = {
            ...defaults,
            ...config,
            prompt,
        };
        const response = await instance.post(`/completions`, request);
        const { choices } = response.data;
        const [ { text } ] = choices;

        return `${prompt}${text}`;
    }
    catch (error) {
        console.error(error.message);
        console.error(error.response.data);
    }
}

/*
curl https://api.openai.com/v1/engines/davinci/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "prompt": "The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
  "temperature": 0.9,
  "max_tokens": 150,
  "top_p": 1,
  "frequency_penalty": 0.0,
  "presence_penalty": 0.6,
  "stop": ["\n", " Human:", " AI:"]
}'
*/