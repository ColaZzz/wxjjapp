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
    floorList: [],
    imgUrl: '',
    loadMore: '',
    tip: '',
    position: 'bottomRight',
    theme: 'energized',
    action: '/public/icon/floor-business.png',
    buttons: [],
    current_page: null,
    last_page: null,
    floor_id: null
  },

  onLoad: function(options) {
    let id = options.id
    this.setData({
      imgUrl: app.imgUrl,
      loadMore: true,
      floor_id: id
    })
    // 加载分类数据
    let floor = api.request('mallfloor', 'GET')
    // 加载列表
    let lists = api.request('mallshops', 'GET', {
      floor: id
    })
    let floorList
    Promise.all([floor, lists])
      .then(res => {
        floorList = res[0]
        this.setData({
          floorList: res[0],
          List: res[1].data,
          loadMore: false,
          current_page: res[1].current_page,
          last_page: res[1].last_page
        })
      }).then(() => {
        // 初始化浮动按钮
        let buttons = []
        let floorButton = floorList
        for (let i = 0; i < floorButton.length; i++) {
          let buttonRow = {
            label: '',
            icon: ''
          }
          buttonRow.label = floorButton[i].floor_name
          buttonRow.icon = icon
          buttons.push(buttonRow)
        }
        this.setData({
          buttons: buttons
        })
        // 设置导航栏标题
        let title = floorList.find(row => row.id == id)
        wx.setNavigationBarTitle({
          title: title.floor_name
        })
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
      floor: this.data.floor_id
    })
  },

  onReady: function() {},

  onChange(e) {
    const {
      checkedItems,
      items
    } = e.detail
    let item = checkedItems[0]
    console.log(checkedItems[0])
  },

  onClick(e) {
    let label = e.detail.value.label
    let floor = this.data.floorList
    let row = floor.find(row => {
      return row.floor_name == label
    })
    let id = row.id
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: label
    })
    // 获取列表
    this.setData({
      List: [],
      loadMore: true,
      tip: '',
      current_page: null,
      last_page: null
    })
    api.request('mallshops', 'GET', {
        floor: id
      })
      .then(res => {
        this.setData({
          List: res.data,
          loadMore: false,
          tip: '到底啦~',
          current_page: res.current_page,
          last_page: res.last_page
        })
      })
  },

  /**
   * 店铺
   */
  topTap(e) {
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
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  }
})