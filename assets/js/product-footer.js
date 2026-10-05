(() => {
  const footer = document.querySelector('[data-ref="footer"]');
  if (!footer) return;

  const reveal = () => footer.classList.add('footer--in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        reveal();
        observer.disconnect();
      }
    }, {rootMargin: '0px 0px -20% 0px'});
    observer.observe(footer);
  } else reveal();

  const form = footer.querySelector('.footer__form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const input = form.querySelector('input');
    const error = form.querySelector('.input__error');
    if (!input.checkValidity()) {
      error.style.display = 'block';
      input.focus();
      return;
    }
    error.style.display = 'none';
    input.value = '';
    input.blur();
  });
})();
