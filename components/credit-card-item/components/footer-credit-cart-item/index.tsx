import { formatCurrencyUtil } from "@/utils/format-currency.util";
import { Text, View } from "react-native";
interface FooterCreditCardItemProps {
    cardNumber: string;
    availableLimit: number;
}

export const FooterCreditCardItem = ({cardNumber, availableLimit}: FooterCreditCardItemProps) => {
    return(
        <View className="mt-4 flex-row justify-between items-end border-t border-white/10 pt-3">
            <View>
                <Text className="text-white/60 text-[8px] uppercase">Número</Text>
                <Text className="text-white text-xs font-mono">{cardNumber}</Text>
            </View>
            <View className="items-end">
                <Text className="text-white/60 text-[8px] uppercase">Limite Disponível</Text>
                <Text className="text-white text-xs font-semibold">
                    {formatCurrencyUtil(availableLimit)}
                </Text>
            </View>
        </View>
    )
}