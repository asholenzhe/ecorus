import ProductCard, {ProductCardProps} from "../ProductCard/ProductCard.tsx";
import "./product-cards_list.css";

export interface ProductCardsListProps {
    products: ProductCardProps[]
}

export default function ProductCardsList({products}: ProductCardsListProps) {
    return (
        <>
            <ul className="product-cards__list">
                {products.map((product, index) => (
                    <li key={index}>
                        <ProductCard {...product}/>
                    </li>
                ))}
            </ul>
        </>
    )
}