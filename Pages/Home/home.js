// eslint-disable-next-line no-unused-vars, import/extensions
import readJSON from '../../controllers/read-JSON.js'
// eslint-disable-next-line import/extensions
import createButton from '../../includes/atoms/createButton.js'
// eslint-disable-next-line import/extensions, import/no-named-as-default
import translate, {
  // eslint-disable-next-line no-unused-vars
  arrayTranslateOperativo,
  // eslint-disable-next-line no-unused-vars
  arrayEspanolOperativo,
  // eslint-disable-next-line import/extensions
} from '../../controllers/translate.js'
// eslint-disable-next-line import/extensions
import personModal from '../../controllers/person.js'
// eslint-disable-next-line import/extensions
import {
  inicioPerformance,
  finPerformance,
} from '../../includes/Conection/conection.js'
// eslint-disable-next-line import/extensions
import { encriptar, desencriptar } from '../../controllers/cript.js'

let translateOperativo = []
let espanolOperativo = []
const objTranslate = {
  operativoES: [],
  operativoTR: [],
}

const spinner = document.querySelector('.spinner')
const objButtons = {}
const navegador = {
  estadoAnteriorButton: '',
  estadoAnteriorWhereUs: [],
  estadoNavButton: {},
}
const espacio = ' > '

function leeVersion(json) {
  readJSON(json)
    .then((data) => {
      document.querySelector('.version').innerText = data.version
    })
    .catch((error) => {
      console.error('Error al cargar el archivo:', error)
    })
}

function trO(palabra) {
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

function obtenerNombres(objeto, clave) {
  if (objeto.hasOwnProperty(clave) && objeto[clave].hasOwnProperty('name')) {
    return {
      name: objeto[clave].name,
      type: objeto[clave].type,
      ruta: objeto[clave].ruta,
      nivel: objeto[clave].nivel,
    }
  } else {
    for (const prop in objeto) {
      if (typeof objeto[prop] === 'object') {
        const resultadoRecursivo = obtenerNombres(objeto[prop], clave)
        if (resultadoRecursivo) {
          return resultadoRecursivo
        }
      }
    }
  }
  return null // Devuelve null si la clave no se encuentra en el objeto
}

function extraeIndice(array, clave) {
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    if (element.trim() === clave.trim()) {
      return index
    }
  }
  return -1
}

function localizador(e) {
  const lugar = trO(e.target.innerText) || e.target.innerText
  document.getElementById('whereUs').innerText += `${espacio}${lugar}`
  document.getElementById('volver').style.display = 'block'
  document.getElementById('whereUs').style.display = 'inline'
  navegador.estadoAnteriorButton = e.target.name
  navegador.estadoAnteriorWhereUs.push(e.target.name)
}

function completaButtons(obj) {
  const persona = desencriptar(localStorage.getItem('user'))
  const { tipo } = persona
  const divButtons = document.querySelector('.div-home-buttons')
  divButtons.innerHTML = ''
  document.getElementById('spanUbicacion').innerText = objButtons.planta
  for (let i = 0; i < obj.name.length; i++) {
    const { nivel } = obj
    if (nivel[i] <= parseInt(tipo)) {
      const element = obj.name[i]
      const params = {
        text: trO(element) || element,
        name: obj.name[i],
        class: 'button-selector-home',
        innerHTML: null,
        height: null, // 35
        width: null, // 75%
        borderRadius: '5px',
        border: null,
        textAlign: 'center',
        marginLeft: null,
        marginRight: null,
        marginTop: null,
        marginBotton: null,
        paddingLeft: null,
        paddingRight: null,
        paddingTop: null,
        paddingBotton: null,
        background: null,
        onClick: funcionDeClick,
      }
      const newButton = createButton(params)
      divButtons.appendChild(newButton)
    }
  }
}

function llamarCtrl(control) {
  try {
    let url = ''
    let tipoUrl = true
    if (!control) {
      url = `../../404.php`
    } else {
      url = `../../Pages/${control}`
    }
    localStorage.setItem(
      'history_pages',
      encriptar(navegador.estadoAnteriorWhereUs)
    )
    if (url.includes('?')) {
      tipoUrl = true
    } else {
      tipoUrl = false
    }
    let ruta = ''
    if (tipoUrl) {
      const [subcadena, parametros] = url.split('?')
      const pares = parametros.split('&')
      const objeto = pares.reduce((objs, par) => {
        const obj = objs
        const [clave, valor] = par.split('=')
        obj[clave] = decodeURIComponent(valor)
        return obj
      }, {})
      localStorage.setItem('contenido', encriptar(objeto))
      ruta = `${subcadena}?v=${Math.round(Math.random() * 10)}`
    } else {
      ruta = `${url}?v=${Math.round(Math.random() * 10)}`
      localStorage.setItem('contenido', encriptar('x'))
    }
    // console.log(ruta);
    window.location.href = ruta
  } catch (error) {
    console.log(error)
  }
}

