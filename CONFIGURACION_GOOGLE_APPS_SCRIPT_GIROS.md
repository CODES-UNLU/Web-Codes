# CONFIGURACIÓN GOOGLE APPS SCRIPT - SISTEMA DE GIROS

## 📋 Descripción
Este Google Apps Script se encarga de guardar cada giro del sorteo en Google Sheets y generar estadísticas automáticamente.

## 🚀 Configuración Inicial

### Paso 1: Crear Hoja de Cálculo
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo
3. Nómbrala "Sistema de Sorteo - Giros"
4. Copia el ID de la hoja desde la URL:
   ```
   https://docs.google.com/spreadsheets/d/[ESTE_ES_TU_ID]/edit
   ```

### Paso 2: Configurar Google Apps Script
1. En tu hoja de cálculo, ve a **Extensiones > Apps Script**
2. Elimina el código existente
3. Pega el código completo del archivo `sorteo-giros.gs`
4. **IMPORTANTE**: Reemplaza `TU_SPREADSHEET_ID_AQUI` con tu ID real
5. Guarda el proyecto (Ctrl+S)
6. Nombra el proyecto "Sistema Sorteo Giros"

### Paso 3: Configuración Inicial
1. En el editor de Apps Script, selecciona la función `setup`
2. Haz clic en **Ejecutar**
3. Autoriza los permisos cuando se soliciten
4. Verifica que se hayan creado las 3 hojas:
   - **Giros del Sorteo**
   - **Estadísticas** 
   - **Pagos Verificados**

### Paso 4: Prueba del Sistema
1. Selecciona la función `probarSistema`
2. Haz clic en **Ejecutar**
3. Verifica que aparezca "Sistema funcionando correctamente"

## 📊 Estructura de las Hojas

### Hoja "Giros del Sorteo"
| Columna | Descripción |
|---------|-------------|
| ID Giro | Identificador único del giro |
| Fecha y Hora | Timestamp del giro |
| Número de Pago | Número de pago asociado |
| Símbolo 1, 2, 3 | Los tres símbolos del giro |
| Resultado Completo | Combinación completa |
| Ganó | TRUE/FALSE si ganó |
| Multiplicador | Multiplicador aplicado |
| Monto Ganado | Cantidad ganada |
| IP | Dirección IP del usuario |
| User Agent | Navegador del usuario |
| Tiempo de Respuesta | Tiempo en milisegundos |

### Hoja "Estadísticas"
- **Estadísticas Generales**: Total de giros, ganadores, perdedores, tasa de ganancia
- **Ganancias**: Total ganado, recaudado, ganancia neta
- **Por Símbolo**: Conteo de cada símbolo
- **Temporales**: Giros por día, semana, mes

### Hoja "Pagos Verificados"
- Registro de pagos verificados
- Giros disponibles por pago
- Control de uso de giros

## 🔧 Funciones Principales

### `guardarGiro(giroData)`
Guarda un giro en la hoja de cálculo.

**Parámetros:**
```javascript
{
  timestamp: "2025-01-17T10:30:00.000Z",
  paymentNumber: "29071985",
  symbol1: "🍄",
  symbol2: "🍄", 
  symbol3: "🍄",
  ip: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  responseTime: 150
}
```

**Respuesta:**
```javascript
{
  success: true,
  giroId: "GIRO_1737123456789_abc123",
  gano: true,
  multiplicador: 1,
  montoGanado: 25,
  message: "Giro guardado exitosamente"
}
```

### `obtenerEstadisticas()`
Obtiene estadísticas actualizadas del sorteo.

**Respuesta:**
```javascript
{
  totalGiros: 150,
  girosGanadores: 45,
  girosPerdedores: 105,
  tasaGanancia: 30.0,
  totalGanado: 1125,
  totalRecaudado: 3750,
  gananciaNeta: 2625,
  simbolosCount: {
    "🍄": 120,
    "💎": 80,
    "🍒": 60,
    "CODES": 40
  },
  ultimaActualizacion: "2025-01-17T10:30:00.000Z"
}
```

### `obtenerGirosPorPago(paymentNumber)`
Obtiene el historial de giros de un pago específico.

### `exportarDatosJSON()`
Exporta todos los datos en formato JSON para respaldo.

### `importarDatosJSON(jsonData)`
Importa datos desde JSON (para migración).

## 🔗 Integración con tu Sistema PHP

### Modificar tu API PHP
En tu archivo `api/process_sorteo.php`, agrega esta función:

```php
function guardarGiroEnGoogleSheets($giroData) {
    $scriptUrl = 'https://script.google.com/macros/s/TU_SCRIPT_ID/exec';
    
    $postData = [
        'action' => 'guardarGiro',
        'data' => $giroData
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $scriptUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    return json_decode($response, true);
}
```

### Desplegar como Web App
1. En Apps Script, haz clic en **Desplegar > Nueva implementación**
2. Tipo: **Aplicación web**
3. Ejecutar como: **Yo**
4. Acceso: **Cualquier usuario**
5. Copia la URL de la aplicación web
6. Úsala en tu función PHP

## 📈 Ventajas del Sistema

### ✅ Automatización Completa
- Guarda cada giro automáticamente
- Calcula estadísticas en tiempo real
- No requiere intervención manual

### ✅ Análisis Avanzado
- Estadísticas por símbolo
- Análisis temporal (día, semana, mes)
- Control de ganancias y pérdidas
- Seguimiento de usuarios por IP

### ✅ Respaldo y Migración
- Exportación a JSON
- Importación desde JSON
- Datos seguros en Google Cloud

### ✅ Integración Fácil
- API simple desde PHP
- Respuestas en JSON
- Manejo de errores robusto

## 🛠️ Mantenimiento

### Actualizaciones Regulares
- Las estadísticas se actualizan automáticamente
- No requiere intervención manual
- Fórmulas dinámicas en Google Sheets

### Respaldo de Datos
```javascript
// Ejecutar mensualmente
const backup = exportarDatosJSON();
console.log('Respaldo creado:', backup);
```

### Limpieza de Datos
```javascript
// ¡CUIDADO! Solo si es necesario
const resultado = limpiarTodosLosDatos();
console.log(resultado);
```

## 🔒 Seguridad

### Permisos Requeridos
- Lectura/escritura en Google Sheets
- Ejecución de scripts
- Acceso a servicios web

### Protección de Datos
- Datos almacenados en Google Cloud
- Encriptación automática
- Control de acceso por usuario

## 📞 Soporte

### Problemas Comunes
1. **Error de permisos**: Reautorizar la aplicación
2. **ID incorrecto**: Verificar el ID de la hoja
3. **Función no encontrada**: Verificar que el código esté completo

### Logs y Debugging
- Usa `console.log()` para debugging
- Revisa los logs en Apps Script
- Verifica la consola del navegador

## 🎯 Próximos Pasos

1. **Configurar el sistema** siguiendo los pasos
2. **Integrar con tu API PHP** 
3. **Probar con datos reales**
4. **Configurar respaldos automáticos**
5. **Monitorear estadísticas regularmente**

---

**¡El sistema está listo para usar!** 🚀

Cualquier duda, revisa los logs en Google Apps Script o consulta la documentación de Google Sheets API.
