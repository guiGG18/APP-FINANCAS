import { cn } from '@/utils/cn';
import { useRouter } from 'expo-router';
import {
    ArrowUpDown,
    ShoppingBag
} from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeaderExpenseList } from './components/header-expense-list';
import { SelectionModal } from './components/selection-modal';
import { DateFilter, Expense, FilterStatus, SortOption } from './types/types';

export default function ExpenseList() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // --- Estados de Filtro ---
    const [statusFilter, setStatusFilter] = useState<FilterStatus>('todas');
    const [dateFilter, setDateFilter] = useState<DateFilter>('mes');
    const [sortOption, setSortOption] = useState<SortOption>('recent');

    // --- Estados de Interface ---
    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showDateMenu, setShowDateMenu] = useState(false);

    const expenses: Expense[] = [
        { id: 1, name: 'Supermercado', amount: 285.50, category: 'Alimentação', date: '2026-02-25', status: 'gerada', account: 'Nubank' },
        { id: 2, name: 'Conta de Luz', amount: 156.30, category: 'Contas', date: '2026-03-02', status: 'paga', account: 'Inter' },
        { id: 7, name: 'Aluguel', amount: 1500.00, category: 'Moradia', date: '2026-02-05', status: 'pendente', account: 'Inter' },
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

        // Ordenação
        return result.sort((a, b) => {
            if (sortOption === 'highest') return b.amount - a.amount;
            if (sortOption === 'lowest') return a.amount - b.amount;
            if (sortOption === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
    }, [statusFilter, dateFilter, sortOption]);

    return (
        <View className="flex-1 bg-[#FAF3E0]" style={{ paddingTop: insets.top }}>
            <StatusBar barStyle="dark-content" />

            <HeaderExpenseList dateFilter={dateFilter} filteredExpenses={filteredExpenses} setShowDateMenu={setShowDateMenu} />

            {/* Barra de Filtros Rápidos */}
            <View className="flex-row px-4 mt-4 gap-2">
                <TouchableOpacity onPress={() => setShowSortMenu(true)} className="bg-white p-3 rounded-2xl flex-1 flex-row justify-center items-center shadow-sm">
                    <ArrowUpDown size={16} color="#D8825C" />
                    <Text className="ml-2 text-gray-600 font-medium">Ordenar</Text>
                </TouchableOpacity>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-[2]">
                    {(['todas', 'pagas', 'pendentes', 'geradas'] as FilterStatus[]).map((s) => (
                        <TouchableOpacity
                            key={s}
                            onPress={() => setStatusFilter(s)}
                            // Mantenha as classes estáticas no className
                            className="mr-2 px-4 py-3 rounded-2xl"
                            style={{
                                backgroundColor: statusFilter === s ? '#D8825C' : 'white',
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: statusFilter === s ? 0 : 0.05,
                            }}
                        >
                            <Text className={cn(`capitalize font-bold `, statusFilter === s ? 'text-white' : 'text-gray-500')}>
                                {s}
                            </Text>
                        </TouchableOpacity>

                    ))}
                </ScrollView>
            </View>

            {/* Lista Principal */}
            <ScrollView className="flex-1 px-4 mt-4" contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
                {filteredExpenses.map((expense) => (
                    <View key={expense.id} className="bg-white mb-3 p-4 rounded-3xl flex-row items-center shadow-sm">
                        <View className="w-12 h-12 bg-orange-50 rounded-2xl items-center justify-center mr-4">
                            <ShoppingBag size={22} color="#D8825C" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-bold text-gray-800">{expense.name}</Text>
                            <Text className="text-gray-400 text-xs">{expense.date} • {expense.account}</Text>
                        </View>
                        <View className="items-end">
                            <Text className="font-bold text-gray-900">R$ {expense.amount.toFixed(2)}</Text>
                            <Text className="text-[10px] font-bold text-[#D8825C]">{expense.status.toUpperCase()}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Modais de Seleção */}
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
