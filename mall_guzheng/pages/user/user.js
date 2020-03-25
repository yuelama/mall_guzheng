// mall_guzheng/pages/user/user.js
let apps=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
	userInfo: {},
	infodata:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	 
	
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
	   var _self = this
	 apps.util.request({
	   'url': 'entry/wxapp/userinfo',
	   header: {
	     'content-type': 'application/json' // 默认值
	   },
	 /*  data: {
	       imgUrls: _self.data.items,
	   }, */
	   success(res) {
		   
		    var infodata = [];
		   				 for (var i = 0; i < 1; i++) {					
		   				   infodata[i] = res.data.data[i]
		   					
		   				 } 
	  //console.log(res)
	    _self.setData({
	      userInfo: infodata
		  
	    })
	  	   
	   }
	 })
			
  },
  
  onPullDownRefresh: function () {
   var _self = this
    setTimeout(function () {
      wx.stopPullDownRefresh();
      console.log("stoppull")
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        console.log("获取用户信息成功!")
        that.setData({
          userInfo: userInfo
        })
      })
    }, 2000)
  },
  
  navigateToAddr: function () {
    wx.navigateTo({
      url: '../addr/addr'
    })
  },
	
  navigateToOrder: function () {
    
    wx.navigateTo({
      url: './order/order?typeId=0'
    })
  },
  navigateToOrder_pay: function () {
   
    wx.navigateTo({
      url: './order/order?typeId=1'
    })
  },
  navigateToOrder_get: function () {
    
    wx.navigateTo({
      url: './order/order?typeId=2'
    })
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
    
  }
})
