/* eslint-disable prefer-const */
// eslint-disable-next-line prefer-const, import/no-mutable-exports
let arraySelect = [];
let arrayEmpresa = [];
let arrayControl = [];
let objetoControl = {
  fecha: [],
  nuxpedido: [],
  desvio: [],
  valor: [],
  idusuario: [],
  tipodedato: [],
  idLTYreporte: [],
  idLTYcontrol: [],
  supervisor: [],
  tpdeobserva: [],
  selector: [],
  selector2: [],
  valorS: [],
  valorOBS: [],
  familiaselector: [],
  observacion: [],
  imagenes: [],
  displayRow: [],
  requerido: [],
  name: [],
  email: {
    address: '',
    planta: '',
    titulo: '',
    reporte: '',
    fecha: '',
    hora: '',
    notificador: '',
    url: '',
  },
  detalle: [],
  objImagen: [],
};
let objetoMemoria = {
  fecha: [],
  nuxpedido: [],
  desvio: [],
  valor: [],
  idusuario: [],
  tipodedato: [],
  idLTYreporte: [],
  idLTYcontrol: [],
  supervisor: [],
  tpdeobserva: [],
  selector: [],
  selector2: [],
  valorS: [],
  valorOBS: [],
  familiaselector: [],
  observacion: [],
  imagenes: [],
  displayRow: [],
};

let habilitadoGuardar = false;

const funcionDeCancelar = () => {
  const modal = document.getElementById('modalAlert');
  modal.style.display = 'none';
  modal.remove();
};
const funcionDeOk = () => {
  const modal = document.getElementById('modalAlert');
  modal.style.display = 'none';
  modal.remove();
};
const funcionDeClose = () => {
  const modal = document.getElementById('modalAlert');
  modal.style.display = 'none';
  modal.remove();
};
const funcionDeCloseP = () => {
  const modal = document.getElementById('modalAlertP');
  modal.style.display = 'none';
  modal.remove();
};
const funcionDeCloseM = () => {
  const modal = document.getElementById('modalAlertM');
  modal.style.display = 'none';
  modal.remove();
};

const closeVentanaVerdeRoja = () => {
  let modal = document.getElementById('modalAlertVerde');
  modal.style.display = 'none';
  modal.remove();
  modal = document.getElementById('modalAlertM');
  modal.style.display = 'none';
  modal.remove();
};

const closeVentanaVerdeRojaImg = () => {
  const modal = document.getElementById('modalAlertVerde');
  modal.style.display = 'none';
  modal.remove();
};

const funcionLogOut = () => {
  const url = '../../../includes/molecules/logout.php';
  window.location.href = url;
};

const enviaPorEmail = (event) => {
  const { checked } = event.target;
  localStorage.setItem('envia_por_email', checked);
  const sobrecito = document.getElementById('wichCEmail');
  if (checked) {
    sobrecito.style.display = 'inline-block';
  } else {
    sobrecito.style.display = 'none';
  }
};

const arrayGlobal = {
  arraySelect,
  arrayEmpresa,
};

