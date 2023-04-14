<?php

session_start();

if (!isset($_SESSION['usuario'])) {
    //header("Location: http://localhost/ejemplo2/views/login.html");
    echo "no esta definida la sesion";
}else{
    $var_usuario = $_SESSION['usuario'];
    echo "<h1> PORTAL DE LA UNAS</h1>";
    echo "<br>";
    echo "<p> Pagina Principal </p>";
    echo "<span> Bienvenido ".$var_usuario." </span>";
    echo "<br>";
    echo "<a href='http://localhost/ejemplo2/controllers/logout.php'>Cerrar sesion</a>";
}

?>