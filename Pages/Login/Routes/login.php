<?php
mb_internal_encoding('UTF-8');
require_once dirname(dirname(dirname(__DIR__))) . '/config.php';



function consultar($planta, $email, $pass)
{
  try {
    include_once BASE_DIR . "/Routes/datos_base_primera.php";
    $dbnameLogin = 'mc' . $planta . '000';
    // $host = '190.228.29.59';
    // $port = 3306;
    // $user = 'fmc_oper2023';
    // $password = "0uC6jos0bnC8";
    $charset = 'utf8mb4';

    $cnn = new PDO("mysql:host={$host};dbname={$dbnameLogin};port={$port};charset={$charset}", $user, $password);
    $hash = hash('ripemd160', $pass);
    $sql = "SELECT nombre, idusuario, mail, idtipousuario, firma, qcodusuario, area, mi_cfg, activo FROM usuarios 
        WHERE mail=? and pass=?;";
    $activo = 's';
    $query = $cnn->prepare($sql);
    $query->bindParam(1, $email, PDO::PARAM_STR);
    $query->bindParam(2, $hash, PDO::PARAM_STR);

    $query->execute();
    // $data = $query->fetchAll();
    $data = $query->fetch(PDO::FETCH_ASSOC);

    $query->closeCursor();
    $pdo = null;

    if ($data) {
      // Almacena los datos en una variable para enviar como respuesta JSON
      $response = array(
        'email' => $data['mail'],
        'plant' => $planta,
        'lng' => substr($data['mi_cfg'], -2),
        'person' => $data['nombre'],
        'id' => $data['idusuario'],
        'tipo' => $data['idtipousuario'],
        'developer' => BASE_DEVELOPER,
        'content' => BASE_CONTENT,
        'logo' => BASE_LOGO,
        'by' => BASE_BY,
        'rutaDeveloper' => BASE_RUTA,
        'qcodusuario' => $data['qcodusuario'],
        'username' => $data['nombre'],
        'area' => $data['area'],
        'activo' => $data['activo'],
        'sso' => 'null',
      );

      try {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'Desconocida';
        $navegador = $_SERVER['HTTP_USER_AGENT'] ?? 'No info';
        $logCnn = new PDO("mysql:host={$host};dbname={$dbnameLogin};port={$port};charset={$charset}", $user, $password);
        $logCnn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $logCnn->prepare("INSERT INTO log_accesos (idusuario, email, planta, ip, navegador) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
          $data['idusuario'],
          $data['mail'],
          $planta,
          $ip,
          $navegador
        ]);
        $stmt = null;
        $logCnn = null;
      } catch (Throwable $logErr) {
        error_log("❌ Error al guardar log de acceso: " . $logErr->getMessage());
      }
      // Establece las variables de sesión si es necesario
      $_SESSION['login_sso']['email'] = $data['mail'];
      $_SESSION['login_sso']['plant'] = $planta;
      $_SESSION['login_sso']['lng'] = substr($data['mi_cfg'], -2);
      $_SESSION['login_sso']['person'] = $data['nombre'];
      $_SESSION['login_sso']['id'] = $data['idusuario'];
      $_SESSION['login_sso']['tipo'] = $data['idtipousuario'];
      $_SESSION['login_sso']['developer'] = BASE_DEVELOPER;
      $_SESSION['login_sso']['content'] = BASE_CONTENT;
      $_SESSION['login_sso']['logo'] = BASE_LOGO;
      $_SESSION['login_sso']['by'] = BASE_BY;
      $_SESSION['login_sso']['rutaDeveloper'] = BASE_RUTA;

      $_SESSION['login_sso']['qcodusuario'] = $data['qcodusuario'];
      $_SESSION['login_sso']['username'] = $data['nombre'];
      $_SESSION['login_sso']['area'] = $data['area'];
      if (empty($_SESSION['login_sso']['sso'])) {
        $_SESSION['login_sso']['sso'] = 'null';
      }

      // $_SESSION['factum_validation']['ticket_email'] = $email; 
      $_SESSION['factum_validation']['plant'] = $planta;
      $json = json_encode($response);
      // Antes de enviar la respuesta
      error_log('JSON response: ' . json_encode($data));
      header('Content-Type: application/json');
      echo $json;
      return $json;
    } else {
      try {
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'Desconocida';
        $navegador = $_SERVER['HTTP_USER_AGENT'] ?? 'No info';
        $motivo = 'Credenciales inválidas';
        $emailStr = is_string($email) ? $email : json_encode($email);


        $logCnn = new PDO("mysql:host={$host};dbname={$dbnameLogin};port={$port};charset={$charset}", $user, $password);
        $stmt = $logCnn->prepare("INSERT INTO log_fallos_login (email, planta, ip, navegador, motivo) VALUES (?, ?, ?, ?, ?)");
        $logCnn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt->execute([$emailStr, (int)$planta, $ip, $navegador, $motivo]);
        $stmt = null;
        $logCnn = null;
      } catch (Throwable $logErr) {
        error_log("❌ Error al guardar log de fallo login: " . $logErr->getMessage());
      }
      $response = array('success' => false, 'message' => 'Hay un dato que no es correcto.');
      echo json_encode($response);
      return $data;
    }
  } catch (\Throwable $e) {
    print "Error!: " . $e->getMessage() . "<br>";
    die();
  }
}


header("Content-Type: application/json; charset=utf-8");
$datos = file_get_contents("php://input");
// $datos = '{"planta":"1","email":"luis@factumconsultora.com","password":"4488","ruta":"/login","rax":"&new=Tue Apr 15 2025 11:30:08 GMT-0300 (hora estándar de Argentina)"}';

if (empty($datos)) {
  $response = array('success' => false, 'message' => 'Faltan datos necesarios.');
  echo json_encode($response);
  exit;
}

$data = json_decode($datos, true);

error_log('JSON response: ' . json_encode($data));

if ($data !== null) {
  // Accede a los valores
  $planta = $data['planta'];
  $email = $data['email'];
  $pass = $data['password'];
  consultar($planta, $email, $pass);
} else {
  echo "Error al decodificar la cadena JSON";
}
