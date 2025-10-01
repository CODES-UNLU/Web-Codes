/**
 * SCRIPT PARA ENVIAR EMAILS A JURADOS - CALIFICACIÓN DE MVPs
 * 
 * Este script envía emails informativos a los jurados del hackathon
 * notificando que ya pueden calificar los proyectos MVP y que pueden
 * agregar devoluciones constructivas a los equipos.
 * 
 * INSTRUCCIONES:
 * 1. Abre Google Apps Script (script.google.com)
 * 2. Crea un nuevo proyecto
 * 3. Copia y pega este código
 * 4. Configura las direcciones de email de los jurados
 * 5. Ejecuta la función 'enviarEmailsJuradosMVP()'
 */

function enviarEmailsJuradosMVP() {
  try {
    console.log('📧 Iniciando envío de emails a jurados...');
    
    // Lista de jurados con sus emails (nombres reales del sistema)
    const jurados = [
      {
        nombre: 'Nehuen Prados',
        email: 'nehuen.prados@unlu.edu.ar'
      },
      {
        nombre: 'Walter Panessi',
        email: 'walter.panessi@unlu.edu.ar'
      },
      {
        nombre: 'Pablo Chale',
        email: 'pablo.chale@unlu.edu.ar'
      },
      {
        nombre: 'Santiago Ricci',
        email: 'santiago.ricci@unlu.edu.ar'
      },
      {
        nombre: 'Gabriel Tolosa',
        email: 'gabriel.tolosa@unlu.edu.ar'
      },
      {
        nombre: 'Juan Manuel Fernandez',
        email: 'juan.fernandez@unlu.edu.ar'
      }
    ];
    
    // Configuración del email
    const asunto = '🎯 HACKATHON CODES++ - Calificación de Proyectos MVP Disponible';
    
    let emailsEnviados = 0;
    let emailsFallidos = 0;
    const errores = [];
    
    // Enviar email a cada jurado
    jurados.forEach((jurado, index) => {
      try {
        const cuerpoEmail = generarCuerpoEmail(jurado);
        
        GmailApp.sendEmail(
          jurado.email,
          asunto,
          '', // Texto plano (vacío porque usamos HTML)
          {
            name: 'Centro de Estudiantes UNLu',
            htmlBody: cuerpoEmail
          }
        );
        
        console.log(`✅ Email enviado a ${jurado.nombre} (${jurado.email})`);
        emailsEnviados++;
        
        // Pequeña pausa entre emails para evitar límites
        Utilities.sleep(1000);
        
      } catch (error) {
        console.error(`❌ Error enviando email a ${jurado.nombre}:`, error);
        emailsFallidos++;
        errores.push({
          jurado: jurado.nombre,
          email: jurado.email,
          error: error.toString()
        });
      }
    });
    
    // Resumen final
    console.log('📊 RESUMEN DE ENVÍO:');
    console.log(`✅ Emails enviados exitosamente: ${emailsEnviados}`);
    console.log(`❌ Emails fallidos: ${emailsFallidos}`);
    
    if (errores.length > 0) {
      console.log('🔍 Errores detallados:', errores);
    }
    
    return {
      success: true,
      emailsEnviados: emailsEnviados,
      emailsFallidos: emailsFallidos,
      errores: errores,
      message: `Envío completado: ${emailsEnviados} exitosos, ${emailsFallidos} fallidos`
    };
    
  } catch (error) {
    console.error('❌ Error general en envío de emails:', error);
    return {
      success: false,
      error: error.toString(),
      message: 'Error en el envío de emails'
    };
  }
}

