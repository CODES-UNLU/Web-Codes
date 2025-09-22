# ⚡ Configuración Rápida - Google Sheets para Jurados
## Hackathon CODES++ 2025

## 🚀 Pasos Rápidos (5 minutos)

### 1. Configurar Google Apps Script

1. **Ir a Google Apps Script:**
   - https://script.google.com/
   - Crear nuevo proyecto

2. **Copiar el código:**
   - Abrir `hackathon-jurados-sheets.gs`
   - Copiar TODO el contenido
   - Pegar en el editor de Google Apps Script

3. **Guardar:**
   - Nombre: "Hackathon CODES++ Jurados"
   - Ctrl+S

### 2. Crear el Deploy

1. **Implementar:**
   - Clic en "Implementar" → "Nueva implementación"
   - Tipo: "Aplicación web"
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquiera"
   - Clic en "Implementar"

2. **Autorizar:**
   - Autorizar permisos cuando se solicite
   - **¡IMPORTANTE!** La URL ya está configurada en el código

### 3. Probar la Conexión

1. **Abrir la página de jurados:**
   - Abrir `jurados.html` en el navegador

2. **Verificar conexión:**
   - Debería aparecer: "✅ Conectado a Google Sheets"
   - Si aparece: "⚠️ Modo offline", revisar permisos

## 🔧 Tu Configuración Actual

- **Script ID:** `AKfycbyQLbx_HDxXS3TkUC1grL9mL6u-AxVjub7bRbc7SDMVjEYeBVIT2NAn0621BSbL0JOZ`
- **URL configurada:** `https://script.google.com/macros/s/AKfycbyQLbx_HDxXS3TkUC1grL9mL6u-AxVjub7bRbc7SDMVjEYeBVIT2NAn0621BSbL0JOZ/exec`

## ✅ Verificación Rápida

1. **Abrir la consola del navegador (F12)**
2. **Ejecutar este comando:**
   ```javascript
   sheetsIntegration.testConnection()
   ```
3. **Debería mostrar:** "✅ Conexión con Google Sheets establecida"

## 🎯 Funcionalidades Listas

- ✅ **Votación de propuestas:** Se guarda automáticamente en Google Sheets
- ✅ **Calificación de proyectos:** Se guarda automáticamente en Google Sheets  
- ✅ **Resultados en tiempo real:** Se actualizan automáticamente
- ✅ **Modo offline:** Funciona sin internet
- ✅ **Agregar jurados:** Se puede hacer desde Google Sheets

## 📊 Hojas Creadas Automáticamente

1. **Votaciones Propuestas** - Se llena cuando los jurados votan
2. **Calificaciones Proyectos** - Se llena cuando los jurados califican
3. **Resultados Finales** - Se actualiza automáticamente
4. **Configuración** - Equipos y jurados

## 🆘 Si Algo No Funciona

### Error: "No se pudo conectar"
1. Verificar que el script esté desplegado
2. Verificar permisos de la aplicación web
3. Re-autorizar la aplicación

### Error: "Permisos insuficientes"
1. Ir a Google Apps Script
2. Re-autorizar la aplicación
3. Asegurar que el usuario tenga permisos de edición

### Los datos no se guardan
1. Abrir consola del navegador (F12)
2. Verificar errores en la consola
3. Verificar que la URL del script sea correcta

## 🎉 ¡Listo!

Una vez configurado, el sistema funcionará automáticamente:
- Los jurados votan → Se guarda en Google Sheets
- Los jurados califican → Se guarda en Google Sheets
- Los resultados se actualizan en tiempo real
- Todo se respalda automáticamente en Google Drive

**¡Tu sistema de jurados está listo para el hackathon!** 🚀
