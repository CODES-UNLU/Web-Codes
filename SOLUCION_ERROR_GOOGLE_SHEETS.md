# 🔧 Solución de Error Google Sheets
## Hackathon CODES++ 2025

## 🚨 Problema Identificado

Los votos no llegan al Google Sheet debido a errores de conexión. Los errores principales son:

1. **Error de conexión**: `Failed to load resource: net::ERR_FAILED`
2. **Error en JavaScript**: `Cannot read properties of undefined (reading 'id')`
3. **Modo offline activado**: Los votos se guardan localmente pero no en Google Sheets

## ✅ Soluciones Implementadas

### 1. Error JavaScript Corregido
- **Archivo**: `jurados.html` línea 1317
- **Problema**: `propuestaGanadora` podía ser `undefined`
- **Solución**: Agregada validación para evitar errores

### 2. Archivo de Diagnóstico Creado
- **Archivo**: `diagnostico-google-sheets.html`
- **Función**: Probar la conexión y identificar problemas específicos

## 🔍 Pasos para Diagnosticar

### Paso 1: Abrir el Diagnóstico
1. Abrir `diagnostico-google-sheets.html` en el navegador
2. Hacer clic en "🔄 Probar Conexión"
3. Revisar el log de actividad

### Paso 2: Verificar Google Apps Script
1. Ir a https://script.google.com/
2. Abrir el proyecto "Hackathon CODES++ Jurados"
3. Verificar que el código esté completo
4. **IMPORTANTE**: Asegurar que esté desplegado como "Aplicación web"

### Paso 3: Verificar Permisos
1. En Google Apps Script, hacer clic en "Implementar" → "Administrar implementaciones"
2. Verificar que la aplicación web esté configurada con:
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: "Cualquiera"

## 🛠️ Soluciones Posibles

### Solución 1: Re-desplegar la Aplicación Web
1. En Google Apps Script:
   - Clic en "Implementar" → "Nueva implementación"
   - Tipo: "Aplicación web"
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquiera"
   - Clic en "Implementar"

2. **Autorizar permisos** cuando se solicite

### Solución 2: Verificar el Código del Script
Asegurar que el archivo `hackathon-jurados-sheets.gs` esté completo en Google Apps Script:

```javascript
// Verificar que estas funciones existan:
- doPost(e)
- setupSheets()
- registrarVoto()
- obtenerConfiguracion()
- getEquipos()
- getJurados()
```

### Solución 3: Probar la URL Directamente
1. Abrir en el navegador:
   ```
   https://script.google.com/macros/s/AKfycbyQLbx_HDxXS3TkUC1grL9mL6u-AxVjub7bRbc7SDMVjEYeBVIT2NAn0621BSbL0JOZ/exec
   ```

2. **Resultado esperado**: Error "Script function not found: doGet" (esto es normal)

3. **Si aparece otro error**: El script no está desplegado correctamente

## 🧪 Pruebas de Funcionalidad

### Prueba 1: Conexión Básica
```javascript
// En la consola del navegador (F12):
sheetsIntegration.testConnection()
```

### Prueba 2: Voto de Prueba
```javascript
// En la consola del navegador (F12):
sheetsIntegration.registrarVoto('Test', 'Equipo Test', 'test1', 'Prueba', 'Test')
```

### Prueba 3: Obtener Configuración
```javascript
// En la consola del navegador (F12):
sheetsIntegration.makeRequest('obtenerConfiguracion')
```

## 📊 Verificación de Google Sheets

1. **Ir a Google Drive**
2. **Buscar**: "Hackathon CODES++ Jurados"
3. **Verificar que existan estas hojas**:
   - Votaciones Propuestas
   - Calificaciones Proyectos
   - Resultados
   - Configuración

## 🆘 Si Nada Funciona

### Opción 1: Modo Offline
- Los votos se guardan localmente en el navegador
- Se pueden exportar manualmente
- Funciona sin conexión a Google Sheets

### Opción 2: Crear Nuevo Script
1. Crear nuevo proyecto en Google Apps Script
2. Copiar el código de `hackathon-jurados-sheets.gs`
3. Desplegar como aplicación web
4. Actualizar la URL en `jurados-sheets-integration.js`

### Opción 3: Usar Solo Local
- Desactivar la integración con Google Sheets
- Usar solo el almacenamiento local
- Exportar resultados manualmente

## 🎯 Estado Actual

- ✅ **Error JavaScript corregido**
- ✅ **Archivo de diagnóstico creado**
- ✅ **Validaciones agregadas**
- ⚠️ **Conexión con Google Sheets pendiente de verificación**

## 📞 Próximos Pasos

1. **Abrir `diagnostico-google-sheets.html`**
2. **Probar la conexión**
3. **Revisar el log de errores**
4. **Aplicar la solución correspondiente**

¡El sistema funcionará correctamente una vez resuelta la conexión con Google Sheets!
