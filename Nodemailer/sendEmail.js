import baseUrl from '../config.js'
const SERVER = baseUrl

async function send(nuevoObjeto, encabezados, plant) {
  try {
    const formData = new FormData()
    formData.append('datos', JSON.stringify(nuevoObjeto))
    formData.append('encabezados', JSON.stringify(encabezados))
    formData.append('plant', JSON.stringify(plant))
    // console.log(formData);
    const response = await fetch(`${SERVER}/Nodemailer/Routes/sendEmail.php`, {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const data = await response.json()
      return data // Devuelve la respuesta del servidor
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error)
    throw error // Re-lanza el error para que pueda ser manejado por el bloque catch en insert
  }
  return null
}

function enviaMail(datos, encabezados, plant) {
  try {
    // console.log(datos);
    const filtrados = datos.displayRow
      .map((valor, indice) => {
        const tipoDeDato = datos.tipodedato[indice]
        const campoValor = datos.valor[indice]
        let valorHtmlValor = campoValor
        const valorHtmlName = datos.name[indice]
        let valorHtmlDetalle = datos.detalle[indice]
        let valorHtmlObservacion = datos.observacion[indice]
        const image = datos.imagenes[indice]
        let colSpanName = '1'
        let colSpanValor = '1'
        let colSpanDetalle = '1'
        let colSpanObservacion = '1'
        let displayName = ''
        let displayValor = ''
        let displayDetalle = ''
        let displayObservacion = ''
        let dataURL

        if (tipoDeDato === 'b') {
          campoValor === 1
            ? (valorHtmlValor = '<input type="checkbox"  checked disabled>')
            : (valorHtmlValor = '<input type="checkbox" disabled>')
        }
        if (tipoDeDato === 'r') {
          campoValor === 1
            ? (valorHtmlValor = '<input type="radio"  checked disabled>')
            : (valorHtmlValor = '<input type="radio" disabled>')
        }
        if (
          tipoDeDato === 'x' ||
          tipoDeDato === 'btnQwery' ||
          tipoDeDato === 'img'
        ) {
          valorHtmlValor = ''
        }
        if (tipoDeDato === 'img' && image !== '') {
          valorHtmlValor = 'img'
        }
        if (tipoDeDato === 'photo') {
          valorHtmlValor = 'photo'
          displayDetalle = campoValor
        }
        if (tipoDeDato === 's' || tipoDeDato === 'sd') {
          if (
            valorHtmlValor === '' ||
            valorHtmlValor === 's' ||
            valorHtmlValor === 'sd'
          ) {
            valorHtmlValor = ''
            valorHtmlDetalle = ''
            valorHtmlObservacion = ''
          }
        }
        if (
          tipoDeDato === 'l' ||
          tipoDeDato === 'subt' ||
          tipoDeDato === 'title'
        ) {
          valorHtmlValor = ''
          valorHtmlDetalle = ''
          valorHtmlObservacion = ''
          colSpanName = '4'
          colSpanValor = '1'
          colSpanDetalle = '1'
          colSpanObservacion = '1'
          displayValor = 'none'
          displayDetalle = 'none'
          displayObservacion = 'none'
          displayName = ''
        }

        if (valor === 'table-row') {
          return {
            name: valorHtmlName,
            valor: valorHtmlValor,
            detalle: valorHtmlDetalle,
            observacion: valorHtmlObservacion,
            colSpanName,
            colSpanValor,
            colSpanDetalle,
            colSpanObservacion,
            displayName,
            displayValor,
            displayDetalle,
            displayObservacion,
            image,
            dataURL,
          }
        }
        return null
      })
      .filter((elemento) => elemento !== null)
    // console.log(filtrados)
    // console.log(encabezados);
    const enviado = send(filtrados, encabezados, plant)
    return enviado
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }
  return null
}

export default enviaMail
