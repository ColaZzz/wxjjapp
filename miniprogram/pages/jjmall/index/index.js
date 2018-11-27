// miniprogram/pages/jjmall/index/index.js
import api from '../../../common/api.js'
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
    topShopes: [],
    swiperes: [],
    floor: [],
    business: [],
    imgUrl: '',
    position: 'bottomRight',
    theme: 'energized',
    action: '/public/icon/floor-business.png',
    buttons: [],
    spinning: false,
    floorList: [],
    container: false,
    mallTab: true,
    articleTab: false,
    vipTab: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中..',
    })
    this.setData({
      container: true,
      imgUrl: app.imgUrl
    })
    // 主力店铺
    let topshopes = api.request('malltopshopes', 'GET')
    // 轮播图
    let swiperes = api.request('mallswiperes', 'GET')
    // 楼层
    let floor = api.request('mallfloor', 'GET')
    // 业态
    let business = api.request('mallbusinesses', 'GET')

    let floorList
    Promise.all([topshopes, swiperes, floor, business]).then(res => {
      // 为楼层数组添加一个hidden属性
      for (let i = 0; i < res[2].length; i++) {
        res[2][i].hidden = true
      }
      res[2][0].hidden = false
      floorList = res[2]
      this.setData({
        topShopes: res[0],
        swiperes: res[1],
        floor: res[2],
        business: res[3]
      })
    }).then(() => {
      // 默认楼层信息
      api.request('mallshops', 'GET', {
          floor: floorList[0].id
        })
        .then(res => {
          this.setData({
            floorList: res,
            container: false
          })
        })
      // 初始化浮动按钮
      let buttons = []
      let businessButton = this.data.business
      for (let i = 0; i < businessButton.length; i++) {
        let buttonRow = {
          label: '',
          icon: ''
        }
        buttonRow.label = businessButton[i].business_name
        buttonRow.icon = icon
        buttons.push(buttonRow)
      }
      this.setData({
        buttons: buttons
      })

      wx.hideLoading()
    })
  },

  onReady() {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 点击浮动按钮
   */
  onClick(e) {
    let label = e.detail.value.label
    let business = this.data.business
    let row = business.find(row => {
      return row.business_name == label
    })
    let id = row.id
    wx.navigateTo({
      url: '../business/business?id=' + id,
    })
  },

  /**
   * 楼层变换功能
   */
  floorTap(e) {
    this.setData({
      spinning: true
    })
    let floor = this.data.floor
    let item = e.currentTarget.dataset.item
    for (let i = 0; i < floor.length; i++) {
      floor[i].hidden = (floor[i].id == item.id) ? false : true
    }
    this.setData({
      floor: floor
    })
    api.request('mallshops', 'GET', {
        floor: item.id
      })
      .then(res => {
        this.setData({
          floorList: res,
          spinning: false
        })
      })
  },

  tabChange(e) {
    if (e.detail.key == 'mall') {
      this.setData({
        mallTab: true,
        articleTab: false,
        vipTab: false
      })
    } else if (e.detail.key == 'article') {
      this.setData({
        mallTab: false,
        articleTab: true,
        vipTab: false
      })
    } else if (e.detail.key == 'vip') {
      this.setData({
        mallTab: false,
        articleTab: false,
        vipTab: true
      })
    }
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