
    const handle = document.getElementById('handle-drawer');
    const drawer = document.getElementById('drawer');
    const closeBtn = document.getElementById('close-drawer');

    let startY = 0;
    let currentY = 0;
    const drawerHeight = window.innerHeight * 0.6; // 60vh

    // --- FUNÇÕES DE CONTROLE ---
    function abrirDrawer() {
        drawer.classList.add('open');
        drawer.style.transform = "translateY(0)";
        // Trava o scroll do site
        document.documentElement.classList.add('drawer-aberta');
        document.body.classList.add('drawer-aberta');
    }

    function fecharDrawer() {
        drawer.classList.remove('open');
        drawer.style.transform = "translateY(100%)";
        // Libera o scroll do site
        document.documentElement.classList.remove('drawer-aberta');
        document.body.classList.remove('drawer-aberta');
    }

    // --- EVENTOS DE CLIQUE ---
    handle.addEventListener('click', (e) => {
        e.stopPropagation();
        abrirDrawer();
    });

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fecharDrawer();
    });

    // --- LÓGICA DE GESTOS (SWIPE) ---
    const onTouchStart = (e) => {
        startY = e.touches[0].clientY;
        drawer.classList.add('dragging');
    };

    const onTouchMove = (e) => {
        // Bloqueia o arrasto do site por trás da aba
        if (e.cancelable) e.preventDefault(); 
        
        currentY = e.touches[0].clientY;
        let deltaY = currentY - startY;

        if (!drawer.classList.contains('open')) {
            if (deltaY < 0) { // Puxando para cima
                let percent = (Math.abs(deltaY) / drawerHeight) * 100;
                drawer.style.transform = `translateY(${Math.max(0, 100 - percent)}%)`;
            }
        } else if (deltaY > 0) { // Puxando para baixo (fechar)
            let percent = (deltaY / drawerHeight) * 100;
            drawer.style.transform = `translateY(${Math.min(100, percent)}%)`;
        }
    };

    const onTouchEnd = (e) => {
        drawer.classList.remove('dragging');
        let deltaY = e.changedTouches[0].clientY - startY;
        let movedPercent = (Math.abs(deltaY) / drawerHeight);

        if (!drawer.classList.contains('open')) {
            // Se puxou mais de 60% da altura da aba, ela abre
            if (deltaY < 0 && movedPercent > 0.6) {
                abrirDrawer();
            } else {
                fecharDrawer();
            }
        } else {
            // Se puxou mais de 40% para baixo, ela fecha
            if (deltaY > 0 && movedPercent > 0.4) {
                fecharDrawer();
            } else {
                abrirDrawer();
            }
        }
    };

    // Vincular eventos com { passive: false } para permitir o preventDefault()
    [handle, drawer].forEach(el => {
        el.addEventListener('touchstart', onTouchStart, { passive: false });
        el.addEventListener('touchmove', onTouchMove, { passive: false });
        el.addEventListener('touchend', onTouchEnd, { passive: false });
    });

    // Fechar ao clicar no escuro (fora da aba)
    window.addEventListener('click', (e) => {
        if (drawer.classList.contains('open') && e.target === drawer) {
            fecharDrawer();
        }
    });