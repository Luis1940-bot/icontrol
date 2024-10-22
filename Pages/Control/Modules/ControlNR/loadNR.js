// eslint-disable-next-line import/extensions
import traerSupervisor from '../Controladores/traerSupervisor.js'
// eslint-disable-next-line import/extensions
import { Alerta } from '../../../../includes/atoms/alerta.js'
// eslint-disable-next-line import/extensions
import objVariables from '../../../../controllers/variables.js'
// eslint-disable-next-line import/extensions, import/no-useless-path-segments
import { encriptar, desencriptar } from '../../../../controllers/cript.js'

import baseUrl from '../../../../config.js'
const SERVER = baseUrl

function columna2(tagName, type, tds, valor, datos, i, columnaTd, selDatos) {
  // console.log(tagName, type, tds, valor, datos, i, columnaTd, selDatos)

  const td = tds
  if (
    (tagName === 'INPUT' && type === 'date') ||
    (tagName === 'INPUT' && type === 'time')
  ) {
    // console.log(value)
    // console.log(valor)
    td[columnaTd].childNodes[0].value = valor
  }
  if (
    (tagName === 'INPUT' && type === 'text') ||
    (tagName === 'TEXTAREA' && type === 'textarea')
  ) {
    td[columnaTd].childNodes[0].value = valor
  }
  if (tagName === 'SELECT' && type === 'select-one') {
    if (valor) {
      let optionFound = false
      let select
      let retries = 0 // Contador para reintentos
      const maxRetries = 20 // Número máximo de reintentos
      const retryDelay = 200 // Retraso entre cada reintento (en milisegundos)

      // Función para verificar y seleccionar el valor en el select
      function checkAndSetValues() {
        select = td[columnaTd].childNodes[0] // Seleccionamos el <select> dentro del <td>
        valor === 's' || valor === 'sd' ? (valor = null) : null
        // Verificar si el select existe y si tiene opciones cargadas
        if (select && select.options.length > 0) {
          for (let m = 0; m < select.options.length; m++) {
            if (select.options[m].innerText === valor) {
              select.selectedIndex = m // Seleccionar el valor coincidente
              optionFound = true
              return // Terminar la función ya que encontramos la opción
            }
          }

          // Si no se encontró la opción, agregarla como una nueva opción
          if (!optionFound) {
            const option = document.createElement('option')
            option.value = datos[3] // Asegúrate de que 'datos.valorS[index]' existe
            option.innerText = valor
            select.appendChild(option)
            select.selectedIndex = select.options.length - 1 // Seleccionar la nueva opción
          }
        } else {
          // Si no hay opciones, reintentar hasta que estén disponibles
          if (valor && select.hasAttribute('selector') === false) {
            const option = document.createElement('option')
            option.value = datos[3] // Asegúrate de que 'datos.valorS[index]' existe
            option.innerText = valor
            select.appendChild(option)
            select.selectedIndex = select.options.length - 1 // Seleccionar la nueva opción
            return
          }
          retries++
          if (retries < maxRetries) {
            setTimeout(checkAndSetValues, retryDelay) // Reintentar después de un breve retraso
          } else {
            console.warn(
              `No se pudo cargar el select después de ${maxRetries} intentos.`
            )
          }
        }
      }

      // Iniciar la función para verificar y establecer el valor en el select
      checkAndSetValues()
    }
  }
  if (tagName === 'INPUT' && type === 'checkbox') {
    const checkbox = td[columnaTd].childNodes[0]
    valor === '1' ? (checkbox.checked = true) : (checkbox.checked = false)
  }
  if (tagName === 'BUTTON' && type === 'submit' && datos[i][23] !== '') {
    const { plant } = desencriptar(sessionStorage.getItem('user'))

    let cadenaJSON = datos[i][23]
    cadenaJSON = cadenaJSON.replace(/fileName/g, '"fileName"')
    cadenaJSON = cadenaJSON.replace(/extension/g, '"extension"')
    cadenaJSON = cadenaJSON.replace(
      /("fileName": \[.*?\])\s?("extension": \[.*?\])/,
      '$1, $2'
    )
    cadenaJSON = cadenaJSON.replace(/(\w+):/g, '"$1":')
    const objeto = JSON.parse(`{${cadenaJSON}}`)
    const cantidadDeImagenes = objeto.fileName.length
    const rutaBase = `${SERVER}/assets/Imagenes/${plant}/`
    const ul = td[3].childNodes[0]

    // eslint-disable-next-line no-plusplus
    for (let n = 0; n < cantidadDeImagenes; n++) {
      const img = new Image()
      const nombreArchivo = objeto.fileName[n]
      const extension = objeto.extension[n]
      const li = document.createElement('li')
      const fileNameWithoutExtension = nombreArchivo.replace(/\.[^.]+$/, '')
      const rutaCompleta = `${rutaBase}${nombreArchivo}`
      li.id = `li_${fileNameWithoutExtension}`
      img.setAttribute('class', 'img-select')
      img.setAttribute('data-filename', nombreArchivo)
      img.setAttribute('data-fileextension', extension)
      img.setAttribute(
        'data-fileNameWithoutExtension',
        fileNameWithoutExtension
      )
      img.addEventListener('click', () => {
        const miAlertaImagen = new Alerta()
        miAlertaImagen.createModalImagenes(objVariables.modalImagen, img)
        const modal = document.getElementById('modalAlert')
        modal.style.display = 'block'
      })
      fetch(rutaCompleta)
        .then((response) => response.blob())
        .then((blob) => {
          const reader = new FileReader()
          reader.onload = () => {
            // Establecer el atributo src con la representación base64 de la imagen
            img.src = reader.result
          }
          reader.readAsDataURL(blob)
        })
      li.appendChild(img)
      ul.appendChild(li)
    }
  }
  const tipodedato = datos[i][4]
  if (tagName === 'DIV' && tipodedato === 'cn') {
    //es una consulta cn con button
    let inputElement = document.querySelector('td div.button-cn input')
    inputElement.value = valor
  }
  if (tagName === 'DIV' && tipodedato === 'valid') {
    if (valor !== '') {
      const div = tds[2]
      while (div.firstChild) {
        div.removeChild(div.firstChild)
      }
      const tbody = document.querySelector('#tableControl tbody')
      const row = tbody.rows[index]
      if (row && row.cells.length >= 3) {
        row.cells[3].innerHTML = ''
        const previousCell = row.cells[2]
        previousCell.colSpan = (previousCell.colSpan || 1) + 1
        row.removeChild(row.cells[3])
      }
      const inputText = document.createElement('input')
      inputText.setAttribute('type', 'text')
      inputText.setAttribute('disabled', false)
      inputText.style.border = 'none'
      inputText.value = `${valor}`

      div.appendChild(inputText)
    }
  }
  if (tagName === 'INPUT' && type === 'radio') {
    const radio = td[columnaTd].childNodes[0]
    console.log(radio)
    valor === '1' ? (radio.checked = true) : (radio.checked = false)
  }
}

