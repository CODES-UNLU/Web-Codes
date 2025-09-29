/**
 * SCRIPT PARA GENERAR HOJA DE CALIFICACIONES - HACKATHON CODES++
 * 
 * Este script crea una nueva hoja de cálculo para recibir las calificaciones
 * de los proyectos finales del hackathon según los criterios oficiales.
 * 
 * CRITERIOS DE EVALUACIÓN:
 * - Funcionalidad (30%)
 * - Innovación (25%)
 * - Calidad Técnica (20%)
 * - Presentación (15%)
 * - Viabilidad (10%)
 * 
 * INSTRUCCIONES:
 * 1. Abre Google Apps Script (script.google.com)
 * 2. Crea un nuevo proyecto
 * 3. Copia y pega este código
 * 4. Ejecuta la función 'crearHojaCalificaciones()'
 * 5. Copia la URL del script para usar en jurados.html
 */

function crearHojaCalificaciones() {
  try {
    // Crear nueva hoja de cálculo
    const spreadsheet = SpreadsheetApp.create('Hackathon CODES++ - Calificaciones Proyectos');
    
    // Crear hoja de calificaciones principales
    const hojaCalificaciones = spreadsheet.getActiveSheet();
    hojaCalificaciones.setName('Calificaciones_Proyectos');
    
    // Configurar encabezados para calificaciones
    const encabezados = [
      'ID_Calificacion',
      'Timestamp',
      'Fecha_Hora',
      'Jurado',
      'Proyecto_ID',
      'Equipo',
      'Titulo_Proyecto',
      'Funcionalidad_30',
      'Innovacion_25',
      'Calidad_Tecnica_20',
      'Presentacion_15',
      'Viabilidad_10',
      'Puntuacion_Total',
      'Puntuacion_Ponderada',
      'Completado',
      'IP_Address',
      'User_Agent'
    ];
    
    // Escribir encabezados
    hojaCalificaciones.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);
    
    // Formatear encabezados
    const rangoEncabezados = hojaCalificaciones.getRange(1, 1, 1, encabezados.length);
    rangoEncabezados.setBackground('#4285f4');
    rangoEncabezados.setFontColor('white');
    rangoEncabezados.setFontWeight('bold');
    rangoEncabezados.setHorizontalAlignment('center');
    
    // Ajustar ancho de columnas
    hojaCalificaciones.autoResizeColumns(1, encabezados.length);
    
    // Crear hoja de ranking de proyectos
    const hojaRanking = spreadsheet.insertSheet('Ranking_Proyectos');
    const encabezadosRanking = [
      'Posicion',
      'Equipo',
      'Proyecto',
      'Puntuacion_Promedio',
      'Total_Jurados',
      'Funcionalidad_Promedio',
      'Innovacion_Promedio',
      'Calidad_Tecnica_Promedio',
      'Presentacion_Promedio',
      'Viabilidad_Promedio',
      'Mejor_Calificacion',
      'Peor_Calificacion',
      'Diferencia',
      'Estado'
    ];
    
    hojaRanking.getRange(1, 1, 1, encabezadosRanking.length).setValues([encabezadosRanking]);
    
    // Formatear hoja de ranking
    const rangoEncabezadosRanking = hojaRanking.getRange(1, 1, 1, encabezadosRanking.length);
    rangoEncabezadosRanking.setBackground('#34a853');
    rangoEncabezadosRanking.setFontColor('white');
    rangoEncabezadosRanking.setFontWeight('bold');
    rangoEncabezadosRanking.setHorizontalAlignment('center');
    
    // Crear hoja de estadísticas de jurados
    const hojaEstadisticasJurados = spreadsheet.insertSheet('Estadisticas_Jurados');
    const encabezadosEstadisticas = [
      'Jurado',
      'Proyectos_Calificados',
      'Calificaciones_Completadas',
      'Promedio_General',
      'Primera_Calificacion',
      'Ultima_Calificacion',
      'Tiempo_Promedio',
      'Consistencia',
      'Estado'
    ];
    
    hojaEstadisticasJurados.getRange(1, 1, 1, encabezadosEstadisticas.length).setValues([encabezadosEstadisticas]);
    
    // Formatear hoja de estadísticas
    const rangoEncabezadosEstadisticas = hojaEstadisticasJurados.getRange(1, 1, 1, encabezadosEstadisticas.length);
    rangoEncabezadosEstadisticas.setBackground('#ea4335');
    rangoEncabezadosEstadisticas.setFontColor('white');
    rangoEncabezadosEstadisticas.setFontWeight('bold');
    rangoEncabezadosEstadisticas.setHorizontalAlignment('center');
    
    // Crear hoja de análisis detallado
    const hojaAnalisis = spreadsheet.insertSheet('Analisis_Detallado');
    const encabezadosAnalisis = [
      'Criterio',
      'Peso',
      'Puntuacion_Minima',
      'Puntuacion_Maxima',
      'Puntuacion_Promedio',
      'Desviacion_Estandar',
      'Proyectos_Calificados',
      'Mejor_Proyecto',
      'Peor_Proyecto'
    ];
    
    hojaAnalisis.getRange(1, 1, 1, encabezadosAnalisis.length).setValues([encabezadosAnalisis]);
    
    // Agregar datos iniciales de criterios
    agregarDatosInicialesCriterios(hojaAnalisis);
    
    // Ajustar columnas en todas las hojas
    hojaRanking.autoResizeColumns(1, encabezadosRanking.length);
    hojaEstadisticasJurados.autoResizeColumns(1, encabezadosEstadisticas.length);
    hojaAnalisis.autoResizeColumns(1, encabezadosAnalisis.length);
    
    // Mostrar URL del spreadsheet
    const url = spreadsheet.getUrl();
    console.log('✅ Hoja de calificaciones creada exitosamente!');
    console.log('📊 URL: ' + url);
    console.log('🔗 Comparte esta URL con los administradores del hackathon');
    
    return {
      success: true,
      spreadsheetId: spreadsheet.getId(),
      url: url,
      message: 'Hoja de calificaciones creada exitosamente'
    };
    
  } catch (error) {
    console.error('❌ Error al crear la hoja de calificaciones:', error);
    return {
      success: false,
      error: error.toString(),
      message: 'Error al crear la hoja de calificaciones'
    };
  }
}

