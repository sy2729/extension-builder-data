// https://forum.makeblock.com/c/mblock/mBlock-Extensions

const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://forum.makeblock.com/c/mblock/mBlock-Extensions')
  .then(e=>e.data)
  .then(e=>{
    let allData = [];
    let $ = cheerio.load(e);
    
    let titleEl = $(`[itemprop='itemListElement'] [itemprop='name']`);
    let postsEl = $(`[itemprop='itemListElement'] .posts`);
    let contentURL = $(`[itemprop='itemListElement'] meta`);
    // let titleEl = $(`.topic-list-item .title`);
    // console.log()
    titleEl.each((index, e)=>{
      let post = $(postsEl[index]).text().replace('(', "")
      post = post.replace(')', "");
      let info = {
        title: $(e).text(),
        post,
        url: $(contentURL[index]).attr('content')
      }
      allData.push(info)
    })
    console.log(allData)
    // for(let i in titleEl) {
    //   console.log($(titleEl[i]).text())
    // }
    // console.log(title)
  })