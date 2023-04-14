<?php

$vusuario = $_POST['usuario']; // recivo usuario del form que viene mediante el metodo POST
$vclave   = $_POST['clave'];   

// conectarme a la DB y jalar mis datos de usuario clave
$dbusuario = 'EMILY';
$dbclave = 'EMILY';

if (( $vusuario==$dbusuario ) && ($vclave == $dbclave) ) {
    echo "INGRESO CORRECTO";
} else {
    echo "USUARIO INCORRECTO";
}

?>