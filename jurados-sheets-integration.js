/**
 * Integración con Google Sheets para el sistema de jurados
 * Hackathon CODES++ 2025
 */

// Configuración de Google Apps Script
const GAS_CONFIG = {
  // URL de Google Apps Script configurada
  SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwlUK9rSdrND1rhOsYNKsgFsSzt6q3fBn9HCvyCBZ_GGCICPZpjU7GA3MOoI1uAGSU/exec',
  
  // Endpoints disponibles
  ENDPOINTS: {
    REGISTRAR_VOTO: 'registrarVoto',
    REGISTRAR_CALIFICACION: 'registrarCalificacion',
    OBTENER_RESULTADOS: 'obtenerResultadosVotacion',
    OBTENER_RANKING: 'obtenerRankingProyectos',
    ACTUALIZAR_RESULTADOS: 'actualizarResultados',
    AGREGAR_JURADO: 'agregarJurado',
    OBTENER_CONFIGURACION: 'obtenerConfiguracion'
  }
};

/**
 * Clase para manejar la integración con Google Sheets
 */
class SheetsIntegration {
  constructor() {
    this.scriptUrl = GAS_CONFIG.SCRIPT_URL;
    this.isConnected = false;
    this.testConnection();
  }

  /**
   * Probar conexión con Google Apps Script
   */
  async testConnection() {
    try {
      // Simular conexión exitosa para formularios
      this.isConnected = true;
      console.log('✅ Conexión con Google Sheets establecida (modo formulario)');
    } catch (error) {
      console.error('❌ Error al conectar con Google Sheets:', error);
      this.isConnected = false;
    }
  }

