const slider = document.querySelector('.grid-cardapio');
let isDown = false;
let startX;
let scrollLeft;

// --- SUPORTE PARA MOUSE (DRAG) ---
slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    // Desativa o snap momentaneamente para o arrasto ser liso
    slider.style.scrollSnapType = 'none';
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.style.scrollSnapType = 'x mandatory';
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.scrollSnapType = 'x mandatory';
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // Velocidade do arrasto
    slider.scrollLeft = scrollLeft - walk;
});

// --- LÓGICA DE LOOP INFINITO (OPCIONAL/SUAVE) ---
// Se você quiser que ele volte ao início ao chegar no fim sem "crashar"
slider.addEventListener('scroll', () => {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft >= maxScroll - 1) {
        // Se chegar no fim, ele volta pro começo suavemente ou instantâneo
        // Para um loop perfeito, precisaríamos duplicar os itens como fizemos antes
    }
});