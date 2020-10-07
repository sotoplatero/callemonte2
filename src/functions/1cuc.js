const fetch = require("node-fetch");
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const moment = require('moment')
const { reLocations, reRepetition, rePhones, getPhones } = require('./libs/vars.js') ;
require("string_score");

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province = 'cuba' } = event.queryStringParameters;

    province = (province === '') ? 'cuba' : 'prv-' + province;

    const response = await fetch(`https://1cuc.com/${province}/search/?ct=0&lt=0&sort=&q=${q}&page=${p}` );
    const body = await response.text();
    const $ = cheerio.load( body );

    pmax = (pmax == '') ? 999999999999999 : pmax;

    let data = $('.sr-page__list__item  ')
        .map( (i,el) => {
            let $el = $(el), 
                $a = $el.find('h3 a');
                // console.log($el.find('.descrip').text())
            let ad = {
                    price: (cleaner($el.find('.v-price, .sr-page__list__item_descr').text()).match(/\d+\scuc/ig) || ['0'])
                            .map( p => parseInt( p.replace(/\D/g,'') ) )
                            .sort( (a,b) => b-a )
                            .shift(),
                    title: cleaner( $a.children().remove().end().text() ),
                    url: $a.attr('href'),
                    description: $el.find('.descrip')
                        .text()
                        .trim()
                        .replace(/\n/g,'')
                        .replace(reRepetition, '$1')
                        .substring(0,280),
                    date: Date.parse( moment( $el.find('.publicated-date').text().trim(), 'D MMMM' ) ),
                    location: (() => {
                            let location = $el.find('p').text().match(reLocations);
                            return location ? location.toString() : '';
                        })(),
                    phones: getPhones($el.text() ),
                }
            
            return {...ad, score: ad.title.score(q) };

        }).get().filter( el => el.price >= pmin && el.price <= pmax );

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
