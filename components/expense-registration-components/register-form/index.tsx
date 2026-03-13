import InputGeneric from '@/components/ui/Input-generic';
import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Text, TouchableOpacity, View } from 'react-native';

import { GenericTabs } from '@/components/ui/generic-tabs';
import { Masks } from 'react-native-mask-input'; // Importe as máscaras prontas
import PaymentMethodSelector from '../PaymentMethodSelector';
import { paymentMethods } from '../PaymentMethodSelector/CONSTANTS';
import AccountSelector from '../account-selector';
import { ACCOUNTS } from '../account-selector/CONSTANTES';
import CategorySelector from '../category-selector/CategorySelector';
import { categories } from './CONSTANTS';


export default function RegisterForm() {
    const methods = useForm({
        mode: 'onChange',
        defaultValues: {
            nome: '',
            expenseAmount: '',
            category: '',
            paymentMethod: '',
            account: ''
        }
    });

    const myTabs = React.useMemo(() => [
        {
            id: 'category',
            label: 'Categoria',
            render: () => (
                <CategorySelector
                    name="category"
                    categories={categories}
                />
            )
        },
        {
            id: 'account',
            label: 'Conta',
            render: () => (
                <

                    AccountSelector
                    accounts={ACCOUNTS}
                    name='account' />
            )
        },
    ], [])

    const { control, handleSubmit, formState: { errors } } = methods;

    const onSubmit = (data: any) => {
        console.log("Dados do formulário:", data);
    };

    return (
        <View className="p-1 px-4">
            <FormProvider {...methods}>
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
                    name="expenseAmount"
                    rules={{ required: "Valor da despesa é obrigatório" }}
                    render={({ field: { onChange, value } }) => (
                        <InputGeneric
                            label="Valor da Despesa"
                            type="currency"
                            mask={Masks.BRL_CURRENCY} // Aplica a máscara de Real Brasileiro
                            value={value}
                            onChangeValue={(text, rawText) => onChange(rawText)}
                            error={errors.expenseAmount?.message}
                            nativeProps={{
                                placeholder: "R$ 0,00",
                                keyboardType: "numeric"
                            }}
                            inputStyle='bg-[#FFF5E9]'
                        />
                    )}
                />

                <GenericTabs tabs={myTabs} fieldNames={['category', 'account']} />
                <PaymentMethodSelector control={control} name="paymentMethod" methods={paymentMethods} />

                <TouchableOpacity
                    className="bg-blue-600 p-4 rounded-lg mt-4"
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text className="text-white text-center font-bold">Enviar</Text>
                </TouchableOpacity>

            </FormProvider>
        </View>
    );
}


