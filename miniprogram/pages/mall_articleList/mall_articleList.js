// miniprogram/pages/mall_articleList/mall_articleList.js
import api from '../../common/api.js'
import fmt from '../../common/format.js'
const app = getApp()
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
    rank: '',
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgUrl: app.imgUrl
    })
    let rank = ''
    let time = ''
    let title = 'JJMall'
    let type = options.type
    // 判断是否为热门资讯和设置标题
    if (!type){
      rank = 'desc'
      title = '热门资讯'
    }else if(type == '1'){
      time = 'desc'
      title = '最新活动'
    }
    // 设置标题
    wx.setNavigationBarTitle({
      title: title,
    })
    this.setData({
      time: time,
      rank: rank
    })
    wx.showLoading({
      title: '加载中'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getArticleList({
      page: this.data.currentPage,
      time: this.data.time,
      rank: this.data.rank
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
      time: this.data.time,
      rank: this.data.rank
    })
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
      rank: rank
    })
  }
})