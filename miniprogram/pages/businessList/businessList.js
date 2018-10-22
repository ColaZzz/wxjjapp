// miniprogram/pages/businessList/businessList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    businessList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading',
    })

    let id = options.id
    let that = this
    wx.request({
      url: app.url + 'businessarticles',
      method: 'Get',
      data: {
        id: id
      },
      success(res){
        that.setData({
          businessList: res.data.data
        })
      },
      complete(){
        wx.hideLoading()
      }
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

  cellTap(event){
    let id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../businessArticle/businessArticle?id=' + id,
    })
  }
})