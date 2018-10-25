// miniprogram/pages/estate/estate.js
import api from '../../common/api.js'
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
    tip: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '加载中',
    })
    
    this.getData({
      page: this.data.currentPage
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

    this.getData({
      page: this.data.currentPage
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  cellTap(event) {
    let item = event.currentTarget.dataset.item;
    wx.navigateTo({
      url: '../estateHome/estateHome?id=' + item.id,
    })
  },

  // 分页拉取数据
  getData(params){
    this.setData({
      loadMore: true
    })

    api.request('estates', 'GET', params).then(res => {
      let listData = this.data.listData
      for(let i = 0; i<res.data.length;i++){
        listData.push(res.data[i])
      }
      console.log(listData)
      this.setData({
        listData: listData,
        loadMore: false,
        lastPage: res.last_page
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  }
})