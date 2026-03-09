(function () {
  //Estilos de CSS.

  function injectStyles() {
    const css = `

    .sc-widget-button {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #4A90D9;
      color: white;
      border: none;
      padding: 14px 20px;
      border-radius: 30px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 6px 18px rgba(0,0,0,0.15);
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 9999;
      font-family: system-ui,-apple-system,sans-serif;
    }

    .sc-widget-container {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 360px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      font-family: system-ui,-apple-system,sans-serif;
      overflow: hidden;
      display: none;
      z-index: 9999;
    }

    .sc-header {
      background: #4A90D9;
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .sc-header-title {
      font-weight: 600;
      font-size: 16px;
    }

    .sc-header-subtitle {
      font-size: 12px;
      opacity: .9;
    }

    .sc-close {
      cursor: pointer;
      font-size: 18px;
    }

    .sc-tabs {
      display: flex;
      border-bottom: 1px solid #E5E7EB;
    }

    .sc-tab {
      flex: 1;
      text-align: center;
      padding: 12px;
      font-size: 14px;
      cursor: pointer;
      color: #6B7280;
    }

    .sc-tab-active {
      color: #4A90D9;
      border-bottom: 2px solid #4A90D9;
      font-weight: 600;
    }

    .sc-body {
      padding: 16px;
    }

    .sc-label {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 6px;
      display: block;
    }

    .sc-input,
    .sc-textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      font-size: 14px;
      margin-bottom: 12px;
    }

    .sc-textarea {
      resize: none;
      height: 80px;
    }

    .sc-type-selector {
      display: flex;
      gap: 6px;
      margin-bottom: 14px;
    }

    .sc-type-btn {
      flex: 1;
      border: 1px solid #E5E7EB;
      background: #F5F7FA;
      padding: 8px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
    }

    .sc-type-btn.active {
      background: #4A90D9;
      color: white;
      border: none;
    }

    .sc-submit {
      width: 100%;
      background: #4A90D9;
      color: white;
      border: none;
      padding: 12px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 8px;
    }

    .sc-footer {
      text-align: center;
      font-size: 11px;
      color: #9CA3AF;
      padding: 10px;
      border-top: 1px solid #E5E7EB;
    }

    `;

    const style = document.createElement('style');
    style.innerHTML = css;

    document.head.appendChild(style);
  }

  injectStyles();

  //Leer el workspace del script tag

  const scriptTag = document.currentScript;
  const workspaceKey = scriptTag.getAttribute('data-workspace');

  console.log('SupCrud widget loaded for workspace:', workspaceKey);

  //Crear botón flotante

  const button = document.createElement('button');
  button.className = 'sc-widget-button';
  button.innerHTML = '💬 Soporte';

  document.body.appendChild(button);

  //Crear contenedor del widget

  const widget = document.createElement('div');
  widget.className = 'sc-widget-container';

  widget.innerHTML = `

  <div class="sc-header">
      <div>
          <div class="sc-header-title">SupCrud Soporte</div>
          <div class="sc-header-subtitle">Estamos para ayudarte</div>
      </div>
      <div class="sc-close">✕</div>
  </div>

  <div class="sc-tabs">
      <div class="sc-tab sc-tab-active" data-tab="nuevo">Nuevo Ticket</div>
      <div class="sc-tab" data-tab="rastrear">Rastrear Ticket</div>
  </div>

  <div class="sc-body">

      <div class="sc-view" id="sc-view-nuevo">

          <label class="sc-label">TIPO DE SOLICITUD</label>

          <div class="sc-type-selector">
              <button class="sc-type-btn active">Petición</button>
              <button class="sc-type-btn">Queja</button>
              <button class="sc-type-btn">Reclamo</button>
              <button class="sc-type-btn">Sug.</button>
          </div>

          <label class="sc-label">Correo electrónico</label>
          <input class="sc-input" type="email" placeholder="ejemplo@correo.com">

          <label class="sc-label">Asunto</label>
          <input class="sc-input" type="text" placeholder="¿En qué podemos ayudarte?">

          <label class="sc-label">Descripción</label>
          <textarea class="sc-textarea" placeholder="Cuéntanos más detalles..."></textarea>

          <button class="sc-submit" id="sc-btn-enviar">Enviar Ticket</button>

      </div>

      <div class="sc-view" id="sc-view-rastrear" style="display:none">

          <label class="sc-label">Código de seguimiento</label>
          <input
              class="sc-input"
              id="sc-input-codigo"
              type="text"
              placeholder="SUP-XXXXXXXX"
              style="text-transform:uppercase;"
          >

          <button class="sc-submit" id="sc-btn-rastrear">Buscar</button>

          <div id="sc-resultado-rastreo" style="display:none; margin-top:12px;"></div>

      </div>

  </div>

  <div class="sc-footer">
      Powered by SupCrud PQRS
  </div>

  `;

  document.body.appendChild(widget);

  //Abrir - Cerrar widget

  button.onclick = () => {
    widget.style.display = 'block';
  };

  widget.querySelector('.sc-close').onclick = () => {
    widget.style.display = 'none';
  };

  //Tabs

  const tabs = widget.querySelectorAll('.sc-tab');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('sc-tab-active'));
      tab.classList.add('sc-tab-active');

      const tabName = tab.dataset.tab;

      widget.querySelector('#sc-view-nuevo').style.display = 'none';
      widget.querySelector('#sc-view-rastrear').style.display = 'none';
      widget.querySelector('#sc-view-' + tabName).style.display = 'block';
    });
  });

  //Selector PQRS

  const typeButtons = widget.querySelectorAll('.sc-type-btn');

  typeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      typeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  //Capturar envío del formulario

  const submitButton = widget.querySelector('#sc-btn-enviar');

  submitButton.addEventListener('click', async () => {
    // Mapear el texto del botón al código que espera el backend
    const typeMap = { Petición: 'P', Queja: 'Q', Reclamo: 'R', 'Sug.': 'S' };
    const typeText = widget.querySelector('.sc-type-btn.active').innerText;
    const type = typeMap[typeText] || 'P';

    const email = widget.querySelector('input[type="email"]').value.trim();
    const subject = widget.querySelectorAll('.sc-input')[1].value.trim();
    const description = widget.querySelector('.sc-textarea').value.trim();

    // Validación básica
    if (!email || !subject || !description) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const ticketData = {
      submitterEmail: email,
      submitterName: email,
      subject,
      description,
      type,
    };

    try {
      const response = await fetch(
        `https://supcrud-backend-production.up.railway.app/api/public/tickets/${workspaceKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ticketData),
        }
      );

      if (!response.ok) {
        throw new Error('Error al crear el ticket');
      }

      const data = await response.json();
      const referenceCode = data.referenceCode;

      widget.querySelector('.sc-body').innerHTML = `
        <div style="text-align:center;padding:20px;">
          <h3>✅ Ticket creado</h3>
          <p>Guarda este código para rastrear tu solicitud:</p>
          <strong style="font-size:18px;">${referenceCode}</strong>
        </div>
      `;
    } catch (error) {
      alert('No pudimos enviar tu ticket. Intenta nuevamente más tarde.');
      console.error(error);
    }
  });

  // ── Rastrear ticket ──────────────────────────────────
  const btnRastrear = widget.querySelector('#sc-btn-rastrear');

  btnRastrear.addEventListener('click', async () => {
    const codigo = widget
      .querySelector('#sc-input-codigo')
      .value.trim()
      .toUpperCase();
    const resultado = widget.querySelector('#sc-resultado-rastreo');

    if (!codigo) {
      alert('Ingresa tu código de seguimiento.');
      return;
    }

    btnRastrear.textContent = 'Buscando...';
    btnRastrear.disabled = true;

    try {
      const response = await fetch(
        `https://supcrud-backend-production.up.railway.app/api/public/tickets/${codigo}`
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        resultado.style.display = 'block';
        resultado.style.background = '#FEF2F2';
        resultado.style.padding = '12px';
        resultado.style.borderRadius = '8px';
        resultado.style.color = '#DC2626';
        resultado.style.fontSize = '13px';
        resultado.innerHTML = 'No encontramos un ticket con ese código.';
        return;
      }

      const ticket = data.data || data;
      const estadoMap = {
        OPEN: 'Abierto',
        IN_PROGRESS: 'En progreso',
        RESOLVED: 'Resuelto',
        CLOSED: 'Cerrado',
        REOPENED: 'Reabierto',
      };
      const estado = estadoMap[ticket.status] || ticket.status;

      resultado.style.display = 'block';
      resultado.style.background = '#F0F9FF';
      resultado.style.padding = '12px';
      resultado.style.borderRadius = '8px';
      resultado.style.fontSize = '13px';
      resultado.style.color = '#1A1A2E';
      resultado.innerHTML = `
        <p style="margin:0 0 6px;font-weight:600;">${ticket.subject || '(Sin asunto)'}</p>
        <p style="margin:0 0 4px;">Estado: <strong>${estado}</strong></p>
        <p style="margin:0;color:#6B7280;font-size:12px;">
          Para ver el detalle completo visita
          <a href="https://crudzaso.github.io/supcrud-frontend/consulta.html?ref=${ticket.referenceCode}"
             target="_blank"
             style="color:#4A90D9;">
            este enlace
          </a>
        </p>
      `;
    } catch (error) {
      resultado.style.display = 'block';
      resultado.innerHTML = 'Error de conexión. Intenta más tarde.';
      console.error(error);
    } finally {
      btnRastrear.textContent = 'Buscar';
      btnRastrear.disabled = false;
    }
  });
})();
