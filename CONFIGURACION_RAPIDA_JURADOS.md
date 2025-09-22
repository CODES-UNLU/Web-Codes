# ⚡ Configuración Rápida - Sistema Jurados

## 🎯 Tu Google Sheet ID: `1UmhBDevk6MvgDqmj_WuQbCsk3sQz1aCiSHwC3OY8QPU`

---

## 📋 Paso 1: Configurar Google Sheet

### 1.1 Abrir tu Google Sheet
Ve a: https://docs.google.com/spreadsheets/d/1UmhBDevk6MvgDqmj_WuQbCsk3sQz1aCiSHwC3OY8QPU/edit

### 1.2 Crear pestaña "Votos Jurados"
1. Haz clic en el **"+"** al final de las pestañas
2. Nombra la nueva pestaña: **"Votos Jurados"**

### 1.3 Configurar columnas (A1:H1)
```
A1: Timestamp
B1: Jurado
C1: Equipo
D1: Propuesta_ID
E1: Titulo_Propuesta
F1: Categoria
G1: Fecha_Hora
H1: Confirmado
```

### 1.4 Formatear encabezados
1. Selecciona A1:H1
2. **Negrita** (Ctrl+B)
3. Fondo azul, texto blanco

---

## 🔧 Paso 2: Crear Google Apps Script

### 2.1 Abrir Apps Script
1. En tu Google Sheet: **Extensiones** → **Apps Script**
2. **Borra todo** el código existente
3. **Copia y pega** el código de `jurados-votacion-script.gs`

### 2.2 Guardar
1. **Guardar** (Ctrl+S)
2. Nombre: **"Sistema Votación Jurados"**

### 2.3 Desplegar
1. **Desplegar** → **Nueva implementación**
2. **Tipo**: "Aplicación web"
3. **Ejecutar como**: "Yo"
4. **Quién tiene acceso**: "Cualquiera"
5. **Desplegar**

### 2.4 Copiar URL
Copia la URL que aparece (algo como: `https://script.google.com/macros/s/ABC123.../exec`)

---

## 🌐 Paso 3: Configurar Frontend

### 3.1 Actualizar jurados.html
1. Abre `jurados.html`
2. Busca: `const baseUrl = 'TU_GOOGLE_APPS_SCRIPT_URL_AQUI';`
3. Reemplaza con tu URL de Google Apps Script

### 3.2 Ejemplo:
```javascript
const baseUrl = 'https://script.google.com/macros/s/TU_SCRIPT_ID_AQUI/exec';
```

---

## 🧪 Paso 4: Probar

### 4.1 Usar página de prueba
1. Abre `test-google-sheets-jurados.html`
2. Pega tu URL de Google Apps Script
3. Haz clic en **"Enviar Voto de Prueba"**
4. Ve a tu Google Sheet para verificar

### 4.2 Probar desde jurados.html
1. Abre `jurados.html`
2. Selecciona un jurado
3. Vota por una propuesta
4. Confirma en el modal
5. Verifica en tu Google Sheet

---

## ✅ Checklist Rápido

- [ ] Google Sheet abierto y pestaña "Votos Jurados" creada
- [ ] Columnas A1:H1 configuradas
- [ ] Google Apps Script creado con el código
- [ ] Script desplegado como aplicación web
- [ ] URL del script copiada
- [ ] URL actualizada en jurados.html
- [ ] Prueba exitosa desde test-google-sheets-jurados.html
- [ ] Prueba exitosa desde jurados.html

---

## 🆘 Si algo no funciona

1. **Revisa la consola del navegador** (F12)
2. **Verifica que la URL del script sea correcta**
3. **Asegúrate de que el script tenga permisos**
4. **Revisa que la pestaña se llame exactamente "Votos Jurados"**

---

## 🎉 ¡Listo!

Una vez completado, cada voto de jurado se guardará automáticamente en tu Google Sheet con toda la información detallada.
