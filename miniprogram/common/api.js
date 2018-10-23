const app = getApp()
var url = app.url

function request(apiName, method, params = null) {
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: url + apiName,
      method: method,
      data: params,
      success(res) {
        if(res.data.code){
          resolve(res.data.data)
        }else{
          reject('网络错误')
        }
      },
      fail(err){
        reject(err)
      }
    })
  })
  return promise
}

module.exports = {
  request: request
}