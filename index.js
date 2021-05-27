const generate = require('./openai');
const { getTimeline, tweet } = require('./twitter');

async function sendSampleTweet() {
    try {
        const result = await generate('Hello World!', {"max_tokens": 30});
        await tweet(result);
    } catch (error) {
        console.error(error);
    }
}

async function logMyTweets() {
    try {
        const tweets = await getTimeline();
        console.log(tweets);
    } catch (error) {
        console.error(error);
    }
}

async function test() {
    await sendSampleTweet();
    await logMyTweets();
}

test();
