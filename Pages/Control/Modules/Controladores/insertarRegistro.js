import baseUrl from '../../../../config.js'
const SERVER = baseUrl

// eslint-disable-next-line quotes
function limpiarObjeto(objeto) {
  const { displayRow, requerido, ...restoDelObjeto } = objeto
  const nuevoObjeto = {
    ...restoDelObjeto,
  }

  return nuevoObjeto
}

function insertarRegistro(objeto) {
  // eslint-disable-next-line no-console
  console.time('insert_time')
  const objLimpio = limpiarObjeto(objeto)
  const nuevoObjeto = encodeURIComponent(JSON.stringify(objLimpio))
  const ruta = `${SERVER}/Pages/Control/Routes/insert.php?v=${Math.round(
    Math.random() * 10
  )}`

  return new Promise((resolve, reject) => {
    // Realiza el fetch y maneja la lógica de la respuesta
    fetch(ruta, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `datos= ${nuevoObjeto}`,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        }
        throw new Error(`Error en la solicitud: ${response.status}`)
      })
      .then((data) => {
        if (typeof data === 'object') {
          // eslint-disable-next-line no-console
          // console.log(data);
          // eslint-disable-next-line no-console
          console.timeEnd('insert_time')
          resolve(data) // Resuelve la promesa con el valor correcto
        } else {
          throw new Error('Error en el formato JSON')
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.warn(error.message)
        // eslint-disable-next-line no-console
        console.timeEnd('insert_time')
        reject(error) // Rechaza la promesa en caso de error
      })
  })
}

export default insertarRegistro
