const fetch = require("node-fetch");
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
const { reLocations, reRepetition, getPhones } = require('./libs/vars.js') ;

var Sugar = require('sugar');
require('sugar/locales/es.js');
Sugar.Date.setLocale('es');
require("string_score");

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '', province = '' } = event.queryStringParameters;

    const response = await fetch(`https://www.timbirichi.com/buscar/pagina/${p}?q=${q}&min=${pmin}&max=${pmax}`);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data =  $('a.anuncio-list').map( (i,el) => {
        let $el = $(el), 
            reId = /[a-zA-Z]+$/,
            reNoImage = /default/g;

        let ad = {
            price:  $el.find('precio').first().text().replace(/\D/g,''),
            title:  cleaner( $el.find('h5.anuncio-titulo').text() ),
            url: $el.attr('href'),
            location: (()=>{
                let location = $el.find('.info-anuncio ul').text()
                return location ? location.match(reLocations).toString() : ''
            })(), //.toString(),
            date: (()=>{
                let dateTxt = $el.find('li .icon-clock').parent().text().trim();
                let date = Sugar.Date.create( dateTxt );
                return date ? Date.parse(date) : null;
            })(),
            description:  $el.find('.info-anuncio small').text().trim().replace(reRepetition,'$1'),
            phones: getPhones( $el.text() ),
            image: !/default\.jpg$/.test( $el.find('.anuncio-foto img.thumbnail').attr('src') )
        };

        return {...ad, score: ad.title.score(q,0.5) };

    }).get();

    return {
        headers: { 
            'Content-Type':'application/json',
            'Access-Control-Allow-Origin': '*' 
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} 
