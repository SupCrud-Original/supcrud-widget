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

    const style = document.createElement("style");
    style.innerHTML = css;

    document.head.appendChild(style);
  }

  injectStyles();

  //Leer el workspace del script tag

  const scriptTag = document.currentScript;
  const workspaceKey = scriptTag.getAttribute("data-workspace");

  console.log("SupCrud widget loaded for workspace:", workspaceKey);

  //Crear botón flotante

  const button = document.createElement("button");
  button.className = "sc-widget-button";
  button.innerHTML = "💬 Soporte";

  document.body.appendChild(button);

  //Crear contenedor del widget

  const widget = document.createElement("div");
  widget.className = "sc-widget-container";

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

          <button class="sc-submit">Enviar Ticket</button>

      </div>

      <div class="sc-view" id="sc-view-rastrear" style="display:none">

          <label class="sc-label">Código de Referencia</label>
          <input class="sc-input" type="text" placeholder="SC-XXXX-XXXXX">

          <button class="sc-submit">Buscar</button>

      </div>

  </div>

  <div class="sc-footer">
      Powered by SupCrud PQRS
  </div>

  `;

  document.body.appendChild(widget);

  //Abrir - Cerrar widget

  button.onclick = () => {
      widget.style.display = "block";
  };

  widget.querySelector(".sc-close").onclick = () => {
      widget.style.display = "none";
  };

  //Tabs

  const tabs = widget.querySelectorAll(".sc-tab");

  tabs.forEach(tab => {

      tab.addEventListener("click", () => {

          tabs.forEach(t => t.classList.remove("sc-tab-active"));
          tab.classList.add("sc-tab-active");

          const tabName = tab.dataset.tab;

          document.querySelector("#sc-view-nuevo").style.display = "none";
          document.querySelector("#sc-view-rastrear").style.display = "none";

          document.querySelector("#sc-view-" + tabName).style.display = "block";

      });

  });

  //Selector PQRS

  const typeButtons = widget.querySelectorAll(".sc-type-btn");

  typeButtons.forEach(btn => {

      btn.addEventListener("click", () => {

          typeButtons.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");

      });

  });

  //Capturar envío del formulario

  const submitButton = widget.querySelector(".sc-submit");

  submitButton.addEventListener("click", () => {

    const typeSelected = widget.querySelector(".sc-type-btn.active").innerText;
    const email = widget.querySelector('input[type="email"]').value;
    const subject = widget.querySelectorAll(".sc-input")[1].value;
    const description = widget.querySelector(".sc-textarea").value;

    const ticketData = {
      workspaceKey,
      email,
      subject,
      description,
      type: typeSelected
    };

    console.log("Ticket data:", ticketData);
    alert("Ticket capturado (simulación Día 2)");

  });

})();