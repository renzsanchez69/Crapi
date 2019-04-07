<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crapi";

// Create connection
header("Content-type:application/json"); 
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$order_id = 1;
$sql = "SELECT orders.id,orders.order_hash, product.id, product.food_name,product.description, product.qty, product.price, product.created_date, customer.id , customer.firstname , customer.middlename , customer.lastname , customer.address , customer.contact_no, customer.email_address 
     FROM orders
LEFT JOIN customer ON orders.customer_id = customer.id 
LEFT JOIN product ON orders.product_id = product.id";
   // WHERE orders.id = 1";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
	$myArr = [];
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $myArr[] = [
        	"id"=>$row["id"],
        	"food_name"=>$row["food_name"],
        	"description"=>$row["description"],
        	"price"=>$row["price"],
        	"order_id"=>$row["order_hash"],
        	"qty"=>$row["qty"],
        	"full_name"=>$row["firstname"].' '.$row["middlename"].' ,'.$row["lastname"],
        	"address"=>$row["address"],
        	"contact_no"=>$row["contact_no"],
        	"email_address"=>$row["email_address"],
        	"order_date"=>date("d F, Y h:i:s A",strtotime($row["created_date"])),
        ];
    }
} else {
     $myArr[] ="";
}
echo json_encode($myArr);
$conn->close();
?>