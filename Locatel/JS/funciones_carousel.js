const buttons = document.querySelectorAll('.btn_custom');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      document.getElementById('carousel_principal').querySelector('.active').classList.remove('active');
      button.classList.add('active');
      const carousel = new bootstrap.Carousel(document.getElementById('carousel_principal'));
      carousel.to(index);
    });
  });