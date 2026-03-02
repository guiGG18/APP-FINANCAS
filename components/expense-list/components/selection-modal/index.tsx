import { Check, X } from "lucide-react-native";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export const SelectionModal = ({ visible, onClose, title, options, current, onSelect }: any) => (
    <Modal visible={visible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-[32px] p-6 pb-10">
                <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-xl font-bold text-gray-800">{title}</Text>
                    <TouchableOpacity onPress={onClose}><X color="#666" /></TouchableOpacity>
                </View>
                {options.map((opt: any) => (
                    <TouchableOpacity
                        key={opt.value}
                        onPress={() => { onSelect(opt.value); onClose(); }}
                        className="flex-row justify-between items-center py-4 border-b border-gray-100"
                    >
                        <Text className={`text-base ${current === opt.value ? 'text-[#D8825C] font-bold' : 'text-gray-600'}`}>{opt.label}</Text>
                        {current === opt.value && <Check size={20} color="#D8825C" />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    </Modal>
);