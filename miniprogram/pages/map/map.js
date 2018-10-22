// miniprogram/pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
        id: 1,
      latitude: 23.771786,
      longitude: 114.717361,
        title: '桃花水母大剧院',
        iconPath: '/public/icon/map2.png',
        width: 30,
        height: 30
      }, {
        id: 2,
        latitude: 23.770814,
        longitude: 114.720472,
        name: '坚基购物中心',
        iconPath: '/public/icon/map2.png',
        width: 30,
        height: 30
      },
      {
        id: 3,
        latitude: 23.770186,
        longitude: 114.715708,
        name: '坚基·美好城',
        iconPath: '/public/icon/map2.png',
        width: 30,
        height: 30
      },
      {
        id: 4,
        latitude: 23.771079,
        longitude: 114.714131,
        name: '坚基·美丽城',
        iconPath: '/public/icon/map2.png',
        width: 30,
        height: 30
      },
    ]
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  mapTap(event) {
    let id = event.markerId
    let arr = this.data.markers

    let row = arr.find(array => (array.id == id))
    console.log(row)
  }
})