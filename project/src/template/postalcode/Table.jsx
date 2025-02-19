import React from 'react'
import PropTypes from 'prop-types'
import BootTable from 'react-bootstrap/table'

const Table = ({ tableType, rowData }) => {

  return (
    <BootTable variant = { tableType } className="" >
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Pin/Zip Code</th>
        <th>Circle</th>
        <th>District</th>
        <th>Branch Type</th>
        <th>Delivery  Status</th>
      </tr>
    </thead>
    <tbody>
      { 
      rowData.map((val, key) => {
        return <tr key={key}>
          <td>{key + 1}</td>
          <td>{val.Name}</td>
          <td>{val.Pincode}</td>
          <td>{val.Circle}</td>
          <td>{val.District}</td>
          <td>{val.BranchType}</td>
          <td>{val.DeliveryStatus}</td>
        </tr>
      })
      }
    </tbody>
  </BootTable>)
}

export default Table

Table.propTypes = {
  tableType: PropTypes.string
}