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
// Instalação
self.addEventListener('install', event => {
    console.log('🔧 Service Worker instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('📦 Cache aberto, adicionando arquivos...');
                return cache.addAll(ARQUIVOS_PARA_CACHEAR);
            })
            .catch(erro => {
                console.error('❌ Erro no cache:', erro);
            })
    );
    self.skipWaiting();
});

// Ativação
self.addEventListener('activate', event => {
    console.log('✅ Service Worker ativado!');
    event.waitUntil(self.clients.claim());
});

// Intercepta requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(resposta => {
                if (resposta) {
                    console.log('📦 Cache:', event.request.url);
                    return resposta;
                }
                console.log('🌎 Rede:', event.request.url);
                return fetch(event.request);
            })
            .catch(erro => {
                console.error('❌ Erro no fetch:', erro);
                return new Response('Erro ao carregar', { status: 500 });
            })
    );
});