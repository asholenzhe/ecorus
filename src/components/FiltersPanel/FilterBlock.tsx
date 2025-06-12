import './filterspanel.css'

interface FilterBlockProps<T> {
    title: string;
    options: { label: string; value: T }[];
    selected: T[];
    onToggle: (value: T) => void;
    includeSelectAll?: boolean;
    onSelectAll?: () => void;
    allSelected?: boolean;
    selectAllLabel?: string;
}

export default function FilterBlock<T extends string | number>({
                                                                   options,
                                                                   selected,
                                                                   onToggle,
                                                                   includeSelectAll = false,
                                                                   onSelectAll,
                                                                   allSelected = false,
                                                                   selectAllLabel = "Выбрать все",
                                                               }: FilterBlockProps<T>) {
    return (
        <div className="filters-panel__block">
            <div className="filters-panel__checkbox-wrapper">
                {includeSelectAll && onSelectAll && (
                    <div className="filters-panel__checkbox-block filters-panel__checkbox-block--select-all">
                        <input
                            type="checkbox"
                            className="filters-panel__checkbox"
                            checked={allSelected}
                            onChange={onSelectAll}
                        />
                        <span className="filters-panel__filter-name">{selectAllLabel}</span>
                    </div>
                )}
                {options.map((opt) => (
                    <label key={String(opt.value)} className="filters-panel__checkbox-block">
                        <input
                            type="checkbox"
                            className="filters-panel__checkbox"
                            checked={selected.includes(opt.value)}
                            onChange={() => onToggle(opt.value)}
                        />
                        <span className="filters-panel__filter-name">{opt.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}