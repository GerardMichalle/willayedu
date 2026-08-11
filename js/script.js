
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, {passive:true});

  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  }));

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0, rootMargin:'0px 0px 300px 0px'});
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    io.observe(el);
  });


  const DEMO_FORM_ENDPOINT = 'https://formsubmit.co/ajax/hola@willay.pe';
  const form = document.getElementById('demo-form');
  const requiredFields = [...form.querySelectorAll('input[required], textarea[required]')];
  const submitBtn = document.getElementById('demo-submit');
  const formError = document.getElementById('form-error');
  form.noValidate = true;

  const validateField = (field) => {
    const valid = field.checkValidity();
    field.classList.toggle('invalid', !valid);
    field.classList.toggle('valid', valid);
    return valid;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    formError.classList.remove('show');

    const invalidFields = requiredFields.filter((field) => !validateField(field));
    if (invalidFields.length) {
      invalidFields[0].focus();
      return;
    }

    // honeypot: si un bot llenó este campo oculto, fingimos éxito y no enviamos nada
    if (form.querySelector('[name="_honey"]').value) {
      document.getElementById('form-fields').style.display = 'none';
      document.getElementById('form-ok').classList.add('show');
      return;
    }

    const payload = {
      colegio: form.colegio.value.trim(),
      contacto: form.contacto.value.trim(),
      correo: form.correo.value.trim(),
      celular: form.celular.value.trim(),
      mensaje: form.mensaje.value.trim(),
      _subject: 'Nueva solicitud de demo — Willay',
      _template: 'table',
      _captcha: 'false'
    };

    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    try {
      const res = await fetch(DEMO_FORM_ENDPOINT, {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('request failed');
      document.getElementById('form-fields').style.display = 'none';
      document.getElementById('form-ok').classList.add('show');
    } catch (err) {
      formError.classList.add('show');
      submitBtn.disabled = false;
      submitBtn.textContent = 'Solicitar demo';
    }
  });

  requiredFields.forEach((field) => {
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validateField(field);
    });
  });

  
  const navBySection = {};
  document.querySelectorAll('#nav-links a[data-nav]').forEach((a) => {
    navBySection[a.getAttribute('data-nav')] = a;
  });
  const spySections = Object.keys(navBySection)
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const spyIo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        Object.values(navBySection).forEach((a) => a.classList.remove('active'));
        const link = navBySection[entry.target.id];
        if (link) link.classList.add('active');
      }
    });
  }, {rootMargin:'-50% 0px -45% 0px'});
  spySections.forEach((section) => spyIo.observe(section));


  const topBtn = document.getElementById('top-btn');
  window.addEventListener('scroll', () => {
    topBtn.classList.toggle('show', window.scrollY > 600);
  }, {passive:true});
  topBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });

  // WhatsApp chat widget
  const WHATSAPP_NUMBER = '51987654321';
  const waToggle = document.getElementById('wa-toggle');
  const waChat = document.getElementById('wa-chat');
  const waClose = document.getElementById('wa-chat-close');
  const waForm = document.getElementById('wa-chat-form');
  const waNombre = document.getElementById('wa-nombre');

  const openWaChat = () => {
    waChat.classList.add('open');
    waToggle.classList.add('open');
    waToggle.setAttribute('aria-expanded', 'true');
    waChat.setAttribute('aria-hidden', 'false');
    waNombre.focus();
  };
  const closeWaChat = () => {
    waChat.classList.remove('open');
    waToggle.classList.remove('open');
    waToggle.setAttribute('aria-expanded', 'false');
    waChat.setAttribute('aria-hidden', 'true');
  };

  waToggle.addEventListener('click', () => {
    waChat.classList.contains('open') ? closeWaChat() : openWaChat();
  });
  waClose.addEventListener('click', closeWaChat);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && waChat.classList.contains('open')) closeWaChat();
  });
  document.addEventListener('click', (e) => {
    if (!waChat.classList.contains('open')) return;
    if (waChat.contains(e.target) || waToggle.contains(e.target)) return;
    closeWaChat();
  });

  waForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = waNombre.value.trim();
    const colegio = document.getElementById('wa-colegio').value.trim();
    const mensaje = document.getElementById('wa-mensaje').value.trim();
    let text = `Hola, soy ${nombre} de ${colegio}.`;
    text += mensaje ? ` ${mensaje}` : ' Quiero conocer más sobre Willay.';
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    waForm.reset();
    closeWaChat();
  });

  // ---------- Mapa "Dónde estamos" ----------
  // El mapa es la foto assets/imgs/peru.jpg (1101x1429px). Cada sede se ubica con xPercent/yPercent,
  // el porcentaje de esa posición respecto al ancho y alto totales de la imagen.
  //
  // Para sumar una nueva sede: abre assets/imgs/peru.jpg en cualquier editor de imágenes o visor
  // que muestre la posición del cursor en píxeles, ubica el punto exacto sobre la ciudad y calcula:
  //   xPercent = (píxel X del punto / 1101) * 100
  //   yPercent = (píxel Y del punto / 1429) * 100
  // Agrega el objeto abajo con esos valores — el punto y su burbuja se dibujan solos, sin tocar
  // el resto del mapa. Usa active:false para una sede "Próximamente" (punto gris, sin pulso).
  const PERU_LOCATIONS = [
    {
      id: 'trujillo',
      name: 'Trujillo',
      region: 'La Libertad',
      status: 'Sistema implementado',
      xPercent: 15.84,
      yPercent: 43.14,
      active: true
    }
  ];

  const peruMap = document.getElementById('peru-map');
  if (peruMap) {
    const closeAllPins = () => {
      peruMap.querySelectorAll('.map-pin.is-open').forEach((pin) => pin.classList.remove('is-open'));
    };

    PERU_LOCATIONS.forEach((loc) => {
      const pin = document.createElement('div');
      pin.className = 'map-pin';
      pin.style.left = loc.xPercent + '%';
      pin.style.top = loc.yPercent + '%';

      const marker = document.createElement('button');
      marker.type = 'button';
      marker.className = 'map-marker' + (loc.active === false ? ' is-inactive' : '');
      marker.setAttribute('aria-describedby', `tooltip-${loc.id}`);
      marker.setAttribute('aria-label', `${loc.name}, ${loc.region}: ${loc.status}`);
      marker.innerHTML = '<span class="marker-pulse"></span><span class="marker-dot"></span>';

      const tooltip = document.createElement('div');
      tooltip.className = 'map-tooltip' + (loc.active === false ? ' is-inactive' : '');
      tooltip.id = `tooltip-${loc.id}`;
      tooltip.setAttribute('role', 'tooltip');
      tooltip.innerHTML = `<strong>${loc.name}</strong><span>${loc.region}</span><span class="tooltip-status"><i></i>${loc.status}</span>`;

      pin.appendChild(marker);
      pin.appendChild(tooltip);
      peruMap.appendChild(pin);

      const open = () => { closeAllPins(); pin.classList.add('is-open'); };
      const close = () => pin.classList.remove('is-open');

      marker.addEventListener('mouseenter', open);
      marker.addEventListener('mouseleave', close);
      marker.addEventListener('focus', open);
      marker.addEventListener('blur', close);
      marker.addEventListener('click', (e) => {
        e.stopPropagation();
        pin.classList.contains('is-open') ? close() : open();
      });
    });

    document.addEventListener('click', (e) => {
      if (!peruMap.contains(e.target)) closeAllPins();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllPins();
    });
  }
