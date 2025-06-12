import React, { useRef, useEffect } from 'react';
import { useYandexApi } from '../../hooks/useYandexApi';

interface PointData {
    id: number;
    coords: [number, number];
    hint?: string;
    balloonHeader?: string;
    balloonBody?: string;
}

interface YandexMapProps {
    apiKey?: string;
    center: [number, number];
    zoom: number;
    points?: PointData[];
    activeId?: number | null;
    onPointClick?: (id: number, coords: [number, number]) => void;
    className?: string;
    style?: React.CSSProperties;
}

const ICON_SIZE: [number, number] = [40, 40];
const ICON_OFFSET: [number, number] = [-20, -40];
const ICONS = {
    active: '/src/assets/active-marker.svg',
    inactive: '/src/assets/inactive-marker.svg',
};

export const YandexMap: React.FC<YandexMapProps> = ({apiKey = '', center, zoom, points = [], activeId = null, onPointClick, className, style,}) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const { loaded, error } = useYandexApi(apiKey);

    useEffect(() => {
        if (!loaded || error || !mapContainerRef.current) return;
        if ((mapContainerRef.current as any)._initialized) return;

        const ymaps = (window as any).ymaps;
        ymaps.ready(() => {
            if (!mapContainerRef.current) return;

            const map = new ymaps.Map(
                mapContainerRef.current,
                { center, zoom, behaviors: ['drag', 'scrollZoom', 'dblClickZoom', 'multiTouch'] },
                { controls: [], suppressMapOpenBlock: true }
            );

            [
                'zoomControl',
                'typeSelector',
                'searchControl',
                'fullscreenControl',
                'geolocationControl',
                'trafficControl',
                'rulerControl',
            ].forEach((name) => {
                try { map.controls.remove(name); } catch {}
            });
            try { map.behaviors.disable('contextMenu'); } catch {}

            mapRef.current = map;
            (mapContainerRef.current as any)._initialized = true;

            if (!onPointClick) {
                console.warn('YandexMap: onPointClick not provided, точки не кликабельны');
            }
        });
    }, [loaded, error, center, zoom, onPointClick]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        map.geoObjects.removeAll();

        points.forEach((pt) => {
            const isActive = pt.id === activeId;
            const iconHref = isActive ? ICONS.active : ICONS.inactive;

            const placemark = new (window as any).ymaps.Placemark(
                pt.coords,
                {
                    hintContent: pt.hint,
                    balloonContentHeader: pt.balloonHeader,
                    balloonContentBody: pt.balloonBody,
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: iconHref,
                    iconImageSize: ICON_SIZE,
                    iconImageOffset: ICON_OFFSET,
                    cursor: 'pointer',
                }
            );

            placemark.events.add('click', () => {
                onPointClick?.(pt.id, pt.coords);
            });

            map.geoObjects.add(placemark);
        });
    }, [points, activeId, onPointClick]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map || activeId == null) return;

        const target = points.find((pt) => pt.id === activeId);
        if (target) {
            const focusZoom = zoom + 11;
            map.setCenter(target.coords, focusZoom, { duration: 300 });
        }
    }, [activeId, points, zoom]);

    if (error) {
        return <div style={style}>Ошибка загрузки Яндекс.Карт</div>;
    }

    return <div ref={mapContainerRef} className={className} style={style} />;
};
