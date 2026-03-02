import { Car, Film, Heart, Home, ShoppingBag, ShoppingCart, Zap } from "lucide-react-native";

export const categories = [
  { value: 'Alimentação', label: 'Alimentação', icon: ShoppingBag, color: 'bg-[#D4A574]' },
  { value: 'Transporte', label: 'Transporte', icon: Car, color: 'bg-[#C89B7B]' },
  { value: 'Moradia', label: 'Moradia', icon: Home, color: 'bg-[#E8B4A0]' },
  { value: 'Lazer', label: 'Lazer', icon: Film, color: 'bg-[#D8825C]' },
  { value: 'Saúde', label: 'Saúde', icon: Heart, color: 'bg-[#C67B59]' },
  { value: 'Compras', label: 'Compras', icon: ShoppingCart, color: 'bg-[#B88A6A]' },
  { value: 'Contas', label: 'Contas', icon: Zap, color: 'bg-[#D4A089]' },
];