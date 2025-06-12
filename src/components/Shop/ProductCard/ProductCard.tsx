import "./product_card.css"
import Button from "../../Button/Button";

export interface ProductCardProps {
    brandName: string;
    link: string;
    name: string;
    category: string;
    coins: string;
}

export default function ProductCard(product: ProductCardProps) {
    return (
        <article className="product-card">
            <div className="product-card__promo">
                <div className="product-card__balance-block">
                    <span className="product-card__balance-title">На вашем балансе</span>
                    <span className="product-card__balance"><img src="./src/assets/coin.svg" alt="Coins"/> 200</span>
                </div>
                    <p className="product-card__balance-info">Вы можете обменять их на скидку 200 руб.</p>
                <Button>Получить промокод</Button>
            </div>
            <div className="product-card__img">
                <span className="product-card__brand">{product.brandName}</span>
                <img src={product.link} alt="Product Card" />
            </div>
            <div className="product-card__info">
                <div className="product-card__text">
                    <h3 className="product-card__name">{product.name}</h3>
                    <h3 className="product-card__category">{product.category}</h3>
                </div>
                <div className="product-card__coins">
                    <img src="./src/assets/coin.svg" alt="Coins"/>
                    <h4 className="product-card__price">{product.coins}</h4>
                </div>
            </div>
        </article>
    )
}