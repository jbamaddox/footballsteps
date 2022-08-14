const mongoose = require('mongoose');
const { createClient } = require('redis');
const keys = require('../keys.js');


//Set default redis connection
const redisClient = createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`
});

redisClient.connect()



//Overwrite the mongoose default exec function for allowing seamless redis verification
const mongooseExecOriginal = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function () {
    this.useCache = true;

    return this;

}


mongoose.Query.prototype.exec = async function () {
    //If we want to use cache for the query, do the following
    if (this.useCache === true) {

        //Check if we have the query object in our cache

        const key = JSON.stringify(Object.assign(
            {},
            this.getQuery(),
            this.getOptions(),
            this.getFilter(),
            { collection: this.mongooseCollection.name }
        ));

        const cachedValue = await redisClient.get(key);


        //If value exists, return value (and skip the search of our main DB)
        if (cachedValue) {

            return JSON.parse(cachedValue)
        }


        //IF we don't have value from cache, set the value in cache and return it to mongoose
        const resultToReturn = await mongooseExecOriginal.apply(this, arguments);

        redisClient.set(key, JSON.stringify(resultToReturn), 3600);

        return resultToReturn
    } else {
        //If we do not want to use cache, utilize the original execution
        return await mongooseExecOriginal.apply(this, arguments);
    }


}
