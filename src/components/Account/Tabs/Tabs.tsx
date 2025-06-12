import PromocodeList from "../Promocode/PromocodeList.tsx";
import HistoryList from "../History/HistoryList.tsx";
import {useState} from "react";
import {PromocodeItemProps} from "../Promocode/PromocodeItem.tsx";
import {HistoryItemProps} from "../History/HistoryItem.tsx";
import './tabs.css';

export const mockPromocodes: PromocodeItemProps[] = [
    {
        date: "25.09.2021",
        productLink: "https://adidas.com/clothes/WddfJfS7tdf6hSFlHuJ5ndfsZFu",
        qrCodeLink: "/promo/1/qr",
        isActive: true,
    },
    {
        date: "12.10.2021",
        productLink: "https://nike.com/shoes/NkShoe12345",
        qrCodeLink: "/promo/2/qr",
        isActive: false,
    },
    {
        date: "01.11.2021",
        productLink: "https://puma.com/apparel/PmJacket987",
        qrCodeLink: "/promo/3/qr",
        isActive: false,
    },
    {
        date: "15.12.2021",
        productLink: "https://reebok.com/gear/RbBag321",
        qrCodeLink: "/promo/4/qr",
        isActive: true,
    },
];

export const historyMock: HistoryItemProps[] = [
    {
        address: "ул. Ленина, 10",
        material: {
            plasticWeight: 2.5,
            glassWeight: 1.2,
            paperWeight: 3.0
        },
        date: "2025-05-10",
        coins: 120
    },
    {
        address: "пр. Победы, 35",
        material: {
            plasticWeight: 0.5,
            glassWeight: 2.0,
            paperWeight: 0.8
        },
        date: "2025-05-15",
        coins: 80
    },
    {
        address: "ул. Гоголя, 7",
        material: {
            plasticWeight: 1.0,
            glassWeight: 1.0,
            paperWeight: 1.0
        },
        date: "2025-05-18",
        coins: 100
    }
];


export default function Tabs() {
    const [activeTab, setActiveTab] = useState('promo');
    return (
        <section className="tabs">
            <div className="tabs__header">
                <div className="tab__promocode">
                    <button className={`tab__button ${activeTab === 'promo' ? 'tab__button--active' : ''}`}
                        onClick={() => setActiveTab('promo')}>Промокоды</button>
                    {activeTab === 'promo' && <img src="./src/assets/active_tab.svg" className="tab__active" alt="Active promocode tab"/>}
                </div>
                <div className="tab__history">
                    <button className={`tab__button ${activeTab === 'history' ? 'tab__button--active' : ''}`}
                        onClick={() => setActiveTab('history')}>История</button>
                    {activeTab === 'history' && <img src="./src/assets/active_tab.svg" className="tab__active" alt="Active history tab"/>}
                </div>
            </div>
            <div className="tabs__content">
                {activeTab === 'promo' && <PromocodeList promocodes={mockPromocodes} />}
                {activeTab === 'history' && <HistoryList history={historyMock}/>}
            </div>
        </section>
    )
}