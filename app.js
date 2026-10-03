const quoteForm = document.querySelector('#quote-form');
const newsletterForm = document.querySelector('#newsletter-form');
const menuButton = document.querySelector('#menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const heroSlides = [...document.querySelectorAll('#inicio .hero-slide')];

if (heroSlides.length > 1 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let currentSlide = 0;
  let slideTimer;
  const advanceSlide = () => {
    const nextSlide = (currentSlide + 1) % heroSlides.length;
    if (!heroSlides[nextSlide].querySelector('img').naturalWidth) return;
    heroSlides[currentSlide].classList.remove('is-active');
    heroSlides[nextSlide].classList.add('is-active');
    currentSlide = nextSlide;
  };
  const startSlides = () => { slideTimer = window.setInterval(advanceSlide, 7000); };
  startSlides();
  document.addEventListener('visibilitychange', () => {
    window.clearInterval(slideTimer);
    if (!document.hidden) startSlides();
  });
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  mobileNav.hidden = !open;
});

mobileNav?.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    mobileNav.hidden = true;
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileNav && !mobileNav.hidden) {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});

quoteForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;

  const name = document.querySelector('#form-name').value.trim();
  const phone = document.querySelector('#form-whatsapp').value.trim();
  const people = document.querySelector('#form-personas').value.trim();
  const dates = document.querySelector('#form-dates').value.trim();
  const message = document.querySelector('#form-message').value.trim();
  const type = quoteForm.querySelector('[name="tipo_cotizacion"]:checked').value;

  const lines = [
    'Hola Rio Vibes Tour, quiero solicitar una cotización.',
    `Tipo: ${type}`,
    `Nombre: ${name}`,
    `Mi WhatsApp: ${phone}`,
    people && `Personas: ${people}`,
    dates && `Fechas tentativas: ${dates}`,
    message && `Mensaje: ${message}`,
  ].filter(Boolean);

  const url = `https://wa.me/5521997086432?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  const feedback = document.querySelector('#form-feedback');
  feedback.textContent = 'Se abrió WhatsApp con tu consulta lista para enviar.';
  feedback.classList.remove('hidden');
});

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!newsletterForm.reportValidity()) return;
  const email = document.querySelector('#newsletter-email').value.trim();
  const subject = encodeURIComponent('Suscripción a novedades de Rio Vibes Tour');
  const body = encodeURIComponent(`Hola Rio Vibes Tour, quiero recibir novedades y promociones en ${email}.`);
  window.location.href = `mailto:vendas@riovibestour.com?subject=${subject}&body=${body}`;
  document.querySelector('#newsletter-feedback').textContent = 'Se abrió tu correo con la solicitud lista para enviar.';
});
