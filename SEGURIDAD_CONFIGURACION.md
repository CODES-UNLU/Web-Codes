# 🔒 Configuración de Seguridad - CODES Multiplicador

## ⚠️ IMPORTANTE: Configuración de Tokens

### **1. Archivo de Configuración Seguro**

**NUNCA** subas el archivo `api/config.php` a GitHub o repositorios públicos.

### **2. Pasos para Configurar:**

1. **Copia el archivo de ejemplo:**
   ```bash
   cp api/config.example.php api/config.php
   ```

2. **Edita `api/config.php`** y reemplaza:
   ```php
   'mercadopago_token' => 'TU_TOKEN_DE_MERCADOPAGO_AQUI'
   ```
   
   Con tu token real:
   ```php
   'mercadopago_token' => 'APP_USR-tu-token-real-aqui'
   ```

3. **Verifica que `api/config.php` esté en `.gitignore`**

### **3. Archivos Protegidos por .gitignore:**
- `api/config.php` - Contiene tokens sensibles
- `data/slot-results.json` - Datos de usuarios
- `data/sorteo-data.json` - Datos de sorteos

### **4. Para Despliegue en Producción:**

#### **Opción A: Variables de Entorno**
```php
// En api/config.php
'mercadopago_token' => $_ENV['MERCADOPAGO_TOKEN'] ?? 'token-por-defecto'
```

#### **Opción B: Archivo de Configuración del Servidor**
Crear `api/config.php` directamente en el servidor con el token real.

### **5. Verificación de Seguridad:**

✅ **Correcto:**
- Token en archivo local no versionado
- Archivo en `.gitignore`
- No aparece en commits

❌ **Incorrecto:**
- Token en código fuente
- Token en repositorio público
- Token visible en GitHub

### **6. Si el Token se Comprometió:**

1. **Cambia el token inmediatamente** en MercadoPago
2. **Revisa transacciones** por actividad sospechosa
3. **Actualiza la configuración** con el nuevo token
4. **Verifica que no esté en el historial** de Git

## 🛡️ Buenas Prácticas:

- **Nunca** commitees archivos con tokens
- **Usa** variables de entorno en producción
- **Revisa** regularmente los accesos a MercadoPago
- **Mantén** actualizado el `.gitignore`