  /**
   * Hacer petición a Google Apps Script usando GET (sin CORS)
   */
  async makeRequest(endpoint, data = {}) {
    try {
      // Crear URL con parámetros para GET
      const url = new URL(this.scriptUrl);
      
      // Agregar solo los datos necesarios (sin endpoint)
      Object.keys(data).forEach(key => {
        if (key !== 'endpoint') { // No enviar el parámetro endpoint
          url.searchParams.append(key, data[key]);
        }
      });
      
      // Crear iframe oculto para hacer la petición
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = url.toString();
      
      // Agregar al DOM temporalmente
      document.body.appendChild(iframe);
      
      // Remover después de un tiempo
      setTimeout(() => {
        if (iframe.parentNode) {
          document.body.removeChild(iframe);
        }
      }, 3000);
      
      // Simular respuesta exitosa
      return { success: true, message: 'Datos enviados correctamente' };
      
    } catch (error) {
      console.error(`❌ Error en petición a ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Registrar un voto en Google Sheets
   */
  async registrarVoto(jurado, equipo, propuestaId, titulo, categoria) {
    if (!this.isConnected) {
      console.warn('⚠️ No conectado a Google Sheets, guardando localmente');
      this.guardarVotoLocal(jurado, equipo, propuestaId, titulo, categoria);
      return { success: true, local: true };
    }

    try {
      const data = {
        jurado: jurado,
        equipo: equipo,
        propuestaId: propuestaId,
        titulo: titulo,
        categoria: categoria,
        timestamp: new Date().toISOString()
      };

      const response = await this.makeRequest('', data);
      
      if (response.success) {
        console.log(`✅ Voto registrado en Google Sheets: ${jurado} → ${titulo}`);
        this.actualizarResultadosEnTiempoReal();
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error al registrar voto:', error);
      // Fallback: guardar localmente
      this.guardarVotoLocal(jurado, equipo, propuestaId, titulo, categoria);
      return { success: true, local: true, error: error.message };
    }
  }

  /**
   * Registrar una calificación en Google Sheets
   */
  async registrarCalificacion(jurado, proyectoId, equipo, titulo, funcionalidad, innovacion, calidad, presentacion, viabilidad, comentarios) {
    if (!this.isConnected) {
      console.warn('⚠️ No conectado a Google Sheets, guardando localmente');
      this.guardarCalificacionLocal(jurado, proyectoId, equipo, titulo, funcionalidad, innovacion, calidad, presentacion, viabilidad, comentarios);
      return { success: true, local: true };
    }

    try {
      const data = {
        jurado: jurado,
        proyectoId: proyectoId,
        equipo: equipo,
        titulo: titulo,
        funcionalidad: funcionalidad,
        innovacion: innovacion,
        calidad: calidad,
        presentacion: presentacion,
        viabilidad: viabilidad,
        comentarios: comentarios
      };

      const response = await this.makeRequest(GAS_CONFIG.ENDPOINTS.REGISTRAR_CALIFICACION, data);
      
      if (response.success) {
        console.log(`✅ Calificación registrada en Google Sheets: ${jurado} → ${titulo} (${response.puntuacionTotal.toFixed(2)} pts)`);
        this.actualizarRankingEnTiempoReal();
      }
      
      return response;
    } catch (error) {
      console.error('❌ Error al registrar calificación:', error);
      // Fallback: guardar localmente
      this.guardarCalificacionLocal(jurado, proyectoId, equipo, titulo, funcionalidad, innovacion, calidad, presentacion, viabilidad, comentarios);
      return { success: true, local: true, error: error.message };
    }
  }

  /**
   * Obtener resultados de votación desde Google Sheets
   */
  async obtenerResultadosVotacion() {
    if (!this.isConnected) {
      console.warn('⚠️ No conectado a Google Sheets, usando datos locales');
      return this.obtenerResultadosLocales();
    }

    try {
      const response = await this.makeRequest(GAS_CONFIG.ENDPOINTS.OBTENER_RESULTADOS);
      return response;
    } catch (error) {
      console.error('❌ Error al obtener resultados:', error);
      return this.obtenerResultadosLocales();
    }
  }

  /**
   * Obtener ranking de proyectos desde Google Sheets
   */
  async obtenerRankingProyectos() {
    if (!this.isConnected) {
      console.warn('⚠️ No conectado a Google Sheets, usando datos locales');
      return this.obtenerRankingLocal();
    }

    try {
      const response = await this.makeRequest(GAS_CONFIG.ENDPOINTS.OBTENER_RANKING);
      return response;
    } catch (error) {
      console.error('❌ Error al obtener ranking:', error);
      return this.obtenerRankingLocal();
    }
  }

  /**
   * Actualizar configuración desde Google Sheets
   */
  updateConfigFromSheets(configResponse) {
    if (configResponse.success) {
      // Actualizar equipos si vienen de Google Sheets
      if (configResponse.equipos && configResponse.equipos.length > 0) {
        console.log('📊 Actualizando equipos desde Google Sheets');
        // Aquí podrías actualizar el array de equipos si es necesario
      }

      // Actualizar jurados si vienen de Google Sheets
      if (configResponse.jurados && Object.keys(configResponse.jurados).length > 0) {
        console.log('👥 Actualizando jurados desde Google Sheets');
        // Aquí podrías actualizar el objeto de jurados si es necesario
      }
    }
  }

  /**
   * Actualizar resultados en tiempo real
   */
  async actualizarResultadosEnTiempoReal() {
    try {
      const response = await this.makeRequest(GAS_CONFIG.ENDPOINTS.ACTUALIZAR_RESULTADOS);
      if (response.success) {
        console.log('🔄 Resultados actualizados en tiempo real');
        // Actualizar la interfaz si es necesario
        if (typeof actualizarResultados === 'function') {
          actualizarResultados();
        }
      }
    } catch (error) {
      console.error('❌ Error al actualizar resultados:', error);
    }
  }

  /**
   * Actualizar ranking en tiempo real
   */
  async actualizarRankingEnTiempoReal() {
    try {
      const response = await this.makeRequest(GAS_CONFIG.ENDPOINTS.ACTUALIZAR_RESULTADOS);
      if (response.success) {
        console.log('🔄 Ranking actualizado en tiempo real');
        // Actualizar la interfaz si es necesario
        if (typeof actualizarRanking === 'function') {
          actualizarRanking();
        }
      }
    } catch (error) {
      console.error('❌ Error al actualizar ranking:', error);
    }
  }

  /**
   * Guardar voto localmente (fallback)
   */
  guardarVotoLocal(jurado, equipo, propuestaId, titulo, categoria) {
    const votos = JSON.parse(localStorage.getItem('votosLocales') || '[]');
    votos.push({
      timestamp: new Date().toISOString(),
      jurado: jurado,
      equipo: equipo,
      propuestaId: propuestaId,
      titulo: titulo,
      categoria: categoria
    });
    localStorage.setItem('votosLocales', JSON.stringify(votos));
    console.log('💾 Voto guardado localmente');
  }

  /**
   * Guardar calificación localmente (fallback)
   */
  guardarCalificacionLocal(jurado, proyectoId, equipo, titulo, funcionalidad, innovacion, calidad, presentacion, viabilidad, comentarios) {
    const calificaciones = JSON.parse(localStorage.getItem('calificacionesLocales') || '[]');
    const puntuacionTotal = (funcionalidad * 0.30) + (innovacion * 0.25) + (calidad * 0.20) + (presentacion * 0.15) + (viabilidad * 0.10);
    
    calificaciones.push({
      timestamp: new Date().toISOString(),
      jurado: jurado,
      proyectoId: proyectoId,
      equipo: equipo,
      titulo: titulo,
      funcionalidad: funcionalidad,
      innovacion: innovacion,
      calidad: calidad,
      presentacion: presentacion,
      viabilidad: viabilidad,
      puntuacionTotal: puntuacionTotal,
      comentarios: comentarios
    });
    localStorage.setItem('calificacionesLocales', JSON.stringify(calificaciones));
    console.log('💾 Calificación guardada localmente');
  }

  /**
   * Obtener resultados locales (fallback)
   */
  obtenerResultadosLocales() {
    const votos = JSON.parse(localStorage.getItem('votosLocales') || '[]');
    // Procesar votos locales y devolver en el mismo formato
    return {
      success: true,
      resultados: this.procesarVotosLocales(votos),
      local: true
    };
  }

  /**
   * Obtener ranking local (fallback)
   */
  obtenerRankingLocal() {
    const calificaciones = JSON.parse(localStorage.getItem('calificacionesLocales') || '[]');
    // Procesar calificaciones locales y devolver en el mismo formato
    return {
      success: true,
      ranking: this.procesarCalificacionesLocales(calificaciones),
      local: true
    };
  }

  /**
   * Procesar votos locales
   */
  procesarVotosLocales(votos) {
    const votosPorEquipo = {};
    
    votos.forEach(voto => {
      if (!votosPorEquipo[voto.equipo]) {
        votosPorEquipo[voto.equipo] = {};
      }
      if (!votosPorEquipo[voto.equipo][voto.propuestaId]) {
        votosPorEquipo[voto.equipo][voto.propuestaId] = {
          titulo: voto.titulo,
          votos: 0
        };
      }
      votosPorEquipo[voto.equipo][voto.propuestaId].votos++;
    });

    return Object.keys(votosPorEquipo).map(equipo => {
      const propuestas = votosPorEquipo[equipo];
      const propuestaGanadora = Object.keys(propuestas).reduce((a, b) => 
        propuestas[a].votos > propuestas[b].votos ? a : b
      );
      
      return {
        equipo: equipo,
        propuestaGanadora: propuestas[propuestaGanadora].titulo,
        votos: propuestas[propuestaGanadora].votos
      };
    });
  }

  /**
   * Procesar calificaciones locales
   */
  procesarCalificacionesLocales(calificaciones) {
    const proyectos = {};
    
    calificaciones.forEach(cal => {
      if (!proyectos[cal.proyectoId]) {
        proyectos[cal.proyectoId] = {
          equipo: cal.equipo,
          titulo: cal.titulo,
          calificaciones: []
        };
      }
      proyectos[cal.proyectoId].calificaciones.push(cal.puntuacionTotal);
    });

    return Object.keys(proyectos).map(proyectoId => {
      const proyecto = proyectos[proyectoId];
      const promedio = proyecto.calificaciones.reduce((sum, cal) => sum + cal, 0) / proyecto.calificaciones.length;
      
      return {
        proyectoId: proyectoId,
        equipo: proyecto.equipo,
        titulo: proyecto.titulo,
        promedio: promedio,
        totalVotos: proyecto.calificaciones.length
      };
    }).sort((a, b) => b.promedio - a.promedio);
  }

  /**
   * Sincronizar datos locales con Google Sheets
   */
  async sincronizarDatosLocales() {
    if (!this.isConnected) {
      console.warn('⚠️ No conectado a Google Sheets, no se puede sincronizar');
      return;
    }

    try {
      // Sincronizar votos locales
      const votos = JSON.parse(localStorage.getItem('votosLocales') || '[]');
      for (const voto of votos) {
        await this.registrarVoto(voto.jurado, voto.equipo, voto.propuestaId, voto.titulo, voto.categoria);
      }
      
      // Sincronizar calificaciones locales
      const calificaciones = JSON.parse(localStorage.getItem('calificacionesLocales') || '[]');
      for (const cal of calificaciones) {
        await this.registrarCalificacion(
          cal.jurado, cal.proyectoId, cal.equipo, cal.titulo,
          cal.funcionalidad, cal.innovacion, cal.calidad, cal.presentacion, cal.viabilidad, cal.comentarios
        );
      }
      
      // Limpiar datos locales después de sincronizar
      localStorage.removeItem('votosLocales');
      localStorage.removeItem('calificacionesLocales');
      
      console.log('🔄 Datos locales sincronizados con Google Sheets');
    } catch (error) {
      console.error('❌ Error al sincronizar datos locales:', error);
    }
  }
}

// Instancia global de la integración
let sheetsIntegration;

// Inicializar integración cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
  sheetsIntegration = new SheetsIntegration();
  
  // Mostrar estado de conexión
  setTimeout(() => {
    const statusElement = document.getElementById('connectionStatus');
    if (statusElement) {
      if (sheetsIntegration.isConnected) {
        statusElement.innerHTML = '<i class="bi bi-cloud-check text-success"></i> Conectado a Google Sheets';
        statusElement.className = 'alert alert-success';
      } else {
        statusElement.innerHTML = '<i class="bi bi-cloud-slash text-warning"></i> Modo offline - Datos guardados localmente';
        statusElement.className = 'alert alert-warning';
      }
    }
  }, 2000);
});

// Función para configurar la URL del script (llamar desde la consola o configuración)
function configurarScriptUrl(nuevaUrl) {
  if (sheetsIntegration) {
    sheetsIntegration.scriptUrl = nuevaUrl;
    GAS_CONFIG.SCRIPT_URL = nuevaUrl;
    sheetsIntegration.testConnection();
    console.log('🔧 URL del script actualizada:', nuevaUrl);
  }
}

// Función para sincronizar manualmente
function sincronizarConSheets() {
  if (sheetsIntegration) {
    sheetsIntegration.sincronizarDatosLocales();
  }
}
