



//Card da ROLETA  cada serviço com mais fotos
const sections = [
    {
        name: 'Casamento',
        imgs: [
            'https://images.pexels.com/photos/265705/pexels-photo-265705.jpeg',
            'https://images.pexels.com/photos/313707/pexels-photo-313707.jpeg',
            'https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg'
        ],
        desc: 'Momentos eternos de amor e elegância.'
    },
    {
        name: 'Batismo',
        imgs: [
            'https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg',
            'https://images.pexels.com/photos/1353344/pexels-photo-1353344.jpeg',
            'https://images.pexels.com/photos/172018/pexels-photo-172018.jpeg'
        ],
        desc: 'Recordações sagradas e preciosas.'
    },
    {
        name: 'Celebração',
        imgs: [
            'https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg',
            'https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg',
            'https://images.pexels.com/photos/169193/pexels-photo-169193.jpeg'
        ],
        desc: 'Alegria e sorrisos inesquecíveis.'
    }
];

// Elementos
const titleEl = document.getElementById('title');
const descEl = document.getElementById('desc');
const carouselEl = document.getElementById('carouselServicos');
const innerEl = document.getElementById('carouselInner');
const indicatorsEl = document.getElementById('carouselIndicators');

// Constrói/Reinicia o carrossel com novas imagens
function buildCarousel(imgs) {
    // se já existir uma instância do Bootstrap, descarta
    const inst = bootstrap.Carousel.getInstance(carouselEl);
    if (inst) inst.dispose();

    innerEl.innerHTML = imgs.map((src, i) => `
      <div class="carousel-item ${i === 0 ? 'active' : ''}">
        <img src="${src}" class="d-block w-100" alt="Foto serviço ${i + 1}"
             style="height:320px; object-fit:cover;">
      </div>
    `).join('');

    indicatorsEl.innerHTML = imgs.map((_, i) => `
      <button type="button" data-bs-target="#carouselServicos" data-bs-slide-to="${i}"
              ${i === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Slide ${i + 1}"></button>
    `).join('');

    // cria nova instância (parado por padrão)
    new bootstrap.Carousel(carouselEl, { interval: 5000, ride: false });
}

// Atualiza card conforme setor ativo
function updateContent(index) {
    const s = sections[index];
    titleEl.textContent = s.name;
    descEl.textContent = s.desc;
    buildCarousel(s.imgs);   // <- chave para trocar as fotos
}

/* ---------------- ajuste ROLETA ---------------- */
const wheel = document.getElementById('wheel');
const nextBtn = document.getElementById('nextBtn');

const centers = [60, 180, 300]; // ângulos centrais de cada setor
let rotation = 0;
const wrap = (a) => ((a % 360) + 360) % 360;
function distToZero(a) { a = ((a + 180) % 360) - 180; return Math.abs(a); }
function activeIndex() {
    const angs = centers.map(c => wrap(c + rotation));
    let best = 0, d = 999;
    angs.forEach((ang, i) => { const k = distToZero(ang); if (k < d) { d = k; best = i; } });
    return best;
}
function snapTo(index) {
    const current = wrap(centers[index] + rotation);
    let delta = -current;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;
    rotation += delta;
    wheel.style.transition = 'transform .45s ease-out';
    wheel.style.transform = `rotate(${rotation}deg)`;
    updateContent(index); // atualiza título/desc + carrossel
}

nextBtn.addEventListener('click', () => {
    const i = (activeIndex() + 1) % sections.length;
    snapTo(i);
});

// drag
let dragging = false, startRot = 0, startAngle = 0;
function getCenter(el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
function angleFromCenter(e, el) {
    const p = (e.touches ? e.touches[0] : e);
    const c = getCenter(el);
    return Math.atan2(p.clientY - c.y, p.clientX - c.x) * 180 / Math.PI;
}
const onDown = (e) => { dragging = true; wheel.classList.add('dragging'); startRot = rotation; startAngle = angleFromCenter(e, wheel); e.preventDefault(); };
const onMove = (e) => { if (!dragging) return; const ang = angleFromCenter(e, wheel); rotation = startRot + (ang - startAngle); wheel.style.transform = `rotate(${rotation}deg)`; };
const onUp = () => { if (!dragging) return; dragging = false; wheel.classList.remove('dragging'); snapTo(activeIndex()); };

wheel.addEventListener('mousedown', onDown);
window.addEventListener('mousemove', onMove);
window.addEventListener('mouseup', onUp);
wheel.addEventListener('touchstart', onDown, { passive: false });
window.addEventListener('touchmove', onMove, { passive: false });
window.addEventListener('touchend', onUp);

// start
snapTo(0);

//HERO
const imagens = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
];

let index = 0;
const bg1 = document.querySelector(".hero-bg");
const bg2 = document.querySelector(".hero-bg.next");

bg1.style.backgroundImage = `url("${imagens[index]}")`;

setInterval(() => {
  index = (index + 1) % imagens.length;

  bg2.style.backgroundImage = `url("${imagens[index]}")`;
  bg2.style.opacity = 1;

  setTimeout(() => {
    bg1.style.backgroundImage = bg2.style.backgroundImage;
    bg2.style.opacity = 0;
  }, 1000); 
}, 5000);

// Testemunhos
const testimonials = [
    {
        text: "O ensaio superou todas as minhas expectativas! As fotos conseguiram transmitir exatamente o que eu sentia no momento. Foi uma experiência maravilhosa.",
        name: "Mariana Souza",
        role: "Noiva",
        img: "https://i.pravatar.cc/100?img=47"
    },
    {
        text: "Profissional excelente! O resultado das fotos foi impecável e cheio de emoção. Recomendo de olhos fechados!",
        name: "Carlos Almeida",
        role: "Empresário",
        img: "https://i.pravatar.cc/100?img=12"
    },
    {
        text: "As imagens ficaram simplesmente perfeitas! Conseguiu capturar a essência do evento de forma única.",
        name: "Fernanda Lima",
        role: "Mãe",
        img: "https://i.pravatar.cc/100?img=36"
    }
];

let currentIndex = 0;

function showTestimonial(index) {
    document.getElementById("testimonial-text").innerText = testimonials[index].text;
    document.getElementById("testimonial-name").innerText = testimonials[index].name;
    document.getElementById("testimonial-role").innerText = testimonials[index].role;
    document.getElementById("testimonial-img").src = testimonials[index].img;
}

function prevTestimonial() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentIndex);
}

function nextTestimonial() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
}

