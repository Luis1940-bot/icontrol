<?php
header('Content-Type: text/html;charset=utf-8');
session_start();
 if (!isset($_SESSION['login_sso']['email'] )) {
      unset($_SESSION['login_sso']['email'] ); 
      require_once dirname(dirname(__DIR__)) . '/config.php';
      header("Location: " . BASE_URL);
    exit;
  }

require_once dirname(dirname(__DIR__)) . '/config.php';

?>
<!DOCTYPE html>
<!-- <html lang='en'> -->
<head>
  <meta charset='UTF-8'>
  <meta name='description'>
  <meta name='author' content='Luis1940-bot'>
  <meta http-equiv='X-UA-Compatible' content='IE=edge'>
  <meta name='viewport' content='width=device-width, initial-scale=1.0'>
  <link rel='shortcut icon' type = 'image / x-icon' href='<?php echo BASE_URL ?>/assets/img/favicon.ico'>
  <link rel='stylesheet' type='text/css' href='<?php echo BASE_URL ?>/Pages/ListVariables/Variables/variable.css?v=<?php echo(time()); ?>' media='screen'>
  <link rel='stylesheet' type='text/css' href='<?php echo BASE_URL ?>/assets/css/spinner.css?v=<?php echo(time()); ?>' media='screen'>
  <title></title>
</head>
<body>
  <div class="spinner"></div>
  <header>
    
    <?php
      include_once('../../includes/molecules/header.php');
      include_once('../../includes/molecules/encabezado.php');
      include_once('../../includes/molecules/whereUs.php');
    ?>
  </header>
  <main>
    <div class='div1'>
      <form id='formVariable'>
        <div class="form-group">
            <!-- selector -->
            <input type="text" id="numeroDelSelector" name="numeroDelSelector" disabled> 
            <label for="numeroDelSelector">Número del selector</label>
        </div>
        <div class="form-group">
            <!-- detalle -->
            <input type="text" id="nombreDelSelect" name="nombreDelSelect" > 
            <label for="nombreDelSelect">Nombre del selector</label>
        </div>
        <div class="form-group">
            <!-- nivel -->
            <select  id="tipodeusuario" name="tipodeusuario"></select>
            <label for="tipodeusuario">Tipo de usuario</label>
        </div>
        <div class="form-group" id="addButton">
            <!-- add -->
            <div class="input-button">
              <button class="add-button" id="buttonAgregar">+</button>
            </div>
            <label for="addVariable">Agregue variable</label>
        </div>
        <div class="form-group">
            <label id="leyenda">Acepte o cancele para agregar otras variables.</label>
        </div>
      </form>
    </div>
    <div class='div2'>
      
    </div>
  </main>
  <footer>
    <?php
      include_once('../../includes/molecules/footer.php');
    ?>
  </footer>
<script type='module' src='<?php echo BASE_URL ?>/Pages/ListVariables/Variables/variables.js?v=<?php echo(time()); ?>'></script>
</body>
</html>