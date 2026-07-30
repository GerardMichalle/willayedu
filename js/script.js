// header scroll state
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  }, {passive:true});

  // mobile menu
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
  }, {threshold:.15});
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
    io.observe(el);
  });

  // demo form (frontend only)
  const form = document.getElementById('demo-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-fields').style.display = 'none';
    document.getElementById('form-ok').classList.add('show');
  });

  // live field validation
  form.querySelectorAll('input[required], textarea[required]').forEach((field) => {
    const validate = () => {
      field.classList.toggle('invalid', !field.checkValidity());
      field.classList.toggle('valid', field.checkValidity());
    };
    field.addEventListener('blur', validate);
    field.addEventListener('input', () => {
      if (field.classList.contains('invalid')) validate();
    });
  });

  // scrollspy: highlight nav link for the section in view
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

  // back to top button
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
