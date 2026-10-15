// ANGEL DRIS · Biblioteca de proyectos + revista editorial de Uruguay
// Para reemplazar páginas, cambiar los archivos NN.webp en MIS-IMAGENES/03-PROYECTOS/<carpeta>.
(() => {
  const root = document.getElementById('proyectos');
  if (!root) return;
  const base = 'MIS-IMAGENES/03-PROYECTOS/';
  const books = [
    {id:'granaderos', title:'Granaderos', pages:9, type:'landscape', category:'Diseño de espacios', description:'Renovación conceptual de fachada, vidrieras y señalética para Veterinaria Alem.'},
    {id:'ituzaingo', title:'Ituzaingó', pages:6, type:'landscape', category:'Diseño de espacios', description:'Actualización visual de fachada, identidad y vidrieras para una franquicia.'},
    {id:'jockey', title:'Paseo del Jockey', pages:12, type:'landscape', category:'Diseño de espacios', description:'Rediseño de fachada, interiores, distribución comercial y señalética.'},
    {id:'uruguay', title:'Revista Tu Mascota · Uruguay', pages:16, type:'portrait', category:'Diseño editorial y publicidad', description:'Piezas de comunicación y contenidos para la revista en Uruguay.'}
  ];
  const byId = Object.fromEntries(books.map(b=>[b.id,b]));
  const css = document.createElement('link');css.rel='stylesheet';css.href=base+'revistas.css';document.head.append(css);
  const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const src=(book,p)=>`${base}${book.id}/${String(p).padStart(2,'0')}.webp`;
  const smallCards=books.slice(0,3).map((book,i)=>`<button class="ad-card" data-book="${book.id}" type="button" aria-label="Abrir proyecto ${esc(book.title)}">
    <span class="ad-cover"><img src="${src(book,1)}" loading="lazy" alt="Portada del proyecto ${esc(book.title)}"><span class="ad-card-num">0${i+1}</span></span>
    <span class="ad-card-bottom"><span class="ad-meta">${esc(book.category)} · ${book.pages} páginas</span><span class="ad-name">${esc(book.title)}</span><span class="ad-desc">${esc(book.description)}</span><span class="ad-open">HOJEAR PROYECTO <span>↗</span></span></span></button>`).join('');
  root.classList.remove('reveal');root.classList.add('ad-projects-host');root.style.opacity='1';root.style.transform='none';
  root.innerHTML=`<div class="ad-projects">
    <div class="ad-head"><div><h2>MIS <em>PROYECTOS</em></h2></div><p class="ad-intro">Propuestas de identidad para espacios y comunicación editorial. Elegí un trabajo y hojeá sus páginas.</p></div>
    <div class="ad-cards">${smallCards}</div>
    <section class="ad-uruguay" aria-labelledby="ad-ur-title">
      <div class="ad-ur-copy">
        
        <h3 id="ad-ur-title">REVISTA<br><em>TU MASCOTA</em><span class="ad-ur-spark"></span></h3>
        <p class="ad-ur-sub">Diseño editorial que comunica y conecta.</p>
        <p>Desarrollé piezas gráficas y contenidos para comunicar las campañas, novedades y servicios de Veterinaria Alem en Uruguay.</p>
        <p>Cada propuesta combina información útil sobre el cuidado de las mascotas con promociones, concientización y comunicación de marca, adaptándose a las distintas temporadas del año.</p>
        <div class="ad-ur-tags"><span>APERTURAS</span><span>VACACIONES</span><span>PREVENCIÓN</span><span>CAMPAÑAS</span><span>ADOPCIONES</span></div>
        <button class="ad-ur-expand" data-book="uruguay" type="button">VER REVISTA EN GRANDE <span>↗</span></button>
        <span class="ad-ur-small">16 páginas de propuestas editoriales y publicitarias</span>
      </div>
      <div class="ad-ur-magazine">
        <div class="ad-inline-stage">
          <button class="ad-side-arrow ad-inline-prev" type="button" aria-label="Página anterior de revista Uruguay">‹</button>
          <div class="ad-book-frame ad-inline-frame ad-portrait" id="ad-inline-frame" aria-label="Revista Tu Mascota, Uruguay: hojear páginas">
            <div class="ad-page-under"><img id="ad-inline-under" alt=""></div><div class="ad-page-top"><img id="ad-inline-current" alt="Página de Revista Tu Mascota"></div>
          </div>
          <button class="ad-side-arrow ad-inline-next" type="button" aria-label="Página siguiente de revista Uruguay">›</button>
        </div>
        <div class="ad-ur-page-indicator"><span>DESLIZÁ O USÁ LAS FLECHAS</span><strong id="ad-inline-counter">01 / 16</strong></div>
      </div>
    </section>
  </div>`;

  const dialog=document.createElement('dialog');dialog.className='ad-reader';dialog.setAttribute('aria-label','Lector de revistas de proyectos');
  dialog.innerHTML=`<div class="ad-reader-shell"><div class="ad-reader-head"><span class="ad-reader-brand">ANGEL DRIS®</span><strong class="ad-reader-title" id="ad-reader-title"></strong><div class="ad-reader-tools"><button class="ad-icon-btn" id="ad-fullscreen" type="button" aria-label="Pantalla completa" title="Pantalla completa">⛶</button><button class="ad-icon-btn" id="ad-close" type="button" aria-label="Cerrar revista" title="Cerrar">×</button></div></div>
    <div class="ad-viewer"><div class="ad-reader-stage" id="ad-reader-stage">
      <button class="ad-side-arrow ad-modal-prev" id="ad-prev" type="button" aria-label="Página anterior" title="Retroceder">‹</button>
      <div class="ad-book-frame" id="ad-book-frame"><div class="ad-page-under"><img id="ad-under" alt=""></div><div class="ad-page-top"><img id="ad-current" alt="Página actual"></div></div>
      <button class="ad-side-arrow ad-modal-next" id="ad-next" type="button" aria-label="Página siguiente" title="Avanzar">›</button>
    </div></div>
    <div class="ad-reader-foot"><span class="ad-counter" id="ad-counter"></span><label class="ad-jump">IR A PÁGINA <input id="ad-slider" type="range" min="1" max="9" value="1" aria-label="Ir a página"></label></div>
    <div class="ad-reader-help">Flechas a los costados · Teclas ← → · Deslizá en el celular</div></div>`;
  document.body.append(dialog);
  const $=(q)=>dialog.querySelector(q);

  // Cada libro posee controles independientes (modal e incrustado al lado de la descripción).
  function makeReader({frame,current,under,prev,next,counter,slider}){
    let book=byId.uruguay,page=1,moving=false,turnTimer;
    const preload=n=>{if(n>=1&&n<=book.pages){const img=new Image();img.src=src(book,n)}};
    const paint=()=>{
      current.src=src(book,page);current.alt=`${book.title}: página ${page} de ${book.pages}`;
      under.src=src(book,Math.min(book.pages,page+1));
      counter.textContent=`${String(page).padStart(2,'0')} / ${String(book.pages).padStart(2,'0')}`;
      if(slider){slider.max=String(book.pages);slider.value=String(page)}
      prev.disabled=page===1||moving;next.disabled=page===book.pages||moving;
      preload(page+1);preload(page-1);
    };
    function setBook(which){if(turnTimer)clearTimeout(turnTimer);frame.querySelectorAll('.ad-flip-sheet').forEach(e=>e.remove());moving=false;book=which;page=1;frame.classList.toggle('ad-portrait',book.type==='portrait');frame.classList.remove('is-turning');paint()}
    function go(to){if(moving||to<1||to>book.pages||to===page)return;
      const from=page, direction=to>page?'next':'prev';
      if(Math.abs(to-page)>1||matchMedia('(prefers-reduced-motion: reduce)').matches){page=to;paint();return}
      moving=true;prev.disabled=true;next.disabled=true;under.src=src(book,to);frame.classList.add('is-turning');
      const sheet=document.createElement('div');sheet.className=`ad-flip-sheet go-${direction}`;
      const front=document.createElement('div');front.className='ad-flip-front';const image=document.createElement('img');image.src=src(book,from);image.alt='';front.append(image);
      const back=document.createElement('div');back.className='ad-flip-back';back.textContent='';sheet.append(front,back);frame.append(sheet);
      let complete=false;
      const finish=()=>{if(complete)return;complete=true;clearTimeout(turnTimer);sheet.remove();page=to;moving=false;frame.classList.remove('is-turning');paint()};
      sheet.addEventListener('animationend',finish,{once:true});turnTimer=setTimeout(finish,1050);
    }
    prev.addEventListener('click',()=>go(page-1));next.addEventListener('click',()=>go(page+1));
    if(slider)slider.addEventListener('input',e=>go(Number(e.target.value)));
    let gesture=null;
    frame.addEventListener('pointerdown',e=>{gesture={x:e.clientX,y:e.clientY}});
    frame.addEventListener('pointerup',e=>{if(!gesture)return;const dx=e.clientX-gesture.x,dy=e.clientY-gesture.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))go(page+(dx<0?1:-1));gesture=null});
    frame.addEventListener('pointercancel',()=>{gesture=null});
    setBook(book);
    return {setBook,go,getPage:()=>page};
  }
  const modalReader=makeReader({frame:$('#ad-book-frame'),current:$('#ad-current'),under:$('#ad-under'),prev:$('#ad-prev'),next:$('#ad-next'),counter:$('#ad-counter'),slider:$('#ad-slider')});
  const inlineReader=makeReader({frame:root.querySelector('#ad-inline-frame'),current:root.querySelector('#ad-inline-current'),under:root.querySelector('#ad-inline-under'),prev:root.querySelector('.ad-inline-prev'),next:root.querySelector('.ad-inline-next'),counter:root.querySelector('#ad-inline-counter')});
  function open(id){const book=byId[id];if(!book)return;modalReader.setBook(book);$('#ad-reader-title').textContent='PROYECTO / '+book.title.toUpperCase();dialog.classList.toggle('ad-is-portrait',book.type==='portrait');dialog.showModal()}
  root.querySelectorAll('[data-book]').forEach(el=>el.addEventListener('click',()=>open(el.dataset.book)));
  $('#ad-close').addEventListener('click',()=>dialog.close());
  $('#ad-fullscreen').addEventListener('click',()=>{if(document.fullscreenElement)document.exitFullscreen?.();else dialog.requestFullscreen?.().catch(()=>{})});
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  dialog.addEventListener('close',()=>{if(document.fullscreenElement)document.exitFullscreen?.()});
  document.addEventListener('keydown',e=>{if(!dialog.open)return;if(e.key==='ArrowRight'){e.preventDefault();modalReader.go(modalReader.getPage()+1)}else if(e.key==='ArrowLeft'){e.preventDefault();modalReader.go(modalReader.getPage()-1)}});
})();