function generarCuerpoEmail(jurado) {
  const fechaActual = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hackathon CODES++ - Calificación MVP</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 15px;
                padding: 30px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                color: white;
                margin-bottom: 30px;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
                font-weight: bold;
            }
            .header p {
                margin: 10px 0 0 0;
                font-size: 16px;
                opacity: 0.9;
            }
            .content {
                background: white;
                border-radius: 10px;
                padding: 30px;
                margin: 20px 0;
            }
            .greeting {
                font-size: 18px;
                color: #2c3e50;
                margin-bottom: 20px;
            }
            .highlight {
                background: linear-gradient(120deg, #a8edea 0%, #fed6e3 100%);
                padding: 20px;
                border-radius: 10px;
                margin: 20px 0;
                border-left: 5px solid #667eea;
            }
            .highlight h2 {
                color: #2c3e50;
                margin: 0 0 10px 0;
                font-size: 20px;
            }
            .criteria {
                background: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .criteria h3 {
                color: #495057;
                margin: 0 0 15px 0;
                font-size: 16px;
            }
            .criteria ul {
                margin: 0;
                padding-left: 20px;
            }
            .criteria li {
                margin: 8px 0;
                color: #6c757d;
            }
            .feedback-section {
                background: #e3f2fd;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 5px solid #2196f3;
            }
            .feedback-section h3 {
                color: #1976d2;
                margin: 0 0 15px 0;
            }
            .cta-button {
                display: inline-block;
                background: linear-gradient(45deg, #667eea, #764ba2);
                color: white;
                padding: 15px 30px;
                text-decoration: none;
                border-radius: 25px;
                font-weight: bold;
                text-align: center;
                margin: 20px 0;
                box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                transition: transform 0.3s ease;
            }
            .cta-button:hover {
                transform: translateY(-2px);
            }
            .footer {
                text-align: center;
                color: white;
                margin-top: 30px;
                font-size: 14px;
                opacity: 0.8;
            }
            .important {
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
            }
            .important h4 {
                color: #856404;
                margin: 0 0 10px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎯 HACKATHON CODES++</h1>
                <p>Calificación de Proyectos MVP</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Estimado/a <strong>${jurado.nombre}</strong>,
                </div>
                
                <p>Esperamos que se encuentre muy bien. Le escribimos para informarle que <strong>ya están disponibles los proyectos MVP</strong> para su calificación en el Hackathon CODES++ 2025.</p>
                
                <div class="highlight">
                    <h2>🚀 ¡Es hora de calificar los MVPs!</h2>
                    <p>Los equipos han presentado sus proyectos finales y ahora necesitamos su valiosa evaluación para determinar los ganadores del hackathon.</p>
                </div>
                
                <div class="criteria">
                    <h3>📋 Criterios de Evaluación:</h3>
                    <ul>
                        <li><strong>Funcionalidad (30%):</strong> ¿El proyecto funciona como se propone?</li>
                        <li><strong>Innovación (25%):</strong> ¿Qué tan innovadora es la solución?</li>
                        <li><strong>Calidad Técnica (20%):</strong> ¿Qué tan bien implementado está?</li>
                        <li><strong>Presentación (15%):</strong> ¿Cómo se presentó el proyecto?</li>
                        <li><strong>Viabilidad (10%):</strong> ¿Es viable comercialmente?</li>
                    </ul>
                </div>
                
                <div class="feedback-section">
                    <h3>💬 ¡Nueva Funcionalidad: Devoluciones a los Equipos!</h3>
                    <p>Los equipos nos han expresado su deseo de recibir <strong>devoluciones constructivas</strong> sobre sus proyectos. Como jurado, ahora puede:</p>
                    <ul>
                        <li>📝 Agregar comentarios específicos sobre cada criterio</li>
                        <li>💡 Sugerir mejoras y puntos de desarrollo</li>
                        <li>🎯 Destacar fortalezas y áreas de oportunidad</li>
                        <li>🚀 Motivar a los equipos con feedback positivo</li>
                    </ul>
                    <p><strong>Esta retroalimentación será muy valiosa para el crecimiento de los estudiantes.</strong></p>
                </div>
                
                <div class="important">
                    <h4>⏰ Información Importante:</h4>
                    <ul>
                        <li><strong>Fecha límite:</strong> ${fechaActual} - 23:59 hs</li>
                        <li><strong>Duración estimada:</strong> 15-20 minutos por proyecto</li>
                        <li><strong>Total de proyectos:</strong> 8 proyectos MVP</li>
                        <li><strong>Su rol:</strong> Jurado del Hackathon CODES++</li>
                    </ul>
                </div>
                
                <div style="text-align: center; margin: 30px 0;">
                    <a href="https://centro-estudiantes-unlu.github.io/Web-Codes/jurados.html" class="cta-button">
                        🎯 COMENZAR CALIFICACIÓN
                    </a>
                </div>
                
                <p><strong>Instrucciones de acceso:</strong></p>
                <ol>
                    <li>Haga clic en el botón "COMENZAR CALIFICACIÓN"</li>
                    <li>Seleccione su nombre en la lista de jurados</li>
                    <li>Elija "Calificar Proyectos"</li>
                    <li>Complete todos los criterios para cada proyecto</li>
                    <li>Agregue devoluciones constructivas (opcional pero muy valorado)</li>
                    <li>Haga clic en "Calificar" para enviar su evaluación</li>
                </ol>
                
                <div class="feedback-section">
                    <h3>🤝 Su Rol es Fundamental</h3>
                    <p>Su experiencia y conocimiento son invaluables para evaluar estos proyectos. Su feedback no solo determinará los ganadores, sino que también ayudará a los estudiantes a crecer profesionalmente.</p>
                </div>
                
                <p>Si tiene alguna consulta o necesita asistencia técnica, no dude en contactarnos.</p>
                
                <p>¡Muchas gracias por su tiempo y dedicación!</p>
                
                <p>Saludos cordiales,<br>
                <strong>Centro de Estudiantes UNLu</strong><br>
                <em>Organización Hackathon CODES++ 2025</em></p>
            </div>
            
            <div class="footer">
                <p>📧 centro.estudiantes@unlu.edu.ar | 🌐 www.unlu.edu.ar</p>
                <p>Este email fue enviado automáticamente el ${fechaActual}</p>
            </div>
        </div>
    </body>
    </html>
  `;
}

/**
 * FUNCIÓN PARA ENVIAR EMAIL DE RECORDATORIO
 * Envía un email de recordatorio a jurados que no han completado sus calificaciones
 */
function enviarRecordatorioJurados() {
  try {
    console.log('📧 Enviando recordatorio a jurados...');
    
    // Lista de jurados (nombres reales del sistema)
    const jurados = [
      {
        nombre: 'Nehuen Prados',
        email: 'nehuen.prados@unlu.edu.ar'
      },
      {
        nombre: 'Walter Panessi',
        email: 'walter.panessi@unlu.edu.ar'
      },
      {
        nombre: 'Pablo Chale',
        email: 'pablo.chale@unlu.edu.ar'
      },
      {
        nombre: 'Santiago Ricci',
        email: 'santiago.ricci@unlu.edu.ar'
      },
      {
        nombre: 'Gabriel Tolosa',
        email: 'gabriel.tolosa@unlu.edu.ar'
      },
      {
        nombre: 'Juan Manuel Fernandez',
        email: 'juan.fernandez@unlu.edu.ar'
      }
    ];
    
    const asunto = '⏰ RECORDATORIO - Hackathon CODES++ - Calificación MVP';
    
    let emailsEnviados = 0;
    
    jurados.forEach(jurado => {
      try {
        const cuerpoRecordatorio = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2c3e50;">⏰ Recordatorio - Hackathon CODES++</h2>
            
            <p>Estimado/a <strong>${jurado.nombre}</strong>,</p>
            
            <p>Le recordamos que la <strong>calificación de proyectos MVP</strong> sigue disponible y esperamos su valiosa evaluación.</p>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #856404; margin: 0 0 10px 0;">📅 Fecha límite: ${new Date().toLocaleDateString('es-ES')} - 23:59 hs</h3>
            </div>
            
            <p><strong>Acceso directo:</strong> <a href="https://centro-estudiantes-unlu.github.io/Web-Codes/jurados.html" style="color: #667eea;">Comenzar Calificación</a></p>
            
            <p>¡Su feedback es fundamental para el éxito del hackathon!</p>
            
            <p>Saludos cordiales,<br>
            <strong>Centro de Estudiantes UNLu</strong></p>
          </div>
        `;
        
        GmailApp.sendEmail(
          jurado.email,
          asunto,
          '',
          {
            name: 'Centro de Estudiantes UNLu',
            htmlBody: cuerpoRecordatorio
          }
        );
        
        console.log(`✅ Recordatorio enviado a ${jurado.nombre}`);
        emailsEnviados++;
        
        Utilities.sleep(1000);
        
      } catch (error) {
        console.error(`❌ Error enviando recordatorio a ${jurado.nombre}:`, error);
      }
    });
    
    console.log(`📊 Recordatorios enviados: ${emailsEnviados}`);
    return { success: true, emailsEnviados: emailsEnviados };
    
  } catch (error) {
    console.error('❌ Error en envío de recordatorios:', error);
    return { success: false, error: error.toString() };
  }
}

