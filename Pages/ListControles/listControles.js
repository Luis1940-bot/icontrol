// eslint-disable-next-line no-unused-vars, import/extensions
import readJSON from '../../controllers/read-JSON.js'

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
} from '../../controllers/translate.js'
// eslint-disable-next-line import/extensions
import personModal from '../../controllers/person.js'
// eslint-disable-next-line import/extensions
import {
  inicioPerformance,
  finPerformance,
} from '../../includes/Conection/conection.js'
// eslint-disable-next-line import/extensions, import/no-useless-path-segments
import { desencriptar, encriptar } from '../../controllers/cript.js'
// eslint-disable-next-line import/extensions
import cargaTabla from './controlesViews.js'
// eslint-disable-next-line import/extensions
import arrayGlobal from '../../controllers/variables.js'
// eslint-disable-next-line import/extensions
// import tablaVacia from './Modules/armadoDeTabla.js'
import baseUrl from '../../config.js'
import { Alerta } from '../../includes/atoms/alerta.js'
import { clonarCamposAReporte, nuevoCampo } from './Modules/armadoDeTabla.js'

const SERVER = baseUrl

let translateOperativo = []
let espanolOperativo = []
let translateArchivos = []
let espanolArchivos = []
const objTranslate = {
  operativoES: [],
  operativoTR: [],
  archivosES: [],
  archivosTR: [],
}

const spinner = document.querySelector('.spinner')
const objButtons = {}
const navegador = {
  estadoAnteriorButton: '',
  estadoAnteriorWhereUs: [],
}

const encabezados = {
  title: ['controles'],
  width: ['1'],
}

function leeVersion(json) {
  readJSON(json)
    .then((data) => {
      document.querySelector('.version').innerText = data.version
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error al cargar el archivo:', error)
    })
}

function trO(palabra) {
  if (palabra === undefined || palabra === null) {
    return ''
  }
  const palabraNormalizada = palabra.replace(/\s/g, '').toLowerCase()
  const index = espanolOperativo.findIndex(
    (item) =>
      item.replace(/\s/g, '').toLowerCase().trim() === palabraNormalizada.trim()
  )
  if (index !== -1) {
    return translateOperativo[index]
  }
  return palabra
}

function leeApp(json) {
  readJSON(json)
    .then((data) => {
      Object.assign(objButtons, data)
      const search = document.getElementById('search')
      search.placeholder = trO('Buscar...' || 'Buscar...')
      search.style.display = 'inline'

      const planta = objButtons.planta
      document.getElementById('spanUbicacion').textContent = planta

      cargaTabla(objTranslate)
      // navegador.estadoAnteriorButton = 'Menu'
      // navegador.estadoAnteriorWhereUs.push('Controles')
      // completaButtons('Controles')
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error al cargar el archivo:', error)
    })
}

function dondeEstaEn() {
  // const ustedEstaEn = `${trO('Usted está en')} ` || 'Usted está en ';
  // document.getElementById('whereUs').innerText = ustedEstaEn;
  let lugar = trO('Admin') || 'Admin'
  lugar = `${trO('Controles') || 'Controles'}`
  lugar = `<img src='${SERVER}/assets/img/icons8-brick-wall-50.png' height='10px' width='10px'> ${lugar}`
  document.getElementById('whereUs').innerHTML = lugar
  document.getElementById('whereUs').style.display = 'inline'
}

function cambiaColorPastillas(button) {
  const pastillas = document.querySelectorAll('.pastilla')
  pastillas.forEach((pastilla) => {
    pastilla.style.color = '#393939'
    pastilla.style.background = '#d9d9d9'
  })
  button.target.style.color = '#cecece'
  button.target.style.background = '#212121'
}

function addCampo(e) {
  cambiaColorPastillas(e)
  const idTituloDelReporte = document.getElementById('idTituloDelReporte')
  const reporte = idTituloDelReporte.textContent
  const partes = reporte.split(/-(.+)/)
  const antesDelGuion = partes[0].trim()
  const despuesDelGuion = partes[1] ? partes[1].trim() : ''
  nuevoCampo(objTranslate, { antesDelGuion, despuesDelGuion })
}

function clonarControl(e) {
  cambiaColorPastillas(e)
  const idTituloDelReporte = document.getElementById('idTituloDelReporte')
  const reporte = idTituloDelReporte.textContent
  const partes = reporte.split(/-(.+)/)
  const idLTYreporte = partes[0].trim()
  const nameReporte = partes[1] ? partes[1].trim() : ''
  const target = {
    idLTYreporte,
    nameReporte,
  }
  clonarCamposAReporte(objTranslate, target)
}

