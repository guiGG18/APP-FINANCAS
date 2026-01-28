import { Minus, Plus } from "lucide-react-native";
import { View } from "react-native";
import ActionButton from "../ui/action-button";

export function QuickActions() {
    return (
        <View className="px-6 -mt-8 mb-6 flex-row gap-3">
        <ActionButton
            label="Entrada" 
            Icon={Plus} 
            color="#4A8B4D" 
            onPress={() => console.log('Entrada')} 
        />
        <ActionButton 
            label="Despesa" 
            Icon={Minus} 
            color="#C93B3B" 
            onPress={() => console.log('Despesa')} 
        />
        </View>
    )
}