export interface Transaction {
    id?: number;
    uuid: string;         // ID único para sincronização externa       
    description: string;
    amount: number;       // Valor (dica: armazene em centavos para evitar erros de float)
    category: string;
    paymentMethod: string;
    type: 'INCOME' | 'OUTCOME'; // entrada ou saída
    status: 'PAID' | 'PENDING';
    creationDate: string;
    dueDate: string | null;
    paymentDate: string | null;


    // Controle de Sincronização
    sync_status: 0 | 1;
    updated_at: string | null;

}

