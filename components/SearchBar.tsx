"use client";

interface SearchBarProps {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
    return (
        <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
                type="text"
                className="search-input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? "Search channels..."}
            />
            {value && (
                <button className="search-clear" onClick={() => onChange("")}>
                    ✕
                </button>
            )}
        </div>
    );
}