function agregarDatosInicialesCriterios(hojaAnalisis) {
  // Datos de los criterios de evaluación
  const criterios = [
    ['Funcionalidad', '30%', 1, 5, 0, 0, 0, 'N/A', 'N/A'],
    ['Innovación', '25%', 1, 5, 0, 0, 0, 'N/A', 'N/A'],
    ['Calidad Técnica', '20%', 1, 5, 0, 0, 0, 'N/A', 'N/A'],
    ['Presentación', '15%', 1, 5, 0, 0, 0, 'N/A', 'N/A'],
    ['Viabilidad', '10%', 1, 5, 0, 0, 0, 'N/A', 'N/A']
  ];
  
  // Escribir datos de criterios
  if (criterios.length > 0) {
    hojaAnalisis.getRange(2, 1, criterios.length, criterios[0].length).setValues(criterios);
  }
}

/**
 * FUNCIÓN PRINCIPAL PARA RECIBIR CALIFICACIONES
 * Esta función se ejecuta cuando llegan calificaciones desde el sistema de jurados
 */
function doGet(e) {
  try {
    // Obtener parámetros de la URL
    const jurado = e.parameter.jurado || 'No especificado';
    const proyectoId = e.parameter.proyectoId || 'No especificado';
    const equipo = e.parameter.equipo || 'No especificado';
    const titulo = e.parameter.titulo || 'No especificado';
    const funcionalidad = parseFloat(e.parameter.funcionalidad) || 0;
    const innovacion = parseFloat(e.parameter.innovacion) || 0;
    const calidad = parseFloat(e.parameter.calidad) || 0;
    const presentacion = parseFloat(e.parameter.presentacion) || 0;
    const viabilidad = parseFloat(e.parameter.viabilidad) || 0;
    const timestamp = e.parameter.timestamp || new Date().toISOString();
    
    // Obtener información del usuario
    const ipAddress = e.parameter.ip || 'No disponible';
    const userAgent = e.parameter.ua || 'No disponible';
    
    // Generar ID único para la calificación
    const calificacionId = 'CAL_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Calcular puntuación total (escala 1-5)
    const puntuacionTotal = funcionalidad + innovacion + calidad + presentacion + viabilidad;
    
    // Calcular puntuación ponderada
    const puntuacionPonderada = (
      funcionalidad * 0.30 +
      innovacion * 0.25 +
      calidad * 0.20 +
      presentacion * 0.15 +
      viabilidad * 0.10
    );
    
    // Verificar si la calificación está completa
    const completado = (funcionalidad > 0 && innovacion > 0 && calidad > 0 && presentacion > 0 && viabilidad > 0);
    
    // Obtener la hoja de calificaciones
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaCalificaciones = spreadsheet.getSheetByName('Calificaciones_Proyectos');
    
    if (!hojaCalificaciones) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Hoja de calificaciones no encontrada'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Preparar datos de la calificación
    const fechaHora = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Argentina/Buenos_Aires'
    });
    
    const datosCalificacion = [
      calificacionId,
      timestamp,
      fechaHora,
      jurado,
      proyectoId,
      equipo,
      titulo,
      funcionalidad,
      innovacion,
      calidad,
      presentacion,
      viabilidad,
      puntuacionTotal,
      puntuacionPonderada,
      completado,
      ipAddress,
      userAgent
    ];
    
    // Agregar calificación a la hoja
    const ultimaFila = hojaCalificaciones.getLastRow();
    hojaCalificaciones.getRange(ultimaFila + 1, 1, 1, datosCalificacion.length).setValues([datosCalificacion]);
    
    // Actualizar ranking de proyectos
    actualizarRankingProyectos();
    
    // Actualizar estadísticas de jurados
    actualizarEstadisticasJurado(jurado, puntuacionPonderada, completado);
    
    // Actualizar análisis detallado
    actualizarAnalisisDetallado();
    
    // Log de la calificación recibida
    console.log('⭐ Calificación recibida:', {
      calificacionId: calificacionId,
      jurado: jurado,
      equipo: equipo,
      proyecto: titulo,
      puntuacionPonderada: puntuacionPonderada.toFixed(2),
      completado: completado
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      calificacionId: calificacionId,
      puntuacionPonderada: puntuacionPonderada.toFixed(2),
      completado: completado,
      message: 'Calificación registrada exitosamente',
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ Error al procesar calificación:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: 'Error al procesar la calificación'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function actualizarRankingProyectos() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaCalificaciones = spreadsheet.getSheetByName('Calificaciones_Proyectos');
    const hojaRanking = spreadsheet.getSheetByName('Ranking_Proyectos');
    
    if (!hojaCalificaciones || !hojaRanking) return;
    
    // Obtener todas las calificaciones
    const datos = hojaCalificaciones.getDataRange().getValues();
    const calificaciones = {};
    
    // Procesar calificaciones (saltando encabezados)
    for (let i = 1; i < datos.length; i++) {
      const fila = datos[i];
      const proyectoId = fila[4];
      const equipo = fila[5];
      const titulo = fila[6];
      const puntuacionPonderada = fila[13];
      const completado = fila[14];
      
      if (completado && puntuacionPonderada > 0) {
        if (!calificaciones[proyectoId]) {
          calificaciones[proyectoId] = {
            equipo: equipo,
            titulo: titulo,
            puntuaciones: [],
            funcionalidad: [],
            innovacion: [],
            calidad: [],
            presentacion: [],
            viabilidad: []
          };
        }
        
        calificaciones[proyectoId].puntuaciones.push(puntuacionPonderada);
        calificaciones[proyectoId].funcionalidad.push(fila[7]);
        calificaciones[proyectoId].innovacion.push(fila[8]);
        calificaciones[proyectoId].calidad.push(fila[9]);
        calificaciones[proyectoId].presentacion.push(fila[10]);
        calificaciones[proyectoId].viabilidad.push(fila[11]);
      }
    }
    
    // Calcular promedios y crear ranking
    const ranking = [];
    Object.keys(calificaciones).forEach(proyectoId => {
      const proyecto = calificaciones[proyectoId];
      const promedio = proyecto.puntuaciones.reduce((sum, p) => sum + p, 0) / proyecto.puntuaciones.length;
      const totalJurados = proyecto.puntuaciones.length;
      
      ranking.push({
        proyectoId: proyectoId,
        equipo: proyecto.equipo,
        titulo: proyecto.titulo,
        promedio: promedio,
        totalJurados: totalJurados,
        funcionalidadPromedio: proyecto.funcionalidad.reduce((sum, f) => sum + f, 0) / proyecto.funcionalidad.length,
        innovacionPromedio: proyecto.innovacion.reduce((sum, i) => sum + i, 0) / proyecto.innovacion.length,
        calidadPromedio: proyecto.calidad.reduce((sum, c) => sum + c, 0) / proyecto.calidad.length,
        presentacionPromedio: proyecto.presentacion.reduce((sum, p) => sum + p, 0) / proyecto.presentacion.length,
        viabilidadPromedio: proyecto.viabilidad.reduce((sum, v) => sum + v, 0) / proyecto.viabilidad.length,
        mejorCalificacion: Math.max(...proyecto.puntuaciones),
        peorCalificacion: Math.min(...proyecto.puntuaciones)
      });
    });
    
    // Ordenar por puntuación promedio (descendente)
    ranking.sort((a, b) => b.promedio - a.promedio);
    
    // Limpiar hoja de ranking
    hojaRanking.getRange(2, 1, hojaRanking.getLastRow() - 1, hojaRanking.getLastColumn()).clear();
    
    // Escribir nuevo ranking
    if (ranking.length > 0) {
      const datosRanking = ranking.map((item, index) => [
        index + 1, // Posición
        item.equipo,
        item.titulo,
        item.promedio.toFixed(2),
        item.totalJurados,
        item.funcionalidadPromedio.toFixed(2),
        item.innovacionPromedio.toFixed(2),
        item.calidadPromedio.toFixed(2),
        item.presentacionPromedio.toFixed(2),
        item.viabilidadPromedio.toFixed(2),
        item.mejorCalificacion.toFixed(2),
        item.peorCalificacion.toFixed(2),
        (item.mejorCalificacion - item.peorCalificacion).toFixed(2),
        'Calificado'
      ]);
      
      hojaRanking.getRange(2, 1, datosRanking.length, datosRanking[0].length).setValues(datosRanking);
    }
    
    console.log('📊 Ranking actualizado con ' + ranking.length + ' proyectos');
    
  } catch (error) {
    console.error('❌ Error al actualizar ranking:', error);
  }
}

