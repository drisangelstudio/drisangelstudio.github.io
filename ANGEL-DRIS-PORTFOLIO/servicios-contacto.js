/* SERVICIOS + CONTACTO | ANGEL DRIS
 * Antes de publicar, completar con el email profesional de contacto.
 * El formulario no envia datos a un servidor: prepara un correo en el cliente.
 */
const PORTFOLIO_CONTACT_EMAIL = ''; // Ej.: 'hola@tumarca.com' — dejar vacío hasta configurarlo.

(() => {
 const filterButtons = [...document.querySelectorAll('.svc-filter')];
 const cards = [...document.querySelectorAll('.svc-card')];
 filterButtons.forEach(button => button.addEventListener('click', () => {
  const current = button.dataset.filter;
  filterButtons.forEach(b => { const active = b === button; b.classList.toggle('is-active',active); b.setAttribute('aria-pressed',String(active)); });
  cards.forEach(card => {card.hidden = current !== 'Todos' && card.dataset.category !== current;});
 }));
 const contact = document.getElementById('contacto');
 const service = document.getElementById('contact-service');
 for (const button of document.querySelectorAll('[data-service]')){
  button.addEventListener('click',() => {
   if (service) service.value = button.dataset.service;
   if (service) service.removeAttribute('aria-invalid');
   contact?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  });
 }
 const form = document.getElementById('contact-form');
 const feedback = document.getElementById('contact-feedback');
 if (!form || !feedback) return;
 form.addEventListener('submit', (event) => {
  event.preventDefault();
  feedback.hidden=true;
  let firstInvalid=null;
  for (const input of form.querySelectorAll('[required]')) {
   const valid = input.checkValidity();
   input.setAttribute('aria-invalid',String(!valid));
   if (!valid && !firstInvalid) firstInvalid=input;
  }
  if (firstInvalid) {firstInvalid.focus();feedback.textContent='Revisá los campos obligatorios para preparar tu consulta.';feedback.hidden=false;return;}
  if(!PORTFOLIO_CONTACT_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(PORTFOLIO_CONTACT_EMAIL)) {
   feedback.textContent='Formulario de demostración: antes de publicar el sitio, agregá el email de contacto en servicios-contacto.js para recibir las consultas.';
   feedback.hidden=false;return;
  }
  const values = new FormData(form);
  const subject = 'Consulta desde mi portfolio — '+values.get('servicio');
  const message = `Hola, quisiera consultar por un proyecto.\n\nNombre: ${values.get('nombre')}\nEmail: ${values.get('email')}\nMarca: ${values.get('marca')||'—'}\nServicio: ${values.get('servicio')}\n\nProyecto:\n${values.get('mensaje')}\n`;
  window.location.href='mailto:'+PORTFOLIO_CONTACT_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(message);
  feedback.textContent='Se abrió tu aplicación de correo con la consulta preparada. Acordate de enviarla desde allí.';
  feedback.hidden=false;
 });
})();
