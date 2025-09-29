/**
 * SCRIPT PARA GENERAR HOJA DE VOTACIONES - HACKATHON CODES++
 * 
 * Este script crea una nueva hoja de cálculo para recibir las votaciones
 * de los jurados del hackathon y las organiza de manera estructurada.
 * 
 * INSTRUCCIONES:
 * 1. Abre Google Apps Script (script.google.com)
 * 2. Crea un nuevo proyecto
 * 3. Copia y pega este código
 * 4. Ejecuta la función 'crearHojaVotaciones()'
 * 5. Copia la URL del script para usar en jurados.html
 */

function crearHojaVotaciones() {
  try {
    // Crear nueva hoja de cálculo
    const spreadsheet = SpreadsheetApp.create('Hackathon CODES++ - Votaciones Jurados');
    
    // Configurar permisos (opcional - para acceso público)
    // DriveApp.getFileById(spreadsheet.getId()).setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Crear hoja de votaciones principales
    const hojaVotaciones = spreadsheet.getActiveSheet();
    hojaVotaciones.setName('Votaciones_Principales');
    
    // Configurar encabezados
    const encabezados = [
      'ID_Voto',
      'Timestamp',
      'Fecha_Hora',
      'Jurado',
      'Equipo',
      'Propuesta_ID',
      'Titulo_Propuesta',
      'Categoria',
      'No_Entrego',
      'Confirmado',
      'IP_Address',
      'User_Agent'
    ];
    
    // Escribir encabezados
    hojaVotaciones.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);
    
    // Formatear encabezados
    const rangoEncabezados = hojaVotaciones.getRange(1, 1, 1, encabezados.length);
    rangoEncabezados.setBackground('#4285f4');
    rangoEncabezados.setFontColor('white');
    rangoEncabezados.setFontWeight('bold');
    rangoEncabezados.setHorizontalAlignment('center');
    
    // Ajustar ancho de columnas
    hojaVotaciones.autoResizeColumns(1, encabezados.length);
    
    // Crear hoja de resumen por equipo
    const hojaResumen = spreadsheet.insertSheet('Resumen_por_Equipo');
    const encabezadosResumen = [
      'Equipo',
      'Total_Votos',
      'Propuesta_Mas_Votada',
      'Votos_Propuesta_Ganadora',
      'Porcentaje_Victoria',
      'Jurados_Que_Votaron',
      'Ultima_Votacion'
    ];
    
    hojaResumen.getRange(1, 1, 1, encabezadosResumen.length).setValues([encabezadosResumen]);
    
    // Formatear hoja de resumen
    const rangoEncabezadosResumen = hojaResumen.getRange(1, 1, 1, encabezadosResumen.length);
    rangoEncabezadosResumen.setBackground('#34a853');
    rangoEncabezadosResumen.setFontColor('white');
    rangoEncabezadosResumen.setFontWeight('bold');
    rangoEncabezadosResumen.setHorizontalAlignment('center');
    
    // Crear hoja de estadísticas de jurados
    const hojaEstadisticas = spreadsheet.insertSheet('Estadisticas_Jurados');
    const encabezadosEstadisticas = [
      'Jurado',
      'Total_Votos_Realizados',
      'Equipos_Votados',
      'Primera_Votacion',
      'Ultima_Votacion',
      'Tiempo_Promedio_Votacion',
      'Estado'
    ];
    
    hojaEstadisticas.getRange(1, 1, 1, encabezadosEstadisticas.length).setValues([encabezadosEstadisticas]);
    
    // Formatear hoja de estadísticas
    const rangoEncabezadosEstadisticas = hojaEstadisticas.getRange(1, 1, 1, encabezadosEstadisticas.length);
    rangoEncabezadosEstadisticas.setBackground('#ea4335');
    rangoEncabezadosEstadisticas.setFontColor('white');
    rangoEncabezadosEstadisticas.setFontWeight('bold');
    rangoEncabezadosEstadisticas.setHorizontalAlignment('center');
    
    // Ajustar columnas en todas las hojas
    hojaResumen.autoResizeColumns(1, encabezadosResumen.length);
    hojaEstadisticas.autoResizeColumns(1, encabezadosEstadisticas.length);
    
    // Agregar datos iniciales de equipos
    agregarDatosIniciales(hojaResumen);
    
    // Crear función para recibir votos
    crearFuncionRecibirVotos();
    
    // Mostrar URL del spreadsheet
    const url = spreadsheet.getUrl();
    console.log('✅ Hoja de cálculo creada exitosamente!');
    console.log('📊 URL: ' + url);
    console.log('🔗 Comparte esta URL con los administradores del hackathon');
    
    return {
      success: true,
      spreadsheetId: spreadsheet.getId(),
      url: url,
      message: 'Hoja de cálculo creada exitosamente'
    };
    
  } catch (error) {
    console.error('❌ Error al crear la hoja de cálculo:', error);
    return {
      success: false,
      error: error.toString(),
      message: 'Error al crear la hoja de cálculo'
    };
  }
}