const funcionDeClick = (e) => {
  const claveBuscada = e.target.name
  const indice = extraeIndice(navegador.estadoNavButton.name, claveBuscada)
  const btnCtrl = navegador.estadoNavButton.type[indice]
  const nuevoObjeto = obtenerNombres(objButtons, claveBuscada)
  localizador(e)
  if (nuevoObjeto === null) {
    const control = navegador.estadoNavButton.ruta[indice]
    llamarCtrl(control)
    return
  }
  navegador.estadoNavButton = nuevoObjeto
  if (btnCtrl === 'btn') {
    completaButtons(nuevoObjeto)
  }
}

function leeApp(json) {
  readJSON(json)
    .then((data) => {
      Object.assign(objButtons, data)
      navegador.estadoAnteriorButton = 'apps'
      navegador.estadoAnteriorWhereUs.push('apps')
      const nuevoObjeto = obtenerNombres(objButtons, 'apps')
      navegador.estadoNavButton = nuevoObjeto
      completaButtons(nuevoObjeto)
    })
    .catch((error) => {
      console.error('Error al cargar el archivo:', error)
    })
}

function dondeEstaEn() {
  const ustedEstaEn = `${trO('Usted está en')} ` || 'Usted está en '
  document.getElementById('whereUs').innerText = ustedEstaEn
}

function configPHP() {
  const user = desencriptar(localStorage.getItem('user'))
  const { developer, content, by, rutaDeveloper, logo } = user
  const metaDescription = document.querySelector('meta[name="description"]')
  metaDescription.setAttribute('content', content)
  const faviconLink = document.querySelector('link[rel="shortcut icon"]')
  faviconLink.href = './../../assets/img/favicon.ico'
  document.title = developer
  const logoi = document.getElementById('logo_factum')
  const srcValue = `./../../assets/img/${logo}.png`
  const altValue = 'Tenki Web'
  logoi.src = srcValue
  logoi.alt = altValue
  logoi.width = 100
  logoi.height = 40
  const footer = document.getElementById('footer')
  footer.innerText = by
  footer.href = rutaDeveloper
  // const linkInstitucional = document.getElementById('linkInstitucional');
  // linkInstitucional.href = 'https://www.factumconsultora.com';
}

document.addEventListener('DOMContentLoaded', async () => {
  inicioPerformance()
  configPHP()
  spinner.style.visibility = 'visible'
  const hamburguesa = document.querySelector('#hamburguesa')
  hamburguesa.style.display = 'none'
  const persona = desencriptar(localStorage.getItem('user'))
  if (persona) {
    document.querySelector('.custom-button').innerText =
      persona.lng.toUpperCase()
    const data = await translate(persona.lng)
    translateOperativo = data.arrayTranslateOperativo
    espanolOperativo = data.arrayEspanolOperativo
    objTranslate.operativoES = [...espanolOperativo]
    objTranslate.operativoTR = [...translateOperativo]
    leeVersion('version')
    setTimeout(() => {
      dondeEstaEn()
      leeApp('app')
    }, 200)
  }
  spinner.style.visibility = 'hidden'
  finPerformance()
})

function goBack() {
  try {
    let quitarCadena = ` > ${
      navegador.estadoAnteriorWhereUs[
        navegador.estadoAnteriorWhereUs.length - 1
      ]
    }`
    navegador.estadoAnteriorWhereUs.pop()
    navegador.estadoAnteriorButton =
      navegador.estadoAnteriorWhereUs[
        navegador.estadoAnteriorWhereUs.length - 1
      ]
    const clave =
      navegador.estadoAnteriorWhereUs[
        navegador.estadoAnteriorWhereUs.length - 1
      ]
    const nuevoObjeto = obtenerNombres(objButtons, clave)
    navegador.estadoNavButton = nuevoObjeto
    completaButtons(nuevoObjeto)
    const cadena = `${document.getElementById('whereUs').innerText}`
    quitarCadena = quitarCadena.replace('>', '')
    quitarCadena = trO(quitarCadena || quitarCadena)
    let nuevaCadena = cadena.replace(quitarCadena, '')
    const ultimoIndice = nuevaCadena.lastIndexOf('>')
    nuevaCadena =
      nuevaCadena.slice(0, ultimoIndice) + nuevaCadena.slice(ultimoIndice + 1)
    if (clave === 'apps') {
      nuevaCadena = trO('Usted está en' || 'Usted está en')
      document.getElementById('whereUs').style.display = 'none'
      document.getElementById('volver').style.display = 'none'
    }
    document.getElementById('whereUs').innerText = `${nuevaCadena}`
  } catch (error) {
    console.log(error)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const person = document.getElementById('person')
  person.addEventListener('click', () => {
    person.style.border = '3px solid #212121'
    person.style.background = '#212121'
    person.style.borderRadius = '10px 10px 0px 0px'
    const persona = desencriptar(localStorage.getItem('user'))
    const user = {
      person: persona.person,
      home: 'Inicio',
      salir: trO('Cerrar sesión'),
    }
    personModal(user, objTranslate)
  })
})

const volver = document.getElementById('volver')
volver.addEventListener('click', () => {
  goBack(null)
})

const goLanding = document.querySelector('.custom-button')
goLanding.addEventListener('click', () => {
  const url = '../../Pages/Landing'
  window.location.href = url
})
