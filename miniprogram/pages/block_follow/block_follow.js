// miniprogram/pages/block_follow/block_follow.js
import api from '../../common/api.js'
Page({
  data: {
    dataList: null
  },

  onLoad(options) {

  },

  onConfirm(e) {
    wx.showLoading({
      title: '搜索中..',
    })
    let word = e.detail.value
    api.oldRequest('getaccountforword', 'POST', {
        word,
        token: wx.getStorageSync('token')
      })
      .then(res => {
        if (res.code == 1) {
          this.data.dataList = null
          this.setData({
            dataList: res.data
          })
        } else {

        }
        wx.hideLoading()
      })
  },

  showRecord(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../block_follow_detail/index?item=' + JSON.stringify(item),
    })
  }
})