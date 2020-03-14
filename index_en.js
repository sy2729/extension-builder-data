const axios = require('axios');
const colors = require('colors');
// 获得设备信息
// https://extservice.makeblock.com/api/publish/ext/list?ap=mblockweb&v=latest&t=device&ids=&target=&s=&pageNumber=1&pageSize=300

// 获得设备对应扩展信息
// https://extservice.makeblock.com/api/publish/ext/list?ap=mblockweb&v=latest&t=ext&ids=&target=codey&s=&pageNumber=1&pageSize=16


let officialAccount = ['mBlock','Scratch','extransfer']

axios.get('https://extservice.mblock.cc/api/publish/ext/list?ap=mblockweb&v=latest&t=device&ids=&target=&s=&pageNumber=1&pageSize=300')
  .then(e=>e.data)
  .then(e=>{
    let list = e.data.list;
    //增加舞台选项
    list.push({id:'sprites'});

    let results = [];
    list.forEach(e=> {
      // console.log(e.id)
      results.push(
        axios.get(`https://extservice.mblock.cc/api/publish/ext/list?ap=mblockweb&v=latest&t=ext&ids=&target=${e.id}&s=&pageNumber=1&pageSize=1000`)
        .then(e=>e.data)
      )
    })

    Promise.all(results)
      .then(e=> {
        let allExt = [];
        e.forEach(i=> {
          if(i.data && i.data.list) {
            let list = i.data.list;
            allExt = allExt.concat(list)
          }
        })
        //得到所有扩展数据
        console.log(colors.yellow('总共有' + allExt.length + ' 个扩展'))
        let thirdPartyExt = [];
        allExt.forEach(e=> {
          if(e.createdByName !== 'mBlock' &&
            e.createdByName !== 'extransfer' &&
            e.createdByName !== 'Scratch') {
            thirdPartyExt.push(e)
          }
        })

        // 数组去重
        let obj = {}
        let results = []
        thirdPartyExt.forEach(e=> {
          if(!obj.hasOwnProperty(e.id)) {
            results.push(e)
            obj[e.id] = true
          }
        })

        console.log(colors.green('总共有' + results.length + ' 个第三方扩展'))

        console.log('扩展名称分别为： ')
        results.forEach(e=> {
          console.log(colors.gray(`扩展ID为${e.id}`), colors.green(`扩展名称为：${e['name']['zh']}`))
        })


      })
  })