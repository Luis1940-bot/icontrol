// eslint-disable-next-line import/extensions
import ElementGenerator from './elementGenerator.js'
// eslint-disable-next-line import/extensions
import fechasGenerator from '../../../controllers/fechas.js'
// eslint-disable-next-line import/extensions
import arrayGlobal from '../../../controllers/variables.js'
// eslint-disable-next-line import/extensions
import traerRegistros from './Controladores/traerRegistros.js'
// eslint-disable-next-line import/extensions
import { Alerta } from '../../../includes/atoms/alerta.js'
// eslint-disable-next-line import/extensions, import/no-named-as-default
import translate, {
  // eslint-disable-next-line no-unused-vars
  arrayTranslateOperativo,
  // eslint-disable-next-line no-unused-vars
  arrayEspanolOperativo,
  // eslint-disable-next-line no-unused-vars
  arrayTranslateArchivo,
  // eslint-disable-next-line no-unused-vars
  arrayEspanolArchivo,
  // eslint-disable-next-line import/extensions
} from '../../../controllers/translate.js'
// eslint-disable-next-line import/extensions
import hacerMemoria from './Controladores/hacerMemoria.js'
// eslint-disable-next-line import/extensions, import/no-useless-path-segments
import { desencriptar } from '../../../controllers/cript.js'

let data = {}
let translateOperativo = []
let espanolOperativo = []
let translateArchivo = []
let espanolArchivo = []
const objTranslate = {
  operativoES: [...translateOperativo],
  operativoTR: [...espanolOperativo],
}

const widthScreen = window.innerWidth
const widthScreenAjustado = 360 / widthScreen
let arrayWidthEncabezado
let selectDinamic
let elementHTML
let ID = 0
let fila = 0

function trO(palabra) {
  const palabraNormalizada = palabra.replace(/\s/g, '').toLowerCase()
  const index = espanolOperativo.findIndex(
    (item) => item.replace(/\s/g, '').toLowerCase() === palabraNormalizada
  )
  if (index !== -1) {
    return translateOperativo[index]
  }
  return palabra
}

function trA(palabra) {
  try {
    const palabraNormalizada = palabra.replace(/\s/g, '').toLowerCase()
    const index = espanolArchivo.findIndex(
      (item) => item.replace(/\s/g, '').toLowerCase() === palabraNormalizada
    )
    if (index !== -1) {
      return translateArchivo[index]
    }
    return palabra
  } catch (error) {
    // eslint-disable-next-line indent, no-console
    console.log(error)
    return palabra
  }
  // return palabra;
}

function estilosTheadCell(element, index) {
  const cell = document.createElement('th')
  if (index < 5) {
    cell.textContent = trO(element.toUpperCase()) || element.toUpperCase()
    cell.style.background = '#000000'
    cell.style.border = '1px solid #cecece'
    cell.style.overflow = 'hidden'
    const widthCell =
      widthScreenAjustado * widthScreen * arrayWidthEncabezado[index]
    cell.style.width = `${widthCell}px`
  } else {
    cell.style.display = 'none'
  }
  return cell
}

function encabezado(encabezados) {
  const thead = document.querySelector('thead')
  const newRow = document.createElement('tr')
  arrayWidthEncabezado = [...encabezados.width]
  encabezados.title.forEach((element, index) => {
    const cell = estilosTheadCell(element, index)
    newRow.appendChild(cell)
  })
  thead.appendChild(newRow)
}

function estilosCell(
  alignCenter,
  paddingLeft,
  type,
  datos,
  colSpan,
  fontStyle,
  fontWeight,
  background,
  colorText,
  requerido,
  display,
  enabled
) {
  const cell = document.createElement('td')
  let dato = ''
  typeof datos === 'string' && datos !== null
    ? (dato = trA(datos) || datos)
    : (dato = datos)
  if (dato !== null && type === null) {
    cell.textContent = `${dato} ${requerido}` || `${dato} ${requerido}`
  } else if (dato === null && type !== null) {
    cell.appendChild(type)
  }
  // Deshabilitar el elemento si enabled es 1
  if (type && enabled === 1) {
    type.disabled = true // Inhabilita el input, select, textarea
  } else if (type) {
    type.disabled = false // Asegura que esté habilitado si enabled no es 1
  }
  cell.style.borderBottom = '1px solid #cecece'
  // cell.style.background = background;
  cell.style.zIndex = 2
  cell.style.textAlign = alignCenter
  cell.style.paddingLeft = paddingLeft
  cell.style.fontStyle = fontStyle
  cell.style.fontWeight = fontWeight
  cell.style.color = colorText
  colSpan === 1 ? (cell.colSpan = 4) : null
  colSpan === 2 ? (cell.style.display = 'none') : null
  colSpan === 3 ? (cell.colSpan = 3) : null
  colSpan === 4 ? (cell.style.display = 'none') : null
  colSpan === 5 ? (cell.colSpan = 3) : null
  display !== null ? (cell.style.display = display) : null
  return cell
}

