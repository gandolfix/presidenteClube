<?php
//error_reporting(E_ALL);
//var_dump($_SERVER);
$post_data = $_POST['data'];
if (!empty($post_data)) {
    $dir = '/files';
    $file = uniqid().getmypid();
    //$filename = $dir.$file.'.txt';
    $handle = fopen("atletas.json", "w");
    fwrite($handle, $post_data);
    fclose($handle);
    //echo $file;
}
?>