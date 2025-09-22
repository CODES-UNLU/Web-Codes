/**
 * SISTEMA SIMPLIFICADO DE VOTACIÓN DE JURADOS
 * Solo escritura - sin lectura de datos
 */

// Configuración
const SHEET_ID = '1UmhBDevk6MvgDqmj_WuQbCsk3sQz1aCiSHwC3OY8QPU';
const SHEET_NAME = 'Votos Jurados';

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
          message: 'Sistema de votación de jurados activo - Solo escritura'
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
      timestamp: timestamp,
      confirmado: confirmado
    });
    
    return ContentService
      .createTextOutput(JSON.stringify(resultado))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error en doGet:', error);
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
function registrarVoto(votoData) {
  try {
    // Abrir la hoja de cálculo
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Si la hoja no existe, crearla
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      
      // Agregar encabezados
      const encabezados = [
        'Timestamp',
        'Jurado', 
        'Equipo',
        'Propuesta ID',
        'Título',
        'Categoría',
        'Confirmado'
      ];
      sheet.getRange(1, 1, 1, encabezados.length).setValues([encabezados]);
      
      // Formatear encabezados
      const headerRange = sheet.getRange(1, 1, 1, encabezados.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('white');
    }
    
    // Preparar datos para insertar
    const timestamp = votoData.timestamp || new Date().toISOString();
    const confirmado = votoData.confirmado === 'true' ? 'SÍ' : 'NO';
    
    const fila = [
      timestamp,
      votoData.jurado,
      votoData.equipo,
      votoData.propuestaId,
      votoData.titulo,
      votoData.categoria,
      confirmado
    ];
    
    // Agregar la fila
    sheet.appendRow(fila);
    
    console.log('✅ Voto registrado:', votoData);
    
    return {
      success: true,
      message: 'Voto registrado correctamente',
      timestamp: timestamp
    };
    
  } catch (error) {
    console.error('❌ Error al registrar voto:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Función de prueba para verificar que el script funciona
 */
function testScript() {
  try {
    const resultado = registrarVoto({
      jurado: 'test_jurado',
      equipo: 'test_equipo',
      propuestaId: 'test_propuesta',
      titulo: 'Test Propuesta',
      categoria: 'test_categoria',
      timestamp: new Date().toISOString(),
      confirmado: 'true'
    });
    
    console.log('✅ Prueba exitosa:', resultado);
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

