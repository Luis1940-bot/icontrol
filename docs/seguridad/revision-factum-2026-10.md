# Revisión de seguridad y compatibilidad — iControl / Factum

**Veredicto: Se puede migrar a PHP 8.4.27 después de subir los 30 archivos modificados, crear `.user.ini` y eliminar `php.ini` del servidor.** No hay bloqueantes. Los cambios aplicados son compatibles con PHP 7.4 y 8.4 simultáneamente.

- **Fecha:** 2026-10-27
- **Repositorio:** icontrol (rama `main`)
- **Hosting:** LatinCloud, panel propio (NO es cPanel). PHP corre como FPM (SAPI fpm-fcgi).
- **Carpeta pública del sitio:** `/scg-mccain/` (document root + `/scg-mccain/`)
- **Versión PHP actual:** PHP 7.4.34-dev
- **Versión objetivo:** PHP 8.4.27 mínimo (versión corregida de CVE-2026-109618 y CVE-2026-109619)
- **CVEs relevantes:** CVE-2026-109618, CVE-2026-109619 (PHP2Shell, CVSS 9.2), CVE-2026-115560
- **Configuración de producción:** `.user.ini` en carpeta pública con `display_errors = Off`, `log_errors = On`, `session.upload_progress.enabled = Off`. El `php.ini` de la carpeta pública NO se aplica (el servidor carga `/usr/local/php7.4/ini/default/php.ini`).

---

## Cambios aplicados — Lista de archivos para subir al servidor

### Tarea 1 — `mysqli_report(MYSQLI_REPORT_OFF)`

Desde PHP 8.1, mysqli lanza excepciones por defecto. Esta línea restaura el comportamiento de 7.4 (devolver `false` en lugar de lanzar excepciones).

| # | Archivo | Cambio |
|---|---------|--------|
| 1 | `Routes/datos_base.php` | Agregado `mysqli_report(MYSQLI_REPORT_OFF);` en línea 2 |
| 2 | `Routes/datos_base_primera.php` | Ídem |
| 3 | `Pages/Api/api.php` | Ídem (tiene credenciales inline, no usa datos_base.php) |

### R1 — Check `$result === false` antes de funciones mysqli

Con `MYSQLI_REPORT_OFF`, una query fallida devuelve `false`. Pasar `false` a `mysqli_num_fields()`, `mysqli_fetch_array()`, `mysqli_fetch_field()` o `mysqli_fetch_assoc()` lanza TypeError en PHP 8.0+.

| # | Archivo | Línea del check |
|---|---------|-----------------|
| 4 | `Pages/Control/Routes/traerRegistros.php` | después de `mysqli_query` (~119) |
| 5 | `Pages/Controles/Routes/traerRegistros.php` | después de `mysqli_query` (~54) |
| 6 | `Pages/ListControles/Routes/traerRegistros.php` | después de `mysqli_query` (~81) |
| 7 | `Pages/ListReportes/Routes/traerRegistros.php` | después de `mysqli_query` (~55) |
| 8 | `Pages/ListVariables/Routes/traerRegistros.php` | después de `mysqli_query` (~72) |
| 9 | `Pages/ListControles/Routes/traerLTYcontrol.php` | después de `mysqli_query` (~37) |
| 10 | `Pages/ConsultasViews/Routes/callProcedure.php` | después de `mysqli_query` (~30) |
| 11 | `Pages/Api/api.php` | después de `mysqli_query` (~45) |
| 12 | `Pages/Api/index_0.php` | después de `mysqli_query` (~25) |
| 13 | `Pages/ControlsView/Routes/traerRegistros.php` | después de `mysqli_query` (~93) |
| 14 | `Pages/Rove/Routes/traer_rove.php` | después de `mysqli_query` (~28) |

Patrón aplicado en todos: `if ($result === false) { error_log('Query fallida: ' . mysqli_error($con)); echo json_encode(array()); mysqli_close($con); exit; }`

