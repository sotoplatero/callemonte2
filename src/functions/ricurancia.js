const fetch = require("node-fetch");
const moment = require('moment');
var cleaner = require('./libs/cleaner');
const { reLocations } = require('./libs/vars.js') ;
const { getPhones } = require('./libs/vars.js') ;
require("string_score");

const provinces = { 
    'pinar-del-rio': 'l1',
    'artemisa': 'l2',
    'mayabeque': 'l3',
    'la-habana': 'l4',
    'matanzas': 'l4',
    'villa-clara': 'l6',
    'cienfuegos': 'l7',
    'sancti-spiritus': 'l8',
    'ciego-de-avila': 'l9',
    'camaguey': 'l10',
    'las-tunas': 'l11',
    'holguin': 'l12',
    'granma': 'l13',
    'santiago-de-cuba': 'l14',
    'guantanamo': 'l15',
    'isla-de-la-juventud': 'l16',
}

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = 1000000, province = '', page = 0 } = event.queryStringParameters;

    let location = provinces[province] || ''

    pmin = parseInt(pmin)>0 ? parseInt(pmin) : 1;
    pmax = parseInt(pmax)>0 ? parseInt(pmax) : 1000000;

    const response = await fetch(`http://api.riquera.com/api/posting?locationId=${location}&priceRangeStart=${pmin}&PriceRangeEnd=${pmax}&term=${q}&page=${page}&take=25`);
    var json = await response.json();

    let data = json['ads'].map( el => ({
                title: cleaner(el.title),
                price: el.price,
                photo: el.poster,
                description: cleaner(el.description),
                location: (()=>{
                    let location = Object.keys(provinces).find( key => provinces[key] == el.locationId.split('.')[0] );
                    return location.replace('-',' ');
                })(),
                url: `http://ricurancia.com/posting;id=${el.id}`,
                date: Date.parse(el.created),
                phones: getPhones(el.posterPhone),
                score: el.title.score(q)
            })
        )

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
