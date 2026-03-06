/*
 SupCrud Widget
 Script embebible para integrar soporte PQRS en cualquier sitio web.

 Reglas importantes:
 - No depende de librerías externas
 - Encapsulado en IIFE
 - CSS inyectado dinámicamente
 - Compatible con cualquier sitio web
*/

(function () {

  "use strict";

  /*
  ===============================
  1. Obtener el script embebido
  ===============================
  */

  const currentScript = document.currentScript;

  if (!currentScript) {
    console.warn("SupCrud Widget: No se pudo detectar el script actual.");
    return;
  }

  /*
  ===============================
  2. Leer workspaceKey
  ===============================
  */

  const workspaceKey = currentScript.getAttribute("data-workspace");

  if (!workspaceKey) {
    console.warn("SupCrud Widget: data-workspace no definido.");
    return;
  }

  console.log("SupCrud Widget cargado para workspace:", workspaceKey);

  /*
  ===============================
  3. Crear contenedor raíz
  ===============================
  */

  const widgetRoot = document.createElement("div");
  widgetRoot.id = "sc-widget-root";

  document.body.appendChild(widgetRoot);

  /*
  ===============================
  4. Inyectar estilos base
  ===============================
  */

  const style = document.createElement("style");

  style.innerHTML = `
  
  #sc-widget-root {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999999;
    font-family: Arial, sans-serif;
  }

  .sc-button {
    background: #4A90D9;
    color: white;
    border: none;
    padding: 12px 16px;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-size: 14px;
  }

  `;

  document.head.appendChild(style);

  /*
  ===============================
  5. Crear botón flotante
  ===============================
  */

  const button = document.createElement("button");
  button.className = "sc-button";
  button.textContent = "Soporte";

  widgetRoot.appendChild(button);

  /*
  ===============================
  6. Evento click (placeholder)
  ===============================
  */

  button.addEventListener("click", function () {

    console.log("SupCrud Widget: botón clickeado");

    alert("SupCrud widget activo (skeleton D1)");

  });

})();