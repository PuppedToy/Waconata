const Twitter = require('twitter');

const twitterClient = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

async function getTimeline(user) {
    const params = user ? { screen_name: user } : {};
    const result = await twitterClient.get('statuses/user_timeline', params);
    return result.map(({ text }) => text);
}

module.exports.getTimeline = getTimeline;

async function tweet(text) {
    return twitterClient.post('statuses/update', {status: text});
}

module.exports.tweet = tweet;