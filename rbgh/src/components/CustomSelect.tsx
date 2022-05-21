interface CustomSelect {
  name: string
  className: string
  setVal: React.Dispatch<React.SetStateAction<any>>
  options: Array<{
    label: string
    value: any
  }>
  value: any
}

export const MySelect = (props: CustomSelect) => {
  const { name, className, setVal, value, options } = props

  return (
    <div className={className}>
      <select
        name={name}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const val = e.target.value as string
          setVal(val)
        }}
        value={value}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
