// miniprogram/pages/houses/houses.js
import api from '../../common/api.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loadMore: false,
    tip: '',
    currentPage: 1,
    lastPage: 0,
    id: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.showLoading({
      title: '加载中..',
    })

    this.getData({
      id: this.data.id,
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
      currentPage: page,
      loadMore: true
    })

    this.getData({
      id: this.data.id,
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
      url: '../housePage/housePage?id=' + item.id,
    })
  },

  // 分页获取户型
  getData(params) {
    api.request('estatearticles', 'GET', params).then(res => {
      let list = this.data.list
      let tip = ''
      for (let i = 0; i < res.data.length; i++) {
        list.push(res.data[i])
      }
    
      if (res.last_page == 1){
        tip = '到底啦'
      }

      this.setData({
        list: list,
        lastPage: res.last_page,
        loadMore: false,
        tip: tip
      })

      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  }
})