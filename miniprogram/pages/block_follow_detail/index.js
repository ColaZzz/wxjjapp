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
    this.setData({
      account: this.followText(account)
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
    let token = wx.getStorageSync('token')
    let worker = e.detail.value.worker
    api.oldRequest('editaccount', 'POST', {
        worker: worker,
        useraccountid: this.data.account.id,
        state: 1,
        token: token
      })
      .then(res => {
        if (res.code) {
          Toast(res.msg)
          api.oldRequest('getuseraccount', 'POST', {
              id: this.data.account.id,
              token: token
            })
            .then(result => {
              this.setData({
                account: this.followText(result.data)
              })
            })
        }
        wx.hideLoading()
      })
  },

  followText(json){
    if(json.follow == 0){
      json.followText = '无'
    }else{
      json.followText = '有'
    }
    return json
  }
})