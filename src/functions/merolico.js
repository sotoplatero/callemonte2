// const fetch = require("node-fetch");
const got = require('got');
// var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const { reLocations, rePhones, getPhones } = require('./libs/vars.js') ;
require("string_score");

var Sugar = require('sugar');
require('sugar/locales/es.js')
Sugar.Date.setLocale('es');

const provinces = { 
    'pinar-del-rio': 1,
    'artemisa': 2,
    'mayabeque': 3,
    'la-habana': 4,
    'matanzas': 5,
    'cienfuegos': 6,
    'villa-clara': 7,
    'sancti-spiritus': 8,
    'ciego-de-avila': 9,
    'camaguey': 10,
    'las-tunas': 11,
    'holguin': 12,
    'granma': 13,
    'santiago-de-cuba': 14,
    'guantanamo': 15,
    'isla-de-la-juventud': 16,
}

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '', province = '' } = event.queryStringParameters;

    let location = provinces[province] || ''
    
    const url = `https://merolico.app/api_rest/resource?id=1&q=${q}&location=${location}&minPrice=${pmin}&maxPrice=${pmax}&size=50`;
    const ads = await got(url).json();

    let data = ads.items.map( ad => ({
        id: ad.id,
        title: ad.title,
        url: ad.slug,
        price: ad.price,
        description: ad.detail,
        photo: ad.picture,
        score: ad.title.score( q, 0.5 ),
        date: ( new Date(ad.update_at) ).getTime(),
        phones: [],
        image: ad.picture,
    }) )

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
