import InputGeneric from '@/components/ui/Input-generic';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import { Masks } from 'react-native-mask-input'; // Importe as máscaras prontas
import PaymentMethodSelector from '../PaymentMethodSelector';
import { paymentMethods } from '../PaymentMethodSelector/CONSTANTS';
import CategorySelector from '../category-selector/CategorySelector';
import { categories } from './CONSTANTS';



export default function RegisterForm() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            nome: '',
            valor_despesa: '',
            category: '',
            paymentMethod: '',
        }
    });

    const onSubmit = (data: any) => {
        // No submit, o 'valor_despesa' virá formatado como "R$ 10,00"
        console.log("Dados do formulário:", data);
    };

    return (
        <View className="p-5">
            <Controller
                control={control}
                name="nome"
                rules={{ required: "O nome é obrigatório" }}
                render={({ field: { onChange, value } }) => (
                    <InputGeneric
                        label="Descrição da Despesa"
                        value={value}
                        onChangeValue={onChange}
                        error={errors.nome?.message}
                        nativeProps={{ placeholder: "Ex: Aluguel" }}
                        inputStyle='bg-[#FFF5E9]'
                    />
                )}
            />

            <Controller
                control={control}
                name="valor_despesa"
                rules={{ required: "Valor da despesa é obrigatório" }}
                render={({ field: { onChange, value } }) => (
                    <InputGeneric
                        label="Valor da Despesa"
                        type="currency"
                        mask={Masks.BRL_CURRENCY} // Aplica a máscara de Real Brasileiro
                        value={value}
                        onChangeValue={(text, rawText) => onChange(rawText)}
                        error={errors.valor_despesa?.message}
                        nativeProps={{
                            placeholder: "R$ 0,00",
                            keyboardType: "numeric"
                        }}
                        inputStyle='bg-[#FFF5E9]'
                    />
                )}
            />
            <CategorySelector
                control={control}
                name="category"
                categories={categories}
            />
            <PaymentMethodSelector control={control} name="paymentMethod" methods={paymentMethods} />



            <TouchableOpacity
                className="bg-blue-600 p-4 rounded-lg mt-4"
                onPress={handleSubmit(onSubmit)}
            >
                <Text className="text-white text-center font-bold">Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

