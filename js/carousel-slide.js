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

  wrapper.addEventListener('mousedown', function(e) {
    isDown = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    wrapper.classList.add('active');
    contadorMouse = 2;
  });

  wrapper.addEventListener('mouseleave', function() {
    isDown = false;
    wrapper.classList.remove('active');
  });

  wrapper.addEventListener('mouseup', function () {
    isDown = false;
    wrapper.classList.remove('active');
  });

  wrapper.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 1; // Ajuste a velocidade de deslocamento
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // -------- Logica carousel/slide

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

  //logica para expandir as imagens do carousel ao clicar


  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.getElementsByClassName("close")[0];
  const slides = document.querySelectorAll(".carousel .slide");

  let isMouseDown = false;
  let startEixoX, startY, startTime, isLeftButton;

  // função simples que pode ajudar a determinar se um dispositivo suporta eventos de toque

  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }

  // Função para iniciar o clique/toque
  function startInteraction(event) {
    if (isTouchDevice() && contadorMouse != 2) return;
        // Verifica se é um toque ou o botão esquerdo do mouse
    if (event.type === "mousedown" && event.button !== 0) return;
    isMouseDown = true;
    isLeftButton = event.button === 0;
    const touch = event.touches ? event.touches[0] : event;
    startEixoX = touch.clientX;
    startY = touch.clientY;
    startTime = new Date().getTime();
  }

  // Função para finalizar o clique/toque
  function endInteraction(event) {
    if (isMouseDown) {
      // Verifica se é um toque ou o botão esquerdo do mouse
      if (event.type === "mouseup" && !isLeftButton) return;

      const touch = event.changedTouches ? event.changedTouches[0] : event;
      const endX = touch.clientX;
      const endY = touch.clientY;
      const endTime = new Date().getTime();

      const deltaX = endX - startEixoX;
      const deltaY = endY - startY;
      const deltaTime = endTime - startTime;

      if (Math.abs(deltaX) < 5 && Math.abs(deltaY) < 5 && deltaTime < 200) {
        const img = event.currentTarget.querySelector("img");
        if (img) {
          modal.style.display = "block";
          modalImg.src = img.src;
        }
      }

      isMouseDown = false;
    }
  }

  // Adicionar eventos de mouse
  slides.forEach((slide) => {
    slide.addEventListener("mousedown", startInteraction);
    slide.addEventListener("mouseup", endInteraction);
    slide.addEventListener("mouseleave", () => {
      isMouseDown = false;
    });

    slide.addEventListener("touchstart", startInteraction);
    slide.addEventListener("touchend", endInteraction);

  });

  // Evento de fechar o modal
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });



});
