
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
      e.target.classList.toggle('is-visible', e.isIntersecting);
    });
  }, {threshold:.15});
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
