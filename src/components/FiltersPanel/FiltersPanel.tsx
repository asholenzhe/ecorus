import {useState, useEffect, useRef} from "react";
import FilterBlock from "./FilterBlock";
import { ProductGender } from "../../types/models/ProductGender.ts";
import { ProductType } from "../../types/models/ProductType.ts";
import './filterspanel.css';

interface FiltersPanelProps {
    selectedGender: ProductGender[];
    selectedTypes: ProductType[];
    selectedBrands: string[];
    onChange: (filters: {
        gender: ProductGender[];
        types: ProductType[];
        brands: string[];
    }) => void;
}

const GENDERS = [
    { label: "Мужской", value: ProductGender.MEN },
    { label: "Женский", value: ProductGender.WOMEN },
];

const TYPES = [
    { label: "Одежда", value: ProductType.WEAR },
    { label: "Обувь", value: ProductType.SHOES },
    { label: "Аксессуары", value: ProductType.ACCESSORIES },
];

const BRANDS = ["Reebok", "Nike", "Adidas"];

export default function FiltersPanel({
                                         selectedGender,
                                         selectedTypes,
                                         selectedBrands,
                                         onChange,
                                     }: FiltersPanelProps) {
    const [gender, setGender] = useState<ProductGender[]>(selectedGender);
    const [types, setTypes] = useState<ProductType[]>(selectedTypes);
    const [brands, setBrands] = useState<string[]>(selectedBrands);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [translateY, setTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const sheetHeightRef = useRef<number>(0);

    const startYRef = useRef(0);
    const startTranslateRef = useRef(0);

    useEffect(() => {
        onChange({ gender, types, brands });
    }, [gender, types, brands]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    useEffect(() => {
        const computeHeight = () => {
            const vh = window.innerHeight;
            sheetHeightRef.current = vh * 0.7;
            if (isModalOpen && !isDragging) {

                if (translateY > 0) {
                    setTranslateY(sheetHeightRef.current);
                }
            }
        };
        computeHeight();
        window.addEventListener('resize', computeHeight);
        return () => window.removeEventListener('resize', computeHeight);
    }, [isModalOpen, isDragging, translateY]);

    useEffect(() => {
        if (isModalOpen) {
            const height = sheetHeightRef.current;
            setTranslateY(height);
            requestAnimationFrame(() => {
                setTranslateY(0);
            });
        }
    }, [isModalOpen]);

    const animateClose = () => {
        const height = sheetHeightRef.current;
        setTranslateY(height);
        setTimeout(() => {
            setIsModalOpen(false);
        }, 300);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!isModalOpen) return;
        setIsDragging(true);
        startYRef.current = e.touches[0].clientY;
        startTranslateRef.current = translateY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - startYRef.current;
        const newTranslate = startTranslateRef.current + deltaY;
        const clamped = Math.min(Math.max(newTranslate, 0), sheetHeightRef.current);
        setTranslateY(clamped);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const height = sheetHeightRef.current;
        if (translateY > height / 2) {
            animateClose();
        } else {
            setTranslateY(0);
        }
    };

    const toggleInArray = (arr: any[], value: any) =>
        arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];

    const resetFilters = () => {
        setGender([]);
        setTypes([]);
        setBrands([]);
    };

    const applyFilters = () => {
        animateClose();
    };

    return (
        <>
            <div className="filters-panel__wrapper">
                <div className="filters-panel">
                    <div className="filters-panel__content">
                        <FilterBlock
                            title="Пол"
                            options={GENDERS}
                            selected={gender}
                            onToggle={(v) => setGender(toggleInArray(gender, v))}
                        />
                        <FilterBlock
                            title="Тип товара"
                            options={TYPES}
                            selected={types}
                            onToggle={(v) => setTypes(toggleInArray(types, v))}
                            includeSelectAll
                            onSelectAll={() => setTypes(types.length === TYPES.length ? [] : TYPES.map(t => t.value))}
                            allSelected={types.length === TYPES.length}
                        />
                        <FilterBlock
                            title="Брэнд"
                            options={BRANDS.map(b => ({label: b, value: b}))}
                            selected={brands}
                            onToggle={(v) => setBrands(toggleInArray(brands, v))}
                            includeSelectAll
                            onSelectAll={() => setBrands(brands.length === BRANDS.length ? [] : [...BRANDS])}
                            allSelected={brands.length === BRANDS.length}
                        />
                    </div>
                </div>

                <button
                    className="filters-panel__btn"
                    onClick={() => setIsModalOpen(true)}
                >
                    Сбросить фильтры
                </button>
                <button
                    className="filters-panel__btn-modal"
                    onClick={() => setIsModalOpen(true)}
                >
                    Фильтры
                </button>

                {isModalOpen && (
                    <div
                        className="filters-modal-overlay active"
                        onClick={animateClose}
                    />
                )}

                {isModalOpen && (
                    <div
                        className="filters-modal"
                        style={{
                            height: `${sheetHeightRef.current}px`,
                            transform: `translateY(${translateY}px)`,
                            transition: isDragging ? 'none' : 'transform 0.3s ease',
                        }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >

                        <div className="filters-modal__drag-handle">
                            <div className="filters-modal__drag-bar"/>
                        </div>

                        <div className="filters-modal__content">
                            <div className="filters-panel__content">
                                <FilterBlock
                                    title="Пол"
                                    options={GENDERS}
                                    selected={gender}
                                    onToggle={(v) => setGender(toggleInArray(gender, v))}
                                />
                                <FilterBlock
                                    title="Тип товара"
                                    options={TYPES}
                                    selected={types}
                                    onToggle={(v) => setTypes(toggleInArray(types, v))}
                                    includeSelectAll
                                    onSelectAll={() => setTypes(types.length === TYPES.length ? [] : TYPES.map(t => t.value))}
                                    allSelected={types.length === TYPES.length}
                                />
                                <FilterBlock
                                    title="Брэнд"
                                    options={BRANDS.map(b => ({label: b, value: b}))}
                                    selected={brands}
                                    onToggle={(v) => setBrands(toggleInArray(brands, v))}
                                    includeSelectAll
                                    onSelectAll={() => setBrands(brands.length === BRANDS.length ? [] : [...BRANDS])}
                                    allSelected={brands.length === BRANDS.length}
                                />
                            </div>
                        </div>

                        <div className="filters-modal__footer">
                            <button
                                className="filters-modal__button filters-modal__button--reset"
                                onClick={resetFilters}
                            >
                                Сбросить фильтры
                            </button>
                            <button
                                className="filters-modal__button filters-modal__button--apply"
                                onClick={applyFilters}
                            >
                                Применить
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

