// miniprogram/pages/pageIndex/pageIndex.js
import api from '../../common/api.js'
import fmt from '../../common/format.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'rgba(255, 255, 255, .5)',
    bool1: false,
    bool2: false,
    hidden: true,
    columnList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this

    wx.showLoading({
      title: '加载中..',
    })

    // 轮播图的请求
    let swiper = api.request('indexpage','GET')

    // 专栏的请求
    let column = api.request('indexcolumn', 'GET')

    Promise.all([swiper, column]).then(res=>{
      fmt.imgPrefix(res[0])
      fmt.imgPrefix(res[1])
      that.setData({
        swiperList: res[0],
        columnList: res[1],
        hidden: false
      })
      wx.hideLoading()
    }).catch(err=>{
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  estateTap(){
    wx.navigateTo({
      url: '../estate/estate',
    })
  },

  businessTap(){
    wx.navigateTo({
      url: '../mall/mall',
    })
  },

  cellTap(event){
    let item = event.currentTarget.dataset.item
    let id = item.id
    let flag = item.flag
    if(flag == 0){
      wx.navigateTo({
        url: '../mall_article/mall_article?id=' + id,
      })
    }else if(flag == 1){
      wx.navigateTo({
        url: '../housePage/housePage?id=' + id,
      })
    }
  },

  columnTap(event){
    let item = event.currentTarget.dataset.item
    if(item.flag == 0){
      wx.navigateTo({
        url: '../mall_article/mall_article?id=' + item.id,
      })
    }else if(item.flag == 1){
      wx.navigateTo({
        url: '../estateHome/estateHome?id=' + item.id,
      })
    }
  }
})