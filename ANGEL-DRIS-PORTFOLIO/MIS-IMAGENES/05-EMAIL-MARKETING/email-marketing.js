// 06 / Email Marketing · Uruguay · portfolio Angel Dris
(() => {
  const trigger = document.querySelector('#em-expand');
  const dialog = document.querySelector('#em-dialog');
  const close = document.querySelector('#em-close');
  if (!trigger || !dialog || !close) return;
  trigger.addEventListener('click', () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  });
  close.addEventListener('click', () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  });
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
})();
