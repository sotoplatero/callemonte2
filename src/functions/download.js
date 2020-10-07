const fetch = require("node-fetch");
const https = require('https');
const fs = require('fs');
const util = require('util');
const streamPipeline = util.promisify(require('stream').pipeline);

exports.handler = async (event, context) => {

  const { url, title } = event.queryStringParameters

//   let pdf
//   const pdf = fs.createWriteStream( title + ".pdf");
var pdf;
  const microlinkUrl = `https://api.microlink.io/?url=${url}&pdf&embed=pdf.url&scale=1&margin=0.4cm`;

  try {
    // const request = https.get(microlinkUrl, function(response) {
    //   response.pipe(pdf);
    // });      
	const response = await fetch(microlinkUrl);
	
	if (response.ok) {
		pdf = streamPipeline(response.body, fs.createWriteStream( title + ".pdf" ));
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error.message
      })
    }
  }
  return {
    statusCode: 200,
    headers: {
      'Content-type': 'application/pdf',
    //   'Content-Disposition': 'attachment',
    },
    body: pdf.toString('base64'),
    isBase64Encoded: true
  }

}
