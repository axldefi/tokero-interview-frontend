import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import { OperationType } from '../types'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const SelectBox: NextPage<{ operationType: OperationType[] }> = ({
  operationType,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
  }

  return ('asda'
    // <Box sx={{ width: 1000 }}>
    //   <FormControl fullWidth>
    //     <InputLabel id='demo-simple-select-label'>Select Any</InputLabel>
    //     <Select
    //       labelId='demo-simple-select-label'
    //       id='demo-simple-select'
    //       value={operationType[0].id}
    //       label='Select Any...'
    //       onChange={handleChange}
    //     >
    //       {operationType.map((type: any) => (
    //         <MenuItem key={type.id} value={type.id}>
    //           {type.name}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   </FormControl>
    // </Box>
  )
}

SelectBox.getInitialProps = async (context) => {
  const results: any = [];
  await axios
    .get(`http://localhost:43792/operations/operation-types`)
    .then((response) => {
      results = response.data
    })
  return results
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  let results: OperationType[] = []
  await axios
    .get(`http://localhost:43792/operations/operation-types`)
    .then((response) => {
      results = response.data
    })
  return {
    props: {
      operationType: results,
    },
  }
}

export default SelectBox
