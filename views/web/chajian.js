function getPingLunByUrl(url){
	$.ajax({
		type:"get",
		url:"https://yangyu-linktalk.firebaseio.com/things/b1p2.json",
		success:function(data){
			// console.log(data);
			// $.each(data,function(key,value){
			// 	console.log(value)
			// })
			var ss = $.map(data,function(value,key){
				var aLi = '<li class="pinglunLi">'+

					'<p class="nameP"><span class="zanNum">'+
							value.zanNum+
					'</span><span class="pinglunname">'+
						value.userName+
						'</span>:</p>'+
					    value.text+
							'</li>';
				return aLi;
			})
		
			$("#container").html(ss);
		}
	})
}
// getPingLunByUrl();
function  doinit(){
	getPingLunByUrl();
	bindButtonEvent();
}
function bindButtonEvent(){
	$(".addPinglun").click(function(){
		$(parent.document.body).find("#chajianiframe").css("width","100%");
	})
}
doinit();