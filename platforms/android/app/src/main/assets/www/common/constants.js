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
	customer_register_url : BASE_URL+"/api/customers/regist",
	customer_search_url : BASE_URL+"/api/customers/search",

	// - restaurants url
	resto_search_url : BASE_URL+"/api/restaurants/resto_search",

	// - employees url
	employees_search_url : BASE_URL+"/api/employees",

	// - products url
	products_base_url : BASE_URL+"/api/products",
	products_search_url : BASE_URL+"/api/products/menu_list",

	// - orders url
	order_by_customer_url : BASE_URL+"/api/orders/order_by_customer",
	order_list_url : BASE_URL+"/api/orders/order_list",
	order_emp_list_url : BASE_URL+"/api/orders/order_emp_list",
	add_order_url : BASE_URL+"/api/orders/add_orders",
	order_delete_url : BASE_URL+"/api/orders/order_delete_by_item",
	order_details_url : BASE_URL+"/api/orders/order_details_list",
	order_edit_url : BASE_URL+"/api/orders/edit_orders",
	order_search_url : BASE_URL+"/api/orders/order_search",
	update_order_url : BASE_URL+"/api/orders/update_order",

	// - payments url
	paymaya_checkout_url : BASE_URL+"/api/payments/paymaya_checkout"
};

// - general information
const TALK_GENERAL = {
	// - common vars

	// - api result
	api_result_success: "OK",
	api_result_fail: "NG",

	require_login: 1

};


// - User role 
const USER_ROLE = {
	owner: "owner",
	customer: "customer",
	employee: "employee"
};

// - Order status
const ORDER_STATUS = {
	pending: "pending",
	success: "success",
	failed: "failed"
};