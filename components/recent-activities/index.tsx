import { router } from 'expo-router';
import { Coffee, ShoppingBag, TrendingUp, Wifi, Zap } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const recentActivities = [
  { id: 1, name: 'Compras Supermercado', amount: -85.50, category: 'Alimentação', paymentMethod: 'Cartão Débito', cardName: 'Nubank', icon: ShoppingBag, color: 'bg-[#D4A574]' },
  { id: 2, name: 'Salário', amount: 3500.00, category: 'Entrada', paymentMethod: 'PIX', icon: TrendingUp, color: 'bg-[#E8B4A0]' },
  { id: 3, name: 'Café da Manhã', amount: -25.00, category: 'Alimentação', paymentMethod: 'Dinheiro', icon: Coffee, color: 'bg-[#D4A574]' },
  { id: 4, name: 'Internet', amount: -99.90, category: 'Contas', paymentMethod: 'Cartão Crédito', cardName: 'Mastercard Premium', icon: Wifi, color: 'bg-[#C89B7B]' },
  { id: 5, name: 'Conta de Luz', amount: -156.30, category: 'Contas', paymentMethod: 'PIX', icon: Zap, color: 'bg-[#C89B7B]' },
];

// Exemplo de como ficaria a conversão
export const RecentActivities = () => {
  return (
    <View className="flex-1 px-6 pt-4 w-full">

      {/* Header - Removido w-screen e p-5 que causavam desalinhamento */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-[#5C4A3A] text-lg font-bold">Atividades Recentes</Text>
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.navigate('../expense-list-page')} >
          <Text className="text-[#D8825C] text-sm">Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* List Container */}
      <ScrollView
        className="flex-1 w-full"
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-10"
      >
        {recentActivities.map((activity) => {
          const Icon = activity.icon;
          return (
            <TouchableOpacity
              key={activity.id}
              activeOpacity={0.8}
              className="bg-[#FFF5E9] rounded-2xl p-4 flex-row items-center gap-x-3 mb-3"
            >
              {/* Icon Container */}
              <View className={`w-12 h-12 ${activity.color} rounded-full items-center justify-center`}>
                <Icon size={20} color="white" />
              </View>

              {/* Content */}
              <View className="flex-1">
                <Text numberOfLines={1} className="text-[#5C4A3A] text-sm font-medium">
                  {activity.name}
                </Text>
                <Text className="text-[#8C7A6A] text-xs">
                  {activity.category} • {activity.paymentMethod}
                  {activity.cardName && ` (${activity.cardName})`}
                </Text>
              </View>

              {/* Amount */}
              <Text className={`text-sm font-bold ${activity.amount > 0 ? 'text-[#4A8B4D]' : 'text-[#C93B3B]'}`}>
                {activity.amount > 0 ? '+' : ''}
                {activity.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
