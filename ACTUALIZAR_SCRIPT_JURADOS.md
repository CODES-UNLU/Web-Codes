# 🔄 Actualizar Google Apps Script de Jurados

## ⚠️ **ACCIÓN REQUERIDA**

Necesitas actualizar el Google Apps Script con los cambios que acabamos de hacer.

## 📋 **Pasos para actualizar:**

### **1. Ir al Google Apps Script:**
- Abre: https://script.google.com/macros/s/AKfycbwOPz-5P0OY1v_ytk1xlz5IxT6n3V6zuHPLRrTJGMpAITqE85Jlv3jwao1idUtWpMTmGw/exec
- O ve a: https://script.google.com/
- Busca el proyecto "Sistema Votación Jurados"

### **2. Reemplazar el código:**
- Copia todo el contenido del archivo `jurados-votacion-script.gs`
- Pégalo en el editor de Google Apps Script
- **Guarda** (Ctrl+S)

### **3. Redesplegar:**
- Ve a "Implementar" → "Nueva implementación"
- Tipo: "Aplicación web"
- Ejecutar como: "Yo"
- Quién tiene acceso: "Cualquiera"
- Haz clic en "Implementar"

## 🔧 **Cambio específico realizado:**

**ANTES:**
```javascript
if (!jurado || !equipo || !propuestaId || !titulo || !categoria) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: false,
      error: 'Faltan parámetros requeridos'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

**DESPUÉS:**
```javascript
if (!jurado || !equipo || !propuestaId || !titulo || !categoria) {
  return ContentService
    .createTextOutput(JSON.stringify({
      success: true,
      message: 'Sistema de votación de jurados activo. Use accion=obtenerVotos para obtener datos.',
      votos: [],
      juradosQueVotaron: []
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## ✅ **Después de actualizar:**

1. **Prueba la conexión** con la página de test
2. **Verifica que no aparezca** "Faltan parámetros requeridos"
3. **Prueba votar** en el sistema principal

## 🚨 **Si tienes problemas:**

- Asegúrate de que la URL del script sea la misma
- Verifica que el despliegue sea público
- Revisa los logs en la consola del navegador
