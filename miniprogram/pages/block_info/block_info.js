// miniprogram/pages/block_info/block_info.js
import api from '../../common/api.js'
Page({
  data: {
    linkage: null,
    checkUsers: null,
    checkLength: 0,
    keyWord: ''
  },

  onLoad(options) {
    let data = JSON.parse(options.data)
    let data2 = JSON.parse(options.data2)
    let {
      username,
      user_number
    } = data
    let accurate = data2.find(arr =>
      (arr.user_number == user_number && arr.username == username)
    )
    console.log(accurate)
    let dataList = []
    let keyWord
    let length
    if (accurate) {
      dataList.push(accurate)
      keyWord = '精确'
      length = 1
    } else {
      dataList = data2
      keyWord = '可能相关'
      length = data2.length
    }
    this.setData({
      linkage: data,
      checkUsers: dataList,
      checkLength: length,
      keyWord: keyWord
    })

    // 上传台账数据
    api.request('insaccount', 'POST', {
        name: data.username,
        number: data.user_number,
        token: wx.getStorageSync('token')
      })
      .then(res => {
        console.log(res)
      })
  },

})