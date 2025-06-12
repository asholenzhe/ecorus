import './market.css'
import { useState, useEffect, useMemo } from "react";
import {fetchProducts} from "../../api/products.ts";
import Filter from "../../components/Shop/Filter/Filter/Filter.tsx";
import FiltersPanel from "../../components/FiltersPanel/FiltersPanel.tsx";
import ProductCardsList from "../../components/Shop/ProductCardsList/ProductCardsList.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import {ProductsEntity} from "../../types/models/ProductsEntity.ts";
import {ProductGender} from "../../types/models/ProductGender.ts";
import {ProductType} from "../../types/models/ProductType.ts";

export default function Market() {
    const [products, setProducts] = useState<ProductsEntity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);

    const [genderFilter, setGenderFilter] = useState<ProductGender[]>([]);
    const [typeFilter, setTypeFilter]     = useState<ProductType[]>([]);
    const [brandFilter, setBrandFilter]   = useState<string[]>([]);
    const [sortIndex, setSortIndex]       = useState(0);

    useEffect(() => {
        setLoading(true);
        fetchProducts()
            .then(list => setProducts(list))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        let res = products;

        if (genderFilter.length)   res = res.filter(p => genderFilter.includes(p.gender));
        if (typeFilter.length)     res = res.filter(p => typeFilter.includes(p.type));
        if (brandFilter.length)    res = res.filter(p => brandFilter.includes(p.brand));

        switch (sortIndex) {
            case 0:
                res = [...res].sort((a, b) =>
                    (b.spending?.count ?? 0) - (a.spending?.count ?? 0)
                );
                break;
            case 1:
                res = [...res].sort((a, b) => a.price - b.price);
                break;
            case 2:
                res = [...res].sort((a, b) =>
                    (new Date(b.spending?.createdAt ?? 0)).getTime() -
                    (new Date(a.spending?.createdAt ?? 0)).getTime()
                );
                break;
        }

        return res;
    }, [products, genderFilter, typeFilter, brandFilter, sortIndex]);


    if (loading) return <p>Загрузка…</p>;
    if (error)   return <p>Ошибка: {error}</p>;

    return (
        <>
            <main className="market__content-wrapper">
                <div className="market__title-wrapper">
                    <h1 className="market__title">ЭкоМаркет</h1>
                    <Filter activeIndex={sortIndex} onChange={setSortIndex} />
                </div>
                <div className="market__content">
                    <FiltersPanel
                        selectedGender={genderFilter}
                        selectedTypes={typeFilter}
                        selectedBrands={brandFilter}
                        onChange={({ gender, types, brands }) => {
                            setGenderFilter(gender);
                            setTypeFilter(types);
                            setBrandFilter(brands);
                        }}
                    />
                    <div className="market__products">
                        <ProductCardsList
                            products={filtered.map(p => ({
                                brandName: p.brand,
                                link: p.image,
                                name: p.name,
                                category: p.type,
                                coins: p.price.toString(),
                            }))}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
