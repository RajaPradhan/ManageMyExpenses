import React, { Component } from 'react';

import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import helpers from 'appPath/helpers';

import styles from './style.scss';

export default class DataGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {data, totalAmountForCurrentMonth} = this.props;
    const currentMonth = helpers.getCurrentMonth();

    return (
      <div>
        <Table
          height="300px"
          fixedHeader
          fixedFooter
          selectable={false}
         multiSelectable={false}
        >
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn
              colSpan="4"
              style={{textAlign: 'center', fontSize: '1.5em', fontWeight: 'bold'}}
            >
              Monthly Expenses for {currentMonth}
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn style={{fontSize: '1em', fontWeight: 'bold'}}>
              NO.
            </TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '1em', fontWeight: 'bold'}}>
              Date
            </TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '1em', fontWeight: 'bold'}}>
              Category
            </TableHeaderColumn>
            <TableHeaderColumn style={{fontSize: '1em', fontWeight: 'bold'}}>
              Details
            </TableHeaderColumn>
            <TableHeaderColumn style={{textAlign: 'right', fontSize: '1em', fontWeight: 'bold'}}>
              Amount
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
        displayRowCheckbox={false}
          showRowHover
          stripedRows
        >
          {
            data.map( (row, index) => (
              <TableRow key={row.expenseId}>
                <TableRowColumn style={{textAlign: 'left'}}>{index + 1}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'left'}}>{row.date}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'left'}}>{row.category}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'left'}}>{row.details}</TableRowColumn>
                <TableRowColumn style={{textAlign: 'right'}}>{row.amount}</TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
        <TableFooter
          adjustForCheckbox={false}
        >
          <TableRow>
            <TableRowColumn colSpan="3" style={{textAlign: 'right', fontSize: '1.5em', fontWeight: 'bold'}}>
              Total Amount:
            </TableRowColumn>
            <TableRowColumn style={{textAlign: 'right', fontSize: '1.5em', fontWeight: 'bold'}}>${totalAmountForCurrentMonth}</TableRowColumn>
          </TableRow>
        </TableFooter>
        </Table>
      </div>
    );
  }
}
