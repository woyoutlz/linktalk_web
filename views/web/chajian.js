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
function loadpieceModal(){
	$("#postPieceModal").remove();
	$.ajax({
		type: "get",
		url: "modals/postPieceModal.html",
		success: function(data) {
			if (!data) {

				return;
			};
			var $piece = $(data);
			$("body").append($piece);
			//重绑定事件
			$('#postPieceModal').on('shown.bs.modal', function(e) {
				// $("#userInput").focus();
			});
			$('#postPieceModal').on('hidden.bs.modal', function(e) {
				useNormalUI();

			})
			$("#postPiece_fabu").click(function() {

				var name = user.name||"user";
			
				var content = $("#postPieceContentAreaID").val();
				var pageUrl = nowPage;

				var zanNum = 0;


				var mydate = new Date();
				var pinglunDate = mydate.toLocaleString();
				var timerInter = mydate.getTime()
				var postId = timerInter + name;


				var objupdate = {

				}
				objupdate[postId] = {
						userName: name||"user",
						content: content,
						urlID: pageUrl,
						Datein: pinglunDate,
						zanNum: zanNum
					}
					// thingsMod.push({userName: name, text: text,urlID:pageUrl,Datein:pinglunDate,Pid:pinglunId,backId:backId});
				var postRef = piecePagepRef.child(nowPost);	
				postRef.update(objupdate);
				$('#postPieceModal').modal('hide');
				freshPieceData();
				})
				//show

			$("#postPieceModal").modal("show");
		}
	})
}
function freshPieceData(){
		var postRef = piecePagepRef.child(nowPost);	
		postRef.once("value",function(snapshot){
			var obj = snapshot.val();
			console.log(obj);
			loadPieceData(obj);
		})
}
function loadPieceData(dataIn){
	var ss = $.map(dataIn, function(value, key) {
		var content = value.content;
		var html1 = marked(content);
		var context= {
			time:value.Datein,
			name:value.userName,
			zanNum:value.zanNum
		}
		var html2 = handleTemp.pieceshow(context)
		var $div = $(html2);
		$div.find(".pieceContent").html(html1);
		
		// marked(content);
		return $div;
	})

	$(".piecesContent").html(ss);

	// bindCommentEvent();
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
						content: content,
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
			$(".post_showHtmlBtn").click(function() {

				var display = $("#tieziContentAreaID").css("display");
				if (display == "none") {
					$("#tieziContentAreaID").show();
					$("#tieziHtmlAreaID").hide();
				} else {
					var content = $("#tieziContentAreaID").val();

					$("#tieziHtmlAreaID").html(marked(content))
					$("#tieziContentAreaID").hide();
					$("#tieziHtmlAreaID").show();
				}

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
				$("#container").html("没有数据")
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
var nowPost="";
var nowPageRef = myDataRef.child(nowPage);
var pieceRef = new Firebase('https://yangyu-linktalk.firebaseio.com/postpiece');
var piecePagepRef = pieceRef.child(nowPage);
function loadPage(pageUrl){
	 nowPage = pageUrl;
	 nowPageRef = myDataRef.child(nowPage);
	 piecePagepRef = pieceRef.child(nowPage);
	 freshPinglunData();
}
function doinit() {
	freshPinglunData();
	bindButtonEvent();
	bindModalEvent();
	loadHandlebarModels();
	ifparentOnchange();
}
function ifparentOnchange(){
	if (parent.window.PDFView) {
		$(parent.document.body).find("#pageNumber").on("change",function(){
			alert("changed");
		});
	};
	$("#testInput").on("change",function(){
			alert("changed");
		});
}
var handleTemp = {};

function loadHandlebarModels() {
	handleTemp.postPiece = "<div class='apostPiece'></div>";
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
	$.ajax({
		type: "get",
		url: "modals/pieceshow.html",
		success: function(data) {
			if (!data) {

				return;
			};
			handleTemp.pieceshow = Handlebars.compile(data);

		}
	})
	$.ajax({
		type: "get",
		url: "modals/detailPost.html",
		success: function(data) {
			if (!data) {

				return;
			};
			$(".container3").append(data);
			$("#d_huitie").click(function(){
				loadpieceModal();
			})
			$("#planeClose").click(function() {
				planeHideAndReset();
			})
		}
	})
}

function useFullUI() {
	$(parent.document.body).find("#chajianiframe").css("width", "100%");
}
function getNowPage(){
	var page =  parent.window.PDFView.page;
	var url = "b1p"+page;
	loadPage(url);
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
	$(".refreshbtn").click(function() {
		getNowPage();
		
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
			username: value.userName,
			keyid: key,
			time: value.Datein
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
	$(".postUpBtn").click(function() {
		var keyid = $(this).attr("keyid");
		UIUpSoon($(this).parents(".zansInfo"));
		upByKeyid(keyid);
		$(this).css("color","#3385ff");
	})
	$(".postDownBtn").click(function() {
		var keyid = $(this).attr("keyid");
		UIDownSoon($(this).parents(".zansInfo"));
		downByKeyid(keyid);
		$(this).css("color","#3385ff");
	})
}
function UIDownSoon($som){
	var zannumstr = $som.find(".postZanNum").html();
	var zanNum = parseInt(zannumstr);
	zanNum = zanNum-1;
	$som.find(".postZanNum").html(""+zanNum);
}
function UIUpSoon($som){
	var zannumstr = $som.find(".postZanNum").html();
	var zanNum = parseInt(zannumstr);
	zanNum = zanNum+1;
	$som.find(".postZanNum").html(""+zanNum);
}	
function upByKeyid(keyid) {
	if (pageData && pageData.length != 0) {
		// var value = pageData[keyid];
		// var zanId = value.Pid;
		// var localArray = zanId.split("/");
		
		var theTiezi = nowPageRef.child(keyid);
		theTiezi.once("value", function(snapshot) {
			var tieziget = snapshot.val();
			// pinglun.off("value");

			theTiezi.update({
				zanNum: tieziget.zanNum + 1
			});

		}, function(errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

	};
}

function downByKeyid(keyid) {
	if (pageData && pageData.length != 0) {
		// var value = pageData[keyid];
		// var zanId = value.Pid;
		// var localArray = zanId.split("/");
		
		var theTiezi = nowPageRef.child(keyid);
		theTiezi.once("value", function(snapshot) {
			var tieziget = snapshot.val();
			// pinglun.off("value");

			theTiezi.update({
				zanNum: tieziget.zanNum -1
			});

		}, function(errorObject) {
			console.log("The read failed: " + errorObject.code);
		});

	};
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
		nowPost = keyid;
		var value = pageData[keyid];

		var context = {
			zanNum: value.zanNum,
			title: value.title,
			username: value.userName,
			keyid: null,
			time: value.Datein
		}
		var html = handleTemp.postInfo(context);
		$(".postContent").html(html);
		var ss = $(handleTemp.postPiece).append(marked(value.content))
		$(".postContent").append(ss);
		$(".piecesContent").html("");
		loadPiecesByID(keyid);

	};
}
function loadPiecesByID(keyid){
	freshPieceData()
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