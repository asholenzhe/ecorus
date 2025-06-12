import React from 'react';
import '../../pages/CollectionPoints/points.css'
export interface PointsItemProps {
    id: number;
    imageSrc: string;
    address: string;
    materials: string[];
    onClick?: () => void;
}

export const PointsItem: React.FC<PointsItemProps> = ({imageSrc, address, materials, onClick,}) => {
    return (
        <li className="points__item" onClick={onClick}>
            <img
                src={imageSrc}
                alt="point"
                className="points__point-img"
            />
            <div className="points__item-text">
                <h3 className="points__title">{address}</h3>
                <p className="points__materials-list">
                    {materials.join(', ')}{materials.length > 5 ? '…' : ''}
                </p>
            </div>
        </li>
    );
};
