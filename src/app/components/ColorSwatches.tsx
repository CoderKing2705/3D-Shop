"use client";

import React from "react";

type Props = {
    onSelect: (color: string) => void;
    selected: string;
};

const colors = ["#ffffff", "#7c3aed", "#f59e0b", "#10b981", "#ef4444"];

export default function ColorSwatches({ onSelect, selected }: Props) {
    return (
        <div className="mt-4 flex flex-wrap gap-3">
            {colors.map((c) => (
                <button
                    key={c}
                    onClick={() => onSelect(c)}
                    className={`h-8 w-8 rounded-full border-2 transition 
            ${selected === c ? "border-gray-800" : "border-gray-300"}`}
                    style={{ backgroundColor: c }}
                />
            ))}
        </div>
    );
}
