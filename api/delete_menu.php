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
// Attempt insert query execution
$sql = "DELETE FROM menu WHERE id=$fid";
if(mysqli_query($conn, $sql)){
    echo "Records deleted successfully.";
} else{
    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
}
 
// Close connection
mysqli_close($conn);
?>