# 🔐 SEGURIDAD DE TOKENS - MERCADOPAGO

## ⚠️ IMPORTANTE - LECTURA OBLIGATORIA

### 🚨 TOKENS EXPUESTOS EN GITHUB

Los siguientes archivos contienen tokens de MercadoPago y **NO deben subirse a GitHub**:

- `debug-mercadopago.html`
- `test-verificacion-pagos.html` 
- `tokens-config.js`

### ✅ SOLUCIÓN IMPLEMENTADA

1. **Archivo `.gitignore`** creado para proteger archivos sensibles
2. **Archivo `tokens-config.js`** separado para configuración de tokens
3. **Multiplicador actualizado** para usar configuración externa

### 🔧 CONFIGURACIÓN ACTUAL

**Token de Producción:**
```
APP_USR-5908100961878781-090200-9bd7f18e05183969bb57b0169815fff9-2142366374
```

**Token de Prueba:**
```
TEST-5908100961878781-080320-3d4cf3e45d4723bffa7e302677cce571-2142366374
```

### 📋 INSTRUCCIONES PARA DESARROLLO

1. **Nunca subas** los archivos de prueba a GitHub
2. **Mantén `tokens-config.js`** local y privado
3. **Usa el `.gitignore`** para proteger archivos sensibles
4. **Verifica** que los tokens no aparezcan en commits

### 🛡️ ARCHIVOS PROTEGIDOS

Los siguientes archivos están en `.gitignore` y no se subirán:

```
debug-mercadopago.html
test-verificacion-pagos.html
tokens-config.js
test-*.html
debug-*.html
```

### 🔍 VERIFICACIÓN

Para verificar que no hay tokens expuestos:

```bash
# Buscar tokens en archivos
grep -r "APP_USR-" . --exclude-dir=.git
grep -r "TEST-" . --exclude-dir=.git
```

### 📞 CONTACTO

Si necesitas regenerar tokens o tienes dudas sobre seguridad, contacta al administrador del sistema.


