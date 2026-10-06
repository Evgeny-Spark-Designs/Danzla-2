(function () {
  const demo = new URLSearchParams(location.search).has('demo');
  let cart = DanzlaStore.cart();

  if (demo && !cart.length) {
    cart = [{
      id: 'oval:black',
      slug: 'oval',
      name: 'Danzla Oval',
      color: 'Black',
      price: 5900,
      qty: 1,
      image: '../assets-materials/products/oval/oval-black-studio.png'
    }];
  }

  const items = document.querySelector('#summary-items');
  const money = value => `${Number(value).toLocaleString('ru-RU')} ₽`;

  function render() {
    if (!cart.length) {
      items.innerHTML = '<p style="color:rgba(255,255,255,.65)">Корзина пуста. Для проверки формы добавьте сумку из карточки товара.</p>';
    } else {
      items.innerHTML = cart.map(item => `
        <div class="summary-item">
          <img src="${item.image}" alt="">
          <span><b>${item.name}</b><small>${item.color} · ${item.qty} шт.</small></span>
          <b>${money(item.price * item.qty)}</b>
        </div>
      `).join('');
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const freeDelivery = subtotal >= 10000;
    document.querySelector('#subtotal').textContent = money(subtotal);
    document.querySelector('#delivery-price').textContent = freeDelivery ? 'Бесплатно' : 'По тарифу CDEK';
    document.querySelector('#grand-total').textContent = freeDelivery ? money(subtotal) : `${money(subtotal)} + доставка`;
  }

  if (demo) {
    const values = {
      firstName: 'Марина',
      lastName: 'Соколова',
      phone: '+7 916 483-27-51',
      email: 'marina.sokolova@example.com',
      city: 'Москва',
      postal: '119049',
      street: 'Ленинский проспект, 12',
      apartment: '47',
      comment: 'Позвонить за 30 минут'
    };
    Object.entries(values).forEach(([name, value]) => {
      const field = document.querySelector(`[name="${name}"]`);
      if (field) field.value = value;
    });
  }

  document.querySelector('#checkout-form').addEventListener('submit', event => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    document.querySelector('#success').classList.add('is-visible');
    scrollTo({top: 0, behavior: 'smooth'});
  });

  render();
})();
