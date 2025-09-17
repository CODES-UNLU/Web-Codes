# 🎰 Configuración del Sistema de Resultados del Slot Machine

## 📋 Resumen

Se ha implementado un sistema híbrido que almacena los resultados de los giros del slot machine en dos lugares:

1. **JSON Local** (`data/slot-results.json`) - Para respaldo rápido y verificación
2. **Google Sheets** - Para análisis y seguimiento detallado

## 🔧 Archivos Creados/Modificados

### Nuevos Archivos:
- `data/slot-results.json` - Almacena resultados localmente
- `api/save-slot-result.php` - Endpoint para guardar resultados
- `GOOGLE_APPS_SCRIPT_SLOT_RESULTS.txt` - Código para Google Apps Script
- `SLOT_RESULTS_SETUP.md` - Esta documentación

### Archivos Modificados:
- `multiplicador.html` - Actualizado para enviar datos a ambos sistemas

## 📊 Estructura de Datos

Cada resultado se guarda con la siguiente información:

```json
{
  "timestamp": "2025-01-27T10:30:00.000Z",
  "paymentNumber": "125926940641",
  "winAmount": 250.0,
  "multiplier": 10.0,
  "won": true,
  "results": "CODES, CODES, CODES",
  "symbol1": "CODES",
  "symbol2": "CODES", 
  "symbol3": "CODES",
  "ip": "192.168.1.100",
  "userAgent": "Mozilla/5.0..."
}
```

## 🚀 Configuración Paso a Paso

### 1. Configurar Google Sheets

1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Copia el ID de la hoja de la URL (ej: `1ABC123...`)
4. Ve a [Google Apps Script](https://script.google.com)
5. Crea un nuevo proyecto
6. Copia el código de `GOOGLE_APPS_SCRIPT_SLOT_RESULTS.txt`
7. Reemplaza `TU_SHEET_ID_AQUI` con tu ID de hoja
8. Guarda y despliega como aplicación web
9. Copia la URL de la aplicación web

### 2. Actualizar el Código

En `multiplicador.html`, reemplaza esta línea:
```javascript
fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
```

Con tu URL de Google Apps Script:
```javascript
fetch('https://script.google.com/macros/s/TU_SCRIPT_ID_REAL/exec', {
```

### 3. Verificar Permisos

Asegúrate de que:
- El archivo `data/slot-results.json` tenga permisos de escritura
- El directorio `api/` tenga permisos de ejecución
- El servidor web pueda escribir en el directorio `data/`

## 📈 Ventajas del Sistema Híbrido

### JSON Local:
- ✅ Respuesta rápida
- ✅ Funciona sin conexión a internet
- ✅ Fácil de respaldar
- ✅ Acceso directo a los datos

### Google Sheets:
- ✅ Análisis visual con gráficos
- ✅ Compartir datos fácilmente
- ✅ Filtros y ordenamiento
- ✅ Histórico completo
- ✅ Acceso desde cualquier lugar

## 🔍 Monitoreo de Resultados

### Ver resultados en JSON:
```bash
cat data/slot-results.json | jq '.'
```

### Ver estadísticas en Google Sheets:
- Abre tu hoja de cálculo
- Ve a la pestaña "Slot Results"
- Usa filtros para analizar los datos

## 🛠️ Mantenimiento

### Limpiar datos antiguos:
```bash
# Hacer respaldo
cp data/slot-results.json data/slot-results-backup-$(date +%Y%m%d).json

# Limpiar archivo (opcional)
echo "[]" > data/slot-results.json
```

### Verificar funcionamiento:
1. Juega una partida de prueba
2. Verifica que aparezca en `data/slot-results.json`
3. Verifica que aparezca en Google Sheets
4. Revisa los logs del navegador para errores

## 🚨 Solución de Problemas

### Error: "No se puede escribir en JSON"
- Verifica permisos del archivo `data/slot-results.json`
- Asegúrate de que el directorio `data/` existe

### Error: "Google Sheets no recibe datos"
- Verifica que la URL del script sea correcta
- Asegúrate de que el script esté desplegado
- Revisa los permisos de la aplicación web

### Error: "CORS" en el navegador
- Verifica que los headers CORS estén configurados
- Asegúrate de que estás accediendo desde el mismo dominio

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del navegador (F12)
2. Verifica los logs del servidor PHP
3. Comprueba que todos los archivos estén en su lugar
4. Verifica los permisos de archivos y directorios
