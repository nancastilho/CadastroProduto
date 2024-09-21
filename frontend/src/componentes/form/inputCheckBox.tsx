function CheckboxField({ label, checked, onChange }: any) {
  return (
    <div className="inline-flex items-center w-full">
      <input
        type="checkbox"
        id={label}
        className="rounded-[3px]"
        style={{
          borderWidth: "var(--Quantidade, 1px)",
          borderColor: "var(--Color-Neutral-Dark-1000, #D8DFDF)",
          background: "var(--Color-Neutral-Light-0, #FFF)",
        }}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label
        htmlFor={label}
        className="text-sm font-normal leading-6 tracking-[0.3px] pl-2"
        style={{
          color:
            "var(--Neutral-Light-1000, var(--Color-Neutral-Light-1000, #262F2F))",
        }}
      >
        {label}
      </label>
    </div>
  );
}

export default CheckboxField;