### R2 — `catch(\PDOException)` → `catch(\Throwable)`

En archivos que usan mysqli pero tenían `catch(\PDOException)`. Un TypeError de mysqli no sería capturado por PDOException.

| # | Archivo | Línea |
|---|---------|-------|
| 15 | `Pages/Control/Routes/traerRegistros.php` | ~135 |
| 16 | `Pages/Controles/Routes/traerRegistros.php` | ~71 |
| 17 | `Pages/ControlsView/Routes/traerRegistros.php` | ~113 |
| 18 | `Pages/ListControles/Routes/traerRegistros.php` | ~98 |
| 19 | `Pages/ListControles/Routes/traerLTYcontrol.php` | ~54 |
| 20 | `Pages/ListReportes/Routes/traerRegistros.php` | ~72 |
| 21 | `Pages/ListVariables/Routes/traerRegistros.php` | ~89 |
| 22 | `Pages/ConsultasViews/Routes/callProcedure.php` | ~70 |
| 23 | `Pages/Api/index_0.php` | ~42 |
| 24 | `Pages/Control/Routes/traerSupervisor.php` | ~42 |

### R3 — `count($valor)` con verificación `is_array`

En PHP 8.0+, `count()` sobre un escalar lanza TypeError. Se conserva el comportamiento de 7.4 (`count()` sobre escalar devolvía 1, sobre null devolvía 0).

| # | Archivo | Línea |
|---|---------|-------|
| 25 | `Pages/Control/Routes/ix.php` | 30 |
| 26 | `Pages/Control/Routes/ux.php` | 21 |
| 27 | `Pages/Control/Routes/update.php` | 47 |
| 28 | `Pages/Control/Routes/insert.php` | 31 |

Patrón: `$cantidad_registros = is_array($valor) ? count($valor) : ($valor === null ? 0 : 1);`

### A1 — `urldecode(null)` → `?? ''`

| # | Archivo | Línea |
|---|---------|-------|
| 29 | `Pages/Control/Routes/traerRegistros.php` | 159 |

### A2 — `define('SSO', ... ?? null)`

| # | Archivo |
|---|---------|
| 30 | `index.php` |
| 31 | `Pages/Login/index.php` |
| 32 | `Pages/Home/index.php` |
| 33 | `Pages/Rove/index.php` |
| 34 | `Pages/ListVariables/variables.php` |
| 35 | `Pages/ConsultasViews/viewsGral.php` |
| 36 | `Pages/Menu/index.php` |
| 37 | `includes/molecules/logout.php` |
| 38 | `Pages/ListControles/index.php` |
| 39 | `Pages/ControlsView/index.php` |
| 40 | `Pages/Consultas/index.php` |
| 41 | `Pages/Landing/index.php` |
| 42 | `Pages/Admin/index.php` |
| 43 | `Pages/Controles/index.php` |
| 44 | `Pages/ListVariables/index.php` |
| 45 | `Pages/ListReportes/index.php` |
| 46 | `Pages/ListReportes/Reporte/index.php` |
| 47 | `Pages/Control/index.php` |

### A3 — `json_decode` check en traer_rove.php

| # | Archivo | Línea |
|---|---------|-------|
| 48 | `Pages/Rove/Routes/traer_rove.php` | 20–22 |

### Tarea 3 — Configuración

| # | Archivo | Acción |
|---|---------|--------|
| 49 | `php.ini` | **ELIMINAR** del servidor y del repo |
| 50 | `.user.ini` | **CREAR** en la raíz de la carpeta pública |

### Resumen de conteo

- **30 archivos PHP modificados** (archivos únicos, descontando repeticiones entre tareas)
- **1 archivo creado:** `.user.ini`
- **1 archivo eliminado:** `php.ini`
- **Total: 32 acciones sobre archivos**

### Lint PHP 8.4.27

Se verificaron 95 archivos PHP con `C:\php84\php.exe -l` (código propio + Nodemailer/Routes/, excluidas librerías de terceros). **0 errores de sintaxis.**

