interface SelectableInputProps {
  id: string;
  selected: string;
  onChange: (value: string) => void;
  name: string;
}

const SelectableInput = ({
  id,
  selected,
  onChange,
  name,
}: SelectableInputProps) => {
  return (
    <label
      key={id}
      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
        selected === id
          ? "border-[#2c74b3] bg-blue-50"
          : "border-gray-200 hover:border-gray-300 bg-white"
      }`}
    >
      <input
        type="radio"
        name="service"
        value={id}
        checked={selected === id}
        onChange={(e) => onChange(e.target.value)}
        className="w-5 h-5 text-[#2c74b3] border-gray-300 focus:ring-0"
      />
      <span className="ml-3 text-gray-700 font-medium">{name}</span>
    </label>
  );
};

export default SelectableInput;
