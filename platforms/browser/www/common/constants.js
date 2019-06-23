// - use strict
'use strict'

const BASE_URL = "http://localhost/crapi_admin";

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