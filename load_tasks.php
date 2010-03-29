<?php
include ('util.php');
include ('db.php');
$conn = db_connect();

$pid = $_GET['pid'];

$q = "select * from tasks where pid=$pid order by due asc, text asc";
$res = mysql_query($q);

db_close($conn);

$json = queryResultToJSON($res);

echo $json;
?>
