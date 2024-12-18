<?php
session_start([
    // 'cookie_samesite' => 'None',
    'cookie_secure' => true  // Asegura que la cookie solo se envía sobre HTTPS
]);
header('Content-Type: text/html;charset=utf-8');
$url = "https://factumconsultora.com/mccain/index.php";
define('SSO', $_SESSION['login_sso']['sso']);
 if (isset($_SESSION['login_sso']['email'] )) {
      define('EMAIL', $_SESSION['login_sso']['email']);
  } else {
    if ( SSO === null || SSO === 's_sso' ) {
      $url = "https://factumconsultora.com/scg-mccain/Pages/Login/index.php";
      
    }
 
    // header("Location: ". $url ."");
  }
require_once './config.php';

?>
<!DOCTYPE html>
<!-- <html lang='en'> -->
<head>
  <meta charset='UTF-8'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <meta name='description' content=''>
  <meta name='author' content='Luis1940-bot'>

  <link rel='shortcut icon' type = 'image / x-icon' href='<?php echo BASE_URL ?>/assets/img/favicon.ico'>
  <link rel='stylesheet' type='text/css' href='<?php echo BASE_URL ?>/assets/css/style.css?v=<?php echo(time()); ?>' media='screen'>
  <link rel='stylesheet' type='text/css' href='<?php echo BASE_URL ?>/assets/css/spinner.css?v=<?php echo(time()); ?>' media='screen'>
  <title></title>
</head>
<body>
  <input type="hidden" id="email" value="<?php echo EMAIL; ?>">
  <div class="spinner"></div>
  <div class='headerFactum'>
      <div class='logoFactum'>
        <a id='linkInstitucional'>
          <img id='logo_png'>
        </a>
        </div>
    </div>
<script type='module' src='<?php echo BASE_URL ?>/controllers/index.js?v=<?php echo(time()); ?>'></script>
</body>
</html>
