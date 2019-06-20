
// $('#log-out').click(function(e){
//     localStorage.removeItem("login_token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("resto_id");
//     localStorage.removeItem("longitude");
//     localStorage.removeItem("latitude");
//     window.location.href = 'index.html';
// });

// function numberWithCommas(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

var CrapiApp = (function() {

	// return handlers
	var obj = {};
	var element = null;

	// configuration
	obj.config = {};
	obj.broadcast_settings = {};

	// embeded swf object
	obj.embededSwfObj = null;


	obj.ajaxRestAction = function(requestObj) {
		element = this;
		var new_params = {};
		// var new_params = _.extend({
		// 	member_type: TALK_GENERAL.member_type,
		// 	terminal_type: TALK_GENERAL.terminal_type,
		// 	idfa: defaultIDFA
		// }, obj.data);
		
		// - if login token is not empty.
		if (typeof loginToken !== 'undefined' && loginToken.length != 0) {
			new_params = _.extend({login_token: loginToken}, new_params);
		}
		
		// - set to parameters
		requestObj.data = new_params;
		
		// - warn
		console.warn("=== REQUEST PARAMS ===");
		console.log(JSON.stringify(requestObj));
		console.log("=== ============== ===");

		// - execute delete request
		return $.ajax({
			url: requestObj.url,
			type: requestObj.method,
			data: requestObj.data,
			dataType: "json"
		});
	}

	obj.loginUser = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.login_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.getCustomerList = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.customer_list_url,
			method: 'GET',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	return obj;
})();