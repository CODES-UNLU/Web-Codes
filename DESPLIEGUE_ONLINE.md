# 🚀 Guía de Despliegue Online - CODES Multiplicador

## 📋 **Pasos para Subir la Web**

### **1. Archivos que SÍ se suben:**
- ✅ `index.html` - Página principal
- ✅ `multiplicador.html` - Slot machine
- ✅ `estadisticas-final.html` - Estadísticas
- ✅ `data/slot-results-initial.json` - Archivo inicial vacío
- ✅ `api/` - Carpeta con endpoints PHP
- ✅ `assets/` - CSS, JS, imágenes

### **2. Archivos que NO se suben (por seguridad):**
- ❌ `api/config.php` - Contiene tokens sensibles
- ❌ `data/slot-results.json` - Datos de usuarios (se crea automáticamente)

### **3. Configuración en el Servidor:**

#### **A. Crear archivo de configuración:**
1. **Sube todos los archivos** excepto `api/config.php`
2. **Crea manualmente** `api/config.php` en el servidor con:
   ```php
   <?php
   return [
       'min_date' => '2025-09-17T00:00:00.000Z',
       'min_amount' => 25,
       'mercadopago_token' => 'TU_TOKEN_REAL_AQUI'
   ];
   ?>
   ```

#### **B. Crear directorio de datos:**
1. **Crea la carpeta** `data/` en el servidor
2. **Sube** `data/slot-results-initial.json`
3. **Asegúrate** de que la carpeta tenga permisos de escritura

### **4. Verificación Post-Despliegue:**

#### **✅ Checklist:**
- [ ] Página principal carga correctamente
- [ ] Botón "Multiplicador" funciona
- [ ] Slot machine verifica pagos
- [ ] Estadísticas muestran datos (aunque estén vacíos inicialmente)
- [ ] No hay errores en la consola del navegador

#### **🔍 URLs a probar:**
- `https://tu-dominio.com/` - Página principal
- `https://tu-dominio.com/multiplicador.html` - Slot machine
- `https://tu-dominio.com/estadisticas-final.html` - Estadísticas

### **5. Solución de Problemas:**

#### **❌ "No se cargan los datos":**
- Verifica que `data/slot-results-initial.json` esté subido
- Verifica permisos de escritura en carpeta `data/`
- Revisa la consola del navegador para errores

#### **❌ "Error de verificación de pago":**
- Verifica que `api/config.php` esté creado con el token correcto
- Verifica que el token de MercadoPago sea válido

#### **❌ "CORS error":**
- Normal en desarrollo local
- No debería ocurrir en servidor de producción

### **6. Mantenimiento:**

#### **📊 Datos de usuarios:**
- Los datos se guardan automáticamente en `data/slot-results.json`
- Este archivo NO se sube al repositorio (por privacidad)
- Se crea automáticamente cuando alguien juega

#### **🔒 Seguridad:**
- `api/config.php` nunca se sube al repositorio
- Se crea manualmente en cada servidor
- Contiene solo el token de MercadoPago

## ✅ **Resultado Final:**

Una vez configurado correctamente:
- ✅ Usuarios pueden jugar y verificar pagos
- ✅ Datos se guardan automáticamente
- ✅ Estadísticas se actualizan en tiempo real
- ✅ Sistema completamente funcional online
