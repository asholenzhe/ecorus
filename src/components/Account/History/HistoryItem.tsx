type MaterialWeight = {
    plasticWeight: number;
    glassWeight: number;
    paperWeight: number;
}

export interface HistoryItemProps {
    address: string;
    material: MaterialWeight;
    date: string;
    coins: number;
}

export default function HistoryItem(props:HistoryItemProps) {
    return (
        <article className="history-item">
            <dl className="history-item__info">
                <div>
                    <dt className="address">Адрес</dt>
                    <dd>{props.address}</dd>
                </div>
                <div>
                    <dt className="material">Материал</dt>
                    <dd>
                        Пластик: {props.material.plasticWeight} кг
                        Стекло: {props.material.glassWeight} кг
                        Бумага: {props.material.paperWeight}кг
                    </dd>
                </div>
                <div>
                    <dt className="date">Дата</dt>
                    <dd>{props.date}</dd>
                </div>
            </dl>
            <div className="history-item__coins">
                <img src="./src/assets/coin.svg" alt="Coin logo"/>
                <h3>{props.coins}</h3>
            </div>
        </article>
    )
}
