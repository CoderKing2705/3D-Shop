"use client";

interface ColorSwatchesProps {
    colors: string[];
    selected: string;
    onSelect: (color: string) => void;
}

export default function ColorSwatches({ colors = ["#000"], selected, onSelect }: ColorSwatchesProps) {
    return (
        <div className="flex gap-3">
            {colors.map((color) => (
                <button
                    key={color}
                    onClick={() => onSelect(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${selected === color ? "border-gray-900" : "border-gray-300"
                        }`}
                    style={{ backgroundColor: color }}
                />
            ))}
        </div>
    );
}
