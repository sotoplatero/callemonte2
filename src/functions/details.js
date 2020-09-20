const fetch = require("node-fetch");
var cheerio = require('cheerio');   
var { parse } = require('fecha');
const { rePhones } = require('./libs/vars.js') ;

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters;
    var data, date, location, phones, photos = [], description;

    var getPhones = (text) => ( text.match( rePhones ) || [] )
                    .map( ph => ph.replace(/\D/g,'') )
                    .filter( (val, idx, el) => el.indexOf(val) === idx );

    try {
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load( body );

        if ( /revolico/.test(url) ) {
            data = {
                photo: $('[data-cy="zoomAdImage"]').first().attr('href') ,
                phones:  getPhones( $('[href^="tel:"],[data-cy="adDescription"]').text() )
                location: $('span.item-location').text().trim(),
            }
        }

        if ( /porlalivre/.test(url) ) {
            data = {
                photo: 'https://porlalivre.com' + $('.img-thumbnail').first().attr('href'),
                phones: getPhones($('.contact-info,.classified-description').text()),
                date: parse( 
                    dateTxt, 'D, MMMM, h:m A',
                    { monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                )

            }
        }

        if ( /1cuc/.test(url) ) {
            data = {
                photo: $('a[data-lightbox] img').first().attr('src'),
                phones: getPhones( $('[itemprop="description"]').text() ),
            }
        }            

        if ( /timbirichi/.test(url) ) {
            data = {
                photo: $('.anuncio-list-fotos .myfancybox').first().attr('href'),
                phones: getPhones( $('[href^="tel:"],panel-body').text() ),
            }
        }

        if ( /bachecubano/.test(url) ) {
            let photo = $('.item-slider > li > a').first().attr('href');

            data =  {
                photo: !photo ? $('.img-fluid').first().attr('src').replace(/_thumbnail/,'') : photo,
                phones: getPhones( $('[href^="tel:"], #content').text() ),
                date: parseInt( $('.tg-created-timestamp').text() ) * 1000,
                description: $('#content').text().substring(0,280),
            }
        }        

        if ( /merolico/.test(url) ) {
            data = {
                // photos: $('a[data-fancybox-href]').map( (i,el) => $(el).attr('data-fancybox-href') ).get(),
                photo: $('a[data-fancybox-href]').first().attr('data-fancybox-href'),
                phones: getPhones( $('[href^="tel:"],.ads-details-info').text() ),
            };
        }

    } catch(e) { console.log(e) }

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify( data )
    };
}