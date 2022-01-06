import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import type { GetStaticProps, NextPage } from 'next'
import { OperationType } from '../types'
import axios from 'axios'

interface Props {
  test: string
}

const Name: NextPage<Props> = (props) => {
  const { test } = props

  return <h1>{test}</h1>
}

export const gerServerSideProps: GetServerSideProps = async (context) => {
  let results: OperationType[] = []
  await axios
    .get(`http://localhost:43792/operations/operation-types`)
    .then((response) => {
      console.log(results)
      results = response.data
    })
  return {
    props: {
      operationType: results,
    },
  }
}

export default Name
