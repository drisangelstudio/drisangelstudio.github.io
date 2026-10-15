// Completar con los datos profesionales de Angel.
const CONTACT_LINKS = {linkedin: '', whatsapp: '', email: ''};
Object.entries(CONTACT_LINKS).forEach(([key,value])=>{const el=document.querySelector('[data-contact="'+key+'"]');if(!el||!value)return;el.href=key==='email'?'mailto:'+value:key==='whatsapp'?'https://wa.me/'+value.replace(/\D/g,''):value;el.removeAttribute('aria-disabled');if(key!=='email'){el.target='_blank';el.rel='noopener noreferrer';}});
