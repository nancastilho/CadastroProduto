interface InputProps {
  label: string
  name: string
  placeholder: string
  value:any
  onChange: (e:any) => void
  typeInput: string
  required?: boolean
}

function InputText({
  label,
  placeholder,
  value,
  name,
  onChange,
  typeInput,
  required,
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
      <input
        type={typeInput}
        id={label}
        name={name}
        required={required}
        className="rounded-[3px] border-solid bg-white h-10 p-2"
        style={{
          borderWidth: "var(--Quantidade, 1px)",
          borderColor: "var(--Color-Neutral-Dark-1000, #D8DFDF)",
          background: "var(--Color-Neutral-Light-0, #FFF)",
        }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default InputText;