### Archivos con cambios previos (no de esta sesión)

Dos archivos tienen cambios previos al repo mezclados con los de migración:

- **`index.php`**: reformateo, eliminación de `var_dump(SSO)` y `var_dump($_SESSION)`. Estos cambios ya estaban en el servidor de producción.
- **`Pages/Control/Routes/traerRegistros.php`**: reformateo de indentación, agregado de `error_reporting(0)` e `ini_set('display_errors', 0)`. Estos cambios ya estaban en el servidor de producción.

Ambos archivos son seguros de subir: coinciden con el estado actual del servidor + los fixes de migración.

### Archivo que NO se sube

- **`Pages/Login/Routes/login.php`**: tiene funcionalidad de auditoría de login (tablas `log_accesos` y `log_fallos_login`) en el servidor que NO está en git HEAD. No fue tocado por esta sesión. Se maneja por separado.

---

## Smoke test post-migración a PHP 8.4

Ejecutar **después de subir los archivos y antes de cambiar la versión de PHP** (verificar en 7.4), y **después de cambiar a 8.4.27**:

| # | Ítem | Ruta / Acción | Resultado esperado | Origen |
|---|------|---------------|-------------------|--------|
| 1 | Login con credenciales válidas | `Pages/Login/index.php` → ingresar email + password | Redirige a la pantalla principal con sesión activa | Base |
| 2 | Login con credenciales inválidas | Ingresar email incorrecto | Muestra mensaje de error, no stack trace ni TypeError | Base |
| 3 | Carga de la página principal | `index.php` | Renderiza header, logo, spinner y carga JS sin errores | Base |
| 4 | **Acceso sin sesión (SSO null)** | Abrir `index.php` en navegador limpio (sin cookies) | Redirige a login, no muestra TypeError por `$_SESSION` | **A2** |
| 5 | Traducción (cambio de idioma) | Cambiar idioma a portugués (BR) | Textos cambian al idioma seleccionado | Base |
| 6 | Listado de controles (traerRegistros) | `Pages/Control/` → cargar tabla | Tabla se arma correctamente con datos de la BD | Base |
| 7 | **Consulta con `sql_i = null`** | Ejecutar consulta donde `sql_i` no aplica (ej: `empresa` o `countSelect`) | No debe aparecer warning ni TypeError por `urldecode(null)` | **A1** |
| 8 | **Query con SQL inválido forzado** | Modificar temporalmente una consulta para forzar error SQL, o consultar un reporte inexistente | Debe devolver `[]` vacío y registrar error en log, no dar 500 ni TypeError | **R1** |
| 9 | Consulta con procedimiento almacenado | `Pages/ConsultasViews/` → ejecutar CALL procedure con fechas | Retorna datos sin TypeError | Base |
| 10 | **Inserción de control (ix.php)** | Completar un control nuevo y guardarlo | Se insertan los registros correctamente, sin TypeError por `count()` | **R3** |
| 11 | **Actualización de control (ux.php)** | Modificar un control existente y guardarlo | Se actualiza correctamente, sin TypeError por `count()` | **R3** |
| 12 | Envío de email de alerta | Disparar una alerta que genere email | Email se envía correctamente vía SMTP | Base |
| 13 | Subida de imagen (photo_upload) | `Routes/Imagenes/photo_upload.php` → subir foto base64 | Imagen se guarda correctamente en el servidor | Base |
| 14 | API externa con token HMAC | `Pages/Api/api.php?token=…&data=…` con token válido | Retorna JSON con datos esperados | Base |
| 15 | **API con query fallida** | Llamar a api.php con un procedure inexistente | Debe devolver `[]` vacío, no 500 ni TypeError | **R1** |
| 16 | Listado de reportes | `Pages/ListReportes/` → cargar lista | Tabla se renderiza sin errores | Base |
| 17 | Sesión expirada / cookie secure | Acceder sin sesión válida | Redirige a login, no muestra datos | Base |
| 18 | Error 404 personalizado | Acceder a ruta inexistente | Muestra `404.php`, no error genérico de Apache | Base |
| 19 | **Consulta Rove** | `Pages/Rove/` → ejecutar consulta | Retorna datos, no Warning por `json_decode` | **A3** |
| 20 | **Verificación de configuración** | Ejecutar `chk_4m8x2t.php` en el servidor (o phpinfo temporal) | PHP 8.4.27+, SAPI fpm-fcgi, `display_errors = Off`, `log_errors = On`, `session.upload_progress.enabled = Off` | **Tarea 3** |

