// miniprogram/pages/estateHome/estateHome.js
import api from '../../common/api.js'
import fmt from '../../common/format.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    scrollItem: null,
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    let params = {
      id: id
    }

    wx.showLoading({
      title: '加载中..',
    })

    // 获取页面信息
    let estate = api.request('estate', 'GET', params)
    // 获取随机楼盘
    let recommend = api.request('randomestates', 'GET', {
      rows: 5
    })

    Promise.all([estate, recommend]).then(res => {
      fmt.imgPrefix(res[0].estate_images)
      console.log(res[0])
      fmt.imgPrefix(res[1])
      console.log(res[1])
      this.setData({
        data: res[0],
        scrollItem: res[1],
        hidden: false
      })
      wx.hideLoading()
    })
  },

  // 拨打电话
  callPhoneTap() {
    let number = this.data.data.telephone
    wx.makePhoneCall({
      phoneNumber: number,
    })
  },

  // 查看更多户型
  allHouse() {
    let that = this

    wx.navigateTo({
      url: '../houses/houses?id=' + that.data.data.id,
    })
  },

  // 查看更多
  moreTap() {
    let more = Object.assign({}, this.data.data)
    delete more['estate_images']
    delete more['icon_url']
    delete more['img_url']

    wx.navigateTo({
      url: '../estateMoreInfo/estateMoreInfo?data=' + JSON.stringify(more),
    })
  }
})