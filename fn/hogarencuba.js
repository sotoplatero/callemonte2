const fetch = require("node-fetch");
var cleaner = require('./libs/cleaner');
const moment = require('moment')

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province = '' } = event.queryStringParameters;
    let re = /casa|apartamento|apto/i
    let data = []

    if ( re.test(q) ) {

        let type = q.match(re)[0];
        const response = await fetch(`https://www.hogarencuba.com/api.json`);
        const json = await response.json();
        data = json.filter( el => {
            return  (el.price >= pmin) && 
                    (el.price <= pmax) && 
                    (el.type === type)
        }).map( el => {
            return {
                title: el.title,
                price: el.price,
                photo: el.firstImageUrl,
                description: el.shortDescription,
                location: el.location,
                url: el.url,
                date: moment(el.created_at)
            }
        })
    }


    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
