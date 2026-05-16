// Nome da "caixa" onde as imagens ficam guardadas
// Mude a versão (v2, v3) quando quiser forçar atualização
const CACHE_NAME = 'cardapio-v1';

// Lista de arquivos que SEMPRE serão baixados na primeira visita
const ARQUIVOS_ESSENCIAIS = [
    '/',                    // a página principal
    '/cardapio.html',       // o HTML
    '/cardapio.js',         // seu JavaScript
    '/css/cardapio.css',     // o estilo
    '/midia',   //midia
    '/modelos'  //modelos 3D's
];

// Quais tipos de arquivo serão salvos automaticamente
const EXTENSOES_CACHE = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'glb'];

// Função que decide se um arquivo merece ser salvo
function deveCachear(url) {
    // Verifica se a URL termina com alguma extensão da lista
    return EXTENSOES_CACHE.some(ext => url.toLowerCase().includes(ext));
}

// ----- PASSO 1: INSTALAÇÃO -----
// Acontece quando o usuário acessa o site pela PRIMEIRA vez
self.addEventListener('install', event => {
    console.log('🔧 Service Worker instalando...');
    
    // Espera até que todos os arquivos essenciais sejam salvos
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            // Tenta salvar todos os arquivos essenciais
            return cache.addAll(ARQUIVOS_ESSENCIAIS).catch(err => {
                console.log('⚠️ Erro ao cachear:', err);
            });
        })
    );
    
    // Força o Service Worker a ativar IMEDIATAMENTE
    self.skipWaiting();
});

// ----- PASSO 2: ATIVAÇÃO -----
// Limpa caches antigos (quando você muda a versão do CACHE_NAME)
self.addEventListener('activate', event => {
    console.log('✅ Service Worker ativado!');
    
    event.waitUntil(
        caches.keys().then(keys => {
            // Deleta qualquer cache que não seja o atual
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        })
    );
    
    self.clients.claim();
});

// ----- PASSO 3: INTERCEPTAÇÃO -----
// A MAGIA ACONTECE AQUI!
// Toda vez que o site pede um arquivo (imagem, modelo 3D, etc)
self.addEventListener('fetch', event => {
    const url = event.request.url;
    
    // Só cacheia arquivos do seu próprio site
    if (!url.includes('github.io') && !url.includes('localhost')) {
        return; // ignora arquivos de outros sites
    }
    
    // Se for imagem ou modelo 3D
    if (deveCachear(url)) {
        event.respondWith(
            // PASSO 3.1: TENTA BUSCAR NO CACHE PRIMEIRO
            caches.match(event.request).then(respostaCache => {
                if (respostaCache) {
                    // ✅ ACHOU NO CACHE! Entrega sem usar internet
                    console.log('📦 Cache HIT:', url.split('/').pop());
                    return respostaCache;
                }
                
                // ❌ NÃO ACHOU NO CACHE
                console.log('🌎 Cache MISS:', url.split('/').pop());
                
                // PASSO 3.2: BUSCA NA INTERNET
                return fetch(event.request).then(respostaRede => {
                    // Se baixou com sucesso
                    if (respostaRede && respostaRede.status === 200) {
                        // Guarda uma cópia no cache para a próxima vez
                        const respostaClone = respostaRede.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(event.request, respostaClone);
                        });
                    }
                    return respostaRede;
                });
            })
        );
    }
});