<?php
header('Content-Type: text/html;charset=utf-8');
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
  <link rel='stylesheet' type='text/css' href='./../../assets/css/header.css' media='screen'>
  <link rel='stylesheet' type='text/css' href='./../../assets/css/conection.css' media='screen'>
  <link rel='stylesheet' type='text/css' href='../../assets/css/alerta.css' media='screen'>
  <title>Factum</title>
</head>
<body>
  <?php
     include_once('../../includes/molecules/modales/modalPerson.php');
      include_once('../../includes/molecules/modales/modalMenu.php');
  ?>
  <div class='div-header'>
    <div class='headerMenu'>
      <div class='div-menu'><img id='hamburguesa'  src='./../../assets/img/hamburguesa.png' alt='Menu'></div>
    </div>
    <div class='headerVersion'>
      <span class="version">V1.0</span><img id='idSignal' src='' alt=''>
    </div>
    <div class='headerFactum'>
      <div class='logoFactum'>
        <a id='linkInstitucional' target='_blank'>
          <img id='logo_factum'>
        </a>
        </div>
    </div>
    <div class='headerLenguaje'><button class='custom-button' id='planta'></button></div>
    <div class='headerPerson'><img id='person' src='./../../assets/img/person.png' alt='Person'></div>
  </div>
  <div class='header-McCain'>
    <div class='div-McCain'>
      <img id='logo_mccain' src='./../../assets/img/logo.png' alt='McCain'>
    </div>
  </div>
</body>
</html>