// import fetch from "node-fetch";
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const moment = require('moment')
var Browser = require("zombie");

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province } = event.queryStringParameters;
    let data = []
    // const response = await fetch(`http://ofertas.cu/buscar?q=${q}`, {method: 'POST'} );
    // const body = await response.text();
    browser = new Browser()
    try {
        browser.visit(`http://ofertas.cu/`, function() {
            browser.fill( 'input[name="q"]', q )
            browser.pressButton('button[type="submit"]', () => { 
                // browser.assert.element('.search-page a');

                let ads = browser.queryAll('.search-page a')
                ads.forEach( el => {
                    console.log(el.text)
                })
            });

        })
    } catch (err){
        console.log(err);
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
