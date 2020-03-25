// pages/addr/addr.js
let apps=getApp();
Page({
  data: {
		 addrlist:[],
		 addrId:'',
		 isDefault: true,
		 isLast: false 
  },
	
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
			
  },
	
	
//获取地址数据
	/* updateAddr: function () {		
    var _self = this;
    apps.util.request({
      'url': 'entry/wxapp/addr',
      header: {
        'content-type': 'application/json' // 默认值
      },
    / data: {
          imgUrls: _self.data.items,
      }, 
      success: function (res) {
				    // console.log(res)
            //console.log('getlist:',res.data.data)
            for (var i = 0; i < res.data.length; i++) {
              var addr = res.data.data[i];
              if (i == res.data.data.length - 1) {
                addr.isLast = true;
              } else {
                addr.isLast = false;
              }
            }
            _self.setData({
              addrlist: res.data.data
            })
          }, 
      })
    },    */
     			

/*  updateAddr: function () {
    var _self = this;
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 300000
    })
		
    wx.request({
      url: 'entry/wxapp/addr',
      //data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log('getlist:',res.data)
        for (var i = 0; i < res.data.length; i++) {
          var addr = res.data[i];
          if (i == res.data.length - 1) {
            addr.isLast = true;
          } else {
            addr.isLast = false;
          }
        }
        _self.setData({
          addrlist: res.data 
        })
      }, 
			
			
      fail: function () {
        // fail
        setTimeout(function () {
          wx.showToast({
            title: "获取地址失败",
            duration: 2000
          })
         
        }, 100)
      },
			
      complete: function () {
        // complete
        wx.hideToast()({
					
				})
			},
			
		})
 }, */
  
  
	
  onReady: function () {
    // 页面渲染完成
  },
	
  onShow: function () {
    // 页面显示
   var userid = wx.getStorageSync('userid');
  // console.log(userid)
   if(userid){
   var _self = this;
   apps.util.request({
     'url': 'entry/wxapp/getaddrlist',
     header: {
       'content-type': 'application/json' // 默认值
     },
   /*  data: {
         imgUrls: _self.data.items,
     }, */
     success: function (res) {
   		    //console.log(res)
           //console.log('getlist:',res.data.data)
           for (var i = 0; i < res.data.length; i++) {					 
             var addr = res.data.data[i];					 
             if (i == res.data.data.length - 1) {
							 
               addr.isLast = true;
             } else {
               addr.isLast = false;
             }
						 
           }
           _self.setData({
             addrlist: res.data.data
           })
         }  			  
     })
		 }else{
			wx.reLaunch({
				url:'mall_guzheng/pages/index/index',
			})
		}
  },
	
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
	
  onPullDownRefresh: function () {
    var _self = this;
    setTimeout(function () {
      _self.updateAddr();
      wx.stopPullDownRefresh();
      console.log("stoppull")
    }, 2000)
  },
	
  beDefault: function (e) {
    //console.log(e.target)
    var id = e.target.dataset.id;
    var flag = e.detail.value
    if (flag) {
      console.log(id)
      wx.showToast({
        title: "Loading",
        icon: "loading",
        duration: 900000
      })
			
			var _self = this;
			apps.util.request({
			  'url': 'entry/wxapp/addr',
			  header: {
			    'content-type': 'application/json' // 默认值
			  },
			 data: {
			
			    },
        success: function (res) {

          var addrs = _self.data.addrlist;
          console.log(addrs)
          for (var i = 0; i < addrs.length; i++) {
            //console.log(addrs[i])
            var addr = addrs[i]
            if (addr.id == id) {
              addr.isDefault = true;
              //console.log(addr)
            } else {
              addr.isDefault = false;
            }
            if (i == addrs.length - 1) {
              addr.isLast = true;
            } else {
              addr.isLast = false;
            }
          }
          console.log("over", addrs)
          _self.setData({
            addrlist: addrs
          })
          setTimeout(function () {
            wx.showToast({
              title: "更改成功",
              duration: 1500
            })
          }, 100)
        },
        fail: function () {
          wx.showModal({
            content: "更改默认地址失败",
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast();
        }
      })
    }
  },
	
	
		
  navigateToAdd: function (event) {
		
	//	console.log(event);
	
		wx.navigateTo({
		url:'/mall_guzheng/pages/edit_add/edit_add?id='+event.currentTarget.dataset.addrid,
		})
		
		
		
  },
	
  navigateToEdit: function (event) {
 var id = event.target.dataset.id;
   // console.log(event) 
    wx.navigateTo({
      url: '/mall_guzheng/pages/edit_add/edit_add?id=' + event.target.dataset.id,
    })
  },
	
	
  delAddr: function (e) {
    var id = e.target.dataset.id;
     
    var _self = this;
    wx.showModal({
      title: "警告",
      content: "是否删除该地址?",
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: "Loading",
            icon: "loading",
            duration: 900000
          })
   
        apps.util.request({
          'url': 'entry/wxapp/addr',
          header: {
            'content-type': 'application/json' // 默认值
          },
            data: {
							
						},
          
            success: function (res) {
							//console.log(res)
              setTimeout(function () {
                wx.showToast({
                  title: "删除成功",
                  duration: 1500
                })
              }, 100)
              var addrs = _self.data.addrlist;
              for (var i = 0; i < addrs.length; i++) {
                var addr = addrs[i]
                if (addr.id == id) {
                  addrs.splice(i, 1);
                }
              }
              //根据索引顺序更改对应的 isLast值,确保页面正确显示
              for (var i = 0; i < addrs.length; i++) {
                if (i == addrs.length - 1) {
                  addrs[i].isLast = true;
                } else {
                  addrs[i].isLast = false;
                }
              }

              console.log("over", addrs)
              _self.setData({
                addrlist: addrs
              })

            },
            fail: function () {
              wx.showModal({
                content: "操作失败,未删除此地址!",
                showCancel: false
              })

            },
            complete: function () {
              wx.hideToast();
            }
          })
        }
      }
    })
  }
})