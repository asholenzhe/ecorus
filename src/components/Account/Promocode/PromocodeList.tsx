import './promocode.css';

import {PromocodeItem, PromocodeItemProps} from "./PromocodeItem.tsx";

export interface PromocodeListProps {
    promocodes: PromocodeItemProps[];
}

export default function PromocodeList({promocodes}: PromocodeListProps) {
    return (
        <ul className="promocode-list">
            {promocodes.map((item, index) => (
                <li key={index}>
                    <PromocodeItem {...item}/>
                </li>
            ))}
        </ul>
    )
}