import * as React from 'react'
import type { NextPage } from 'next'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Table from '@mui/material/Table'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

interface Props {
  type: string
}

const Table: NextPage<Props> = (props) => {
  const [tableData, setTableData] = useState([])
  const [tableColumns, setTableColumns] = useState([])
  const [tableRows, setTableRows] = useState([])
  const [pageProp, setPageProp] = useState([])
  const { type } = props

  useEffect(() => {
    const getTableData = async () => {
      await axios
        .get(`http://localhost:43792/operations/table-data?type=${type}`)
        .then((response) => {
          setTableData(response.data)
        })
    }

    getTableData()
  }, [type])
  let columns: GridColDef[] = []
  console.log(type)
  if (type === 1) {
    columns = [
      { field: 'amount', headerName: 'Amount', width: 200 },
      { field: 'fromAddress', headerName: 'From Address', width: 500 },
    ]
  }
    if (type === 3) {
       columns = [
         { field: 'amount', headerName: 'Amount' },
         {
           field: 'tradeOrderType',
           headerName: 'Trade Order Type',
           width: 500,
         },
       ]
  }
    if (type === 2) {
      columns = [
        { field: 'amount', headerName: 'Amount' },
        { field: 'toAddress', headerName: 'To Address', width: 400  },
        { field: 'twoFactorEnabled', headerName: '2FA confirmed', width: 150 },
      ]
    }

  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setTableColumns(Object.keys(tableData[0]))
      let rows = []
      for (var i = 0; i <= tableData.length - 1; i++) {
        let row: any = {}
        row.id = i
        row.amount = tableData[i].amount
        row.fromAddress = tableData[i].fromAddress
        row.tradeOrderType = tableData[i].tradeOrderType
        row.toAddress = tableData[i].toAddress
        row.twoFactorEnabled = tableData[i].twoFactorEnabled
        rows.push(row)
      }
      console.log(rows)

      setTableRows(rows)
    }
  }, [tableData])

  return (
    <div>
      <div style={{ height: 400, width: 700 }}>
        <DataGrid
          rows={tableRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      {/* {tableColumns.map((column: any) => (
        <h1 key={column.name}>{column}</h1>
      ))} */}
    </div>
  )
}

export default Table
