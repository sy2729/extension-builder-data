const axios = require('axios');

let config = (info='zh')=> {
  let data = {
    zh: 'https://ext.makeblock.com',
    en: 'https://ext.mblock.cc'
  }
  let token = {
    zh: 'tcmvy4jt',
    en: '0bpup3hw'
  }
  return {
    headers: {
      utoken: token[info],
      referer: data[info],
    }
  }
}

let allUserData = []

function getUser(info='zh') {
  
  let page = 1;
  let size = 100;

  async function getUserFun(info) {

    let url
    if(info==='zh') {
      url = `https://extpublish.makeblock.com/api/extension/version/list?status=audit&pageNumber=${page}&pageSize=${size}`;
    }else {
      url = `https://extpublish.mblock.cc/api/extension/version/list?status=audit&pageNumber=${page}&pageSize=${size}`
    }
    let data = await axios.get(url, config(info))
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



// getUser('zh')
//   .then(e=>console.log(e.length))


module.exports = getUser;