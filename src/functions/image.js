const fetch = require("node-fetch");
var cheerio = require('cheerio');   
const chromium = require('chrome-aws-lambda');

exports.handler =  async (event, context, callback) => {
    const { url } = event.queryStringParameters;
    let data = ''

    try {

        if ( /revolico/.test(url) ) {
            const id = url.split('-').pop().replace(/\D/g,'')

            const response = await fetch("https://api.revolico.app/graphql/", {
                "credentials": "omit",
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
                    "Accept": "*/*",
                    "Accept-Language": "en-US,en;q=0.8,es-ES;q=0.5,es;q=0.3",
                    "Content-Type": "application/json"
                },
                "referrer": "https://www.revolico.com/",
                "body": "[{\"operationName\":\"AdDetails\",\"variables\":{\"id\":\""+id+"\"},\"query\":\"query AdDetails($id: Int!, $token: String) {\\n  ad(id: $id, token: $token) {\\n    ...Ad\\n    email(mask: true)\\n    subcategory {\\n      id\\n      title\\n      slug\\n      parentCategory {\\n        id\\n        title\\n        slug\\n        __typename\\n      }\\n      __typename\\n    }\\n    viewCount\\n    permalink\\n    __typename\\n  }\\n}\\n\\nfragment Ad on AdType {\\n  id\\n  phone\\n  title\\n  description\\n  price\\n  currency\\n  name\\n  status\\n  imagesCount\\n  images {\\n    edges {\\n      node {\\n        id\\n        gcsKey\\n        urls {\\n          high\\n          thumb\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  contactInfo\\n  updatedOnToOrder\\n  updatedOnByUser\\n  isAuto\\n  province {\\n    id\\n    slug\\n    name\\n    __typename\\n  }\\n  municipality {\\n    id\\n    slug\\n    name\\n    __typename\\n  }\\n  __typename\\n}\\n\"}]",
                "method": "POST",
                "mode": "cors"
            });      
            const json = await response.json();

            data = json[0].data.ad.images.edges[0].node.urls.thumb

        } else {
            const response = await fetch(url);
            const body = await response.text();
            var $ = cheerio.load( body );            
        }

        if ( /porlalivre/.test(url) ) {
            data = 'https://porlalivre.com' + $('a.img-thumbnail img').first().attr('src')
        }

        if ( /1cuc/.test(url) ) {
            data = $('a[data-lightbox] img').first().attr('src')
        }            



    } catch(e) { console.log(e) }

    // const response = await fetch("https://image.revolico.com/ads/qN3F5AtjsONKjH5Lr7393mjwAMr1j4cLToxuCLU34OZ8g1618351762599720746_thumb", {
    //   "headers": {
    //     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
    //     "sec-ch-ua-mobile": "?0",
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"        ,
    //   },
    //   "referrer": "https://www.revolico.com/",
    //   "referrerPolicy": "strict-origin-when-cross-origin",
    //   "body": null,
    //   "method": "GET",
    //   "mode": "cors",
    //   "credentials": "omit"
    // });

    // const result = await fetch(data,{

    //     "headers": {
    //         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
    //         "Accept": "*/*",
    //         "Accept-Language": "en-US,en;q=0.8,es-ES;q=0.5,es;q=0.3",
    //         "Content-Type": "application/json"
    //     },        
    // })
        const browser = await chromium.puppeteer.launch({
            ignoreDefaultArgs: ['--disable-extensions'],
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: process.env.PATH_CHROME || await chromium.executablePath,
            headless: true,
        });
        
        // Open page base
        const page = await browser.newPage();
        await page.goto(url)
        // const [response] = await Promise.all([
        //   // page.waitForNavigation(waitOptions),
        //     page.waitForSelector('.ReactModalPortal',{visible: true}),
        //     page.click('[data-cy="zoomAdImage"]'),
        //   // page.click(selector, clickOptions),
        // ]);        
        // await page.click('[data-cy="zoomAdImage"]')
        const el = await page.$('data-cy="zoomAdImage"]')
        const screenshot = await el.screenshot({ encoding: 'base64' });
        await browser.close();        

    return {
        statusCode: 200,
        headers: {
          'Content-type': 'image/jpeg',
          // 'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000',
        },
        body: screenshot,
        isBase64Encoded: true
    };
}