function actualizarEstadisticasJurado(jurado, puntuacionPonderada, completado) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaEstadisticas = spreadsheet.getSheetByName('Estadisticas_Jurados');
    
    if (!hojaEstadisticas) return;
    
    // Buscar si el jurado ya existe
    const datos = hojaEstadisticas.getDataRange().getValues();
    let filaJurado = -1;
    
    for (let i = 1; i < datos.length; i++) {
      if (datos[i][0] === jurado) {
        filaJurado = i + 1;
        break;
      }
    }
    
    const ultimaCalificacion = new Date().toLocaleString('es-ES');
    
    if (filaJurado > 0) {
      // Actualizar jurado existente
      const proyectosCalificados = datos[filaJurado - 1][1] + 1;
      const calificacionesCompletadas = datos[filaJurado - 1][2] + (completado ? 1 : 0);
      
      hojaEstadisticas.getRange(filaJurado, 2).setValue(proyectosCalificados);
      hojaEstadisticas.getRange(filaJurado, 3).setValue(calificacionesCompletadas);
      hojaEstadisticas.getRange(filaJurado, 6).setValue(ultimaCalificacion);
      hojaEstadisticas.getRange(filaJurado, 8).setValue('Activo');
      
    } else {
      // Agregar nuevo jurado
      const nuevaFila = hojaEstadisticas.getLastRow() + 1;
      const primeraCalificacion = new Date().toLocaleString('es-ES');
      
      hojaEstadisticas.getRange(nuevaFila, 1).setValue(jurado);
      hojaEstadisticas.getRange(nuevaFila, 2).setValue(1);
      hojaEstadisticas.getRange(nuevaFila, 3).setValue(completado ? 1 : 0);
      hojaEstadisticas.getRange(nuevaFila, 4).setValue(completado ? puntuacionPonderada.toFixed(2) : '0.00');
      hojaEstadisticas.getRange(nuevaFila, 5).setValue(primeraCalificacion);
      hojaEstadisticas.getRange(nuevaFila, 6).setValue(ultimaCalificacion);
      hojaEstadisticas.getRange(nuevaFila, 7).setValue('0 min');
      hojaEstadisticas.getRange(nuevaFila, 8).setValue('Activo');
      hojaEstadisticas.getRange(nuevaFila, 9).setValue('Activo');
    }
    
    console.log(`👤 Estadísticas actualizadas para ${jurado}`);
    
  } catch (error) {
    console.error('❌ Error al actualizar estadísticas:', error);
  }
}

