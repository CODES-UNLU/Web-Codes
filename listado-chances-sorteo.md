# Listado de Chances - Sorteo Tablet CODES++

## Resumen del Sorteo
- **Fecha de generación**: ${new Date().toLocaleDateString('es-ES')}
- **Total de participantes**: [CALCULAR]
- **Total de chances**: [CALCULAR]

## Instrucciones para Generar el Listado

Para generar el listado actualizado de chances, sigue estos pasos:

### 1. Abrir la Consola del Navegador
1. Ve a la página `verificar-chances.html`
2. Presiona `F12` para abrir las herramientas de desarrollador
3. Ve a la pestaña "Console"

### 2. Ejecutar el Script de Generación
Copia y pega el siguiente código en la consola:

```javascript
// Función para generar el listado de chances
function generarListadoChances() {
    console.log('=== GENERANDO LISTADO DE CHANCES ===');
    
    // Verificar que los datos estén cargados
    if (typeof datosSorteo === 'undefined' || datosSorteo.length === 0) {
        console.log('❌ No hay datos disponibles. Espera a que se carguen los datos.');
        return;
    }
    
    console.log('📊 Datos disponibles:', datosSorteo.length, 'registros');
    
    // Agrupar por DNI y sumar chances
    const participantes = {};
    datosSorteo.forEach(registro => {
        if (registro.dni && registro.chances) {
            if (!participantes[registro.dni]) {
                participantes[registro.dni] = 0;
            }
            participantes[registro.dni] += parseInt(registro.chances) || 0;
        }
    });
    
    console.log('👥 Participantes únicos:', Object.keys(participantes).length);
    
    // Ordenar por chances (descendente)
    const ranking = Object.entries(participantes)
        .map(([dni, chances]) => ({ dni, chances }))
        .sort((a, b) => b.chances - a.chances);
    
    // Generar contenido Markdown
    let contenido = `# Listado de Chances - Sorteo Tablet CODES++

## Resumen del Sorteo
- **Fecha de generación**: ${new Date().toLocaleDateString('es-ES')}
- **Total de participantes**: ${ranking.length}
- **Total de chances**: ${ranking.reduce((sum, p) => sum + p.chances, 0)}

## Ranking de Participantes

| Posición | DNI | Chances |
|----------|-----|---------|`;

    ranking.forEach((participante, index) => {
        const posicion = index + 1;
        const medalla = posicion === 1 ? '🥇' : posicion === 2 ? '🥈' : posicion === 3 ? '🥉' : '';
        contenido += `\n| ${posicion} ${medalla} | ${participante.dni} | ${participante.chances} |`;
    });
    
    contenido += `

## Estadísticas Adicionales

### Distribución de Chances
`;

    // Calcular estadísticas
    const chances = ranking.map(p => p.chances);
    const maxChances = Math.max(...chances);
    const minChances = Math.min(...chances);
    const promedioChances = chances.reduce((sum, c) => sum + c, 0) / chances.length;
    
    contenido += `- **Máximo de chances**: ${maxChances}
- **Mínimo de chances**: ${minChances}
- **Promedio de chances**: ${promedioChances.toFixed(2)}
- **Participantes con chances máximas**: ${chances.filter(c => c === maxChances).length}

### Rangos de Chances
`;

    // Agrupar por rangos
    const rangos = {
        '1-10': chances.filter(c => c >= 1 && c <= 10).length,
        '11-25': chances.filter(c => c >= 11 && c <= 25).length,
        '26-50': chances.filter(c => c >= 26 && c <= 50).length,
        '51-100': chances.filter(c => c >= 51 && c <= 100).length,
        '100+': chances.filter(c => c > 100).length
    };
    
    Object.entries(rangos).forEach(([rango, cantidad]) => {
        if (cantidad > 0) {
            contenido += `- **${rango} chances**: ${cantidad} participantes\n`;
        }
    });
    
    contenido += `

---
*Listado generado automáticamente por el sistema de sorteo CODES++*
`;

    // Mostrar en consola
    console.log('📋 LISTADO GENERADO:');
    console.log(contenido);
    
    // Copiar al portapapeles
    navigator.clipboard.writeText(contenido).then(() => {
        console.log('✅ Listado copiado al portapapeles');
        console.log('📝 Puedes pegarlo en un archivo .md');
    }).catch(err => {
        console.log('❌ Error copiando al portapapeles:', err);
        console.log('📋 Copia manualmente el contenido de arriba');
    });
    
    return contenido;
}

// Ejecutar la función
generarListadoChances();
```

### 3. Copiar el Resultado
1. El script generará el listado completo en formato Markdown
2. Se copiará automáticamente al portapapeles
3. Pega el contenido en un archivo `.md` nuevo

## Formato del Listado

El listado incluirá:

- **Resumen del sorteo** (total participantes, total chances)
- **Ranking completo** ordenado por chances
- **Medallas** para los primeros 3 lugares
- **Estadísticas adicionales** (máximo, mínimo, promedio)
- **Distribución por rangos** de chances

## Notas Importantes

- ⚠️ **Asegúrate de que los datos estén cargados** antes de ejecutar el script
- 📊 **El listado se genera en tiempo real** con los datos actuales
- 🔄 **Actualiza la página** si no aparecen los datos
- 📝 **Guarda el archivo** con extensión `.md` para mantener el formato

---

*Sistema de Sorteo CODES++ - Centro de Estudiantes de Sistemas UNLu*
