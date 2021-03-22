export type TransactionData = {
    id: number;
    firstName: string;
    lastName: string;
    totalPrice: number;
    currency: string;
    creditCardNumber: number;
    creditCardType: string;
    customer: CustomerData;
};

export type CustomerData = {
    id: number;
    firstName: string;
    lastName: string;
    city: string;
    street: string;
    country: string;
    phone: string;
    gender: string;
};