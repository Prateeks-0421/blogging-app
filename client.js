const redis = require("redis") ; 

const client = redis.createClient({
    // url: "redis://localhost:6379"
    url : process.env.REDIS_URL 
});

async function connectRedis() {
    await client.connect();
    console.log("Redis Connected");
}

connectRedis();   

module.exports = {client} ; 