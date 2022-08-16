const mongoose = require('mongoose');
const express = require('express');
const simulations = require('./simulations');
const keys = require('./keys')
const { createClient } = require('redis');
const helmet = require('helmet');

//Database Connection
(async function () {
    console.log('starting connection to MongoDB..');

    await mongoose.connect(`mongodb+srv://${keys.mongoUser}:${keys.mongoPW}@${keys.mongoAccount}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Successfully connected to MongoDB..'))
        .catch((e) => console.error(e))
})();


//Redis Database Connection
(async function () {

    try {
        console.log('starting connection attempt to RedisDB..');

        const redisClient = createClient({
            url: `redis://${keys.redisHost}:${keys.redisPort}`,
            retry_strategy: () => {
                console.log('redis connection retrying');
                return 1000
            }
        });

        redisClient.on('error', (err) => console.log('Redis Error', err));

        await redisClient.connect()

        const value = await redisClient.set('isConnected', '1', 'testConnection');
        let flushed = ''
        if (value === 'OK') {
            console.log('Successfully Connected to Redis DB')

            console.log('Attempting to clear API Redis DB');
            flushed = await redisClient.FLUSHDB();

            if (flushed === 'OK') {
                console.log('API Redis DB Cleared');
            } else {
                console.log('********** API Redis DB Not Cleared *********');
                throw new Error('Could not Clear API REDIS')
            }

        } else {
            throw new Error('Could not connect to REDIS')

        };



    } catch (e) {
        console.error(e)
    }


})();


//Route Connections
const app = express();
app.use(helmet());


app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': 'http://client:3000, http://api:4000',
        'Access-Control-Allow-Headers': 'x-auth-token, Content-Type, Accept',
        'Content-Type': 'application/json'
    });
    next();
});

app.use(express.json());

app.use('/simulations', simulations);



//Server Connection
const port = process.env.PORT || 4001;

app.listen(port, () => {
    console.log(`API Routes Connected to Port ${port}`);
});
