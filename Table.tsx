import { Dispatch, SetStateAction } from "react";
import { dataEntry } from "./Body";

type tableProps = {
    data: Array<{ [key: string]: any }>;
    bodyHandler: (index: number) => void
    stateSetter: Dispatch<SetStateAction<dataEntry[]>>
}


function Table(props: tableProps) {
  const {data, bodyHandler, stateSetter} = props
  const headers = Object.keys(data[0] || {}).filter((header) => {
    if(header === 'rank' || header === "symbol" || header === 'priceChange' ){
        return true;
    } else {
        return false;
    }
  })
  const includeKeys = ['symbol', 'rank', 'price']

  const sortData = (header: string) => {
    if(header === 'symbol') { return}
    const key = header === 'price' ? 'priceChange' : 'rank'
    const sortedData = [...data].sort((a,b) => {
        if(key === 'priceChange'){
            if(a[key][header] < b[key][header]){    // a['priceChange']['price'] to index nested object in array 
                return -1
            }
            if(a[key][header] > b[key][header]){
                return 1
            }
            return 0
        } else {
            if(a[key] < b[key]){
                return -1
            }
            if(a[key] > b[key]){
                return 1
            }
            return 0
        }        
    })
    stateSetter(sortedData)
  }

  return (
    <div className="tableDisplay">
        <table>
            <thead>
                <tr>
                    {includeKeys.map(header => ( <th key={header} onClick={() => sortData(header)}>{header}</th>))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => ( // row: current obj -- index: the index of this obj 
                    <tr key={index}>
                        {headers.map(header => {
                            if(header === 'priceChange'){ // nested object 
                                return <td key={`${index}-${header}`}><div className="td-content">{row[header]['price']}<button value={row['name']} onClick={() => {bodyHandler(index)}}>-</button></div></td>    
                            } else {
                                return <td key={`${index}-${header}`}>{row[header]}</td>
                            }                               
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>    
  )
}

export default Table