//顶部菜单鼠标移入移出
	var aTopNav = $(".leader_r>li");
	aTopNav.mouseover(function(){
		$(this).find("i").css("background","url(../images/common/topnav.png) no-repeat 0 -105px");
		if($(this).hasClass("top_move")){
			$(this).css("background","#fff");
		}		
		$(this).find("ul").stop().slideDown(200);
	})
	aTopNav.mouseout(function(){
		$(this).find("i").css("background","url(../images/common/topnav.png) no-repeat 0 -70px");
		$(this).css("background","#f2f2f2");
		$(this).find("ul").stop().slideUp();
	})

//header中的购物车
	var oHeadCar = $(".shopCar").parent().parent();
	oHeadCar.mouseover(function(){		
			$(this).find("i").css("background","url(../images/common/topnav.png) no-repeat 0 -105px");
			$(this).find("dd").stop().slideDown(10);
	})
	oHeadCar.mouseout(function(){
		$(this).find("i").css("background","url(../images/common/topnav.png) no-repeat 0 -70px");
		$(this).find("dd").stop().slideUp(300)
	})

//nav右边手风琴
	var aNavRight = $(".nav_r>li");
	aNavRight.each(function(){
		$(this).hover(
			function(){
				$(this).stop().animate({width:74},500)
			},
			function(){
				$(this).stop().animate({width:0},500)
			}
		)
	})
	
//	nav左边鼠标移入移出
	var aNavLeft = $(".nav_l>li");
	aNavLeft.eq(0).hover(
		function(){
			$(this).find("a").addClass("active");
		},
		function(){
			$(this).find("a").removeClass("active");
		}
	)
	aNavLeft.eq(1).hover(
		function(){
			$(this).find("a:first").addClass("active").find("span").css("background","none");
			$(".list").stop().slideDown(500);
		},
		function(){
			$(this).find("a:first").removeClass("active").find("span").css("background","url(../images/common/mainnav.png) no-repeat right -8px");
			$(".list").stop().slideUp(500);
		}
	)
	
	aNavLeft.eq(2).hover(
		function(){
			$(".oversea1").hide().siblings().show();
		},
		function(){
			$(".oversea2").hide().siblings().show();
		}
	)

//nav二级菜单
		$.ajax({
			type:"get",
			url:"../data/common/nav.json",
			async:true,
			success:function(data){
				var aHuFu = data.huFu;
				var aYaoZhuang = data.yaoZhuang;
				var aXiHu = data.xiHu;
				var aXiangFen = data.xiangFen;
				for(var i = 0;i<aHuFu.length;i++){
					$(".nav_hufu").after("<dd><a href='##''>"+aHuFu[i]+"</a></dd>");
				}
				for(var i = 0;i<aYaoZhuang.length;i++){
					$(".nav_yaozhuang").after("<dd><a href='##''>"+aYaoZhuang[i]+"</a></dd>");
				}
				for(var i = 0;i<aXiHu.length;i++){
					$(".nav_xihu").after("<dd><a href='##''>"+aXiHu[i]+"</a></dd>");
				}
				for(var i = 0;i<aXiangFen.length;i++){
					$(".nav_xiangfen").after("<dd><a href='##''>"+aXiangFen[i]+"</a></dd>");
				}
				$(".goodList_img a").append("<img src="+data.rightImg+"/>")
			}
		});
		
//	头部购物车载入
	var oTopCar = $("#header dd");
	var oTopList = oTopCar.find("ul");
	var sideGoods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		if($.isEmptyObject(sideGoods)){
			oTopCar.html('<div class="shopCar_empty">'
						+'<p>'
							+'<img src="../images/common/empty.png"/>'
						+'</p>'
					+'</div>')
		}else{
			for(var goodName in sideGoods){
				var oLi = '<li>'+
							'<div class="t_shopcar_img">'+
								'<a href="##"><img src="'+sideGoods[goodName].src+'"/></a>'+
							'</div>'+
							'<div class="t_shopcar_name">'+
								'<a href="##">'+
									'<p>'+goodName+'</p>'+
								'</a>'+
							'</div>'+
							'<div class="t_shopcar_price">'+
								'<p><span>￥</span>'+sideGoods[goodName].price+'</p>'+
							'</div>'+
						'</li>'
				oTopList.append(oLi)
			}
			if(oTopCar.find("ul li").length>3){
					var oCheckAllGoods = '<p class="to_check_goods"><a href="shopCar.html">查看全部商品>></a><p>'
					oTopCar.find("ul").after(oCheckAllGoods);	
			}		
		}

	//查看用户是否登录 登陆以后改变顶部
	if($.cookie("login")){
		$(".leader_l").html("<p class='login_user'>用户:"+$.cookie("login")+"<a href='#'>注销</a></p>")
	}

	//点击注销按钮注销用户 刷新页面
	$(".login_user a").click(function(){
		$.cookie("login","",{expires:-1,path:"/"});
		location.reload();
	})

	//搜索加载百度搜索接口
	$(".search_cont").keyup(function(){
		$(".search_cont").val($(this).val());
		searchKeyWord()
	})
	$(document).click(function(){
		$(".search_list").html("");
		$(".bottom_searchlist").html("")
	})
