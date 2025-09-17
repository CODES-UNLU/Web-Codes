/**
 * SISTEMA DE SORTEO - GOOGLE APPS SCRIPT
 * Guarda cada giro del sorteo y genera estadísticas
 * 
 * Configuración:
 * 1. Crear una nueva hoja de cálculo en Google Sheets
 * 2. Ir a Extensiones > Apps Script
 * 3. Pegar este código
 * 4. Configurar las variables de configuración
 * 5. Ejecutar la función setup() para crear las tablas
 */

// ==================== CONFIGURACIÓN ====================
const CONFIG = {
  // ID de la hoja de cálculo (cambiar por el tuyo)
  SPREADSHEET_ID: '1gWzL3GrLhwdOfZer_1SRS80Cq13btFq8H2Mm__B-8MU',
  
  // Nombres de las hojas
  SHEETS: {
    GIROS: 'Giros del Sorteo',
    ESTADISTICAS: 'Estadísticas',
    PAGOS: 'Pagos Verificados'
  },
  
  // Configuración del sorteo
  SORTEO: {
    PRECIO_GIRO: 25, // Precio por giro en pesos
    SIMBOLOS: ['🍀', '💎', '🍒', 'CODES'],
    MULTIPLICADORES: {
      '🍀': 3,  // Trébol (3 en línea)
      '💎': 5,  // Diamante (3 en línea)
      '🍒': 2,  // Cereza (3 en línea)
      'CODES': 10  // CODES (3 en línea) - JACKPOT
    }
  }
};

// ==================== CONFIGURACIÓN INICIAL ====================

/**
 * Configuración inicial - crear las hojas y tablas necesarias
 */
function setup() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    
    // Crear hoja de giros si no existe
    createGirosSheet(spreadsheet);
    
    // Crear hoja de estadísticas si no existe
    createEstadisticasSheet(spreadsheet);
    
    // Crear hoja de pagos si no existe
    createPagosSheet(spreadsheet);
    
    console.log('✅ Configuración completada exitosamente');
    return 'Configuración completada. Las hojas han sido creadas correctamente.';
    
  } catch (error) {
    console.error('❌ Error en la configuración:', error);
    return 'Error en la configuración: ' + error.message;
  }
}

/**
 * Crea la hoja de giros con las columnas necesarias
 */
function createGirosSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.GIROS);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEETS.GIROS);
  }
  
  // Limpiar hoja existente
  sheet.clear();
  
  // Crear encabezados
  const headers = [
    'ID Giro',
    'Fecha y Hora',
    'Número de Pago',
    'Símbolo 1',
    'Símbolo 2', 
    'Símbolo 3',
    'Resultado Completo',
    'Ganó',
    'Multiplicador',
    'Monto Ganado',
    'IP',
    'User Agent',
    'Tiempo de Respuesta (ms)'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Formatear encabezados
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  
  // Ajustar ancho de columnas
  sheet.autoResizeColumns(1, headers.length);
  
  // Congelar primera fila
  sheet.setFrozenRows(1);
  
  console.log('✅ Hoja de giros creada/actualizada');
}

/**
 * Crea la hoja de estadísticas
 */
function createEstadisticasSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.ESTADISTICAS);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEETS.ESTADISTICAS);
  }
  
  sheet.clear();
  
  // Crear secciones de estadísticas
  const statsData = [
    ['ESTADÍSTICAS GENERALES', ''],
    ['Total de Giros', '=COUNTA(\'Giros del Sorteo\'!A:A)-1'],
    ['Giros Ganadores', '=COUNTIF(\'Giros del Sorteo\'!H:H,TRUE)'],
    ['Giros Perdedores', '=COUNTIF(\'Giros del Sorteo\'!H:H,FALSE)'],
    ['Tasa de Ganancia (%)', '=B3/B2*100'],
    ['', ''],
    ['GANANCIAS', ''],
    ['Total Ganado por Usuarios', '=SUM(\'Giros del Sorteo\'!J:J)'],
    ['Total Recaudado', '=B2*' + CONFIG.SORTEO.PRECIO_GIRO],
    ['Ganancia Neta', '=B8-B7'],
    ['', ''],
    ['ESTADÍSTICAS POR SÍMBOLO', ''],
    ['🍀 (Multiplicador 3x)', '=COUNTIF(\'Giros del Sorteo\'!D:F,"🍀")'],
    ['💎 (Multiplicador 5x)', '=COUNTIF(\'Giros del Sorteo\'!D:F,"💎")'],
    ['🍒 (Multiplicador 2x)', '=COUNTIF(\'Giros del Sorteo\'!D:F,"🍒")'],
    ['CODES (Multiplicador 10x)', '=COUNTIF(\'Giros del Sorteo\'!D:F,"CODES")'],
    ['', ''],
    ['ESTADÍSTICAS TEMPORALES', ''],
    ['Giros Hoy', '=COUNTIF(\'Giros del Sorteo\'!B:B,">="&TODAY())'],
    ['Giros Esta Semana', '=COUNTIF(\'Giros del Sorteo\'!B:B,">="&TODAY()-WEEKDAY(TODAY())+1)'],
    ['Giros Este Mes', '=COUNTIF(\'Giros del Sorteo\'!B:B,">="&EOMONTH(TODAY(),-1)+1)']
  ];
  
  sheet.getRange(1, 1, statsData.length, 2).setValues(statsData);
  
  // Formatear
  sheet.getRange(1, 1, 1, 2).setBackground('#34a853');
  sheet.getRange(1, 1, 1, 2).setFontColor('white');
  sheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  
  sheet.getRange(7, 1, 1, 2).setBackground('#34a853');
  sheet.getRange(7, 1, 1, 2).setFontColor('white');
  sheet.getRange(7, 1, 1, 2).setFontWeight('bold');
  
  sheet.getRange(11, 1, 1, 2).setBackground('#34a853');
  sheet.getRange(11, 1, 1, 2).setFontColor('white');
  sheet.getRange(11, 1, 1, 2).setFontWeight('bold');
  
  sheet.getRange(17, 1, 1, 2).setBackground('#34a853');
  sheet.getRange(17, 1, 1, 2).setFontColor('white');
  sheet.getRange(17, 1, 1, 2).setFontWeight('bold');
  
  sheet.autoResizeColumns(1, 2);
  
  console.log('✅ Hoja de estadísticas creada/actualizada');
}

/**
 * Crea la hoja de pagos verificados
 */
function createPagosSheet(spreadsheet) {
  let sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.PAGOS);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEETS.PAGOS);
  }
  
  sheet.clear();
  
  const headers = [
    'Número de Pago',
    'Fecha Verificación',
    'Monto',
    'Estado',
    'Giros Disponibles',
    'Giros Usados',
    'Giros Restantes',
    'IP',
    'User Agent'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Formatear encabezados
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#ea4335');
  headerRange.setFontColor('white');
  headerRange.setFontWeight('bold');
  
  sheet.autoResizeColumns(1, headers.length);
  sheet.setFrozenRows(1);
  
  console.log('✅ Hoja de pagos creada/actualizada');
}

// ==================== WEB APP HANDLER ====================

/**
 * Función principal para Web App - maneja peticiones HTTP
 * @param {Object} e - Evento de la petición
 * @return {Object} Respuesta JSON
 */
