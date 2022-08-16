const config = require('config');
const mongoose = require('mongoose');
const express = require('express');
const keys = require('./keys');
const helmet = require('helmet');
const apiHome = require('./routes/home');
const conferences = require('./routes/conferences');
const teams = require('./routes/teams');
const games = require('./routes/games');
const stats = require('./routes/stats');
//  const users = require('./routes/users');
//  const auth = require('./routes/auth');


const { createClient } = require('redis');
require('./services/api-redis-cache.js');


//Verify configuration
if (!config.get('jwtPrivateKey')) {
    console.log('Fatal Error: jwtPrivateKey is not defined');
    process.exit(1);
} else {
    console.log('Configuration loaded successfully')
}


//Mongo Database Connection
(async function () {
    console.log('starting connection attempt to MongoDB..');

    await mongoose.connect(`mongodb+srv://${keys.mongoUser}:${keys.mongoPW}@${keys.mongoAccount}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Successfully Connected to MongoDB'))
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
                1000
            }

        });

        redisClient.on('error', (err) => console.log('Redis Error', err));

        await redisClient.connect();

        const value = await redisClient.set('isConnected', '1', 'testConnection');
        let flushed = '';

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
        'Access-Control-Allow-Origin': 'http://client:3000, http://simulations:4001',
        'Access-Control-Allow-Headers': 'x-auth-token, Content-Type, Accept',
        'Content-Type': 'application/json'
    });
    next();
});

app.use(express.json());

//app.use('/api/auth', auth);
//app.use('/api/users', users)
app.use('/api/stats', stats);
app.use('/api/games', games);
app.use('/api/conferences', conferences);
app.use('/api/teams', teams);
app.use('/api', apiHome);


//Server Connection
process.env.PORT = 4000;
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`API Routes Connected to Port ${port}`);
});
