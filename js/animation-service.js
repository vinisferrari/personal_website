document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os elementos com a classe 'card' dentro da seção 'servicos'
    const cards = document.querySelectorAll('.servicos .card');

    // Adiciona evento de mouse para cada card
    cards.forEach(card => {
        card.addEventListener('mouseover', function () {
            // Adiciona a classe 'focado' ao card atual
            this.classList.add('focado');

            // Remove a classe 'focado' de todos os outros cards
            cards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.add('desfocado');
                }
            });
        });

        card.addEventListener('mouseleave', function () {

            this.classList.remove('focado');

            // Remove o filtro de blur de todos os cards
            cards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('desfocado');
                }
            });

        });
    });
});
