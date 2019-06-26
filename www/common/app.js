
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

	// Retrieve the login object from storage
	var login_data = localStorage.getItem('login_data');
	if (login_data != null) {
		obj.config.login_data = JSON.parse(login_data);
	}

	// embeded swf object
	obj.embededSwfObj = null;
	obj.loaderElement = '<div class="modal-backdrop fade in loaderElement"><center><span class="fa fa-spinner fa-spin" style="font-size: 80px; line-height: 50vh; color: #eee"></span></center></div>';


	obj.ajaxRestAction = function(requestObj) {
		element = this;

		var new_params = requestObj.data;
		

		// - if login token is not empty. add token
		if (typeof element.config.login_data !== 'undefined' && typeof element.config.login_data.login_token !== 'undefined' && element.config.login_data.login_token.length != 0) {
			var user_data = {
				login_token: element.config.login_data.login_token,
				role: element.config.login_data.role
			};
			new_params = extend(user_data, new_params);
		}

		
		// - set to parameters
		requestObj.data = new_params;

		console.warn("=== REQUEST PARAMS ===");
		console.log(JSON.stringify(requestObj));
		console.log("-------------------------------");

		// - execute delete request
		return $.ajax({
			url: encodeURI(requestObj.url),
			type: requestObj.method,
			data: requestObj.data,
			crossDomain: true,
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

	/*---------------------------------------------------
		PRODUCTS - API REQUESTS
	-----------------------------------------------------*/	
	obj.searchProducts = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.products_search_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	/*---------------------------------------------------
		END OF PRODUCTS - API REQUESTS
	-----------------------------------------------------*/
	/*---------------------------------------------------
		EMPLOYEES - API REQUESTS
	-----------------------------------------------------*/
	obj.searchEmployees = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.employees_search_url,
			method: 'GET',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.deleteEmployee = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.employees_search_url+'/'+params.id,
			method: 'DELETE',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.createEmployee = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.employees_search_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	/*---------------------------------------------------
		END OF EMPLOYEES - API REQUESTS
	-----------------------------------------------------*/

	obj.showCommonLoader = function(){
		if ($('.loaderElement').length > 0) {
			return;
		}

		$('body').append(obj.loaderElement);
	}

	obj.removeCommonLoader = function(){
		$('.loaderElement').remove();
	}

	obj.getCleanFormData = function(obj){
		var newObj = {};
		for (var key in obj) {
			if (typeof obj[key].name !== 'undefined' && typeof obj[key].value !== 'undefined') {
				newObj[obj[key].name] = obj[key].value;
			}
		}
		return newObj;
	}

	function extend(obj, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) obj[key] = src[key];
		}
		return obj;
	}
	return obj;
})();