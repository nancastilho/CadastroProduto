interface InputProps {
  label: string;
  name: string;
  options: any;
  value: any;
  onChange: (e: any) => void;
  required?: boolean;
}
function SelectField({
  label,
  options,
  value,
  name,
  onChange,
  required = false,
}: InputProps) {
  return (
    <div className="inline-flex flex-col w-full">
      <label
        htmlFor={label}
        className="text-[14px] font-roboto font-normal leading-[24px] tracking-[0.3px]"
        style={{
          color:
            "var(--Neutral-Light-1000, var(--Color-Neutral-Light-1000, #262F2F))",
        }}
      >
        {required && "*"} {label}
      </label>
      <select
        id={label}
        name={name}
        className="rounded-[3px] border-solid bg-white h-10 p-2"
        style={{
          borderWidth: "var(--Quantidade, 1px)",
          borderColor: "var(--Color-Neutral-Dark-1000, #D8DFDF)",
          background: "var(--Color-Neutral-Light-0, #FFF)",
        }}
        value={value}
        required={required}
        onChange={(e) => onChange(e)}
      >
        {options.map((option: any, index: number) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
