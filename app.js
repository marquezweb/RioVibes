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
    t('Hola Rio Vibes Tour, quiero solicitar una cotización.'),
    `${t('Tipo')}: ${t(type)}`,
    `${t('Nombre')}: ${name}`,
    `${t('Mi WhatsApp')}: ${phone}`,
    people && `${t('Personas')}: ${people}`,
    dates && `${t('Fechas tentativas')}: ${dates}`,
    message && `${t('Mensaje')}: ${message}`,
  ].filter(Boolean);

  const url = `https://wa.me/5521997086432?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
  const feedback = document.querySelector('#form-feedback');
  feedback.textContent = t('Se abrió WhatsApp con tu consulta lista para enviar.');
  feedback.classList.remove('hidden');
});

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!newsletterForm.reportValidity()) return;
  const email = document.querySelector('#newsletter-email').value.trim();
  const subject = encodeURIComponent(t('Suscripción a novedades de Rio Vibes Tour'));
  const body = encodeURIComponent(`${t('Hola Rio Vibes Tour, quiero recibir novedades y promociones en')} ${email}.`);
  window.location.href = `mailto:vendas@riovibestour.com?subject=${subject}&body=${body}`;
  const feedback = document.querySelector('#newsletter-feedback');
  feedback.dataset.submitted = 'true';
  feedback.textContent = t('Se abrió tu correo con la solicitud lista para enviar.');
});

// Keep the Spanish HTML as the source of truth and translate only its text nodes.
const ptBR = {
  'Rio Vibes Tour | Experiencias en Río de Janeiro': 'Rio Vibes Tour | Experiências no Rio de Janeiro',
  'Experiencias, paseos y traslados a medida en Río de Janeiro con Rio Vibes Tour.': 'Experiências, passeios e traslados sob medida no Rio de Janeiro com a Rio Vibes Tour.',
  'Inicio': 'Início',
  'INICIO': 'INÍCIO',
  'EXPERIENCIAS': 'EXPERIÊNCIAS',
  'TRASLADOS': 'TRASLADOS',
  'SOBRE NOSOTROS': 'SOBRE NÓS',
  'CONTACTO': 'CONTATO',
  'Paseos y Experiencias': 'Passeios e Experiências',
  'Traslados | Aeropuertos': 'Traslados | Aeroportos',
  'Sobre Nosotros': 'Sobre Nós',
  'Contacto': 'Contato',
  'Consultá ahora': 'Consulte agora',
  'Viví experiencias': 'Viva experiências',
  'que te transforman': 'que te transformam',
  'Rio de Janeiro no es un destino, es una experiencia que diseñamos a medida.': 'O Rio de Janeiro não é um destino, é uma experiência que criamos sob medida.',
  'Explorar experiencias': 'Explorar experiências',
  'Curaduría de Excelencia': 'Curadoria de excelência',
  'Experiencias destacadas': 'Experiências em destaque',
  'Descubrí lugares, actividades y momentos inolvidables, seleccionados para que disfrutes Río de Janeiro de una manera diferente.': 'Descubra lugares, atividades e momentos inesquecíveis, selecionados para você viver o Rio de Janeiro de uma forma diferente.',
  'Ver catálogo completo': 'Ver catálogo completo',
  'Incluye Cristo y Pan de Azúcar': 'Inclui Cristo Redentor e Pão de Açúcar',
  'Incluye Paseo en Barco': 'Inclui passeio de barco',
  'Incluye Ilha Grande': 'Inclui Ilha Grande',
  'Incluye Traslado y Guía': 'Inclui traslado e guia',
  'Día completo': 'Dia inteiro',
  'Medio día': 'Meio dia',
  'UN DÍA EN RÍO': 'UM DIA NO RIO',
  'City Rio de Janeiro • Pan de Azúcar • Escaleras Selarón • Maracaná.': 'City tour pelo Rio de Janeiro • Pão de Açúcar • Escadaria Selarón • Maracanã.',
  'Alojamiento': 'Hospedagem',
  'Traslados': 'Traslados',
  'Comidas': 'Refeições',
  'Precio final': 'Preço final',
  'Desde $99': 'A partir de $99',
  'Desde $55': 'A partir de $55',
  'Desde $50': 'A partir de $50',
  'Ver detalles': 'Ver detalhes',
  'Caribe Brasileño': 'Caribe brasileiro',
  'Paseo en barco • Navegación • Tiempo libre en las playas • Baño de mar.': 'Passeio de barco • Navegação • Tempo livre nas praias • Banho de mar.',
  'Navegación Islas Exclusivas': 'Navegação por ilhas exclusivas',
  'Paseo en barco por la bahía de Angra dos Reis e Ilha Grande • Almuerzo buffet • Guía bilingüe.': 'Passeio de barco pela baía de Angra dos Reis e Ilha Grande • Almoço buffet • Guia bilíngue.',
  'Almuerzo': 'Almoço',
  'Inmersión Cultural Auténtica': 'Imersão cultural autêntica',
  'Guía bilingüe • Visita guiada por la favela Rocinha • Miradores panorámicos • Traslados ida y vuelta.': 'Guia bilíngue • Visita guiada pela favela da Rocinha • Mirantes panorâmicos • Traslados de ida e volta.',
  'Península Encantadora': 'Península encantadora',
  'Traslado desde el alojamiento • Guía Bilingüe • Almuerzo Buffet • Paseo en Barco.': 'Traslado desde a hospedagem • Guia bilíngue • Almoço buffet • Passeio de barco.',
  'Llegá con tranquilidad': 'Chegue com tranquilidade',
  'Traslados privados para llegar a Río y moverte con comodidad y atención personalizada.': 'Traslados privativos para chegar ao Rio e circular com conforto e atendimento personalizado.',
  'Traslado privado desde Galeão': 'Traslado privativo a partir do Galeão',
  'Llegá a tu alojamiento con un conductor privado y un traslado cómodo desde el aeropuerto.': 'Chegue à sua hospedagem com motorista particular e um traslado confortável desde o aeroporto.',
  'Desde': 'A partir de',
  'Consultar traslado': 'Consultar traslado',
  'Traslado privado aeropuerto–hotel': 'Traslado privativo aeroporto–hotel',
  'Coordiná tu traslado entre el aeropuerto y el hotel con atención personalizada.': 'Organize seu traslado entre o aeroporto e o hotel com atendimento personalizado.',
  '¿Qué ofrecemos?': 'O que oferecemos?',
  'Tus Especialistas en Rio de Janeiro.': 'Seus especialistas no Rio de Janeiro.',
  'Más que un viaje, una experiencia.': 'Mais do que uma viagem, uma experiência.',
  'Diseñamos logística sin fisuras y momentos cautivantes en cada punto cardinal de la Ciudad Maravillosa. Nuestro equipo combina la calidez carioca con el estándar de hospitalidad internacional.': 'Planejamos uma logística impecável e momentos marcantes em todos os cantos da Cidade Maravilhosa. Nossa equipe combina o acolhimento carioca com padrões internacionais de hospitalidade.',
  'Traslados cómodos y seguros desde y hacia los principales aeropuertos y destinos.': 'Traslados confortáveis e seguros de e para os principais aeroportos e destinos.',
  'Las mejores opciones en hoteles, posadas y resorts en los destinos más increíbles.': 'As melhores opções de hotéis, pousadas e resorts nos destinos mais incríveis.',
  'Excursiones imperdibles con guías especializados para que vivas lo mejor de cada lugar.': 'Excursões imperdíveis com guias especializados para você aproveitar o melhor de cada lugar.',
  'Experiencias Exclusivas': 'Experiências exclusivas',
  'Actividades únicas y momentos especiales diseñados para transformar tu viaje.': 'Atividades únicas e momentos especiais criados para transformar sua viagem.',
  'Valores': 'Valores',
  '¿Por qué elegirnos?': 'Por que nos escolher?',
  'Estándares rigurosos que marcan la diferencia entre un traslado común y una vivencia sublime.': 'Padrões rigorosos que fazem a diferença entre um traslado comum e uma experiência excepcional.',
  'Calidad': 'Qualidade',
  'Proveedores seleccionados para garantizar servicios confiables y de alto nivel.': 'Fornecedores selecionados para garantir serviços confiáveis e de alto padrão.',
  'Seriedad': 'Seriedade',
  'Cumplimos cada compromiso con responsabilidad, transparencia y profesionalismo.': 'Cumprimos cada compromisso com responsabilidade, transparência e profissionalismo.',
  'Experiencia': 'Experiência',
  'Años de trayectoria asesorando viajeros y creando experiencias memorables.': 'Anos de experiência orientando viajantes e criando momentos memoráveis.',
  'Tarifas exclusivas': 'Tarifas exclusivas',
  'Precios competitivos y beneficios especiales gracias a acuerdos con prestadores.': 'Preços competitivos e benefícios especiais graças a acordos com fornecedores.',
  'Servicio 24 hs': 'Atendimento 24 h',
  'Acompañamiento constante durante todo tu viaje para que solo te enfoques en disfrutar.': 'Acompanhamento constante durante toda a viagem para que você só precise aproveitar.',
  'Confianza': 'Confiança',
  'Brindamos atención cercana y asesoramiento claro en cada etapa del viaje.': 'Oferecemos atendimento próximo e orientação clara em cada etapa da viagem.',
  'Nuestra historia': 'Nossa história',
  '“Somos una Compañía de Gestión de Destinos (DMC), somos un proveedor de servicios profesionales que diseñamos, organizamos y gestionamos experiencias de viaje y eventos en Rio de Janeiro, Angra, Cabo Frío, Arraial y Búzios, ofreciendo nuestra experiencia de local y brindamos el soporte logístico completo.”': '“Somos uma Empresa de Gestão de Destinos (DMC), fornecedora de serviços profissionais que planeja, organiza e gerencia experiências de viagem e eventos no Rio de Janeiro, Angra, Cabo Frio, Arraial e Búzios, unindo nosso conhecimento local a um suporte logístico completo.”',
  'Sede Principal': 'Sede principal',
  'Región Lagos': 'Região dos Lagos',
  'Contactanos hoy': 'Entre em contato',
  'Respondemos a la brevedad dentro de nuestro horario de atención.': 'Respondemos o mais breve possível durante nosso horário de atendimento.',
  '¿Qué querés cotizar?': 'O que você deseja cotar?',
  'Paquete': 'Pacote',
  'Destino': 'Destino',
  'Traslado': 'Traslado',
  'Asistencia': 'Assistência',
  'Otro': 'Outro',
  'Nombre': 'Nome',
  'Cantidad de personas': 'Número de pessoas',
  'Fechas tentativas': 'Datas estimadas',
  'Mensaje (opcional)': 'Mensagem (opcional)',
  'Quiero que me contacten': 'Quero receber contato',
  'Se abrió WhatsApp con tu consulta lista para enviar.': 'O WhatsApp foi aberto com sua mensagem pronta para enviar.',
  'Canal Directo': 'Canal direto',
  'Chatear por WhatsApp': 'Conversar pelo WhatsApp',
  'Atención personalizada': 'Atendimento personalizado',
  'Te acompañamos antes, durante y después de tu viaje.': 'Acompanhamos você antes, durante e depois da viagem.',
  'Respuesta rápida': 'Resposta rápida',
  'Respondemos a la brevedad en nuestro horario de atención.': 'Respondemos o mais breve possível durante nosso horário de atendimento.',
  'Asesoramiento en cada etapa': 'Orientação em cada etapa',
  'Te ayudamos a planificar la mejor experiencia.': 'Ajudamos você a planejar a melhor experiência.',
  'Dirección': 'Endereço',
  'WhatsApp Directo': 'WhatsApp direto',
  'Horario de atención': 'Horário de atendimento',
  'Lunes a Lunes de 7.00 hs a 21.00 hs (BRT)': 'Todos os dias, das 7h às 21h (BRT)',
  'Nuestra ubicación': 'Nossa localização',
  'Av. Atlântica, 3264 · Río de Janeiro': 'Av. Atlântica, 3264 · Rio de Janeiro',
  'Abrir en Google Maps': 'Abrir no Google Maps',
  'Novedades Exclusivas': 'Novidades exclusivas',
  'Mantenete informado sobre nuestras últimas ofertas': 'Acompanhe nossas últimas ofertas',
  'Recibí novedades y promociones exclusivas directamente en tu casilla.': 'Receba novidades e promoções exclusivas diretamente no seu e-mail.',
  'Suscríbete': 'Inscreva-se',
  'No compartimos tu información. Podés desuscribirte en cualquier momento.': 'Não compartilhamos seus dados. Você pode cancelar a inscrição quando quiser.',
  'Se abrió tu correo con la solicitud lista para enviar.': 'Seu e-mail foi aberto com a solicitação pronta para enviar.',
  'Navegación': 'Navegação',
  'Atención DMC': 'Atendimento DMC',
  'Lunes a Lunes': 'Todos os dias',
  '07:00 a 21:00 hs (BRT)': '7h às 21h (BRT)',
  'Concierge & Asistencia 24/7 en destino': 'Concierge e assistência 24/7 no destino',
  'Canales Oficiales': 'Canais oficiais',
  'Operador de Experiencias Turísticas y Receptivo de Lujo en Brasil y Caribe. Curaduría personalizada para viajeros exigentes y agencias globales.': 'Operadora de experiências turísticas e receptivo de luxo no Brasil e no Caribe. Curadoria personalizada para viajantes exigentes e agências globais.',
  '“Rio de Janeiro no es un destino, es una experiencia que diseñamos a medida.”': '“O Rio de Janeiro não é um destino, é uma experiência que criamos sob medida.”',
  '© 2026 Rio Vibes Tour. Todos los derechos reservados.': '© 2026 Rio Vibes Tour. Todos os direitos reservados.',
  'Rio de Janeiro • Caribe': 'Rio de Janeiro • Caribe',
  'Detallanos tus deseos o consultas especiales...': 'Conte seus desejos ou dúvidas especiais...',
  'Ej. 2 personas': 'Ex.: 2 pessoas',
  'Ej. Noviembre 2026 / 7 días': 'Ex.: novembro de 2026 / 7 dias',
  'Tu nombre completo': 'Seu nome completo',
  'Tu correo electrónico': 'Seu e-mail',
  'Abrir menú': 'Abrir menu',
  'Navegación mobile': 'Navegação móvel',
  'Rio Vibes Tour — Inicio': 'Rio Vibes Tour — Início',
  'Consultar por WhatsApp': 'Consultar pelo WhatsApp',
  'Mapa de Rio Othon Palace en Copacabana, Río de Janeiro': 'Mapa do Rio Othon Palace em Copacabana, Rio de Janeiro',
  'Vista del Cristo Redentor, el Pan de Azúcar y la bahía de Río de Janeiro': 'Vista do Cristo Redentor, do Pão de Açúcar e da baía do Rio de Janeiro',
  'Formación rocosa y mar azul en Arraial do Cabo': 'Formação rochosa e mar azul em Arraial do Cabo',
  'Barco de paseo junto a una isla en las aguas de Angra dos Reis': 'Barco de passeio próximo a uma ilha em Angra dos Reis',
  'Casas iluminadas de la favela Rocinha al anochecer': 'Casas iluminadas da favela da Rocinha ao anoitecer',
  'Puerto de Búzios con barcos y casas junto al mar': 'Porto de Búzios com barcos e casas à beira-mar',
  'Viajera con equipaje frente a una terminal de aeropuerto': 'Viajante com bagagem em frente a um terminal de aeroporto',
  'Van de pasajeros con la puerta lateral abierta': 'Van de passageiros com a porta lateral aberta',
  'Vista de la playa de Copacabana y la avenida Atlântica en Río de Janeiro': 'Vista da praia de Copacabana e da Avenida Atlântica no Rio de Janeiro',
  'Hola Rio Vibes Tour, quiero solicitar una cotización.': 'Olá Rio Vibes Tour, gostaria de solicitar um orçamento.',
  'Tipo': 'Tipo',
  'Mi WhatsApp': 'Meu WhatsApp',
  'Personas': 'Pessoas',
  'Mensaje': 'Mensagem',
  'Suscripción a novedades de Rio Vibes Tour': 'Inscrição para novidades da Rio Vibes Tour',
  'Hola Rio Vibes Tour, quiero recibir novedades y promociones en': 'Olá Rio Vibes Tour, quero receber novidades e promoções em',
};

const ptBRWhatsAppMessages = {
  'Hola, quiero planificar mi viaje a Río de Janeiro. ¿Podrían asesorarme?': 'Olá, quero planejar minha viagem ao Rio de Janeiro. Poderiam me orientar?',
  'Hola, vi Rio Vibes Tour y quisiera asesoramiento para organizar mi viaje a Río de Janeiro.': 'Olá, conheci a Rio Vibes Tour e gostaria de orientação para organizar minha viagem ao Rio de Janeiro.',
  'Hola, me gustaría recibir el catálogo completo de experiencias de Rio Vibes Tour.': 'Olá, gostaria de receber o catálogo completo de experiências da Rio Vibes Tour.',
  'Hola, me interesa la experiencia Un día en Río. ¿Podrían contarme disponibilidad y precio?': 'Olá, tenho interesse na experiência Um dia no Rio. Poderiam informar disponibilidade e preço?',
  'Hola, me interesa la excursión a Arraial do Cabo. ¿Podrían contarme disponibilidad y precio?': 'Olá, tenho interesse na excursão a Arraial do Cabo. Poderiam informar disponibilidade e preço?',
  'Hola, me interesa el paseo a Angra dos Reis e Ilha Grande. ¿Podrían contarme disponibilidad y precio?': 'Olá, tenho interesse no passeio a Angra dos Reis e Ilha Grande. Poderiam informar disponibilidade e preço?',
  'Hola, me interesa la visita guiada a la favela Rocinha. ¿Podrían contarme disponibilidad y precio?': 'Olá, tenho interesse na visita guiada à favela da Rocinha. Poderiam informar disponibilidade e preço?',
  'Hola, me interesa la excursión a Búzios. ¿Podrían contarme disponibilidad y precio?': 'Olá, tenho interesse na excursão a Búzios. Poderiam informar disponibilidade e preço?',
  'Hola, necesito un traslado privado desde el aeropuerto Galeão (GIG). ¿Podrían cotizarlo para mis fechas?': 'Olá, preciso de um traslado privativo saindo do Aeroporto do Galeão (GIG). Poderiam fazer um orçamento para minhas datas?',
  'Hola, necesito un traslado privado entre el aeropuerto y mi hotel en Río de Janeiro. ¿Podrían cotizarlo?': 'Olá, preciso de um traslado privativo entre o aeroporto e meu hotel no Rio de Janeiro. Poderiam enviar um orçamento?',
  'Hola, quisiera hablar con un asesor de Rio Vibes Tour sobre mi viaje.': 'Olá, gostaria de falar com um consultor da Rio Vibes Tour sobre minha viagem.',
  'Hola, tengo una consulta sobre los servicios de Rio Vibes Tour.': 'Olá, tenho uma dúvida sobre os serviços da Rio Vibes Tour.',
  'Hola, quisiera conocer las experiencias y traslados de Rio Vibes Tour.': 'Olá, gostaria de conhecer as experiências e os traslados da Rio Vibes Tour.',
  'Hola, estoy visitando la web de Rio Vibes Tour y quisiera asesoramiento para mi viaje.': 'Olá, estou visitando o site da Rio Vibes Tour e gostaria de orientação para minha viagem.',
};

let activeLanguage = 'es';
const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
function t(spanish) {
  return activeLanguage === 'pt-BR' ? (ptBR[spanish] ?? spanish) : spanish;
}

const textRecords = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    if (!parent || !node.nodeValue.trim() || parent.closest('script, style, svg, .material-symbols-outlined, .language-switcher, #form-feedback, #newsletter-feedback')) return NodeFilter.FILTER_REJECT;
    return Object.prototype.hasOwnProperty.call(ptBR, normalizeText(node.nodeValue)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  },
});
let textNode;
while ((textNode = walker.nextNode())) {
  textRecords.push({ node: textNode, original: textNode.nodeValue, key: normalizeText(textNode.nodeValue) });
}

const attributeRecords = [];
document.querySelectorAll('[placeholder], [aria-label], [alt], [title]').forEach((element) => {
  ['placeholder', 'aria-label', 'alt', 'title'].forEach((attribute) => {
    const original = element.getAttribute(attribute);
    if (original && Object.prototype.hasOwnProperty.call(ptBR, original)) attributeRecords.push({ element, attribute, original });
  });
});
const originalTitle = document.title;
const descriptionMeta = document.querySelector('meta[name="description"]');
const originalDescription = descriptionMeta?.content;
const mapFrame = document.querySelector('.location-map-frame');
const originalMapUrl = mapFrame?.getAttribute('src');
const whatsappLinks = [...document.querySelectorAll('a[href^="https://wa.me/"][href*="?text="]')].map((element) => ({
  element,
  original: element.getAttribute('href'),
}));

function setLanguage(language) {
  activeLanguage = language;
  document.documentElement.lang = language;
  textRecords.forEach(({ node, original, key }) => {
    if (language === 'es') {
      node.nodeValue = original;
    } else {
      node.nodeValue = original.match(/^\s*/)[0] + ptBR[key] + original.match(/\s*$/)[0];
    }
  });
  attributeRecords.forEach(({ element, attribute, original }) => element.setAttribute(attribute, t(original)));
  document.title = t(originalTitle);
  if (descriptionMeta) descriptionMeta.content = t(originalDescription);
  if (mapFrame && originalMapUrl) {
    const mapUrl = new URL(originalMapUrl, window.location.href);
    mapUrl.searchParams.set('hl', language);
    if (mapFrame.src !== mapUrl.href) mapFrame.src = mapUrl.href;
  }
  whatsappLinks.forEach(({ element, original }) => {
    if (language === 'es') {
      element.setAttribute('href', original);
    } else {
      const url = new URL(original);
      const message = url.searchParams.get('text');
      url.searchParams.set('text', ptBRWhatsAppMessages[message] ?? message);
      element.setAttribute('href', url.href);
    }
  });
  const quoteFeedback = document.querySelector('#form-feedback');
  const newsletterFeedback = document.querySelector('#newsletter-feedback');
  if (quoteFeedback) quoteFeedback.textContent = t('Se abrió WhatsApp con tu consulta lista para enviar.');
  if (newsletterFeedback) newsletterFeedback.textContent = t(newsletterFeedback.dataset.submitted === 'true'
    ? 'Se abrió tu correo con la solicitud lista para enviar.'
    : 'No compartimos tu información. Podés desuscribirte en cualquier momento.');
  document.querySelectorAll('.language-switcher button[data-language]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
}

document.querySelector('.language-switcher')?.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-language]');
  if (button && button.dataset.language !== activeLanguage) setLanguage(button.dataset.language);
});
