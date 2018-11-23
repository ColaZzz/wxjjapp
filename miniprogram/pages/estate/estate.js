// miniprogram/pages/estate/estate.js
import api from '../../common/api.js'
import fmt from '../../common/format.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    currentPage: 1,
    lastPage: 0,
    loadMore: false,
    state: '',
    priceRank: '',
    tip: '',
    items: [{
        type: 'radio',
        label: '出售状态',
        value: '出售状态',
        children: [{
            label: '在售',
            value: '在售',
          },
          {
            label: '售完',
            value: '售完',
          },
          {
            label: '未开盘',
            value: '未开盘',
          },
        ],
        groups: [1],
      },
      {
        type: 'sort',
        label: '售价',
        value: '售价',
        groups: [2],
      },
      {
        type: 'text',
        label: '重置',
        value: '重置',
        groups: [3],
      }
    ],
    imgUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      imgUrl: app.imgUrl
    })
    wx.showLoading({
      title: '加载中..',
    })

    this.getData({
      page: this.data.currentPage
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

    this.getData({
      page: this.data.currentPage,
      state: this.data.state,
      priceRank: this.data.priceRank
    })
  },

  cellTap(event) {
    let item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../estateHome/estateHome?id=' + item.id,
    })
  },

  // 分页拉取数据
  getData(params) {
    this.setData({
      loadMore: true
    })

    api.request('estates', 'GET', params).then(res => {
      let listData = this.data.listData
      for (let i = 0; i < res.data.length; i++) {
        listData.push(res.data[i])
      }
      
      this.setData({
        listData: listData,
        loadMore: false,
        currentPage: res.current_page,
        lastPage: res.last_page
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  },

  // 筛选
  onChange(e) {
    const {
      checkedItems,
      items
    } = e.detail
    let item = checkedItems[0]
    let state = ''
    let priceRank = ''

    if (item.value == "重置") {
      state = ''
      priceRank = ''
    } else if (item.value == "出售状态") {
      let children = item.children
      let row = children.find(arr => arr.checked == true)
      state = row.value
    } else if (item.value == "售价") {
      if (item.sort == 1) {
        priceRank = 'desc'
      } else if (item.sort) {
        priceRank = 'asc'
      }
    }

    this.setData({
      state: state,
      priceRank: priceRank,
      listData: [],
      currentPage: 1
    })

    wx.showLoading({
      title: '加载中..',
    })

    this.getData({
      page: this.data.currentPage,
      state: this.data.state,
      priceRank: this.data.priceRank
    })
  }
})