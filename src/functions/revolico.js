const fetch = require("node-fetch");
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const { DateTime } = require("luxon");
const moment = require('moment')
const { reLocations } = require('./libs/vars.js') ;
var Sugar = require('sugar');
require('sugar/locales/es.js');
Sugar.Date.setLocale('es');

var Browser = require("zombie");

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '' , province = '' } = event.queryStringParameters;

    const response = await fetch(`https://www.revolico.com/search.html?q=${q}&min_price=${pmin}&max_price=${pmax}&p=${p}&province=${province}`);
    const body = await response.text();
    const $ = cheerio.load( body );
   
    let data = $('li[data-cy="adRow"]')
        .map( (i,el) => {
            let $el = $(el), 
                selPrice = 'span[data-cy="adPrice"]',
                date = Sugar.Date.create( parseInt($el.find( 'time[datetime]' ).attr('datetime')) );

            return {
                price: parseInt( $el.find( selPrice).length ? $el.find( selPrice).text() : 0 ),
                title: cleaner( $el.find( 'span[data-cy="adTitle"]' ).text() ),
                url: 'https://www.revolico.com' + $el.find('a[href$="html"]').attr('href'),
                description: $el.find( 'span[data-cy="adDescription"]' ).text(),
                date: parseInt( $el.find( 'time[datetime]' ).attr('datetime') ),
                location: '',
                phones: $el.text().replace(/\W/g,'').match(/\d{8}/g),
                // phones: $el.find( selTitle ).text().match(rePhone) || [],
                // photo: $el.find('span[data-cy="adPhoto"]').length > 0,
            }
        }).get();

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(data)
    };
 
} // revolico
