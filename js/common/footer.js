//有导航栏的划入划出
	aSideNav = $(".sidebar_showTip");
	aSideNav.parent().hover(
		function(e){
			$(this).find("div").css("display","block").stop().animate({left:-123},300,function(){
				$(this).animate({left:-103,opacity:1},500)
			})
		},
		function(){
			$(this).find("div").stop().animate({left:-123,opacity:0},300,function(){
				$(this).css("display","none");
				$(this).animate({left:-103},500,function(){					
				})
			})
		}
	)

//微信栏划入划出
	oSideWechat = $(".side_wechatTip")
	$(".sidebar_wechat").hover(
		function(){
			oSideWechat.show();
		},
		function(){
			oSideWechat.hide();
		}
	)

//返回顶部
	var oBackToTop = $(".sidebar_backTop");
		oBackToTop.isTop = false;
		oBackToTop .click(function(e){
			e.preventDefault();
			if(!oBackToTop.isTop){
					oBackToTop.isTop = true;
				$("body,html").stop().animate({scrollTop:0},1000,function(){
					oBackToTop.isTop = false;
				});
			}
		})

//购物车数量增加
		checkGoodsNum();

//点击购物车 购物车详情出来
	var oSideCont = $(".side_shopCar_cont");	
	$("#side_bar_shopCar").click(function(){
		if(parseInt(oSideCont.css("left")) == 35){
			oSideCont.stop().animate({left:"-300px"},1000)
		}else if(parseInt(oSideCont.css("left")) == -300){
			oSideCont.stop().animate({left:"35px"},1000)
		}
	})
	$(".ssc_title a").click(function(){
		oSideCont.stop().animate({left:"35px"},1000)
	})
//刷新也没刷新sidebar里头购物车信息；
	var oSideList = oSideCont.find(".ssc_box ul");
	var sideGoods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		if($.isEmptyObject(sideGoods)){
			oSideList.parent().html('<div class="side_empty">'
						+'<p>'
							+'<img src="../images/common/empty.png"/>'
					+'</p>'
						+'<p>购物城已空</p>'
						+'<p>请选购</p>'
					+'</div>')
		}else{
			for(var goodName in sideGoods){
				var oLi = '<li>'
							+'<div class="ssc_img">'
								+'<a href=##><img src="'+sideGoods[goodName].src+'"/></a>'
							+'</div>'
							+'<div class="ssc_info">'
								+'<div class="ssc_name">'
									+'<a href="##">'+goodName+'</a>'
								+'</div>'
								+'<div class="ssc_price">'
									+'<i>￥</i><span>'+sideGoods[goodName].price+'</span>*<em>'+sideGoods[goodName].num+'</em>'
								+'</div>'								
							+'</div>'							
						+'</li>'
				oSideList.append(oLi)
			}
		}

	