/* --- 1. CONFIGURAÇÃO E DADOS --- */
const bancoDadosProgramacao = {
    semana_1: {
        seg: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "Fechado" }
        ],
        ter: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        qua: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        qui: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        sex: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        sab: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "08:00–20:00" }
        ],
        dom: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–20:00" }
        ]
    },
    semana_2: {
        seg: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "Fechado" }
        ],
        ter: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        qua: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        qui: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        sex: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        sab: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "08:00–20:00" }
        ],
        dom: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–20:00" }
        ]
    },
    semana_3: {
        seg: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "Fechado" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "Fechado" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "Fechado" }

        ],
        ter: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }

        ],
        qua: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }

        ],
        qui: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }

        ],
        sex: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }

        ],
        sab: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "08:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "08:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "08:00–20:00" }

        ],
        dom: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–20:00" },
            { titulo: "loremepsun", desc: "Hoje as ", hora: "06:00–20:00" }

        ]
    },
    semana_4: {
        seg: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "Fechado" }
        ],
        ter: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        qua: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        qui: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        sex: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–13:00 | 14:00–20:00" }
        ],
        sab: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "08:00–20:00" }
        ],
        dom: [
            { titulo: "Horario de funcionamento", desc: "Hoje as ", hora: "06:00–20:00" }
        ]
    }
};

let semanaAtiva = "semana_1";

/* --- 2. SUPORTE PARA MOUSE (DRAG NO CARDÁPIO) --- */
const slider = document.querySelector('.grid-cardapio');
let isDown = false;
let startX, scrollLeft;

if (slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
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
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

/* --- 3. LÓGICA DE RENDERIZAÇÃO DA AGENDA --- */

function obterSemanaDoMes() {
    const diaVal = new Date().getDate();
    const numSemana = Math.ceil(diaVal / 7);
    return `semana_${numSemana > 4 ? 4 : numSemana}`;
}

function atualizarDisplayProgramacao(diaId) {
    const container = document.querySelector('.semana-content-wrapper');
    if (!container) return;

    const eventosDoDia = bancoDadosProgramacao[semanaAtiva][diaId] || [];
    container.innerHTML = '';
    document.querySelectorAll('.dia-btn').forEach(b => b.classList.remove('active'));

    const btnAtivo = document.querySelector(`.dia-btn[data-dia="${diaId}"]`);
    if (btnAtivo) btnAtivo.classList.add('active');

    if (eventosDoDia.length === 0) {
        container.innerHTML = `<div class="dia-content active"><p style="opacity:0.5;text-align:center;padding:2rem;">Nenhuma programação para este dia.</p></div>`;
        return;
    }

    let htmlAtividades = `<div class="dia-content active">`;
    eventosDoDia.forEach(ev => {
        htmlAtividades += `
            <div class="atividade-item">
                <h3>${ev.titulo}</h3>
                <p>${ev.desc}</p>
                <span class="horario">${ev.hora}</span>
            </div>`;
    });
    htmlAtividades += `</div>`;
    container.innerHTML = htmlAtividades;
}

/* --- 4. FUNÇÃO DO CALENDÁRIO MENSAL --- */

function gerarCalendario() {
    const calendarBody = document.getElementById('calendar-body');
    const listaEventos = document.querySelector('.eventos-lista-mini');
    if (!calendarBody || !listaEventos) return;

    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = agora.getMonth();

    const eventos = [
        { dia: 18, titulo: "Rodada Brasileirão", info: "Telão ligado." },
        { dia: 20, titulo: "Sextou no Ramos", info: "Clone de caldinho." },
        { dia: 26, titulo: "Pagode do Ramos", info: "Pagode de mesa." }
    ];

    calendarBody.innerHTML = '';
    listaEventos.innerHTML = '';

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    diasSemana.forEach(d => {
        const h = document.createElement('div');
        h.className = 'calendar-header';
        h.innerText = d;
        calendarBody.appendChild(h);
    });

    const primeiroDiaMes = new Date(ano, mes, 1).getDay();
    const totalDiasMes = new Date(ano, mes + 1, 0).getDate();

    for (let i = 0; i < primeiroDiaMes; i++) {
        const div = document.createElement('div');
        div.className = 'day empty';
        calendarBody.appendChild(div);
    }

    const diasComEvento = eventos.map(e => e.dia);
    for (let dia = 1; dia <= totalDiasMes; dia++) {
        const div = document.createElement('div');
        div.className = 'day';
        div.innerText = dia;
        if (dia === agora.getDate()) div.classList.add('today');
        if (diasComEvento.includes(dia)) div.classList.add('event-dot');
        calendarBody.appendChild(div);
    }

    eventos.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'mini-card-evento';
        card.innerHTML = `
            <span class="mini-data">${ev.dia}/${String(mes + 1).padStart(2, '0')}</span>
            <div class="mini-info"><strong>${ev.titulo}</strong><span>${ev.info}</span></div>`;
        listaEventos.appendChild(card);
    });
}

/* --- 5. INICIALIZAÇÃO E EVENTOS --- */

function trocarSemana(idSemana) {
    semanaAtiva = idSemana;
    const diaAberto = document.querySelector('.dia-btn.active')?.getAttribute('data-dia') || 'seg';
    atualizarDisplayProgramacao(diaAberto);
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Evita que o navegador pule para posições antigas ao carregar
    window.history.scrollRestoration = 'manual';

    // 2. Inicializa Semana e Dia atual
    semanaAtiva = obterSemanaDoMes();
    const diasArray = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
    const idHoje = diasArray[new Date().getDay()];

    // 3. Atualiza o display inicial
    atualizarDisplayProgramacao(idHoje);
    if (typeof gerarCalendario === "function") gerarCalendario();

    // 4. LÓGICA DE SCROLL AUTOMÁTICO (Fim de Semana)
    const diasNav = document.querySelector('.dias-nav');
    if (diasNav && (idHoje === 'sex' || idHoje === 'sab' || idHoje === 'dom')) {
        setTimeout(() => {
            diasNav.scrollTo({
                left: diasNav.scrollWidth,
                behavior: 'smooth'
            });
        }, 300); // Pequeno delay para garantir que o layout renderizou
    }

    // 5. Eventos do Hub (Semanal vs Mensal)
    document.querySelectorAll('.hub-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            document.querySelectorAll('.hub-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.hub-pane').forEach(pane => pane.classList.remove('active'));
            document.getElementById(`pane-${target}`).classList.add('active');
            if (target === 'mensal') gerarCalendario();
        });
    });

    // 6. Cliques nos dias da semana
    if (diasNav) {
        diasNav.addEventListener('click', (e) => {
            const btn = e.target.closest('.dia-btn');
            if (btn) {
                // Remove active de todos e coloca no clicado
                document.querySelectorAll('.dia-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                atualizarDisplayProgramacao(btn.getAttribute('data-dia'));
            }
        });
    }
});

// --- LÓGICA DE TEMA ---
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