function agregarDatosIniciales(hojaResumen) {
  // Datos iniciales de los equipos del hackathon
  const equipos = [
    ['Grupo_crear()', 0, 'Pendiente', 0, '0%', 'Ninguno', ''],
    ['Los migajeros', 0, 'Pendiente', 0, '0%', 'Ninguno', ''],
    ['Sam Altman & Co', 0, 'No entregó', 0, '0%', 'Ninguno', '']
  ];
  
  // Escribir datos de equipos
  if (equipos.length > 0) {
    hojaResumen.getRange(2, 1, equipos.length, equipos[0].length).setValues(equipos);
  }
}

function crearFuncionRecibirVotos() {
  // Esta función se ejecutará cuando lleguen votos desde jurados.html
  console.log('📝 Función para recibir votos configurada');
}

/**
 * FUNCIÓN PRINCIPAL PARA RECIBIR VOTOS
 * Esta función se ejecuta cuando llegan votos desde el sistema de jurados
 */
function doGet(e) {
  try {
    // Obtener parámetros de la URL
    const jurado = e.parameter.jurado || 'No especificado';
    const equipo = e.parameter.equipo || 'No especificado';
    const propuestaId = e.parameter.propuestaId || 'No especificado';
    const titulo = e.parameter.titulo || 'No especificado';
    const categoria = e.parameter.categoria || 'No especificado';
    const noEntrego = e.parameter.noEntrego || 'false';
    const confirmado = e.parameter.confirmado || 'false';
    const timestamp = e.parameter.timestamp || new Date().toISOString();
    
    // Obtener información del usuario
    const ipAddress = e.parameter.ip || 'No disponible';
    const userAgent = e.parameter.ua || 'No disponible';
    
    // Generar ID único para el voto
    const votoId = 'VOTO_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Obtener la hoja de votaciones
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaVotaciones = spreadsheet.getSheetByName('Votaciones_Principales');
    
    if (!hojaVotaciones) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Hoja de votaciones no encontrada'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Preparar datos del voto
    const fechaHora = new Date().toLocaleString('es-ES', {
      timeZone: 'America/Argentina/Buenos_Aires'
    });
    
    const datosVoto = [
      votoId,
      timestamp,
      fechaHora,
      jurado,
      equipo,
      propuestaId,
      titulo,
      categoria,
      noEntrego,
      confirmado,
      ipAddress,
      userAgent
    ];
    
    // Agregar voto a la hoja
    const ultimaFila = hojaVotaciones.getLastRow();
    hojaVotaciones.getRange(ultimaFila + 1, 1, 1, datosVoto.length).setValues([datosVoto]);
    
    // Actualizar resumen por equipo
    actualizarResumenEquipo(equipo, propuestaId, titulo, jurado);
    
    // Actualizar estadísticas de jurados
    actualizarEstadisticasJurado(jurado);
    
    // Log del voto recibido
    console.log('🗳️ Voto recibido:', {
      votoId: votoId,
      jurado: jurado,
      equipo: equipo,
      propuesta: titulo,
      confirmado: confirmado
    });
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      votoId: votoId,
      message: 'Voto registrado exitosamente',
      timestamp: timestamp
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ Error al procesar voto:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString(),
      message: 'Error al procesar el voto'
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function actualizarResumenEquipo(equipo, propuestaId, titulo, jurado) {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaResumen = spreadsheet.getSheetByName('Resumen_por_Equipo');
    
    if (!hojaResumen) return;
    
    // Buscar la fila del equipo
    const datos = hojaResumen.getDataRange().getValues();
    let filaEquipo = -1;
    
    for (let i = 1; i < datos.length; i++) {
      if (datos[i][0] === equipo) {
        filaEquipo = i + 1;
        break;
      }
    }
    
    if (filaEquipo > 0) {
      // Actualizar contadores
      const totalVotos = datos[filaEquipo - 1][1] + 1;
      const ultimaVotacion = new Date().toLocaleString('es-ES');
      
      // Actualizar datos
      hojaResumen.getRange(filaEquipo, 2).setValue(totalVotos); // Total votos
      hojaResumen.getRange(filaEquipo, 3).setValue(titulo); // Propuesta más votada
      hojaResumen.getRange(filaEquipo, 7).setValue(ultimaVotacion); // Última votación
      
      console.log(`📊 Resumen actualizado para ${equipo}: ${totalVotos} votos`);
    }
    
  } catch (error) {
    console.error('❌ Error al actualizar resumen:', error);
  }
}

function actualizarEstadisticasJurado(jurado) {
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
    
    if (filaJurado > 0) {
      // Actualizar jurado existente
      const totalVotos = datos[filaJurado - 1][1] + 1;
      const ultimaVotacion = new Date().toLocaleString('es-ES');
      
      hojaEstadisticas.getRange(filaJurado, 2).setValue(totalVotos);
      hojaEstadisticas.getRange(filaJurado, 5).setValue(ultimaVotacion);
      hojaEstadisticas.getRange(filaJurado, 7).setValue('Activo');
      
    } else {
      // Agregar nuevo jurado
      const nuevaFila = hojaEstadisticas.getLastRow() + 1;
      const primeraVotacion = new Date().toLocaleString('es-ES');
      
      hojaEstadisticas.getRange(nuevaFila, 1).setValue(jurado);
      hojaEstadisticas.getRange(nuevaFila, 2).setValue(1);
      hojaEstadisticas.getRange(nuevaFila, 3).setValue(1);
      hojaEstadisticas.getRange(nuevaFila, 4).setValue(primeraVotacion);
      hojaEstadisticas.getRange(nuevaFila, 5).setValue(primeraVotacion);
      hojaEstadisticas.getRange(nuevaFila, 6).setValue('0 min');
      hojaEstadisticas.getRange(nuevaFila, 7).setValue('Activo');
    }
    
    console.log(`👤 Estadísticas actualizadas para ${jurado}`);
    
  } catch (error) {
    console.error('❌ Error al actualizar estadísticas:', error);
  }
}

