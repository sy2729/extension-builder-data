const config = require('./config');
const request = require('request');
const fs = require('fs');


let login = async(lang)=>{
  let data;
  let {account, password, loginPath, referer} = config[lang]
  let headers = Object.assign({}, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Postman-Token': '497d08d9-909f-43d6-9636-dace2136f5c2',
    'cache-control': 'no-cache',
    "Origin": referer,
    "Referer": referer
  });
  var options = { 
    method: 'POST',
    url: loginPath,
    headers,
    body: {account, password},
    json: true 
  };
  try {
    data = await requestAsync(options)
  }catch(e){
    console.log(e)
  }
  //获取token
  let token = data && data.data && data.data.data && data.data.data.token;
  
  //将token写入文件
  console.log(`${lang} token: ${token}`)
  config[lang]['token'] = token;

  return Promise.resolve(token)
}

module.exports = login;




/** 
* @abstract Async request method
* @param Object request options
*/
function requestAsync (options) {
  return new Promise((res,rej)=>{
    request(options, function (error, response, body) {
      if (error) rej(new Error(error));
      res({data: body});
    });
  })
}