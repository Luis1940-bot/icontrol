<?php
header("Content-Type: text/html;charset=utf-8");
// session_start();
//   if (!isset($_SESSION['factum_validation']['email'] )) {
//       unset($_SESSION['factum_validation']['email'] ); 
//   }

function verifica($q){
  // global $q;
  // $idSupervisor=urldecode($q);

  // include_once '../../../Routes/datos_base.php';
  include_once $_SERVER['DOCUMENT_ROOT']."/Routes/datos_base.php";
  $pdo = new PDO("mysql:host={$host};dbname={$dbname};port={$port};chartset={$charset}",$user,$password);
  try {

    $sql="SELECT u.idusuario, u.nombre, u.mail, u.idtipousuario, u.mi_cfg  FROM usuarios u WHERE u.idusuario=?";
    $query = $pdo->prepare($sql);
    $query->bindParam(1, $idSupervisor, PDO::PARAM_STR);
    $query->execute();
    $data = $query->fetchAll();
    // echo count($data).'<br>';
     if(count($data)!==0){          
            $response = array(
              'id' => $data[0]['idusuario'], 
              'nombre' =>  $data[0]['nombre'], 
              'mail' => $data[0]['mail'], 
              'tipo' =>  $data[0]['idtipousuario'], 
              'mi_cfg' => $data[0]['mi_cfg'],
            );
           
            echo json_encode($response);
            return $response;
        }else{

            $errorResponse = array('error' => 'Uno o más datos son incorrectos, vuelve a intentarlo.');
            echo json_encode($errorResponse);
            return $errorResponse;

        }
    
  } catch (\PDOException $e) {
            $errorResponse = array('error' => 'Error!: ' . $e->getMessage());
            echo json_encode($errorResponse);
            return $errorResponse;
  }

}

header("Content-Type: application/json; charset=utf-8");
$datos = file_get_contents("php://input");

if (empty($datos)) {
  $response = array('success' => false, 'message' => 'Faltan datos necesarios.');
  echo json_encode($response);
  exit;
}
$data = json_decode($datos, true);

error_log('JSON response: ' . json_encode($data));

if ($data !== null) {
  $q = $data['q'];
  $sql_i = $data['sql_i'];
  verifica($q, $sql_i);
} else {
  echo "Error al decodificar la cadena JSON";
}



?>