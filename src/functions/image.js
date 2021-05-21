const fetch = require("node-fetch");
var cheerio = require('cheerio');   

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

            data = json[0].data.ad.images.edges[0].node.urls.high

        } else {
            const response = await fetch(url);
            const body = await response.text();
            const $ = cheerio.load( body );            
        }

        if ( /porlalivre/.test(url) ) {
            data = 'https://porlalivre.com' + $('a.img-thumbnail img').first().attr('src')
        }

        if ( /1cuc/.test(url) ) {
            data = $('a[data-lightbox] img').first().attr('src')
        }            



    } catch(e) { console.log(e) }

    const result = await fetch(data)
    const image = await result.buffer()

    return {
        statusCode: 200,
        headers: {
          'Content-type': 'image/jpeg',
          // 'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000',
        },
        body: image.toString('base64'),
        isBase64Encoded: true
    };
}