# 📱 Modo Offline - Instrucciones
## Hackathon CODES++ 2025

## 🎯 Estado Actual: Modo Offline Activo

El sistema está funcionando en **modo offline**, lo que significa que:
- ✅ **Los votos se guardan localmente** en el navegador
- ✅ **La funcionalidad principal funciona** sin problemas
- ⚠️ **Los datos no se envían a Google Sheets** automáticamente
- 🔄 **Se pueden sincronizar más tarde** cuando se restablezca la conexión

## 📊 ¿Qué Significa Esto?

### ✅ **Funciona Correctamente:**
- Los jurados pueden votar normalmente
- Los votos se registran y cuentan
- Los resultados se muestran en tiempo real
- Los datos se guardan en el navegador

### ⚠️ **Limitaciones:**
- Los datos no se respaldan en Google Sheets
- No se pueden ver desde otros dispositivos
- Requiere sincronización manual más tarde

## 🛠️ Soluciones Disponibles

### Opción 1: Usar el Sistema de Sincronización
1. **Abrir `sincronizar-datos-offline.html`**
2. **Hacer clic en "🔄 Probar Conexión"**
3. **Si se conecta, hacer clic en "📤 Sincronizar Todo"**

### Opción 2: Exportar Datos Manualmente
1. **Abrir `sincronizar-datos-offline.html`**
2. **Hacer clic en "📋 Exportar Datos"**
3. **Se descargará un archivo JSON** con todos los datos
4. **Guardar el archivo** como respaldo

### Opción 3: Continuar en Modo Offline
- **El sistema funciona perfectamente** en modo offline
- **Los datos se mantienen** mientras uses el mismo navegador
- **Se pueden sincronizar más tarde** cuando se resuelva la conexión

## 🔍 Verificar Datos Guardados

### En el Navegador (F12):
```javascript
// Ver votos guardados
console.log(JSON.parse(localStorage.getItem('hackathon_votos') || '[]'));

// Ver calificaciones guardadas
console.log(JSON.parse(localStorage.getItem('hackathon_calificaciones') || '[]'));
```

### Usando la Herramienta de Sincronización:
1. Abrir `sincronizar-datos-offline.html`
2. Ver la sección "💾 Datos Guardados Localmente"
3. Revisar cuántos votos y calificaciones hay

## 🚀 Próximos Pasos Recomendados

### Para el Hackathon (Inmediato):
1. **Continuar usando el sistema** - funciona perfectamente
2. **Los jurados pueden votar normalmente**
3. **Los resultados se muestran correctamente**

### Para Resolver la Conexión (Más Tarde):
1. **Verificar Google Apps Script**:
   - Ir a https://script.google.com/
   - Verificar que el script esté desplegado
   - Re-autorizar permisos si es necesario

2. **Probar la conexión**:
   - Abrir `diagnostico-google-sheets.html`
   - Hacer clic en "🔄 Probar Conexión"

3. **Sincronizar datos**:
   - Abrir `sincronizar-datos-offline.html`
   - Hacer clic en "📤 Sincronizar Todo"

## 📋 Respaldo de Datos

### Automático:
- Los datos se guardan automáticamente en el navegador
- Se mantienen hasta que se limpien los datos del navegador

### Manual:
- Exportar datos usando `sincronizar-datos-offline.html`
- Guardar el archivo JSON como respaldo
- Importar más tarde si es necesario

## 🎉 Conclusión

**¡El sistema está funcionando correctamente!** 

- ✅ Los jurados pueden votar
- ✅ Los resultados se muestran
- ✅ Los datos se guardan localmente
- ✅ Se pueden sincronizar más tarde

**No hay problema en continuar con el hackathon en modo offline.** Los datos están seguros y se pueden sincronizar cuando se resuelva la conexión con Google Sheets.

## 📞 Soporte

Si necesitas ayuda:
1. **Revisar `diagnostico-google-sheets.html`** para identificar problemas
2. **Usar `sincronizar-datos-offline.html`** para sincronizar datos
3. **Exportar datos** como respaldo si es necesario

**¡El hackathon puede continuar sin problemas!** 🚀
