function initTailwindUI() {
  const botaoMenu = document.querySelector('[data-menu-button]');
  const menu = document.querySelector('[data-menu]');
  if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', () => {
      const aberto = menu.classList.toggle('hidden') === false;
      botaoMenu.setAttribute('aria-expanded', String(aberto));
    });
  }

  const carrossel = document.querySelector('[data-carousel]');
  if (carrossel) {
    const slides = Array.from(carrossel.querySelectorAll('[data-slide]'));
    const dots = Array.from(carrossel.querySelectorAll('[data-dot]'));
    let atual = 0;

    const mostrar = indice => {
      if (!slides.length) return;
      atual = (indice + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('hidden', i !== atual));
      dots.forEach((dot, i) => {
        dot.classList.toggle('bg-slate-900', i === atual);
        dot.classList.toggle('bg-white/40', i !== atual);
      });
    };

    const anterior = carrossel.querySelector('[data-prev]');
    const proximo = carrossel.querySelector('[data-next]');
    if (anterior) anterior.addEventListener('click', () => mostrar(atual - 1));
    if (proximo) proximo.addEventListener('click', () => mostrar(atual + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => mostrar(i)));

    if (slides.length) {
      mostrar(0);
      setInterval(() => mostrar(atual + 1), 4000);
    }
  }

  const modal = document.querySelector('[data-modal]');
  if (modal) {
    const abrir = document.querySelector('[data-modal-open]');
    const fechar = () => modal.classList.add('hidden');
    if (abrir) abrir.addEventListener('click', () => modal.classList.remove('hidden'));
    modal.querySelectorAll('[data-modal-close]').forEach(b => b.addEventListener('click', fechar));
    modal.addEventListener('click', evento => {
      if (evento.target === modal) fechar();
    });
  }
}

window.initTailwindUI = initTailwindUI;
