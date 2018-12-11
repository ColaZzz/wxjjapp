// miniprogram/pages/block_follow_detail/index.js
Page({
  data: {
    account: null
  },

  onLoad(options) {
    this.setData({
      account: JSON.parse(options.item)
    })
  },
})