const fetch = require("node-fetch");
var cheerio = require('cheerio');   
const moment = require('moment')

var Sugar = require('sugar');
require('sugar/locales/es.js');
Sugar.Date.setLocale('es');

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters;
    var data, date, location, phones, photos = [], description;
    const provinces = /La Habana|Artemisa|Mayabeque|Matanza/;
    const proxyUrl = '/.netlify/functions/proxy?url=';

    try {
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load( body );

        if ( /revolico/.test(url) ) {
            let photo = $('[data-cy="zoomAdImage"]').first().attr('href');
            data = {
                // photo: $('[data-cy="zoomAdImage"]').map( (i,el) => $(el).attr('href') ).get(),
                photo: photo ,
                phones: (() => {
                    let phones = $('[href^="tel:"],[data-cy="adDescription"]')
                        .text()
                        .replace(/\W/g,'')
                        .match( /\d{8}/g );
                    return phones = phones ? phones.filter((val, idx, el) => el.indexOf(val) === idx) : [];
                })(),
                location: $('span.item-location').text().trim(),
                // location = $('[data-cy="adLocation"]').text();
                // date = moment( parseInt( $('time').attr('datetime') ) ).format('D MMM, hA')
            }
        }

        if ( /porlalivre/.test(url) ) {
            let date = Sugar.Date.create($('i.fa-arrow-circle-up').parent().text().trim());
            data = {
                // photos: $('.img-thumbnail').map( (i,el) => 'https://porlalivre.com' + $(el).attr('href') ).get(),
                photo: 'https://porlalivre.com' + $('.img-thumbnail').first().attr('href'),
                phones: $('.contact-info').text().replace(/\W/g,'').match(/\d{8}/g) || [],
                date: Sugar.Date.format( date, '%b %e %R' ),

            }
            // location = $('i.fa-home').parent().text().trim()
        }

        if ( /1cuc/.test(url) ) {
            data = {
                // photo: $('a[data-lightbox] img').map( (i,el) => $(el).attr('src') ).get(),
                photo: $('a[data-lightbox] img').first().attr('src'),
                phones: ($('[itemprop="description"]').text().replace(/\W/g,'').match(/\d{8}/g) || []).filter((value, index, el) => el.indexOf(value) === index),
                // location: $('.v-map-point').text(),
                // date: $('.v-map-point').next().text(),
            }
        }            

        if ( /timbirichi/.test(url) ) {
            data = {
                photo: $('.anuncio-list-fotos .myfancybox').first().attr('href'),
                phones: $('[href^="tel:"]').first().text().replace(/\W/g,'').match(/\d{8}/g),
            }
        }

        if ( /bachecubano/.test(url) ) {
            let date = Sugar.Date.create( parseInt( $('.tg-created-timestamp').text() ) );
            let photo = $('.item-slider > li > a').first().attr('href');
            let phones = $('[href^="tel:"]').first().text().replace(/\W/g,'').match( /\d{8}/g );

            data =  {
                photo: !photo ? $('.img-fluid').first().attr('src') : photo,
                phones: !phones ? $('#content').text().replace(/\W/g,'').match( /\d{8}/g ) : phones,
                date: Sugar.Date.format( date, '%b %e %R' ),
                description: $('#content').text().substring(0,250),
            }
        }        

        if ( /merolico/.test(url) ) {
            data = {
                // photos: $('a[data-fancybox-href]').map( (i,el) => $(el).attr('data-fancybox-href') ).get(),
                photo: $('a[data-fancybox-href]').first().attr('data-fancybox-href'),
                phones: (() => {
                    let phones = $('[href^="tel:"]')
                        .attr('href')
                        .match( /\d{8}/g );
                    return phones = phones ? phones.filter((val, idx, el) => el.indexOf(val) === idx) : [];
                })()
            };
        }

    } catch(e) { console.log(e) }

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify( data )
    };
}