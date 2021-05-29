const generate = require('./openai');

async function getTweetSentiment(tweet) {

    const prompt = `This is a tweet sentiment classifier
Tweet: "I loved the new Batman movie!"
Sentiment: Positive
###
Tweet: "I hate it when my phone battery dies."
Sentiment: Negative
###
Tweet: "My day has been 👍"
Sentiment: Positive
###
Tweet: "This is the link to the article"
Sentiment: Neutral
###
Tweet: "${tweet}"
Sentiment:`;

    const options = {
        temperature: 0.3,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        stop: ['###'],
    };

    const result = await generate(prompt, options, false);

    // .replace(/[^¥]*Sentiment:/m, '')
    return result.replace(/###/gm, '').trim();
    
}

module.exports.getTweetSentiment = getTweetSentiment;

async function generateTweetFromInspiration(tweets) {

    const joinedTweets = tweets.map(tweet => `I saw this tweet today: ${tweet}`).join(`
###
`);
    const prompt = `${joinedTweets}
###
I saw this tweet today:`;

    const options = {
        temperature: 0.9,
        stop: ['###'],
    };

    const result = await generate(prompt, options, false);

    return result.replace(/###/gm, '').trim();

}

module.exports.generateTweetFromInspiration = generateTweetFromInspiration;