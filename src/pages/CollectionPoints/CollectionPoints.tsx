import React, { useEffect, useState, useRef } from 'react';
import './points.css';
import { fetchCities, fetchStorePoints } from '../../api/city';
import { Dropdown } from '../../components/Points/DropDown';
import type { Option } from '../../components/Points/DropDown';
import { PointList } from '../../components/Points/PointsList';
import { PointDetails } from '../../components/Points/PointDetails';
import type { PointsItemProps } from '../../components/Points/PointsItem';
import { YandexMap } from '../../components/YandexMap/YandexMap';

interface CityRaw { id: number; name: string; }
interface StoreRaw {
    id: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;
}
interface RawPoint {
    id: number;
    lat: number;
    lng: number;
    address: string;
    phone: string;
    cityName: string;
    shopName: string;
    materials: string[];
    imageUrl: string;
    schedule?: string;
}

export const CollectionPoints: React.FC = () => {
    const [points, setPoints] = useState<RawPoint[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [shopFilter, setShopFilter] = useState<string[]>([]);
    const [materialFilter, setMaterialFilter] = useState<string[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const mapRef = useRef<any>(null);
    const defaultCenter: [number, number] = [55.76, 37.62];
    const defaultZoom = 5;

    useEffect(() => {
        let alive = true;
        fetchCities()
            .then((cities: CityRaw[]) =>
                Promise.all(cities.map(c =>
                    fetchStorePoints(c.id).then((stores: StoreRaw[]) =>
                        stores.map(s => ({
                            id: s.id,
                            lat: s.latitude,
                            lng: s.longitude,
                            address: s.address,
                            phone: s.phone,
                            cityName: c.name,
                            shopName: s.name,
                            materials: ['Пластик','Стекло','Бумага'],
                            imageUrl: '/src/assets/point-img.svg',
                            schedule: 'Пн-Пт 08:00-20:00, Сб-Вс 10:00-18:00',
                        }))
                    )
                ))
            )
            .then(nested => {
                if (!alive) return;
                setPoints(nested.flat());
            })
            .catch(console.error)
            .finally(() => { if (alive) setLoading(false); });
        return () => { alive = false; };
    }, []);

    const filteredPoints = points.filter(p =>
        p.address.toLowerCase().includes(search.toLowerCase()) &&
        (!shopFilter.length || shopFilter.includes(p.shopName)) &&
        (!materialFilter.length || p.materials.some(m => materialFilter.includes(m)))
    );

    const shopOptions: Option[] = Array.from(new Set(points.map(p => p.shopName)))
        .map(name => ({ label: name, value: name }));
    const materialOptions: Option[] = Array.from(new Set(points.flatMap(p => p.materials)))
        .map(m => ({ label: m, value: m }));

    const listItems: PointsItemProps[] = filteredPoints.map(p => ({
        id: p.id,
        imageSrc: p.imageUrl,
        address: `${p.cityName}: ${p.address}`,
        materials: p.materials
    }));

    const flyToPoint = (coords: [number, number], zoomLevel = 10) => {
        mapRef.current?.setCenter(coords, zoomLevel, { duration: 300 });
    };

    const toggleFilter = () => setIsFilterOpen(v => !v);

    if (loading) {
        return <div className="loading">Загрузка данных...</div>;
    }

    return (
        <div className="collection-points">
            <YandexMap
                apiKey={''}
                center={defaultCenter}
                zoom={defaultZoom}
                points={filteredPoints.map(p => ({
                    id: p.id,
                    coords: [p.lat, p.lng],
                    hint: `${p.cityName}: ${p.address}`,
                    balloonHeader: `<strong>${p.cityName}: ${p.address}</strong>`,
                    balloonBody: `
            ${p.schedule ? `<p>Расписание: ${p.schedule}</p>` : ''}
            ${p.materials.length ? `<p>Материалы: ${p.materials.join(', ')}</p>` : ''}
            <p>Телефон: ${p.phone}</p>
          `,
                }))}
                activeId={activeId}
                onPointClick={(id, coords) => {
                    setActiveId(id);
                    flyToPoint(coords, defaultZoom + 2);
                }}
                className="collection-points__map"
            />

            <div className="collection-points__overlay-ui">
                <div className="collection-points__sidebar">
                    <div className="points__nav">
                        <label className="points__search">
                            <img src="/src/assets/search-icon.svg" alt="Search icon"/>
                            <input
                                type="text"
                                placeholder="Поиск по адресу"
                                className="points__input"
                                value={search}
                                onChange={e => { setSearch(e.target.value); setActiveId(null); }}
                            />
                        </label>

                        <button className="filter-btn" onClick={toggleFilter}>
                            <img src="/src/assets/filter-icon.svg" alt="Filter"/>
                        </button>

                        <Dropdown
                            wrapperClass="points__shops"
                            title={`Магазины (${shopFilter.length})`}
                            options={shopOptions}
                            selected={shopFilter}
                            onChange={setShopFilter}
                        />
                        <Dropdown
                            wrapperClass="points__materials"
                            title={`Материалы (${materialFilter.length})`}
                            options={materialOptions}
                            selected={materialFilter}
                            onChange={setMaterialFilter}
                        />
                    </div>

                    {activeId != null
                        ? <PointDetails
                            image={filteredPoints.find(p => p.id === activeId)!.imageUrl}
                            address={`${filteredPoints.find(p => p.id === activeId)!.cityName}: ${filteredPoints.find(p => p.id === activeId)!.address}`}
                            phone={filteredPoints.find(p => p.id === activeId)!.phone}
                            schedule={filteredPoints.find(p => p.id === activeId)!.schedule!}
                            storeName={filteredPoints.find(p => p.id === activeId)!.shopName}
                            materials={filteredPoints.find(p => p.id === activeId)!.materials}
                            onClose={() => setActiveId(null)}
                        />
                        : <PointList
                            points={listItems}
                            onItemClick={item => {
                                setActiveId(item.id);
                                const target = filteredPoints.find(p => p.id === item.id);
                                if (target) flyToPoint([target.lat, target.lng]);
                            }}
                        />
                    }
                </div>
            </div>

            <div className={`filters-drawer${isFilterOpen ? ' open' : ''}`}>
                <div className="drawer-close" onClick={toggleFilter}>
                    ✕
                </div>

                <Dropdown
                    wrapperClass="points__materials"
                    title={`Материалы (${materialFilter.length})`}
                    options={materialOptions}
                    selected={materialFilter}
                    onChange={setMaterialFilter}
                />
                <Dropdown
                    wrapperClass="points__shops"
                    title={`Магазины (${shopFilter.length})`}
                    options={shopOptions}
                    selected={shopFilter}
                    onChange={setShopFilter}
                />

                <button className="apply-btn" onClick={toggleFilter}>
                    Применить
                </button>
                <button
                    className="reset-btn"
                    onClick={() => {
                        setShopFilter([]);
                        setMaterialFilter([]);
                    }}
                >
                    Сбросить фильтры
                </button>
            </div>
        </div>
    );
};
