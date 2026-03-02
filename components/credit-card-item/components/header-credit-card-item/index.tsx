import { CreditCardIcon } from "lucide-react-native";
import { Text, View } from "react-native";

interface HeaderCreditCardItemProps {
  name: string;
}

const HeaderCreditCardItem = ({ name }: HeaderCreditCardItemProps) => {
  return (
     <View className="flex-row items-center gap-2 mb-4">
            <CreditCardIcon size={16} color="white" />
            <Text className="text-white text-xs font-bold uppercase tracking-widest">
              {name}
            </Text>
      </View>
  )
}

export default HeaderCreditCardItem;