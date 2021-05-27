const generate = require('./openai');

async function init() {
    const result = await generate('Hello my name is');
    console.log(result);
}

init();