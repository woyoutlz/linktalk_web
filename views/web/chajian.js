//使用 freshPinglunData 后，直接json  http获取就没有必要了
//全局对象
var user = {
	islogin:false
}
function getPingLunByUrl(url) {
	$.ajax({
		type: "get",
		url: "https://yangyu-linktalk.firebaseio.com/things/b1p1.json",
		success: function(data) {
			if (!data) {
				$("#container").html("");
				return;
			};
			loadPinglunData(data);
		}
	})
}

function loadDengluModal() {
	$("#dengluModal").remove();
	$.ajax({
		type: "get",
		url: "modals/denglu.html",
		success: function(data) {
			if (!data) {

				return;
			};
			var $denglu = $(data);
			$("body").append($denglu);
			//重绑定事件
			$('#dengluModal').on('shown.bs.modal', function(e) {
				$("#userInput").focus();
			});
			$('#dengluModal').on('hidden.bs.modal', function(e) {
				useNormalUI();

			})
			$("#denglu-submit").click(function(){
				
				var name = $("#userInput").val();
				user.name = name;
				userLogin();
				$("#dengluModal").modal("hide");
			})
			//show
			$("#dengluModal").modal("show");
		}
	})
}

function userLogin(){
	user.islogin = true;
	$(".userName").html(user.name);
	$(".denglubtn").css("display","none");
}
function freshPinglunData() {
		nowPageRef.once("value", function(snapshot) {
			var message = snapshot.val();
			// pinglun.off("value");
			if (!message) {
				return;
			}

			loadPinglunData(message);


		}, function(errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}
	// getPingLunByUrl();
var myDataRef = new Firebase('https://yangyu-linktalk.firebaseio.com/things');
var nowPage = "b1p1";
var nowPageRef = myDataRef.child(nowPage);

function doinit() {
	freshPinglunData();
	bindButtonEvent();
	bindModalEvent();
}

function useFullUI() {
	$(parent.document.body).find("#chajianiframe").css("width", "100%");
}

function bindButtonEvent() {
	$(".addPinglun").click(function() {

		useFullUI();
		if(!user.islogin){
			loadDengluModal();
			return;
		}
		$('#myModal').modal('show')
			// $("textarea").focus();

	})
	$("#pinglun_fabu").click(function() {
		var name = user.name;
		var text = $('#pinglunAreaID').val();
		var pageUrl = nowPage;
		var backId = "";
		var zanNum = 0;

		if (backId == "") {
			backId = null;
		}
		var mydate = new Date();
		var pinglunDate = mydate.toLocaleString();
		var timerInter = mydate.getTime()
		var pinglunId = timerInter + name;


		var objupdate = {

		}
		objupdate[pinglunId] = {
				userName: name,
				text: text,
				urlID: pageUrl,
				Datein: pinglunDate,
				Pid: pageUrl + "/" + pinglunId,
				backId: backId,
				zanNum: zanNum
			}
			// thingsMod.push({userName: name, text: text,urlID:pageUrl,Datein:pinglunDate,Pid:pinglunId,backId:backId});
		nowPageRef.update(objupdate);
		$('#myModal').modal('hide');
		freshPinglunData();

	})
	$(".denglubtn").click(function() {
		useFullUI();
		loadDengluModal();

	})
	$(".userName").popover({
		content:"<a class='btn' onclick='logout()'>退出</a>",
		html:true
		});
}
function logout(){

	 user = {
	islogin:false
	}
	$(".userName").html("");
	$(".denglubtn").css("display","");
}
function loadPinglunData(dataIn) {
	var ss = $.map(dataIn, function(value, key) {
		var aLi = '<li class="pinglunLi">' +

			'<p class="nameP"><span class="zanNum">' +
			value.zanNum +
			'</span><span class="pinglunname">' +
			value.userName +
			'</span>:</p>' +
			value.text +
			'</li>';
		return aLi;
	})

	$("#container").html(ss);
}

function useNormalUI() {
	$(parent.document.body).find("#chajianiframe").css("width", "300px");
}

function bindModalEvent() {
	$('#myModal').on('hidden.bs.modal', function(e) {
		useNormalUI();
		resetModalUI();
	})
	$('#myModal').on('shown.bs.modal', function(e) {
		$("#pinglunAreaID").focus();
	})


}

function resetModalUI() {
	$("#pinglunAreaID").val("");
}
doinit();