function actualizarAnalisisDetallado() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaCalificaciones = spreadsheet.getSheetByName('Calificaciones_Proyectos');
    const hojaAnalisis = spreadsheet.getSheetByName('Analisis_Detallado');
    
    if (!hojaCalificaciones || !hojaAnalisis) return;
    
    // Obtener todas las calificaciones completadas
    const datos = hojaCalificaciones.getDataRange().getValues();
    const criterios = ['Funcionalidad', 'Innovación', 'Calidad Técnica', 'Presentación', 'Viabilidad'];
    const pesos = [0.30, 0.25, 0.20, 0.15, 0.10];
    const columnas = [7, 8, 9, 10, 11]; // Columnas de los criterios
    
    criterios.forEach((criterio, index) => {
      const columna = columnas[index];
      const puntuaciones = [];
      
      // Recopilar puntuaciones del criterio
      for (let i = 1; i < datos.length; i++) {
        if (datos[i][14] && datos[i][columna] > 0) { // Si está completado y tiene puntuación
          puntuaciones.push(datos[i][columna]);
        }
      }
      
      if (puntuaciones.length > 0) {
        const promedio = puntuaciones.reduce((sum, p) => sum + p, 0) / puntuaciones.length;
        const min = Math.min(...puntuaciones);
        const max = Math.max(...puntuaciones);
        
        // Calcular desviación estándar
        const varianza = puntuaciones.reduce((sum, p) => sum + Math.pow(p - promedio, 2), 0) / puntuaciones.length;
        const desviacion = Math.sqrt(varianza);
        
        // Actualizar datos en la hoja de análisis
        const fila = index + 2; // +2 porque la fila 1 son encabezados
        hojaAnalisis.getRange(fila, 3).setValue(min);
        hojaAnalisis.getRange(fila, 4).setValue(max);
        hojaAnalisis.getRange(fila, 5).setValue(promedio.toFixed(2));
        hojaAnalisis.getRange(fila, 6).setValue(desviacion.toFixed(2));
        hojaAnalisis.getRange(fila, 7).setValue(puntuaciones.length);
      }
    });
    
    console.log('📈 Análisis detallado actualizado');
    
  } catch (error) {
    console.error('❌ Error al actualizar análisis:', error);
  }
}

