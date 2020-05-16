const redis = require('redis');

const redisClient = redis.createClient({host : redis_db , port : 6379});

redisClient.set("name","ali")

redisClient.get("name",function(err,res){
          console.log(res)
})