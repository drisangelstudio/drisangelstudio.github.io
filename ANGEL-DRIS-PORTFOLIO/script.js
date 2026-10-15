const roles=['DISEÑO GRÁFICO','BRANDING','MARKETING DIGITAL','UX/UI','CONTENIDO CREATIVO','DISEÑO EDITORIAL'];const roleNode=document.querySelector('#rotating-role');let roleIndex=0;setInterval(()=>{roleIndex=(roleIndex+1)%roles.length;if(roleNode)roleNode.textContent=roles[roleIndex]},2100);
const observer=new IntersectionObserver((entries)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));document.querySelector('#year').textContent=new Date().getFullYear();
const modal=document.querySelector('#folder-modal');const title=document.querySelector('#modal-title');const sub=document.querySelector('#modal-sub');const body=document.querySelector('#modal-body');const folderButtons=[...document.querySelectorAll('.folder')];function openCard(data){title.textContent=data.title;sub.textContent=data.sub;body.textContent=data.body;if(typeof modal.showModal==='function')modal.showModal();else modal.setAttribute('open','');}
folderButtons.forEach((folder,i)=>folder.addEventListener('click',()=>{folderButtons.forEach((other,j)=>{if(other!==folder){other.classList.remove('shift-left','shift-right');void other.offsetWidth;other.classList.add(j<i?'shift-left':'shift-right');setTimeout(()=>other.classList.remove('shift-left','shift-right'),530)}});openCard(folder.dataset)}));
document.querySelector('#work-open').addEventListener('click',()=>openCard({title:'Mi día a día',sub:'Experiencia + herramientas',body:'Trabajo con Illustrator, Photoshop, Canva, Figma, CapCut y herramientas de marketing digital como Odoo, Meta Business Suite y Tiendanube. Uso la computadora, auriculares, teléfono, micrófono y luces para diseñar, producir contenidos, coordinar campañas y dar vida a ideas para Argentina y Uruguay.'}));document.querySelector('#modal-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});

// Movimiento sutil de la foto al mover el mouse (solo dispositivos con mouse).
const photoStage=document.querySelector('#photo-stage');
if(photoStage && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches){
 photoStage.addEventListener('pointermove',(e)=>{const r=photoStage.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/r.width;const y=(e.clientY-r.top-r.height/2)/r.height;photoStage.style.setProperty('--px',`${(x*30).toFixed(1)}px`);photoStage.style.setProperty('--py',`${(y*30).toFixed(1)}px`)});
 photoStage.addEventListener('pointerleave',()=>{photoStage.style.setProperty('--px','0px');photoStage.style.setProperty('--py','0px')});
}




// Portada V5: los objetos salen desde dentro de la cartera cuando el cursor se acerca.
const bagScene=document.querySelector('#bag-scene');
const bagPhoto=document.querySelector('#hero-bag-photo');
if(bagScene && bagPhoto){
  let activated=false;
  const activateBag=()=>{if(activated) return; activated=true; bagScene.classList.add('active')};
  const resetBag=()=>{activated=false; bagScene.classList.remove('active')};

  const checkNearBag=(clientX,clientY)=>{
    const r=bagPhoto.getBoundingClientRect();
    const cx=r.left+r.width/2;
    const cy=r.top+r.height*0.45;
    const dx=clientX-cx;
    const dy=clientY-cy;
    const distance=Math.hypot(dx,dy);
    const radius=Math.max(r.width*0.52,220);
    if(distance < radius){
      bagScene.classList.add('is-hovering');
      activateBag();
    } else {
      bagScene.classList.remove('is-hovering');
      resetBag();
    }
  };

  if(matchMedia('(pointer:fine)').matches){
    bagScene.addEventListener('pointermove',(e)=>checkNearBag(e.clientX,e.clientY));
    bagScene.addEventListener('pointerleave',()=>{bagScene.classList.remove('is-hovering'); resetBag();});
  }

  bagPhoto.addEventListener('mouseenter',()=>{bagScene.classList.add('is-hovering'); activateBag()});
}


// Swipe up / wheel down cue from portada to Sobre mí.
const heroSection=document.querySelector('#inicio');
const aboutSection=document.querySelector('#sobre-mi');
let heroWheelLock=false;
if(heroSection && aboutSection && matchMedia('(pointer:fine)').matches){
  heroSection.addEventListener('wheel',(e)=>{
    if(window.scrollY < heroSection.offsetTop + 60 && e.deltaY > 18 && !heroWheelLock){
      heroWheelLock=true;
      e.preventDefault();
      aboutSection.scrollIntoView({behavior:'smooth', block:'start'});
      setTimeout(()=>heroWheelLock=false, 900);
    }
  }, {passive:false});
}
