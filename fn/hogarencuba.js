const fetch = require("node-fetch");
const moment = require('moment');
var FlexSearch = require("flexsearch");
const { reLocations } = require('./libs/vars.js') ;

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = 1000000, province = '' } = event.queryStringParameters;
    let re = /casa|apartamento|apto/i
    let data = []
    var index = new FlexSearch();

    pmin = parseInt(pmin)>0 ? parseInt(pmin) : 1;
    pmax = parseInt(pmax)>0 ? parseInt(pmax) : 1000000;

    if ( re.test(q) ) {

        let type = q.match(re)[0];
        const response = await fetch(`https://www.hogarencuba.com/api.json`);
        const json = await response.json();
        data = json
            .filter( el => 
                (el.price >= pmin) && 
                (el.price <= pmax) && 
                el.location.match(reLocations) 
            )
            .forEach( el => index.add(el.id, el.description) )

        let result = index.search(q, {
            limit: 100,
        });

        data =  data
            .filter( el => result.includes(el.id))
            .map( el => ({
                    title: el.title,
                    price: el.price,
                    photo: el.firstImageUrl,
                    description: el.shortDescription,
                    location: el.location,
                    url: el.url,
                    date: moment(el.created_at)
                })
            )
        console.log(data)
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
