// miniprogram/pages/jjmall/index/index.js
import api from '../../../common/api.js'
import fmt from '../../../common/format.js'
const app = getApp()
const icon = '/public/icon/mall-icon.png'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'rgba(255, 255, 255, .5)',
    swiperes: [],
    imgUrl: '',
    business: [],
    all_box: true,
    popular: [],
    article: [],
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: 'JJAMLL',
    })
    wx.showLoading({
      title: '加载中..',
    })
    this.setData({
      imgUrl: app.imgUrl
    })
    // 轮播图
    let swiperes = api.request('mallswiperes', 'GET')
    // 业态
    let business = api.request('mallbusinesses', 'GET')
    // 人气推荐
    let popular = api.request('malltopshopes', 'GET', {
      paginate: 6,
      rank: 'desc'
    })
    // 最新活动
    let article = api.request('articles', 'GET', {
      time: 'desc',
      paginate: 3
    })
    Promise.all([swiperes, business, popular, article]).then(res => {
      this.setData({
        swiperes: res[0],
        business: res[1],
        popular: res[2].data,
        article: res[3].data
      })
    }).then(() => {
      wx.hideLoading()
      this.setData({
        all_box: false
      })
    })
  },

  // 点击业态
  businessClick(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../shopList/shopList?id=' + item.id + '&business_name=' + item.business_name,
    })
  },

  // 店铺
  shopTap(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../shop/shop?id=' + item.id + '&title=' + item.title,
    })
  },

  // 文章
  articleTap(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../article/article?id=' + item.id,
    })
  },

  // 搜索按钮
  onSearch(e) {
    let word = e.detail
    wx.navigateTo({
      url: '../shopList/shopList?word=' + word,
    })
  },

  // 人气推荐
  popularTap(){
    wx.navigateTo({
      url: '../shopList/shopList?popular=人气推荐',
    })
  },
  
  // 文章列表
  articleListTap(){
    wx.navigateTo({
      url: '../articleList/articleList',
    })
  }
})