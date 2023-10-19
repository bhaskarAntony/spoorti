import * as React from 'react';
import styled from 'styled-components/macro';
import { colors, fonts, spacers } from '../../theme';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { CustomTableRow } from './CustomTableRow';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  headCells: []
};

export const TableContWrapper  = styled.div`
  background: ${colors.white};
  border-radius: 16px;
  padding: 25px;
  thead {
    th span {
      font-family: ${fonts.default};
      font-style: normal;
      font-size: 14px;
      line-height: 18px;
      font-weight: 700;
      letter-spacing: 0.2px;
      color: ${colors.mischka};
      white-space: nowrap;
    }
  }
  tbody {
    td {
      font-family: ${fonts.default};
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: 0.2px;
      color: ${colors.black};
      word-break: break-word;
      max-width: 300px;
    }
    tr:last-child{
      td {
        border-bottom: 0;
      }
    }
  }
  .kyc-status{
    background: ${colors.springSlumberGreen};
    border-radius: 8px;
    padding: 12px 24px;
    min-width: 120px;
    text-align: center;
    &.kyc-failed-status {
      background: ${colors.tutu};
    }
  }
  .table-user-image{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .status-container{
    background: ${colors.fruitSalad};
    border-radius: 8px;
    font-family: ${fonts.default}
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.2px;
    color: ${colors.white};
    padding: 10px;
    text-align: center;
    text-transform: uppercase;
    max-width: 110px;
    white-space: nowrap;
  }
  .status-rejected{
    background: #EF3836;
  }
  .status-completed{
    background: ${colors.darkBlue};
  }
`;

export const TableOverallContWrapper  = styled.section`
  .MuiPaper-root {
    background: transparent;
    box-shadow: none;
  }
  .MuiTablePagination-spacer, .MuiTablePagination-selectLabel, .MuiInputBase-root{
    display: none;
  }
  .MuiTablePagination-root .MuiToolbar-root {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .MuiTablePagination-displayedRows{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: ${colors.mischka};
  }
  .MuiTablePagination-actions button{
    background: ${colors.lightBlue};
    border-radius: 8px;
    padding: 0;
    svg{
      width: 30px;
      height: 30px;
      fill: ${colors.white};
    }
    &:first-child{
      margin-right: 10px
    }
  }
  .toss-card-image{
    width: 40px;
    margin-left: 20px;
  }
  .host-icon{
    margin-left: 5px;
  }
  .toss-won-icon{
    margin-left: 20px;
  }
  .toss-won-text{
    margin-left: 20px;
    margin-top: 5px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: 0.2px;
    color: ${colors.black};
  }
  .verified-text{
    background: ${colors.springSlumberGreen};
    border: 1px solid ${colors.mediumDarkShadeOfGreen};
    border-radius: ${spacers.spacer3};
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 10px;
    line-height: 13px;
    letter-spacing: 0.2px;
    color: ${colors.mediumDarkShadeOfGreen};
    text-align: center;
    padding: 5px 15px;
    max-width: 70px;
  }
  .verified-pending-text{
    background: ${colors.verySoftOrange};
    border: 1px solid ${colors.vividYellow2};
    color: ${colors.mostlyPureOrange};
  }
  
  .txn-action-text{
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 700;
    font-size: 6px;
    line-height: 8px;
    letter-spacing: 0.2px;
    color: ${colors.fruitSalad};
  }

  .action-btn-cont {
    display: flex;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }
    
  .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
  }
    
  .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
  }
    
  .slider:before {
      position: absolute;
      content: "";
      height: 17px;
      width: 17px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
  }
    
  input:checked + .slider {
      background-color: #2196F3;
  }
    
  input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
  }
    
  input:checked + .slider:before {
      -webkit-transform: translateX(20px);
      -ms-transform: translateX(20px);
      transform: translateX(20px);
  }
    
    /* Rounded sliders */
  .slider.round {
      border-radius: 34px;
  }
    
  .slider.round:before {
      border-radius: 50%;
  }

  .table-approve-action, .table-reject-action{
    background: ${colors.darkBlue};
    border-radius: 8px;
    font-family: ${fonts.default};
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: 0.2px;
    color: ${colors.white};
    white-space: nowrap;
    border: solid 2px ${colors.darkBlue};
    &:hover{
      background: ${colors.white};
      color: ${colors.darkBlue};
    }
  }

  .table-reject-action{
    background: ${colors.veryLightGray};
    border: solid 2px ${colors.veryLightGray};
    color: ${colors.black};
    margin-left: 15px;
  }
`;

export const EnhancedTable = (props) => {
  const { rows, headCells } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 12));
    setPage(0);
  };

  // const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableOverallContWrapper className={props.className}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContWrapper>
            <TableContainer className='enhanced-table'>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  headCells={headCells}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <CustomTableRow key={index} row={row} index={index} headCells={headCells} labelId={labelId} updateProductStatus={props.updateProductStatus} approveReject={props.approveReject} updateUserDataToOpen={props.updateUserDataToOpen} subNavIndex={props.subNavIndex} props={props}/>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TableContWrapper>

          {props.pagination && 
            <TablePagination
              labelRowsPerPage="Showing"
              className='table-footer'
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          }
        </Paper>
      </Box>
    </TableOverallContWrapper>
  );
}

EnhancedTable.defaultProps = {
  pagination: true
};
