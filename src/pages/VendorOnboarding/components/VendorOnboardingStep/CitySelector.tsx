import { useState } from "react";
import { CheckCircle, X } from "phosphor-react";

interface CityOption {
  value: string;
  label: string;
  description?: string;
}

interface CitySelectorProps {
  placeholder: string;
  options: CityOption[];
  selectedValues: string[];
  onSelectionChange: (selectedIds: string[]) => void;
  multiple?: boolean;
  className?: string;
}

const CitySelector = ({
  placeholder,
  options,
  selectedValues,
  onSelectionChange,
  multiple = true,
  className = "",
}: CitySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (option.description &&
        option.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleOptionToggle = (optionValue: string) => {
    if (multiple) {
      const newSelected = selectedValues.includes(optionValue)
        ? selectedValues.filter((id) => id !== optionValue)
        : [...selectedValues, optionValue];
      onSelectionChange(newSelected);
    } else {
      onSelectionChange([optionValue]);
      setIsOpen(false);
    }
  };

  const removeSelected = (optionValue: string) => {
    const newSelected = selectedValues.filter((id) => id !== optionValue);
    onSelectionChange(newSelected);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Selected Items */}
      {selectedValues.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedValues.map((selectedId) => {
            const option = options.find((opt) => opt.value === selectedId);
            if (!option) return null;

            return (
              <span
                key={selectedId}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
              >
                <span className="mr-2">{option.label}</span>
                <button
                  onClick={() => removeSelected(selectedId)}
                  className="text-primary-600 hover:text-primary-800"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No cities found
            </div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = selectedValues.includes(option.value);

              return (
                <div
                  key={option.value}
                  onClick={() => handleOptionToggle(option.value)}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${
                    isSelected ? "bg-primary-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">
                        {option.label}
                      </div>
                      {option.description && (
                        <div className="text-sm text-gray-500">
                          {option.description}
                        </div>
                      )}
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-5 h-5 text-primary-600" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CitySelector;
