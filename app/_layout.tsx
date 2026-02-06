import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack>
          {/* Removido o "a" que estava aqui */}
          <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
          <Stack.Screen
            name="expense-registration-page/index"
            options={{ title: 'Nova Despesa', headerShown: false }}

          />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
