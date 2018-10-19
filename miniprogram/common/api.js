function request(){
  wx.request({
    url: 'http://jjapp.test/api/estate',
    method: 'GET',
    data: {
      id: 2
    },
    success(res) {
      return res.data.data
    }
  })
}

module.exports = {
  request: request
}