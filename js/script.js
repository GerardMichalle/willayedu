
  // Navegación interna sin fragmentos # en la URL.
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    });
  });
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

  // ---------- Demo interactiva ----------
  const demoModal = document.getElementById('demo-modal');
  if (demoModal) {
    const DEMO_ROLES = [
      {
        id: 'direccion',
        slides: [
          { src: 'img-demo/demo_pantalla1.png', caption: 'Inicio de sesión con una cuenta demo distinta para cada rol.' },
          { src: 'img-demo/demo_pantalla2.png', caption: 'Panel de dirección: asistencia del día, tardanzas y eventos de la institución educativa.' },
          { src: 'img-demo/demo_pantalla3.png', caption: 'Control en vivo: cada tap del carné se registra al instante en la puerta.' }
        ]
      },
      {
        id: 'profesores',
        slides: [
          { src: 'img-demo/demo_pantalla1_profesores.png', caption: 'Mi aula: asistencia en vivo de los estudiantes a cargo del docente.' },
          { src: 'img-demo/demo_pantalla2_profesores.png', caption: 'Notas y libretas listas para publicar a estudiantes y familias.' }
        ]
      },
      {
        id: 'padres',
        slides: [
          { src: 'img-demo/demo_pantalla1_padres.png', caption: 'Resumen del hijo: ingreso a la institución educativa, conducta y comunicados recientes.' },
          { src: 'img-demo/demo_pantalla2_padres.png', caption: 'Historial de asistencia de sus hijos, por periodo.' }
        ]
      },
      {
        id: 'alumnos',
        slides: [
          { src: 'img-demo/demo_pantalla1_alumno.png', caption: 'Mi perfil: tarjeta digital con QR, asistencia del mes y méritos.' }
        ]
      }
    ];

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fineHover = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

    const demoOpenBtn = document.getElementById('demo-open-btn');
    const demoModalBackdrop = document.getElementById('demo-modal-backdrop');
    const demoModalPanel = document.getElementById('demo-modal-panel');
    const demoModalClose = document.getElementById('demo-modal-close');
    const demoTabs = [...document.querySelectorAll('#demo-tabs .demo-tab')];
    const demoProgressBar = document.getElementById('demo-progress-bar');
    const demoStage = document.getElementById('demo-stage');
    const demoBrowser = document.getElementById('demo-browser');
    const demoPrev = document.getElementById('demo-prev');
    const demoNext = document.getElementById('demo-next');
    const demoImgA = document.getElementById('demo-img-a');
    const demoImgB = document.getElementById('demo-img-b');
    const demoZoomBtn = document.getElementById('demo-zoom-btn');
    const demoCaption = document.getElementById('demo-caption');
    const demoDots = document.getElementById('demo-dots');

    const demoLightbox = document.getElementById('demo-lightbox');
    const demoLightboxClose = document.getElementById('demo-lightbox-close');
    const demoLightboxPrev = document.getElementById('demo-lightbox-prev');
    const demoLightboxNext = document.getElementById('demo-lightbox-next');
    const demoLightboxFrame = document.getElementById('demo-lightbox-frame');
    const demoLightboxImg = document.getElementById('demo-lightbox-img');
    const demoLightboxHint = document.getElementById('demo-lightbox-hint');

    let roleIndex = 0;
    let slideIndex = 0;
    let activeLayer = 'a';
    let isLightboxOpen = false;
    let lastFocusedEl = null;

    const getRole = () => DEMO_ROLES[roleIndex];
    const getSlide = () => getRole().slides[slideIndex];

    function renderDots() {
      const slides = getRole().slides;
      demoDots.innerHTML = '';
      demoDots.style.display = slides.length <= 1 ? 'none' : 'flex';
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        if (i === slideIndex) b.classList.add('is-active');
        b.setAttribute('aria-label', `Ir a la pantalla ${i + 1}`);
        b.addEventListener('click', () => goToSlide(i));
        demoDots.appendChild(b);
      });
    }

    function renderSlide(instant) {
      const slide = getSlide();
      const layers = { a: demoImgA, b: demoImgB };
      const activeEl = layers[activeLayer];
      const otherKey = activeLayer === 'a' ? 'b' : 'a';
      const otherEl = layers[otherKey];

      if (instant) {
        activeEl.src = slide.src;
        activeEl.alt = slide.caption;
        activeEl.classList.add('is-active');
        otherEl.classList.remove('is-active');
      } else {
        const preload = new Image();
        preload.onload = () => {
          otherEl.src = slide.src;
          otherEl.alt = slide.caption;
          requestAnimationFrame(() => {
            otherEl.classList.add('is-active');
            activeEl.classList.remove('is-active');
            activeLayer = otherKey;
          });
        };
        preload.src = slide.src;
      }

      demoCaption.textContent = slide.caption;
      renderDots();
      syncLightboxImage();
    }

    function restartAutoplay() {
      demoProgressBar.classList.remove('running', 'paused');
      void demoProgressBar.offsetWidth;
      if (getRole().slides.length <= 1 || prefersReducedMotion) return;
      demoProgressBar.classList.add('running');
    }

    function goToSlide(i, instant) {
      const len = getRole().slides.length;
      slideIndex = ((i % len) + len) % len;
      renderSlide(instant);
      restartAutoplay();
    }
    const nextSlide = () => goToSlide(slideIndex + 1);
    const prevSlide = () => goToSlide(slideIndex - 1);

    function switchRole(i, startSlide) {
      roleIndex = i;
      slideIndex = startSlide || 0;
      demoTabs.forEach((t, idx) => {
        t.classList.toggle('is-active', idx === i);
        t.setAttribute('aria-selected', idx === i ? 'true' : 'false');
      });
      const single = getRole().slides.length <= 1;
      demoPrev.style.display = single ? 'none' : 'flex';
      demoNext.style.display = single ? 'none' : 'flex';
      renderSlide(true);
      restartAutoplay();
    }

    demoProgressBar.addEventListener('animationend', () => {
      if (demoModal.classList.contains('open') && !isLightboxOpen) nextSlide();
    });
    demoStage.addEventListener('mouseenter', () => demoProgressBar.classList.add('paused'));
    demoStage.addEventListener('mouseleave', () => demoProgressBar.classList.remove('paused'));
    document.addEventListener('visibilitychange', () => {
      if (!demoModal.classList.contains('open')) return;
      demoProgressBar.classList.toggle('paused', document.hidden || isLightboxOpen);
    });

    demoTabs.forEach((tab, i) => tab.addEventListener('click', () => switchRole(i)));
    demoPrev.addEventListener('click', prevSlide);
    demoNext.addEventListener('click', nextSlide);

    function trapFocus(e) {
      const container = isLightboxOpen ? demoLightbox : demoModalPanel;
      const focusables = [...container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onModalKeydown(e) {
      if (e.key === 'Escape') {
        isLightboxOpen ? closeLightbox() : closeDemoModal();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Tab') {
        trapFocus(e);
      }
    }

    function openDemoModal(targetRoleId, targetSlide) {
      lastFocusedEl = document.activeElement;
      demoModal.classList.add('open');
      demoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const targetIndex = targetRoleId ? DEMO_ROLES.findIndex((r) => r.id === targetRoleId) : roleIndex;
      switchRole(targetIndex >= 0 ? targetIndex : roleIndex, targetSlide);
      demoModalClose.focus();
      document.addEventListener('keydown', onModalKeydown);
    }
    function closeDemoModal() {
      demoModal.classList.remove('open');
      demoModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      demoProgressBar.classList.remove('running', 'paused');
      closeLightbox();
      document.removeEventListener('keydown', onModalKeydown);
      if (lastFocusedEl) lastFocusedEl.focus();
    }
    demoOpenBtn.addEventListener('click', () => openDemoModal());
    demoModalClose.addEventListener('click', closeDemoModal);
    demoModalBackdrop.addEventListener('click', closeDemoModal);

    // ---- Pasos de "Cómo funciona": cada tarjeta abre la demo en la pantalla real que le corresponde ----
    document.querySelectorAll('#fx-row .fx-card[data-role]').forEach((card) => {
      const role = card.dataset.role;
      const slide = parseInt(card.dataset.slide, 10) || 0;
      const openFromCard = () => openDemoModal(role, slide);
      card.addEventListener('click', openFromCard);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFromCard();
        }
      });
    });

    // ---- Lightbox: acercar la pantalla ----
    function resetZoom() {
      demoLightboxFrame.style.setProperty('--zs', '1');
      demoLightboxFrame.style.setProperty('--zx', '50%');
      demoLightboxFrame.style.setProperty('--zy', '50%');
      demoLightboxFrame.classList.remove('zoomed');
    }
    function syncLightboxImage() {
      if (!isLightboxOpen) return;
      const slide = getSlide();
      demoLightboxImg.src = slide.src;
      demoLightboxImg.alt = slide.caption;
      resetZoom();
    }
    function openLightbox() {
      isLightboxOpen = true;
      demoProgressBar.classList.add('paused');
      const slide = getSlide();
      demoLightboxImg.src = slide.src;
      demoLightboxImg.alt = slide.caption;
      demoLightboxHint.textContent = fineHover
        ? 'Mueve el cursor sobre la imagen para acercar'
        : 'Toca la imagen para acercar';
      demoLightbox.classList.add('open');
      demoLightbox.setAttribute('aria-hidden', 'false');
      resetZoom();
      demoLightboxClose.focus();
    }
    function closeLightbox() {
      if (!isLightboxOpen) return;
      isLightboxOpen = false;
      demoLightbox.classList.remove('open');
      demoLightbox.setAttribute('aria-hidden', 'true');
      resetZoom();
      demoProgressBar.classList.remove('paused');
      demoZoomBtn.focus();
    }
    demoZoomBtn.addEventListener('click', openLightbox);
    demoImgA.addEventListener('click', openLightbox);
    demoImgB.addEventListener('click', openLightbox);
    demoLightboxClose.addEventListener('click', closeLightbox);
    demoLightbox.addEventListener('click', (e) => { if (e.target === demoLightbox) closeLightbox(); });
    demoLightboxPrev.addEventListener('click', prevSlide);
    demoLightboxNext.addEventListener('click', nextSlide);

    if (fineHover) {
      demoLightboxFrame.addEventListener('mouseenter', () => {
        demoLightboxFrame.style.setProperty('--zs', '2.2');
        demoLightboxFrame.classList.add('zoomed');
      });
      demoLightboxFrame.addEventListener('mousemove', (e) => {
        const rect = demoLightboxFrame.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        demoLightboxFrame.style.setProperty('--zx', x + '%');
        demoLightboxFrame.style.setProperty('--zy', y + '%');
      });
      demoLightboxFrame.addEventListener('mouseleave', resetZoom);

      demoStage.addEventListener('mousemove', (e) => {
        if (isLightboxOpen || prefersReducedMotion) return;
        const rect = demoBrowser.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        demoBrowser.style.transform = `perspective(1200px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg)`;
      });
      demoStage.addEventListener('mouseleave', () => { demoBrowser.style.transform = ''; });
    } else {
      demoLightboxFrame.addEventListener('click', (e) => {
        if (demoLightboxFrame.classList.contains('zoomed')) { resetZoom(); return; }
        const rect = demoLightboxFrame.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        demoLightboxFrame.style.setProperty('--zx', x + '%');
        demoLightboxFrame.style.setProperty('--zy', y + '%');
        demoLightboxFrame.style.setProperty('--zs', '2.1');
        demoLightboxFrame.classList.add('zoomed');
      });
    }
  }