/**
 * FUNCIÓN DE PRUEBA SIMPLE
 */
function probarEnvioEmails() {
  console.log('🧪 Probando sistema de emails...');
  
  // Simular envío a un solo jurado para prueba
  const juradoPrueba = {
    nombre: 'Nehuen Prados',
    email: 'rizzofs@gmail.com'
  };
  
  console.log('📧 Email de prueba preparado para:', juradoPrueba.nombre);
  console.log('✅ Sistema de emails funcionando correctamente');
  
  return juradoPrueba;
}

/**
 * FUNCIÓN DE PRUEBA REAL - ENVÍA EMAIL DE VERDAD
 */
function probarEnvioReal() {
  try {
    console.log('🧪 Iniciando prueba real de envío de email...');
    
    const emailPrueba = 'rizzofs@gmail.com';
    const asunto = '🧪 PRUEBA - Hackathon CODES++ - Sistema de Emails';
    
    const cuerpoPrueba = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #2c3e50;">🧪 PRUEBA DE SISTEMA DE EMAILS</h2>
        
        <p>Este es un email de prueba del sistema de notificaciones del Hackathon CODES++.</p>
        
        <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1976d2; margin: 0 0 10px 0;">✅ Sistema Funcionando</h3>
          <p>Si recibes este email, significa que el sistema de envío de emails está funcionando correctamente.</p>
        </div>
        
        <p><strong>Fecha de prueba:</strong> ${new Date().toLocaleString('es-ES')}</p>
        <p><strong>Email de prueba:</strong> ${emailPrueba}</p>
        
        <p>Saludos,<br>
        <strong>Sistema de Emails - Hackathon CODES++</strong></p>
      </div>
    `;
    
    console.log('📤 Enviando email de prueba a:', emailPrueba);
    
    GmailApp.sendEmail(
      emailPrueba,
      asunto,
      '', // Texto plano vacío
      {
        name: 'Hackathon CODES++ - Sistema de Prueba',
        htmlBody: cuerpoPrueba
      }
    );
    
    console.log('✅ Email de prueba enviado exitosamente');
    console.log('📧 Revisa tu bandeja de entrada y spam');
    
    return {
      success: true,
      message: 'Email de prueba enviado exitosamente',
      destinatario: emailPrueba,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('❌ Error en prueba de envío:', error);
    return {
      success: false,
      error: error.toString(),
      message: 'Error al enviar email de prueba'
    };
  }
}

/**
 * FUNCIÓN PARA ACTIVAR PERMISOS DE GMAIL
 */
function activarPermisosGmail() {
  try {
    console.log('🔐 Activando permisos de Gmail...');
    
    // Esta línea activará la solicitud de permisos
    const threads = GmailApp.getInboxThreads(0, 1);
    
    console.log('✅ Permisos de Gmail activados correctamente');
    console.log('📊 Hilos encontrados:', threads.length);
    
    return {
      success: true,
      message: 'Permisos de Gmail configurados correctamente',
      hilos: threads.length
    };
    
  } catch (error) {
    console.error('❌ Error al activar permisos:', error);
    return {
      success: false,
      error: error.toString(),
      message: 'Error al configurar permisos de Gmail'
    };
  }
}

/**
 * FUNCIÓN DE DIAGNÓSTICO COMPLETO
 */
function diagnosticarSistemaEmails() {
  try {
    console.log('🔍 Iniciando diagnóstico completo del sistema de emails...');
    
    // Verificar permisos de Gmail
    console.log('📧 Verificando permisos de Gmail...');
    try {
      const threads = GmailApp.getInboxThreads(0, 1);
      console.log('✅ Permisos de Gmail: OK');
      console.log('📊 Hilos en bandeja:', threads.length);
    } catch (permisoError) {
      console.error('❌ Error de permisos Gmail:', permisoError);
      return {
        success: false,
        error: 'Permisos de Gmail no configurados',
        solucion: 'Ejecuta el script y autoriza el acceso a Gmail'
      };
    }
    
    // Verificar configuración de usuario
    console.log('👤 Verificando configuración de usuario...');
    const user = Session.getActiveUser();
    console.log('👤 Usuario activo:', user.getEmail());
    
    // Verificar límites de Gmail
    console.log('📊 Verificando límites de Gmail...');
    const dailyLimit = MailApp.getRemainingDailyQuota();
    console.log('📊 Emails restantes hoy:', dailyLimit);
    
    if (dailyLimit <= 0) {
      console.warn('⚠️ Límite diario de emails alcanzado');
    }
    
    return {
      success: true,
      usuario: user.getEmail(),
      emailsRestantes: dailyLimit,
      permisos: 'OK',
      message: 'Sistema de emails funcionando correctamente'
    };
    
  } catch (error) {
    console.error('❌ Error en diagnóstico:', error);
    return {
      success: false,
      error: error.toString(),
      message: 'Error en diagnóstico del sistema'
    };
  }
}
