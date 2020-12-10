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

    const pdf = await page.pdf();
    await browser.close();
  
    return {
        headers: {
            "Content-type": "application/pdf",
            "content-disposition": "attachment; filename=" + slugify(title) + ".pdf"
          },
        statusCode: 200,
        body: pdf.toString("base64"),
        isBase64Encoded: true        
    }

}
