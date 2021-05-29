const generate = require('./openai');
const { getTimeline, tweet, follow, unfollow, readDMs, sendDM } = require('./twitter');
const { getTweetSentiment, generateTweetFromInspiration } = require('./openai-presets');
const shuffle = require('shuffle-array')

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

async function classifyTimeline(user) {
    const timeline = await getTimeline(user);
    for(let tweet of timeline) {
        const sentiment = await getTweetSentiment(tweet);
        console.log(`> Tweet: ${tweet}
> Sentiment: ${sentiment}
-------`);
    }
}

async function getInspiredByTweetsFrom(users) {
    const timelines = await Promise.all(users.map(user => getTimeline(user)));
    const commonTimeline = timelines.flat().filter(tweet => !tweet.includes('https://') && !tweet.includes('@'));
    shuffle(commonTimeline);
    const inspirationalTweets = commonTimeline.slice(0, 5);
    const tweet = await generateTweetFromInspiration(inspirationalTweets);
    const result = tweet.replace(/\@/gm, '').trim();
    console.log(result);
    return result;
}

async function logDMs() {
    const dms = await readDMs();
    console.log(JSON.stringify(dms));
}

async function sendDMToPuppedToy() {
    try {
        const dm = 'Hello hello';
        const result = await sendDM('1181871376103288832', dm);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

async function test() {
    // await sendSampleTweet();
    // await logMyTweets();
    // await classifyTimeline();
    // await getInspiredByTweetsFrom(['PuppedToy', 'LowkoTV', 'Zeniiet', 'cowboyvonriegan', 'DrSJaishankar', 'jeonginloops']);
    // await follow('PuppedToy');
    // await logDMs
    // await sendDMToPuppedToy();
}

test();