function estilosTbodyCell(element, index, cantidadDeRegistros) {
  const newRow = document.createElement('tr')
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 6; i++) {
    const orden = [0, 3, 4, 6, 7, 1]
    let dato = element[orden[i]]
    const tipoDeDato = element[5]
    const tipoDeObservacion = element[9]
    let enabled = 0
    let alignCenter = 'left'
    let paddingLeft = '0px'
    let colSpan = 0
    let fontStyle = 'normal'
    let fontWeight = 500
    let background = '#ffffff'
    let type = null
    let colorText = '#000000'
    let requerido = ''
    let display = null
    if (i === 0) {
      ID += 1
      dato = ID
      alignCenter = 'center'
    } else if (i === 1) {
      paddingLeft = '5px'
      element[21] === '1' ? ((colorText = '#fe0404'), (requerido = '*')) : null
    } else if (i === 2) {
      alignCenter = 'center'
    } else if (i === 4) {
      dato = ''
    } else if (i === 5) {
      display = 'none'
    }
    if (i === 1 && tipoDeDato === 'l') {
      fontStyle = 'italic'
      dato = `${dato.charAt(0).toUpperCase()}${dato.slice(1)}`
      paddingLeft = '20px'
    }
    i === 1 && (tipoDeDato === 'subt' || tipoDeDato === 'title')
      ? ((fontWeight = 700), (paddingLeft = '20px'), (background = '#f4f1f1'))
      : null

    if (
      i === 1 &&
      (tipoDeDato === 'l' || tipoDeDato === 'subt' || tipoDeDato === 'title')
    ) {
      colSpan = 1
    }
    if (
      i > 1 &&
      (tipoDeDato === 'l' || tipoDeDato === 'subt' || tipoDeDato === 'title')
    ) {
      colSpan = 2
    }
    if (i === 2 && tipoDeDato === 'photo') {
      colSpan = 5
      paddingLeft = '0px'
    }
    if (i > 2 && tipoDeDato === 'photo') {
      display = 'none'
    }
    i === 1 &&
    orden[i] === 3 &&
    tipoDeDato !== 'l' &&
    tipoDeDato !== 'subt' &&
    tipoDeDato !== 'title'
      ? (dato = dato.toUpperCase())
      : null

    if (i === 3 && tipoDeDato === 'img') {
      colSpan = 3
      dato = null
      const ul = ElementGenerator.generateUl()
      type = ul
    }
    if (i > 3 && tipoDeDato === 'img') {
      colSpan = 4
    }

    if (i === 2 && tipoDeDato === 'd') {
      dato = null
      const [valorXDefecto] = element[20] !== '' ? [element[20]] : []
      const fecha = fechasGenerator.fecha_corta_yyyymmdd(new Date())
      const width = ''
      const inputDate = ElementGenerator.generateInputDate(
        fecha,
        width,
        valorXDefecto
      )
      type = inputDate
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'h') {
      dato = null
      const [valorXDefecto] = element[20] !== '' ? [element[20]] : []
      const hora = fechasGenerator.hora_actual(new Date())
      const width = ''
      const inputHora = ElementGenerator.generateInputHora(
        hora,
        width,
        valorXDefecto
      )
      type = inputHora
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'x') {
      dato = ''
      type = null
    } else if (i === 2 && tipoDeDato === 't') {
      dato = null
      const [valorXDefecto] = element[20] !== '' ? [element[20]] : []
      const width = ''
      const inputText = ElementGenerator.generateInputText(width, valorXDefecto)
      elementHTML = inputText
      type = inputText
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'b') {
      dato = null
      let checked = false
      element[20] === '1' ? (checked = true) : (checked = false)
      const inputCheckBox = ElementGenerator.generateInputCheckBox(checked)
      type = inputCheckBox
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'n') {
      dato = null
      const [valorXDefecto] = element[20] !== '' ? [element[20]] : []
      const width = ''
      const inputNumber = ElementGenerator.generateInputNumber(
        width,
        valorXDefecto
      )
      elementHTML = inputNumber
      type = inputNumber
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'tx') {
      dato = null
      const [valorXDefecto] = element[20] !== '' ? [element[20]] : []
      const textArea = ElementGenerator.generateTextArea(valorXDefecto)
      elementHTML = textArea
      type = textArea
      const indexMas = index + 1
      indexMas === cantidadDeRegistros
        ? ((colSpan = 1), (alignCenter = 'left'), (paddingLeft = '3px'))
        : null
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'sd') {
      dato = null
      const hijo = element[24]
      const sqlHijo = element[25]
      selectDinamic = ElementGenerator.generateSelectDinamic(hijo, sqlHijo)
      type = selectDinamic
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 's') {
      dato = null
      const [valorXDefecto] = element[20] !== '' ? [element[20]] : []
      const arraySel = arrayGlobal.arraySelect.filter(
        (ele) => ele[2] === element[12]
      )
      const select = ElementGenerator.generateSelect(arraySel, valorXDefecto)
      type = select
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'img') {
      dato = null
      const text = '📸'
      const img = ElementGenerator.generateButtonImage(text, fila + 1)
      type = img
      background = 'transparent'
    } else if (i === 2 && tipoDeDato === 'cn') {
      dato = null
      let text = element[orden[1]].toUpperCase()
      const consulta = element[23] || ''
      const anchoButton =
        widthScreenAjustado * widthScreen * arrayWidthEncabezado[2] * 0.2
      const wordLenght = text.length * 7
      const caracteres = Math.ceil((wordLenght - anchoButton) / 7)
      text = `${text.substring(0, caracteres)}.`
      const inputButton = ElementGenerator.generateInputButton(
        text,
        element[orden[1]].toUpperCase(),
        consulta,
        'InputButton-transparent'
      )
      type = inputButton
    } else if (i === 2 && tipoDeDato === 'btnQwery') {
      dato = null
      let text = element[orden[1]].toUpperCase()
      const consulta = element[23] || ''
      const anchoButton =
        widthScreenAjustado * widthScreen * arrayWidthEncabezado[2] * 0.9
      const wordLenght = text.length * 7
      const caracteres = Math.ceil((wordLenght - anchoButton) / 7)
      text = `${text.substring(0, caracteres)}...`
      const buttonQuery = ElementGenerator.generateButtonQuery(
        text,
        element[orden[1]].toUpperCase(),
        consulta,
        'InputButton-transparent'
      )
      type = buttonQuery
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'r') {
      dato = null
      let checked = false
      let name = '0'
      element[20] === '1' ? (checked = true) : (checked = false)
      element[12] !== '0' ? (name = `Group${element[12]}`) : (name = '0')
      const radioButton = ElementGenerator.generateSelectedRadioButton(
        checked,
        name
      )
      type = radioButton
      element[29] === '1' ? ((background = '#cecece'), (enabled = 1)) : null
    } else if (i === 2 && tipoDeDato === 'photo') {
      dato = null
      const src = element[20]
      const alt = src.replace(/\.[^/.]+$/, '')
      const partes = element[20].split('.')
      const extension = partes.pop()
      const dimensiones = element[17]
      const { plant } = desencriptar(sessionStorage.getItem('user'))
      const img = ElementGenerator.generateImg(
        src,
        alt,
        dimensiones,
        extension,
        plant
      )
      type = img
    } else if (i === 2 && tipoDeDato === 'valid') {
      dato = null
      let text = 'VALIDAR'
      const anchoButton =
        widthScreenAjustado * widthScreen * arrayWidthEncabezado[2] * 0.2
      const wordLenght = text.length * 7
      const caracteres = Math.ceil((wordLenght - anchoButton) / 7)
      text = `${text.substring(0, caracteres)}.`
      const inputButton = ElementGenerator.generateValidButton(
        text,
        'VALIDAR',
        objTrad,
        'InputButton-transparent',
        plant,
        index
      )
      type = inputButton
    }
    if (i > 2 && tipoDeDato === 'tx') {
      const indexMas = index + 1
      indexMas === cantidadDeRegistros ? (colSpan = 2) : null
    }
    if (i === 4 && tipoDeObservacion === 'd') {
      const [valorXDefecto] = element[26] !== '' ? [element[26]] : []
      const fecha = fechasGenerator.fecha_corta_yyyymmdd(new Date())
      const width = ''
      const inputDate = ElementGenerator.generateInputDate(
        fecha,
        width,
        valorXDefecto
      )
      type = inputDate
    } else if (i === 4 && tipoDeObservacion === 'h') {
      dato = null
      const [valorXDefecto] = element[26] !== '' ? [element[26]] : []
      const hora = fechasGenerator.hora_actual(new Date())
      const width = ''
      const inputHora = ElementGenerator.generateInputHora(
        hora,
        width,
        valorXDefecto
      )
      type = inputHora
    } else if (i === 4 && tipoDeObservacion === 'x') {
      dato = ''
      type = null
    } else if (i === 4 && tipoDeObservacion === 't') {
      dato = null
      const [valorXDefecto] = element[26] !== '' ? [element[26]] : []
      const width = ''
      const inputText = ElementGenerator.generateInputText(width, valorXDefecto)
      elementHTML = inputText
      type = inputText
    } else if (i === 4 && tipoDeObservacion === 'b') {
      dato = null
      let checked = false
      element[26] === '1' ? (checked = true) : (checked = false)
      const inputCheckBox = ElementGenerator.generateInputCheckBox(checked)
      type = inputCheckBox
    } else if (i === 4 && tipoDeObservacion === 'n') {
      dato = null
      const [valorXDefecto] = element[26] !== '' ? [element[26]] : []
      const width = ''
      const inputNumber = ElementGenerator.generateInputNumber(
        width,
        valorXDefecto
      )
      elementHTML = inputNumber
      type = inputNumber
    } else if (i === 4 && tipoDeObservacion === 'tx') {
      dato = null
      const [valorXDefecto] = element[26] !== '' ? [element[26]] : []
      const textArea = ElementGenerator.generateTextArea(valorXDefecto)
      elementHTML = textArea
      type = textArea
      const indexMas = index + 1
      indexMas === cantidadDeRegistros
        ? ((colSpan = 1), (alignCenter = 'left'), (paddingLeft = '3px'))
        : null
    } else if (i === 4 && tipoDeObservacion === 'sd') {
      dato = null
      selectDinamic = ElementGenerator.generateSelectDinamic()
      type = selectDinamic
    } else if (i === 4 && tipoDeObservacion === 's') {
      dato = null
      const arraySel = arrayGlobal.arraySelect.filter(
        (ele) => ele[2] === element[15]
      )
      const select = ElementGenerator.generateSelect(arraySel)
      type = select
    } else if (i === 4 && tipoDeObservacion === 'cn') {
      dato = null
      let text = element[orden[1]].toUpperCase()
      const consulta = element[23] || ''
      const anchoButton =
        widthScreenAjustado * widthScreen * arrayWidthEncabezado[2] * 0.2
      const wordLenght = text.length * 7
      const caracteres = Math.ceil((wordLenght - anchoButton) / 7)
      text = `${text.substring(0, caracteres)}.`
      const inputButton = ElementGenerator.generateInputButton(
        text,
        element[orden[1]].toUpperCase(),
        consulta,
        'InputButton-transparent'
      )
      type = inputButton
    } else if (i === 4 && tipoDeObservacion === 'btnQwery') {
      dato = null
      let text = element[orden[1]].toUpperCase()
      const consulta = element[23] || ''
      const anchoButton =
        widthScreenAjustado * widthScreen * arrayWidthEncabezado[2] * 0.9
      const wordLenght = text.length * 7
      const caracteres = Math.ceil((wordLenght - anchoButton) / 7)
      text = `${text.substring(0, caracteres)}...`
      const buttonQuery = ElementGenerator.generateButtonQuery(
        text,
        element[orden[1]].toUpperCase(),
        consulta,
        'InputButton-transparent'
      )
      type = buttonQuery
    } else if (i === 4 && tipoDeObservacion === 'r') {
      dato = null
      let checked = false
      let name = '0'
      element[26] === '1' ? (checked = true) : (checked = false)
      element[15] !== '0' ? (name = `Group2${element[15]}`) : (name = '0')
      const radioButton = ElementGenerator.generateSelectedRadioButton(
        checked,
        name
      )
      type = radioButton
    }
    const cell = estilosCell(
      alignCenter,
      paddingLeft,
      type,
      dato,
      colSpan,
      fontStyle,
      fontWeight,
      background,
      colorText,
      requerido,
      display,
      enabled
    )
    newRow.appendChild(cell)
  }
  return newRow
}

