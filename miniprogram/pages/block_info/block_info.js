// miniprogram/pages/block_info/block_info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    linkage: null,
    checkUsers: null,
    checkLength: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let data = JSON.parse(options.data)
    let data2 = JSON.parse(options.data2)
    this.setData({
      linkage: data,
      checkUsers: data2,
      checkLength: data2.length
    })

    // 上传台账数据
    if (data2.length == 0) {
      console.log(data)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  }
})