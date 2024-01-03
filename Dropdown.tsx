
type dropdownProps = {
    data: Array<{[key: string]: any}>
    bodyHandler: (index: number) => void
}

function Dropdown(props: dropdownProps) {
    const {data, bodyHandler} = props;
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log("Dropdown item clicked")
        const selectedOption = +event.target.value
        bodyHandler(selectedOption)
    }

  return (
    <div>
        <select name="dropdown" onChange={handleChange}>
            {data.map((row, index) => {
                return <option key={`${index}-${row['symbol']}`} value={index}>{row['name']}</option>
            })}
        </select>
    </div>
  )
}

export default Dropdown