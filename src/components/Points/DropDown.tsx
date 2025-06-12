import React, { useState } from 'react';
import FilterBlock from '../FiltersPanel/FilterBlock';
import { useMedia } from '../../hooks/useMedia';
import '../../pages/CollectionPoints/points.css';

export interface Option { label: string; value: string; }

interface DropdownProps {
    title: string;
    options: Option[];
    selected: string[];
    onChange: (vals: string[]) => void;
    selectAllLabel?: string;
    wrapperClass?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({title, options, selected, onChange, selectAllLabel = 'Выбрать всё', wrapperClass = ''}) => {
    const isMobile = useMedia('(max-width: 768px)');
    const [open, setOpen] = useState(false);

    const toggle = (v: string) =>
        selected.includes(v)
            ? onChange(selected.filter(x => x !== v))
            : onChange([...selected, v]);

    const toggleAll = () =>
        selected.length === options.length
            ? onChange([])
            : onChange(options.map(o => o.value));

    if (isMobile) {
        return (
            <div className={wrapperClass}>
                <h4>{title}</h4>
                <FilterBlock
                    title={title}
                    options={options}
                    selected={selected}
                    onToggle={toggle}
                    includeSelectAll
                    onSelectAll={toggleAll}
                    allSelected={selected.length === options.length}
                    selectAllLabel={selectAllLabel}
                />
            </div>
        );
    }

    return (
        <div className={wrapperClass}>
            <h4>{title}</h4>
            <button
                className="dropdown-filter-button"
                onClick={() => setOpen(o => !o)}
            >
                <img
                    className={open ? 'arrow open' : 'arrow'}
                    src="/src/assets/arrowDropDown.svg"
                    alt="toggle"
                />
            </button>
            {open && (
                <div className="dropdown-filter-content">
                    <FilterBlock
                        title={title}
                        options={options}
                        selected={selected}
                        onToggle={toggle}
                        includeSelectAll
                        onSelectAll={toggleAll}
                        allSelected={selected.length === options.length}
                        selectAllLabel={selectAllLabel}
                    />
                </div>
            )}
        </div>
    );
};
