//所有图片 鼠标移入 颜色变淡
	$(".main").on("mouseover","img",function(){
		$(this).css("opacity",0.8)
	})
	$(".main").on("mouseout","img",function(){
		$(this).css("opacity",1)
	})


//	顶部图片运动
	var oTopImg = $("#top_img");
	oTopImg.stop().delay(5000).animate({height:100},1000,function(){
		$("#top_img span").css("display","block");
		$(".top_img_big").fadeOut(500);
	})
	$("#top_img span").click(function(){
		if(parseInt(oTopImg.css("height")) == 300){
			$(this).css("background","url(../images/index/fold.jpg) no-repeat")
			oTopImg.stop().animate({height:100},1000,function(){
				$(".top_img_big").fadeOut(500);
			})
		}else if(parseInt(oTopImg.css("height"))==100){
			$(this).css("background","url(../images/index/unfold.jpg) no-repeat")
			$(".top_img_big").fadeIn(200);
			oTopImg.stop().animate({height:300},1000)
		}
	})

	//导航条首页变色
	var oNavFirst = $(".nav_l li:first").find("a");
	oNavFirst.addClass("active");
	oNavFirst.parent().unbind("mouseenter").unbind("mouseleave");
	

	//banner轮播
	
		bannerPlay($(".banner li"),$("#banner p a"))	
		function bannerPlay(img,nav){
			var aImg = img ;
			var aNav = nav;
			aImg.timer = null;
			 aImg.iNow = 0;
			autoPlay()
			aNav.click(function(){
				aImg.iNow = $(this).index();
				tab();
			})
			aImg.parent().parent().hover(
				function(){
					clearInterval(aImg.timer);
				},
				function(){
					autoPlay();
				}
			)
			function autoPlay(){		
				clearInterval(aImg.timer)
				aImg.timer = setInterval(function(){
					if(aImg.iNow == 4){
						aImg.iNow = -1;
					}
					aImg.iNow++;
					tab()
				},3000)
			}
			function tab(){
				aNav.eq(aImg.iNow).addClass("active").siblings().removeClass("active");
				aImg.eq(aImg.iNow).stop().fadeIn(500).siblings().fadeOut(500);
			}
		}

		//楼梯
		var aSideNav = $(".side_nav ul li");
		var aSideMain = $(".sideNavRight");
		aSideNav.each(function(){
			if(!$(this).hasClass("snav_index")){
				$(this).hover(
					function(){
						$(this).css("background","rgb(0, 200, 255)")
					},
					function(){
						$(this).css("background","rgb(255,255,255)")
					}
				)
			}			
		})
		//点击楼层移动
		aSideNav.isOver = true;
		aSideNav.click(function(){
			if(aSideNav.isOver){				
				aSideNav.isOver = false;
				$(this).addClass("active").siblings().removeClass("active");
				var iTop = aSideMain.eq($(this).index()).offset().top;
				$("html,body").stop().animate({scrollTop:iTop},1000,function(){
					aSideNav.isOver = true;
				})
			}
		})
					


//今日头条加载数据
	var aTodayHead = $(".today_headlines dl");
	$.ajax({
		type:"get",
		url:"../data/index/todayHeadLines.json",
		async:true,
		success:function(data){
			aTodayHead.each(function(){
				$(this).find("img").attr("src",data.src[$(this).index()-1]);
				$(this).find(".today_head_center").find("a").append(data.main[$(this).index()-1]).find("span").html(data.discount[$(this).index()-1]);
				$(this).find(".bottom_left").find("span").html(data.price[$(this).index()-1]).siblings("del").html(data.delPrice[$(this).index()-1])
			})
		}
	});
	//获取提示消息
	var oSuccessAdd = $(".addcar_success");
	oSuccessAdd.isAdd = true;
	//点击购物车效果
	aTodayHead.find(".addCar").click(function(){
		var goods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		var goodName = $(this).parent().parent().siblings(".today_head_center").find("a").contents().eq(1).text();
		var goodSrc = $(this).parent().parent().parent().siblings().find("img").attr("src");
		var goodPrice = $(this).parent().siblings().find("span").html();
		var goodDel = $(this).parent().siblings().find("del").html();
			if(goodName in goods){
				goods[goodName].num++;
			}else{
				goods[goodName] = {
					src : goodSrc,
					price : goodPrice,
					del : goodDel,
					num : 1
				}										
			}
			$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
			checkGoodsNum();
			successAddCar();
			checkSideCar(goods,goodName);
			checkTopCar(goods,goodName);			
	})



//	品牌团加载图片
	$.ajax({
		type:"get",
		url:"../data/index/cos_img.json",
		async:true,
		success:function(data){			
			$("#brands ul a img").each(function(){
				$(this).attr("src",data.src[$(this).parent().parent().index()])
			})
		}
	});

