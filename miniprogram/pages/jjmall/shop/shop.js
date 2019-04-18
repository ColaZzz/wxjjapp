// miniprogram/pages/jjmall/shop/shop.js
import api from '../../../common/api.js'
const app = getApp()
Page({
  data: {
    html: '',
    shop: null,
    imgUrl: '',
    commodities: [],
    averageSpent: null,
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中..',
    })
    let {
      id,
      title
    } = options
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: title
    })
    this.setData({
      imgUrl: app.imgUrl,
      hidden: true
    })
    // 商铺信息
    let shop = api.request('mallshop', 'GET', {
      id
    })
    // 商铺的商品
    let commodity = api.request('mallcommodities', 'GET', {
      id
    })
    Promise.all([shop, commodity])
      .then(res => {
        let averageSpent = res[0].average_spent
        this.setData({
          shop: res[0],
          html: res[0].introduction,
          commodities: res[1],
          averageSpent: averageSpent,
          hidden: false
        })
        wx.hideLoading()
      })
  },

  /**
   * 点击商品
   */
  comTap(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../commodity/commodity?id=' + item.id,
    })
  }
})