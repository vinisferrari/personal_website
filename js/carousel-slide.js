document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.wrapper');
  const fadeLeft = document.querySelector('.fade-left');
  const fadeRight = document.querySelector('.fade-right');
  


  // Logica sombras extremos do carousel
  const checkScroll = () => {
    if (wrapper.scrollLeft === 0) {
      fadeLeft.style.opacity = '0'; // Esconde suavemente o fade à esquerda
    } else {
      fadeLeft.style.opacity = '1'; // Mostra suavemente o fade à esquerda
    }

    // Usar uma margem de erro para verificar o final da rolagem
    const scrollRightMax = wrapper.scrollWidth - wrapper.clientWidth;
    if (Math.abs(wrapper.scrollLeft - scrollRightMax) < 1) {
      fadeRight.style.opacity = '0'; // Esconde suavemente o fade à direita
    } else {
      fadeRight.style.opacity = '1'; // Mostra suavemente o fade à direita
    }
  };

  wrapper.addEventListener('scroll', checkScroll);
  checkScroll(); // Para definir os fades corretamente no carregamento inicial

  const overlay = document.querySelector('.overlay');
  let contadorMouse;
  contadorMouse = 0;

  if (contadorMouse == 0) {
    overlay.addEventListener('mouseenter', function (e) {
      overlay.classList.add('hidden');
      contadorMouse = 1;
    })
  }

  let isDown = false;
  let startX;
  let scrollLeft; 

  wrapper.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    wrapper.classList.add('active');
  });

  wrapper.addEventListener('mouseleave', () => {
    isDown = false;
    wrapper.classList.remove('active');
  });

  wrapper.addEventListener('mouseup', () => {
    isDown = false;
    wrapper.classList.remove('active');
  });

  wrapper.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1; // Ajuste a velocidade de deslocamento
    wrapper.scrollLeft = scrollLeft - walk;
  });
});

// Logica carousel/slide

document.addEventListener('DOMContentLoaded', function() {
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach((carousel) => {
    let slideIndex = 1;
    const slides = carousel.querySelectorAll('.slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const dots = carousel.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {
      if (n > slides.length) { slideIndex = 1; }
      if (n < 1) { slideIndex = slides.length; }

      slides.forEach((slide) => {
        slide.classList.remove('active');
      });
      dots.forEach((dot) => {
        dot.classList.remove('active');
      });

      slides[slideIndex - 1].classList.add('active');
      dots[slideIndex - 1].classList.add('active');
    }

    function changeSlide(n) {
      showSlides(slideIndex += n);
    }

    function currentSlide(n) {
      showSlides(slideIndex = n);
    }

    prevBtn.addEventListener('click', () => {
      changeSlide(-1);
    });

    nextBtn.addEventListener('click', () => {
      changeSlide(1);
    });

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide(index + 1);
      });
    });
  });
});