### Dónde ver los errores después del cambio

**"Logs en Vivo"** del panel de LatinCloud. Después del smoke test, revisar que no haya:
- `TypeError` por `mysqli_num_fields()`, `mysqli_fetch_*()` o `count()`
- `Deprecated: urldecode(): Passing null`
- `Warning: Undefined array key 'login_sso'`
- `Warning: Trying to access array offset on null`
- `Fatal error` de cualquier tipo

### Post-verificación

Después de confirmar que todo funciona en 8.4.27:
1. Eliminar `chk_4m8x2t.php` del servidor
2. Eliminar los archivos `*_OLD*` del servidor (listados en la sección de seguridad)

---

## Secciones de seguridad — Etapa posterior

Las siguientes secciones corresponden a la auditoría de seguridad realizada el 2026-10-27. Los hallazgos están documentados pero las remediaciones se planifican para una etapa posterior, separada de la migración de PHP.

---

### Sección 2 — Archivos que no deben estar en producción

Todas las rutas son relativas a la raíz del proyecto (= carpeta pública `/scg-mccain/`).

#### CRÍTICOS

| Archivo | Problema |
|---------|----------|
| `phpinfo.php` | Ejecuta `phpinfo()` sin control de acceso. Expone versión PHP, módulos, rutas, variables de entorno. **Eliminar de inmediato.** |
| `php.ini` | `allow_url_include = On` (RFI), `display_errors = On`. **Eliminado del repo en esta sesión. Eliminar del servidor.** |
| `Pages/Session_OLD/session.php` | Bypass de autenticación: setea `$_SESSION['factum_validation']` con email, planta e ID hardcodeados sin contraseña. Si es accesible por HTTP → acceso total sin login. **Eliminar.** No está en uso (verificado). |
| `Routes/debug.txt` | Contiene email + contraseña de usuario real en texto plano (JSON). **Eliminar.** |

#### ALTOS

| Archivo | Problema |
|---------|----------|
| `Pages/Api/.env` | Token HMAC y datos de validación en texto plano. Rastreado por Git (no está en `.gitignore`). **Eliminar y agregar a `.gitignore`.** No está en uso (verificado). |
| `dirs_OLD.php` | `display_errors = On`, `error_reporting(E_ALL)`. Expone rutas internas del servidor. **Eliminar.** |

#### MEDIOS

| Archivo | Problema |
|---------|----------|
| `.htaccess_OLD` | Reglas de reescritura inactivas. Sin riesgo operativo pero innecesario. Eliminar. |
| `.htaccess_NEW` | No es `.htaccess` activo. Su `FilesMatch` bloquea `.js`, `.css` e `.ico` — **si se activase tal cual, rompería el sitio**. Corregir antes de usar. |
| `Nodemailer/Routes/sendEmail_OLD.php` | Archivo legacy con `display_errors = On`. Eliminar. |
| `Pages/Control/control_OLD.js` | Archivo viejo de desarrollo (untracked). Eliminar antes de deploy. |
| `DWT.txt`, `TONELADAS.txt` | Documentos de especificación. Sin credenciales pero innecesarios en producción. |
| `README.md` | Puede revelar información del proyecto. Considerar excluir. |
| `Bitácora de bugs iControl 2024.docx` | Documentación interna en la carpeta pública. Eliminar o mover. |
| `Pages/ListReportes/Routes/guardarReporteCambios.php` | Tiene `error_reporting(E_ALL)` y `display_errors = 1`. Quitar en producción. |
| `Pages/ListReportes/Routes/guardarReporteNuevo.php` | Ídem. |

