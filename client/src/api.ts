import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getAllTransactions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transactions`);
        return await response.data;
    } catch (e) {
        //TODO handle errors here
    }
}

export const deleteTransaction = async (id: number) => {
    let res = {};
    try {
        const response = await axios.delete(`${API_URL}/transactions/${id}`);
        res = {
            data: response.data,
            error: null,
        };
    } catch (e) {
        res = {
            error: e
        }
    } finally {
        return res;
    }
}

export const createTransaction = async (data: Record<string, string>) => {
    let res = {};
    try {
        const response = await axios.post(`${API_URL}/transactions`, data);
        res = {
            data: response.data,
            error: null,
        };
    } catch (e) {
        res = {
            error: e
        }
    } finally {
        return res;
    }
}

export const updateTransaction = async (data: any) => {
    let res = {};
    try {
        const response = await axios.put(`${API_URL}/transactions/${data.id}`, data);
        res = {
            data: response.data,
            error: null,
        };
    } catch (e) {
        res = {
            error: e
        }
    } finally {
        return res;
    }
}

export const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${API_URL}/customers`);
        return await response.data;
    } catch (e) {
        //TODO handle errors here
    }
}
