// miniprogram/pages/block_apply/block_apply.js
import Toast from '../../dist/vant-weapp/toast/toast'
import api from '../../common/api.js'
Page({
  data: {
    applyList: null
  },

  onLoad: function(options) {
    this.getAllApply()
  },

  agreed(e) {
    let item = e.currentTarget.dataset.item
    this.setUserRole(item.id, 1)
  },

  reject(e) {
    let item = e.currentTarget.dataset.item
    console.log(item)
    this.setUserRole(item.id, 2)
  },

  /**
   * 获取申请列表
   */
  getAllApply() {
    api.request('allapply', 'POST', {
        token: wx.getStorageSync('token')
      })
      .then(res => {
        this.setData({
          applyList: res
        })
      })
  },

  /**
   * 修改用户权限
   */
  setUserRole(applyId, state) {
    wx.showLoading({
      title: 'working..',
    })
    api.oldRequest('setapply', 'POST', {
        applyid: applyId,
        state: state,
        token: wx.getStorageSync('token')
      })
      .then(res => {
        wx.hideLoading()
        Toast(res.msg)
        this.getAllApply()
      })
  }
})