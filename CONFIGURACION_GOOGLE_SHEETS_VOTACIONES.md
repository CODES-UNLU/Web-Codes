# 📊 Configuración Google Sheets para Votaciones - Hackathon CODES++

## 🎯 Objetivo

Configurar un Google Apps Script que genere una hoja de cálculo para recibir y organizar las votaciones de los jurados del hackathon.

## 📋 Pasos de Configuración

### **Paso 1: Crear el Google Apps Script**

1. **Abrir Google Apps Script**
   - Ve a [script.google.com](https://script.google.com)
   - Inicia sesión con tu cuenta de Google

2. **Crear nuevo proyecto**
   - Haz clic en "Nuevo proyecto"
   - Cambia el nombre a "Hackathon CODES++ - Votaciones"

3. **Copiar el código**
   - Abre el archivo `generar-sheet-votaciones.gs`
   - Copia todo el contenido
   - Pégalo en el editor de Google Apps Script

### **Paso 2: Ejecutar la función inicial**

1. **Seleccionar función**
   - En el menú desplegable, selecciona `crearHojaVotaciones`
   - Haz clic en "Ejecutar" ▶️

2. **Autorizar permisos**
   - Google te pedirá autorización
   - Haz clic en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Haz clic en "Permitir"

3. **Verificar creación**
   - Se creará una nueva hoja de cálculo
   - Copia la URL que aparece en los logs

### **Paso 3: Configurar el Web App**

1. **Desplegar como Web App**
   - En Google Apps Script, haz clic en "Desplegar" > "Nueva implementación"
   - Tipo: "Aplicación web"
   - Ejecutar como: "Yo"
   - Quién tiene acceso: "Cualquiera"

2. **Copiar URL del Web App**
   - Copia la URL que se genera
   - Esta URL se usará en `jurados.html`

### **Paso 4: Actualizar jurados.html**

1. **Abrir jurados.html**
   - Busca la línea con `const baseUrl = 'TU_GOOGLE_APPS_SCRIPT_URL_AQUI';`

2. **Reemplazar la URL**
   ```javascript
   const baseUrl = 'TU_URL_DEL_WEB_APP_AQUI';
   ```

3. **Guardar cambios**

## 📊 Estructura de la Hoja de Cálculo

### **Hoja 1: Votaciones_Principales**
- **ID_Voto**: Identificador único del voto
- **Timestamp**: Marca de tiempo ISO
- **Fecha_Hora**: Fecha y hora legible
- **Jurado**: Nombre del jurado
- **Equipo**: Nombre del equipo
- **Propuesta_ID**: ID de la propuesta votada
- **Titulo_Propuesta**: Título de la propuesta
- **Categoria**: Categoría de la propuesta
- **No_Entrego**: Si el equipo no entregó (true/false)
- **Confirmado**: Si el voto fue confirmado
- **IP_Address**: Dirección IP del jurado
- **User_Agent**: Información del navegador

### **Hoja 2: Resumen_por_Equipo**
- **Equipo**: Nombre del equipo
- **Total_Votos**: Número total de votos recibidos
- **Propuesta_Mas_Votada**: Propuesta con más votos
- **Votos_Propuesta_Ganadora**: Cantidad de votos de la propuesta ganadora
- **Porcentaje_Victoria**: Porcentaje de victoria
- **Jurados_Que_Votaron**: Lista de jurados que votaron
- **Ultima_Votacion**: Fecha y hora de la última votación

### **Hoja 3: Estadisticas_Jurados**
- **Jurado**: Nombre del jurado
- **Total_Votos_Realizados**: Número de votos realizados
- **Equipos_Votados**: Número de equipos votados
- **Primera_Votacion**: Fecha y hora de la primera votación
- **Ultima_Votacion**: Fecha y hora de la última votación
- **Tiempo_Promedio_Votacion**: Tiempo promedio entre votaciones
- **Estado**: Estado del jurado (Activo/Inactivo)

## 🔧 Funciones Disponibles

### **doGet(e)**
- **Propósito**: Recibe votos desde el sistema de jurados
- **Parámetros**: jurado, equipo, propuestaId, titulo, categoria, noEntrego, confirmado, timestamp
- **Retorna**: JSON con confirmación del voto

### **obtenerVotos()**
- **Propósito**: Obtiene todos los votos registrados
- **Retorna**: JSON con lista de votos

### **limpiarDatos()**
- **Propósito**: Limpia todos los datos (solo para administradores)
- **Retorna**: JSON con confirmación

### **probarSistema()**
- **Propósito**: Prueba el sistema con datos de ejemplo
- **Retorna**: Datos de prueba

## 📱 URLs de Acceso

### **Para Jurados:**
- **Sistema de votación**: `jurados.html`
- **Funciona con**: El Web App configurado

### **Para Administradores:**
- **Hoja de cálculo**: URL generada automáticamente
- **Acceso**: Solo con permisos de edición

## 🚀 Flujo de Trabajo

### **1. Configuración Inicial**
```
Google Apps Script → Ejecutar crearHojaVotaciones() → Hoja creada
```

### **2. Despliegue**
```
Google Apps Script → Desplegar como Web App → URL generada
```

### **3. Integración**
```
jurados.html → URL del Web App → Votos enviados
```

### **4. Recepción de Votos**
```
Voto desde jurados.html → doGet() → Hoja de cálculo actualizada
```

## 🔍 Monitoreo y Debugging

### **Logs en Google Apps Script**
- Abre la consola de Google Apps Script
- Ve a "Ejecuciones" para ver logs
- Revisa errores si los hay

### **Verificar Votos**
- Abre la hoja de cálculo generada
- Revisa la hoja "Votaciones_Principales"
- Los votos aparecen en tiempo real

### **Probar Sistema**
- Ejecuta `probarSistema()` en Google Apps Script
- Verifica que aparezcan datos de prueba

## ⚠️ Consideraciones Importantes

### **Seguridad**
- El Web App es público (cualquiera puede enviar votos)
- Los datos se almacenan en Google Sheets
- Considera restricciones de IP si es necesario

### **Rendimiento**
- Google Sheets tiene límites de escritura
- Para muchos votos simultáneos, considera usar base de datos

### **Backup**
- La hoja de cálculo se guarda automáticamente en Google Drive
- Considera hacer copias de seguridad periódicas

## 🎉 Resultado Final

Una vez configurado, tendrás:

✅ **Hoja de cálculo** con 3 hojas organizadas
✅ **Sistema de votación** funcionando en tiempo real
✅ **Estadísticas automáticas** de jurados y equipos
✅ **Monitoreo completo** del proceso de votación
✅ **Datos estructurados** para análisis posterior

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs en Google Apps Script
2. Verifica que la URL del Web App sea correcta
3. Asegúrate de que los permisos estén configurados
4. Prueba con `probarSistema()` primero

**¡El sistema está listo para recibir las votaciones del hackathon!** 🚀
