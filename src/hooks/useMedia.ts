import { useEffect, useState } from 'react';

export function useMedia(query: string): boolean {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
    useEffect(() => {
        const mql = window.matchMedia(query);
        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        mql.addEventListener('change', listener);
        return () => mql.removeEventListener('change', listener);
    }, [query]);
    return matches;
}
