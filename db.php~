<?php

function db_connect() {
  $dbhost = "localhost";
  $dbuser = "root";
  $dbpass = "";
  $dbname = "taskit";
  
  $conn = mysql_connect($dbhost, $dbuser, $dbpass) or die ("Error connecting to mysql");
  mysql_select_db($dbname);
  return $conn;
}

function db_close($conn) {
  mysql_close($conn);
}
?>
