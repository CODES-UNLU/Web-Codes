# 🔍 Debug Sistema Jurados

## 🚨 Problemas Reportados:
1. **Modal no aparece** cuando termina de votar
2. **Votos reales no se muestran** del Google Sheet

---

## 🧪 Pasos para Debuggear:

### **Paso 1: Verificar Estado Actual**
1. Abre `jurados.html` en tu navegador
2. Abre la consola (F12)
3. Selecciona un jurado
4. Escribe en la consola: `debugVotos()`
5. Revisa los logs que aparecen

### **Paso 2: Probar Modal Manualmente**
1. Con un jurado seleccionado
2. Escribe en la consola: `probarModal()`
3. Debería aparecer el modal de confirmación

### **Paso 3: Verificar Google Sheets**
1. Abre `test-google-sheets-jurados.html`
2. Haz clic en **"📊 Obtener Votos del Sheet"**
3. Verifica que aparezcan los votos existentes

### **Paso 4: Verificar Sincronización**
1. En `jurados.html`, selecciona un jurado
2. Haz clic en "Seleccionar Propuestas"
3. Revisa la consola para ver los logs de sincronización
4. Busca mensajes como:
   - `🔄 Iniciando sincronización con Google Sheets...`
   - `📊 Datos obtenidos del Google Sheet:`
   - `👥 Jurados que votaron:`

---

## 🔍 Logs a Buscar:

### **Logs de Sincronización:**
```
🔄 Iniciando sincronización con Google Sheets...
📊 Datos obtenidos del Google Sheet: {...}
📊 Total votos confirmados: X
👥 Jurados que votaron: [...]
🔄 Votos sincronizados desde Google Sheets: {...}
```

### **Logs de Votación:**
```
🔍 DEBUG actualizarResultados:
  - Jurado actual: nehuen_prados
  - Votos del jurado: {...}
  - Equipos votados: 3
  - Total equipos: 3
  - Ha completado votación: true
  - Confirmado: false
```

### **Logs de Modal:**
```
🧪 Simulando votos completos: {...}
```

---

## ❌ Posibles Problemas:

### **1. Modal no aparece:**
- **Causa**: `haCompletadoVotacion` es `false`
- **Solución**: Verificar que se votó por todos los equipos
- **Debug**: Revisar logs de `actualizarResultados`

### **2. Votos no se cargan:**
- **Causa**: Error en `obtenerVotosReales()`
- **Solución**: Verificar URL del Google Apps Script
- **Debug**: Revisar logs de sincronización

### **3. Sincronización falla:**
- **Causa**: Google Apps Script no responde
- **Solución**: Verificar que el script esté desplegado
- **Debug**: Probar con `test-google-sheets-jurados.html`

---

## 🛠️ Comandos de Debug:

### **En la consola del navegador:**
```javascript
// Ver estado actual
debugVotos()

// Probar modal
probarModal()

// Obtener votos del sheet
obtenerVotosReales().then(console.log)

// Sincronizar manualmente
sincronizarVotosReales()

// Ver votos locales
console.log(votos)

// Ver jurado actual
console.log(juradoActual)
```

---

## 📊 Verificar Google Sheet:

### **URL del Sheet:**
https://docs.google.com/spreadsheets/d/1UmhBDevk6MvgDqmj_WuQbCsk3sQz1aCiSHwC3OY8QPU/edit

### **Verificar:**
1. ✅ Pestaña "Votos Jurados" existe
2. ✅ Columnas A1:H1 configuradas
3. ✅ Hay datos en las filas
4. ✅ Columna H tiene "SÍ" para votos confirmados

---

## 🚀 Soluciones Rápidas:

### **Si el modal no aparece:**
1. Usa `probarModal()` en la consola
2. Si funciona, el problema está en la lógica de detección
3. Si no funciona, el problema está en el modal

### **Si los votos no se cargan:**
1. Usa `test-google-sheets-jurados.html`
2. Haz clic en "📊 Obtener Votos del Sheet"
3. Si no funciona, el problema está en el Google Apps Script

### **Si la sincronización falla:**
1. Verifica la URL del Google Apps Script
2. Asegúrate de que esté desplegado como "Aplicación web"
3. Verifica que el acceso sea "Cualquiera"

---

## 📞 Reportar Problemas:

Si encuentras algún problema, comparte:
1. **Logs de la consola** (copia y pega)
2. **Pasos exactos** que seguiste
3. **Qué esperabas** vs **qué pasó**
4. **Screenshot** si es necesario
