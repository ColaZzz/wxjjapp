// miniprogram/pages/block_role/block_role.js
import api from '../../common/api.js'
import Dialog from '../../dist/vant-weapp/dialog/dialog';
Page({
  data: {
    currentRole: '',
    roles: null,
    roleApplies: null
  },

  onLoad(options) {
    let rolestr = wx.getStorageSync('role')
    let role = JSON.parse(rolestr)
    this.setData({
      currentRole: role.linkage_name
    })

    api.request('estateroles', 'GET')
      .then(res => {
        this.setData({
          roles: res
        })
      })

      this.getRoleApplies()
  },

  checkDialog(e) {
    let item = e.currentTarget.dataset.item
    Dialog.confirm({
      title: '确认申请吗',
      message: ''
    }).then(() => {
      // on confirm
      api.request('insapplyrole', 'POST',{
        token: wx.getStorageSync('token'),
        roleid: item.linkage_role
      })
      .then(res=>{
        this.getRoleApplies()
      })
    }).catch(() => {
      // on cancel
    });
  },

  getRoleApplies(){
    api.request('userroleapplies', 'POST',{
      token: wx.getStorageSync('token')
    })
    .then(res=>{
      for(let i=0; i<res.length; i++){
        if(res[i].state == 0){
          res[i].stateText = '未处理'
        } else if (res[i].state == 1) {
          res[i].stateText = '同意'
        } else if (res[i].state == 2) {
          res[i].stateText = '拒绝'
        }
      }
      this.setData({
        roleApplies: res
      })
    })
  }
})

