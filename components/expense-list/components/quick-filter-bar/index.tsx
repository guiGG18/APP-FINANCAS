import { TransactionFilter } from "@/types/transactionFilters";
import { cn } from "@/utils/cn";
import { ArrowUpDown } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FilterStatus } from "../../types/types";

interface quickFilterBarProps {
    filters: TransactionFilter[],
    setShowSortMenu: React.Dispatch<React.SetStateAction<boolean>>;
    setStatusFilter: React.Dispatch<React.SetStateAction<FilterStatus>>;
    statusFilter: FilterStatus
}

export const QuickFilterBar = ({ filters, setShowSortMenu, setStatusFilter, statusFilter }: quickFilterBarProps) => {

    return (
        <View className="flex-row px-4 mt-4 gap-2">
            <TouchableOpacity onPress={() => setShowSortMenu(true)} className="bg-white p-3 rounded-2xl flex-1 flex-row justify-center items-center shadow-sm">
                <ArrowUpDown size={16} color="#D8825C" />
                <Text className="ml-2 text-gray-600 font-medium">Ordenar</Text>
            </TouchableOpacity>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-[2]">
                {(filters).map((s) => (
                    <TouchableOpacity
                        key={s.id}
                        onPress={() => setStatusFilter(s.value)}
                        // Mantenha as classes estáticas no className
                        className="mr-2 px-4 py-3 rounded-2xl"
                        style={{
                            backgroundColor: statusFilter === s.value ? '#D8825C' : 'white',
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: statusFilter === s.value ? 0 : 0.05,
                        }}
                    >
                        <Text className={cn(`capitalize font-bold `,
                            statusFilter === s.value ? 'text-white' : 'text-gray-500')}>
                            {s.value}
                        </Text>
                    </TouchableOpacity>

                ))}
            </ScrollView>
        </View>
    )
}