---

### Sección 3 — Indicios de compromiso

#### Commits desde 2026-10-17

**No hay commits desde esa fecha.** El commit más reciente es del 2025-01-13 (`mantenimiento`, autor: Luis Gimenez).

#### Archivos no rastreados (untracked)

| Ruta | Evaluación |
|------|-----------|
| `Pages/Control/control_OLD.js` | LEGÍTIMO — JS viejo de desarrollo |
| `models/App/3/` a `models/App/6/` | LEGÍTIMO — JSONs de configuración de plantas |
| `models/consultas/3/` a `models/consultas/6/` | LEGÍTIMO — datos de consultas |

Ningún archivo untracked es PHP ejecutable ni presenta contenido sospechoso.

#### Patrones de webshell

| Patrón buscado | Resultado |
|----------------|----------|
| `eval()` + `base64_decode` / `gzinflate` / `str_rot13` | **LIMPIO** — no encontrado |
| `assert()` como ejecución de código | **LIMPIO** |
| `preg_replace` con `/e` | **LIMPIO** |
| `create_function()` | **LIMPIO** |
| `.htaccess` con `auto_prepend_file` / `auto_append_file` | **LIMPIO** — no existe `.htaccess` activo en el repo ni en el servidor |
| PHP en `assets/`, `uploads/`, `img/` | **LIMPIO** |
| Variables ofuscadas `$GLOBALS["\\x..."]` | **LIMPIO** |
| `shell_exec` / `exec` / `system` / `passthru` / `proc_open` | **LIMPIO** en código propio. `whoami` solo en `Libraries/jsPDF-1.3.2/build.js` (LEGÍTIMO) |
| `base64_decode()` | Solo en `Routes/Imagenes/photo_upload.php` para decodificar imágenes Data URL — **LEGÍTIMO** |

#### Archivos solo en el servidor (no en git)

| Archivo | Evaluación |
|---------|-----------|
| `chk_4m8x2t.php` | Script de diagnóstico PHP (versión, SAPI, directivas). LEGÍTIMO pero expone info. **Eliminar.** |
| `Pages/ConsultasViews/Routes/callProcedure_OLD.php` | Versión vieja. Eliminar. |
| `Pages/ConsultasViews/Routes/sumaDWT_OLD.php` | Versión vieja. Eliminar. |
| `Pages/ConsultasViews/Routes/sumaDWTFritas_OLD.php` | Versión vieja. Eliminar. |
| `Pages/Login/Routes/login_OLD.php` | Versión vieja. Eliminar. |
| `Pages/Login/Routes/login_OLD_OLD.php` | Versión más vieja aún. Eliminar. |

#### Veredicto Sección 3

**No se encontraron indicadores de compromiso activo.** No hay webshells, código ofuscado ni backdoors. Los riesgos son de configuración insegura y credenciales expuestas (secciones 2 y 4).

---

### Sección 4 — Secretos al alcance de un atacante con ejecución PHP

> **IMPORTANTE:** No se escriben los valores reales de las credenciales en este informe.

#### 4.1 Credenciales de base de datos MySQL — CRÍTICO

| Archivo | Líneas | Estado |
|---------|--------|--------|
| `Routes/datos_base.php` | 5–7 | ACTIVO — host IP pública, usuario, contraseña |
| `Routes/datos_base_primera.php` | 5–7 | ACTIVO — mismas credenciales duplicadas |
| `Pages/Api/api.php` | 21–23 | ACTIVO — credenciales BD duplicadas en archivo de API |

- Las credenciales son **idénticas en los tres archivos**: mismo host, usuario y contraseña.
- Un único conjunto de credenciales controla todo: login de usuarios, consultas operativas y API.
- **Comparte entre sistemas:** sí — la misma cuenta de BD se usa para login, operaciones y API externa.

