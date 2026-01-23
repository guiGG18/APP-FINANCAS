import BalanceCard from '@/components/balance-card';
import { QuickActions } from '@/components/quick-actions';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-[#ededed] items-center">       
      <View  className="w-full flex justify-center items-center px-1 pl-3">
        <BalanceCard />
        <QuickActions />
      </View>
    </SafeAreaView>
  );
}
