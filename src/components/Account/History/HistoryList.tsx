import HistoryItem, {HistoryItemProps} from "./HistoryItem.tsx";
import "./history.css";

export interface HistoryListProps {
    history: HistoryItemProps[];
}

export default function HistoryList({history}: HistoryListProps) {
    return (
        <ul className="history-list">
            {history.map((item, index) => (
                <li key={index}>
                    <HistoryItem {...item} />
                </li>
            ))}
        </ul>
    );
}