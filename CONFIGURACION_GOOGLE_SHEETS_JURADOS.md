# 📊 Configuración Google Sheets - Sistema de Votación de Jurados

## 🎯 Objetivo
Configurar Google Sheets para recibir y almacenar los votos de los jurados del Hackathon CODES++.

---

## 📋 Paso 1: Crear Google Sheet

### 1.1 Crear la hoja de cálculo
1. Ve a [sheets.google.com](https://sheets.google.com)
2. Haz clic en **"+ Crear"** → **"Hoja de cálculo en blanco"**
3. Nombra la hoja: **"Votos Jurados - Hackathon CODES++"**

### 1.2 Configurar las columnas
En la **primera fila (A1:H1)**, agrega estos encabezados:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Jurado | Equipo | Propuesta_ID | Titulo_Propuesta | Categoria | Fecha_Hora | Confirmado |

### 1.3 Formatear encabezados
1. Selecciona la fila 1 (A1:H1)
2. Haz clic en **"Formato"** → **"Texto"** → **"Negrita"**
3. Cambia el color de fondo a azul
4. Cambia el color del texto a blanco

---

## 🔧 Paso 2: Crear Google Apps Script

### 2.1 Crear el script
1. En tu Google Sheet, ve a **"Extensiones"** → **"Apps Script"**
2. Se abrirá una nueva pestaña con el editor de Apps Script
3. **Borra todo el código** que aparece por defecto
4. **Copia y pega** el código del archivo `jurados-votacion-script.gs`

### 2.2 Configurar el ID del Sheet
1. En el código, busca la línea:
   ```javascript
   const SHEET_ID = 'TU_SHEET_ID_AQUI'; // ⚠️ CAMBIAR ESTO
   ```
2. **Copia el ID de tu Google Sheet** desde la URL:
   - La URL se ve así: `https://docs.google.com/spreadsheets/d/1ABC123DEF456GHI789JKL/edit`
   - El ID es: `1ABC123DEF456GHI789JKL`
3. **Reemplaza** `TU_SHEET_ID_AQUI` con tu ID real

### 2.3 Guardar y desplegar
1. Haz clic en **"Guardar"** (Ctrl+S)
2. Nombra el proyecto: **"Sistema Votación Jurados"**
3. Ve a **"Desplegar"** → **"Nueva implementación"**
4. Selecciona:
   - **Tipo**: "Aplicación web"
   - **Ejecutar como**: "Yo"
   - **Quién tiene acceso**: "Cualquiera"
5. Haz clic en **"Desplegar"**
6. **Copia la URL** que aparece (algo como: `https://script.google.com/macros/s/ABC123.../exec`)

---

## 🌐 Paso 3: Configurar el Frontend

### 3.1 Actualizar la URL en el código
1. Abre el archivo `jurados.html`
2. Busca la línea:
   ```javascript
   const baseUrl = 'TU_GOOGLE_APPS_SCRIPT_URL_AQUI'; // ⚠️ CAMBIAR ESTO
   ```
3. **Reemplaza** `TU_GOOGLE_APPS_SCRIPT_URL_AQUI` con la URL que copiaste en el paso 2.3

### 3.2 Verificar la configuración
El código debería verse así:
```javascript
const baseUrl = 'https://script.google.com/macros/s/ABC123DEF456GHI789JKL/exec';
```

---

## 🧪 Paso 4: Probar la Conexión

### 4.1 Probar desde Google Apps Script
1. En el editor de Apps Script, selecciona la función `probarScript`
2. Haz clic en **"Ejecutar"**
3. Revisa los logs para ver si hay errores
4. Ve a tu Google Sheet para ver si se agregó una fila de prueba

### 4.2 Probar desde el frontend
1. Abre `jurados.html` en tu navegador
2. Selecciona un jurado
3. Vota por una propuesta
4. Verifica que aparezca en tu Google Sheet

---

## 📊 Estructura de Datos

### Datos que se envían:
- **Timestamp**: Fecha y hora exacta del voto
- **Jurado**: Nombre del jurado que votó
- **Equipo**: Nombre del equipo
- **Propuesta_ID**: ID único de la propuesta
- **Titulo_Propuesta**: Título de la propuesta votada
- **Categoria**: Categoría de la propuesta
- **Fecha_Hora**: Fecha formateada para lectura
- **Confirmado**: Si el voto fue confirmado por el jurado

### Ejemplo de fila en el sheet:
```
2024-01-15T10:30:00.000Z | Nehuen Prados | Grupo_crear() | propuesta1_1 | App de Gestión de Inventario | IA | 15/01/2024 10:30:00 | SÍ
```

---

## 🔍 Solución de Problemas

### ❌ Error: "Faltan parámetros requeridos"
- Verifica que todos los campos estén completos en el frontend
- Revisa la consola del navegador para ver qué datos se están enviando

### ❌ Error: "No se puede abrir la hoja de cálculo"
- Verifica que el SHEET_ID sea correcto
- Asegúrate de que el script tenga permisos para acceder al sheet

### ❌ Los votos no aparecen en el sheet
- Verifica que la URL del script sea correcta
- Revisa los logs de Google Apps Script
- Asegúrate de que el sheet tenga la pestaña "Votos Jurados"

### ❌ Error de permisos
- Ve a **"Desplegar"** → **"Gestionar implementaciones"**
- Asegúrate de que el acceso sea "Cualquiera"

---

## 📈 Funciones Adicionales

### Obtener estadísticas
```javascript
// En Google Apps Script, ejecuta:
obtenerEstadisticasVotos()
```

### Limpiar votos de prueba
```javascript
// En Google Apps Script, ejecuta:
limpiarVotosPrueba()
```

---

## ✅ Checklist Final

- [ ] Google Sheet creado con columnas correctas
- [ ] Google Apps Script creado y configurado
- [ ] SHEET_ID actualizado en el script
- [ ] Script desplegado como aplicación web
- [ ] URL del script copiada
- [ ] URL actualizada en el frontend
- [ ] Prueba exitosa desde Apps Script
- [ ] Prueba exitosa desde el frontend
- [ ] Votos aparecen correctamente en el sheet

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa la consola del navegador (F12)
2. Revisa los logs de Google Apps Script
3. Verifica que todos los IDs y URLs sean correctos
4. Asegúrate de que los permisos estén configurados correctamente

¡Listo! 🎉 Ahora los votos de los jurados se guardarán automáticamente en tu Google Sheet.