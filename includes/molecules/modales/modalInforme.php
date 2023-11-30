<?php
ob_start();
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
  <link rel='stylesheet' type='text/css' href='./../../assets/css/wichConsult.css' media='screen'>
  <link rel='stylesheet' type='text/css' href='./../../assets/css/modal.css' media='screen'>
  <title>Factum</title>
</head>
<body>
    <div id='myModalInforme' class='modal'>
        <div class='modal-content'>
            <span class='close' id='closeModalButton'>&times;</span>
            <div class='div-wichInforme'>
              <div class='div-wichInf'>
                <img src='../../assets/img/icons8-layers-50.png' alt='' width='10px' height='10px'>
                <span id='wichInf'></span>
              </div>
            </div>
            <table>
                <thead id="theadInforme"></thead>
                <tbody id="tbodyInforme"></tbody>
            </table>
          <footer>
          </footer>
        </div>
    </div>
</body>
</html>