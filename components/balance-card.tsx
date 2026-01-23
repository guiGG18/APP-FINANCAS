import React from 'react';
import { Text, View } from 'react-native';
// Certifique-se de ter 'expo-linear-gradient' instalado (expo install expo-linear-gradient)
import { LinearGradient } from 'expo-linear-gradient';
const BalanceCard: React.FC = () => {
  return (
    /* 1. Adicionei self-center para garantir centralização no pai */
    /* 2. m-4 para garantir que ele não cole nas bordas do celular */
    <View className="w-full max-w-[400px] self-center bg-white rounded-[32px] shadow-2xl overflow-hidden m-4">
      <LinearGradient
        colors={['#D8825C', '#C67B59']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        // pt-8 e pb-12 criam alturas diferentes, o que pode dar sensação ótica de desalinhamento
        className="px-6 py-10 rounded-b-[32px]"
      >
        <View className="items-center justify-center">
          <Text className="text-white/80 text-sm mb-2 font-medium uppercase tracking-wider">
            Saldo Disponível
          </Text>
          <Text className="text-white text-4xl font-bold">
            R$ 4.258,48
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};
export default BalanceCard;