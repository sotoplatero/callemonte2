var cheerio = require('cheerio');
const chromium = require('chrome-aws-lambda');

// the browser path
const localChrome = process.env.PATH_CHROME;
process.setMaxListeners(0)

const { reLocations, getPhones } = require('./libs/vars.js') ;
require("string_score");

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '' , province = '' } = event.queryStringParameters;
    var data = [];

    const url = `https://www.revolico.com/search.html?q=${q}&min_price=${pmin}&max_price=${pmax}&p=${p}&province=${province}`;

    const browser = await chromium.puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: localChrome || await chromium.executablePath,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });
    const body = await page.$eval('ul', el => el.outerHTML);
    console.log(body)
    // const response = await fetch( url, options );
    // const body = await response.text();
    // const $ = cheerio.load( body );
    // console.log(body)
    // let data = $('li[data-cy="adRow"]')
    //     .map( (i,el) => {
    //         let $el = $(el), 
    //             selPrice = 'span[data-cy="adPrice"]';

    //         let ad = {
    //             price: parseInt( $el.find( selPrice).length ? $el.find( selPrice).text() : 0 ),
    //             title: cleaner( $el.find( 'span[data-cy="adTitle"]' ).text() ),
    //             url: 'https://www.revolico.com' + $el.find('a[href$="html"]').attr('href'),
    //             description: $el.find( 'span[data-cy="adDescription"]' ).text(),
    //             date: parseInt( $el.find( 'time[datetime]' ).attr('datetime') ),
    //             location: ($el.text().match(reLocations) || []).toString(),
    //             phones: getPhones( $el.text() ),
    //             // phones: $el.find( selTitle ).text().match(rePhone) || [],
    //             // photo: $el.find('span[data-cy="adPhoto"]').length > 0,
    //         }
    //         return {...ad, score: ad.title.score(q,0.5) };
    //     }).get();
    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(data)
    };
 
} // revolico
