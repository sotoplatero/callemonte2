const chromium = require('chrome-aws-lambda');
var slugify = require('slugify')
// the browser path
const localChrome = process.env.PATH_CHROME;

exports.handler = async (event, context) => {

    const url = event.queryStringParameters.url 

    if ( !url ) return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Page URL not defined' })
    }

    const browser = await chromium.puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: localChrome || await chromium.executablePath,
        headless: chromium.headless,
    });
    
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    const title = await page.title();

    if (/revolico/.test(url)) {
        const ele = await page.$('.Detail__Content-sc-1irc1un-0')
    }

    const screenshot = await page.screenshot({ encoding: 'base64' });
    await browser.close();
  
    return {
        headers: {
            "Content-type": "image/png",
            "content-disposition": "attachment; filename=" + slugify(title) + ".png",
            'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000', 
          },
        statusCode: 200,
        body: screenshot,
        isBase64Encoded: true        
    }

}
