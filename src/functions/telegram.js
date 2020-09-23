const { MTProto, getSRPParams } = require('@mtproto/core');
const moment = require('moment')

const api_id = 1108098;
const api_hash = '0071cf841468782ac2c1f4d604186b94';
const phone = '+5352794404';
const code = '87829';
const password = 'n0m34cu3rd0';

const mtproto = new MTProto({
    api_id: api_id,
    api_hash: api_hash,
  });

// 1. Create an instance
const api = {
    call(method, params, options = { }) {
      return mtproto.call(method, params, options).catch(async error => {
        console.log(`${method} error:`, error);
  
        const { error_code, error_message } = error;
  
        if (error_code === 303) {
          const [type, dcId] = error_message.split('_MIGRATE_');
  
          // If auth.sendCode call on incorrect DC need change default DC, because call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
          if (type === 'PHONE') {
            await mtproto.setDefaultDc(+dcId);
          } else {
            options = {
              ...options,
              dcId: +dcId,
            };
          }
  
          return this.call(method, params, options);
        }
  
        return Promise.reject(error);
      });
    },
  };

exports.handler =  async (event, context, callback) => {
    var { q, p = 1, pmin = 1, pmax = '', province } = event.queryStringParameters;
    let data = []

    api.call('users.getFullUser', { id: { _: 'inputUserSelf' }})
        .then(response => {
            
            api.call('messages.search',{
                q: 'samsung',
                peer: {
                    _: 'inputPeerEmpty',
                    // chat_id: 868698546,
                },
                filter: {
                    _: 'inputMessagesFilterPhotos'
                },
                // from_id: 0,
                // min_date: 0 ,
                // max_date: moment().valueOf(),
                // offset_id: 0,
                // add_offset: 0,
                // limit: 20,
                // max_id: 0,
                // min_id: 0,
                // hash: 0,
            }).then( result => {
                console.log('result:' + result);
            }).catch(error => {
                console.log(error);
            });   
    
        })
        .catch(error => {

            sendCode(phone)
            .then(sendCodeResult => {
                return signIn({
                    code,
                    phone,
                    phone_code_hash: sendCodeResult.phone_code_hash,
                }).catch(error => {
    
                    if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
                        return getPassword().then(async result => {
                            const { srp_id, current_algo, srp_B } = result;
                            const { g, p, salt1, salt2, } = current_algo;
                
                            const { A, M1 } = await getSRPParams({
                            g,
                            p,
                            salt1,
                            salt2,
                            gB: srp_B,
                            password,
                            });
                
                            return checkPassword({ srp_id, A, M1 });
                        });
                    }
            
                    return Promise.reject(error);
                });
    
            })

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

function sendCode(phone) {
    return api.call('auth.sendCode', {
      phone_number: phone,
      settings: {
        _: 'codeSettings',
      },
    });
  }

  function signIn({ code, phone, phone_code_hash }) {
    return api.call('auth.signIn', {
      phone_code: code,
      phone_number: phone,
      phone_code_hash: phone_code_hash,
    });
  }

  function getPassword() {
    return api.call('account.getPassword');
  }
  
  async function checkPassword({ srp_id, A, M1 }) {
    return api.call('auth.checkPassword', {
      password: {
        _: 'inputCheckPasswordSRP',
        srp_id,
        A,
        M1,
      },
    });
  }

