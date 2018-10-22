// miniprogram/pages/pageIndex/pageIndex.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      {
        imgurl:'https://pic.qyer.com/album/user/966/2/SE9TQhgAZw/index/710x360',
        title:'这里是标题一'
      },
      {
        imgurl: 'https://pic.qyer.com/album/user/966/8/SE9TQhIEYA/index/710x360',
        title: '这里是标题二'
      },
      {
        imgurl: 'https://pic.qyer.com/album/user/974/59/SE5RRxMCZQ/index/710x360',
        title: '这里是标题三'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorColor: 'rgba(255, 255, 255, .5)',
    bool1: false,
    bool2: false,
    hidden: true,
    columnList:[
      {
        imgurl:'https://pic.qyer.com/album/user/2950/66/Q0BQQhwBZE0/index/680x',
        title:''
      },
      {
        imgurl: 'https://pic.qyer.com/album/user/2950/56/Q0BQQh8BZks/index/680x',
        title: ''
      },
      {
        imgurl: 'https://pic.qyer.com/album/user/2736/62/Q05WRBwFYUw/index/680x',
        title: ''
      },
      {
        imgurl: 'https://pic.qyer.com/album/user/2736/62/Q05WRBwFYUA/index/680x',
        title: ''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: 'loading',
    })

    let that = this
    // 轮播图的请求
    wx.request({
      url: app.url + 'indexpage',
      method: 'GET',
      success(res){
        that.setData({
          swiperList: res.data.data
        })
      },
      complete(){
        that.data.bool1 = true
      }
    })

    // 专栏的请求
    wx.request({
      url: app.url + 'indexcolumn',
      method: 'GET',
      success(column) {
        that.setData({
          columnList: column.data.data
        })
      },
      complete() {
        that.data.bool2 = true
      }
    })

    setInterval(()=>{
      if (that.data.bool1 && that.data.bool2){
        wx.hideLoading()
        that.setData({
          hidden: false
        })
        clearInterval()
      }
    }, 500)
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
      url: '../business/business',
    })
  },

  cellTap(event){
    let item = event.currentTarget.dataset.item
    let id = item.id
    let flag = item.flag
    if(flag == 0){
      wx.navigateTo({
        url: '../businessArticle/businessArticle?id=' + id,
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
        url: '../businessList/businessList?id=' + item.id,
      })
    }else if(item.flag == 1){
      wx.navigateTo({
        url: '../estateHome/estateHome?id=' + item.id,
      })
    }
  }
})