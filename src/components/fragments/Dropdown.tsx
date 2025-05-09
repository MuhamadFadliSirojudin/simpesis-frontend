import React from "react";
import { Modul } from "../../types";

type DropdownProps = {
  options: Modul[];
  value: number;
  onChange: (value: number) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="block w-full appearance-none bg-white border border-gray-400  text-black font-medium px-4 py-3 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-900 transition-all"
      >
        {options.length === 0 ? (
          <option value="">Belum ada data</option>
        ) : (
          options.map((option) => (
            <option key={option.id} value={option.id} className="text-gray-800">
              {option.topik}
            </option>
          ))
        )}
      </select>
      {/* Chevron icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-blue-900">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default Dropdown;
