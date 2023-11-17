<?php
header('Content-Type: text/html;charset=utf-8');
session_start();
// if (!isset($_SESSION['factum_validation'])) {
//     unset($_SESSION['factum_validation']['email'] ); 
//     // header('Location: ../../../../404.php');
//     // exit;
// } else {
//   $_SESSION['factum_validation']['email'] = 'luisglogista@gmail.com';
//   $_SESSION['factum_validation']['plant'] = '1';
//   $_SESSION['factum_validation']['lng'] = 'es';
//   $_SESSION['factum_validation']['person'] = 'Luis Gimenez';
// }
if (!isset($_SESSION['factum_validation'])) {
    $_SESSION['factum_validation'] = array(); // Inicializar el array si no existe
    $_SESSION['factum_validation']['email'] = 'luisglogista@gmail.com';
    $_SESSION['factum_validation']['plant'] = '1';
    $_SESSION['factum_validation']['lng'] = 'es';
    $_SESSION['factum_validation']['person'] = 'Luis Gimenez';
    $_SESSION['factum_validation']['id'] = '6';
}
define('ROOT_PATH', $_SERVER['DOCUMENT_ROOT']);
define('INCLUDES', ROOT_PATH.'/includes/molecules');
?>
<!DOCTYPE html>
<!-- <html lang='en'> -->
<head>
  <meta charset='UTF-8'>
  <meta name='description' content='Factum Consultora'>
  <meta name='author' content='Luis1940-bot'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <link rel='shortcut icon' type = 'image / x-icon' href='./../../assets/img/favicon.ico'>
  <link rel='stylesheet' type='text/css' href='/Pages/Home/home.css' media='screen'>
  <link rel='stylesheet' type='text/css' href='../../assets/css/spinner.css' media='screen'>
  <title>Factum</title>
  <p id='sessionPerson' style='display: none'><?php echo $_SESSION['factum_validation']['person'] ?></p>
</head>
<body>
  <div class="spinner"></div>
  <header>
    
    <?php
      include_once(INCLUDES .'/header.php');
      include_once(INCLUDES .'/encabezado.php');
      include_once(INCLUDES .'/whereUs.php');
      
    ?>
  </header>
  <main>
    <div class='div-home-buttons'>

    </div>
  </main>
  <footer>
    <?php
      include_once(INCLUDES . '/footer.php');
    ?>
  </footer>
<script type='module' src='../../Pages/Home/home.js?v=<?php echo(rand()); ?>'></script>
</body>
</html>