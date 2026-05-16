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

// Dados do cardápio
const cardapio = {
    
    // "8.00"	R$ 8,00
    // ["5.00", "15.00"]	R$ 5,00 R$ 15,00
    // [{ label: "Copo", valor: "5.00" }, { label: "Jarra", valor: "15.00" }]
    
    
    caldinhos: {
        titulo: "CALDINHOS",
        itens: [
            { nome: "FEIJÃO", desc: "Caldinho tradicional bem temperado e servido quente.", preco: ["8.00"], img: "midia/produtos/caldinhodefeijao.jpg" },
            { nome: "PEIXE", desc: "Caldinho saboroso preparado com peixe selecionado.", preco: ["8.50"], img: "midia/produtos/caldinhodepeixe.jpg" },
            { nome: "VACA ATOLADA", desc: "Caldinho encorpado com sabor marcante.", preco: ["8.50"], img: "midia/produtos/caldinhodevacaatolada.jpg" },
            { nome: "SARAPATEL", desc: "Tradicional nordestino cheio de sabor.", preco: ["8.00"], img: "midia/produtos/caldinhodesarapatel.jpg" }
        ]
    },
    
    espetinhos: {
        titulo: "ESPETINHOS",
        itens: [
            { nome: "FRANGO", desc: "Espetinho clássico grelhado na brasa.", preco: ["9.00"], img: "midia/produtos/espetinhodefrango.jpg" },
            { nome: "FRANGO C/ BACON", desc: "Frango envolvido com bacon crocante.", preco: ["10.00"], img: "midia/produtos/espetinhodefrangocombacon.jpg" },
            { nome: "BANANINHA", desc: "Corte macio e muito suculento.", preco: ["10.00"], img: "midia/produtos/espetinhodebananinha.jpg" },
            { nome: "PICANHA", desc: "Espetinho premium feito na brasa.", preco: ["10.00"], img: "midia/produtos/espetinhodepicanha.webp" }
        ]
    },
    
    petiscos: {
        titulo: "PETISCOS",
        itens: [
            { nome: "CARNE DE SOL C/ FRITAS", desc: "Carne de sol acompanhada de batatas fritas crocantes.", preco: ["38.00"], img: "midia/produtos/carnedesolcomfritas.jpg" },
            { nome: "CARNE DE SOL C/ QUEIJO", desc: "Carne de sol servida com queijo derretido.", preco: ["30.00"], img: "midia/produtos/carnedesolcomqueijo.jpg" },
            { nome: "LINGUIÇA MATUTA ACEBOLADA", desc: "Linguiça acebolada bem servida.", preco: ["25.00"], img: "midia/produtos/linguicamatutaacebolada.jpg" },
            { nome: "PEIXE FRITO (ALBACORA)", desc: "Peixe frito crocante e saboroso.", preco: ["35.00"], img: "midia/produtos/albacorafrita.jpg" },
            { nome: "BATATA FRITA", desc: "Porção de batata frita crocante.", preco: ["15.00"], img: "midia/produtos/batatafrita.jpg" },
            { nome: "BATATA FRITA C/ BACON", desc: "Batata frita com bacon crocante.", preco: ["20.00"], img: "midia/produtos/batatafritacombacon.jpg" },
            { nome: "TORRESMO", desc: "Torresmo crocante e sequinho.", preco: ["20.00"], img: "midia/produtos/torresmo.jpg" },
            { nome: "AGULHA FRITA", desc: "Peixe frito crocante e bem temperado.", preco: ["15.00"], img: "midia/produtos/agulhafrita.jpg" },
            { nome: "CALABRESA C/ FRITAS", desc: "Calabresa acebolada acompanhada de fritas.", preco: ["28.00"], img: "midia/produtos/calabresacomfritas.jpg" },
            { nome: "QUEIJO DO ENGENHO", desc: "Queijo regional grelhado e saboroso.", preco: ["18.50"], img: "midia/produtos/queijodoengenho.jpg" },
            { nome: "SARAPATEL DE PORCO", desc: "Porção tradicional nordestina.", preco: ["15.00"], img: "midia/produtos/sarapateldeporco.jpg" },
            { nome: "TÁBUA DE FRIOS M", desc: "Seleção de frios tamanho médio.", preco: ["30.00"], img: "midia/produtos/tabuadefriosm.jpg" },
            { nome: "TÁBUA DE FRIOS G", desc: "Seleção completa de frios grande.", preco: ["40.00"], img: "midia/produtos/tabuadefriosg.jpg" },
            { nome: "ASINHA DE FRANGO C/ FRITAS", desc: "Asinhas crocantes com batata frita.", preco: ["25.00"], img: "midia/produtos/asinhadefrangocomfritas.jpg" },
            { nome: "ASINHA EMPANADA", desc: "Porção de asinhas empanadas crocantes.", preco: ["15.00"], img: "midia/produtos/asinhaempanada.jpg" },
            { nome: "CAMARÃO AO ALHO E ÓLEO", desc: "Camarão refogado no alho e óleo.", preco: ["25.00"], img: "midia/produtos/camaraoaoalhoeoleo.jpg" },
            { nome: "DADINHO DE QUEIJO", desc: "Cubos crocantes de queijo.", preco: ["20.00"], img: "midia/produtos/dadinhodequeijo.jpg" },
            { nome: "CARNE DE SOL ACEBOLADA", desc: "Carne de sol acebolada e suculenta.", preco: ["25.00"], img: "midia/produtos/carnedesolacebolada.jpg" }
        ]
    },
    
    bolinhos: {
        titulo: "BOLINHOS",
        itens: [
            {
                nome: "BACALHAU",
                desc: "Bolinho crocante por fora e recheado com bacalhau.",
                preco: ["20.00"],
                img: "midia/produtos/bolinhodebacalhau.jpg",
                modelo3d: "modelos/Copilot3D-45235a79-5270-4f1c-a342-052f2e893afe.glb"
            },
            { nome: "CHARQUE", desc: "Bolinho artesanal recheado com charque temperada.", preco: ["20.00"], img: "midia/produtos/bolinhodecharque.jpg" },
            { nome: "COSTELA", desc: "Bolinho recheado com costela desfiada e sabor marcante.", preco: ["23.50"], img: "midia/produtos/bolinhodecostela.jpg" }
        ]
    },
    
    pasteis: {
        titulo: "PASTÉIS",
        itens: [
            { nome: "QUEIJO", desc: "Porção com 8 unidades de pastel recheado com queijo.", preco: ["20.00"], img: "midia/produtos/pasteisdequeijo.jpg" },
            { nome: "CARNE", desc: "Porção com 8 unidades de pastel recheado com carne.", preco: ["20.00"], img: "midia/produtos/pasteisdecarne.jpg" },
            { nome: "NORDESTINO", desc: "Porção com 8 unidades com recheio especial.", preco: ["21.00"], img: "midia/produtos/pasteisnordestinos.jpg" },
            { nome: "CAMARÃO", desc: "Porção com 8 unidades recheadas com camarão.", preco: ["23.00"], img: "midia/produtos/pasteisdecamarao.jpg" }
        ]
    },
    
    refrigerantes: {
        titulo: "REFRIGERANTES / OUTROS",
        itens: [
            { nome: "GUARANÁ (LATA)", desc: "Refrigerante gelado.", preco: ["6.50"], img: "midia/produtos/guaranalata.jpg" },
            { nome: "COCA-COLA (LATA)", desc: "Refrigerante clássico bem gelado.", preco: ["6.50"], img: "midia/produtos/cocalata.jpg" },
            { nome: "COCA-COLA ZERO (LATA)", desc: "Zero açúcar e bem gelada.", preco: ["6.50"], img: "midia/produtos/cocalatazero.jpg" },
            { nome: "FANTA (LATA)", desc: "Refrigerante refrescante.", preco: ["6.50"], img: "midia/produtos/fantalata.jpg" },
            { nome: "REFRIGERANTE FYS (LATA)", desc: "Leve e refrescante.", preco: ["6.00"], img: "midia/produtos/fysrefrigerante.jpg" },
            { nome: "COCA-COLA 1L", desc: "Ideal para compartilhar.", preco: ["8.50"], img: "midia/produtos/coca1l.jpg" },
            { nome: "COCA-COLA KS", desc: "Clássica garrafinha retornável.", preco: ["4.50"], img: "midia/produtos/cocaks.jpg" },
            { nome: "GUARANÁ 1L", desc: "Refrigerante bem gelado.", preco: ["8.50"], img: "midia/produtos/guarana1l.jpg" },
            { nome: "H2O LIMONETO", desc: "Bebida leve e refrescante.", preco: ["6.50"], img: "midia/produtos/h20limoneto.jpg" },
            { nome: "H2O LIMÃO", desc: "Refrescante e leve.", preco: ["6.50"], img: "midia/produtos/h20limao.jpg" },
            { nome: "ÁGUA DE COCO", desc: "Natural e gelada.", preco: ["5.00"], img: "midia/produtos/aguadecoco.jpg" },
            { nome: "FYS TÔNICA", desc: "Ideal para drinks.", preco: ["6.00"], img: "midia/produtos/fyslata.jpg" },
            { nome: "SKINKA", desc: "Refrigerante refrescante.", preco: ["6.00"], img: "midia/produtos/skinka.jpg" },
            { nome: "RED BULL", desc: "Energético tradicional.", preco: ["13.00"], img: "midia/produtos/redbull.jpg" },
            { nome: "MONSTER", desc: "Energético gelado.", preco: ["14.00"], img: "midia/produtos/monster.jpg" },
            { nome: "ÁGUA S/ GÁS", desc: "Água mineral gelada.", preco: ["3.00"], img: "midia/produtos/aguasemgas.jpg" },
            { nome: "ÁGUA C/ GÁS", desc: "Água mineral com gás.", preco: ["4.00"], img: "midia/produtos/aguacomgas.jpg" }
        ]
    },
    
    sucos: {
        titulo: "SUCOS",
        itens: [
            { nome: "MORANGO", desc: "Suco natural de morango bem gelado.", preco: ["6.00"], img: "midia/produtos/sucodemorango.jpg" },
            { nome: "LIMONADA", desc: "Suco refrescante feito com limão.", preco: ["6.00"], img: "midia/produtos/sucodelimonada.jpg" },
            { nome: "GRAVIOLA", desc: "Suco natural cremoso e saboroso.", preco: ["6.00"], img: "midia/produtos/sucodegraviola.jpg" },
            { nome: "CAJÁ", desc: "Suco regional refrescante.", preco: ["6.00"], img: "midia/produtos/sucodecaja.jpg" }
        ]
    },
    
    cervejas600: {
        titulo: "CERVEJAS 600ML",
        itens: [
            { nome: "HEINEKEN", desc: "Cerveja puro malte super gelada.", preco: ["15.00"], img: "midia/produtos/hineken600.jpg" },
            { nome: "DEVASSA", desc: "Leve e refrescante.", preco: ["9.00"], img: "midia/produtos/devassa600.jpg" },
            { nome: "AMSTEL", desc: "Cerveja leve e saborosa.", preco: ["10.00"], img: "midia/produtos/amstel600.jpg" },
            { nome: "EISENBAHN", desc: "Cerveja encorpada e refrescante.", preco: ["12.00"], img: "midia/produtos/eisenhbah.jpg" }
        ]
    },
    
    cervejaslongneck: {
        titulo: "CERVEJAS LONGNECK",
        itens: [
            { nome: "HEINEKEN", desc: "Longneck puro malte bem gelada.", preco: ["8.50"], img: "midia/produtos/heinikenlong.jpg" },
            { nome: "HEINEKEN S/ ÁLCOOL", desc: "O mesmo sabor sem álcool.", preco: ["9.00"], img: "midia/produtos/heinekensemalcool.jpg" },
            { nome: "EISENBAHN PILSEN", desc: "Clássica e refrescante.", preco: ["7.50"], img: "midia/produtos/eisehnbahnpilsen.jpg" },
            { nome: "EISENBAHN IPA", desc: "Mais intensa e aromática.", preco: ["9.00"], img: "midia/produtos/eisebahnipa.jpg" },
            { nome: "EISENBAHN ALE", desc: "Sabor equilibrado e marcante.", preco: ["9.00"], img: "midia/produtos/eisebahpale.jpg" },
            { nome: "EISENBAHN SESSION IPA", desc: "Leve, cítrica e refrescante.", preco: ["9.00"], img: "midia/produtos/eisebahnsessionipa.jpg" }
        ]
    },
    
    cervejasespeciais: {
        titulo: "CERVEJAS ESPECIAIS",
        itens: [
            { nome: "BADEN BADEN AMERICAN IPA", desc: "Cerveja especial com sabor intenso e aromático.", preco: ["16.90"], img: "midia/produtos/badenbadenamericaipa.jpg" },
            { nome: "BADEN BADEN WITBIER", desc: "Leve, cítrica e refrescante.", preco: ["16.90"], img: "midia/produtos/badenbadenwitbear.jpg" },
            { nome: "BADEN BADEN GOLDEN", desc: "Sabor suave e equilibrado.", preco: ["16.90"], img: "midia/produtos/badenbadengolden.jpg" },
            { nome: "BADEN BADEN CRISTAL", desc: "Refrescante e clássica.", preco: ["16.90"], img: "midia/produtos/badenbadencristal.jpg" },
            { nome: "LAGUNITAS IPA", desc: "IPA encorpada e marcante.", preco: ["13.00"], img: "midia/produtos/lagunitasipa.jpg" },
            { nome: "BLUE MOON", desc: "Cerveja especial refrescante com notas cítricas suaves.", preco: ["16.00"], img: "midia/produtos/bluemoon.jpg" }
        ]
    },
    
    cervejaslata: {
        titulo: "CERVEJAS LATA / LATÃO",
        itens: [
            { nome: "AMSTEL - LATÃO", desc: "Cerveja leve e refrescante.", preco: ["6.50"], img: "midia/produtos/amstellatao.jpg" },
            { nome: "DEVASSA - LATÃO", desc: "Cerveja gelada e saborosa.", preco: ["6.50"], img: "midia/produtos/devassalatao.jpg" },
            { nome: "HEINEKEN - LATA", desc: "Puro malte bem gelada.", preco: ["8.00"], img: "midia/produtos/heinekenlata.jpg" },
            { nome: "HEINEKEN S/ ÁLCOOL - LATA", desc: "Mesmo sabor sem álcool.", preco: ["8.00"], img: "midia/produtos/heinekensemalcoollata.jpg" }
        ]
    },
    
    cachacas: {
        titulo: "CACHAÇAS",
        itens: [
            { nome: "MATUTA UMBURANA", desc: "Cachaça artesanal com sabor marcante.", preco: ["7.00"], img: "midia/produtos/matutaumbarana.jpg" },
            { nome: "PITÚ", desc: "Clássica cachaça pernambucana.", preco: ["4.00"], img: "midia/produtos/pitu.jpg" },
            { nome: "PITÚ GOLD", desc: "Versão premium envelhecida.", preco: ["6.00"], img: "midia/produtos/pitugold.jpg" },
            { nome: "BANANAZINHA", desc: "Licor doce e tradicional.", preco: ["8.00"], img: "midia/produtos/bananazinha.jpg" },
            { nome: "GERMANA", desc: "Cachaça artesanal premium.", preco: ["10.00"], img: "midia/produtos/germana.jpg" },
            { nome: "SALINAS", desc: "Cachaça tradicional e bem reconhecida.", preco: ["8.00"], img: "midia/produtos/salinas.jpg" },
            { nome: "YPIÓCA OURO", desc: "Envelhecida e com sabor marcante.", preco: ["7.00"], img: "midia/produtos/ypiocaouro.jpg" },
            { nome: "YPIÓCA", desc: "Clássica e tradicional.", preco: ["6.00"], img: "midia/produtos/ypioca.jpg" },
            { nome: "ALCATRÃO", desc: "Bebida forte e tradicional.", preco: ["6.00"], img: "midia/produtos/alcatrao.jpg" },
            { nome: "SELETA", desc: "Sabor suave e tradicional.", preco: ["8.00"], img: "midia/produtos/seleta.jpg" }
        ]
    },
    
    destilados: {
        titulo: "DESTILADOS (DOSE)",
        itens: [
            { nome: "JOHNNIE RED", desc: "Dose de whisky clássico e marcante.", preco: ["8.00"], img: "midia/produtos/johnniered.jpg" },
            { nome: "OLD PARR", desc: "Whisky premium suave e encorpado.", preco: ["12.00"], img: "midia/produtos/oldparr.jpg" },
            { nome: "BLACK & WHITE", desc: "Whisky tradicional com sabor equilibrado.", preco: ["7.00"], img: "midia/produtos/blackewhite.jpg" },
            { nome: "WHITE HORSE", desc: "Whisky clássico e intenso.", preco: ["7.00"], img: "midia/produtos/whitehorse.jpg" },
            { nome: "SMIRNOFF", desc: "Dose de vodka gelada.", preco: ["7.00"], img: "midia/produtos/sminorff.jpg" },
            { nome: "GIN GORDON'S", desc: "Dose de gin clássico.", preco: ["8.00"], img: "midia/produtos/gingordons.jpg" },
            { nome: "GIN TANQUERAY", desc: "Gin premium com sabor marcante.", preco: ["10.00"], img: "midia/produtos/gintaqueray.jpg" }
        ]
    },
    
    drinks: {
        titulo: "DRINKS",
        itens: [
            { nome: "GORDON'S E TÔNICA", desc: "Gin Gordon's com água tônica gelada.", preco: ["16.00"], img: "midia/produtos/gordonsetonica.jpg" },
            { nome: "SMIRNOFF CAIPIROSKA", desc: "Vodka Smirnoff com frutas e gelo.", preco: ["13.00"], img: "midia/produtos/sminoffcaipirosca.jpg" },
            { nome: "CAIPIRINHA", desc: "Clássica com limão, açúcar e cachaça.", preco: ["10.00"], img: "midia/produtos/caipirinha.jpg" },
            { nome: "CAIPIRINHA DOURADA", desc: "Versão especial com cachaça premium.", preco: ["13.00"], img: "midia/produtos/caipirinhadourada.jpg" },
            { nome: "JOHNNIE RED HIGHBALL", desc: "Whisky Johnnie Red com mixer gelado.", preco: ["15.90"], img: "midia/produtos/johnnieredhighball.jpg" },
            { nome: "BLONDE CITRUS", desc: "Drink cítrico e refrescante.", preco: ["16.90"], img: "midia/produtos/blondecitrus.jpg" }
        ]
    },
    
    vinhos: {
        titulo: "VINHOS",
        itens: [
            { nome: "PÉRGOLA", desc: "Vinho suave e tradicional.", preco: ["30.00"], img: "midia/produtos/pergola.jpg" },
            { nome: "QUINTA DO MORGADO", desc: "Vinho leve e acessível.", preco: ["20.00"], img: "midia/produtos/quintadomorgado.jpg" },
            { nome: "RESERVADO MALBEC", desc: "Vinho encorpado com notas marcantes.", preco: ["45.00"], img: "midia/produtos/reservadomalbec.jpg" },
            { nome: "RESERVADO CABERNET", desc: "Vinho equilibrado e sofisticado.", preco: ["45.00"], img: "midia/produtos/reservadocabernet.jpg" },
            { nome: "CHILANO CABERNET", desc: "Vinho chileno com sabor marcante.", preco: ["45.00"], img: "midia/produtos/chilanocabernet.jpg" },
            
        ]
    },
    
    ices: {
        titulo: "ICE",
        itens: [
            { nome: "SMIRNOFF ICE", desc: "Bebida ice leve e refrescante.", preco: ["10.00"], img: "midia/produtos/smirnoffice.jpg" },
            { nome: "SKOL BEATS", desc: "Drink pronto gelado e saboroso.", preco: ["9.00"], img: "midia/produtos/skolbeats.jpg" },
            { nome: "SKOL BEATS GT", desc: "Versão gin tonic pronta para beber.", preco: ["10.00"], img: "midia/produtos/skolbeatsgt.webp" }
        ]
    }
};