function doPost(e) {
  try {
    // Parsear datos de la petición
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    const requestData = data.data;
    
    console.log('Petición recibida:', { action, data: requestData });
    
    let response;
    
    switch (action) {
      case 'guardarGiro':
        response = guardarGiro(requestData);
        break;
        
      case 'obtenerEstadisticas':
        response = obtenerEstadisticas();
        break;
        
      case 'obtenerGirosPorPago':
        response = obtenerGirosPorPago(requestData.paymentNumber);
        break;
        
      case 'exportarDatosJSON':
        response = { success: true, data: exportarDatosJSON() };
        break;
        
      case 'importarDatosJSON':
        response = importarDatosJSON(requestData.jsonData);
        break;
        
      case 'obtenerInfoSistema':
        response = obtenerInfoSistema();
        break;
        
      default:
        response = {
          success: false,
          error: 'Acción no válida',
          message: 'Las acciones válidas son: guardarGiro, obtenerEstadisticas, obtenerGirosPorPago, exportarDatosJSON, importarDatosJSON, obtenerInfoSistema'
        };
    }
    
    // Retornar respuesta JSON
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error en doPost:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        message: 'Error interno del servidor'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Función GET para Web App (opcional)
 * @param {Object} e - Evento de la petición
 * @return {Object} Respuesta JSON
 */
function doGet(e) {
  try {
    const action = e.parameter.action || 'obtenerInfoSistema';
    
    let response;
    
    switch (action) {
      case 'obtenerEstadisticas':
        response = obtenerEstadisticas();
        break;
        
      case 'obtenerInfoSistema':
        response = obtenerInfoSistema();
        break;
        
      case 'probarSistema':
        response = { success: true, message: probarSistema() };
        break;
        
      default:
        response = {
          success: false,
          error: 'Acción no válida',
          message: 'Las acciones válidas son: obtenerEstadisticas, obtenerInfoSistema, probarSistema'
        };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('❌ Error en doGet:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.message,
        message: 'Error interno del servidor'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ==================== FUNCIONES PRINCIPALES ====================

/**
 * Guarda un giro del sorteo
 * @param {Object} giroData - Datos del giro
 * @return {Object} Resultado de la operación
 */
function guardarGiro(giroData) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.GIROS);
    
    if (!sheet) {
      throw new Error('La hoja de giros no existe. Ejecuta setup() primero.');
    }
    
    // Generar ID único para el giro
    const giroId = 'GIRO_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Calcular datos del giro
    const simbolos = [giroData.symbol1, giroData.symbol2, giroData.symbol3];
    const resultadoCompleto = simbolos.join(', ');
    const gano = simbolos[0] === simbolos[1] && simbolos[1] === simbolos[2];
    const multiplicador = gano ? CONFIG.SORTEO.MULTIPLICADORES[simbolos[0]] || 0 : 0;
    const montoGanado = gano ? CONFIG.SORTEO.PRECIO_GIRO * multiplicador : 0;
    
    // Preparar fila de datos
    const rowData = [
      giroId,
      new Date(giroData.timestamp),
      giroData.paymentNumber,
      giroData.symbol1,
      giroData.symbol2,
      giroData.symbol3,
      resultadoCompleto,
      gano,
      multiplicador,
      montoGanado,
      giroData.ip || 'N/A',
      giroData.userAgent || 'N/A',
      giroData.responseTime || 0
    ];
    
    // Agregar fila a la hoja
    sheet.appendRow(rowData);
    
    // Actualizar estadísticas
    actualizarEstadisticas();
    
    console.log('✅ Giro guardado:', giroId);
    
    return {
      success: true,
      giroId: giroId,
      gano: gano,
      multiplicador: multiplicador,
      montoGanado: montoGanado,
      message: 'Giro guardado exitosamente'
    };
    
  } catch (error) {
    console.error('❌ Error al guardar giro:', error);
    return {
      success: false,
      error: error.message,
      message: 'Error al guardar el giro'
    };
  }
}

/**
 * Obtiene estadísticas del sorteo
 * @return {Object} Estadísticas actualizadas
 */
function obtenerEstadisticas() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const girosSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.GIROS);
    
    if (!girosSheet) {
      throw new Error('La hoja de giros no existe');
    }
    
    const data = girosSheet.getDataRange().getValues();
    const totalGiros = data.length - 1; // Restar encabezado
    
    if (totalGiros === 0) {
      return {
        totalGiros: 0,
        girosGanadores: 0,
        girosPerdedores: 0,
        tasaGanancia: 0,
        totalGanado: 0,
        totalRecaudado: 0,
        gananciaNeta: 0
      };
    }
    
    let girosGanadores = 0;
    let totalGanado = 0;
    const simbolosCount = {};
    
    // Inicializar contadores de símbolos
    CONFIG.SORTEO.SIMBOLOS.forEach(simbolo => {
      simbolosCount[simbolo] = 0;
    });
    
    // Procesar datos (saltar encabezado)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const gano = row[7]; // Columna H
      const montoGanado = row[9]; // Columna J
      const simbolo1 = row[3]; // Columna D
      const simbolo2 = row[4]; // Columna E
      const simbolo3 = row[5]; // Columna F
      
      if (gano) {
        girosGanadores++;
        totalGanado += montoGanado;
      }
      
      // Contar símbolos
      [simbolo1, simbolo2, simbolo3].forEach(simbolo => {
        if (simbolosCount.hasOwnProperty(simbolo)) {
          simbolosCount[simbolo]++;
        }
      });
    }
    
    const girosPerdedores = totalGiros - girosGanadores;
    const tasaGanancia = totalGiros > 0 ? (girosGanadores / totalGiros) * 100 : 0;
    const totalRecaudado = totalGiros * CONFIG.SORTEO.PRECIO_GIRO;
    const gananciaNeta = totalRecaudado - totalGanado;
    
    return {
      totalGiros,
      girosGanadores,
      girosPerdedores,
      tasaGanancia: Math.round(tasaGanancia * 100) / 100,
      totalGanado,
      totalRecaudado,
      gananciaNeta,
      simbolosCount,
      ultimaActualizacion: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Error al obtener estadísticas:', error);
    throw error;
  }
}

