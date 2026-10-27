# iControl — Plataforma de control operativo para Factum Consultora

## Resumen

Plataforma web de control operativo (relevamientos, reportes, controles industriales) deployada en factumconsultora.com/scg-mccain. Código procedimental PHP + JavaScript vanilla (no frameworks). Hosting en LatinCloud con panel propio (NO cPanel). Deploy manual (archivos subidos a mano, no CI/CD).

## Stack

- **Backend:** PHP procedimental. Sin frameworks, sin Composer, sin autoload.
- **Frontend:** JavaScript vanilla (ES modules), CSS propio. Sin frameworks JS.
- **Base de datos:** MySQL remota (IP 190.228.29.59). Cada planta tiene su propia BD con nombre `mc{planta}{padding_ceros}` (ej: `mc10000` para planta 1).
- **Email:** PHPMailer 6.8.0 (copia manual en `Nodemailer/PHPMailer-6.8.0/`). SMTP directo.
- **Librerías JS:** jsPDF 1.3.2 (copia manual en `Libraries/`).

## Estructura de carpetas

```
/                          # Carpeta pública (document root + /scg-mccain/)
├── index.php              # Entry point principal (requiere sesion SSO)
├── config.php             # Configuracion global: URLs, credenciales SMTP, constantes
├── .user.ini              # Configuracion PHP de produccion (display_errors Off, log_errors On)
├── Routes/
│   ├── datos_base.php     # Credenciales MySQL + mysqli_report(OFF). Incluido por casi todos los endpoints.
│   ├── datos_base_primera.php  # Credenciales MySQL para login (planta fija '0')
│   ├── Imagenes/photo_upload.php
│   └── viewJson.php
├── controllers/
│   └── index.js           # Controlador JS principal
├── Pages/
│   ├── Login/             # Login con hash ripemd160 + auditoria de accesos
│   ├── Home/              # Dashboard principal
│   ├── Control/           # Carga de controles (el modulo mas complejo)
│   │   ├── Routes/        # Endpoints PHP: traerRegistros, ix (insert), ux (update), etc.
│   │   └── Modules/       # JS: armadoDeTabla, controladores
│   ├── Controles/         # Vista de controles cargados
│   ├── ControlsView/      # Vista detalle de control
│   ├── ConsultasViews/    # Consultas con stored procedures (CALL proc_xxx)
│   ├── ListControles/     # ABM de controles
│   ├── ListReportes/      # ABM de reportes
│   ├── ListVariables/     # ABM de variables/selectores
│   ├── Rove/              # Modulo Rove (consultas especiales)
│   ├── Api/               # API externa con autenticacion HMAC-SHA256
│   ├── Admin/             # Administracion
│   ├── Landing/           # Landing page
│   ├── Menu/              # Menu de navegacion
│   └── Consultas/         # Consultas generales
├── includes/
│   ├── molecules/         # Componentes PHP reutilizables (header, footer, modales)
│   ├── atoms/alerta.js    # Sistema de alertas y envio de emails (JS principal)
│   └── Traducciones/      # Sistema de idiomas (es, br)
├── Nodemailer/
│   ├── Routes/            # sendEmail.php (activo), sendEmail-Factum.php, datos.php
│   └── PHPMailer-6.8.0/   # Libreria (NO modificar)
├── Libraries/
│   └── jsPDF-1.3.2/       # Libreria (NO modificar)
├── models/
│   ├── App/{planta}/app.json  # Configuracion por planta
│   ├── consultas/{planta}/    # Definiciones de consultas por planta
│   └── log.json
├── assets/                # CSS, imagenes, iconos, planos
└── docs/seguridad/        # Informes de seguridad (NO servir en web)
```

## Patrones del codigo

### Flujo tipico de un endpoint PHP (Routes)

