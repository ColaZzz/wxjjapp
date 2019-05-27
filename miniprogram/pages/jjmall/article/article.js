// miniprogram/pages/jjmall/article/article.js
import api from '../../../common/api.js'
var WxParse = require('../../../common/wxParse/wxParse.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    header: null,
    html: '',
    scrollItem: null,
    hidden: true,
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var article

    this.setData({
      imgUrl: app.imgUrl
    })
    wx.showLoading({
      title: '加载中..',
    })
    let id = options.id
    // 获取文章信息
    let detail = api.request('article', 'GET', {
      id: id
    })
    // 获取随机文章
    let recommend = api.request('randomarticles', 'GET', {
      rows: 5
    })

    Promise.all([detail, recommend]).then(res => {
      // 时间字符串的转换
      let date = res[0].created_at
      res[0].created_at = date.split(' ')[0]

      //转换
      article = res[0].information

      this.setData({
        header: res[0],
        html: res[0].information,
        scrollItem: res[1],
        hidden: false
      })
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: res[0].title,
      })
      wx.hideLoading()
    }).then(()=>{
      WxParse.wxParse('article', 'html', article, that, 1)
    })
  },

  recommendTap(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: 'article?id=' + id,
    })
  }
})