import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { FooterCreditCardItem } from './components/footer-credit-cart-item';
import HeaderCreditCardItem from './components/header-credit-card-item';
import { MainCreditCardItem } from './components/main-credit-card-item';

interface CreditCardItemProps extends ViewProps {
  name: string;
  availableLimit: number;
  cardNumber: string;
  invoiceValue: number;
  colors: [string, string, ...string[]]; 
}

export function CreditCardItem({
  name,
  availableLimit,
  cardNumber,
  invoiceValue,
  colors,
  className,
  ...props
}: CreditCardItemProps) {

  return (
    <View className={`w-64 shadow-md ${className}`} {...props}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="rounded-3xl p-5 overflow-hidden relative"
      >
        {/* Círculos decorativos */}
        <View className="absolute -top-12 -right-12 w-24 h-24 bg-white/10 rounded-full" />
        <View className="absolute -bottom-10 -left-10 w-20 h-20 bg-white/10 rounded-full" />
        <View className="relative z-10">
          <HeaderCreditCardItem name={name} />         
          <MainCreditCardItem invoiceValue={invoiceValue} />
          <FooterCreditCardItem availableLimit={availableLimit} cardNumber={cardNumber} />
        </View>
      </LinearGradient>
    </View>
  );
}
