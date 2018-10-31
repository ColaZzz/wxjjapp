// miniprogram/pages/mall_articleList/mall_articleList.js
import api from '../../common/api.js'
import fmt from '../../common/format.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        type: 'sort',
        label: '时间',
        value: '时间',
        groups: [1],
      },
      {
        type: 'sort',
        label: '热度',
        value: '热度',
        groups: [2],
      },
      {
        type: 'text',
        label: '重置',
        value: '重置',
        groups: [3],
      }
    ],
    articleList: [],
    currentPage: 1,
    lastPage: 1,
    mode: 'aspectFill',
    lazyLoad: 'true',
    tip: '',
    loadMore: false,
    type: null,
    time: '',
    rank: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type
    })
    wx.showLoading({
      title: '加载中',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getArticleList({
      type: this.data.type,
      page: this.data.currentPage,
      time: this.data.time,
      rank: this.data.rank
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

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
      type: this.data.type,
      page: page,
      time: this.data.time,
      rank: this.data.rank
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /**
   * 加载数据
   */
  getArticleList(params) {
    api.request('articles', 'GET', params).then(res => {
      let listData = this.data.articleList
      // 在尾部加入数据
      for (let i = 0; i < res.data.length; i++) {
        res.data[i].created = fmt.getMMdd(res.data[i].created_at) // 时间格式化
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
  cellTap(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../mall_article/mall_article?id=' + id,
    })
  },

  // 筛选
  onChange(e) {
    const {
      checkedItems,
      items
    } = e.detail
    console.log(checkedItems[0])
    let item = checkedItems[0]
    let time = ''
    let rank = ''

    if (item.value == "重置") {
      time = ''
      rank = ''
    } else if (item.value == "时间") {
      if (item.sort == 1) {
        time = 'desc'
      } else if (item.sort) {
        time = 'asc'
      }
    } else if (item.value == "热度") {
      if (item.sort == 1) {
        rank = 'desc'
      } else if (item.sort) {
        rank = 'asc'
      }
    }

    this.setData({
      articleList: [],
      currentPage: 1,
      time: time,
      rank: rank
    })

    wx.showLoading({
      title: '加载中..',
    })

    this.getArticleList({
      page: this.data.currentPage,
      time: time,
      rank: rank,
      type: this.data.type
    })
  }
})