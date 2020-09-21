var cleaner = require('./libs/cleaner');
var Browser = require("zombie");

const rePhone = /((5|7)\d{7})|((24|32|33|45)\d{6})/g;

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province } = event.queryStringParameters;
    let data = [];


    browser = new Browser()
    try {
        browser.visit(`http://ofertas.cu/`, function() {
            browser.fill( 'input[name="q"]', q )
            browser.pressButton('button[type="submit"]', () => { 
<<<<<<< HEAD
                // console.log(browser.body)
                let ads = browser.queryAll('.listing')
                data = ads.map( el => {

                    let title = browser.text('a',el);
                    let description = browser.text('p',el);
                    let price = ( title + description ).match(/\d+(\.\d{2})?\s?cuc/i);
                    let phones = ( title + description ).replace().match(/\d+(\.\d{2})?\s?cuc/i);

                    console.log ( {
                        title: cleaner(title),
                        description: description,
                        price: price ? parseInt(price[0]) : '?',
                    } )
=======
                // browser.assert.element('.search-page a');
>>>>>>> 34bb92a0506e1c6df6896663570773451ef41931

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
