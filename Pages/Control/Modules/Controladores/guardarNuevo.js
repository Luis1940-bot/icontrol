// eslint-disable-next-line import/extensions
import fechasGenerator from '../../../../controllers/fechas.js';
// eslint-disable-next-line import/extensions
import respuestaColumna from './armadoDeObjetos.js';
// // eslint-disable-next-line import/extensions
// import guardaNotas from './guardaNotas.js';

function buscarEnArray(id, array) {
  const idStr = id.toString().trim();
  const resultado = array.find((registro) => registro[1] === idStr);
  return resultado;
}

function convertirObjATextPlano(data) {
  const lines = [];

  // Iterar sobre las claves del objeto
  Object.keys(data).forEach((key) => {
    // Obtener el valor asociado a la clave
    const values = data[key];

    // Crear una línea de texto concatenando la clave y sus valores
    // const line = `${key}: ${JSON.stringify(values).replace(/\\/g, '')}`;
    const line = `${key}: ${JSON.stringify(values)}`;

    // Agregar la línea al arreglo
    lines.push(line);
  });

  // Convertir el arreglo de líneas a un solo texto con saltos de línea
  const plainText = lines.join('\n');

  return plainText;
}

function tuFuncion(objetoControl, founded, planta, reporte, notificador, fechaActual, horaActual) {
  // Crea una copia del objeto para evitar modificar el parámetro directamente
  const objetoControlCopia = { ...objetoControl };
  // eslint-disable-next-line prefer-destructuring
  objetoControlCopia.email.address = founded[28];
  objetoControlCopia.email.planta = planta;
  objetoControlCopia.email.titulo = 'Notificación del sistema de alerta';
  objetoControlCopia.email.reporte = reporte;
  objetoControlCopia.email.fecha = fechaActual;
  objetoControlCopia.email.hora = horaActual;
  objetoControlCopia.email.notificador = notificador;
  objetoControlCopia.email.url = 'https://factumconsultora.com/';

  // Puedes retornar la copia del objeto si es necesario
  return objetoControlCopia;
}

