<?php 

function procesar($call, $desde, $hasta, $planta) {
  try {
    $host = "190.228.29.59"; 
    $user = "fmc_oper2023";
    $password = "0uC6jos0bnC8";
    $number = "";
    $desired_length = 4;
    while(strlen($number) + strlen($planta) < $desired_length) {
        $number .= "0"; // Agregar un cero a la cadena
    }
    $dbname = "mc" . $planta . $number;
    $port = 3306;

    $sql = "CALL ".$call."('".$desde."', '".$hasta."')";
    if ($desde === null || $hasta === null) {
      $sql = "CALL ".$call."()";
    }
    $con = mysqli_connect($host,$user,$password,$dbname);
        if (!$con) {
            // die('Could not connect: ' . mysqli_error($con));
        };
        
        mysqli_query ($con,"SET NAMES 'utf8'");
        mysqli_select_db($con,$dbname);

        $result = mysqli_query($con,$sql);
        $arr_customers = array();
        $arrayResultdo = array();
        $column_names = array();
        while ($column = mysqli_fetch_field($result)) {
            $column_names[] = $column->name;
        }
        $arr_customers[] = $column_names;

        while ($row = mysqli_fetch_assoc($result)) {
            $arr_customers[] = array_values($row);
        }

        // echo "Después de la inclusión: " . json_encode($arrayResultdo) . PHP_EOL;
        $json = json_encode($arr_customers);
        echo $json;
        mysqli_close($con);
  } catch (\Throwable $e) {
    print "Error!: ".$e->getMessage()."<br>";
    die();
  }
}

function preparaDatos($path){
  try {
    
    $path_parts = explode('/', $path);
    $largo = sizeof($path_parts);
    if ($path_parts[$largo -1] === '*') {
      $call = $path_parts[$largo -3]; // proc_TnEspecialidades
      $planta = $path_parts[$largo -2]; // 1
      $desde = null;
      $hasta = null;
    }
    if ($path_parts[$largo -1] !== '*') {
      $call = $path_parts[$largo -4]; // proc_TnEspecialidades
      $desde = $path_parts[$largo -3]; // 2024-04-01
      $hasta = $path_parts[$largo -2]; // 2024-04-10
      $planta = $path_parts[$largo -1]; // 1

      $fecha_actual = date("Y/m/d");
      $fecha_formateada = date("Y-m-d", strtotime($fecha_actual));
      // Verificar si $desde es mayor que $hasta y, en ese caso, intercambiar los valores
      if ($desde > $fecha_formateada) {
        $desde = $fecha_formateada;
      }
      if ($desde > $hasta) {
          $temp = $desde;
          $desde = $hasta;
          // $hasta = $temp;
      }
    }
    

    procesar($call, $desde, $hasta, $planta);
  } catch (\Throwable $e) {
    print "Error!: ".$e->getMessage()."<br>";
    die();
  }
}

header("Content-Type: application/json; charset=utf-8");
// $http_host = 'http://localhost:8080/Pages/Api/proc_TnEspecialidades/2024-04-01/2024-04-10/1';
$http_host = $_SERVER['HTTP_HOST'];
$url = htmlentities($_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"], ENT_QUOTES, 'UTF-8');
// echo $url;
$url_parts = parse_url($url);
$path = $url_parts['path'];
if (empty($path)) {
  $response = array('success' => false, 'message' => 'Faltan datos necesarios.');
  echo json_encode($response);
  exit;
}
if ($path !== null) {
  preparaDatos($path);
} else {
  echo "Error al decodificar la cadena JSON";
}

?>