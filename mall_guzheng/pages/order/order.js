// pages/user/order/detail/detail.js
let apps=getApp();
Page({
  data: {
		maskState: 0, //优惠券面板显示状态
		desc: '', //备注
		payType: 1, //1微信 2支付宝
		couponList:[],
		addressData:'',  
		/* 课程订单数据 */
		course_name:'',
		course_price:''
		
		
    
  },
	
  onLoad: function (options) {
		console.log(options);
	/* 	a = e;
		console.log("11111");
		app.globalData.iconCar.push(e)
		this.setData({
		  course_name:e.course_name,
		  course_price:e.course_price,
		
		});
		app.course_price = e.course_price
	
		app.course_name = e.course_name */
		
		
		
		
   /* let orderId = options.id;
    //console.log(orderId)
    var _self=this;  	 	 
		apps.util.request({
			  'url': 'entry/wxapp/order',
	 header: {
			    'content-type': 'application/json'
			  },		
					data:{
						id:orderId
					      } ,					 
           success(res) {
				//	console.log(res)
					 _self.setData({
								orderdata:res.data.data.orders
								
						   })	 	 
						        
     
          }								        
        }) */
				//payOrder();
  },
	
	
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
	
  /* cancelOrder: function (e) {
    var that = this;
    wx.showModal({
      title: "警告",
      content: "是否确认取消订单?",
      success: function (res) {
        if (res.confirm) {

          var id = e.target.dataset.id;
          console.log("cancelOrder--> id:", id)
          wx.showToast({
            title: "Loading...",
            icon: "loading",
            duration: 300000
          })
					
          wx.request({
            url: 'http://localhost:8080/Wxmini/order_cancel.do?id=' + id,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              console.log(res.data)
              if (res.data.flag) {
                setTimeout(function () {
                  wx.showToast({
                    title: "成功"
                  })
                  wx.navigateBack({
                    delta: 1
                  })
                }, 100)
              }
            },
            fail: function () {
              setTimeout(function () {
                wx.showToast({
                  title: "操作失败"
                })
              }, 100)
            },
            complete: function () {
              wx.hideToast()
            }
          })
        }
      }
    })
  }, */
	
/*  delOrder: function (e) {
    var that = this;
    wx.showModal({
      title: "警告",
      content: "是否确认取消订单?",
      success: function (res) {
        if (res.confirm) {
          var id = e.target.dataset.id;
          console.log("delOrder--> id:", id)
          wx.showToast({
            title: "Loading...",
            icon: "loading",
            duration: 300000
          })				
          wx.request({
            url: 'http://localhost:8080/Wxmini/order_del.do?id=' + id,
            // data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              console.log(res.data)
              if (res.data.flag) {
                setTimeout(function () {
                  wx.showToast({
                    title: "删除成功"
                  })
                  wx.navigateBack({
                    delta: 1
                  })
                }, 100)
              }
            },
            fail: function () {
              setTimeout(function () {
                wx.showToast({
                  title: "操作失败"
                })
              }, 100)
            },
            complete: function () {
              wx.hideToast()
            }
          })
        }
      }
    })
  }, */
	
    //生成随机订单号
 /*  public  function  getorernums(){
        $danhao = date('Ymd').substr(implode(Null,array_map('ord',
                str_split(substr(uniqid(),7,13),1))),0,8);
        return $danhao.mt_rand(1000,999);
    }, */
		
/* 	 payOrder: function ( ){
		 let payid = event.currentTarget.dataset.id;
		console.log(event.currentTarget.dataset.orderinfoid)	
		 console.log(payid)
			var orderid = event.currentTarget.dataset.id;
		let userid = wx.getStorageSync('userid');
		   console.log(event)
				apps.util.request({
							  'url': 'entry/wxapp/Createorder',
				header: {
							    'content-type': 'application/json'
							  },		
									data:{
										// id:payid
										 //userid:userid
									      } ,					 
				        success(res) {
									//console.log(res)
									//if(res.data.data.status==0)																
							   //	wx.setStorageSync('userid',res.data.data.userid)
									 wx.navigateTo({
										//url:'/mall_guzheng/pages/pay/pay?id='+,
										//url:'/mall_guzheng/pages/pay/pay?id='+event.currentTarget.dataset.payid,
										url:'/mall_guzheng/pages/pay/pay',
									})
																																			
				       }	
						})										 
																 
			
			
	},		 
	 */
	payOrder: function (event){
		//console.log(option)
	 	wx.navigateTo({	
     	url:'/mall_guzheng/pages/pay/pay?id='+event.currentTarget.dataset.id,
		}) 
		
	},
	
	
	payreturn: function (event){
	
	  wx.navigateTo({
	
		url:'/mall_guzheng/pages/pay/pay?id='+event.currentTarget.dataset.id,
	  })
		
	},
	
	
 	
 /* confirmOrder: function (e) {
    var id = e.target.dataset.id;
    console.log("confirmOrder--> id:", id)
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 300000
    })
    var that = this;
    wx.request({
      url: 'http://localhost:8080/Wxmini/order_confirm.do?id=' + id,
      method: 'GET', 
      success: function (res) {
        console.log(res.data)
        if (res.data.flag) {
          setTimeout(function () {
            wx.showToast({
              title: "成功"
            })
            wx.navigateBack({
              delta: 1
            })
          }, 100)
        }
      },
      fail: function () {
        setTimeout(function () {
          wx.showToast({
            title: "操作失败"
          })
        }, 100)
      },
      complete: function () {
        wx.hideToast()
      }
    })
  }, */
	
	
 /* navigateToShop: function (e) {
    var id = e.target.dataset.id;
    console.log("navigateToShop--> id:", id)
    wx.navigateTo({
      url: '../../../index/good/good?typeId=' + id
    })
  },
	 */
	
 /* navigateToGoodView: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    console.log("navigateToGoodView--> id:", id)
    wx.navigateTo({
      url: '../../../index/good/detail/detail?id=' + id
    })
  } */
	
 })	