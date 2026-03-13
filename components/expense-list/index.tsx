import { useTransactionFilters } from '@/hooks/useTransactionFilters';
import { useRouter } from 'expo-router';

import React, { useMemo, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivitiesListUI } from '../ui/activities-list-ui';
import { HeaderExpenseList } from './components/header-expense-list';
import { QuickFilterBar } from './components/quick-filter-bar';
import { SelectionModal } from './components/selection-modal';
import { DateFilter, Expense, FilterStatus, SortOption } from './types/types';

export default function ExpenseList() {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { filters, isLoading } = useTransactionFilters();

    const [statusFilter, setStatusFilter] = useState<FilterStatus>('todas');
    const [dateFilter, setDateFilter] = useState<DateFilter>('mes');
    const [sortOption, setSortOption] = useState<SortOption>('recent');
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showDateMenu, setShowDateMenu] = useState(false);

    const expenses: Expense[] = [
        {
            paymentMethod: 'PIX', color: 'bg-[#C89B7B]',
            id: 1, name: 'Supermercado', amount: 285.50, category: 'Alimentação',
            date: '2026-02-25', status: 'gerada', account: 'Nubank'
        },
        {
            paymentMethod: 'Cartão de Crédito', color: 'bg-[#C89B7B]',
            id: 2, name: 'Conta de Luz', amount: 156.30, category: 'Contas', date: '2026-03-02', status: 'paga', account: 'Inter'
        },
        {
            paymentMethod: 'Débito', color: 'bg-[#C89B7B]',
            id: 7, name: 'Aluguel', amount: 1500.00, category: 'Moradia', date: '2026-02-05', status: 'pendente', account: 'Inter'
        },
    ];

    const statusMap: Record<string, Expense['status']> = {
        pagas: 'paga', pendentes: 'pendente', geradas: 'gerada',
    };

    const filteredExpenses = useMemo(() => {
        let result = expenses.filter(expense => {
            const statusMatch = statusFilter === 'todas' || expense.status === statusMap[statusFilter];
            const expDate = new Date(expense.date);
            const now = new Date();
            let dateMatch = true;

            if (dateFilter === 'mes') {
                dateMatch = expDate.getUTCMonth() === now.getUTCMonth() && expDate.getUTCFullYear() === now.getUTCFullYear();
            } else if (dateFilter === '30dias') {
                const diff = (now.getTime() - expDate.getTime()) / (1000 * 3600 * 24);
                dateMatch = diff <= 30;
            }
            return statusMatch && dateMatch;
        });

        return result.sort((a, b) => {
            if (sortOption === 'highest') return b.amount - a.amount;
            if (sortOption === 'lowest') return a.amount - b.amount;
            if (sortOption === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }, [statusFilter, dateFilter, sortOption]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAF3E0' }}>
                <Text className='font-bold text-gray-800'>Carregando...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#FAF3E0]" style={{ paddingTop: insets.top }}>
            <StatusBar barStyle="dark-content" />
            <HeaderExpenseList
                dateFilter={dateFilter}
                filteredExpenses={filteredExpenses}
                setShowDateMenu={setShowDateMenu}
            />
            <QuickFilterBar
                filters={filters}
                setShowSortMenu={setShowSortMenu}
                setStatusFilter={setStatusFilter}
                statusFilter={statusFilter}
            />

            <View className="flex-1 w-full p-3">
                <ActivitiesListUI activities={filteredExpenses} />
            </View>


            <SelectionModal
                visible={showSortMenu} onClose={() => setShowSortMenu(false)} title="Ordenar por"
                current={sortOption} onSelect={setSortOption}
                options={[
                    { label: 'Mais recentes', value: 'recent' },
                    { label: 'Mais antigas', value: 'oldest' },
                    { label: 'Maior valor', value: 'highest' },
                    { label: 'Menor valor', value: 'lowest' },
                ]}
            />

            <SelectionModal
                visible={showDateMenu} onClose={() => setShowDateMenu(false)} title="Período"
                current={dateFilter} onSelect={setDateFilter}
                options={[
                    { label: 'Este Mês', value: 'mes' },
                    { label: 'Últimos 30 dias', value: '30dias' },
                    { label: 'Últimos 3 meses', value: '3meses' },
                ]}
            />
        </View>
    );
}