1. Recibe JSON via `file_get_contents("php://input")`
2. Decodifica con `json_decode($datos, true)`
3. Incluye `Routes/datos_base.php` (que setea `$host`, `$user`, `$password`, `$dbname` basado en `$_SESSION['login_sso']['plant']`)
4. Conecta con `mysqli_connect()` (procedural) o `new PDO()` (login, insert, update)
5. Ejecuta query, arma array, devuelve `json_encode()`

### Dos estilos de conexion BD

- **mysqli procedural** (`mysqli_connect`, `mysqli_query`, `mysqli_fetch_array`): usado en la mayoria de los `traerRegistros.php`, `callProcedure.php`, `traer_rove.php`.
- **PDO** (`new PDO`, `prepare`, `bindParam`): usado en `login.php`, `ix.php`, `ux.php`, `update.php`, `insert.php`, `supervisores.php`, `traerSupervisor.php`, `guardarReporte*.php`, `addNewCampo.php`, `clonarReporte.php`.

### Insert/Update (ix.php, ux.php, update.php, insert.php)

Usan un patron de "arrays paralelos" en el JSON: cada propiedad del objeto es un array de N valores. El codigo itera con `foreach` para armar campos/interrogantes y luego un `for` para insertar N registros en `LTYregistrocontrol`. La variable `$cantidad_registros` se obtiene del `count()` del ultimo valor del foreach.

### Sesion y autenticacion

- Login setea `$_SESSION['login_sso']` con email, planta, id, tipo, etc.
- Cada pagina hace `define('SSO', $_SESSION['login_sso']['sso'] ?? null)` y redirige si no hay sesion.
- No hay middleware de autenticacion: cada pagina/endpoint verifica la sesion individualmente (o no la verifica).
- SSO toma el valor string `'null'` (no PHP null) cuando el usuario se loguea directamente.

### Flujo de entrada desde el lanzador (SSO)

1. El lanzador (`/mccain/`) autentica con Azure, valida el usuario en MySQL y arma `$_SESSION['login_sso']` con `sso = 'c_sso'`.
2. El usuario selecciona "Controles" en el Selector → navega a `/scg-mccain/`.
3. `index.php` verifica `$_SESSION['login_sso']['email']`:
   - Si existe → define `EMAIL`, carga la página, `controllers/index.js` redirige a `Pages/Router/rutas.php?ruta=home`.
   - Si no existe y `SSO` es `null` o `'s_sso'` → redirige al login propio (`/scg-mccain/Pages/Login/`).
   - Si no existe y `SSO` es `'c_sso'` → redirige al lanzador (`/mccain/index.php`).
4. La sesión se comparte por cookie `PHPSESSID` con `path=/` bajo `factumconsultora.com`.

### Precaución con controllers/index.js (ruta localhost vs producción)

`controllers/index.js` tiene dos líneas alternativas para la redirección inicial (líneas ~86-87):
- `ruta=login` → para desarrollo en localhost.
- `ruta=home` → para producción.

**Siempre verificar que `ruta=home` esté activa antes de deployar.** Error documentado: 2026-10-27, se deployó con `ruta=login` activo, lo que causaba que el usuario fuera redirigido al login en lugar del menú principal incluso con sesión SSO válida.

### API externa (Pages/Api/)

- `api.php`: autenticacion via token HMAC-SHA256 en query string (`?token=...&data=...`).
- Consumida desde `includes/atoms/alerta.js` (lineas 888-890).
- Tiene sus propias credenciales MySQL inline (no usa `datos_base.php`).
- `index_0.php`: endpoint alternativo sin autenticacion HMAC, acceso via URL path.

## Servidor de produccion

- **Hosting:** LatinCloud, panel propio (NO cPanel)
- **SAPI:** fpm-fcgi
- **Version PHP actual:** 7.4.34-dev → **migrando a 8.4.27**
- **php.ini global:** `/usr/local/php7.4/ini/default/php.ini` (no modificable)
- **php.ini local:** NO se aplica en este hosting. La configuracion va en `.user.ini`
- **Valores efectivos:** `allow_url_include Off`, `display_errors Off`, `log_errors On`, `max_execution_time 120`, `memory_limit 1024M`, `upload_max_filesize 256M`
- **Logs de error:** "Logs en Vivo" del panel de LatinCloud
- **No hay .htaccess activo** en el servidor
- **Dominio:** factumconsultora.com, ruta `/scg-mccain/`

## Migracion PHP 7.4 → 8.4 (estado: en progreso, 2026-10-27)

### Cambios ya aplicados (en repo, pendiente de subir al servidor)

1. **`mysqli_report(MYSQLI_REPORT_OFF)`** en `datos_base.php`, `datos_base_primera.php`, `api.php` — restaura comportamiento de 7.4 (false en lugar de excepciones).
2. **`if ($result === false)` check** en 11 archivos con `mysqli_query` — previene TypeError al pasar false a `mysqli_num_fields`, `mysqli_fetch_*`.
3. **`catch(\PDOException)` → `catch(\Throwable)`** en 10 archivos que usan mysqli pero tenian catch incorrecto.
4. **`count($valor)` con `is_array`** en 4 archivos de insert/update — previene TypeError de `count()` sobre escalares.
5. **`define('SSO', ... ?? null)`** en 18 archivos — evita Warning por undefined array key.
6. **`urldecode($data['sql_i'] ?? '')`** en `traerRegistros.php` — evita Deprecated de null a urldecode.
7. **`json_decode` check** en `traer_rove.php` — evita Warning de array access on null.
8. **`empty()` en login.php** — evita Warning por undefined key 'sso'.
9. **`.user.ini` creado**, **`php.ini` eliminado**.

### Fixes post-auditoría (2026-10-27, ya subidos al servidor)

10. **`controllers/index.js`** — activar `ruta=home` (producción) en lugar de `ruta=login` (localhost).
11. **`index.php`** — descomentar `header("Location: ...")` y agregar `exit()` para redirigir correctamente cuando no hay sesión SSO.

### Informe completo

Ver `docs/seguridad/revision-factum-2026-10.md` — incluye compatibilidad, seguridad (5 secciones), smoke test de 20 items.

## Seguridad (pendiente, etapa posterior)

Los hallazgos de seguridad estan documentados en `docs/seguridad/revision-factum-2026-10.md`. Resumen:

- **Credenciales MySQL hardcodeadas** en 3 archivos (`datos_base.php`, `datos_base_primera.php`, `api.php`). Mismo usuario para todo.
- **Credenciales SMTP hardcodeadas** en `config.php` y `sendEmail-Factum.php`.
- **API secret key hardcodeada** en `api.php`. Token pre-generado en `Pages/Api/.env` (rastreado por git, no en uso).
- **Sin .htaccess** — archivos .txt, .md, .env, .json accesibles publicamente.
- **`.gitignore` minimo** — no excluye archivos sensibles.
- **Sin indicios de compromiso** (webshells, codigo ofuscado, backdoors).
- **Archivos a eliminar en produccion:** `phpinfo.php`, `debug.txt`, `Session_OLD/`, archivos `*_OLD*`, `chk_4m8x2t.php`.

## Notas para desarrollo

- **Todo cambio debe funcionar en 7.4 Y 8.4** hasta que se complete la migracion.
- **No hay tests automatizados.** Verificacion manual con el smoke test.
- **Deploy manual:** se suben archivos individuales al servidor. No hay CI/CD.
- **El servidor puede tener archivos que no estan en git** (deploy manual, archivos _OLD, scripts de diagnostico).
- **Antes de subir un archivo, comparar la version del servidor** (`C:\DATOS\04.DESARROLLOS\factum_servidor\`) contra git HEAD para detectar cambios no commiteados.
- **PHPMailer y jsPDF son copias manuales**, no gestionadas por Composer/npm. No actualizar sin verificar compatibilidad.
- **Las traducciones** estan en archivos .txt en `includes/Traducciones/Archivos/` y `includes/Traducciones/Operativo/`.
