// miniprogram/pages/jjmall/articleList/articleList.js
import api from '../../../common/api.js'
import fmt from '../../../common/format.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    currentPage: 1,
    lastPage: 1,
    mode: 'aspectFill',
    lazyLoad: 'true',
    tip: '',
    loadMore: false,
    time: '',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgUrl: app.imgUrl
    })
    // 判断是否为热门资讯和设置标题
    let time = 'desc'
    let title = '最新活动'
    // 设置标题
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
      time: time
    })
    wx.showLoading({
      title: '加载中'
    })
    this.getArticleList({
      time
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.currentPage == this.data.lastPage) {
      this.setData({
        tip: '到底啦'
      })
      return
    }
    let page = this.data.currentPage + 1
    this.setData({
      loadMore: true,
      currentPage: page
    })

    this.getArticleList({
      page: page,
      time: this.data.time
    })
  },

  /**
   * 加载数据
   */
  getArticleList(params) {
    this.setData({
      loadMore: true
    })
    api.request('articles', 'GET', params).then(res => {
      let listData = this.data.articleList
      // 在尾部加入数据
      for (let i = 0; i < res.data.length; i++) {
        listData.push(res.data[i])
      }
      this.setData({
        articleList: listData,
        currentPage: res.current_page,
        lastPage: res.last_page,
        loadMore: false
      })
      wx.hideLoading()
    })
  },

  /**
   * 进入文章
   */
  articleTap(e){
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../article/article?id=' + id,
    })
  }
})