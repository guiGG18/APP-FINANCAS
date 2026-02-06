import { ChevronDown } from 'lucide-react-native'; // Ou use Expo Icons se preferir
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

interface PaymentMethod {
    label: string;
    value: string;
}

interface PaymentMethodSelectorProps {
    control: Control<any>;
    name: string;
    methods: PaymentMethod[];
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ control, name, methods }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View className="mb-4">
            <Text className="text-[#5C4A3A] text-sm font-bold mb-2">
                Método de Pagamento
            </Text>

            <Controller
                control={control}
                name={name}
                rules={{ required: "Selecione o método" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => setModalVisible(true)}
                            // A View interna isola o estilo do NativeWind para evitar bugs de contexto
                            className={`w-full px-3 py-4 bg-[#FFF5E9] rounded-xl border-2 ${error ? 'border-red-500' : 'border-transparent'
                                } flex-row justify-between items-center`}
                        >
                            <Text className={`${value ? 'text-[#5C4A3A]' : 'text-[#8C7A6A]'} text-base font-medium`}>
                                {methods.find(m => m.value === value)?.label || "Selecione o método"}
                            </Text>

                            <ChevronDown size={20} color="#5C4A3A" opacity={0.5} />
                        </TouchableOpacity>

                        {error && <Text className="text-red-500 text-xs mt-1 font-medium">{error.message}</Text>}

                        {/* Modal que substitui o <select> do HTML */}
                        <Modal
                            visible={modalVisible}
                            transparent={true}
                            animationType="fade"
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <TouchableOpacity
                                activeOpacity={1}
                                className="flex-1 bg-black/50 justify-end"
                                onPress={() => setModalVisible(false)}
                            >
                                <View className="bg-white rounded-t-3xl p-6 pb-12">
                                    <View className="w-12 h-1 bg-gray-200 rounded-full self-center mb-6" />

                                    <Text className="text-[#5C4A3A] text-lg font-bold mb-6 text-center">
                                        Selecione o Método
                                    </Text>

                                    <FlatList
                                        data={methods}
                                        keyExtractor={(item) => item.value}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                activeOpacity={0.6}
                                                onPress={() => {
                                                    onChange(item.value);
                                                    setModalVisible(false);
                                                }}
                                                className={`p-4 mb-3 rounded-2xl flex-row justify-between items-center ${value === item.value ? 'bg-[#D8825C]' : 'bg-[#FFF5E9]'
                                                    }`}
                                            >
                                                <Text className={`font-bold text-base ${value === item.value ? 'text-white' : 'text-[#5C4A3A]'
                                                    }`}>
                                                    {item.label}
                                                </Text>

                                                {value === item.value && (
                                                    <View className="w-2 h-2 rounded-full bg-white" />
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </>
                )}
            />
        </View>
    );
};

export default PaymentMethodSelector;
