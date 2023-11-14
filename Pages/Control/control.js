// eslint-disable-next-line import/extensions
import traerRegistros from './Modules/Controladores/traerRegistros.js';
// eslint-disable-next-line import/extensions
import tablaVacia from './Modules/armadoDeTabla.js';
// eslint-disable-next-line import/extensions
import arrayGlobal from '../../controllers/variables.js';
// eslint-disable-next-line no-unused-vars, import/extensions
import readJSON from '../../controllers/read-JSON.js';
// eslint-disable-next-line import/extensions
import menuModal from '../../controllers/menu.js';
// eslint-disable-next-line import/extensions
import personModal from '../../controllers/person.js';
// eslint-disable-next-line import/extensions, import/no-named-as-default
import translate, {
  // eslint-disable-next-line no-unused-vars
  arrayTranslateOperativo,
  // eslint-disable-next-line no-unused-vars
  arrayEspanolOperativo,
// eslint-disable-next-line import/extensions
} from '../../controllers/translate.js';
// eslint-disable-next-line import/extensions
import Alerta from '../../includes/atoms/alerta.js';

let data = {};
let translateOperativo = [];
let espanolOperativo = [];
const objTranslate = {
  operativoES: [],
  operativoTR: [],
};

let controlN = '';
// let controlT = '';
let nr = 0;
const spinner = document.querySelector('.spinner');
const encabezados = {
  title: [
    'id', 'concepto', 'relevamiento', 'detalle', 'observación', 'idControl',
  ],
  width: [
    '.05', '.15', '.25', '.25', '.25', '0',
  ],
};

function leeVersion(json) {
  readJSON(json)
    .then((datas) => {
      document.querySelector('.version').innerText = datas.version;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error al cargar el archivo:', error);
    });
}

function configuracionLoad() {
  const url = new URL(window.location.href);
  controlN = url.searchParams.get('control_N');
  // controlT = url.searchParams.get('control_T');
  nr = url.searchParams.get('nr');
  nr === '0' ? nr = '-' : nr;
  document.getElementById('doc').innerText = `Doc: ${nr}`;
  // document.getElementById('wichC').innerText = controlT;
  document.getElementById('wichC').style.display = 'inline';
}

function trO(palabra) {
  const palabraNormalizada = palabra.replace(/\s/g, '').toLowerCase();
  const index = espanolOperativo.findIndex(
    (item) => item.replace(/\s/g, '').toLowerCase() === palabraNormalizada,
  );
  if (index !== -1) {
    return translateOperativo[index];
  }
  return palabra;
}

async function cargaDeRegistros() {
  const empresaData = await traerRegistros('empresa');
  arrayGlobal.arrayEmpresa = [...empresaData];

  const selectoresData = await traerRegistros(`Selectores,${controlN}`);
  arrayGlobal.arraySelect = [...selectoresData];

  const nuevoControlData = await traerRegistros(`NuevoControl,${controlN}`);
  arrayGlobal.arrayControl = [...nuevoControlData];
  tablaVacia(nuevoControlData, encabezados);
}

function mensajeDeCarga() {
  const miAlerta = new Alerta();
  const mensaje = trO(arrayGlobal.avisoCargandoControl.span.text);
  miAlerta.createControl(arrayGlobal.avisoCargandoControl, mensaje);
  const modal = document.getElementById('modalAlertCarga');
  modal.style.display = 'block';
  localStorage.setItem('loadSystem', 0);
  cargaDeRegistros();
}

async function arraysLoadTranslate() {
  const datosUser = localStorage.getItem('datosUser');
  if (datosUser) {
    const datos = JSON.parse(datosUser);
    data = await translate(datos.lng);
    translateOperativo = data.arrayTranslateOperativo;
    espanolOperativo = data.arrayEspanolOperativo;
    mensajeDeCarga();
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  spinner.style.visibility = 'visible';
  // eslint-disable-next-line no-console
  console.time('timeControl');
  try {
    const datosUser = localStorage.getItem('datosUser');
    if (datosUser) {
      const datos = JSON.parse(datosUser);
      document.querySelector('.custom-button').innerText = datos.lng.toUpperCase();
      leeVersion('version');
      const datas = await translate(datos.lng);
      translateOperativo = datas.arrayTranslateOperativo;
      espanolOperativo = datas.arrayEspanolOperativo;
      objTranslate.operativoES = [...espanolOperativo];
      objTranslate.operativoTR = [...translateOperativo];

      setTimeout(() => {
        configuracionLoad();
        // cargaDeRegistros();
        arraysLoadTranslate();
        spinner.style.visibility = 'hidden';
        // eslint-disable-next-line no-console
        console.timeEnd('timeControl');
      }, 300);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    spinner.style.visibility = 'hidden';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburguesa = document.getElementById('hamburguesa');
  hamburguesa.addEventListener('click', () => {
    menuModal(objTranslate);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const person = document.getElementById('person');
  person.addEventListener('click', () => {
    const persona = document.getElementById('sessionPerson').textContent;
    const user = {
      person: persona,
      salir: 'Cerrar sesión',
    };
    personModal(user);
  });
});

const goLanding = document.querySelector('.custom-button');
goLanding.addEventListener('click', () => {
  const url = '../Landing';
  window.location.href = url;
});
