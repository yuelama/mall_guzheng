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
		iconsrc: '../../image/usercount.png',
    jtsrc: '../../image/icon-jt.png',
		
		imgUrls:[],   //图片轮播数据
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000 ,
		// 教师列表数据
		teadatas:[],
		teacherdata:[],
		teachid:''
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
     		_self.getTeacherinfo();
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
		/* var _self=this;
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
				_self.getTeacherinfo();
      }

    }) */
  },
	
	//跳转到详情页面
	Tocoursedetail: function (event){		
	  wx.navigateTo({
	  	url:'/mall_guzheng/pages/coursedetail/coursedetail?id='+event.currentTarget.dataset.courseid,
	  })
		
	},	
	
	
/* 		Toorder: function (event){	
			//console.log(event)
	  wx.navigateTo({
	  	url:'/mall_guzheng/pages/order/order?id='+event.currentTarget.dataset.orderid,
	  }) 
		
	},	 */
	
	
	
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
	

	
	// 获取教师信息数据
		getTeacherinfo: function () {
		 var _self=this;
		 apps.util.request({
		 'url': 'entry/wxapp/teachers',
		 header: {
		   'content-type': 'application/json'
		 },
		    
		 success(res) {
		    		   var teadatas = [];
		    		   				 for (var i = 0; i < 4; i++) {					
		    		   				   teadatas[i] = res.data.data.teadata[i]
		    		   					
		    		   				 } 
		    		   		//console.log(res)		
		    		  _self.setData({
		    		   					 teacherdata:teadatas   		   					 
		    		   					})			
		    		 }  		
		 })  
	},
	
	Totechlist: function (event){	
			//	console.log(event)
		  wx.navigateTo({
		  	url:'/mall_guzheng/pages/teacherlist/teacherlist?id='+event.currentTarget.dataset.teachid,
		  }) 
			
		},	
	
	//获取课程数据
	/* getcoursedata: function () {
	  var _self = this;
	  apps.util.request({
	    'url': 'entry/wxapp/course',
	    header: {
	      'content-type': 'application/json' // 默认值
	    },
	   data: {
	        imgUrls: _self.data.items,
	    }, 
	    success(res) {
	    //console.log(res)
	
	     var imgcourse = [];
	      for (var i = 0; i < 4; i++) {
	
	        imgcourse[i] = res.data.data.courses[i]
	      }
	      _self.setData({
	        imgcourses: imgcourse,
	       //items: res.data.data.items
				 //courseid:res.data.data.items[0].id
					 					
	      }) 
	      
	    }
	  })
	
	}, */
	


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