function enviarEmailConsigna() {
  // Configuración del email
  const asunto = "🚀 HACKATHON VIRTUAL 48H - Consigna y Detalles del Evento";
  const consignaUrl = "https://codes-unlu.github.io/Web-Codes/consigna.html";
  
  // Cuerpo del email con diseño del hackathon
  const cuerpoEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      color: #ffffff;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #1a1a1a;
      border: 2px solid #00ff88;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: linear-gradient(45deg, #00ff88, #0088ff);
      border-radius: 10px;
      color: #000;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      font-weight: 600;
    }
    .highlight {
      background: rgba(0, 255, 136, 0.1);
      border-left: 4px solid #00ff88;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(45deg, #00ff88, #0088ff);
      color: #000;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      font-size: 18px;
      margin: 20px 0;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
      transition: all 0.3s ease;
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 255, 136, 0.6);
    }
    .info-box {
      background: rgba(0, 136, 255, 0.1);
      border: 1px solid #0088ff;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .timeline {
      background: rgba(255, 0, 136, 0.1);
      border: 1px solid #ff0088;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #333;
      color: #888;
    }
    .emoji {
      font-size: 20px;
      margin-right: 8px;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🖥️ HACKATHON VIRTUAL 48H</h1>
      <p>CODES++ - Centro de Estudiantes de Sistemas UNLu</p>
    </div>

    <div class="highlight">
      <h2>🎯 ¡Hola Hackers!</h2>
      <p>Es momento de poner a prueba tus habilidades y crear algo increíble para la comunidad. Te enviamos la <strong>consigna oficial</strong> del Hackathon Virtual 48H.</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${consignaUrl}" class="cta-button">
        📋 VER CONSIGNA COMPLETA
      </a>
    </div>

    <div class="info-box">
      <h3><span class="emoji">⚡</span>Lo que necesitas saber:</h3>
      <ul>
        <li><strong>Fecha de inicio:</strong> Viernes 26 de septiembre 2025 - 22:00 hs</li>
        <li><strong>Duración:</strong> 48 horas de desarrollo intensivo</li>
        <li><strong>Modalidad:</strong> Virtual - equipos de 3 integrantes</li>
        <li><strong>Objetivo:</strong> Crear un MVP que resuelva un problema de la comunidad</li>
      </ul>
    </div>

    <div class="timeline">
      <h3><span class="emoji">📅</span>Cronograma Importante:</h3>
      <ul>
        <li><strong>ANTES del 26/09:</strong> Enviar 3 propuestas por equipo</li>
        <li><strong>26/09 - 22:00 hs:</strong> Notificación de propuesta seleccionada + Inicio</li>
        <li><strong>28/09 - 22:00 hs:</strong> Entrega final del MVP</li>
      </ul>
    </div>

    <div class="highlight">
      <h3><span class="emoji">🚀</span>¿Qué sigue?</h3>
      <ol>
        <li>Lee la consigna completa haciendo clic en el botón de arriba</li>
        <li>Prepara tus 3 propuestas de MVP</li>
        <li>Envíalas a <strong>codes.unlu@gmail.com</strong></li>
        <li>¡Espera la notificación del viernes 26!</li>
      </ol>
    </div>

    <div class="info-box">
      <h3><span class="emoji">🏆</span>Criterios de Evaluación:</h3>
      <ul>
        <li>Impacto en la comunidad (30%)</li>
        <li>Innovación y creatividad (25%)</li>
        <li>Viabilidad técnica (20%)</li>
        <li>Usabilidad del MVP (15%)</li>
        <li>Presentación (10%)</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${consignaUrl}" class="cta-button">
        🚀 LEER CONSIGNA AHORA
      </a>
    </div>

    <div class="footer">
      <p><strong>CODES++ - Centro de Estudiantes de Sistemas UNLu</strong></p>
      <p>📧 codes.unlu@gmail.com | 🌐 Organizadores del Hackathon Virtual 48H</p>
      <p style="font-size: 12px; color: #666;">© 2025 CODES++. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
  `;

  // Lista de destinatarios (reemplaza con las direcciones reales)
  const destinatarios = [
    "ejemplo1@email.com",
    "ejemplo2@email.com",
    "ejemplo3@email.com"
    // Agrega aquí todas las direcciones de email de los participantes
  ];

  // Enviar email a cada destinatario
  destinatarios.forEach(destinatario => {
    try {
      GmailApp.sendEmail(
        destinatario,
        asunto,
        "", // Cuerpo en texto plano (vacío porque usamos HTML)
        {
          htmlBody: cuerpoEmail,
          name: "CODES++ - Hackathon Virtual"
        }
      );
      
      console.log(`✅ Email enviado a: ${destinatario}`);
      
      // Pequeña pausa entre emails para evitar límites de Gmail
      Utilities.sleep(1000);
      
    } catch (error) {
      console.error(`❌ Error enviando email a ${destinatario}:`, error);
    }
  });

  console.log(`🎉 Proceso completado. Se enviaron ${destinatarios.length} emails.`);
}

// Función para enviar email de prueba a una dirección específica
function enviarEmailPrueba() {
  const asunto = "🚀 HACKATHON VIRTUAL 48H - Consigna y Detalles del Evento (PRUEBA)";
  const consignaUrl = "https://codes-unlu.github.io/Web-Codes/consigna.html";
  
  const cuerpoEmail = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      color: #ffffff;
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #1a1a1a;
      border: 2px solid #00ff88;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
      padding: 20px;
      background: linear-gradient(45deg, #00ff88, #0088ff);
      border-radius: 10px;
      color: #000;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    .header p {
      margin: 10px 0 0 0;
      font-size: 16px;
      font-weight: 600;
    }
    .highlight {
      background: rgba(0, 255, 136, 0.1);
      border-left: 4px solid #00ff88;
      padding: 15px;
      margin: 20px 0;
      border-radius: 5px;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(45deg, #00ff88, #0088ff);
      color: #000;
      padding: 15px 30px;
      text-decoration: none;
      border-radius: 25px;
      font-weight: bold;
      font-size: 18px;
      margin: 20px 0;
      text-align: center;
      box-shadow: 0 4px 15px rgba(0, 255, 136, 0.4);
    }
    .info-box {
      background: rgba(0, 136, 255, 0.1);
      border: 1px solid #0088ff;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .timeline {
      background: rgba(255, 0, 136, 0.1);
      border: 1px solid #ff0088;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #333;
      color: #888;
    }
    .emoji {
      font-size: 20px;
      margin-right: 8px;
    }
    ul {
      padding-left: 20px;
    }
    li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🖥️ HACKATHON VIRTUAL 48H</h1>
      <p>CODES++ - Centro de Estudiantes de Sistemas UNLu</p>
    </div>

    <div class="highlight">
      <h2>🎯 ¡Hola Hackers!</h2>
      <p>Es momento de poner a prueba tus habilidades y crear algo increíble para la comunidad. Te enviamos la <strong>consigna oficial</strong> del Hackathon Virtual 48H.</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${consignaUrl}" class="cta-button">
        📋 VER CONSIGNA COMPLETA
      </a>
    </div>

    <div class="info-box">
      <h3><span class="emoji">⚡</span>Lo que necesitas saber:</h3>
      <ul>
        <li><strong>Fecha de inicio:</strong> Viernes 26 de septiembre 2025 - 22:00 hs</li>
        <li><strong>Duración:</strong> 48 horas de desarrollo intensivo</li>
        <li><strong>Modalidad:</strong> Virtual - equipos de 3 integrantes</li>
        <li><strong>Objetivo:</strong> Crear un MVP que resuelva un problema de la comunidad</li>
      </ul>
    </div>

    <div class="timeline">
      <h3><span class="emoji">📅</span>Cronograma Importante:</h3>
      <ul>
        <li><strong>ANTES del 26/09:</strong> Enviar 3 propuestas por equipo</li>
        <li><strong>26/09 - 22:00 hs:</strong> Notificación de propuesta seleccionada + Inicio</li>
        <li><strong>28/09 - 22:00 hs:</strong> Entrega final del MVP</li>
      </ul>
    </div>

    <div class="highlight">
      <h3><span class="emoji">🚀</span>¿Qué sigue?</h3>
      <ol>
        <li>Lee la consigna completa haciendo clic en el botón de arriba</li>
        <li>Prepara tus 3 propuestas de MVP</li>
        <li>Envíalas a <strong>codes.unlu@gmail.com</strong></li>
        <li>¡Espera la notificación del viernes 26!</li>
      </ol>
    </div>

    <div class="info-box">
      <h3><span class="emoji">🏆</span>Criterios de Evaluación:</h3>
      <ul>
        <li>Impacto en la comunidad (30%)</li>
        <li>Innovación y creatividad (25%)</li>
        <li>Viabilidad técnica (20%)</li>
        <li>Usabilidad del MVP (15%)</li>
        <li>Presentación (10%)</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${consignaUrl}" class="cta-button">
        🚀 LEER CONSIGNA AHORA
      </a>
    </div>

    <div class="footer">
      <p><strong>CODES++ - Centro de Estudiantes de Sistemas UNLu</strong></p>
      <p>📧 codes.unlu@gmail.com | 🌐 Organizadores del Hackathon Virtual 48H</p>
      <p style="font-size: 12px; color: #666;">© 2025 CODES++. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
  `;

  // Email de prueba (reemplaza con tu email)
  const emailPrueba = "tu-email@gmail.com";
  
  try {
    GmailApp.sendEmail(
      emailPrueba,
      asunto,
      "", // Cuerpo en texto plano (vacío porque usamos HTML)
      {
        htmlBody: cuerpoEmail,
        name: "CODES++ - Hackathon Virtual"
      }
    );
    
    console.log(`✅ Email de prueba enviado a: ${emailPrueba}`);
    
  } catch (error) {
    console.error(`❌ Error enviando email de prueba:`, error);
  }
}
