<?php
header('Content-Type: text/html;charset=utf-8');

$configEmails = [
  '$Host' => 'smtp.factumconsultora.com',
  '$Username' => 'alerta.factum@factumconsultora.com',
  '$Password' => 'Factum2017admin',
  '$Port' => 25,
  '$Factum' => 'factumconsultora.com/mccain'
];

$datox ='[{"name":"DATA *","valor":"2023-12-17","detalle":"A data em que o controle se origina. ","observacion":229,"colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"HORA *","valor":"22:07","detalle":" ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"adequado ","valor":"<input type=\\"checkbox\\"  checked disabled>","detalle":"indique se você é elegível ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"amostra ","valor":229,"detalle":"indique a quantidade da amostra ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"TAREFA DE TEXTO *","valor":"Valor por defecto. Entrada manual.","detalle":"TextoTask ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"USUÁRIOS *","valor":"AGUSTÍN DARÍO VIGLIANCHINO","detalle":"escolha o usuário ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"Indique o tipo de usuário ","valor":"","detalle":"","observacion":"","colSpanName":"4","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"none","displayDetalle":"none","displayObservacion":"none","image":""},{"name":"tipo de usuário *","valor":"Supervisor","detalle":"DETALHE ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"frequência *","valor":2222,"detalle":"frequencia ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"DETALHE ","valor":"229","detalle":"detalhes ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"Nomes ","valor":"ini","detalle":"nomes x ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"isso é uma lenda ","valor":"","detalle":"","observacion":"","colSpanName":"4","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"none","displayDetalle":"none","displayObservacion":"none","image":""},{"name":"nova seleção ","valor":"","detalle":"","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"IMAGENS ","valor":"","detalle":"","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"grande quantidade ","valor":"","detalle":"consulta em lote ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"consulta em lote ","valor":"","detalle":" ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"Consulta x lote ","valor":"","detalle":" ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"consulta em lote ","valor":"","detalle":" ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"mudança ","valor":"","detalle":"","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"OTRO_USER ","valor":"","detalle":"","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""},{"name":"PLANO ","valor":"photo","detalle":"  ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"{\\"img\\": \\"consultas.png\\", \\"width\\" : 200, \\"height\\": 50}","displayObservacion":"","image":""},{"name":"OBSERVAÇÃO: ","valor":"229","detalle":"Não será visível para o usuário. ","observacion":"","colSpanName":"1","colSpanValor":"1","colSpanDetalle":"1","colSpanObservacion":"1","displayName":"","displayValor":"","displayDetalle":"","displayObservacion":"","image":""}]';

$encabezadox ='{"documento":"231218015352205","address":"luisglogista@gmail.com","fecha":"2023-12-17","hora":"21:53","notificador":"Luis Gimenez","planta":"BR","reporte":"ESPECIALIDADES DWT PLANEJADAS","titulo":"Notificação do sistema de alerta","url":"https://factumconsultora.com/mccain","fechaDeAlerta":"Data do alerta:","horaDeAlerta":"Tempo de alerta:","notifica":"Notifica","sistema":"Entre no sistema e acesse o número do documento","irA":"Vai","concepto":"CONCEITO","relevamiento":"LEVANTAMENTO","detalle":"DETALHE","observacion":"OBSERVAÇÃO","subject":"Sistema de Alerta"}';
?>