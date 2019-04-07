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
$fsearch = $_GET["fsearch"];
$sql = "SELECT id, food_name,price ,description ,created_date FROM menu where food_name LIKE '%$fsearch%' OR  description LIKE '%$fsearch%' OR price LIKE '%$fsearch%' ";
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
        	"order_date"=>date("d F, Y h:i:s A",strtotime($row["created_date"])),
        ];
    }
} else {
     $myArr[] ="";
}
echo json_encode($myArr);
$conn->close();
?>