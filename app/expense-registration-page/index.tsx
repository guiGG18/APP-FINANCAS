import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import RegisterForm from '../../components/expense-registration-components/register-form';

export default function ExpenseRegistrationPage() {
  return (
    <View className="w-full max-w-[400px] self-center bg-white  shadow-2xl overflow-hidden mx-1">
      {/* header */}
      <View className=' rounded-b-[32px] overflow-hidden '>
        <LinearGradient
          colors={['#D8825C', '#C67B59']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="px-6 pt-12 pb-8"
        >
          <View className="items-center justify-center">
            <View className='flex  flex-row items-center justify-center mb-1 gap-2'>
              <Link href="/" asChild>
                <Pressable className="bg-white/20 rounded-full p-2 w-10 h-10 items-center justify-center">
                  <ArrowLeft color="white" size={24} />
                </Pressable>
              </Link>

              <Text className="text-white/95 text-2xl font-semibold uppercase tracking-wider ">
                Adicionar Despesas
              </Text>
            </View>
            <Text className="text-white/80 text-sm font-bold mr-14">
              Registre uma nova saída
            </Text>
          </View>
        </LinearGradient>
      </View>
      {/* ---- */}
      <View className="p-6">
        <RegisterForm />
      </View>
    </View>
  );
};
