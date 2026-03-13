import { ElementType } from "react";

export type TransactionType = {
    id: number;
    name: string;
    amount: number;
    category: string;
    paymentMethod: string;
    icon?: ElementType;
    color: string;
    cardName?: string;
    status?: 'paga' | 'pendente' | 'gerada';
    date: string;
    dueDate?: string;
    paymentDate?: string;
};