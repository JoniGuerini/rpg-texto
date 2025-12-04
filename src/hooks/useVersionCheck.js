import { useState, useEffect } from 'react';

const BUILD_TIME = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : null;
const VERSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos

export const useVersionCheck = () => {
    const [newVersionAvailable, setNewVersionAvailable] = useState(false);

    useEffect(() => {
        // Salva a versão atual no localStorage na primeira vez
        const storedBuildTime = localStorage.getItem('app_build_time');
        
        if (!storedBuildTime && BUILD_TIME) {
            localStorage.setItem('app_build_time', BUILD_TIME);
        }

        // Função para verificar nova versão
        const checkForNewVersion = async () => {
            try {
                // Força o navegador a buscar o HTML mais recente (sem cache)
                const response = await fetch(window.location.href, {
                    cache: 'no-cache',
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache'
                    }
                });
                
                const html = await response.text();
                
                // Verifica se o HTML mudou (indicativo de nova versão)
                const currentHash = localStorage.getItem('app_html_hash');
                const newHash = simpleHash(html);
                
                if (currentHash && currentHash !== newHash) {
                    setNewVersionAvailable(true);
                } else if (!currentHash) {
                    localStorage.setItem('app_html_hash', newHash);
                }
            } catch (error) {
                console.error('Erro ao verificar nova versão:', error);
            }
        };

        // Verifica imediatamente
        checkForNewVersion();

        // Verifica periodicamente
        const interval = setInterval(checkForNewVersion, VERSION_CHECK_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const reloadApp = () => {
        // Limpa o cache e recarrega
        if ('caches' in window) {
            caches.keys().then((names) => {
                names.forEach(name => caches.delete(name));
            });
        }
        window.location.reload(true);
    };

    return { newVersionAvailable, reloadApp };
};

// Função simples de hash
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

