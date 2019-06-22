
$('#log-out').click(function(e){
    localStorage.removeItem("login_token");
    localStorage.removeItem("login_data");
    window.location.href = 'index.html';
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var CrapiApp = (function() {

	// return handlers
	var obj = {};
	var element = null;
	var login_token = null;

	// configuration
	obj.config = {};
	obj.broadcast_settings = {};

	// embeded swf object
	obj.embededSwfObj = null;


	obj.ajaxRestAction = function(requestObj) {
		element = this;

		var new_params = requestObj.data;
		

		// Retrieve the login object from storage
		var login_data = localStorage.getItem('login_data');

		// - if login token is not empty. add token
		if (login_data != null) {
			login_data = JSON.parse(login_data);
			if (typeof login_data.login_token !== 'undefined' && login_data.login_token.length != 0) {
				var user_data = {
					login_token: login_data.login_token,
					role: login_data.role
				};
				new_params = extend(user_data, new_params);
			}
		}

		
		// - set to parameters
		requestObj.data = new_params;

		console.warn("=== REQUEST PARAMS ===");
		console.log(JSON.stringify(requestObj));
		console.log("-------------------------------");

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
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.searchResto = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.resto_search_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	function extend(obj, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) obj[key] = src[key];
		}
		return obj;
	}
	return obj;
})();