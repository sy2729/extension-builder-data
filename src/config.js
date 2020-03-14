module.exports = {
  zh: {
    extData: 'src/国内插件数据.json',
    userData: 'src/国内用户数据.json',
    json: "dist/真正扩展上线的用户数据(国内).json",
    all_user_json: "dist/zh_all_user.json",
    text: "dist/真正扩展上线的用户数据(国内).txt",
    history: 'dist/zh_history.json',
    title: "真正扩展上线的用户数据(国内)",
    token: '1hdhk21i',
    referer: "https://ext.makeblock.com/",
    extension_api: 'https://extpublish.makeblock.com/api/extension/version/all',
    user_api: "https://extpublish.makeblock.com/api/extuser/list",
    all_ext: "http://extapi.makeblock.com/api/v2/admin/ext/list",
    all_ext_json: "dist/所有扩展数据(国内).json",
    active_data_once: "dist/zh_active_data_once.json",
    active_history: 'dist/zh_active_history.json',
    account: "exts@makeblock.com",
    password: "exts@mb123456",
    loginPath: 'https://passport2.makeblock.com/v1/user/login'
  },
  en: {
    extData: 'src/国际插件数据.json',
    userData: 'src/国际用户数据.json',
    json: "dist/真正扩展上线的用户数据(国际).json",
    all_user_json: "dist/en_all_user.json",
    text: "dist/真正扩展上线的用户数据(国际).txt",
    history: 'dist/en_history.json',
    title: "真正扩展上线的用户数据(国际)",
    token: 'zgytfl0p',
    referer: "https://ext.makeblock.com/",
    extension_api: 'http://extpublish.mblock.cc/api/extension/version/all',
    user_api: 'http://extpublish.mblock.cc/api/extuser/list',
    all_ext: "http://extapi.mblock.cc/api/v2/admin/ext/list",
    all_ext_json: "dist/所有扩展数据(国际).json",
    active_data_once: "dist/en_active_data_once.json",
    active_history: 'dist/en_active_history.json',
    account: "exts@makeblock.com",
    password: "exts@mb123456",
    loginPath: 'https://eu.passport2.makeblock.com/v1/user/login'
  },
  interval: 24,//hour
  dingdingInterval: 3 //hour 3小时可以发送一次通知
}