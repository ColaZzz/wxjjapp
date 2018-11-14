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

function oldRequest(apiName, method, params = null) {
  let promise = new Promise((resolve, reject) => {
    wx.request({
      url: url + apiName,
      method: method,
      data: params,
      success(res) {
        if (res.data.code) {
          resolve(res.data)
        } else {
          reject('网络错误')
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
  return promise
}

function login(){
  let promise = new Promise((resolve,reject)=>{
    wx.login({
      success(res){
        wx.request({
          url: url + 'login',
          method: 'POST',
          data: {
            code: res.code
          },
          success(result) {
            let session_3rd = result.data.data
            wx.setStorageSync('token', session_3rd)
            resolve(session_3rd)
          },
          fail(err){
            reject(err)
          }
        })
      }
    })
  })

  return promise;
}

module.exports = {
  request,
  oldRequest,
  login
}