function cargaPastillas() {
  try {
    const agregar = trO('Agregar') || 'Agregar'
    const clonar = trO('Clonar') || 'Clonar'
    const pastillas = {
      clase: ['pastilla', 'pastilla'],
      text: [agregar, clonar],
      funcion: [addCampo, clonarControl],
      color: ['#212121', '#cecece'],
      background: ['#d9d9d9', '#212121'],
    }
    const divPastillas = document.querySelector('.div-pastillas')
    for (let i = 0; i < pastillas.clase.length; i++) {
      let button = document.createElement('button')
      button.setAttribute('class', pastillas.clase[i])
      button.textContent = trO(pastillas.text[i]) || pastillas.text[i]
      button.style.color = pastillas.color[i]
      button.style.background = pastillas.background[i]
      button.onclick = pastillas.funcion[i]

      divPastillas.appendChild(button)
    }
  } catch (error) {
    console.log(error)
  }
}

function configPHP(user) {
  const divVolver = document.querySelector('.div-volver')
  divVolver.style.display = 'block'
  document.getElementById('volver').style.display = 'block'
  const { developer, content, by, rutaDeveloper, logo } = user
  const metaDescription = document.querySelector('meta[name="description"]')
  metaDescription.setAttribute('content', content)
  const faviconLink = document.querySelector('link[rel="shortcut icon"]')
  faviconLink.href = `${SERVER}/assets/img/favicon.ico`
  document.title = developer
  const logoi = document.getElementById('logo_factum')
  const srcValue = `${SERVER}/assets/img/${logo}.png`
  const altValue = 'Tenki Web'
  logoi.src = srcValue
  logoi.alt = altValue
  logoi.width = 100
  logoi.height = 40
  const footer = document.getElementById('footer')
  footer.innerText = by
  footer.href = rutaDeveloper
  document.querySelector('.header-McCain').style.display = 'none'
  document.querySelector('.div-encabezado').style.marginTop = '5px'
  document.querySelector('.div-encabezadoPastillas').style.display = 'none'
}

document.addEventListener('DOMContentLoaded', async () => {
  const user = desencriptar(sessionStorage.getItem('user'))
  const { plant } = user
  inicioPerformance()
  configPHP(user)
  spinner.style.visibility = 'visible'
  const hamburguesa = document.querySelector('#hamburguesa')
  hamburguesa.style.display = 'block'

  const persona = desencriptar(sessionStorage.getItem('user'))
  if (persona) {
    document.querySelector('.custom-button').innerText =
      persona.lng.toUpperCase()
    const data = await translate(persona.lng)
    translateOperativo = data.arrayTranslateOperativo
    espanolOperativo = data.arrayEspanolOperativo

    translateArchivos = data.arrayTranslateArchivo
    espanolArchivos = data.arrayEspanolArchivo

    objTranslate.operativoES = [...espanolOperativo]
    objTranslate.operativoTR = [...translateOperativo]

    objTranslate.archivosES = [...espanolArchivos]
    objTranslate.archivosTR = [...translateArchivos]

    leeVersion('version')
    setTimeout(() => {
      dondeEstaEn()
      leeApp(`App/${plant}/app`)
      cargaPastillas()
    }, 200)
  }
  spinner.style.visibility = 'hidden'
  finPerformance()
})

document.addEventListener('DOMContentLoaded', () => {
  const person = document.getElementById('person')
  person.addEventListener('click', () => {
    person.style.border = '3px solid #212121'
    person.style.background = '#212121'
    person.style.borderRadius = '10px 10px 0px 0px'
    const persona = desencriptar(sessionStorage.getItem('user'))
    const user = {
      person: persona.person,
      home: 'Inicio',
      salir: trO('Cerrar sesión'),
    }
    personModal(user, objTranslate)
  })
})

document.addEventListener('DOMContentLoaded', () => {
  const hamburguesa = document.getElementById('hamburguesa')
  hamburguesa.addEventListener('click', () => {
    const miAlertaM = new Alerta()
    miAlertaM.createModalMenuReportes(arrayGlobal.objMenuRove, objTranslate)
    const modal = document.getElementById('modalAlertM')
    // const closeButton = document.querySelector('.modal-close')
    // closeButton.addEventListener('click', closeModal)
    document.getElementById('idDivNuevoReporte').style.display = 'none'
    modal.style.display = 'block'
  })
})

const goLanding = document.querySelector('.custom-button')
goLanding.addEventListener('click', () => {
  const url = `${SERVER}/Pages/Landing`
  window.location.href = url
})

const volver = document.getElementById('volver')
volver.addEventListener('click', () => {
  const url = `${SERVER}/Pages/Admin`
  window.location.href = url
})
