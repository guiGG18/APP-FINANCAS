import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ActionButtonProps {
  label: string;
  Icon: LucideIcon;
  color: string; // Ex: #4A8B4D
  onPress?: () => void;
}

export default function ActionButton({ label, Icon, color, onPress }: ActionButtonProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={onPress}
      
      style={{ borderColor: `${color}4D` }} // 4D é 30% de opacidade em HEX
      className="flex-1 bg-white rounded-2xl p-4 flex-row items-center justify-center border-2 shadow-lg"
    >
      <View 
        style={{ backgroundColor: `${color}26` }} // 26 é 15% de opacidade em HEX
        className="w-8 h-8 rounded-full items-center justify-center mr-2"
      >
        <Icon size={20} color={color} strokeWidth={3} />
      </View>
      
      <Text className="text-[#5C4A3A] text-sm font-semibold">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