const objAlertaAceptarCancelar = {
  titulo: {
    text: {
      guardar: 'Guardar',
      guardarCambio: 'Guardar cambios',
      guardarComoNuevo: 'Guardar como...',
      firmar: 'Firmar',
    },
    fontSize: '20px',
    fontColor: '#212121',
    marginTop: '30px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'titulo',
    fontStyle: null,
  },
  span: {
    id: null,
    text: {
      guardar: 'Se guardará un control nuevo.',
      guardarCambio: 'Se guardarán los cambios.',
      guardarComoNuevo: 'Se hace una copia del actual.',
      firmar: 'Al firmar asegúrese de los datos conferidos.',
    },
    fontSize: '12px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'comentarios',
    fontWeight: 'bold',
    cursor: null,
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  btnaccept: {
    id: 'idAceptar',
    text: 'Aceptar',
    fontSize: '14px',
    fontColor: '#ffffff',
    backColor: '#212121',
    marginTop: '10px',
    display: 'block',
    fontWeight: 700,
    width: '100%',
    height: '40px',
    border: 'none',
    className: 'aceptar',
    cursor: 'pointer',
    borderRadius: '5px',
    hoverBackground: '#cecece',
    hoverColor: '#000000',
    marginLeft: null,
    // onClick: funcionDeAceptar,
  },
  btncancel: {
    id: 'idCancelar',
    text: 'Cancelar',
    fontSize: '14px',
    fontColor: '#212121',
    backColor: '#ffffff',
    marginTop: '10px',
    display: 'block',
    fontWeight: 700,
    width: '100%',
    height: '40px',
    border: '3px solid #000000',
    className: 'cancelar',
    cursor: 'pointer',
    borderRadius: '5px',
    hoverBackground: '#cecece',
    hoverColor: '#000000',
    onClick: funcionDeCancelar,
    marginLeft: null,
  },
  btnok: {
    id: null,
    text: 'Ok',
    fontSize: '14px',
    fontColor: '#ffffff',
    backColor: '#212121',
    marginTop: '10px',
    display: 'none',
    fontWeight: 700,
    width: '100%',
    height: '40px',
    border: 'none',
    className: 'ok',
    cursor: 'pointer',
    borderRadius: '5px',
    hoverBackground: '#cecece',
    hoverColor: '#000000',
    onClick: funcionDeOk,
    marginLeft: null,
  },
  divContent: {
    id: null,
    position: 'relative',
    borderRadius: '10px',
    width: '300px',
    height: '200px',
    background: '#ffffff',
    border: '3px solid #000000',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    margin: '20% auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'modal-content',
    textAlign: '',
    gap: '0px',
    top: null,
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  divButtons: {
    id: null,
    position: '',
    borderRadius: '5px',
    width: '300px',
    height: '200px',
    background: '#ffffff',
    border: 'none',
    boxShadow: '',
    margin: '0',
    display: 'block',
    flexDirection: '',
    padding: '2px 2px 2px 2px',
    overflow: 'hidden',
    className: 'div-button',
    textAlign: 'center',
    gap: '10px',
    top: null,
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#cecece',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'modal-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 20px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    fontStyle: null,
    onClick: funcionDeClose,
  },
  input: {
    id: null,
    type: null,
    name: null,
    value: null,
    className: null,
    height: '30px',
    width: '50%',
    border: null,
    checked: null,
    color: '#212121',
    backgroundColor: null,
    padding: null,
    margin: '10px auto 0px auto',
    cursor: 'text',
    borderRadius: '5px 5px 5px 5px',
    outline: null,
    boxShadow: null,
    textAlign: 'center',
    fontSize: '18px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: '700',
    fontColor: '#212121',
    hoverColor: null,
    hoverBackground: null,
    innerHTML: null,
    placeHolder: null,
    focus: null,
    onClick: null,
    onEnterPress: null,
  },
  label: {
    id: null,
    innerText: 'Hacer firmar',
    className: null,
    height: 'auto',
    width: '100%',
    border: null,
    color: null,
    backgroundColor: null,
    padding: null,
    margin: null,
    cursor: null,
    borderRadius: null,
    boxShadow: null,
    textAlign: null,
    fontSize: '10px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: '500',
    hoverColor: null,
    hoverBackground: null,
    innerHTML: null,
    onClick: null,
    active: null,
    before: null,
    after: null,
    htmlFor: null,
  },
  divCajita: {
    id: null,
    position: 'relative',
    borderRadius: null,
    width: '100%',
    height: '95px',
    background: '#ffffff',
    border: null,
    boxShadow: null,
    margin: null,
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    overflow: 'hidden',
    className: 'div-cajita',
    textAlign: 'center',
    gap: '2px',
    top: '0px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
};

const avisoVerde = {
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#ffffff',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'verde-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 10px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    onClick: closeVentanaVerdeRoja,
    fontStyle: null,
  },
  div: {
    id: null,
    position: 'relative',
    borderRadius: '10px',
    width: '305px',
    height: '100px',
    background: '#21D849',
    border: 'none',
    boxShadow: 'none',
    margin: '20% auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'div-verde',
    textAlign: '',
    gap: '0px',
    top: '550px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  span: {
    id: null,
    text: '¡Proceso completado con éxito! Todos los pasos del procedimiento se han ejecutado correctamente.',
    fontSize: '12px',
    fontColor: '#ECECEC',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: '15px 15px 15px 15px',
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
};
const avisoAmarillo = {
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#ffffff',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'verde-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 10px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    onClick: closeVentanaVerdeRoja,
    fontStyle: null,
  },
  div: {
    id: null,
    position: 'relative',
    borderRadius: '10px',
    width: '305px',
    height: '100px',
    background: '#e5a110',
    border: 'none',
    boxShadow: 'none',
    margin: '20% auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'div-verde',
    textAlign: '',
    gap: '0px',
    top: '550px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  span: {
    id: null,
    text: 'El proceso puede demorar unos instantes hasta que se visualice la imágen en la celda correpondiente.',
    fontSize: '12px',
    fontColor: '#ffffff',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: '15px 15px 15px 15px',
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
};
const avisoImagenes = {
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#ffffff',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'verde-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 10px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    fontStyle: null,
    onClick: closeVentanaVerdeRojaImg,
  },
  div: {
    id: null,
    position: 'relative',
    borderRadius: '10px',
    width: '305px',
    height: '100px',
    background: '#e5a110',
    border: 'none',
    boxShadow: 'none',
    margin: '20% auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'div-verde',
    textAlign: '',
    gap: '0px',
    top: '550px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  span: {
    id: null,
    text: 'El proceso puede demorar unos instantes hasta que se visualice la imágen en la celda correpondiente.',
    fontSize: '12px',
    fontColor: '#ffffff',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: '15px 15px 15px 15px',
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
};
const avisoRojo = {
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#ffffff',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'verde-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 10px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    fontStyle: null,
    onClick: closeVentanaVerdeRoja,
  },
  div: {
    id: null,
    position: 'relative',
    borderRadius: '10px',
    width: '305px',
    height: '100px',
    background: '#D82137',
    border: 'none',
    boxShadow: 'none',
    margin: '20% auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'div-verde',
    textAlign: '',
    gap: '0px',
    top: '550px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  span: {
    id: null,
    text: 'Hubo un error que no permite continuar con el proceso correcto.',
    fontSize: '12px',
    fontColor: '#ffffff',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: '15px 15px 15px 15px',
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
};
const avisoCargandoControl = {
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#ffffff',
    marginTop: '0px',
    display: 'none',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'verde-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '10px 10px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    fontStyle: null,
    onClick: null,
  },
  div: {
    id: null,
    position: 'relative',
    borderRadius: '10px',
    width: '305px',
    height: '100px',
    background: '#21D849',
    border: 'none',
    boxShadow: 'none',
    margin: '20% auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'div-verde',
    textAlign: '',
    gap: '0px',
    top: '550px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  span: {
    id: null,
    text: 'Aguarde unos instantes, el proceso se está ejecutando. Los controles son instrumentos digitales complejos, en la carga se controla que todo suceda según lo esperado. Gracias!',
    fontSize: '12px',
    fontColor: '#ECECEC',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: '15px 15px 15px 15px',
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  titulo: {
    text: {
      time: 'time',
    },
    fontSize: '40px',
    fontColor: '#212121',
    marginTop: '30px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'titulo',
    fontStyle: null,
  },
};
const objPerson = {
  titulo: {
    text: 'Ejemplo de Alerta',
    fontSize: '20px',
    fontColor: '#212121',
    marginTop: '30px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'titulo',
  },
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#cecece',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'modal-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0px 3px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    fontStyle: null,
    onClick: funcionDeCloseP,
  },
  divContent: {
    id: null,
    position: 'relative',
    borderRadius: '10px 0px 10px 10px',
    width: '100px',
    height: '100px',
    background: '#ffffff',
    border: '3px solid #000000',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    margin: '22px 0px 20px auto',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'modal-content',
    textAlign: '',
    gap: '0px',
    top: '0px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  user: {
    id: 'idUserPerson',
    text: '',
    fontSize: '9px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'flex-start',
    className: 'comentarios',
    fontWeight: '700',
    cursor: null,
    padding: '15px 15px 15px 1px',
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  salir: {
    id: null,
    text: '',
    fontSize: '9px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'flex-start',
    className: 'comentarios',
    fontWeight: '700',
    cursor: 'pointer',
    padding: '15px 15px 15px 1px',
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: 'red',
    hoverColor: 'blue',
    innerHTML: null,
    margin: null,
    fontStyle: null,
    onClick: funcionLogOut,
  },
  hr: {
    id: null,
    width: '90%',
    border: 'none',
    height: '1px',
    backgroundColor: '#cecece',
    marginTop: null,
  },
};
const objMenu = {
  titulo: {
    text: 'Ejemplo de Alerta',
    fontSize: '20px',
    fontColor: '#212121',
    marginTop: '30px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'titulo',
    fontStyle: null,
  },
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#cecece',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'modal-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0px 3px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    fontStyle: null,
    onClick: funcionDeCloseM,
  },
  divContent: {
    id: null,
    position: 'relative',
    borderRadius: '0px 10px 10px 10px',
    width: '200px',
    height: '300px',
    background: '#ffffff',
    border: '3px solid #000000',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    margin: '22px 0px 0px 1px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'modal-content',
    textAlign: '',
    gap: '0px',
    top: '0px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  guardar: {
    text: 'Guardar',
    id: 'idGuardar',
    fontSize: '14px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '700',
    cursor: null,
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  guardarCambio: {
    text: 'Guardar cambios',
    id: 'idGuardarCambio',
    fontSize: '14px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '700',
    cursor: 'pointer',
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  guardarComoNuevo: {
    text: 'Guardar como nuevo',
    id: 'guardarNuevo',
    fontSize: '14px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '700',
    cursor: 'pointer',
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  refresh: {
    text: 'Recargar(F5)',
    id: 'idRefresh',
    fontSize: '14px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '700',
    cursor: 'pointer',
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  salir: {
    text: 'Salir',
    id: 'idSalir',
    fontSize: '14px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '700',
    cursor: 'pointer',
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  firmar: {
    text: 'Hacer firmar',
    id: 'idFirmar',
    fontSize: '14px',
    fontColor: '#212121',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '700',
    cursor: null,
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  mensaje1: {
    text: 'Estas trabajando con un control nuevo que no se ha guardado.',
    id: 'idMensaje1',
    fontSize: '10px',
    fontColor: '#212121',
    marginTop: '10px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  mensaje2: {
    text: 'Documento no firmado digitalmente.',
    id: 'idMensaje2',
    fontSize: '10px',
    fontColor: '#212121',
    marginTop: '10px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  mensajeFirmado: {
    text: 'Firmado por',
    id: 'idMensajeFirmado',
    fontSize: '10px',
    fontColor: '#0066FF',
    marginTop: null,
    display: 'none',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: '0px 0px 2px 5px',
    fontStyle: 'italic',
  },
  divCajita: {
    id: null,
    position: 'relative',
    borderRadius: '5px 5px 5px 5px',
    width: '80%',
    height: '20px',
    background: '#ffffff',
    border: null,
    boxShadow: null,
    margin: '10px 0px 5px 0px',
    display: 'flex',
    flexDirection: null,
    padding: '5px',
    overflow: 'hidden',
    className: 'div-cajita',
    textAlign: '',
    gap: '10px',
    top: '0px',
    alignItems: null,
    hoverBackground: '#cecece',
    hoverColor: '#cecece',
    innerHTML: null,
    cursor: 'pointer',
  },
  imgGuardar: {
    id: null,
    src: '../../assets/img/icons8-save-50.png',
    className: 'img-menu',
    alt: '',
    height: 20,
    width: 20,
    marginRigth: '2px',
    filter: null,
  },
  imgGuardarComo: {
    id: null,
    src: '../../assets/img/icons8-save-50.png',
    className: 'img-menu',
    alt: '',
    height: 20,
    width: 20,
    marginRigth: '2px',
    filter: null,
  },
  imgSalir: {
    id: null,
    src: '../../assets/img/icons8-logout-26.png',
    className: 'img-menu',
    alt: '',
    height: 20,
    width: 20,
    marginRigth: '2px',
    filter: null,
  },
  imgFirmar: {
    id: null,
    src: '../../assets/img/icons8-sign-30.png',
    className: 'img-menu',
    alt: '',
    height: 20,
    width: 20,
    marginRigth: '2px',
    filter: null,
  },
  imgRefresh: {
    id: null,
    src: '../../assets/img/icons8-refresh-50.png',
    className: 'img-menu',
    alt: '',
    height: 20,
    width: 20,
    marginRigth: '2px',
    filter: null,
  },
  input: {
    id: null,
    type: null,
    name: null,
    value: null,
    className: null,
    height: '15px',
    width: '15px',
    border: null,
    checked: null,
    color: '#212121',
    backgroundColor: null,
    padding: null,
    margin: null,
    cursor: 'pointer',
    borderRadius: null,
    outline: null,
    boxShadow: null,
    textAlign: null,
    fontSize: '10px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: null,
    fontColor: '#212121',
    hoverColor: null,
    hoverBackground: null,
    innerHTML: null,
    placeHolder: null,
    focus: null,
    onClick: enviaPorEmail,
    onEnterPress: null,
  },
  label: {
    id: null,
    innerText: 'Se envía por email. Destilde para no enviar.',
    className: null,
    height: 'auto',
    width: '100%',
    border: null,
    color: null,
    backgroundColor: null,
    padding: null,
    margin: null,
    cursor: null,
    borderRadius: null,
    boxShadow: null,
    textAlign: null,
    fontSize: '10px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    fontWeight: '500',
    hoverColor: null,
    hoverBackground: null,
    innerHTML: null,
    onClick: null,
    active: null,
    before: null,
    after: null,
    htmlFor: null,
  },
  hr: {
    id: null,
    width: '85%',
    border: 'none',
    height: '1px',
    backgroundColor: '#cecece',
    marginTop: null,
  },
};
const mensajesVarios = {
  guardar: {
    esperaAmarillo: 'El proceso puede demorar unos instantes, ya que se compureban los datos inferidos.',
    sinModificaciones: 'No realizó ningún cambio a los determinados por configuración. No podrá guardar ningún control.',
    faltanRequeridos: 'Están faltando datos requeridos que no se han completado. Cierre este mensaje, complete el dato requerido y acepte nuevamente.',
  },
  cargarControl: {
    esperaVerde: 'Aguarde unos instantes, el proceso se está ejecutando. Los controles son instrumentos digitales complejos, en la carga se controla que todo suceda según lo esperado. Gracias!',
    fallaCarga: 'La tabla no se completó según lo esperado, vuelva a intentarlo.',
  },
  controlSinCambios: {
    vacioDeDatos: 'No hay modificaciones en el control que requieran ser guardadas, verifique los datos inferidos ya que los datos presentes son los estándares.',
  },
  email: {
    fechaDeAlerta: 'Fecha de alerta:',
    horaDeAlerta: 'Hora de alerta:',
    sistema: 'Entre al sistema y acceda al documento número',
    irA: 'Ir a',
    notifica: 'Notifica',
    concepto: 'Concepto',
    relevamiento: 'Relevamiento',
    detalle: 'Detalle',
    observacion: 'Observación',
  },
};
const objInforme = {
  titulo: {
    text: 'Informe:',
    id: 'idInforme',
    fontSize: '18px',
    fontColor: '#212121',
    marginTop: '5px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'titulo',
    fontWeight: '600',
    cursor: null,
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: null,
  },
  close: {
    id: null,
    text: 'x ',
    fontSize: '18px',
    fontColor: '#cecece',
    marginTop: '0px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: 'center',
    className: 'modal-close',
    fontWeight: 'bold',
    cursor: 'pointer',
    padding: '0px 3px',
    position: 'absolute',
    top: '0',
    right: '0',
    left: null,
    hoverBackground: null,
    hoverColor: 'red',
    innerHTML: '&times',
    margin: null,
    fontStyle: null,
    // onClick: funcionDeCloseInf,
  },
  divContent: {
    id: null,
    position: 'relative',
    borderRadius: '10px 10px 10px 10px',
    width: '300px',
    height: 'auto',
    background: '#ffffff',
    border: '3px solid #000000',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    margin: '30px 10px 0px 20px',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    overflow: 'hidden',
    className: 'modal-content',
    textAlign: '',
    gap: '0px',
    top: '0px',
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  encabezado: {
    titulos: ['Acción', 'Concepto', 'Anterior', 'Actual'],
    width: ['0.2', '0.2', '0.2', '0.2'],
    fontSize: '8px',
    fontWeight: '500',
  },
  celdas: {
    alignCenter: 'left',
    paddingLeft: '5px',
    colSpan: null,
    fontSize: '8px',
    fontStyle: 'normal',
    fontWeight: 500,
    background: '#ffffff',
    type: null,
    colorText: '#212121',
    requerido: '',
    display: null,
    width: null,
  },
  hr: {
    id: null,
    width: '100%',
    border: 'none',
    height: '1px',
    backgroundColor: '#cecece',
    marginTop: null,
  },
  divButtons: {
    id: null,
    position: '',
    borderRadius: '5px',
    width: '100%',
    height: '50px',
    background: '#ffffff',
    border: 'none',
    boxShadow: '',
    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    padding: '2px 2px 2px 2px',
    overflow: 'hidden',
    className: 'div-button',
    textAlign: 'left',
    gap: '5px',
    top: null,
    alignItems: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    cursor: null,
  },
  btnaccept: {
    id: 'idAceptarInforme',
    text: 'Aceptar',
    fontSize: '10px',
    fontColor: '#ffffff',
    backColor: '#212121',
    marginTop: '10px',
    display: 'block',
    fontWeight: 700,
    width: '30%',
    height: '25px',
    border: 'none',
    className: 'aceptar',
    cursor: 'pointer',
    borderRadius: '5px',
    hoverBackground: '#cecece',
    hoverColor: '#000000',
    marginLeft: null,
    // onClick: funcionDeAceptar,
  },
  btncancel: {
    id: 'idCancelarInforme',
    text: 'Cancelar',
    fontSize: '10px',
    fontColor: '#212121',
    backColor: '#ffffff',
    marginTop: '10px',
    display: 'block',
    fontWeight: 700,
    width: '30%',
    height: '25px',
    border: '3px solid #000000',
    className: 'cancelar',
    cursor: 'pointer',
    borderRadius: '5px',
    hoverBackground: '#cecece',
    hoverColor: '#000000',
    marginLeft: null,
    // onClick: funcionDeCloseInf,
  },
  mensajeInfo: {
    text: 'Si los datos son correctos acepte, de lo contrario puede cancelar la operación.\n Si acepta ya no podrá deshacer la acción.',
    id: 'idMensajeInfo',
    fontSize: '9px',
    fontColor: '#212121',
    marginTop: '10px',
    display: 'block',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    alignSelf: null,
    className: 'comentarios',
    fontWeight: '500',
    cursor: null,
    padding: null,
    position: null,
    top: null,
    right: null,
    left: null,
    hoverBackground: null,
    hoverColor: null,
    innerHTML: null,
    margin: null,
    fontStyle: 'italic',
  },
  enviaPorEmail: {
    envia: 'Este control se enviará por email de acuerdo a la configuración de correos.',
    noEnvia: 'Este control NO se enviará por email.',
  },
};

export default {
  arrayGlobal,
  objAlertaAceptarCancelar,
  avisoVerde,
  avisoAmarillo,
  avisoRojo,
  objPerson,
  objMenu,
  objetoControl,
  arrayControl,
  mensajesVarios,
  objetoMemoria,
  avisoImagenes,
  avisoCargandoControl,
  objInforme,
  habilitadoGuardar,
};
