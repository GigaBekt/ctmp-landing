interface SelectableInputProps {
  id: string | number;
  selected: string | boolean;
  onChange: (value: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  name: string;
  isMultiple?: boolean;
  value?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

const SelectableInput = ({
  id,
  selected,
  onChange,
  name,
  isMultiple = false,
  value,
}: SelectableInputProps) => {
  const isSelected = isMultiple ? selected : selected === id;
  console.log({ isSelected, selected, id });
  return (
    <label
      key={id}
      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-[#2c74b3] bg-blue-50"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <input
        type={isMultiple ? "checkbox" : "radio"}
        name={isMultiple ? `spot-${id}` : "service"}
        value={value || id}
        checked={Boolean(isSelected)}
        onChange={(e) => onChange(value || e.target.value)}
        className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
      />
      <span className="ml-3 text-gray-700 font-medium">{name}</span>
    </label>
  );
};

export default SelectableInput;
