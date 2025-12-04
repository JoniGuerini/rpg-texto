import { useState, useEffect } from 'react';

const BUILD_TIME = typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : null;
const VERSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutos

export const useVersionCheck = () => {
    const [newVersionAvailable, setNewVersionAvailable] = useState(false);
    const [isReloading, setIsReloading] = useState(false);

    useEffect(() => {
        // Verifica se acabamos de fazer reload intencional
        const justReloaded = sessionStorage.getItem('app_just_reloaded');
        if (justReloaded === 'true') {
            sessionStorage.removeItem('app_just_reloaded');
            // Não mostrar aviso se acabamos de recarregar intencionalmente
            return;
        }

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
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                });
                
                const html = await response.text();
                
                // Extrai os nomes dos arquivos JS/CSS do HTML (mais confiável que hash completo)
                const jsMatches = html.match(/src="[^"]*\/assets\/index-[^"]+\.js"/g);
                const cssMatches = html.match(/href="[^"]*\/assets\/index-[^"]+\.css"/g);
                
                const currentAssets = [...(jsMatches || []), ...(cssMatches || [])].join('|');
                const storedAssets = localStorage.getItem('app_assets');
                
                if (storedAssets && storedAssets !== currentAssets && currentAssets) {
                    // Nova versão detectada!
                    setNewVersionAvailable(true);
                } else if (!storedAssets && currentAssets) {
                    // Primeira vez, salva os assets atuais
                    localStorage.setItem('app_assets', currentAssets);
                }
            } catch (error) {
                console.error('Erro ao verificar nova versão:', error);
            }
        };

        // Aguarda 3 segundos antes da primeira verificação (deixa o app carregar)
        const initialCheck = setTimeout(checkForNewVersion, 3000);

        // Verifica periodicamente
        const interval = setInterval(checkForNewVersion, VERSION_CHECK_INTERVAL);

        return () => {
            clearTimeout(initialCheck);
            clearInterval(interval);
        };
    }, []);

    const reloadApp = async () => {
        try {
            // Oculta o card imediatamente
            setIsReloading(true);
            setNewVersionAvailable(false);
            
            // Busca a versão mais recente
            const response = await fetch(window.location.href, {
                cache: 'no-cache',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache'
                }
            });
            
            const html = await response.text();
            
            // Extrai e salva os novos assets ANTES de recarregar
            const jsMatches = html.match(/src="[^"]*\/assets\/index-[^"]+\.js"/g);
            const cssMatches = html.match(/href="[^"]*\/assets\/index-[^"]+\.css"/g);
            const newAssets = [...(jsMatches || []), ...(cssMatches || [])].join('|');
            
            if (newAssets) {
                localStorage.setItem('app_assets', newAssets);
            }
            
            // Marca que fizemos reload intencional
            sessionStorage.setItem('app_just_reloaded', 'true');
            
            // Limpa o cache
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(cacheNames.map(name => caches.delete(name)));
            }
            
            // Recarrega com força
            window.location.reload(true);
        } catch (error) {
            console.error('Erro ao recarregar:', error);
            // Força reload mesmo com erro
            sessionStorage.setItem('app_just_reloaded', 'true');
            window.location.reload(true);
        }
    };

    return { newVersionAvailable, reloadApp, isReloading };
};

