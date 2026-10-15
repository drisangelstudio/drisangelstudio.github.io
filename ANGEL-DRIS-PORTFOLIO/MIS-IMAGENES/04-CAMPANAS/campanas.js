// ANGEL DRIS · Galería de campañas promocionales. Las imágenes se cambian desde MIS-IMAGENES/04-CAMPANAS/.
(() => {
  const projects = document.getElementById('proyectos');
  if (!projects || document.getElementById('campanas')) return;
  const base = 'MIS-IMAGENES/04-CAMPANAS/';
  const slides = [
    {
      file: 'portada-halloween.png',
      title: 'Promos <em>de miedo.</em>',
      description: 'Portada general para una campaña temática de Halloween: concepto, ambientación y comunicación visual.',
      tag: 'PORTADA',
      alt: 'Portada de Promos de Miedo con un perro disfrazado de vampiro y descuento destacado.'
    },
    {
      file: 'promo-gati.png',
      title: 'Halloween <em>felino.</em>',
      description: 'Pieza individual para alimento Gati, integrada a la identidad visual de la campaña y al descuento comercial.',
      tag: 'PRODUCTO · GATI',
      alt: 'Promoción de alimento Gati con un gato disfrazado de bruja y precio destacado.'
    },
    {
      file: 'promo-nutrique.png',
      title: 'Promos para <em>ellos.</em>',
      description: 'Diseño de promoción para Nutrique, con ambientación de temporada y jerarquía de producto, precio y beneficio.',
      tag: 'PRODUCTO · NUTRIQUE',
      alt: 'Promoción de alimento Nutrique con un perro disfrazado de vampiro y precio destacado.'
    }
  ];
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = base + 'campanas.css';
  document.head.appendChild(stylesheet);

  const section = document.createElement('section');
  section.id = 'campanas';
  section.className = 'ad-campaigns';
  section.setAttribute('aria-labelledby','ac-section-title');
  section.innerHTML = `
    <div class="ac-shell">
      
      <div class="ac-headline">
        <h2 id="ac-section-title">PROMOS EN <em>MOVIMIENTO</em></h2>
        <p>Conceptos creativos que transforman descuentos y productos en campañas visuales con personalidad.</p>
      </div>
      <div class="ac-monitor-stage" aria-label="Computadora con galería interactiva de campañas promocionales">
        <div class="ac-monitor">
          <div class="ac-screen">
            <div class="ac-browser-bar" aria-hidden="true"><span class="ac-browser-dots"><i></i><i></i><i></i></span><strong>ANGEL DRIS / ARCHIVO DE CAMPAÑAS</strong><span class="ac-bar-right"></span></div>
            <div class="ac-monitor-content">
              <div class="ac-copy-panel">
                <span class="ac-copy-eyebrow">OCTUBRE · HALLOWEEN</span>
                <h3 class="ac-copy-title" id="ac-slide-title">Promos <em>de miedo.</em></h3>
                <p class="ac-copy-info" id="ac-slide-desc">Portada general para una campaña temática de Halloween: concepto, ambientación y comunicación visual.</p>
                <div class="ac-pill-line"><span>DISEÑO PUBLICITARIO</span><span>REDES SOCIALES</span></div>
                <span class="ac-slide-count"><b id="ac-current-num">01</b> / 03 · <span id="ac-slide-tag">PORTADA</span></span>
              </div>
              <div class="ac-poster-side">
                <span class="ac-poster-glow" aria-hidden="true"></span>
                <button class="ac-nav ac-nav-left" type="button" id="ac-prev" aria-label="Ver pieza anterior">‹</button>
                <img class="ac-poster-img" id="ac-poster-img" src="${base}${slides[0].file}" alt="${slides[0].alt}" />
                <button class="ac-nav ac-nav-right" type="button" id="ac-next" aria-label="Ver pieza siguiente">›</button>
              </div>
            </div>
            <div class="ac-monitor-foot"><span>CREATIVE CAMPAIGNS <em></em></span><span>2026 · PORTFOLIO</span></div>
          </div>
        </div>
        <div class="ac-monitor-neck" aria-hidden="true"></div><div class="ac-monitor-base" aria-hidden="true"></div>
      </div>
      <div class="ac-thumbs" id="ac-thumbs" aria-label="Elegir pieza promocional">
        ${slides.map((slide,i)=>`<button class="ac-thumb" type="button" data-campaign="${i}" aria-label="Ver pieza ${i+1}" aria-current="${i===0?'true':'false'}"><img src="${base}${slide.file}" alt="" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></button>`).join('')}
      </div>
      <div class="ac-final">
        <div class="ac-final-spark" aria-hidden="true"></div>
        <h3>Un concepto diferente<br>para cada mes.</h3>
        <p>Durante el año desarrollé campañas promocionales para Veterinaria Alem, adaptando colores, composiciones y recursos visuales a cada temática del calendario. Cada diseño buscó destacar productos, comunicar beneficios con claridad y mantener una identidad coherente en los distintos canales digitales.</p>
        <small>CAMPAÑAS MENSUALES · PROMOCIONES · CONTENIDO DIGITAL</small>
      </div>
    </div>`;
  projects.insertAdjacentElement('afterend',section);

  const image = section.querySelector('#ac-poster-img');
  const title = section.querySelector('#ac-slide-title');
  const description = section.querySelector('#ac-slide-desc');
  const number = section.querySelector('#ac-current-num');
  const tag = section.querySelector('#ac-slide-tag');
  const thumbs = [...section.querySelectorAll('[data-campaign]')];
  let current = 0, timer = null;

  function show(index) {
    const next=(index+slides.length)%slides.length;
    if(next===current) return;
    current=next;
    clearTimeout(timer);
    image.classList.add('is-switching');
    thumbs.forEach((el,i)=>el.setAttribute('aria-current',i===next?'true':'false'));
    const s=slides[current];
    timer = window.setTimeout(()=>{
      image.src=base+s.file;
      image.alt=s.alt;
      title.innerHTML=s.title;
      description.textContent=s.description;
      number.textContent=String(current+1).padStart(2,'0');
      tag.textContent=s.tag;
      image.classList.remove('is-switching');
    },200);
  }
  section.querySelector('#ac-prev').addEventListener('click',()=>show(current-1));
  section.querySelector('#ac-next').addEventListener('click',()=>show(current+1));
  thumbs.forEach(el=>el.addEventListener('click',()=>show(Number(el.dataset.campaign))));
  section.addEventListener('keydown', e=>{
    if(e.key==='ArrowLeft'){e.preventDefault();show(current-1)}
    if(e.key==='ArrowRight'){e.preventDefault();show(current+1)}
  });
  slides.slice(1).forEach(s=>{const pic=new Image();pic.src=base+s.file});
})();
