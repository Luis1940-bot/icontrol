<?php

function sumaSimple($arr_customers) {
    try {
      // foreach ($arr_customers as $row) {
      //     echo implode(" | ", $row) . "<br>";  // Usar saltos de línea para HTML
      //     // O para consola:
      //     // echo implode(" | ", $row) . PHP_EOL; 
      // }
        // $arrayPHP = $arr_customers;
        $primerElemento = $arr_customers[0];
        $primerElementoSinUltimos4 = array_slice($primerElemento, 0, -4);
        $arrayNuevo = [$primerElementoSinUltimos4];
        $docsUnicos = [];
        foreach ($arr_customers as $key => $row) {
          if ($key === 0) {
              // Ignora la primera fila que contiene encabezados
              continue;
          }
          $doc = $row[1];
          // Agrega el valor a $docsUnicos si no existe
          if (!in_array($doc, $docsUnicos)) {
              $docsUnicos[] = $doc;
          }
        }
        
        // Recorre el array principal para cada valor único de "DOC"
        foreach ($docsUnicos as $docUnico) {
            $observaciones = '';
            $ubicacionTecica = '';
            $equipo = '';
            $componente = '';
            $tipoDeMantenimiento = '';
            $tipoDePlaneado = null;
            $pasaPlan = true;
            $yaRegistroPlan = false;
            $inicioDeParada = '';
            $finDeParada = '';
            $minutos = '';
            $paradaTotal = '';
            $LRR = '';
            $bajaDeVelocidad = '';
            $filasDocUnico = array_filter($arr_customers, function ($row) use ($docUnico) {
              return $row[1] === $docUnico;
            });
      // foreach ($filasDocUnico as $row) {
      //     echo implode(" | ", $row) . "<br>";  // Usar saltos de línea para HTML
      //     // O para consola:
      //     // echo implode(" | ", $row) . PHP_EOL; 
      // }

            foreach ($filasDocUnico as  $fila) {
              if (isset($fila[9]) && $fila[9] !== null && $fila[9] !== '' ) {
                $observacionActual  = $fila[9];
                $observaciones .= $observacionActual . '.';
              }
              $ut = preg_replace('/[^a-z0-9]+/i', '_', $fila[13]);
              // echo $ut."***\n";
              if (strtolower($ut) === 'ubicaci_u00f3n_t_u00e9cnica' || strtolower($ut) === 'ubicaci_n_t_cnica') {
                $ubicacionTecica = ($fila[14] === 's' || $fila[14] === 'sd') ? '' : $fila[14];
              }
              $eq = preg_replace('/[^a-z0-9]+/i', '_', $fila[13]);
              if (strtolower($eq) === 'denominaci_u00f3n_de_equipo' || strtolower($ut) === 'denominaci_n_de_equipo') {
                $equipo = ($fila[14] === 's' || $fila[14] === 'sd') ? '' : $fila[14];
              }
              $cp = preg_replace('/[^a-z0-9]+/i', '_', $fila[13]);
              if (strtolower($cp) === 'componente') {
                $componente = ($fila[14] === 's' || $fila[14] === 'sd') ? '' : $fila[14];
              }
            
              $planNoPlan = preg_replace('/[^a-z0-9]+/i', '_', $fila[4]);
              $pnp = preg_replace('/[^a-z0-9]+/i', '_', substr($fila[13], 0, 10));

              if (strtolower($planNoPlan) === 'planeado' && $pasaPlan === true && $yaRegistroPlan === false && (strtolower($pnp) === 'parada_de_' || strtolower($pnp) === 'parada_por')) {
                $tipoDePlaneado = $fila[13];
                $tipoDeMantenimiento = null;
                $pasaPlan = false;
              } 
     

              $tpm = preg_replace('/[^a-z0-9]+/i', '_', $fila[13]);
              if (strtolower($tpm) === 'tipos_de_mantenimiento' || strtolower($tpm) === 'tipo_de_mantenimiento') {
                $tipoDeMantenimiento = $fila[14];
              } 
              $ini = preg_replace('/[^a-z0-9]+/i', '_', $fila[13]);
              if (strtolower($ini) === 'inicio_de_parada') {
                $inicioDeParada = $fila[14];
              }
              $fin = preg_replace('/[^a-z0-9]+/i', '_', $fila[13]);
              if (strtolower($fin) === 'fin_de_parada') {
                $finDeParada = $fila[14];
                if ($inicioDeParada != $finDeParada && $inicioDeParada != null && $finDeParada != null) {
                  $dateTimeIni = DateTime::createFromFormat('H:i', $inicioDeParada);
                  $dateTimeFin = DateTime::createFromFormat('H:i', $finDeParada);
                  if ($dateTimeIni && $dateTimeFin)  {
                      if ($dateTimeFin < $dateTimeIni) {
                          $dateTimeFin->modify('+1 day'); // Sumar 24 horas a la segunda hora
                      }
                        $diferencia = $dateTimeIni->diff($dateTimeFin);
                        $minutos = $diferencia->h * 60 + $diferencia->i;
                  }
                  if ($pasaPlan === false) {
                    $yaRegistroPlan = true;
                  }
                }else{
                    $pasaPlan= true;
                  }
              }
          
              $parada = preg_replace('/[^a-z0-9]+/i', '_', $fila[13]);
              $parada_14 = $fila[14];
              if ((strtolower($parada) === 'parada_total' || strtolower($parada) === 'parada total') && $parada_14 === '1') {
                $paradaTotal = $minutos;
                $minutos = '';
              }
              $baja = preg_replace('/[^a-z0-9]+/i', '_', $fila[13]);
              $baja_14 = $fila[14];
              if ((strtolower($baja) === 'baja_en_la_velocidad' || strtolower($baja) === 'baja en la velocidad') && $baja_14 === '1') {
                $bajaDeVelocidad = $minutos;
                $minutos = '';
                 if (isset($fila[9]) && $fila[9] !== null && $fila[9] !== '' ) {
                  $LRR  = $fila[9];
                }
              }

            }

            $observaciones = ltrim($observaciones, '. ');
            $observaciones = rtrim($observaciones, ' .');

            foreach ($filasDocUnico as $fila) {
              $manto = $tipoDeMantenimiento;
              if ($tipoDeMantenimiento === null) {
                $manto = $tipoDePlaneado;
              }
                $nuevaFila = array(
                    $fila[0],  // 'FECHA' => $fila[0],
                    $fila[1],  // 'DOC' => $fila[1],
                    $fila[2],  // 'REPORTE' => $fila[2],
                    $fila[3],  // 'LÍNEA' => $fila[3],
                    $fila[4],  // 'TIPO PLAN' => $fila[4],
                    $fila[5] . ' ' . $manto,  // 'ÁREA' => $fila[5].' '.$tipoDeMantenimiento,
                    $ubicacionTecica,  // 'UBICACIÓN' => $ubicacionTecica,
                    $equipo,  // 'EQUIPO' => $equipo,
                    $componente,  // 'COMPONENTE' => $componente,
                    $observaciones,  // 'OBSERVACIONES' => $observaciones,
                    $paradaTotal,  // 'PARADA TOTAL' => $paradaTotal,
                    $bajaDeVelocidad,  // 'LRR' => $bajaDeVelocidad,
                    $LRR,  // 'BAJA DE VELOCIDAD' => $LRR,
                    // Agrega otras claves y valores según sea necesario
                );
            }
           $arrayNuevo[] = $nuevaFila;
           $tipoDeMantenimiento='';
        }
      // foreach ($filasDocUnico as $row) {
      //     echo implode(" | ", $row) . "<br>";  // Usar saltos de línea para HTML
      //     // O para consola:
      //     // echo implode(" | ", $row) . PHP_EOL; 
      // }
        // print_r($arrayNuevo);
        return $arrayNuevo;
    } catch (\Throwable $e) {
        print "Error!: " . $e->getMessage() . "<br>";
        die();
    }
}


if (basename(__FILE__) == basename($_SERVER['PHP_SELF'])) {
    header("Content-Type: application/json; charset=utf-8");

    $arr_customers = $_POST['arr_customers'];
    

    $result = sumaSimple($arr_customers);
    echo json_encode($result);
}
?>