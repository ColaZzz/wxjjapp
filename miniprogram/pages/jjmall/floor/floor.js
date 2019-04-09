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
  },

  onLoad: function (options) {
    let id = options.id
    this.setData({
      imgUrl: app.imgUrl,
      loadMore: true
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
          List: res[1],
          loadMore: false,
          tip: '到底啦~'
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

  onReady: function () { },

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
      tip: ''
    })
    api.request('mallshops', 'GET', {
      floor: id
    })
      .then(res => {
        this.setData({
          List: res,
          loadMore: false,
          tip: '到底啦~'
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
  }
})