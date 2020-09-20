const fetch = require("node-fetch");
var cheerio = require('cheerio');
var cleaner = require('./libs/cleaner');
var { parse } = require('fecha');
const { reRepetition, rePhones, getPhones } = require('./libs/vars')
var Sugar = require('sugar');
require('sugar/locales/es.js');

const rePhone = /(\+?53)?\s?([1-9][\s-]?){1}(\d[\s-]?){7}/g;

const provinces = { 
    'pinar-del-rio': 'pinar',
    'artemisa': 'artemisa',
    'mayabeque': 'mayabeque',
    'la-habana': 'habana',
    'matanzas': 'matanzas',
    'cienfuegos': 'cienfuegos',
    'villa-clara': 'villaclara',
    'sancti-spiritus': 'sanctispiritus',
    'ciego-de-avila': 'ciego',
    'camaguey': 'camaguey',
    'las-tunas': 'tunas',
    'holguin': 'holguin',
    'granma': 'granma',
    'santiago-de-cuba': 'santiago',
    'guantanamo': 'guantanamo',
    'isla-de-la-juventud': 'isla',
}

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province = 'www' } = event.queryStringParameters;
    let location = province==='' ? 'cuba' : provinces[province]

    const response = await fetch(`https://${location}.porlalivre.com/search/?q=${q}&page=${p}&price_min=${pmin}&price_max=${pmax}`);
    const body = await response.text();
    const $ = cheerio.load( body );

    let data = $('div.classified-wrapper').map( (i,el) => {
        let $el = $(el), 
            $a = $el.find('a.classified-link'),
            reId = /([A-Z0-9]+)\/$/,
            $price = $el.find('#price2');

        return {
            price:  $el.find('#price2').text().replace(/\D/g,''),
            title:  cleaner( $el.find('.media-heading').children().remove().end().text() ),
            url: 'https://porlalivre.com' + $el.find('a.classified-link').attr('href'),
            description: $el.find('.media-body > span').text().trim().replace(reRepetition, '$1'),
            date: (()=>{
                let dateTxt = $el.find('ul.media-bottom li').first().text();
                let date = parse( 
                    dateTxt, 'MMM. D, YYYY',
                    { monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct', 'Nov', 'Dic']}
                )
                Sugar.Date.setLocale('es');
                date = date ? date : Sugar.Date.create(dateTxt);
                return date ? Date.parse(date) : null ;
            })(),
            location: $el.find('ul.media-bottom li').eq(1).text().trim(),
            phones: getPhones( $el.find('.media-body').text() ),
        };

    }).get();

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
