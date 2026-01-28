import { formatCurrencyUtil } from "@/utils/format-currency.util";
import { Text, View } from "react-native";

interface MainCreditCardItemProps {
    invoiceValue: number;
}

export const MainCreditCardItem = ({invoiceValue}: MainCreditCardItemProps) => {
    return(
            <View className="mb-2">
                    <Text className="text-white/70 text-[10px] font-medium uppercase mb-1">
                     Fatura
                    </Text>
                    <Text className="text-white text-2xl font-bold tracking-tight">
                      {formatCurrencyUtil(invoiceValue)}
                    </Text>
            </View>
    )
}