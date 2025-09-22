# 🔧 SOLUCIÓN COMPLETA - Sistema de Jurados
## Hackathon CODES++ 2025

## 🚨 **PROBLEMA IDENTIFICADO**

El sistema de jurados no funciona porque:
1. ✅ **Formulario de inscripciones**: Funciona porque usa Google Forms (automático)
2. ❌ **Sistema de jurados**: No funciona porque falta el Google Apps Script desplegado

## 🎯 **SOLUCIÓN IMPLEMENTADA**

He creado y actualizado los archivos necesarios:

### ✅ **Archivos Actualizados:**
1. **`hackathon-jurados-sheets.gs`** - Script de Google Apps Script (NUEVO)
2. **`jurados-sheets-integration.js`** - Integración actualizada para usar GET

---

## 🚀 **PASOS PARA ACTIVAR EL SISTEMA**

### **Paso 1: Crear el Google Apps Script**

1. **Ir a Google Apps Script:**
   - Visita: https://script.google.com/
   - Haz clic en "Nuevo proyecto"

2. **Copiar el código:**
   - Abre el archivo `hackathon-jurados-sheets.gs` (que acabo de crear)
   - Copia TODO el contenido
   - Pégalo en el editor de Google Apps Script

3. **Guardar el proyecto:**
   - Nombra el proyecto: "Hackathon CODES++ Jurados 2025"
   - Guarda con Ctrl+S

### **Paso 2: Crear el Despliegue (MUY IMPORTANTE)**

1. **Crear el despliegue:**
   - Haz clic en "Implementar" → "Nueva implementación"
   - Tipo: "Aplicación web"
   - Descripción: "Sistema de Jurados Hackathon 2025"

2. **Configurar permisos:**
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquiera"

3. **Implementar:**
   - Haz clic en "Implementar"
   - **AUTORIZAR** los permisos cuando se solicite
   - **¡IMPORTANTE!** Copia la URL del despliegue

### **Paso 3: Actualizar la URL en el Código**

1. **Abrir `jurados-sheets-integration.js`**
2. **En la línea 9, reemplazar la URL:**
   ```javascript
   SCRIPT_URL: 'TU_NUEVA_URL_AQUI',
   ```
   Por la URL que copiaste en el paso anterior.

### **Paso 4: Probar la Conexión**

1. **Abrir `jurados.html` en el navegador**
2. **Verificar la conexión:**
   - Debería aparecer: "✅ Conectado a Google Sheets"
   - Si aparece: "⚠️ Modo offline", revisar la URL

---

## 🧪 **PRUEBA RÁPIDA**

### **Desde la consola del navegador (F12):**
```javascript
// Probar conexión
sheetsIntegration.testConnection()

// Probar voto
sheetsIntegration.registrarVoto('Test', 'Equipo Test', 'test1', 'Prueba', 'Test')
```

### **Resultado esperado:**
- ✅ Mensaje: "Voto registrado en Google Sheets"
- 📊 Aparece en Google Sheets: "Hackathon CODES++ 2025 - Jurados"

---

## 📊 **ESTRUCTURA DE GOOGLE SHEETS**

El script creará automáticamente:
- **Hoja**: "Hackathon CODES++ 2025 - Jurados"
- **Pestaña**: "Votaciones"
- **Columnas**: Timestamp | Jurado | Equipo | Propuesta ID | Título | Categoría

---

## 🔍 **VERIFICACIÓN FINAL**

### **1. Verificar Google Sheets:**
- Ir a Google Drive
- Buscar: "Hackathon CODES++ 2025 - Jurados"
- Verificar que exista la pestaña "Votaciones"

### **2. Verificar la URL:**
- Abrir la URL del script en el navegador
- **Resultado esperado**: Error "Script function not found: doGet" (esto es normal)
- **Si aparece otro error**: El script no está desplegado correctamente

### **3. Probar desde la página:**
- Abrir `jurados.html`
- Hacer un voto de prueba
- Verificar que aparezca en Google Sheets

---

## 🆘 **SI ALGO NO FUNCIONA**

### **Error 1: "No conectado a Google Sheets"**
- ✅ Verificar que la URL esté correcta
- ✅ Verificar que el script esté desplegado como "Aplicación web"
- ✅ Verificar que los permisos sean "Cualquiera"

### **Error 2: "Error al registrar voto"**
- ✅ Verificar que el script tenga permisos para crear hojas
- ✅ Verificar que no haya errores en la consola del navegador

### **Error 3: Los votos no aparecen en Google Sheets**
- ✅ Verificar que la hoja se haya creado
- ✅ Verificar que el script tenga permisos de escritura
- ✅ Revisar los logs en Google Apps Script

---

## 🎉 **RESULTADO FINAL**

Una vez completados todos los pasos:

- ✅ **Los votos se guardarán automáticamente en Google Sheets**
- ✅ **Aparecerá el mensaje: "✅ Conectado a Google Sheets"**
- ✅ **Los datos se sincronizarán en tiempo real**
- ✅ **El sistema funcionará igual que el de inscripciones**

---

## 📞 **PRÓXIMOS PASOS**

1. **Seguir los pasos 1-4** de esta guía
2. **Probar la conexión** con el comando de la consola
3. **Hacer un voto de prueba** desde la página
4. **Verificar que aparezca en Google Sheets**

¡El sistema de jurados funcionará perfectamente una vez desplegado el script!
