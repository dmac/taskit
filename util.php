<?php

function queryResultToJSON($res) {
  $isFirstObject = true;
  $json = "[";
  while ($row = mysql_fetch_assoc($res)) {
    if (!$isFirstObject) {
      $json .= ", ";
    }
    $isFirstObject = false;
    $isFirstKey = true;
    $json .= "{";
    foreach ($row as $key => $value) {
      if (!$isFirstKey) {
        $json .= ", ";
      }
      $isFirstKey = false;
      $json .= "\"$key\": ";
      if (isQuotedValue($key)) $json .= "\"";
      $json .= "$value";
      if (isQuotedValue($key)) $json .= "\"";
    }
    $json .= "}";
  }
  $json .= "]";
  
  return $json;
}

function isQuotedValue($key) {
  return ($key == "text"
          || $key == "due"
          || $key == "name");
}

?>
