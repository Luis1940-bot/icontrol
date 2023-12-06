<?php
ob_clean(); // Limpia el búfer de salida
header('Content-Type: application/json');
session_start();
header('Cache-Control: no-cache, must-revalidate');

$response = [
    'email' => isset($_SESSION['factum_validation']['email']) ? $_SESSION['factum_validation']['email'] : 'luisglogista@gmail.com',
    'plant' => isset($_SESSION['factum_validation']['plant']) ? $_SESSION['factum_validation']['plant'] : '1',
    'lng' => isset($_SESSION['factum_validation']['lng']) ? $_SESSION['factum_validation']['lng'] : 'br',
    'person' => isset($_SESSION['factum_validation']['person']) ? $_SESSION['factum_validation']['person'] : 'Luis Gimenez',
    'id' => isset($_SESSION['factum_validation']['id']) ? $_SESSION['factum_validation']['id'] : '6',
    'tipo' => isset($_SESSION['factum_validation']['tipo']) ? $_SESSION['factum_validation']['tipo'] : '7',
];

echo json_encode($response);
exit;
?>