async function verSupervisor(idSupervisor) {
  let configMenu
  // console.log(idSupervisor, typeof idSupervisor)
  if (idSupervisor !== '0') {
    const supervisor = await traerSupervisor(idSupervisor)
    configMenu = {
      guardar: false,
      guardarComo: true,
      guardarCambios: true,
      firma: true,
      configFirma: supervisor,
    }
    sessionStorage.setItem('config_menu', encriptar(configMenu))
  } else if (idSupervisor === '0') {
    const supervisor = {
      id: 0,
      mail: '',
      mi_cfg: '',
      nombre: '',
      tipo: 0,
    }
    configMenu = {
      guardar: false,
      guardarComo: true,
      guardarCambios: true,
      firma: false,
      configFirma: supervisor,
    }
    sessionStorage.setItem('firma', encriptar('x'))
    sessionStorage.setItem('config_menu', encriptar('x'))
  }
}

function cargarNR(datos) {
  try {
    // console.log(datos)
    const idSupervisor = datos[0][6]
    const tbody = document.querySelector('tbody')
    const tr = tbody.querySelectorAll('tr')
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tr.length - 0; i++) {
      const row = tr[i]
      // console.log(row);
      const td = row.querySelectorAll('td')
      // console.log(td);
      const codigo = td[5].innerText
      const { tagName } = td[2].childNodes[0]
      const { type } = td[2].childNodes[0]
      // const { value } = td[2].childNodes[0];
      // const valor = datos[i][3]
      const tagNameObservaciones = td[4].childNodes[0].tagName
      const typeObservaciones = td[4].childNodes[0].type
      // const valueObservaciones = td[4].childNodes[0].value;
      // const valorObservaciones = datos[i][9]
      const elementoEncontrado = datos.find((subarray) => {
        return subarray.some(
          (element, i) => i === 5 && element === codigo.trim()
        )
      })
      // codigo.trim() === datos[i][5].trim()
      if (elementoEncontrado) {
        const valor = elementoEncontrado[3]
        const valorObservaciones = elementoEncontrado[9]
        columna2(tagName, type, td, valor, datos, i, 2, 12)
        columna2(
          tagNameObservaciones,
          typeObservaciones,
          td,
          valorObservaciones,
          datos,
          i,
          4,
          13,
          elementoEncontrado
        )
      }
    }
    verSupervisor(idSupervisor)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error)
  }
  // return 'ok';
}

export default cargarNR
