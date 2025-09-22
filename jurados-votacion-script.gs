/**
 * SISTEMA DE VOTACIÓN DE JURADOS - HACKATHON CODES++
 * Centro de Estudiantes de Sistemas - UNLu
 * 
 * Este script recibe los votos de los jurados y los almacena en Google Sheets
 */

// ID de la hoja de cálculo
const SHEET_ID = '1UmhBDevk6MvgDqmj_WuQbCsk3sQz1aCiSHwC3OY8QPU';
const SHEET_NAME = 'Votos Jurados'; // Nombre de la pestaña

/**
 * Función principal que se ejecuta cuando se recibe un voto
 * Se llama via GET desde el frontend
 */
function doGet(e) {
  try {
    // Sistema simplificado - solo escritura de votos
    const jurado = e.parameter.jurado;
    const equipo = e.parameter.equipo;
    const propuestaId = e.parameter.propuestaId;
    const titulo = e.parameter.titulo;
    const categoria = e.parameter.categoria;
    const timestamp = e.parameter.timestamp;
    const confirmado = e.parameter.confirmado || 'false';
    
    // Si no hay parámetros de voto, devolver mensaje informativo
    if (!jurado || !equipo || !propuestaId || !titulo || !categoria) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Sistema de votación de jurados activo. Use accion=obtenerVotos para obtener datos.',
          votos: [],
          juradosQueVotaron: []
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Registrar el voto en la hoja de cálculo
    const resultado = registrarVoto({
      jurado: jurado,
      equipo: equipo,
      propuestaId: propuestaId,
      titulo: titulo,
      categoria: categoria,
      timestamp: timestamp || new Date().toISOString(),
      confirmado: confirmado === 'true'
    });
    
    // Retornar respuesta exitosa
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Voto registrado correctamente',
        data: resultado
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // En caso de error, retornar mensaje de error
    console.error('Error al procesar petición:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función para registrar un voto en la hoja de cálculo
 */
function registrarVoto(datosVoto) {
  try {
    // Abrir la hoja de cálculo
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Si la hoja no existe, crearla
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      // Agregar encabezados
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp',
        'Jurado', 
        'Equipo',
        'Propuesta_ID',
        'Titulo_Propuesta',
        'Categoria',
        'Fecha_Hora',
        'Confirmado'
      ]]);
      
      // Formatear encabezados
      sheet.getRange(1, 1, 1, 8).setFontWeight('bold');
      sheet.getRange(1, 1, 1, 8).setBackground('#4285f4');
      sheet.getRange(1, 1, 1, 8).setFontColor('white');
    }
    
    // Preparar los datos para insertar
    const fechaHora = new Date(datosVoto.timestamp).toLocaleString('es-ES');
    const filaDatos = [
      datosVoto.timestamp,
      datosVoto.jurado,
      datosVoto.equipo,
      datosVoto.propuestaId,
      datosVoto.titulo,
      datosVoto.categoria,
      fechaHora,
      datosVoto.confirmado ? 'SÍ' : 'NO'
    ];
    
    // Agregar la nueva fila
    sheet.appendRow(filaDatos);
    
    // Obtener el número de fila donde se insertó
    const ultimaFila = sheet.getLastRow();
    
    // Formatear la nueva fila
    sheet.getRange(ultimaFila, 1, 1, 8).setBorder(true, true, true, true, true, true);
    
    // Alternar colores de filas para mejor legibilidad
    if (ultimaFila % 2 === 0) {
      sheet.getRange(ultimaFila, 1, 1, 8).setBackground('#f8f9fa');
    }
    
    console.log(`✅ Voto registrado en fila ${ultimaFila}: ${datosVoto.jurado} → ${datosVoto.titulo}`);
    
    return {
      fila: ultimaFila,
      timestamp: datosVoto.timestamp,
      jurado: datosVoto.jurado
    };
    
  } catch (error) {
    console.error('Error al registrar voto en sheet:', error);
    throw error;
  }
}

/**
 * Función para obtener estadísticas de votos
 */
function obtenerEstadisticasVotos() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return { totalVotos: 0, jurados: [], equipos: [] };
    }
    
    const data = sheet.getDataRange().getValues();
    const votos = data.slice(1); // Excluir encabezados
    
    const estadisticas = {
      totalVotos: votos.length,
      jurados: [...new Set(votos.map(v => v[1]))], // Columna B: Jurado
      equipos: [...new Set(votos.map(v => v[2]))], // Columna C: Equipo
      votosConfirmados: votos.filter(v => v[7] === 'SÍ').length
    };
    
    return estadisticas;
    
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return { error: error.toString() };
  }
}

/**
 * Función para obtener todos los votos confirmados
 */
function obtenerVotosConfirmados() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return { success: true, votos: [] };
    }
    
    const data = sheet.getDataRange().getValues();
    const votos = data.slice(1); // Excluir encabezados
    
    // Filtrar solo votos confirmados
    const votosConfirmados = votos.filter(v => v[7] === 'SÍ').map(v => ({
      timestamp: v[0],
      jurado: v[1],
      equipo: v[2],
      propuestaId: v[3],
      titulo: v[4],
      categoria: v[5],
      fechaHora: v[6],
      confirmado: v[7]
    }));
    
    return {
      success: true,
      votos: votosConfirmados,
      totalVotos: votosConfirmados.length,
      juradosQueVotaron: [...new Set(votosConfirmados.map(v => v.jurado))]
    };
    
  } catch (error) {
    console.error('Error al obtener votos confirmados:', error);
    return { 
      success: false, 
      error: error.toString(),
      votos: []
    };
  }
}

/**
 * Función para limpiar votos de prueba (solo para desarrollo)
 */
function limpiarVotosPrueba() {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    if (sheet) {
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.getRange(2, 1, lastRow - 1, 8).clearContent();
        console.log('🧹 Votos de prueba eliminados');
      }
    }
    
    return { success: true, message: 'Votos de prueba eliminados' };
    
  } catch (error) {
    console.error('Error al limpiar votos:', error);
    return { error: error.toString() };
  }
}

/**
 * Función de prueba para verificar que el script funciona
 */
function probarScript() {
  try {
    const testData = {
      jurado: 'Test Jurado',
      equipo: 'Equipo Test',
      propuestaId: 'test_001',
      titulo: 'Propuesta de Prueba',
      categoria: 'Test',
      timestamp: new Date().toISOString(),
      confirmado: true
    };
    
    const resultado = registrarVoto(testData);
    console.log('✅ Script funcionando correctamente:', resultado);
    
    return {
      success: true,
      message: 'Script funcionando correctamente',
      testData: resultado
    };
    
  } catch (error) {
    console.error('❌ Error en prueba del script:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}