// Função para criar um item do cardápio
// Função para criar um item do cardápio COM div clicável para 3D
function criarItem(item) {
    // Verifica se tem modelo 3D
    const tem3D = item.modelo3d && typeof abrirVisualizador3D === 'function';
    
    // ========== LÓGICA DE PREÇOS ==========
    let precosHTML = '';
    
    if (Array.isArray(item.preco)) {
        // Caso tenha dois preços
        if (item.preco.length === 2) {
            if (typeof item.preco[0] === 'object') {
                // Com labels (ex: [{label: "Copo", valor: "5.00"}, {label: "Jarra", valor: "15.00"}])
                precosHTML = `
                    <div class="container-price">
                        <span class="preco-esculpido" style="display: inline-flex; flex-direction: column; align-items: center; line-height: 1.2;">
                            <span style="font-size: 0.7em; font-weight: normal; color: #888;">${item.preco[0].label}</span>
                            <span>R$ ${item.preco[0].valor}</span>
                        </span>
                        <span class="preco-esculpido" style="display: inline-flex; flex-direction: column; align-items: center; line-height: 1.2;">
                            <span style="font-size: 0.7em; font-weight: normal; color: #888;">${item.preco[1].label}</span>
                            <span>R$ ${item.preco[1].valor}</span>
                        </span>
                    </div>
                `;
            } else {
                // Sem labels (ex: ["5.00", "15.00"])
                precosHTML = `
                    <div class="container-price">
                        <span class="preco-esculpido">R$ ${item.preco[0]}</span>
                        <span class="preco-esculpido">R$ ${item.preco[1]}</span>
                    </div>
                `;
            }
        } else if (item.preco.length === 1 && typeof item.preco[0] === 'object') {
            // Um preço com label
            precosHTML = `
                <span class="preco-esculpido" style="display: inline-flex; flex-direction: column; align-items: center; line-height: 1.2;">
                    <span style="font-size: 0.7em; font-weight: normal; color: #888;">${item.preco[0].label}</span>
                    <span>R$ ${item.preco[0].valor}</span>
                </span>
            `;
        } else {
            // Três ou mais preços
            precosHTML = `
                <div class="container-price">
                    ${item.preco.map(p => {
            if (typeof p === 'object') {
                return `
                                <span class="preco-esculpido" style="display: inline-flex; flex-direction: column; align-items: center; line-height: 1.2;">
                                    <span style="font-size: 0.7em; font-weight: normal; color: #888;">${p.label}</span>
                                    <span>R$ ${p.valor}</span>
                                </span>
                            `;
            } else {
                return `<span class="preco-esculpido">R$ ${p}</span>`;
            }
        }).join('')}
                </div>
            `;
    }
} else if (typeof item.preco === 'string') {
    // Formato antigo: string única
    precosHTML = `<span class="preco-esculpido">R$ ${item.preco}</span>`;
} else {
    // Fallback
    precosHTML = `<span class="preco-esculpido">Consulte</span>`;
}

// ========== RETORNO HTML ==========
return `
        <div class="item-esculpido">
            <div class="foto-produto" style="position: relative; ${tem3D ? 'cursor: pointer;' : ''}" 
                 ${tem3D ? `onclick="event.stopPropagation(); abrirVisualizador3D('${item.modelo3d}', '${item.nome.replace(/'/g, "\\'")}')"` : ''} 
                 ${tem3D ? `title="Clique para ver em 3D"` : ''}>
                <img src="${item.img}" alt="${item.nome}" loading="lazy">
                ${tem3D ? `
                    <span class="badge-3d" onclick="event.stopPropagation(); abrirVisualizador3D('${item.modelo3d}', '${item.nome.replace(/'/g, "\\'")}')" title="Ver em 3D">
                        3D
                    </span>
                ` : ''}
            </div>
            <div class="item-info">
                <div class="nome-desc">
                    <h3>${item.nome}</h3>
                    <p>${item.desc}</p>
                </div>
                ${precosHTML}
            </div>
        </div>
    `;
}

// Função para criar uma seção completa
function criarSecao(id, categoria) {
    return `
        <section class="categoria">
            <h2 class="titulo-categoria" id="${id}">${categoria.titulo}</h2>
            <div class="itens-entalhados">
                ${categoria.itens.map(item => criarItem(item)).join('')}
            </div>
        </section>
    `;
}

// Função para gerar todo o cardápio
function gerarCardapio() {
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(gerarCardapio, 100);
        });
        return;
    }
    
    const footer = document.querySelector('.footer-tabua');
    
    if (!footer) {
        console.error('❌ Elemento .footer-tabua não encontrado!');
        return;
    }
    
    // Remove todas as seções existentes
    const secoesExistentes = document.querySelectorAll('.categoria');
    secoesExistentes.forEach(secao => secao.remove());
    
    // Adiciona as novas seções ANTES do footer
    Object.entries(cardapio).forEach(([id, categoria]) => {
        const secaoHTML = criarSecao(id, categoria);
        footer.insertAdjacentHTML('beforebegin', secaoHTML);
    });
    
    console.log('✅ Cardápio gerado com sucesso! Itens:',
        Object.values(cardapio).reduce((acc, cat) => acc + cat.itens.length, 0));
    }
    
    // Executar após o DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', gerarCardapio);
    } else {
        gerarCardapio();
    }
    
    // Inicializa quando o DOM estiver pronto
    document.addEventListener('DOMContentLoaded', gerarCardapio);
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // ============ VISUALIZADOR 3D INTEGRADO ============
    
    // Variáveis do visualizador
    let viewer3D = {
        scene: null,
        camera: null,
        renderer: null,
        model: null,
        isDragging: false,
        prevX: 0,
        prevY: 0,
        rotX: 0,
        rotY: 0,
        zoom: 5,
        animationId: null
    };
    
    // Criar modal se não existir
    function criarModal3D() {
        if (document.getElementById('modal-3d')) return;
        
        const modal = document.createElement('div');
        modal.id = 'modal-3d';
        modal.className = 'modal-3d';
        modal.innerHTML = `
        <div class="modal-3d-overlay" onclick="fecharVisualizador3D()"></div>
        <div class="modal-3d-content">
            <div class="modal-3d-header">
                <h3 id="modal-3d-title">Produto 3D</h3>
                <button class="modal-3d-close" onclick="fecharVisualizador3D()">✕</button>
            </div>
            <div id="modal-3d-viewer" class="modal-3d-viewer"></div>
        </div>
    `;
        document.body.appendChild(modal);
    }
    
    // Abrir visualizador
    function abrirVisualizador3D(modelUrl, nome) {
        criarModal3D();
        
        const modal = document.getElementById('modal-3d');
        const title = document.getElementById('modal-3d-title');
        const viewerContainer = document.getElementById('modal-3d-viewer');
        
        title.textContent = nome || 'Visualização 3D';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Limpar container
        viewerContainer.innerHTML = '';
        
        // Iniciar Three.js
        iniciarThreeJS(viewerContainer, modelUrl);
    }
    
    // Fechar visualizador
    function fecharVisualizador3D() {
        const modal = document.getElementById('modal-3d');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Parar animação
        if (viewer3D.animationId) {
            cancelAnimationFrame(viewer3D.animationId);
            viewer3D.animationId = null;
        }
        
        // Limpar modelo
        if (viewer3D.model && viewer3D.scene) {
            viewer3D.scene.remove(viewer3D.model);
            viewer3D.model = null;
        }
    }
    
    // Iniciar Three.js
    function iniciarThreeJS(container, modelUrl) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        // Scene
        viewer3D.scene = new THREE.Scene();
        
        // Camera
        viewer3D.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
        viewer3D.camera.position.z = viewer3D.zoom;
        
        // Renderer
        viewer3D.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        viewer3D.renderer.setSize(width, height);
        viewer3D.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        viewer3D.renderer.setClearColor(0x000000, 0);
        container.appendChild(viewer3D.renderer.domElement);
        
        // Luzes
        const ambient = new THREE.AmbientLight(0xffffff, 0.8);
        viewer3D.scene.add(ambient);
        
        const directional = new THREE.DirectionalLight(0xffffff, 0.8);
        directional.position.set(1, 1, 1);
        viewer3D.scene.add(directional);
        
        const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
        backLight.position.set(-1, -1, -1);
        viewer3D.scene.add(backLight);
        
        // Carregar modelo
        carregarModelo3D(modelUrl, container);
        
        // Eventos
        bindEventos3D(viewer3D.renderer.domElement);
        
        // Iniciar animação
        animar3D();
        
        // Resize
        window.addEventListener('resize', () => {
            if (viewer3D.camera && viewer3D.renderer) {
                const w = container.clientWidth;
                const h = container.clientHeight;
                viewer3D.camera.aspect = w / h;
                viewer3D.camera.updateProjectionMatrix();
                viewer3D.renderer.setSize(w, h);
            }
        });
    }
    
    // Carregar modelo 3D
    function carregarModelo3D(url, container) {
        // Remover modelo anterior
        if (viewer3D.model) {
            viewer3D.scene.remove(viewer3D.model);
        }
        
        // Modelo fallback
        const geo = new THREE.BoxGeometry(1, 1, 1);
        const mat = new THREE.MeshStandardMaterial({
            color: 0xe94560,
            roughness: 0.3,
            metalness: 0.7
        });
        viewer3D.model = new THREE.Mesh(geo, mat);
        viewer3D.scene.add(viewer3D.model);
        
        // Tentar carregar GLB
        if (url && typeof THREE.GLTFLoader !== 'undefined') {
            const loader = new THREE.GLTFLoader();
            loader.load(url,
                (gltf) => {
                    viewer3D.scene.remove(viewer3D.model);
                    viewer3D.model = gltf.scene;
                    
                    // Centralizar
                    const box = new THREE.Box3().setFromObject(viewer3D.model);
                    const center = box.getCenter(new THREE.Vector3());
                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    
                    if (maxDim > 0) {
                        viewer3D.model.scale.setScalar(3 / maxDim);
                        viewer3D.model.position.sub(center.multiplyScalar(3 / maxDim));
                    }
                    
                    viewer3D.scene.add(viewer3D.model);
                },
                undefined,
                () => console.log('Usando modelo padrão')
            );
        }
    }
    
    // Eventos de mouse/touch
    function bindEventos3D(canvas) {
        canvas.addEventListener('mousedown', (e) => {
            viewer3D.isDragging = true;
            viewer3D.prevX = e.clientX;
            viewer3D.prevY = e.clientY;
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!viewer3D.isDragging) return;
            viewer3D.rotY += (e.clientX - viewer3D.prevX) * 0.01;
            viewer3D.rotX += (e.clientY - viewer3D.prevY) * 0.01;
            viewer3D.prevX = e.clientX;
            viewer3D.prevY = e.clientY;
        });
        
        canvas.addEventListener('mouseup', () => viewer3D.isDragging = false);
        canvas.addEventListener('mouseleave', () => viewer3D.isDragging = false);
        
        canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            viewer3D.zoom += e.deltaY * 0.01;
            viewer3D.zoom = Math.max(2, Math.min(15, viewer3D.zoom));
        });
        
        // Touch
        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                viewer3D.isDragging = true;
                viewer3D.prevX = e.touches[0].clientX;
                viewer3D.prevY = e.touches[0].clientY;
            }
        });
        
        canvas.addEventListener('touchmove', (e) => {
            if (!viewer3D.isDragging || e.touches.length !== 1) return;
            viewer3D.rotY += (e.touches[0].clientX - viewer3D.prevX) * 0.01;
            viewer3D.rotX += (e.touches[0].clientY - viewer3D.prevY) * 0.01;
            viewer3D.prevX = e.touches[0].clientX;
            viewer3D.prevY = e.touches[0].clientY;
        });
        
        canvas.addEventListener('touchend', () => viewer3D.isDragging = false);
    }
    
    // Animação
    function animar3D() {
        viewer3D.animationId = requestAnimationFrame(animar3D);
        
        if (viewer3D.model) {
            viewer3D.rotY += 0.003; // Auto-rotação suave
            viewer3D.model.rotation.x += (viewer3D.rotX - viewer3D.model.rotation.x) * 0.1;
            viewer3D.model.rotation.y += (viewer3D.rotY - viewer3D.model.rotation.y) * 0.1;
        }
        
        viewer3D.camera.position.z += (viewer3D.zoom - viewer3D.camera.position.z) * 0.1;
        viewer3D.renderer.render(viewer3D.scene, viewer3D.camera);
    }
    
    // Exportar funções globais
    window.abrirVisualizador3D = abrirVisualizador3D;
    window.fecharVisualizador3D = fecharVisualizador3D;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    function gerarCardapio() {
        // Aguarda o DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(gerarCardapio, 100);
            });
            return;
        }
        
        const footer = document.querySelector('.footer-tabua');
        
        if (!footer) {
            console.error('❌ Elemento .footer-tabua não encontrado!');
            return;
        }
        
        // Remove todas as seções existentes
        const secoesExistentes = document.querySelectorAll('.categoria');
        secoesExistentes.forEach(secao => secao.remove());
        
        // Adiciona as novas seções ANTES do footer
        Object.entries(cardapio).forEach(([id, categoria]) => {
            const secaoHTML = criarSecao(id, categoria);
            footer.insertAdjacentHTML('beforebegin', secaoHTML);
        });
        
        console.log('✅ Cardápio gerado com sucesso! Itens:',
            Object.values(cardapio).reduce((acc, cat) => acc + cat.itens.length, 0));
        }
        
        // Verificar se Three.js carregou
        function verificarDependencias() {
            if (typeof THREE === 'undefined') {
                console.warn('⚠️ Three.js não carregou - visualizador 3D não funcionará');
            }
            if (typeof THREE !== 'undefined' && typeof THREE.GLTFLoader === 'undefined') {
                console.warn('⚠️ GLTFLoader não carregou - modelos GLB não funcionarão');
            }
        }
        
        // Inicializa quando o DOM estiver pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                verificarDependencias();
                gerarCardapio();
            });
        } else {
            // DOM já carregou
            verificarDependencias();
            gerarCardapio();
        }
        
        
        
        
        
        
// pre-processamento:


function preCarregarTudo() {
    // Imagens
    const imagens = [];
    const modelos = [];
    
    Object.values(cardapio).forEach(categoria => {
        categoria.itens.forEach(item => {
            // Imagens
            if (item.img && !imagens.includes(item.img)) {
                imagens.push(item.img);
                const linkImg = document.createElement('link');
                linkImg.rel = 'preload';
                linkImg.as = 'image';
                linkImg.href = item.img;
                document.head.appendChild(linkImg);
            }
            
            // Modelos 3D
            if (item.modelo3d && !modelos.includes(item.modelo3d)) {
                modelos.push(item.modelo3d);
                const linkModel = document.createElement('link');
                linkModel.rel = 'preload';
                linkModel.as = 'fetch';
                linkModel.href = item.modelo3d;
                document.head.appendChild(linkModel);
            }
        });
    });
    
    console.log(`🖼️ Pré-carregando ${imagens.length} imagens...`);
    console.log(`🎨 Pré-carregando ${modelos.length} modelos 3D...`);
    
}

// Executa 3 segundos após a página carregar
setTimeout(preCarregarTudo, 3000);
