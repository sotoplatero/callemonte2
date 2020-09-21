const { MTProto } = require('@mtproto/core');

const api_id = '1108098';
const api_hash = '0071cf841468782ac2c1f4d604186b94';

// 1. Create an instance

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province } = event.queryStringParameters;
    let data = []

    try {
        const mtproto = new MTProto({ api_id,  api_hash,});

        mtproto.call('messages.search',{
            peer: '@ofertasCU',
            q: 'samsung' ,
        },{}).then( result => {
          console.log(result);
        }).catch(error => {
          console.log('error.error_code:', error.error_code);
          console.log('error.error_message:', error.error_message);
        });      
// messages.search#8614ef68 
// flags:# 
// peer:InputPeer 
// q:string 
// from_id:flags.0?InputUser 
// filter:MessagesFilter 
// min_date:int 
// max_date:int 
// offset_id:int 
// add_offset:int 
// limit:int 
// max_id:int 
// min_id:int 
// hash:int = messages.Messages;

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
