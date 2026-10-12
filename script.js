(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
      nav.classList.toggle('open', open);
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open');
    }));
  }

  const billing = document.querySelector('#billingToggle');
  const prices = document.querySelectorAll('[data-monthly][data-yearly]');
  const note = document.querySelector('#priceNote');
  billing?.addEventListener('click', () => {
    const yearly = billing.getAttribute('aria-checked') !== 'true';
    billing.setAttribute('aria-checked', String(yearly));
    prices.forEach(price => { price.textContent = yearly ? price.dataset.yearly : price.dataset.monthly; });
    if (note) note.textContent = yearly ? '年払い換算・年ごとの請求' : '月払い・いつでも変更可能';
  });

  document.querySelectorAll('.faq-item > button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      item.classList.toggle('open', open);
    });
  });

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); obs.unobserve(entry.target); }
    }), { threshold: .1, rootMargin: '0px 0px -20px 0px' });
    items.forEach(item => observer.observe(item));
  } else items.forEach(item => item.classList.add('in-view'));
})();
