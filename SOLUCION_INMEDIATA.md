# 🚨 SOLUCIÓN INMEDIATA - Los Datos No Llegan a Google Sheets

## ❌ Problema Identificado
La URL del Google Apps Script no está configurada. Aún tienes `TU_SCRIPT_ID_AQUI` en lugar de la URL real.

## ✅ SOLUCIÓN PASO A PASO

### PASO 1: Configurar Google Apps Script (5 minutos)

1. **Ve a [script.google.com](https://script.google.com)**
2. **Crea un nuevo proyecto:**
   - Haz clic en "Nuevo proyecto"
   - Nómbralo "Sistema Sorteo Giros"

3. **Pega el código:**
   - Copia **TODO** el contenido del archivo `sorteo-giros.gs`
   - Pégalo en el editor de Apps Script
   - **IMPORTANTE:** El ID de la hoja ya está configurado correctamente

4. **Guardar y ejecutar:**
   - Presiona Ctrl+S para guardar
   - En el menú, selecciona la función `setup`
   - Haz clic en "Ejecutar"
   - Autoriza los permisos cuando se soliciten

### PASO 2: Desplegar como Web App (2 minutos)

1. **Crear implementación:**
   - En Apps Script, haz clic en "Desplegar" > "Nueva implementación"
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Acceso: **Cualquier usuario**
   - Haz clic en "Desplegar"

2. **Copiar la URL:**
   - Se abrirá una ventana con la URL
   - Copia la URL completa (se ve así: `https://script.google.com/macros/s/ABC123.../exec`)

### PASO 3: Actualizar la Configuración (1 minuto)

1. **Abre `config-google-sheets.php`**
2. **Reemplaza esta línea:**
   ```php
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec';
   ```
   
   **Por tu URL real:**
   ```php
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/TU_SCRIPT_ID_REAL/exec';
   ```

### PASO 4: Probar (1 minuto)

1. **Abre `test-google-sheets.php` en tu navegador**
2. **Ejecuta las pruebas**
3. **Verifica que los datos lleguen a Google Sheets**

## 🔍 VERIFICACIÓN RÁPIDA

### ¿Cómo saber si está funcionando?

1. **En Google Sheets:**
   - Debe aparecer la hoja "Giros del Sorteo"
   - Debe tener las columnas correctas
   - Debe mostrar datos cuando hagas un giro

2. **En tu sistema:**
   - Los giros se guardan en JSON local (como antes)
   - **ADEMÁS** se envían a Google Sheets
   - Si Google Sheets falla, aparece una advertencia

## 🚨 SI SIGUE SIN FUNCIONAR

### Verificar en Google Apps Script:
1. Ve a **Ejecuciones** en Apps Script
2. Revisa si hay errores
3. Los errores te dirán exactamente qué está mal

### Verificar la URL:
1. Abre la URL de tu script en el navegador
2. Debe mostrar información del sistema
3. Si da error, la URL está mal

### Verificar permisos:
1. La Web App debe tener acceso "Cualquier usuario"
2. Tu cuenta debe tener permisos de edición en la hoja

## 📞 AYUDA INMEDIATA

Si necesitas ayuda inmediata:

1. **Copia la URL de tu Google Apps Script**
2. **Pégala aquí** y te ayudo a configurarla
3. **O ejecuta `test-google-sheets.php`** y comparte el error

## ⚡ SOLUCIÓN RÁPIDA

**Solo necesitas:**
1. ✅ Crear el Google Apps Script (ya tienes el código)
2. ✅ Desplegarlo como Web App
3. ✅ Copiar la URL
4. ✅ Actualizar `config-google-sheets.php`

**¡En 10 minutos estará funcionando!** 🚀
