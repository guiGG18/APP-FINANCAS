import { ChevronDown } from 'lucide-react-native'; // Ou use Expo Icons se preferir
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';
import ModalListMethods from './components/ListMethds';

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
                            className={`w-full px-3 py-4 bg-[#FFF5E9] rounded-xl border-2 ${error ? 'border-red-500' : 'border-transparent'
                                } flex-row justify-between items-center`}
                        >
                            <Text className={`${value ? 'text-[#5C4A3A]' : 'text-[#8C7A6A]'} text-base font-medium`}>
                                {methods.find(m => m.value === value)?.label || "Selecione o método"}
                            </Text>

                            <ChevronDown size={20} color="#5C4A3A" opacity={0.5} />
                        </TouchableOpacity>
                        {error && <Text className="text-red-500 text-xs mt-1 font-medium">{error.message}</Text>}

                        <ModalListMethods methods={methods} modalVisible={modalVisible} onChange={onChange}
                            setModalVisible={setModalVisible} value={value} />
                    </>
                )}
            />
        </View>
    );
};

export default PaymentMethodSelector;
