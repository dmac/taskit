<?php
include ('util.php');
include ('db.php');
$conn = db_connect();

$q = "select * from projects order by name asc";
$res = mysql_query($q);
db_close($conn);

$json = queryResultToJSON($res);

echo $json;

?>
