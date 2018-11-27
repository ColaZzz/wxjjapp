// miniprogram/pages/jjmall/business/business.js
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
    position: 'bottomRight',
    theme: 'energized',
    action: '/public/icon/floor-business.png',
    buttons: [],
  },

  onLoad: function(options) {
    let id = options.id
    this.setData({
      imgUrl: app.imgUrl,
      loadMore: true
    })
    // 加载分类数据
    let business = api.request('mallbusinesses', 'GET')
    // 加载列表
    let lists = api.request('mallshops', 'GET', {
      business: id
    })
    let businessList
    Promise.all([business, lists])
      .then(res => {
        businessList = res[0]
        this.setData({
          businessList: res[0],
          List: res[1],
          loadMore: false,
          tip: '到底啦~'
        })
      }).then(() => {
        // 初始化浮动按钮
        let buttons = []
        let businessButton = businessList
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
        // 设置导航栏标题
        let title = businessList.find(row => row.id == id)
        wx.setNavigationBarTitle({
          title: title.business_name
        })
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
    let business = this.data.businessList
    let row = business.find(row => {
      return row.business_name == label
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
        business: id
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