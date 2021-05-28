const generate = require('./openai');
const { getTimeline, tweet } = require('./twitter');
const { getKnowledge, saveKnowledge, log } = require('./knowledge');
const { wait, randInt } = require('./utils');

const ACTIONS = {
    CONNECT: 'CONNECT',
    QUEUE_ACTION: 'QUEUE_ACTION',
};
const { BOT_NAME = 'Waconata' } = process.env;
let knowledge;

async function customLog(action, message, payload = {}) {
    console.log(`${action}: ${message}`);
    await log({
        action,
        message,
        ...payload,
    });
}

async function queueNextAction() {
    const secondsToWait = randInt(15, 12*60*60);
    customLog(
        ACTIONS.QUEUE_ACTION,
        `I have queued my next action. It will be done in ${secondsToWait} seconds`,
        { secondsToWait }
    );
    await wait(secondsToWait);
    // TODO do things
}

async function init() {
    knowledge = await getKnowledge();
    customLog(ACTIONS.CONNECT, `${BOT_NAME} connected`);
    await queueNextAction();
}

init();