function recorroTable(objetoControl, arrayControl) {
  try {
    const idPerson = document.getElementById('sessionIdPerson').textContent;
    // const email = document.getElementById('idCheckBoxEmail').checked;
    const url = new URL(window.location.href);
    const controlN = url.searchParams.get('control_N');
    // const controlT = url.searchParams.get('control_T');
    // const numberDoc = document.getElementById('numberDoc').textContent;
    const tbody = document.querySelector('tbody');
    const tr = tbody.querySelectorAll('tr');
    let estanTodosLosRequeridos = true;
    let supervisor = JSON.parse(localStorage.getItem('firmado'));
    supervisor.id === 0 ? supervisor = 0 : supervisor = Number(supervisor.id);
    let founded;
    let fechaActual = '';
    let horaActual = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tr.length; i++) {
      let valor;
      let selector1;
      let selector2;
      let valorS;
      let valorOBS;
      let familiaselector;
      // let imagenes;
      let observacion;
      let respuesta;
      const td = tr[i].querySelectorAll('td');
      // eslint-disable-next-line no-unused-vars
      const displayRow = window.getComputedStyle(tr[i]).display;
      // eslint-disable-next-line no-plusplus
      for (let c = 2; c <= 4; c += 2) {
        const displayCell = window.getComputedStyle(td[c]).display;
        const element = td[c];
        const campo = td[1];
        const node = element.childNodes[0];
        const datoCelda = element.childNodes[0].data;
        const valueCelda = element.childNodes[0].value;
        const colspanValue = td[1].getAttribute('colspan');
        const inputElement = element.querySelector('input');
        const { nodeType } = node;
        const { type } = node;
        const { tagName } = node;
        let childeNode0;
        let inputmode;
        let select;
        const checkbox = node.checked;
        const radio = node.checked;
        let divConsultas;
        let liImages;
        const selector = null;
        const terceraColumna = td[3].firstChild;

        let imagenes = {
          src: [],
          fileName: [],
          extension: [],
        };

        const objParametros = {
          displayCell,
          element,
          node,
          datoCelda,
          valueCelda,
          colspanValue,
          inputElement,
          nodeType,
          type,
          tagName,
          inputmode,
          childeNode0,
          select,
          checkbox,
          radio,
          divConsultas,
          liImages,
          selector,
          imagenes,
          terceraColumna,
        };

        if (c === 2) {
          respuesta = respuestaColumna(c, i, objParametros);
          ({
            valor, selector1, valorS, familiaselector,
          } = respuesta);
        }
        if (c === 4) {
          respuesta = respuestaColumna(c, i, objParametros);
          ({
            selector2, valorOBS, familiaselector, imagenes, observacion,
          } = respuesta);
        }

        if (c === 4) {
          founded = buscarEnArray(td[5].textContent, arrayControl);
          objetoControl.name.push(campo.textContent);
          fechaActual = fechasGenerator.fecha_corta_yyyymmdd(new Date());
          horaActual = fechasGenerator.hora_actual(new Date());
          objetoControl.fecha.push(fechaActual);
          objetoControl.nuxpedido.push(0);
          valor !== null ? objetoControl.valor.push(valor) : objetoControl.valor.push(founded[5]);
          objetoControl.desvio.push(founded[2]);
          objetoControl.idusuario.push(idPerson);
          objetoControl.tipodedato.push(founded[5]);
          objetoControl.idLTYreporte.push(controlN);
          objetoControl.idLTYcontrol.push(founded[1]);
          // eslint-disable-next-line max-len
          supervisor === 0 ? objetoControl.supervisor.push(0) : objetoControl.supervisor.push(supervisor);
          objetoControl.tpdeobserva.push(founded[9]);
          // eslint-disable-next-line max-len
          selector1 !== null ? objetoControl.selector.push(selector1) : objetoControl.selector.push(0);
          // eslint-disable-next-line max-len
          selector2 !== null ? objetoControl.selector2.push(selector2) : objetoControl.selector2.push(0);
          objetoControl.valorS.push(valorS);
          objetoControl.valorOBS.push(valorOBS);
          objetoControl.familiaselector.push(familiaselector);
          objetoControl.observacion.push(observacion);
          objetoControl.requerido.push(founded[21]);
          if (imagenes.src.length > 0) {
            const convertido = convertirObjATextPlano(imagenes);
            objetoControl.imagenes.push(convertido);
            objetoControl.objImagen.push(imagenes);
          } else {
            objetoControl.imagenes.push('');
          }
          objetoControl.displayRow.push(displayRow);
          objetoControl.detalle.push(terceraColumna.textContent);

          // console.log(typeof founded[21], founded[21], valor);
          if (founded[21] === '0' || founded[21] === null || founded[21] === undefined) {
            estanTodosLosRequeridos = true;
          }
          if (founded[21] === '1' && (valor === '' || valor === null || valor === undefined)) {
            estanTodosLosRequeridos = false;
            const requerido = {
              requerido: false,
              fila: i,
              idLTYcontrol: founded[1],
            };
            localStorage.setItem('requerido', JSON.stringify(requerido));
            return false;
          // eslint-disable-next-line max-len
          }
        }
      }
    }

    // console.log(objetoMemoria);
    // console.log(objetoControl)
    // console.log(arrayControl);
    // console.log(estanTodosLosRequeridos)
    const planta = document.getElementById('planta').textContent;
    const reporte = document.getElementById('wichC').textContent;
    const notificador = document.getElementById('sessionPerson').textContent;

    // eslint-disable-next-line no-unused-vars, max-len
    const objetoControlModificado = tuFuncion(objetoControl, founded, planta, reporte, notificador, fechaActual, horaActual);
    if (estanTodosLosRequeridos) {
      const requerido = {
        requerido: true,
        fila: 0,
        idLTYcontrol: 0,
      };
      localStorage.setItem('requerido', JSON.stringify(requerido));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return true;
}
function guardarNuevo(objetoControl, arrayControl) {
  // console.log(objetoControl, arrayControl);
  return recorroTable(objetoControl, arrayControl);
}

export default guardarNuevo;
