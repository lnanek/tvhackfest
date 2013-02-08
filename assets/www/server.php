<?php

header("Access-Control-Allow-Origin: *");


$url = isset($_GET['_url']) && $_GET['_url'] ? $_GET['_url'] : false; 

if ($url) {
  unset($_GET['_url']);
  $args = false;
  if (!empty($_GET['_POST'])) {
    $args = $_GET['_POST'];
  } else if (!empty($_GET)) {
    $args = $_GET;
  }
  $data = file_get_contents($url);
  if (!empty($args)) {
    $data = json_decode($data);
    $data[] = $args;
    $data = json_encode($data);
    file_put_contents($url, $data);
  }
  print $data;
}