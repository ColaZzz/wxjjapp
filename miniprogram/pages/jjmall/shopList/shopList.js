// miniprogram/pages/jjmall/floor/floor.js
import api from '../../../common/api.js'
const app = getApp()
const icon = '/public/icon/mall-icon.png'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    List: [],
    businessList: [],
    imgUrl: '',
    loadMore: '',
    tip: '',
    current_page: null,
    last_page: null,
    business_id: null,
    word: '',
    value: ''
  },

  onLoad: function(options) {
    let barTitle
    let {
      id,
      business_name,
      word,
      popular
    } = options
    // 修改头部导航栏的文本
    if (business_name) {
      barTitle = business_name
      word = ''
      popular = ''
    } else if (word) {
      barTitle = 'JJMALL'
      id = ''
      business_name = ''
      popular = ''
    } else if (popular) {
      barTitle = popular
      word = ''
      id = ''
      business_name = ''
    }
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: barTitle
    })
    this.setData({
      imgUrl: app.imgUrl,
      loadMore: true,
      business_id: id,
      word: word,
      value: word
    })
    this.getData({
      business: id,
      word: word
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.current_page == this.data.last_page) {
      this.setData({
        tip: '到底啦'
      })
      return
    }
    let page = this.data.current_page + 1
    this.setData({
      loadMore: true,
      current_page: page
    })

    this.getData({
      page: this.data.current_page,
      business: this.data.business_id,
      word: this.data.word
    })
  },

  onChange(e) {
    const {
      checkedItems,
      items
    } = e.detail
    let item = checkedItems[0]
  },

  /**
   * 店铺
   */
  shopTap(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../shop/shop?id=' + item.id,
    })
  },

  // 分页拉取数据
  getData(params) {
    this.setData({
      loadMore: true
    })

    api.request('mallshops', 'GET', params).then(res => {
      let listData = this.data.List
      for (let i = 0; i < res.data.length; i++) {
        listData.push(res.data[i])
      }

      this.setData({
        List: listData,
        loadMore: false,
        current_page: res.current_page,
        last_page: res.last_page
      })
      if (res.last_page == 1) {
        this.setData({
          tip: '到底啦'
        })
      }
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },

  // 搜索功能
  onSearch(e) {
    this.setData({
      List: [],
      word: e.detail
    })
    this.getData({
      business: this.data.business_id,
      word: e.detail
    })
  }
})