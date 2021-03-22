import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Toast from '../../../../components/Toast';
import { TransactionData, CustomerData } from '../../types';
import { createTransaction } from '../../../../api';

import './AddModal.css';

type FormData = Record<string, any>
type Props = {
    handleAddTransaction: (data: TransactionData) => void;
    customers: CustomerData[];
}

const AddModal = ({ handleAddTransaction, customers }: Props) => {
    const initialFormData = {
        customerId: '',
        totalPrice: '',
        currency: '',
        creditCardType: '',
        creditCardNumber: ''
    };
    const [open, setOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [error, setError] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onAddTransaction = async () => {
        setIsSubmitted(true);
        const errors = Object.values(formData).filter(val => !val);
        if (!errors.length) {
            setOpen(false);
            setIsSubmitted(false);
            const res: Record<string, any> = await createTransaction(formData);
            if (res.error) {
                setError(res.error);
            } else {
                setIsSuccess(true);
                handleAddTransaction(res.data);
                setFormData(initialFormData);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
        setFormData({
            ...formData,
            customerId: event.target.value,
        });
    };

    const successToast = (
        <Toast
            isOpen={isSuccess}
            onClose={() => {setIsSuccess(false)}}
            severity="success"
            text="Transaction was created successfully"
        />
    )

    const failureToast = (
        <Toast
            isOpen={!!error}
            onClose={() => {setError(null)}}
            severity="error"
            text="Failed to create transaction"
        />
    )

    const { customerId, totalPrice, currency, creditCardType, creditCardNumber } = formData;

  return (
      <div className="add-button">
          <Fab size="medium" color="secondary" onClick={handleClickOpen}>
              <AddIcon />
          </Fab>
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Add a new transaction</DialogTitle>
              <DialogContent>
                  <FormControl className="form-controller">
                      <InputLabel>Customer</InputLabel>
                      <Select
                          required
                          error={isSubmitted && !customerId}
                          value={customerId}
                          onChange={handleSelectChange}>
                          {
                          customers && customers.map(({id, firstName, lastName}) =>
                              (<MenuItem key={id} value={id}>{`${firstName} ${lastName}`}</MenuItem>)
                          )}
                      </Select>
                      <FormHelperText>Choose a customer</FormHelperText>
                      <TextField
                          className="transaction-field"
                          label="Total Price"
                          required
                          error={isSubmitted && !totalPrice}
                          fullWidth
                          type="number"
                          onChange={handleChange}
                          value={totalPrice}
                          name="totalPrice"
                      />
                      <TextField
                          className="transaction-field"
                          label="Currency"
                          required
                          error={isSubmitted && !currency}
                          fullWidth
                          onChange={handleChange}
                          value={currency}
                          name="currency"
                      />
                      <TextField
                          className="transaction-field"
                          label="Credit card type"
                          required
                          error={isSubmitted && !creditCardType}
                          fullWidth
                          onChange={handleChange}
                          value={creditCardType}
                          name="creditCardType"
                      />
                      <TextField
                          className="transaction-field"
                          label="Credit card number"
                          required
                          error={isSubmitted && !creditCardNumber}
                          fullWidth
                          onChange={handleChange}
                          value={creditCardNumber}
                          name="creditCardNumber"
                      />
                  </FormControl>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} color="primary">
                      Cancel
                  </Button>
                  <Button onClick={onAddTransaction} color="primary">
                      Add
                  </Button>
              </DialogActions>
          </Dialog>
          {successToast}
          {failureToast}
      </div>
  )
}

export default AddModal;



