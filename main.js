$(function(){
	 $.ajax( {
                        url: "http://192.168.1.105:3000/rest",
                        type: "get",
                        contentType:"application/x-www-form-urlencoded; charset=utf-8",
                        success : function (result) {

                       		console.log(result);
                        }
                    });
})