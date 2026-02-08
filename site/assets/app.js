(() => {
  const menu = document.querySelector('[data-menu]');
  const toggle = document.querySelector('[data-menu-toggle]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  const main = document.querySelector('main');
  if (main) {
    main.classList.add('fade-enter');
    requestAnimationFrame(() => {
      main.classList.add('fade-enter-active');
    });
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) return;
    if (!href.endsWith('.html')) return;

    e.preventDefault();
    if (main) {
      main.classList.add('fade-exit-active');
      setTimeout(() => { window.location.href = href; }, 160);
    } else {
      window.location.href = href;
    }
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
})();
