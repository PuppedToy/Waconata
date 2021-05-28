function wait(seconds) {
    return new Promise((resolve, reject) => {
        if (!seconds) reject(new Error(`argument not valid: ${seconds}`));
        setTimeout(() => {
            resolve();
        }, seconds*1000);
    });
}

module.exports.wait = wait;

function randInt(min, max) {
    return parseInt(Math.random() * (max-min+1)) + min;
}

module.exports.randInt = randInt;