/**
 * FUNCIÓN PARA OBTENER VOTOS (para el sistema de jurados)
 */
function obtenerVotos() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaVotaciones = spreadsheet.getSheetByName('Votaciones_Principales');
    
    if (!hojaVotaciones) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Hoja de votaciones no encontrada'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const datos = hojaVotaciones.getDataRange().getValues();
    const votos = [];
    
    // Convertir datos a formato JSON (saltando encabezados)
    for (let i = 1; i < datos.length; i++) {
      const fila = datos[i];
      votos.push({
        id: fila[0],
        timestamp: fila[1],
        fechaHora: fila[2],
        jurado: fila[3],
        equipo: fila[4],
        propuestaId: fila[5],
        titulo: fila[6],
        categoria: fila[7],
        noEntrego: fila[8],
        confirmado: fila[9],
        ipAddress: fila[10],
        userAgent: fila[11]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      votos: votos,
      total: votos.length
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ Error al obtener votos:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * FUNCIÓN PARA LIMPIAR DATOS (solo para administradores)
 */
function limpiarDatos() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const hojaVotaciones = spreadsheet.getSheetByName('Votaciones_Principales');
    
    if (!hojaVotaciones) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Hoja de votaciones no encontrada'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Limpiar datos (mantener solo encabezados)
    const ultimaFila = hojaVotaciones.getLastRow();
    if (ultimaFila > 1) {
      hojaVotaciones.getRange(2, 1, ultimaFila - 1, hojaVotaciones.getLastColumn()).clear();
    }
    
    console.log('🧹 Datos limpiados exitosamente');
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Datos limpiados exitosamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('❌ Error al limpiar datos:', error);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * FUNCIÓN DE PRUEBA
 */
function probarSistema() {
  console.log('🧪 Probando sistema de votaciones...');
  
  // Simular un voto de prueba
  const votoPrueba = {
    jurado: 'Jurado_Prueba',
    equipo: 'Equipo_Prueba',
    propuestaId: 'propuesta_prueba',
    titulo: 'Propuesta de Prueba',
    categoria: 'Prueba',
    noEntrego: 'false',
    confirmado: 'true',
    timestamp: new Date().toISOString()
  };
  
  console.log('📊 Voto de prueba:', votoPrueba);
  console.log('✅ Sistema funcionando correctamente');
  
  return votoPrueba;
}
