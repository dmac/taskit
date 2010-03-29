<?php
include ('db.php');
$conn = db_connect();

$pid = $_GET['pid'];
$text = $_GET['text'];
$due = $_GET['due'];
$q = "insert into tasks (pid, text, due) values ($pid, \"$text\", \"$due\")";
$res = mysql_query($q);

?>
