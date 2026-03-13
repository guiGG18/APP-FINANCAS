import { TransactionType } from "@/types/expensesType";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface TransactionListUIProps {
    activities: TransactionType[];
    colorCards?: string;
}

export const ActivitiesListUI = ({ activities, colorCards }: TransactionListUIProps) => {
    return (
        <View className="flex-1 w-full">
            <ScrollView
                className="flex-1 w-full"
                showsVerticalScrollIndicator={false}
                contentContainerClassName="  pb-10 "
            >
                {activities.map((activity) => {
                    const Icon = activity.icon;

                    return (
                        <TouchableOpacity
                            key={activity.id}
                            activeOpacity={0.8}
                            className={`${colorCards || 'bg-[#FFF5E9]'} rounded-2xl p-4 flex-row items-center mb-3 shadow-sm`}
                        >
                            {Icon && (
                                <View className={`w-12 h-12 ${activity.color || 'bg-orange-200'} rounded-full items-center justify-center mr-3`}>
                                    <Icon size={20} color="white" />
                                </View>
                            )}

                            <View className="flex-1">
                                <View className="flex-row items-center gap-2">
                                    <Text numberOfLines={1} className="text-[#5C4A3A] text-sm font-bold">
                                        {activity.name}
                                    </Text>
                                    {activity.status && (
                                        <Text className="text-[10px] font-bold text-[#D8825C] uppercase bg-[#fffaf3] p-1 rounded-full border border-[#D8825C]">
                                            {activity.status}
                                        </Text>
                                    )}

                                </View>
                                <Text className="text-[#8C7A6A] text-xs">
                                    {activity.category}
                                    {activity.paymentMethod && ` • ${activity.paymentMethod}`}
                                </Text>

                                <Text className="text-[#8C7A6A] text-xs">
                                    {activity.date && `${activity.date}`}
                                </Text>
                            </View>

                            <View className="items-end flex justify-between self-stretch ">
                                <Text className={`text-sm font-bold ${activity.amount > 0 ? 'text-[#4A8B4D]' : 'text-[#C93B3B]'}`}>
                                    {activity.amount > 0 ? '+' : ''}
                                    {activity.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Text>
                                {activity.dueDate && (
                                    <Text className="text-[10px] text-gray-400  self-end">
                                        Vence em {activity.dueDate}
                                    </Text>
                                )}
                                {activity.paymentDate && (
                                    <Text className="text-[10px] text-gray-400  self-end">
                                        Pago em {activity.paymentDate}
                                    </Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};
