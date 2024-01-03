import React, { useState } from 'react'
import { data } from '../data'
import Table from './Table'
import Dropdown from './Dropdown';
import { table } from 'console';

export type dataEntry = {
  [key: string]: any
}

function Body() {
  let tableData1 = data.slice(0,5); // table initially only has 5 rows
  let dropData1 = data.slice(5);
  const [tableData, setTableData] = useState<dataEntry[]>(tableData1)
  const [dropData, setDropData] = useState<dataEntry[]>(dropData1)

  const handleTableRemove = (indexToRemove: number) => {
    if (tableData.length < 2) {return}  // Don't allow removal of last row
    handleDropdownAdd(indexToRemove)  // gets called before data removed from tableData
    const newArray = tableData.filter((_, index) => index !== indexToRemove) // state is immutable, so copy state to new array and add new elements
    setTableData(newArray)
  }

  const handleDropdownAdd = (indexToAdd: number) => {
    const itemToAdd = tableData[indexToAdd]
    setDropData(prevDropData => [...prevDropData, itemToAdd])
  }

  const handleDropdownRemove = (indexToRemove: number) => { // Item clicked in dropdown menu, so move it to table and remove from dropdown
    handleTableAdd(indexToRemove) // add to table before data removed from dropData[]
    const newArray = dropData.filter((_, index) => index !== indexToRemove)
    setDropData(newArray)
  }

  const handleTableAdd = (indexToAdd: number) => {
    const itemToAdd = dropData[indexToAdd]
    setTableData(prevTableData => [...prevTableData, itemToAdd])
  }

  return (
    <div className="bodyDiv">
        <h2>Body</h2>
        <Table data={tableData} bodyHandler={handleTableRemove} stateSetter={setTableData}></Table>
        <Dropdown data={dropData} bodyHandler={handleDropdownRemove}></Dropdown>
    </div>
  )
}

export default Body