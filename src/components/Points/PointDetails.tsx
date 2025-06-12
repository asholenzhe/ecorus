import React from 'react';
import './point-detail.css';

interface Props {
    image: string;
    address: string;
    phone: string;
    schedule: string;
    storeName: string;
    materials: string[];
    onClose: () => void;
}

export const PointDetails: React.FC<Props> = ({image, address, phone, schedule, storeName, materials, onClose,}) => {
    return (
        <>
            <button onClick={onClose} className="point-detail-back-btn">
                <img src="src/assets/point-exit.svg" alt="back" />
                <span className="point-detail-back-title">Вернуться назад</span>
            </button>
            <div className="point-detail-card">
                <img src={image} alt="Пункт" className="point-detail-image"/>
                <div className="point-detail-content">
                    <h3 className="point-detail-address">{address}</h3>
                    <p className="point-detail-info">{phone}</p>
                    <p className="point-detail-info"> {schedule}</p>
                    <div className="point-detail-info-wrapper">
                        <p className="point-detail-info">{storeName}</p>
                        <ul className="point-detail-materials-list">
                            {materials.map((mat, idx) => (
                                <li key={idx} className="point-detail-materials-item">
                                    {mat}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>

    );
};