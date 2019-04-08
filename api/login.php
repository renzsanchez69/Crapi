<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crapi";
$json = json_encode($_POST, true);
$data = (Array)json_decode($json);
$email= $data["email"];
$hash = password_hash($data["pw"], PASSWORD_DEFAULT);
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
header("Content-type:application/json"); 
// Attempt insert query execution
$sql = "SELECT * FROM customers WHERE email='{$email}'";
$res = $conn->query($sql);
if ($res->num_rows > 0) {
	while ($row = $res->fetch_assoc()) {
	   	if(password_verify($data["pw"],$row['password'])) {
			$myArr['data'] = [
	            "id"=>1,
	            "password"=>'$2y$10$OMSeK8Pe70nIHjkiTFLm8uX72fErkZKP6B4H6z7nZcakdPlMsayxe',
	            "status"=>1,
	            "message"=>'Your logged successfully!',
	            "result"=> 'OK'
			];
		} else {
			$myArr['data'] = [
	            "id"=>1,
	            "password"=>$hash,
	            "status"=>1,
	            "message"=>'Invalid password',
	            "result"=> 'NG'
			];
		}
	}
} else {
	$myArr['data'] = [
        "message"=>'Invalid username',
        "result"=> 'NG'
	];
}
echo json_encode($myArr);
 
// Close connection
mysqli_close($conn);
?>