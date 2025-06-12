export interface PromocodeItemProps {
    date: string;
    productLink: string;
    qrCodeLink: string;
    isActive: boolean;
}

export function PromocodeItem({date, productLink, qrCodeLink, isActive}: PromocodeItemProps) {
    return (
        <article className="promocode-item">
            <div className="promocode-item__status">
                {isActive ? <img src="./src/assets/promocode1000.svg" className="active" alt="Active promocode image"/> : <img src="./src/assets/promocode_notactive.svg" className="nonActive" alt="Nonactive promocode image"/>}
            </div>
            <div className="promocode-item__content">
                <dl className="promocode-item__info">
                    <div className="promocode-item__date">
                        <dt>Дата создания</dt>
                        <dd>{date}</dd>
                    </div>
                    <div className="promocode-item__link">
                        <dt>Ссылка на товар</dt>
                        <dd>
                            <a href={productLink} target="_blank">{productLink}</a>
                        </dd>
                    </div>
                </dl>
                {isActive &&
                    <div className="promocode-item__qr">
                        <a href={qrCodeLink} target="_blank">Показать qr-код </a>
                    </div>
                }
            </div>
        </article>
    )
}