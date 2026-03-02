export type FilterStatus = 'todas' | 'pagas' | 'pendentes' | 'geradas';
export type DateFilter = 'mes' | '30dias' | '3meses' | 'personalizado';
export type SortOption = 'recent' | 'oldest' | 'highest' | 'lowest';

export interface Expense {
    id: number;
    name: string;
    amount: number;
    category: string;
    date: string;
    status: 'paga' | 'pendente' | 'gerada';
    account: string;
}
