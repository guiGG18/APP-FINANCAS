import { cn } from '@/utils/cn';
import React from 'react';
import { Text, TextInputProps, View } from 'react-native';
import MaskInput from 'react-native-mask-input';

interface MyCustomProps {
  label?: string;
  error?: string;
  type?: 'text' | 'numeric' | 'password' | 'email' | 'date' | 'currency';
  mask?: any; // A lib usa arrays ou máscaras prontas como Masks.BRL_CPF
  containerStyle?: string;
  inputStyle?: string;
}

interface InputProps extends MyCustomProps {
  onChangeValue: (text: string, rawText?: string) => void;
  nativeProps?: Omit<TextInputProps, 'onChangeText' | 'value'>;
  value: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  type = 'text',
  mask,
  containerStyle,
  onChangeValue,
  value,
  nativeProps,
  inputStyle,
}) => {
  const isPassword = type === 'password';

  const keyboardMapping = {
    numeric: 'numeric',
    email: 'email-address',
    text: 'default',
    password: 'default',
    date: 'numeric',
    currency: 'numeric',
  } as const;

  const finalInputStyle = cn(
    "h-12 rounded-lg px-4 bg-white text-base",
    error ? "border-red-500" : "border-gray-300",
    inputStyle
  );

  return (
    <View className={cn("mb-4 w-full", containerStyle)}>
      {label && <Text className="mb-1 text-gray-700 font-bold">{label}</Text>}

      <MaskInput
        {...nativeProps}
        value={value}
        onChangeText={(masked, unmasked) => {
          onChangeValue(masked, unmasked);
        }}
        mask={mask}
        secureTextEntry={isPassword}
        keyboardType={keyboardMapping[type] || 'default'}
        className={finalInputStyle}
      />

      {error && <Text className="text-red-500 text-xs mt-1 font-medium">{error}</Text>}
    </View>
  );
};

export default Input;
