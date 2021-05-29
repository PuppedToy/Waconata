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

async function follow(user) {
    return twitterClient.post('friendships/create', {screen_name: user});
}

module.exports.follow = follow;

async function unfollow(user) {
    return twitterClient.post('friendships/destroy', {screen_name: user});
}

module.exports.unfollow = unfollow;

async function readDMs() {
    const result = await twitterClient.get('direct_messages/events/list', {});
    const { events } = result;
    return events;
}

module.exports.readDMs = readDMs;

/* Returning 401 Unauthorized */
async function sendDM(userId, text) {
    return twitterClient.post('direct_messages/events/new', {
        type: 'message_create',
        message_create: {
            target: {
                recipient_id: userId,
            },
            message_data: { text },
        }
    });
}

module.exports.sendDM = sendDM;