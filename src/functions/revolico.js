const got = require('got');
require("string_score");
var cleaner = require('./libs/cleaner');
const { reLocations, getPhones } = require('./libs/vars.js') ;

exports.handler =  async (event, context, callback) => {
    const { q, p = 1, pmin = 1, pmax = '' , province = '' } = event.queryStringParameters;
    var ads = [];

    const referer = `https://www.revolico.com/search.html?q=${q}&min_price=${pmin}&max_price=${pmax}&p=${p}&province=${province}`;

    let variables =  {
        "contains": q,
        "sort":[{ "order":"desc","field":"relevance" }],
        "page":1,
        "priceGte": pmin,
        "pageLength":"100"
    };

    if (pmax) variables.priceLte = pmax
    if (province) variables.provinceSlug = province

    try{

        const {body} = await got.post( 'https://api.revolico.app/graphql/', {
            responseType: 'json',
            headers: {
                'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:83.0) Gecko/20100101 Firefox/83.0',
                'Accept': '*/*',
                'Accept-Language': 'es,es-ES;q=0.8,en-US;q=0.5,en;q=0.3',
                'Content-Type': 'application/json',
                'Referer': referer,
                'Origin': 'https://www.revolico.com', 
                'Connection': 'keep-alive',
            },
            json: [{ 
                "operationName":"AdsSearch",
                "variables": variables,
                "query":"query AdsSearch($category: ID, $subcategory: ID, $contains: String, $priceGte: Float, $priceLte: Float, $sort: [adsPerPageSort], $hasImage: Boolean, $categorySlug: String, $subcategorySlug: String, $page: Int, $provinceSlug: String, $municipalitySlug: String, $pageLength: Int) {\n  adsPerPage(category: $category, subcategory: $subcategory, contains: $contains, priceGte: $priceGte, priceLte: $priceLte, hasImage: $hasImage, sort: $sort, categorySlug: $categorySlug, subcategorySlug: $subcategorySlug, page: $page, provinceSlug: $provinceSlug, municipalitySlug: $municipalitySlug, pageLength: $pageLength) {\n    pageInfo {\n      ...PaginatorPageInfo\n      __typename\n    }\n    edges {\n      node {\n        id\n        title\n        price\n        currency\n        shortDescription\n        permalink\n        imagesCount\n        updatedOnToOrder\n        isAuto\n        province {\n          id\n          name\n          slug\n          __typename\n        }\n        municipality {\n          id\n          name\n          slug\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    meta {\n      total\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment PaginatorPageInfo on CustomPageInfo {\n  startCursor\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  pageCount\n  __typename\n}\n"}]
        })

        ads = body[0].data.adsPerPage.edges.map( ({ node }) => ({
                price: node.price,
                title: node.title,
                description: node.shortDescription,
                url: 'https://www.revolico.com' + node.permalink,
                date: node.updatedOnToOrder,
                location: node.province.name,
                phones: getPhones( node.title + node.shortDescription  ),
                score: node.title.score(q,0.5) 
            }));    

        console.log(ads)   

    }
    catch(error){
        console.log( error.response.body.errors );
    }

    return {
        headers: { 'Content-Type':'application/json', 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: JSON.stringify(ads)
    };
 
} // revolico