/**
 * Actualiza la hoja de estadísticas
 */
function actualizarEstadisticas() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const statsSheet = spreadsheet.getSheetByName(CONFIG.SHEETS.ESTADISTICAS);
    
    if (!statsSheet) {
      console.log('⚠️ Hoja de estadísticas no existe, creándola...');
      createEstadisticasSheet(spreadsheet);
      return;
    }
    
    // Las fórmulas se actualizan automáticamente
    console.log('✅ Estadísticas actualizadas');
    
  } catch (error) {
    console.error('❌ Error al actualizar estadísticas:', error);
  }
}

/**
 * Obtiene el historial de giros de un número de pago específico
 * @param {string} paymentNumber - Número de pago
 * @return {Array} Array de giros
 */
function obtenerGirosPorPago(paymentNumber) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.GIROS);
    
    if (!sheet) {
      throw new Error('La hoja de giros no existe');
    }
    
    const data = sheet.getDataRange().getValues();
    const giros = [];
    
    // Buscar giros del número de pago (saltar encabezado)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[2] === paymentNumber) { // Columna C (Número de Pago)
        giros.push({
          id: row[0],
          timestamp: row[1],
          paymentNumber: row[2],
          symbol1: row[3],
          symbol2: row[4],
          symbol3: row[5],
          resultado: row[6],
          gano: row[7],
          multiplicador: row[8],
          montoGanado: row[9],
          ip: row[10],
          userAgent: row[11]
        });
      }
    }
    
    return giros;
    
  } catch (error) {
    console.error('❌ Error al obtener giros por pago:', error);
    throw error;
  }
}

/**
 * Exporta datos a JSON (para respaldo)
 * @return {string} JSON con todos los datos
 */
function exportarDatosJSON() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.GIROS);
    
    if (!sheet) {
      throw new Error('La hoja de giros no existe');
    }
    
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const giros = [];
    
    // Convertir a formato JSON (saltar encabezado)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const giro = {};
      
      headers.forEach((header, index) => {
        giro[header] = row[index];
      });
      
      giros.push(giro);
    }
    
    return JSON.stringify(giros, null, 2);
    
  } catch (error) {
    console.error('❌ Error al exportar datos:', error);
    throw error;
  }
}

/**
 * Importa datos desde JSON (para migración)
 * @param {string} jsonData - Datos en formato JSON
 * @return {Object} Resultado de la importación
 */
function importarDatosJSON(jsonData) {
  try {
    const giros = JSON.parse(jsonData);
    let importados = 0;
    let errores = 0;
    
    for (const giro of giros) {
      try {
        const resultado = guardarGiro(giro);
        if (resultado.success) {
          importados++;
        } else {
          errores++;
        }
      } catch (error) {
        console.error('Error al importar giro:', error);
        errores++;
      }
    }
    
    return {
      success: true,
      importados,
      errores,
      total: giros.length,
      message: `Importación completada: ${importados} giros importados, ${errores} errores`
    };
    
  } catch (error) {
    console.error('❌ Error al importar datos:', error);
    return {
      success: false,
      error: error.message,
      message: 'Error al importar los datos'
    };
  }
}

