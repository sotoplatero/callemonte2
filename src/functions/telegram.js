const { MTProto } = require('@mtproto/core');
const moment = require('moment')

const api_id = '1108098';
const api_hash = '0071cf841468782ac2c1f4d604186b94';

// 1. Create an instance
const mtproto = new MTProto({ api_id,  api_hash,});
mtproto.updateInitConnectionParams({
    app_version: '10.0.0',
  });

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province } = event.queryStringParameters;
    let data = []
    let hoy = moment().valueOf()
    // mtproto.call('messages.search',{
    //     q: 'samsung',
    //     peer: {
    //         _: 'inputPeerEmpty',
    //         // chat_id: 868698546,
    //     },
    //     filter: {
    //         _: 'inputMessagesFilterPhotos'
    //     },
    //     // from_id: 0,
    //     // min_date: 0 ,
    //     // max_date: moment().valueOf(),
    //     // offset_id: 0,
    //     // add_offset: 0,
    //     // limit: 20,
    //     // max_id: 0,
    //     // min_id: 0,
    //     // hash: 0,
    // }).then( result => {
    //   console.log('result:' + result);
    // }).catch(error => {
    //   console.log(error);
    // });      
mtproto.call('help.getNearestDc').then(result => {
  console.log(`country:`, result);
});
    return {
        headers: { 
            'Content-Type':'application/json' , 
            'Access-Control-Allow-Origin': '*'
        },
        statusCode: 200,
        body: JSON.stringify(data)
    };

} // revolico
