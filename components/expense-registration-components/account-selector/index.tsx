import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Platform, Pressable, Text, View } from 'react-native';

export interface Category {
    label: string;
    value: string;
    color: string;
    icon: React.ElementType;
}

interface AccountSelectorProps {

    accounts: Category[];
    name: string;
}

const AccountSelector: React.FC<AccountSelectorProps> = ({ accounts = [], name }) => {
    const { control } = useFormContext();
    return (
        <View className="mb-4">
            <Text className="text-[#5C4A3A] text-sm font-bold mb-3">
                Contas
            </Text>

            <Controller
                control={control}
                name={name}
                rules={{ required: "Selecione uma Conta" }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View>
                        <View className="flex-row flex-wrap justify-start gap-y-2">
                            {(accounts ?? []).map((cat) => {
                                const Icon = cat.icon;
                                const isSelected = value === cat.value;

                                return (
                                    <Pressable
                                        key={cat.value}
                                        onPress={() => onChange(cat.value)}
                                        className="w-[23%] mr-[2%] items-center justify-center"
                                    >
                                        <View
                                            // Estilo nativo para evitar erro de Navigation Context do NativeWind
                                            style={isSelected ? {
                                                ...Platform.select({
                                                    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
                                                    android: { elevation: 2 }
                                                })
                                            } : {}}
                                            className={`w-full p-2 rounded-2xl items-center justify-center ${isSelected ? cat.color : 'bg-[#FFF5E9]'
                                                }`}
                                        >
                                            <View className={`w-10 h-10 rounded-full items-center justify-center ${isSelected ? 'bg-white/30' : cat.color
                                                }`}>
                                                {Icon ? (
                                                    <Icon
                                                        size={20}
                                                        color="white"
                                                    />
                                                ) : null}
                                            </View>

                                            <Text
                                                numberOfLines={1}
                                                className={`text-[10px] mt-1 text-center ${isSelected ? 'text-white font-bold' : 'text-[#8C7A6A]'
                                                    }`}
                                            >
                                                {cat.label}
                                            </Text>
                                        </View>
                                    </Pressable>
                                );
                            })}
                        </View>
                        {/* {error && <Text className="text-red-500 text-xs mt-2">{error.message}</Text>} */}
                    </View>
                )}
            />
        </View>
    );
};

export default AccountSelector;
