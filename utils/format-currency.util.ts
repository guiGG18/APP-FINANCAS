export const formatCurrencyUtil = (value: number) => 
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });