/**
 * SCRIPT PARA ENVIAR EMAILS A EQUIPOS - HACKATHON CODES++
 * Centro de Estudiantes de Sistemas - UNLu
 * 
 * Este script envía emails informativos a los equipos sobre las propuestas ganadoras
 */

// Configuración de emails de los equipos
const EQUIPOS_EMAILS = {
  'grupo_crear': 'mellarodriguez29@gmail.com', // Matias Rodriguez (líder del equipo)
  'los_migajeros': 'santiagosanchez.mdc@gmail.com', // Santiago Sánchez (líder del equipo)
  'sam_altman_co': 'valentino963@hotmail.com' // Valentino Lavigna (líder del equipo)
};

// Emails adicionales de cada equipo (para copia en los emails)
const EQUIPOS_EMAILS_ADICIONALES = {
  'grupo_crear': [
    'santialexisfranqueira@gmail.com', // Santiago Franqueira
    'tatianalourdesgaleano@gmail.com'  // Tatiana Galeano
  ],
  'los_migajeros': [
    'carpo.n.fiorence@gmail.com', // Carpo Fiorence
    'pierinij23@gmail.com'        // Jeremias Pierini
  ],
  'sam_altman_co': [
    'brunofancio123@gmail.com', // Bruno Fanciotti
    'poncepaola9@gmail.com'     // Paola Ponce
  ]
};

// Email de contacto para problemas
const EMAIL_CONTACTO = 'rizzofs@gmail.com';

// URL del sistema de resultados
const URL_RESULTADOS = 'https://codes-unlu.github.io/Web-Codes/estadisticas-final.html';

/**
 * Función principal para enviar emails a todos los equipos
 */
function enviarEmailsEquipos() {
  console.log('Iniciando envío de emails a equipos...');
  
  let emailsEnviados = 0;
  let emailsConError = 0;
  
  Object.keys(EQUIPOS_EMAILS).forEach(equipoKey => {
    const email = EQUIPOS_EMAILS[equipoKey];
    const nombreEquipo = obtenerNombreEquipo(equipoKey);
    const propuestaGanadora = obtenerPropuestaGanadora(equipoKey);
    
    try {
      const resultado = enviarEmailEquipo(email, nombreEquipo, propuestaGanadora, equipoKey);
      if (resultado) {
        emailsEnviados++;
        console.log(`Email enviado a ${nombreEquipo} (${email})`);
      } else {
        emailsConError++;
        console.log(`Error enviando email a ${nombreEquipo} (${email})`);
      }
    } catch (error) {
      emailsConError++;
      console.error(`Error enviando email a ${nombreEquipo}:`, error);
    }
  });
  
  console.log(`Resumen: ${emailsEnviados} emails enviados, ${emailsConError} errores`);
  
  // Enviar email de resumen al administrador
  enviarEmailResumen(emailsEnviados, emailsConError);
}

/**
 * Función para enviar email a un equipo específico
 */
function enviarEmailEquipo(email, nombreEquipo, propuestaGanadora, equipoKey) {
  try {
    const asunto = 'Hackathon CODES++ - ¡Tu propuesta ganadora está lista para desarrollar!';
    
    const cuerpo = `
¡Hola equipo ${nombreEquipo}!

¡Felicitaciones! Las votaciones del Hackathon CODES++ han finalizado y tenemos excelentes noticias.

========================================
¡TU PROPUESTA GANADORA!
========================================

PROPUESTA SELECCIONADA: ${propuestaGanadora.titulo}
CATEGORÍA: ${propuestaGanadora.categoria}
DESCRIPCIÓN: ${propuestaGanadora.descripcion}

========================================
PRÓXIMOS PASOS
========================================

1. REVISAR LA PROPUESTA: Asegúrate de entender completamente los requerimientos
2. PLANIFICAR EL DESARROLLO: Organiza las tareas y el tiempo disponible
3. COMENZAR A DESARROLLAR: ¡Es hora de hacer realidad tu idea!
4. DOCUMENTAR EL PROGRESO: Mantén un registro de avances

========================================
FECHA LÍMITE DE ENTREGA
========================================

FECHA: [FECHA A DEFINIR]
HORA: [HORA A DEFINIR]
FORMATO: [FORMATO DE ENTREGA A DEFINIR]

========================================
RECURSOS DISPONIBLES
========================================

• Acceso a mentores técnicos
• Herramientas de desarrollo
• Espacio de trabajo colaborativo
• Soporte del Centro de Estudiantes

========================================
VER RESULTADOS COMPLETOS
========================================

COPIA Y PEGA ESTE ENLACE EN TU NAVEGADOR:

${URL_RESULTADOS}

========================================
SOPORTE Y CONTACTO
========================================

Si tienes alguna pregunta sobre tu propuesta o necesitas ayuda:

${EMAIL_CONTACTO}

========================================

¡Mucha suerte en el desarrollo! Estamos ansiosos por ver tu proyecto final.

Saludos cordiales,
Centro de Estudiantes de Sistemas - UNLu
`;

    // Crear versión HTML del email con botón
    const cuerpoHTML = crearEmailHTMLEquipo(nombreEquipo, propuestaGanadora);
    
    // Obtener emails adicionales del equipo
    const emailsAdicionales = EQUIPOS_EMAILS_ADICIONALES[equipoKey] || [];
    const todosLosEmails = [email, ...emailsAdicionales];
    
    // Enviar email con versión HTML y texto plano, incluyendo a todos los miembros
    GmailApp.sendEmail(email, asunto, cuerpo, {
      htmlBody: cuerpoHTML,
      cc: emailsAdicionales.join(',')
    });
    return true;
    
  } catch (error) {
    console.error(`Error enviando email a ${email}:`, error);
    return false;
  }
}

/**
 * Función para enviar email de resumen al administrador
 */
function enviarEmailResumen(emailsEnviados, emailsConError) {
  try {
    const asunto = 'Resumen: Emails enviados a equipos - Hackathon CODES++';
    
    const cuerpo = `
========================================
RESUMEN DEL ENVÍO DE EMAILS A EQUIPOS
========================================

Emails enviados exitosamente: ${emailsEnviados}
Emails con error: ${emailsConError}
Fecha y hora: ${new Date().toLocaleString('es-ES')}

========================================
LISTA DE EQUIPOS
========================================

${Object.keys(EQUIPOS_EMAILS).map(key => `• ${obtenerNombreEquipo(key)}: ${EQUIPOS_EMAILS[key]}`).join('\n')}

========================================
PROPUESTAS GANADORAS
========================================

${Object.keys(EQUIPOS_EMAILS).map(key => {
  const propuesta = obtenerPropuestaGanadora(key);
  return `• ${obtenerNombreEquipo(key)}: ${propuesta.titulo} (${propuesta.categoria})`;
}).join('\n')}

========================================
URL DEL SISTEMA
========================================

${URL_RESULTADOS}

========================================

Sistema automatizado - Hackathon CODES++
`;

    GmailApp.sendEmail(EMAIL_CONTACTO, asunto, cuerpo);
    console.log('Email de resumen enviado al administrador');
    
  } catch (error) {
    console.error('Error enviando email de resumen:', error);
  }
}

/**
 * Función para crear la versión HTML del email para equipos
 */
function crearEmailHTMLEquipo(nombreEquipo, propuestaGanadora) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #27ae60; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background-color: #f8f9fa; padding: 20px; border-radius: 0 0 8px 8px; }
    .section { margin: 20px 0; padding: 15px; background-color: white; border-radius: 5px; border-left: 4px solid #27ae60; }
    .section h3 { margin-top: 0; color: #2c3e50; }
    .button { display: inline-block; background-color: #27ae60; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 10px 0; }
    .button:hover { background-color: #229954; }
    .propuesta-ganadora { background-color: #d5f4e6; padding: 15px; border-radius: 5px; border: 2px solid #27ae60; }
    .contacto { background-color: #e8f5e8; padding: 10px; border-radius: 5px; }
    .footer { text-align: center; margin-top: 20px; color: #7f8c8d; font-size: 14px; }
    .felicitaciones { background-color: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 ¡Felicitaciones! 🎉</h1>
    <p>Tu propuesta ganadora está lista para desarrollar</p>
  </div>
  
  <div class="content">
    <p>¡Hola equipo <strong>${nombreEquipo}</strong>!</p>
    
    <div class="felicitaciones">
      <h3>¡Excelentes noticias!</h3>
      <p>Las votaciones del Hackathon CODES++ han finalizado y tu equipo ha sido seleccionado para desarrollar una propuesta ganadora.</p>
    </div>
    
    <div class="section">
      <h3>🏆 Tu Propuesta Ganadora</h3>
      <div class="propuesta-ganadora">
        <p><strong>Título:</strong> ${propuestaGanadora.titulo}</p>
        <p><strong>Categoría:</strong> ${propuestaGanadora.categoria}</p>
        <p><strong>Descripción:</strong> ${propuestaGanadora.descripcion}</p>
      </div>
    </div>
    
    <div class="section">
      <h3>📋 Próximos Pasos</h3>
      <ol>
        <li><strong>Revisar la propuesta:</strong> Asegúrate de entender completamente los requerimientos</li>
        <li><strong>Planificar el desarrollo:</strong> Organiza las tareas y el tiempo disponible</li>
        <li><strong>Comenzar a desarrollar:</strong> ¡Es hora de hacer realidad tu idea!</li>
        <li><strong>Documentar el progreso:</strong> Mantén un registro de avances</li>
      </ol>
    </div>
    
    <div class="section">
      <h3>⏰ Fecha Límite de Entrega</h3>
      <p><strong>Fecha:</strong> [FECHA A DEFINIR]</p>
      <p><strong>Hora:</strong> [HORA A DEFINIR]</p>
      <p><strong>Formato:</strong> [FORMATO DE ENTREGA A DEFINIR]</p>
    </div>
    
    <div class="section">
      <h3>🛠️ Recursos Disponibles</h3>
      <ul>
        <li>Acceso a mentores técnicos</li>
        <li>Herramientas de desarrollo</li>
        <li>Espacio de trabajo colaborativo</li>
        <li>Soporte del Centro de Estudiantes</li>
      </ul>
    </div>
    
    <div class="section">
      <h3>📊 Ver Resultados Completos</h3>
      <a href="${URL_RESULTADOS}" class="button">VER RESULTADOS</a>
      <p><small>Si el botón no funciona, copia y pega este enlace: ${URL_RESULTADOS}</small></p>
    </div>
    
    <div class="section">
      <h3>📞 Soporte y Contacto</h3>
      <div class="contacto">
        <p>Si tienes alguna pregunta sobre tu propuesta o necesitas ayuda:</p>
        <p><strong>${EMAIL_CONTACTO}</strong></p>
      </div>
    </div>
    
    <p>¡Mucha suerte en el desarrollo! Estamos ansiosos por ver tu proyecto final.</p>
    
    <div class="footer">
      <p>Saludos cordiales,<br>
      Centro de Estudiantes de Sistemas - UNLu</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Función auxiliar para obtener el nombre completo del equipo
 */
function obtenerNombreEquipo(equipoKey) {
  const nombres = {
    'grupo_crear': 'Grupo_crear()',
    'los_migajeros': 'Los Migajeros',
    'sam_altman_co': 'Sam Altman & Co'
  };
  
  return nombres[equipoKey] || equipoKey;
}

/**
 * Función auxiliar para obtener la propuesta ganadora de cada equipo
 * ACTUALIZADO CON LOS RESULTADOS REALES DE LAS VOTACIONES
 */
function obtenerPropuestaGanadora(equipoKey) {
  const propuestasGanadoras = {
    'grupo_crear': {
      titulo: 'Plataforma de Alojamiento Estudiantil',
      categoria: 'Educación',
      descripcion: 'Aplicación web que conecta estudiantes de la UNLu con propietarios de monoambientes y departamentos, facilitando la búsqueda de alojamiento accesible.'
    },
    'los_migajeros': {
      titulo: 'SKILLSWAP HACKATON',
      categoria: 'Educación',
      descripcion: 'Plataforma de intercambio de habilidades donde los usuarios pueden enseñar y aprender nuevas competencias.'
    },
    'sam_altman_co': {
      titulo: 'Avisos por Animales',
      categoria: 'Comunidad',
      descripcion: 'Aplicación web que centraliza información sobre animales en la vía pública, avistamientos, campañas de castración y adopción con geolocalización.'
    }
  };
  
  return propuestasGanadoras[equipoKey] || {
    titulo: 'Propuesta por definir',
    categoria: 'Por definir',
    descripcion: 'Descripción pendiente de actualizar con los resultados de las votaciones.'
  };
}

/**
 * Función para enviar email de prueba a un equipo específico
 */
function enviarEmailPrueba() {
  const emailPrueba = 'rizzofs@gmail.com'; // Email de prueba
  const nombrePrueba = 'Equipo de Prueba';
  const propuestaPrueba = {
    titulo: 'Propuesta de Prueba',
    categoria: 'Prueba',
    descripcion: 'Esta es una propuesta de prueba para verificar el funcionamiento del sistema de emails.'
  };
  
  console.log('Enviando email de prueba...');
  const resultado = enviarEmailEquipo(emailPrueba, nombrePrueba, propuestaPrueba, 'grupo_crear');
  
  if (resultado) {
    console.log('Email de prueba enviado exitosamente');
  } else {
    console.log('Error enviando email de prueba');
  }
}

/**
 * Función para verificar configuración de emails
 */
function verificarConfiguracion() {
  console.log('Verificando configuración de emails...');
  
  console.log('Emails de equipos configurados:');
  Object.keys(EQUIPOS_EMAILS).forEach(key => {
    const email = EQUIPOS_EMAILS[key];
    const nombre = obtenerNombreEquipo(key);
    const propuesta = obtenerPropuestaGanadora(key);
    const emailsAdicionales = EQUIPOS_EMAILS_ADICIONALES[key] || [];
    
    console.log(`  - ${nombre}:`);
    console.log(`    Líder: ${email}`);
    if (emailsAdicionales.length > 0) {
      console.log(`    Miembros: ${emailsAdicionales.join(', ')}`);
    }
    console.log(`    Propuesta: ${propuesta.titulo} (${propuesta.categoria})`);
  });
  
  console.log(`Email de contacto: ${EMAIL_CONTACTO}`);
  console.log(`URL de resultados: ${URL_RESULTADOS}`);
  
  // Verificar si hay emails de ejemplo
  const emailsEjemplo = Object.values(EQUIPOS_EMAILS).filter(email => 
    email.includes('@example.com')
  );
  
  if (emailsEjemplo.length > 0) {
    console.log('ADVERTENCIA: Hay emails de ejemplo que deben ser cambiados:');
    emailsEjemplo.forEach(email => console.log(`  - ${email}`));
  }
}
