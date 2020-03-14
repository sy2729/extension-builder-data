const axios = require('axios');
const login = require('./login');



let config = (info='zh')=> {
  let data = {
    zh: 'https://ext.makeblock.com',
    en: 'https://ext.mblock.cc'
  }
  let token = {
    zh: null,
    en: null
  }
  return {
    headers: {
      utoken: token[info],
      referer: data[info],
    }
  }
}



async function getUser(info='zh') {
  let allUserData = [];
  
  let page = 1;
  let size = 100;
  let token = await login(info);
  let reqConfig = config(info)

  reqConfig['headers']['utoken'] = token;

  // console.log(config('zh'))
  // console.log(config('en'))

  async function getUserFun(info) {

    let url
    if(info==='zh') {
      url = `https://extpublish.makeblock.com/api/extuser/list?pageNumber=${page}&pageSize=${size}`;
    }else {
      url = `https://extpublish.mblock.cc/api/extuser/list?pageNumber=${page}&pageSize=${size}`
    }

    let data = await axios.get(url, reqConfig)
    console.log(`正在爬取第${page}页信息`)

    data = data.data.data.list;
    if(data.length === 0) {
      return
    }else {
      page++
      allUserData.push(...data);
      return getUserFun(info)
    }
  }


  return getUserFun(info)
          .then(e=>allUserData)
}




module.exports = getUser;