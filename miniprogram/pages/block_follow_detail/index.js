// miniprogram/pages/block_follow_detail/index.js
import api from '../../common/api.js'
import Toast from '../../dist/vant-weapp/toast/toast'
Page({
  data: {
    account: null,
    checked: false
  },

  onLoad(options) {
    let account = JSON.parse(options.item)
    if (account.follow == 0) {
      account.followText = '无'
    } else {
      account.followText = '有'
    }
    this.setData({
      account: account
    })
  },

  onChange({
    detail
  }) {
    this.setData({
      checked: detail
    });
  },

  submit(e) {
    wx.showLoading({
      title: '跟进中..',
    })
    let worker = e.detail.value.worker
    api.oldRequest('editaccount', 'POST', {
        worker: worker,
        useraccountid: this.data.account.id,
        state: 1,
        token: wx.getStorageSync('token')
      })
      .then(res => {
        if (res.code) {
          Toast(res.msg)
        }
        wx.hideLoading()
      })
  }
})