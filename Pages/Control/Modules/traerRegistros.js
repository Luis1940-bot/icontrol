export default function traerRegistros(sql) {
  // eslint-disable-next-line no-console
  console.time('miTemporizador');
  return new Promise((resolve, reject) => {
    const rax = `&new=${new Date()}`;
    const ruta = `../../../Pages/Control/Routes/traerRegistros.php?q=${sql}${rax}`;
    fetch(ruta, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
        // eslint-disable-next-line no-console
        console.timeEnd('miTemporizador');
      })
      .catch((error) => {
        reject(error);
      });
  });
}
