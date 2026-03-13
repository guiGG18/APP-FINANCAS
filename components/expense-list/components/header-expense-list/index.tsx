import { router } from "expo-router"
import { ArrowLeft, Calendar, Plus } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"
import { DateFilter, Expense } from "../../types/types"

interface HeaderExpenseListProps {
    filteredExpenses: Expense[]
    setShowDateMenu: React.Dispatch<React.SetStateAction<boolean>>;
    dateFilter: DateFilter
}

export const HeaderExpenseList = ({ filteredExpenses, setShowDateMenu, dateFilter }: HeaderExpenseListProps) => {
    return (
        <View className="bg-[#D8825C] px-6 pt-4 pb-8 rounded-b-[32px] shadow-lg">
            <View className="flex-row items-center justify-between mb-6">
                <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                    <ArrowLeft size={20} color="white" />
                </TouchableOpacity>
                <Text className="text-white text-lg font-bold">Relatório</Text>
                <TouchableOpacity onPress={() => router.push("../expense-registration-page/")} className="w-10 h-10 rounded-full bg-white/20 items-center justify-center">
                    <Plus size={20} color="white" />
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-end">
                <View>
                    <Text className="text-white/70 text-xs uppercase font-bold">Total do Período</Text>
                    <Text className="text-white text-3xl font-bold">R$ {filteredExpenses.reduce((s, e) => s + e.amount, 0).toFixed(2)}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowDateMenu(true)} className="bg-white/20 px-3 py-2 rounded-xl flex-row items-center">
                    <Calendar size={16} color="white" />
                    <Text className="text-white ml-2 text-xs font-bold capitalize">{dateFilter}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}