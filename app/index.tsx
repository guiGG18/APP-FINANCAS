import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    // O SafeAreaView garante que não bata no notch
    // O bg-[#25292e] aqui garante que a tela toda tenha cor
    <SafeAreaView className="flex-1 bg-[#25292e]">
      
      {/* Esta View interna faz o trabalho de centralizar tudo */}
      <View className="flex-1 items-center justify-center">
        <Text className="text-white text-2xl">hello world 2</Text>
      </View>

    </SafeAreaView>
  );
}
