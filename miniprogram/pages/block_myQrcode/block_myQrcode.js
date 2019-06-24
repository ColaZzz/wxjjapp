// miniprogram/pages/block_myQrcode/block_myQrcode.js
import api from '../../common/api.js'
import Toast from '../../dist/vant-weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        type: 'radio',
        label: '是否扫描',
        value: 'state',
        children: [{
            label: '未扫描',
            value: '0',
          },
          {
            label: '已扫描',
            value: '1',
          },
          {
            label: '全部',
            value: '2',
          },
        ],
        groups: ['001'],
      },
      {
        type: 'text',
        label: '重置',
        value: '重置',
        groups: ['002'],
      }
    ],
    mode: 'aspectFill',
    lazyLoad: 'true',
    linkageList: [],
    tip: '到底啦',
    loadMore: false,
    currentPage: 1,
    lastPage: 1,
    state: 2,
    show: false,
    userNumber: '',
    lid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.loadLinkages(this.data.state, this.data.currentPage)
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

    this.loadLinkages(this.data.state, page)
  },

  /**
   * 初始化联动记录
   */
  loadLinkages(state, page, word) {
    wx.showLoading({
      title: '加载中..',
      mask: true
    })
    let token = wx.getStorageSync('token')
    api.oldRequest('personlinkages', 'POST', {
      token,
      state,
      word,
      page
    }).then(res => {
      if (res.msg == '获取记录') {
        let array = this.stateForText(res.data.data)
        let linkageList = this.data.linkageList
        // 从队尾插入
        for (let i = 0; i < array.length; i++) {
          linkageList.push(array[i])
        }
        // 写入数据
        this.setData({
          linkageList: linkageList,
          currentPage: res.data.current_page,
          lastPage: res.data.last_page,
          loadMore: false
        })
      } else if (res.msg == '用户未登录') {
        // 先登录
        api.login().then(log => {
          // 再递归
          this.loadLinkages()
        })
      }
      wx.hideLoading()
    })
  },

  /**
   * 点击进入二维码大图
   */
  qrcodeTap(e) {
    let item = e.currentTarget.dataset.item
    // if (item.state) return
    wx.navigateTo({
      url: '../block_qrcode/block_qrcode?qrcode=' + item.qrcode + '&datetime=' + item.datetime,
    })
  },

  stateForText(array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].state) {
        array[i].stateText = '已扫描'
      } else {
        array[i].stateText = ''
      }
    }
    return array
  },

  onChange(e) {
    let {
      checkedItems,
      items
    } = e.detail
    let item = checkedItems[0]
    let state
    if (item.value == 'state') {
      for (let i = 0; i < item.children.length; i++) {
        if (item.children[i].checked) {
          state = item.children[i].value
        }
      }
    } else if (item.value == '重置') {
      state = 2
    }

    this.setData({
      state: state,
      linkageList: []
    })

    this.loadLinkages(state, this.data.currentPage)
  },

  editNumber(e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      show: true,
      userNumber: item.user_number,
      lid: item.id
    })
  },

  onClose(event) {
    if (event.detail === 'confirm') {
      this.editNumberInterface(this.data.lid, this.data.userNumber)
      // 异步关闭弹窗
      setTimeout(() => {
        this.setData({
          show: false
        });
      }, 1000);
    } else {
      this.setData({
        show: false
      });
    }
  },

  editNumberInterface(lid, usernumber) {
    let token = wx.getStorageSync('token')
    api.oldRequest('editlinkageusernumber', 'POST', {
      lid,
      usernumber,
      token
    }).then(res => {
      if(res.code == 1){
        Toast('已修改，请重新刷新')
      }else{
        Toast('出现了一些问题,code:' + res.code)
      }
    })
  },

  numberChange(e){
    this.setData({
      userNumber: e.detail
    })
  },

  // 搜索按钮
  onSearch(e) {
    this.setData({
      linkageList: []
    })
    let word = e.detail
    this.loadLinkages(2, this.data.currentPage, word)
  }
})