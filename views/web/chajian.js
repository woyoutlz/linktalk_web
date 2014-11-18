//使用 freshPinglunData 后，直接json  http获取就没有必要了
//全局对象
var user = {
	islogin: false
}
var UIconfig = {
	min: '300px',
	now: '300px',
	full: '100%'
}
var pageData;

function getPingLunByUrl(url) {
	$.ajax({
		type: "get",
		url: "https://yangyu-linktalk.firebaseio.com/tiezi/b1p1.json",
		success: function(data) {
			if (!data) {
				$("#container").html("");
				return;
			};
			loadPinglunData(data);
		}
	})
}

function loadTieziModal() {
	$("#tieziModal").remove();
	$.ajax({
		type: "get",
		url: "modals/tiezi.html",
		success: function(data) {
			if (!data) {

				return;
			};
			var $tiezi = $(data);
			$("body").append($tiezi);
			//重绑定事件
			$('#tieziModal').on('shown.bs.modal', function(e) {
				// $("#userInput").focus();
			});
			$('#tieziModal').on('hidden.bs.modal', function(e) {
				useNormalUI();

			})
			$("#tiezi_fabu").click(function() {
					var name = user.name;
					var title = $('#tieziTitleAreaID').val();
					var content = $("#tieziContentAreaID").val();
					var pageUrl = nowPage;
					
					var zanNum = 0;

					
					var mydate = new Date();
					var pinglunDate = mydate.toLocaleString();
					var timerInter = mydate.getTime()
					var postId = timerInter + name;


					var objupdate = {

					}
					objupdate[postId] = {
							userName: name,
							title: title,
							content:content,
							urlID: pageUrl,
							Datein: pinglunDate,
							Pid: pageUrl + "/" + postId,
							zanNum: zanNum
						}
						// thingsMod.push({userName: name, text: text,urlID:pageUrl,Datein:pinglunDate,Pid:pinglunId,backId:backId});
					nowPageRef.update(objupdate);
					$('#tieziModal').modal('hide');
					freshPinglunData();

				});
				//show
			$("#tieziModal").modal("show");
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
			$("#denglu-submit").click(function() {

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

function userLogin() {
	user.islogin = true;
	$(".userName").html(user.name);
	$(".denglubtn").css("display", "none");
}

function freshPinglunData() {
		nowPageRef.once("value", function(snapshot) {
			var message = snapshot.val();
			// pinglun.off("value");
			if (!message) {
				return;
			}
			pageData = message;
			loadPinglunData(message);


		}, function(errorObject) {
			console.log("The read failed: " + errorObject.code);
		});
	}
	// getPingLunByUrl();
var myDataRef = new Firebase('https://yangyu-linktalk.firebaseio.com/posts');
var nowPage = "b1p1";
var nowPageRef = myDataRef.child(nowPage);

function doinit() {
	freshPinglunData();
	bindButtonEvent();
	bindModalEvent();
	loadHandlebarModels();
}
var handleTemp = {};
function loadHandlebarModels(){
	$.ajax({
		type: "get",
		url: "modals/postInfo.html",
		success: function(data) {
			if (!data) {

				return;
			};
			handleTemp.postInfo = Handlebars.compile(data);
		
		}
	})
}
function useFullUI() {
	$(parent.document.body).find("#chajianiframe").css("width", "100%");
}

function bindButtonEvent() {
	$(".addPinglun").click(function() {

		useFullUI();
		if (!user.islogin) {
			loadDengluModal();
			return;
		}
		$('#myModal').modal('show')
			// $("textarea").focus();

	})
	$(".refreshbtn").click(function(){
		freshPinglunData();
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
		content: "<a class='btn' onclick='logout()'>退出</a>",
		html: true
	});
	$("#planeClose").click(function() {
		planeHideAndReset();
	})
	$(".tieziBtn").click(function() {
		useFullUI();
		loadTieziModal();
	})
}

function planeHideAndReset() {
	$(".detailView").hide();
	UIconfig.now = "300px";
	useNowUI();
}

function logout() {

	user = {
		islogin: false
	}
	$(".userName").html("");
	$(".denglubtn").css("display", "");
}
function loadPinglunData(dataIn) {
	var ss = $.map(dataIn, function(value, key) {
		var context = {
			zanNum: value.zanNum,
			 title: value.title,
			 username:value.userName,
			 keyid:key,
			 time:value.Datein
		}
		var html = handleTemp.postInfo(context);
		return html;
	})

	$("#container").html(ss);
	bindCommentEvent();
}
function loadPinglunData1(dataIn) {
	var ss = $.map(dataIn, function(value, key) {
		var aLi = '<li class="pinglunLi" keyid=' + key + '>' +

			'<p class="nameP"><span class="zanNum">' +
			value.zanNum +
			'</span><span class="pinglunname">' +
			value.userName +
			'</span>:</p>' +
			value.title +
			'</li>';
		return aLi;
	})

	$("#container").html(ss);
	bindCommentEvent();
}

function bindCommentEvent() {
	$(".p_title").click(function() {
		var keyid = $(this).attr("keyid");
		loadComment(keyid);
	})
}

function loadComment(keyid) {
	// $(".container3").css("width","600px");
	planeShow();
	loadPlane(keyid);
	UIconfig.now = "700px";
	useNowUI();
}

function loadPlane(keyid) {
	if (pageData && pageData.length != 0) {
		var value = pageData[keyid];
		
		var aLi = '<div class="contentUserDiv">'+
		value.userName
		+'</div>'+
		'<div class="titleDiv">' +

			value.title+

			'</div>';
		$(".detail_content").html(aLi);
		$(".detail_content").append(marked(value.content));
		
	};
}

function planeShow() {
	$(".detailView").show();
}

function useNowUI() {
	$(parent.document.body).find("#chajianiframe").css("width", UIconfig.now);
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