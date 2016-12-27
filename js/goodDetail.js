	//导航条首页变色
	var oNavFirst = $(".nav_l li:first").find("a");
	oNavFirst.addClass("active");
	oNavFirst.parent().unbind("mouseenter").unbind("mouseleave");
	
	//获取成功加入购物车元素
	var oSuccessAdd = $(".addcar_success");
	oSuccessAdd.isAdd = true;
	
	//由主页点击跳转到本页加载数据
	var thisGood = JSON.parse($.cookie("thisGood"));
	$(".now_pro").find("p").html(thisGood.name);
	$(".single_img").find("img").attr("src",thisGood.src);
	$(".single_name p").append(thisGood.name);
	$(".gobuy_price").find("span").html(thisGood.price);
	$(".hisprice span").append(thisGood.del);
	$(".discount").find("span").html(thisGood.discount);
	$(".jiesheng").find("span").append(thisGood.del-thisGood.price)
	//今日特卖推荐
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

//今日轮播图
	recomPlay($(".r_list"));
	$(".r_list").hover(
		function(){
			$(".r_prev").show();
			$(".r_next").show()
		},
		function(){
			$(".r_prev").hide();
			$(".r_next").hide()
		}
	)
//今日加入购物车
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
		checkTopCar(goods,goodName);
	})


//商品详情菜单吸顶
	var oInfoNav = $(".detail_infonav");
	oInfoNav.iTop = oInfoNav.offset().top;
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop>oInfoNav.iTop-oInfoNav.height()){
			oInfoNav.css({
				position:"fixed",
				top:0
			})
		}else{
			oInfoNav.css("position","relative")
		}
	})

//加入本次商品到购物车
	var aThisDetail = $(".this_addCar");
	aThisDetail.click(function(){
		var goods = $.cookie("shopCar")?JSON.parse($.cookie("shopCar")):{};
		var goodName = $(".now_pro").find("p").html();
		var goodPrice = $(".gobuy_price").find("span").html();
		var goodDiscount = $(".gobuy_price").find("span").html();
		var goodDel = $(".hisprice").find("span").contents().eq(1).text();
		var goodSrc = $(".single_img").find("img").attr("src");
		if(goodName in goods){
			goods[goodName].num++;
		}else{
			goods[goodName] = {
				src : goodSrc,
				price : goodPrice,
				del : goodDel,
				discount : goodDiscount,
				num : 1
			}		
		}
		$.cookie("shopCar",JSON.stringify(goods),{expires:1,path:"/"});
		checkGoodsNum();
		successAddCar();
		checkSideCar(goods,goodName);
		checkTopCar(goods,goodName);
	})


//放大镜
	var oImgBox = $(".single_img");
	var oSmallGlass = $(".glass");
	var oBigGlass = $(".glassBox");
	var bigGlassImg = oBigGlass.find("img");
	oImgBox.mousemove(function(e){
		oSmallGlass.css({
			top:e.pageY-oImgBox.offset().top-oSmallGlass.height()/2+"px",
			left:e.pageX-oImgBox.offset().left-oSmallGlass.width()/2+"px"
		})
		if(oSmallGlass.offset().left-oImgBox.offset().left<0){
			oSmallGlass.css("left",0)
		}else if(oSmallGlass.offset().left-oImgBox.offset().left>oImgBox.width()-oSmallGlass.width()){
			oSmallGlass.css("left",oImgBox.width()-oSmallGlass.width()+"px")
		}
		if(oSmallGlass.offset().top-oImgBox.offset().top<0){
			oSmallGlass.css("top",0)
		}else if(oSmallGlass.offset().top-oImgBox.offset().top>oImgBox.height()-oSmallGlass.height()){
			oSmallGlass.css("top",oImgBox.height()-oSmallGlass.height()+"px")
		}
		iLeft = (oSmallGlass.offset().left-oImgBox.offset().left)/oImgBox.width();
		iTop = (oSmallGlass.offset().top-oImgBox.offset().top)/oImgBox.height();
		bigGlassImg.css({
			left:-iLeft*bigGlassImg.width()+"px",
			top:-iTop*bigGlassImg.height()+"px"
		})
	})
	oImgBox.hover(
		function(){
			oBigGlass.show();
			oSmallGlass.show();
		},
		function(){
			oBigGlass.hide();
			oSmallGlass.hide();
		}
	)