#### 4.2 Contraseñas SMTP — CRÍTICO

| Archivo | Líneas | Entorno |
|---------|--------|---------|
| `config.php` | 19 | Localhost / Factum prod — `alerta.factum@…` |
| `config.php` | 50 | Factum prod (bloque else) — misma contraseña que línea 19 |
| `Nodemailer/Routes/sendEmail-Factum.php` | 104 | Factum hardcodeado |
| `Nodemailer/Routes/sendEmail_OLD.php` | 100 | Factum hardcodeado |
| `Nodemailer/Routes/datos.php` | 7 | Factum — array de referencia |

- La contraseña SMTP de Factum aparece en **5 archivos distintos**.
- **Comparte entre entornos:** la contraseña Factum es la misma en localhost y producción.

#### 4.3 Clave secreta de API / HMAC — ALTO

| Archivo | Línea | Descripción |
|---------|-------|-------------|
| `Pages/Api/api.php` | 3 | `$clave_secreta` hardcodeada |
| `Pages/Api/.env` | 1 | Token HMAC pre-generado listo para usar |
| `Pages/Api/index_2.php` | 4 | Token completo en URL comentada |
| `Pages/Api/api.php` | 122 | Otro token en URL comentada |

#### 4.4 Configuración insegura adicional

- **SSL/TLS deshabilitado en PHPMailer:** todos los archivos de envío tienen `verify_peer => false`, `verify_peer_name => false`, `allow_self_signed => true`. Vulnerable a MITM.
- **`.gitignore` insuficiente:** solo excluye `eslint-main/` y `node_modules/`. No excluye `*.env`, `config.php`, `datos_base*.php` ni `phpinfo.php`.

#### Prioridades de remediación

| # | Acción | Urgencia |
|---|--------|----------|
| 1 | Rotar contraseña MySQL del usuario `fmc_oper2023` | INMEDIATA |
| 2 | Rotar contraseñas SMTP | INMEDIATA |
| 3 | Revocar/regenerar la API secret key y tokens | INMEDIATA |
| 4 | Mover credenciales a variables de entorno reales fuera del webroot | ALTA |
| 5 | Agregar al `.gitignore`: `*.env`, `config.php`, `Routes/datos_base*.php` | ALTA |
| 6 | Considerar `git filter-repo` para limpiar credenciales del historial Git | ALTA |
| 7 | Habilitar verificación SSL en PHPMailer (`verify_peer => true`) | MEDIA |

---

### Sección 5 — Revisión de .htaccess

#### Estado actual

**No existe un archivo `.htaccess` activo ni en el repositorio ni en el servidor.** Solo existen en el repo:
- `.htaccess_OLD` — reglas de reescritura básicas, sin protección de archivos sensibles.
- `.htaccess_NEW` — tiene un `FilesMatch` pero **bloquea erróneamente `.js`, `.css` e `.ico`**, lo que rompería el sitio si se activase.

#### Reglas propuestas

Crear un `.htaccess` en la raíz del proyecto (carpeta pública) con estas reglas de protección (sintaxis Apache 2.4):

```apache
# --- Protección de archivos sensibles ---
<FilesMatch "\.(md|txt|sql|log|env|ini|bak|old|docx|xlsx)$">
    Require all denied
</FilesMatch>

<FilesMatch "(^\.ht|^\.git|composer\.(json|lock)|package(-lock)?\.json|phpinfo\.php)">
    Require all denied
</FilesMatch>

<FilesMatch "(_OLD|_BAK|backup|~$)">
    Require all denied
</FilesMatch>

# NO bloquear robots.txt
<Files "robots.txt">
    Require all granted
</Files>
```

---

*Informe generado el 2026-10-27 y actualizado con los cambios de migración. Esta carpeta (`docs/seguridad/`) no debe servirse en la web — agregar regla en `.htaccess` o ubicar fuera del document root.*
