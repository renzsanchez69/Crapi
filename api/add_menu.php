<?php 
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "crapi";

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
$fname = $_GET["fname"];
$fdesc = $_GET["fdesc"];
$fprice = $_GET["fprice"];
// Attempt insert query execution
$sql = "INSERT INTO menu (food_name, description,price) VALUES ('$fname', '$fdesc', '$fprice')";
if(mysqli_query($conn, $sql)){
    echo "Records inserted successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}
 
// Close connection
mysqli_close($conn);
?>