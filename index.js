const axios = require('axios');
const colors = require('colors');
// 获取用户数据
const getUser = require('./src/user');

//获取待审核数据
// const getReviewExt = require('./src/review');
// 获得设备信息
// https://extservice.makeblock.com/api/publish/ext/list?ap=mblockweb&v=latest&t=device&ids=&target=&s=&pageNumber=1&pageSize=300

// 获得设备对应扩展信息
// https://extservice.makeblock.com/api/publish/ext/list?ap=mblockweb&v=latest&t=ext&ids=&target=codey&s=&pageNumber=1&pageSize=16
//设备数量
let deviceNum;

let officialAccount = ['mBlock','Scratch','extransfer']


function getExtInfo(lang) {

  let info = {
    zh: 'makeblock.com',
    en: 'mblock.cc'
  }

  return axios.get(`https://extservice.${info[lang]}/api/publish/ext/list?ap=mblockweb&v=latest&t=device&ids=&target=&s=&pageNumber=1&pageSize=300`)
    .then(e=>e.data)
    .then(e=>{
      let list = e.data.list;
      //增加舞台选项
      deviceNum = list.length;
      list.push({id:'sprites'},{id:'microbit'},{id:'codey'});
      
      let results = [];
      list.forEach(e=> {
        // console.log(e.id)
        results.push(
          axios.get(`https://extservice.${info[lang]}/api/publish/ext/list?ap=mblockweb&v=latest&t=ext&ids=&target=${e.id}&s=&pageNumber=1&pageSize=1000`)
          .then(e=>e.data)
        )
      })

      return Promise.all(results)
        .then(e=> {
          let allExt = [];
          e.forEach(i=> {
            if(i.data && i.data.list) {
              let list = i.data.list;
              allExt = allExt.concat(list)
            }
          })
          //得到所有扩展数据
          if(lang === 'zh') {console.log(colors.yellow('-----------  扩展情况  -----------'))}
          // else if(lang === 'en') {console.log(colors.yellow('-----------  国外扩展情况  -----------'))}
          // 去重扩展总量信息
          allExt = removeExtra(allExt);
          console.log(colors.yellow('扩展总数： ' + (allExt.length + deviceNum)))
          let thirdPartyExt = [];
          allExt.forEach(e=> {
            if(e.createdByName !== 'mBlock' &&
              e.createdByName !== 'extransfer' &&
              e.createdByName !== 'Scratch') {
              thirdPartyExt.push(e)
            }
            // officialAccount.forEach(i=> {
            //   if(e.createdByName !== i) {
            //     thirdPartyExt.push(e)
            //     console.log(2)
            // })
          })

          // 去重第三方扩展信息
          let results = removeExtra(thirdPartyExt);

          // console.log(colors.green('第三方扩展总数： ' + results.length))

          // console.log('第三方扩展信息： ')
          // results.forEach((e,index)=> {
          //   console.log(colors.gray(`${index + 1}. 扩展ID: ${e.id}`), colors.green(`扩展名称：${e['name']['zh']}`), colors.yellow(`作者ID：${e['createdBy']}`))
          // })

          return results
        })
    })
}


(async ()=>{
  getExtInfo('zh')
    .then(results=>{
      getUser()
        .then(zhUsers=>{
          console.log(colors.yellow('--------------国内开发者数量------------'))
          console.log(colors.green(`共 ${zhUsers.length} 名开发者`))

          getUser('en')
          .then(users=>{
            console.log(colors.yellow('--------------国外开发者数量------------'))
            console.log(colors.green(`共 ${users.length} 名开发者`))
            console.log(colors.green('第三方扩展总数： ' + results.length))
            //合并国内外
            users = users.concat(zhUsers);
            console.log('第三方扩展信息： ')
              results.forEach((i,index)=>{
                let id = i['createdBy'];
                let name, email;
                users.forEach(j=>{
                  if(j['id'] === id) {
                    name = j['userName'];
                    email = j['email'];
                    return
                  }
                })
  
                console.log(colors.gray(`${index + 1}.`), colors.green(`扩展名称：${i['name']['zh']}`), colors.yellow(`作者姓名：${name}`))
              })
  
              // users.forEach(i=>{
              //   console.log(i)
              // })
            })
        })
    })
    .then(e=> {
      console.log(colors.yellow(`
      ------------------
      ------------------
      扩展情况查询结束
      ------------------
      ------------------
      `))
    })
  
  })()
  
  // getUser()
  //   .then(e=>{
  //     console.log(colors.yellow('--------------国内开发者数量------------'))
  //     console.log(colors.green(`共 ${e.length} 名开发者`))
  //     getUser('en')
  //     .then(e=>{
  //       console.log(colors.yellow('--------------国外开发者数量------------'))
  //       console.log(colors.green(`共 ${e.length} 名开发者`))
  
  //       // e.forEach(i=>{
  //       //   console.log(i)
  //       // })
  //       })
  //   })

// getReviewExt()
//   .then(e=> {
//     console.log(colors.yellow('--------------国内扩展待审核数量------------'))
//     console.log(colors.green(`共 ${e.length} 个待审核扩展`))
    
//     getReviewExt('en')
//     .then(e=> {
//       console.log(colors.yellow('--------------国外扩展待审核数量------------'))
//       console.log(colors.green(`共 ${e.length} 个待审核扩展`))
//     })
//   })











  //
function removeExtra(arr) {
  let obj = {}
  let results = []
  arr.forEach(e=> {
    if(!obj.hasOwnProperty(e.id)) {
      results.push(e)
      obj[e.id] = true
    }
  })
  return results
}