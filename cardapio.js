document.addEventListener('DOMContentLoaded', () => {
    const handle = document.getElementById('handle-drawer');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');

    if (!handle || !drawer || !closeBtn) return;

    let startY = 0;
    let startX = 0;
    const drawerHeight = window.innerHeight * 0.6;

    function abrir(e) {
        if (e) e.stopPropagation(); // Impede o clique de ir para outros elementos
        drawer.classList.add('open');
        drawer.style.transform = "translateY(0)";
        document.body.classList.add('drawer-aberta');
        console.log("Estado: Aberto");
    }

    function fechar(e) {
        if (e) e.stopPropagation(); // Crucial aqui
        drawer.classList.remove('open');
        drawer.style.transform = "";
        document.body.classList.remove('drawer-aberta');
        console.log("Estado: Fechado");
    }

    // --- EVENTOS DE CLIQUE ---
    handle.addEventListener('click', abrir);
    closeBtn.addEventListener('click', fechar);

    // Fechar ao clicar fora (na parte escura do overlay)
    drawer.addEventListener('click', (e) => {
        // Se o alvo do clique for o fundo (overlay) e não o conteúdo branco/interno
        if (e.target === drawer) {
            fechar(e);
        }
    });

    // --- LÓGICA DE TOUCH (PARA O SWIPE) ---
    const handleTouchStart = (e) => {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
        drawer.classList.add('dragging');
    };

    const handleTouchMove = (e) => {
        let currentY = e.touches[0].clientY;
        let currentX = e.touches[0].clientX;
        let deltaY = currentY - startY;
        let deltaX = currentX - startX;

        // Se o movimento for mais horizontal (carrossel), ignora o drawer
        if (Math.abs(deltaX) > Math.abs(deltaY)) return;

        // Previne o scroll da página enquanto arrasta a aba
        if (e.cancelable) e.preventDefault();

        if (!drawer.classList.contains('open')) {
            if (deltaY < 0) { // Puxando para cima
                let p = Math.max(0, 100 - (Math.abs(deltaY) / drawerHeight * 100));
                drawer.style.transform = `translateY(${p}%)`;
            }
        } else {
            if (deltaY > 0) { // Puxando para baixo
                let p = Math.min(100, (deltaY / drawerHeight * 100));
                drawer.style.transform = `translateY(${p}%)`;
            }
        }
    };

    const handleTouchEnd = (e) => {
        drawer.classList.remove('dragging');
        let finalY = e.changedTouches[0].clientY;
        let diff = startY - finalY;

        if (!drawer.classList.contains('open')) {
            if (diff > 80) abrir(); else fechar();
        } else {
            if (diff < -80) fechar(); else abrir();
        }
    };

    // Aplicar eventos de toque
    [handle, drawer].forEach(el => {
        el.addEventListener('touchstart', handleTouchStart, { passive: false });
        el.addEventListener('touchmove', handleTouchMove, { passive: false });
        el.addEventListener('touchend', handleTouchEnd, { passive: false });
    });
});



const themeBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeBtn.querySelector('.icon');

// 1. Função para aplicar o tema
function setTheme(isLight) {
    if (isLight) {
        body.classList.add('light-mode');
        icon.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');
        icon.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// 2. Checagem Inicial (Preferência do Sistema + Cache)
const savedTheme = localStorage.getItem('theme');
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    setTheme(true);
}

// 3. Evento de Clique
themeBtn.addEventListener('click', () => {
    const isLight = body.classList.contains('light-mode');
    setTheme(!isLight);
});

// 4. Ouvir mudança do sistema em tempo real
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) { // Só muda se o usuário não escolheu manualmente
        setTheme(e.matches);
    }
});