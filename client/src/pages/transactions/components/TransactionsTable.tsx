import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from'@material-ui/icons/Check';
import CloseIcon from'@material-ui/icons/Close';
import CustomTableCell from '../../../components/CustomTableCell';
import { updateTransaction } from '../../../api';
import { TransactionData } from '../types';

type Props = {
  transactions:  TransactionData[];
  handleDeleteTransaction: (id: number) => void;
  handleUpdateTransaction: (row: TransactionData) => void;
}

const TransactionTable = ({ transactions, handleDeleteTransaction, handleUpdateTransaction }: Props) => {
  const [rows, setRows] = useState<TransactionData[]>([]);
  const [isEditRowMap, setIsEditRowMap] = useState<{[key:number]: boolean}>({});
  const fields = ['totalPrice', 'currency', 'creditCardType', 'creditCardNumber'];

  useEffect(()=> {
    const map = transactions.reduce((acc: {[key:number]: boolean}, transaction) => {
      acc[transaction.id] = false;
      return acc;
    }, {});
    setIsEditRowMap(map);
    setRows(transactions);
  },[transactions]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, row: TransactionData) => {
    const { value, name } = e.target;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onUpdateData = async (row: TransactionData) => {
    const { customer, ...dataToUpdate } = row;
    const res: any = await updateTransaction(dataToUpdate);
    if (!res.error) {
      handleUpdateTransaction(row);
    }
    setIsEditRowMap({...isEditRowMap, [row.id]: false});
  }

  const onCloseEditMode = (id: number) => {
    setIsEditRowMap({...isEditRowMap, [id]: false});
    setRows(transactions);
  }

  const onOpenEditMode = (id: number) => {
    setIsEditRowMap({...isEditRowMap, [id]: true});
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell>Customer Name</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Credit Card Type</TableCell>
            <TableCell>Credit Card Number</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {isEditRowMap[row.id] ? (
                    <>
                      <IconButton onClick={() => onUpdateData(row)}>
                        <CheckIcon />
                      </IconButton>
                      <IconButton onClick={() => onCloseEditMode(row.id)}>
                        <CloseIcon />
                      </IconButton>
                    </>
                ) : (
                    <IconButton onClick={() => onOpenEditMode(row.id)}>
                      <EditIcon />
                    </IconButton>
                )}

              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteTransaction(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
              <TableCell component='th' scope='row'>
                {row.customer.firstName + ' ' + row.customer.lastName}
              </TableCell>
              {
                fields.map((field, key) =>
                  (<CustomTableCell
                      row={row}
                      key={key}
                      name={field}
                      onChange={onChange}
                      isEditRow={isEditRowMap[row.id]}
                  />))
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;