<?php

session_start();
session_destroy();
header("Location: http://localhost/ejemplo2/views/login.html");

?>