// 小知推荐加载数据
	$.ajax({
		type:"get",
		url:"../data/index/recom.json",
		async:true,
		success:function(data){
			var aRecomList = $(".r_main li");
			aRecomList.each(function(){
				$(this).html('<div class="r_main_top">'
									+'<a href="##"><img src='+data.proImg[$(this).index()]+'/></a>'
								+'</div'
								+'<div class="r_main_bottom">'
									+'<p class="pro_name">'
										+'<a href="##">'+data.proName[$(this).index()]+'</a>'
									+'</p>'
									+'<div class="pro_buy">'
										+'<p class="buy_btn">'
											+'<a href="##" class="addCar">加入购物车</a>'
										+'</p>'
										+'<p class="now_price">'
											+'<i>￥</i>'
											+'<span>'+data.proPrice[$(this).index()]+'</span>'
											+'<del>￥'+data.priceDel[$(this).index()]+'</del>'
										+'</p>	'									
								  	+'</div>'
								+'</div>')
			})
		}
	});
	
	//小知推荐加入购物城功能；
	var oRecomList = $(".r_main");
		oRecomList.on("click",".addCar",function(){
		var goods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		var goodName = $(this).parent().parent().siblings(".pro_name").find("a").html();
		var goodPrice = $(this).parent().siblings().find("span").html();
		var goodDel = $(this).parent().siblings().find("del").html();
		var goodSrc = $(this).parent().parent().siblings("a").find("img").attr("src");
		if(goodName in goods){
			goods[goodName].num++;
		}else{
			goods[goodName] = {
				src : goodSrc,
				price : goodPrice,
				del : goodDel,
				num : 1
			}										
		}
		$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
		checkGoodsNum();
		successAddCar();
		checkSideCar(goods,goodName);
		checkTopCar(goods,goodName)
	})
//小知推荐轮播图 
	recomPlay($(".r_list"));
		

	//品牌栏加载数据
	aBrandImgLeft = $(".brand_main_left img");
	aBrandImgRight = $(".brand_main_right img");
	$.ajax({
		type:"get",
		url:"../data/index/brandImg.json",
		async:true,
		success:function(data){
			for(var i = 0;i<data.left.length;i++){
				aBrandImgLeft.eq(i).attr("src",data.left[i])
			}
			for(var i = 0;i<data.right.length;i++){
				aBrandImgRight.eq(i).attr("src",data.right[i])
			}
		}
	});

	
//品牌栏 选项卡轮播功能
	var aBrandNav = $(".brand_top ul li a");
	var aBrandImg = $(".brand_main");
	var brand_prev = $(".brand_prev");
	var brand_next = $(".brand_next");
	 aBrandNav.iNow = 0 ;
	 aBrandNav.each(function(){
	 	if($(this).hasClass("active")){
	 		$(this).find("i").show();
	 		aBrandImg.eq($(this).index()).show();
	 	}
	 })
	aBrandNav.mouseover(function(){
		aBrandNav.iNow = $(this).parent().index();
		brandTab()
	})
	brand_prev.click(function(){		
		if(aBrandNav.iNow==0){
			aBrandNav.iNow = 4
		}
		aBrandNav.iNow--;
		brandTab();
	})
		brand_next.click(function(){		
		if(aBrandNav.iNow==3){
			aBrandNav.iNow =-1
		}
		aBrandNav.iNow++;
		brandTab();
	})
	function brandTab(){
		aBrandNav.eq(aBrandNav.iNow).addClass("active").find("i").show().parent().parent().siblings().find("a").removeClass("active").find("i").hide();
		aBrandImg.eq(aBrandNav.iNow).show().siblings(".brand_main").hide();
	}

//今日新品动态加入
	var oGoodList = $("#today_deals ul");
	var loadLiTimes = 0 ;
	//给今日新品盒子绑定时间代理 购物车按钮添加功能
	oGoodList.on("click",".addCar",function(){
		var goods = $.cookie("shopCar")? JSON.parse($.cookie("shopCar")):{};
		var goodName = $(this).parent().parent().siblings(".deals_name").find("a").contents().eq(1).text();
		var goodDiscount = $(this).parent().parent().siblings(".deals_name").find("span").html();
		var goodPrice = $(this).parent().siblings().find("span").html();
		var goodDel = $(this).parent().siblings().find("del").html();
		var goodSrc = $(this).parent().parent().parent().siblings().find("img").attr("src")
		if(goodName in goods){
			goods[goodName].num++
		}else{
			goods[goodName] = {
				src : goodSrc,
				discount : goodDiscount,
				price : goodPrice,
				del : goodDel,
				num : 1
			}
		}
		$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
		checkGoodsNum();
		successAddCar();
		checkSideCar(goods,goodName)
		checkTopCar(goods,goodName)
	})
	
