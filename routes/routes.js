const config = require('./config');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const key = process.env.RIOT_KEY;


/** get info from summoner */
const getSummonerName = (name, region) => {
    const host = config.urls[region].host;
    const response = axios.get(`https://${host}/lol/summoner/v4/summoners/by-name/${name}`, {
        params: {
            api_key: key
        }
    }).then(response => {
        return response;
    }).catch(e => {
        return e.response;
    });
    return response;
}

/** get actual rank info based on the highest rank of the previous season */
const getSummonerLeague = (id, region) => {
    const host = config.urls[region].host;
    const response = axios.get(`https://${host}/lol/league/v4/entries/by-summoner/${id}`, {
        params: {
            api_key: key
        }
    }).then(response => {
        return response;
    }).catch(e => {
        return e.response;
    });
    return response;
}

module.exports.getSummonerName = getSummonerName;
module.exports.getSummonerLeague = getSummonerLeague;