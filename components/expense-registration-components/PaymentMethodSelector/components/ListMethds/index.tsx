import React from 'react';
import { FlatList, Modal, Text, TouchableOpacity, View } from 'react-native';

interface PaymentMethod {
    label: string;
    value: string;
}

interface ModalListMethodsProps {
    methods: PaymentMethod[];
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onChange: (...event: any[]) => void;
    value: string;
    modalVisible: boolean
}

const ModalListMethods: React.FC<ModalListMethodsProps> = ({ methods, onChange, value, modalVisible, setModalVisible }) => {


    return (
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
    );
};

export default ModalListMethods;
