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
    businessList: [],
    imgUrl: '',
    loadMore: '',
    tip: '',
    current_page: null,
    last_page: null,
    business_id: null
  },

  onLoad: function(options) {
    let {
      id,
      business_name
    } = options
    this.setData({
      imgUrl: app.imgUrl,
      loadMore: true,
      business_id: id
    })
    // 加载列表
    let lists = api.request('mallshops', 'GET', {
      business: id
    })
    Promise.all([lists])
      .then(res => {
        this.setData({
          List: res[0].data,
          loadMore: false,
          current_page: res[0].current_page,
          last_page: res[0].last_page
        })
      }).then(() => {
        // 设置导航栏标题
        wx.setNavigationBarTitle({
          title: business_name
        })
      })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.current_page == this.data.last_page) {
      this.setData({
        tip: '到底啦'
      })
      return
    }
    let page = this.data.current_page + 1
    this.setData({
      loadMore: true,
      current_page: page
    })

    this.getData({
      page: this.data.current_page,
      business: this.data.business_id
    })
  },

  onChange(e) {
    const {
      checkedItems,
      items
    } = e.detail
    let item = checkedItems[0]
  },

  /**
   * 店铺
   */
  shopTap(e) {
    let item = e.currentTarget.dataset.item
    wx.navigateTo({
      url: '../shop/shop?id=' + item.id,
    })
  },

  // 分页拉取数据
  getData(params) {
    this.setData({
      loadMore: true
    })

    api.request('mallshops', 'GET', params).then(res => {
      let listData = this.data.List
      for (let i = 0; i < res.data.length; i++) {
        listData.push(res.data[i])
      }

      this.setData({
        List: listData,
        loadMore: false,
        current_page: res.current_page,
        last_page: res.last_page
      })
      wx.hideLoading()
    }).catch(err => {
      wx.hideLoading()
    })
  }
})