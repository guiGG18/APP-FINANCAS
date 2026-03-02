import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CreditCardItem } from '../credit-card-item';

interface CardData {
  id: string;
  name: string;
  available: number;
  number: string;
  invoice: number;
  colors: [string, string, ...string[]]; 
}

const creditCards: CardData[] = [
  { id: '1', name: 'Principal', available: 5200.5, number: '**** 4588', invoice: 1200, colors: ['#4A8B4D', '#2D5A2F'] },
  { id: '2', name: 'Viagens', available: 12500, number: '**** 8821', invoice: 450, colors: ['#D8825C', '#C67B59'] },
];

export default function CreditCardSection() {
  return (
    <View className="mb-6 w-full">
      <Text className="text-[#5C4A3A] text-lg font-semibold mb-3 px-6">
        Cartões de Crédito
      </Text>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }} 
        snapToInterval={268} 
        decelerationRate="fast"
      >
       {creditCards.map((card) => (
        <CreditCardItem
          key={card.id}
          name={card.name}
          availableLimit={card.available}
          cardNumber={card.number}
          invoiceValue={card.invoice}
          colors={card.colors as [string, string, ...string[]]} 
          className="mr-3 w-72"
        /> 
    ))}   

      </ScrollView>
    </View>
  );
}
