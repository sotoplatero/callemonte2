const fetch = require("node-fetch");
var cheerio = require('cheerio');   
const moment = require('moment')

var Sugar = require('sugar');
require('sugar/locales/es.js');
Sugar.Date.setLocale('es');

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters
    var data, date, location, phones, photos = [], description;
    const provinces = /La Habana|Artemisa|Mayabeque|Matanza/

    try {
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load( body );

        if ( /revolico/.test(url) ) {
            data = {
                // photo: $('[data-cy="zoomAdImage"]').map( (i,el) => $(el).attr('href') ).get(),
                photo: $('[data-cy="zoomAdImage"]').first().attr('href'),
                phones: $('[data-cy="adPhone"]').text().replace(/\s/g,'').match(/\d{8}/g),
                // location = $('[data-cy="adLocation"]').text();
                // date = moment( parseInt( $('time').attr('datetime') ) ).format('D MMM, hA')
            }
        }

        if ( /porlalivre/.test(url) ) {
            data = {
                // photos: $('.img-thumbnail').map( (i,el) => 'https://porlalivre.com' + $(el).attr('href') ).get(),
                photo: 'https://porlalivre.com' + $('.img-thumbnail').first().attr('href'),
                phones: $('.contact-info').text().match(/\d{8}/g) || [],

            }
            // location = $('i.fa-home').parent().text().trim()
            // date = $('i.fa-arrow-circle-up').parent().text().trim()
        }

        if ( /1cuc/.test(url) ) {
            data = {
                // photo: $('a[data-lightbox] img').map( (i,el) => $(el).attr('src') ).get(),
                photo: $('a[data-lightbox] img').first().attr('src'),
                phones: ($('[itemprop="description"]').text().match(/\d{8}/g) || []).filter((value, index, el) => el.indexOf(value) === index),
                // location: $('.v-map-point').text(),
                // date: $('.v-map-point').next().text(),
            }
        }            

        if ( /timbirichi/.test(url) ) {
            data = {
                photo: $('.anuncio-list-fotos .myfancybox').first().attr('href'),
                phones: $('[href^="tel:"]').first().text().replace(/\D/g,'').match(/\d{8}/g),
            }
        }

        if ( /bachecubano/.test(url) ) {
            data =  {

                photo: (()=>{
                    photos = $('.item-slider > li > a')
                        .first()
                        .attr('href');
                    if ( !photos) {
                        photos = $('.img-fluid').first().attr('src');
                    }
                    return photos;
                })(),

                phones: (() => {
                    phones = $('[href^="tel:"]').first().text().replace(/\D/g,'');

                    if (phones === "") {
                        phones = $('#content').text().replace(/\W/g,'').match( /\d{8}/g )
                    }
                    return phones;
                })(),

                date: (() => {
                        date = Sugar.Date.create( parseInt( $('.tg-created-timestamp').text() ) );
                        return Sugar.Date.format( date, '%b %e %R' );
                    })(),

                description: $('#content').text().substring(0,250),
            }
        }        

        if ( /merolico/.test(url) ) {
            data = {
                // photos: $('a[data-fancybox-href]').map( (i,el) => $(el).attr('data-fancybox-href') ).get(),
                photo: $('a[data-fancybox-href]').first().attr('data-fancybox-href'),
                phones: $('[href^="tel:"]').first().text().replace(/[\s\(\)]/g,'').split(),
                // date: $('span[date-time]').attr('date-time'),
                // location: $('span.item-location').text().trim(),
            };
        }

    } catch(e) { console.log(e) }

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify( data )
    };
}