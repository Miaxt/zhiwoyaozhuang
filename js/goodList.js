
	//导航条变色
	$(".zhiwo_mail").addClass("active").find("span").css("background","none")
	aNavLeft.eq(1).hover(
		function(){
			$(this).find("a:first").addClass("active").find("span").css("background","none");
		},
		function(){
			$(this).find("a:first").addClass("active").find("span").css("background","none");
		}
	)
	
	
	//	动态加载商品列表图片
	var oHuFu = $(".skin_care");
	var oYaoZhuang = $(".skin_cosme");
	var oHuLi = $(".skin_personalcare");
	var oCaiZhuang = $(".skin_makeup");
	
	$.ajax({
		type:"get",
		url:"../data/goodList/list.json",
		async:true,
		success:function(data){
			//护肤载入
//			oHuFu.find(".mallfloor_list_ad1 img").attr("src",data.hufu.ad1);
//			oHuFu.find(".mallfloor_list_ad2 img").attr("src",data.hufu.ad2);
//			oHuFu.find("li").each(function(){
//				$(this).find(".mf_list_ginfoname").html(data.hufu.name[$(this).index()]);
//				$(this).find(".mf_list_ginfoprice").html(data.hufu.price[$(this).index()]);
//				$(this).find(".mf_list_goodsimg img").attr("src",data.hufu.src[$(this).index()])
//			})
			loadGoodList(oHuFu,data,"hufu");
			loadGoodList(oYaoZhuang,data,"yaozhuang");
			loadGoodList(oHuLi,data,"huli");
			loadGoodList(oCaiZhuang,data,"caizhuang");
		}
	});
	
//	列表中图片鼠标滑过变亮
	$(".container").on("mouseover","img",function(){
		$(this).css("opacity",0.8)
	})
	$(".container").on("mouseout","img",function(){
		$(this).css("opacity",1)
	})
	
//	商品点击进入商品详情页
	$(".mallfloor_list_goods li").click(function(e){
		var goodSrc = $(this).find("img").attr("src");
		var goodName = $(this).find(".mf_list_ginfoname").html();
		var goodPrice = $(this).find(".mf_list_ginfoprice").contents().eq(1).text();
		var goodDel = goodPrice;
		var goodDiscount = 10;
		var thisGood = {
			src : goodSrc,
			name : goodName,
			price : goodPrice,
			discount : goodDiscount,
			del : goodDel
		}
		$.cookie("thisGood",JSON.stringify(thisGood),{expires:1,path:"/"})
	})
	
	function loadGoodList(oBox,data,id){
		oBox.find(".mallfloor_list_ad1 img").attr("src",data[id].ad1);
			oBox.find(".mallfloor_list_ad2 img").attr("src",data[id].ad2);
			oBox.find("li").each(function(){
				$(this).find(".mf_list_ginfoname").html(data[id].name[$(this).index()]);
				$(this).find(".mf_list_ginfoprice").append(data[id].price[$(this).index()]);
				$(this).find(".mf_list_goodsimg img").attr("src",data[id].src[$(this).index()])
			})
	}

	