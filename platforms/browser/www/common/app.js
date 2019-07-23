

$(document).on('click', '#log-out', function(e){
	e.preventDefault();
	var logoutModal = '<div class="modal fade" id="logoutModal" role="dialog">';
		logoutModal += '<div class="modal-dialog modal-lg">';
		logoutModal += '<div class="modal-content">';
		logoutModal += '<div class="modal-header">';
		logoutModal += '<h2>Logout ?</h2>';
		logoutModal += '</div><div class="modal-body"><div class="regbox" style="padding-top: 10px;">';
		logoutModal += '<p>Are you sure you want to logout?</p>';
		logoutModal += '<button class="btn btn-danger" id="btnLogoutUser" style="width: 85px; border-radius: 0;padding: 12px;">YES</button> ';
		logoutModal += '<button class="btn btn-info" data-dismiss="modal" style="width: 85px; border-radius: 0;padding: 12px;">NO</button>';
		logoutModal += '</div></div></div></div></div>';

	if ($('#logoutModal').length < 1) {
		$('body').append(logoutModal);
	}
	
	$('#logoutModal').modal('show');

});

$(document).on('click', '#btnLogoutUser', function(){

    // - if user is employee
    if (CrapiApp.config.login_data.role == USER_ROLE.employee) {
    	CrapiApp.logoutEmployeeToResto({
			id: CrapiApp.config.login_data.resto_info.id
		})
		.then(function(res){
			console.log(res);
		})
		.always(function(res){
			console.log(res);
		    localStorage.removeItem("login_token");
		    localStorage.removeItem("login_data");
		    delete CrapiApp.config.login_data;
	    	window.location.href = 'index.html';
		});
    
    } else {
	    localStorage.removeItem("login_token");
	    localStorage.removeItem("login_data");
	    delete CrapiApp.config.login_data;
    	window.location.href = 'index.html';
    }
});

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var CrapiApp = (function() {
	// navigator.geolocation.getCurrentPosition(function(pos){alert(pos.coords.latitude);}, function(e){alert(e.message);})


	// return handlers
	var obj = {};
	var element = null;
	var login_token = null;

	// configuration
	obj.config = {};
	obj.broadcast_settings = {};

	// Retrieve the login object from storage
	var login_data = localStorage.getItem('login_data');
	if (typeof login_data != 'undefined' && login_data != null && login_data != 'undefined') {
		obj.config.login_data = JSON.parse(login_data);
		if(
			window.location.pathname.includes('o-reg.html') ||
			window.location.pathname.includes('c-reg.html') ||
			window.location.pathname.includes('index.html')
			// window.location.pathname == '/' ||
			// window.location.pathname == '/o-reg.html' ||
			// window.location.pathname == '/c-reg.html' ||
			// window.location.pathname == '/index.html' 
		) {
			alert('TEST THAT');
			alert(window.location.pathname);
			switch(obj.config.login_data.role) {
				case USER_ROLE.owner:
					window.location.href = "o-main.html";
					break;
				case USER_ROLE.employee:
					window.location.href = "e-main.html";
					break;
				case USER_ROLE.customer:
					window.location.href = "c-locate-resto.html";
					break;
			}
		}
	} else if(
		window.location.pathname.includes('o-reg.html')  &&
		window.location.pathname.includes('c-reg.html')  &&
		window.location.pathname.includes('index.html') 
		// window.location.pathname != '/' &&
		// window.location.pathname != '/o-reg.html' &&
		// window.location.pathname != '/c-reg.html' &&
		// window.location.pathname != '/index.html' 
	) {
		alert('TEST THIS');
		alert(window.location.pathname);
		alert(window.location.origin);
		alert(document.location.hostname);
		alert(location.host);
		window.location.href = 'index.html';
	}

	// embeded swf object
	obj.embededSwfObj = null;
	obj.loaderElement = '<div class="modal-backdrop fade in loaderElement" style="z-index:999;"><center><span class="fa fa-spinner fa-spin" style="font-size: 80px; line-height: 50vh; color: #eee"></span></center></div>';


	obj.ajaxRestAction = function(requestObj) {
		element = this;

		var new_params = requestObj.data;
		

		// - if login token is not empty. add token
		if (
			typeof element.config.login_data !== 'undefined' && 
			typeof element.config.login_data.login_token !== 'undefined' && 
			element.config.login_data.login_token != null && 
			element.config.login_data.login_token.length != 0
		) {
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

	obj.uploadImage = function(form) {
		if (typeof form[0] === 'undefined') {
			console.warn("FORM NOT FOUND.");
			return;
		}
		var formData = new FormData(form[0]);
		var url = BASE_URL+'/api/uploads/upload_image/';

        return $.ajax({
            type:'POST',
            url: url,
            data: formData,
            enctype: 'multipart/form-data',
            cache: false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
	}

	obj.loginUser = function(params){
		element = this;
		delete CrapiApp.config.login_data;

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

	obj.logoutEmployeeToResto = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.logout_employee_resto_url,
			method: 'PUT',
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
	obj.deleteProduct = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.products_base_url+'/'+params.id,
			method: 'DELETE',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	obj.getProductInfo = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.products_base_url+'/'+params.id,
			method: 'GET',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.updateProduct = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.products_base_url+'/'+params.id,
			method: 'PUT',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.createProduct = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.products_base_url,
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

	obj.getEmployeeInfo = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.employees_search_url+'/'+params.id,
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

	obj.updateEmployee = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.employees_search_url+'/'+params.id,
			method: 'PUT',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	/*---------------------------------------------------
		END OF EMPLOYEES - API REQUESTS
	-----------------------------------------------------*/
	/*---------------------------------------------------
		ORDERS - API REQUESTS
	-----------------------------------------------------*/
	obj.getOrderById = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.get_order_by_id_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.orderByCustomer = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.order_by_customer_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.customerSearch = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.customer_search_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.orderAddUrl = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.add_order_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.orderListUrl = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.order_list_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.orderEmpListUrl = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.order_emp_list_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.orderDeleteUrl = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.order_delete_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.getOrderDetails = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.order_details_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.orderEditUrl = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.order_edit_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.updateOrder = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.update_order_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.getEmployees = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.my_url,
			method: 'GET',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}

	obj.orderSearchUrl = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.order_search_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	/*---------------------------------------------------
		END OF ORDERS - API REQUESTS
	-----------------------------------------------------*/
	/*---------------------------------------------------
		PAYMENTS - API REQUESTS
	-----------------------------------------------------*/
	obj.checkoutWithPaymaya = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.paymaya_checkout_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	obj.subscribeWithPaymaya = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.paymaya_subscribe_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	/*---------------------------------------------------
		END OF PAYMENTS - API REQUESTS
	-----------------------------------------------------*/
	/*---------------------------------------------------
		CUSTOMERS - API REQUESTS
	-----------------------------------------------------*/

	obj.createCustomer = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.customer_register_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	/*---------------------------------------------------
		END OF CUSTOMERS - API REQUESTS
	-----------------------------------------------------*/
	/*---------------------------------------------------
		OWNERS - API REQUESTS
	-----------------------------------------------------*/
	obj.getOwnerInfo = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.owners_search_url+'/'+params.id,
			method: 'GET',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	obj.updateOwner = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.owners_search_url+'/'+params.id,
			method: 'PUT',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	obj.createOwner = function(params){
		element = this;

		// - set request data
		var params = {
			url: ENVIRONMENT_URL.owner_register_url,
			method: 'POST',
			data: params
		};
		
		// - perform ajax for login
		return element.ajaxRestAction(params)
	}
	/*---------------------------------------------------
		END OF OWNERS - API REQUESTS
	-----------------------------------------------------*/


	obj.showCommonLoader = function(){
		if ($('.loaderElement').length > 0) {
			return;
		}

		$('html').append(obj.loaderElement);
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

	obj.calculateVat = function(amount){
		var vat = {
			amount: 0,
			total_payable: 0
		};
		if (amount > 0) {
			vat.amount = Number(amount) * .12;
			vat.total_payable = Number(amount) + vat.amount;
		}
		
		return vat;
	}

	function extend(obj, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) obj[key] = src[key];
		}
		return obj;
	}
	
	obj.uuidv4 = function(obj){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	return obj;
})();