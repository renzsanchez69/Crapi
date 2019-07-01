// - use strict
'use strict'

const BASE_URL = "http://localhost/crapi_admin";
const UPLOADS_URL = BASE_URL+"/assets/uploads/";
const IMAGE_PLACEHOLDER_URL = BASE_URL+"/assets/images/image_placeholder.png";

// - environment urls
const ENVIRONMENT_URL = {
	// - login url
	login_url : BASE_URL+"/api/login/login",

	// - customers url
	customer_list_url : BASE_URL+"/api/customers",

	// - restaurants url
	resto_search_url : BASE_URL+"/api/restaurants/resto_search",

	// - employees url
	employees_search_url : BASE_URL+"/api/employees",

	// - products url
	products_base_url : BASE_URL+"/api/products",
	products_search_url : BASE_URL+"/api/products/menu_list",

};

// - general information
const TALK_GENERAL = {
	// - common vars

	// - api result
	api_result_success: "OK",
	api_result_fail: "NG",

	require_login: 1

};


// - broadcast status
const USER_ROLE = {
	customer: {
		text: "customer",
		int: 0
	},
	owner: {
		text: "owner",
		int: 1
	},
	employee: {
		text: "employee",
		int: 2
	}
};