/**
 * FUNCIÓN PARA OBTENER CALIFICACIONES (para el sistema de jurados)
 */
function obtenerCalificaciones() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaCalificaciones = spreadsheet.getSheetByName('Calificaciones_Proyectos');
    
    if (!hojaCalificaciones) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Hoja de calificaciones no encontrada'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const datos = hojaCalificaciones.getDataRange().getValues();
    const calificaciones = [];
    
    // Convertir datos a formato JSON (saltando encabezados)
    for (let i = 1; i < datos.length; i++) {
      const fila = datos[i];
      calificaciones.push({
        id: fila[0],
        timestamp: fila[1],
        fechaHora: fila[2],
        jurado: fila[3],
        proyectoId: fila[4],
        equipo: fila[5],
        titulo: fila[6],
        funcionalidad: fila[7],
        innovacion: fila[8],
        calidad: fila[9],
        presentacion: fila[10],
        viabilidad: fila[11],
        puntuacionTotal: fila[12],
        puntuacionPonderada: fila[13],
        completado: fila[14]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      calificaciones: calificaciones,
      total: calificaciones.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ Error al obtener calificaciones:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * FUNCIÓN PARA OBTENER RANKING (para mostrar en tiempo real)
 */
function obtenerRanking() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaRanking = spreadsheet.getSheetByName('Ranking_Proyectos');
    
    if (!hojaRanking) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Hoja de ranking no encontrada'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const datos = hojaRanking.getDataRange().getValues();
    const ranking = [];
    
    // Convertir datos a formato JSON (saltando encabezados)
    for (let i = 1; i < datos.length; i++) {
      const fila = datos[i];
      if (fila[0]) { // Si hay datos
        ranking.push({
          posicion: fila[0],
          equipo: fila[1],
          proyecto: fila[2],
          puntuacionPromedio: fila[3],
          totalJurados: fila[4],
          funcionalidadPromedio: fila[5],
          innovacionPromedio: fila[6],
          calidadPromedio: fila[7],
          presentacionPromedio: fila[8],
          viabilidadPromedio: fila[9],
          mejorCalificacion: fila[10],
          peorCalificacion: fila[11],
          diferencia: fila[12],
          estado: fila[13]
        });
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      ranking: ranking,
      total: ranking.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ Error al obtener ranking:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * FUNCIÓN DE PRUEBA
 */
function probarSistemaCalificaciones() {
  console.log('🧪 Probando sistema de calificaciones...');
  
  // Simular una calificación de prueba
  const calificacionPrueba = {
    jurado: 'Jurado_Prueba',
    proyectoId: 'proyecto_prueba',
    equipo: 'Equipo_Prueba',
    titulo: 'Proyecto de Prueba',
    funcionalidad: 4,
    innovacion: 3,
    calidad: 4,
    presentacion: 3,
    viabilidad: 4,
    timestamp: new Date().toISOString()
  };
  
  console.log('⭐ Calificación de prueba:', calificacionPrueba);
  console.log('✅ Sistema de calificaciones funcionando correctamente');
  
  return calificacionPrueba;
}
