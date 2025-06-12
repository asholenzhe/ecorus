import { useState, useEffect } from 'react';

export function useYandexApi(apiKey: string, lang: string = 'ru_RU') {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if ((window as any).ymaps) {
            setLoaded(true);
            return;
        }

        const callbackName = '__ymapsInitCallback_' + Date.now();
        (window as any)[callbackName] = () => {
            setLoaded(true);
            delete (window as any)[callbackName];
        };

        const script = document.createElement('script');
        let src = `https://api-maps.yandex.ru/2.1/?lang=${lang}&onload=${callbackName}`;
        if (apiKey) {
            src += `&apikey=${apiKey}`;
        }
        script.src = src;
        script.type = 'text/javascript';
        script.async = true;
        script.onerror = () => {
            setError(new Error('Failed to load Yandex Maps API'));
        };
        document.head.appendChild(script);

        return () => {
        };
    }, [apiKey, lang]);

    return { loaded, error };
}
