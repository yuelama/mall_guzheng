//signup.js
//获取应用实例
// var app = getApp()
// Page({
//   data: {
//     signupimg: '../../image/signup.png',
//     imgsrc: 'https://ss0.bdstatic.com/9bA1vGfa2gU2pMbfm9GUKT-w/timg?searchbox_feed&quality=120&wh_rate=0&size=f648_364&ref=http%3A%2F%2Fwww.baidu.com&sec=0&di=1619440b1bc5580ece1e18c556a408d7&src=http%3A%2F%2Ft12.baidu.com%2Fit%2Fu%3D2318927072%2C2551034291%26fm%3D175%26s%3DF9E09B544C2154095A6098DF030090F1%26w%3D660%26h%3D370%26img.JPEG',
//     iconsrc: '../../image/usercount.png',
//   },
// 
// })

let apps=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    a1src: '../../image/a1.png',
    a2src: '../../image/a2.png',
    a3src: '../../image/a3.png',
    a4src: '../../image/a4.png',
    signupimg: '../../image/signup.png',
    imgcourses:[],     //课程数据
		courseid:'', 
		orderid:'',
		iconsrc: '../../image/usercount.png',
    jtsrc: '../../image/icon-jt.png',
		
		imgUrls:[],   //图片轮播数据
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000 
    
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
		 var _self=this;
      apps.util.request({
      'url': 'entry/wxapp/course',
      header: {
        'content-type': 'application/json'
      },

      success(res) {
				//console.log(res)
				var imgcourse = [];
				 for (var i = 0; i < 4; i++) {					
				   imgcourse[i] = res.data.data.courses[i]
					
				 }
				
       _self.setData({
					 imgcourses: imgcourse,
					// courseid:res.data.data.courses[0].id
					 
					})
			// console.log(res);
				_self.getbannerdata();
				
      }

    })
  },
	
	
	Toorder: function (event){	
			//console.log(event)
	  wx.navigateTo({
	  	url:'/mall_guzheng/pages/order/order?id='+event.currentTarget.dataset.orderid,
	  }) 
		
	},	
	
	
	//获取轮播图片数据
	getbannerdata: function () {
    var _self = this;
    apps.util.request({
      'url': 'entry/wxapp/banner',
      header: {
        'content-type': 'application/json' // 默认值
      },
    /*  data: {
          imgUrls: _self.data.items,
      }, */
      success(res) {
     //console.log(res)

      var imgurl = [];
        for (var i = 0; i < 3; i++) {

          imgurl[i] = res.data.data.items[i]
        }
        _self.setData({
          imgUrls: imgurl
         //items: res.data.data.items				
        })
        
      }
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