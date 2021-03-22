import React, { useEffect, useState, useCallback } from 'react';
import AddModal from './components/modals/AddModal';
import Search from './components/search/Search';
import TransactionTable from './components/TransactionsTable';
import { TransactionData, CustomerData } from './types';
import { getAllTransactions, deleteTransaction, getAllCustomers } from '../../api';

import './Transactions.css';

const Transactions = () => {
    const [transactions, setTransactions] = useState<TransactionData[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<TransactionData[]>(transactions);
    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    const getTransactions = useCallback(async () => {
        const transactionsData = await getAllTransactions();
        setTransactions(transactionsData);
    },[]);

    const getCustomers = useCallback(async () => {
        const customersData = await getAllCustomers();
        setCustomers(customersData);
    },[]);

    useEffect(()=> {
        getTransactions();
        getCustomers();
    },[getTransactions, getCustomers]);

    useEffect(()=> {
        if (transactions.length) {
            const filteredTransactions = transactions.filter((transaction: TransactionData) => {
                const { customer, creditCardType, creditCardNumber } = transaction;
                const { firstName, lastName } = customer;
                return firstName.toLowerCase().includes(searchTerm.toLowerCase())
                    || lastName.toLowerCase().includes(searchTerm.toLowerCase())
                    || creditCardType.toLowerCase().includes(searchTerm.toLowerCase())
                    || creditCardNumber.toString().toLowerCase().includes(searchTerm.toLowerCase())
            });
            setFilteredTransactions(filteredTransactions);
        }
    },[searchTerm, transactions]);




    const handleDeleteTransaction = async (id: number) => {
        await deleteTransaction(id);
        const updatedTransactionsData = transactions.filter((transaction: TransactionData) => transaction.id !== id);
        setTransactions(updatedTransactionsData);
    }

    const handleAddTransaction = async (data: TransactionData) => {
        setTransactions([
            ...transactions,
            data,
        ]);
    }

    const handleUpdateTransaction = async(data: TransactionData) => {
        const updatedTransactionsData =
            transactions.map((transaction: TransactionData) => {
                if (transaction.id === data.id) {
                    return data;
                }
                return transaction;
            });
        setTransactions(updatedTransactionsData);
    }

    return (
        <div className="transactions">
            <div className="actions">
                <Search searchTerm={searchTerm} handleFilter={handleFilter} />
                <AddModal customers={customers} handleAddTransaction={handleAddTransaction} />
            </div>
            <TransactionTable
                handleDeleteTransaction={handleDeleteTransaction}
                handleUpdateTransaction={handleUpdateTransaction}
                transactions={filteredTransactions}
            />
        </div>
    )
}

export default Transactions;