//	在今日新品中 点击商品 保存其信息
	oGoodList.on("click",".deals_top .thisGood",function(){
		var goodSrc = $(this).find("img").attr("src");
		var goodName = $(this).parent().siblings().find(".thisGood").contents().eq(1).text();
		var goodPrice = $(this).parent().siblings().find(".deals_price").find("span").html();
		var goodDiscount = $(this).parent().siblings().find(".thisGood").find("span").html();
		var goodDel = $(this).parent().siblings().find(".deals_price").find("del").contents().eq(1).text();
		var thisGood = {
			src : goodSrc,
			name : goodName,
			price : goodPrice,
			discount : goodDiscount,
			del : goodDel
		}
		$.cookie("thisGood",JSON.stringify(thisGood),{expires:1,path:"/"})
	})
	oGoodList.on("click",".deals_name .thisGood",function(){
		var goodSrc = $(this).parent().parent().siblings().find("img").attr("src");
		var goodName = $(this).contents().eq(1).text();
		var goodPrice = $(this).parent().siblings(".deals_pro").find("span").html();
		var goodDel = $(this).parent().siblings(".deals_pro").find("del").contents().eq(1).text();
		var goodDiscount = $(this).find("span").html();
		var thisGood = {
			src : goodSrc,
			name : goodName,
			price : goodPrice,
			discount : goodDiscount,
			del : goodDel
		}
		$.cookie("thisGood",JSON.stringify(thisGood),{expires:1,path:"/"});
	})
	
	//鼠标移上时 会有热门词汇
	oGoodList.on("mouseover",".deals_top",function(){
		$(this).find(".img_efficacy").show();
	})
	oGoodList.on("mouseout",".deals_top",function(){
		$(this).find(".img_efficacy").hide();
	})
	
	$(window).scroll(function(){
		var iTop = $(".main_bottom").offset().top;
		var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		var scrollTop = $(this).scrollTop();
		var aLi = $("#today_deals ul li");
		
		//楼梯中 当滚动banner左右 楼梯栏显示;	
		var snavTop = $("#banner").offset().top + $("#banner").height()/2;
		if(scrollTop>=snavTop){
			$(".side_nav").fadeIn()
		}else{
			$(".side_nav").fadeOut()
		}
		if(aSideNav.isOver){
			for(var i = 0;i<aSideMain.length;i++){
				if(scrollTop>=aSideMain.eq(i).offset().top-200){
					aSideNav.eq(i).addClass("active").siblings().removeClass("active");
				}
			}
		}		
		//当右边滚到相应楼层，左边楼梯相应改变字体颜色
		

//		当滚动到该LI高度时加载对应的图片
		aLi.each(function(){
		if(scrollTop>=$(this).offset().top - clientHeight){
			if($(this).find("img").attr("src") =="../images/index/load_wait.gif"){
				var index = $(this).index();
					$.ajax({
						type:"get",
						url:"../data/index/todayDealImg.json",
						async:true,
						success:function(data){
							aLi.eq(index).find("img").attr("src",data.src[index]);
						}
					});
				}
			}
		})
		
//		当窗口底部到下搜索栏时,动态创建新的商品
		if(loadLiTimes<3){
			if(scrollTop>=iTop - clientHeight){
				$.ajax({
					type:"get",
					url:"../data/index/todayDeal"+loadLiTimes+".json",
					async:true,
					success:function(data){
						for(var key in data){
							var oLi = $('<li>'
							+'<div class="deals_top">'
								+'<div class="img_efficacy">'
									+'<a href="##">补水</a>'
										+'<a href="##">保湿</a>'
										+'<a href="##">润肤</a>'
									+'</div>'
							+'<a href="goodDetail.html" class="thisGood"><img src="../images/index/load_wait.gif" /></a>'
							+'</div>'
							+'<div class="deals_center">'
							+'<p class="deals_name">'
									+'<a href="goodDetail.html" class="thisGood"><span>5.1折</span>'+data[key].name+'</a>'
								+'</p>'
								+'<div class="deals_pro">'
									+'<p class="deals_buy_btn"><a href="##" class="addCar">加入购物车</a></p>'
									+'<p class="deals_price">'
										+'<i>￥</i><span>'+data[key].price+'</span><del><i>￥</i>'+data[key].delPrice+'</del>'
									+'</p>'		
								+'</div>'
								+'<div class="deals_clock">'
									+'<span>'+data[key].persons+'人已经购买</span>'
								+'<p>距离团购结束 132161516</p>'
							+'</div>'
							+'</div>'
						+'</li>')
							oGoodList.append(oLi);
						}						
						loadLiTimes++;
					}
				});
			}
		}
	})