async function traerRutina(sqli, selDinamico) {
  try {
    const sql = encodeURIComponent(sqli)
    const arraySelectDinamico = await traerRegistros(`traer_LTYsql`, `${sql}`) //encodeURIComponent
    ElementGenerator.generateOptions(arraySelectDinamico, selDinamico)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}
async function traerValorPorDefecto(sqli, tipo, html) {
  try {
    const sql = encodeURIComponent(sqli)
    if (tipo === 'n') {
      const arrayValor = await traerRegistros(`traer_LTYsql`, `${sql}`) //encodeURIComponent
      ElementGenerator.generateInputNumberQuery(arrayValor, html)
    } else if (tipo === 't' || tipo === 'tx') {
      const arrayValor = await traerRegistros(`traer_LTYsql`, `${sql}`) //encodeURIComponent
      ElementGenerator.generateInputTextQuery(arrayValor, html)
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
}

function completaTabla(arrayControl) {
  const tbody = document.querySelector('tbody')
  const cantidadDeRegistros = arrayControl.length

  const email = arrayControl[0][22]
  email === '1'
    ? sessionStorage.setItem('envia_por_email', true)
    : sessionStorage.setItem('envia_por_email', false)

  arrayControl.forEach((element, index) => {
    const unidades = parseFloat(index + 1)
    const porcentaje = parseFloat(
      unidades / parseFloat(cantidadDeRegistros + 0.2)
    )

    setTimeout(() => {
      const idSpanCarga = document.getElementById('idSpanCarga')
      idSpanCarga.innerText = `${Math.floor(porcentaje * 100)}%`
    }, 100)
    const newRow = estilosTbodyCell(element, index, cantidadDeRegistros)
    tbody.appendChild(newRow)
    fila += 1
    // ! ocultamos la columnas para la observacion
    if (element[8] === 'n') {
      const filaOculta = tbody.querySelector(`tr:nth-child(${index + 1})`)
      if (filaOculta) {
        filaOculta.style.display = 'none'
      }
      ID -= 1
    }
    // ! cargamos consultas dinamicas sd en columna 2
    if (
      element[5] === 'sd' &&
      element[8] === 's' &&
      (element[19] !== '' || element[19] !== null)
    ) {
      traerRutina(element[19], selectDinamic)
    }
    // ! cargamos valor por defecto de un sql query en columna 2
    if (element[5] === 'n' || element[5] === 't' || element[5] === 'tx') {
      if (
        element[23] !== '' &&
        element[23] !== ' ' &&
        element[23] !== null &&
        element[23] !== undefined
      ) {
        traerValorPorDefecto(element[23], element[5], elementHTML)
      }
    }
    // ! cargamos consultas dinamicas sd en columna 4
    if (element[9] === 'sd' && (element[26] !== '' || element[26] !== null)) {
      traerRutina(element[26], selectDinamic)
    }
    // ! cargamos valor por defecto de un sql query en columna 4
    if (element[9] === 'n' || element[9] === 't' || element[9] === 'tx') {
      if (
        element[27] !== '' &&
        element[27] !== ' ' &&
        element[27] !== null &&
        element[27] !== undefined
      ) {
        traerValorPorDefecto(element[27], element[9], elementHTML)
      }
    }
  })
}

async function arraysLoadTranslate() {
  const persona = desencriptar(sessionStorage.getItem('user'))
  if (persona) {
    document.querySelector('.custom-button').innerText =
      persona.lng.toUpperCase()
    data = await translate(persona.lng)
    translateOperativo = data.arrayTranslateOperativo
    espanolOperativo = data.arrayEspanolOperativo
    translateArchivo = data.arrayTranslateArchivo
    espanolArchivo = data.arrayEspanolArchivo
    const contenido = sessionStorage.getItem('contenido')
    const url = desencriptar(contenido)
    // const url = new URL(window.location.href);
    const controlT = url.control_T // url.searchParams.get('control_T');
    const controlN = url.control_N
    document.getElementById('wichC').innerText =
      `${controlN}-${trA(controlT)}` || `${controlN}-${controlT}`
  }
}

function loadTabla(arrayControl, encabezados) {
  const miAlerta = new Alerta()
  if (arrayControl.length > 0) {
    encabezado(encabezados)
    completaTabla(arrayControl, encabezados)
    const cantidadDeFilas = document.querySelector('table tbody')
    let mensaje = arrayGlobal.mensajesVarios.cargarControl.fallaCarga
    if (cantidadDeFilas.childElementCount !== arrayControl.length) {
      mensaje = trO(mensaje) || mensaje
      miAlerta.createVerde(arrayGlobal.avisoRojo, mensaje, null)
      const modal = document.getElementById('modalAlert')
      modal.style.display = 'block'
    }
    setTimeout(() => {
      hacerMemoria(arrayControl)
    }, 1000)
  } else {
    miAlerta.createVerde(arrayGlobal.avisoRojo, null, objTranslate)
    const modal = document.getElementById('modalAlert')
    modal.style.display = 'block'
  }
}

export default function tablaVacia(arrayControl, encabezados) {
  arraysLoadTranslate()
  setTimeout(() => {
    loadTabla(arrayControl, encabezados)
  }, 200)
}
