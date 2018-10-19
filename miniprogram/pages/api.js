function request(url, method, data){
  wx.request({
    url: url,
    method: method,
    data: data
  })
}

module.exports = {
  request: request
}