const { MTProto } = require('@mtproto/core');

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

    mtproto.call('messages.search',{
        peer: {
            InputPeer: {
                _: 'inputPeerChat',
                chat_id: 868698546,
            }
        },
        q: 'samsung',
    }).then( result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
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
