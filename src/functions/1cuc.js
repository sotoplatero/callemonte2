const fetch = require("node-fetch");
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const { parse } = require('fecha');
const { reLocations, reRepetition, rePhones, getPhones } = require('./libs/vars.js') ;
require("string_score");

const optionsFecha = {
      monthNames: [
        'enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'
      ]
    }
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
                    price: $el.find('.sr-page__list__item_price .v-price').text().replace(/\D/g,''),
                    title: cleaner( $a.children().remove().end().text() ),
                    url: $a.attr('href'),
                    description: $el.find('.descrip')
                        .text()
                        .trim()
                        .replace(/\n/g,'')
                        .replace(reRepetition, '$1')
                        .substring(0,280),
                    date: parse( $el.find('.publicated-date').text().trim(), 'D MMMM', optionsFecha ),
                    location: (() => {
                            let location = $el.find('p').text().match(reLocations);
                            return location ? location.toString() : '';
                        })(),
                    phones: getPhones($el.text() ),
                    photo: $el.find('.sr-page__list__item_img img').attr('src')
                }
            
            return {...ad, score: ad.title.score(q, 0.5) };

        }).get()

        data = data.filter( el => el.price >= pmin && el.price <= pmax );

    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
