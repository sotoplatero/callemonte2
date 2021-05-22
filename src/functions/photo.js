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
    await page.setViewport({ width: 612, height: 791, })
    await page.goto(url, { waitUntil: 'networkidle2' });
    const title = await page.title();

    const selector = {
        revolico: '.Detail__Content-sc-1irc1un-0',
        timbirichi: '.panel-body',
        porlalivre: 'div.container:nth-child(2)', 
        "1cuc": '.l-main__content',
    }[ url.match(/revolico|timbirichi|porlalivre|merolico|1cuc/)[0] ] || 'body'
    const ele = await page.$(selector)

    const screenshot = await ele.screenshot({ encoding: 'base64' });
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