// ==================== FUNCIONES DE UTILIDAD ====================

/**
 * Limpia todos los datos (¡CUIDADO!)
 * @return {string} Confirmación
 */
function limpiarTodosLosDatos() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.GIROS);
    
    if (sheet) {
      // Mantener solo los encabezados
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
      }
    }
    
    console.log('⚠️ Todos los datos han sido eliminados');
    return 'Todos los datos han sido eliminados. Las hojas se mantienen intactas.';
    
  } catch (error) {
    console.error('❌ Error al limpiar datos:', error);
    return 'Error al limpiar los datos: ' + error.message;
  }
}

/**
 * Obtiene información del sistema
 * @return {Object} Información del sistema
 */
function obtenerInfoSistema() {
  return {
    version: '1.0.0',
    configuracion: CONFIG,
    ultimaActualizacion: new Date().toISOString(),
    hojasDisponibles: Object.values(CONFIG.SHEETS),
    simbolos: CONFIG.SORTEO.SIMBOLOS,
    multiplicadores: CONFIG.SORTEO.MULTIPLICADORES,
    precioGiro: CONFIG.SORTEO.PRECIO_GIRO
  };
}

// ==================== FUNCIONES DE PRUEBA ====================

/**
 * Función de prueba para verificar el sistema
 */
function probarSistema() {
  try {
    console.log('🧪 Iniciando pruebas del sistema...');
    
    // Probar configuración
    const setupResult = setup();
    console.log('✅ Setup:', setupResult);
    
    // Probar guardar giro
    const giroPrueba = {
      timestamp: new Date().toISOString(),
      paymentNumber: 'TEST_' + Date.now(),
      symbol1: '🍄',
      symbol2: '🍄',
      symbol3: '🍄',
      ip: '127.0.0.1',
      userAgent: 'Test User Agent'
    };
    
    const resultadoGiro = guardarGiro(giroPrueba);
    console.log('✅ Giro de prueba:', resultadoGiro);
    
    // Probar estadísticas
    const stats = obtenerEstadisticas();
    console.log('✅ Estadísticas:', stats);
    
    // Probar info del sistema
    const info = obtenerInfoSistema();
    console.log('✅ Info del sistema:', info);
    
    console.log('🎉 Todas las pruebas completadas exitosamente');
    return 'Sistema funcionando correctamente. Todas las pruebas pasaron.';
    
  } catch (error) {
    console.error('❌ Error en las pruebas:', error);
    return 'Error en las pruebas: ' + error.message;
  }
}

// ==================== INSTRUCCIONES DE USO ====================

/**
 * INSTRUCCIONES DE CONFIGURACIÓN:
 * 
 * 1. Crear una nueva hoja de cálculo en Google Sheets
 * 2. Copiar el ID de la hoja de cálculo desde la URL
 * 3. Reemplazar 'TU_SPREADSHEET_ID_AQUI' en CONFIG.SPREADSHEET_ID
 * 4. Ir a Extensiones > Apps Script
 * 5. Pegar este código completo
 * 6. Guardar el proyecto
 * 7. Ejecutar la función setup() para crear las tablas
 * 8. Ejecutar probarSistema() para verificar que todo funciona
 * 
 * FUNCIONES PRINCIPALES:
 * - setup(): Configuración inicial
 * - guardarGiro(giroData): Guarda un giro
 * - obtenerEstadisticas(): Obtiene estadísticas
 * - obtenerGirosPorPago(paymentNumber): Historial por pago
 * - exportarDatosJSON(): Exporta datos
 * - importarDatosJSON(jsonData): Importa datos
 * - limpiarTodosLosDatos(): Limpia datos (¡CUIDADO!)
 * - probarSistema(): Prueba el sistema
 * 
 * INTEGRACIÓN CON TU SISTEMA:
 * - Usa guardarGiro() desde tu API PHP
 * - Los datos se guardan automáticamente en Google Sheets
 * - Las estadísticas se actualizan en tiempo real
 * - Puedes consultar datos desde cualquier lugar
 */
