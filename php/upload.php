<?php
    $file_name = $_FILES['file']['name'];
    $tmp_name = $_FILES['file']['tmp_name'];
    $file_up_name = $file_name;
    move_uploaded_file($tmp_name, "php/files/".$file_up_name);
?>