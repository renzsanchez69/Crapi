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
$fid = $_GET["fid"];
$fname = $_GET["fname"];
$fdesc = $_GET["fdesc"];
$fprice = $_GET["fprice"];
// Attempt insert query execution
$sql = "UPDATE menu SET food_name='$fname',description='$fdesc',price='$fprice' WHERE id=$fid";
if(mysqli_query($conn, $sql)){
    echo "Records updated successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}
 
// Close connection
mysqli_close($conn);
?>