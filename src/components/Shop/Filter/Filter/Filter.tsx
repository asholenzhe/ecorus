import "./filter.css";

interface FilterProps {
    activeIndex: number;
    onChange: (idx: number) => void;
}

const sortOptions = ["По популярности", "По цене", "По новизне"];

export default function Filter({ activeIndex, onChange }: FilterProps) {
    return (
        <div className="sort">
            {sortOptions.map((option, index) => (
                <button
                    key={option}
                    className={`sort__button${activeIndex === index ? "--active" : ""}`}
                    onClick={() => onChange(index)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}
